import axios from 'axios';

function createLocationService(authHeader) {
  return {
    getUserCity: ({ latitude, longitude }) =>
      axios({
        method: 'get',
        url: `https://gist.motc.gov.tw/gist_api/V3/Map/GeoLocating/Address/LocationX/${longitude}/LocationY/${latitude}?$format=GEOJSON`,
        headers: authHeader,
        dataType: 'json',
      }).then((resp) => resp.data?.features?.[0]?.properties?.model?.Address?.slice(0, 3) || ''),
  };
}

export default createLocationService;
