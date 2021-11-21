import axios from 'axios';

function createLocationService(authHeader) {
  const axiosClient = axios.create({
    baseURL: 'https://gist.motc.gov.tw/gist_api/V3/Map/',
    headers: authHeader,
    dataType: 'json',
  });

  return {
    getUserCity: ({ latitude, longitude }) =>
      axiosClient
        .get(`/GeoLocating/District/LocationX/${longitude}/LocationY/${latitude}?$format=GEOJSON`)
        .then((resp) => resp.data?.features?.[0].properties?.model || {}),

    getNearestBusStop: ({ latitude, longitude, radius, City }) =>
      axiosClient
        .get(
          `/Bus/Network/Stop/City/${City}/Nearby/LocationX/${longitude}/LocationY/${latitude}/Radius/${radius}?$top=1&$format=GEOJSON`
        )
        .then((resp) => resp.data?.features?.[0].properties.model),
  };
}

export default createLocationService;
