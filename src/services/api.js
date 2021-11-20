import jsSHA from 'jssha';
import createLocationService from './location';

const GetAuthorizationHeader = () => {
  const GMTString = new Date().toGMTString();
  const ShaObj = new jsSHA('SHA-1', 'TEXT');
  // eslint-disable-next-line no-undef
  ShaObj.setHMACKey(process.env.REACT_APP_API_KEY, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  const HMAC = ShaObj.getHMAC('B64');
  const Authorization =
    'hmac username="' +
    // eslint-disable-next-line no-undef
    process.env.REACT_APP_API_ID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';

  return { Authorization: Authorization, 'X-Date': GMTString };
};

export default class ApiClient {
  #authHeader = GetAuthorizationHeader();
  constructor() {
    this.location = createLocationService(this.#authHeader);
  }
}
