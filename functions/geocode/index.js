const { onRequest } = require("firebase-functions/https");
const { defineSecret } = require("firebase-functions/params");
const { Client } = require("@googlemaps/google-maps-services-js");
const { locations: locationsMock } = require("./geocode.mock");
const url = require("url");

const googleMapsApiKey = defineSecret("GOOGLE_MAPS_API_KEY");
const client = new Client({});

exports.geocodeRequest = onRequest(
  { secrets: [googleMapsApiKey] },
  (request, response) => {
    const { city, mock } = url.parse(request.url, true).query;
    if (mock === "true") {
      const locationData = locationsMock[city.toLowerCase()];
      return response.json(locationData);
    }
    client
      .geocode({
        params: {
          address: city,
          key: googleMapsApiKey.value(),
        },
        timeout: 1000,
      })
      .then((res) => {
        return response.json(res.data);
      })
      .catch((e) => {
        return response.status(500).send(e.response.data.error_message);
      });
  },
);
