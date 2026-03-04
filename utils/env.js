const placesLive = "https://placesnearby-vfycvcndyq-uc.a.run.app";
const geoLive = "https://geocode-vfycvcndyq-uc.a.run.app";
const localHost = "http://192.168.0.165:5001/mealstogo-a0a42/us-central1";

// Set to true for local development, false for production
export const isDevelopment = false;

export const placesHost = isDevelopment
  ? `${localHost}/placesNearby`
  : placesLive;
export const geoHost = isDevelopment ? `${localHost}/geoCode` : geoLive;
