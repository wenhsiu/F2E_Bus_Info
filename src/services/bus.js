import axios from 'axios';

function createBusService(authHeader) {
  const axiosClient = axios.create({
    baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Bus/',
    headers: authHeader,
    dataType: 'json',
  });

  return {
    getStopBusList: (city, busStopID) =>
      axiosClient
        .get(`/Route/City/${city}/PassThrough/Station/${busStopID}?$top=30&$format=JSON`)
        .then((resp) => resp.data || []),

    getStopBusEstimateTime: (city, busStopID) =>
      axiosClient
        .get(`/EstimatedTimeOfArrival/City/${city}/PassThrough/Station/${busStopID}?$top=30&$format=JSON`)
        .then((resp) => resp.data || []),
  };
}

export default createBusService;
