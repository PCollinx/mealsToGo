import camelize from "camelize";
import { geoHost } from "../../utils/env";

export const locationRequest = (searchTerm) => {
  return fetch(`${geoHost}?city=${searchTerm}`).then((res) => {
    return res.json();
  });
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  console.log(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;
  return { lat, lng, viewport: geometry.viewport };
};
