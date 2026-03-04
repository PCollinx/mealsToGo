const { mocks, addMockImage } = require("./mock");
const url = require("url");
const { defineSecret } = require("firebase-functions/params");
const { Client } = require("@googlemaps/google-maps-services-js");
const { onRequest } = require("firebase-functions/https");

const client = new Client({});
const googleMapsApiKey = defineSecret("GOOGLE_MAPS_API_KEY");

const addGoogleImage = (restaurant) => {
  const ref =
    restaurant.photos &&
    restaurant.photos[0] &&
    restaurant.photos[0].photo_reference;
  if (!ref) {
    restaurant.photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ];
    return restaurant;
  }
  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${googleMapsApiKey.value()}`,
  ];
  return restaurant;
};

exports.placesRequest = onRequest(
  { secrets: [googleMapsApiKey] },
  (request, response) => {
    const { location, mock } = url.parse(request.url, true).query;

    if (mock === "true") {
      const data = mocks[location];

      if (data && data.results) {
        data.results = data.results.map(addMockImage);
      } else {
        response.status(404).json({
          error: "Location not found",
          receivedLocation: location,
          availableLocations: Object.keys(mocks),
        });
      }
      return response.json(data);
    }

    client
      .placesNearby({
        params: {
          location: location,
          radius: 1500,
          type: "restaurant",
          key: googleMapsApiKey.value(),
        },
        timeout: 1000,
      })
      .then((res) => {
        res.data.results = res.data.results.map(addGoogleImage);
        return response.json(res.data);
      })
      .catch((e) => {
        return response.status(500).send(e.response.data.error_message);
      });
  },
);
