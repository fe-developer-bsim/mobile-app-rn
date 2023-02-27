import {mock} from 'axios';
import {get, post, postForQrPayment, getForQR, postV4, postForCaptcha, postEFormCentral, postFace, postCGVPayment, postV3} from '../http.util';

jest.mock('../../config/api.config');
jest.mock('../../config/env.config.js');

describe('Http service', () => {
  const functionSpy = jest.fn();
  it('should resolve promise when GET request is successful', () => {
    mock.reset();
    mock.onGet('/test').reply(200, {
      test: 'test'
    });
    return get('TEST', {}, functionSpy).then((res) => {
      expect(res.data).toEqual({test: 'test'});
    });
  });

  it('should reject promise when GET request failed', () => {
    mock.reset();
    mock.onGet('/test').reply(500, {
      err: 'test'
    });
    return get('TEST', {}, functionSpy).then(() => {}).catch((err) => expect(err.data).toEqual({err: 'test'}));
  });

  it('should resolve promise when POST request is successful', () => {
    mock.reset();
    mock.onPost('/test').reply(200, {
      test: 'test'
    });
    return post('TEST', {}, {}, functionSpy).then((res) => {
      expect(res.data).toEqual({test: 'test'});
    });
  });

  it('should reject promise when POST request failed', () => {
    mock.reset();
    mock.onPost('/test').reply(500, {
      err: 'test'
    });
    return post('TEST', {}, {}, functionSpy).then(() => {}).catch((err) => expect(err.data).toEqual({err: 'test'}));
  });

  it('should resolve promise when POST ForQrPayment request is successful', () => {
    mock.reset();
    mock.onPost('/test').reply(200, {
      test: 'test'
    });
    return postForQrPayment('TEST', {}, {}, functionSpy).then((res) => {
      expect(res.data).toEqual({test: 'test'});
    });
  });

  it('should reject promise when POST ForQrPayment request failed', () => {
    mock.reset();
    mock.onPost('/test').reply(500, {
      err: 'test'
    });
    return postForQrPayment('TEST', {}, {}, functionSpy).then(() => {}).catch((err) => expect(err.data).toEqual({err: 'test'}));
  });


  it('should resolve promise when GET ForQR request is successful', () => {
    mock.reset();
    mock.onGet('/test').reply(200, {
      test: 'test'
    });
    return getForQR('TEST', '', {}, functionSpy).then((res) => {
      expect(res.data).toEqual({test: 'test'});
    });
  });

  it('should resolve promise when POST postForCaptcha request is successful', () => {
    mock.reset();
    mock.onPost('/test').reply(200, {
      test: 'test'
    });
    return postForCaptcha('TEST', {}, {}, functionSpy).then((res) => {
      expect(res.data).toEqual({test: 'test'});
    });
  });

  it('should reject promise when POST postForCaptcha request failed', () => {
    mock.reset();
    mock.onPost('/test').reply(500, {
      err: 'test'
    });
    return postForCaptcha('TEST', {}, {}, functionSpy).then(() => {}).catch((err) => expect(err.data).toEqual({err: 'test'}));
  });

  it('should reject promise when GET ForQR request failed', () => {
    mock.reset();
    mock.onGet('/test').reply(500, {
      err: 'test'
    });
    return getForQR('TEST', '', {}, functionSpy).then(() => {}).catch((err) => expect(err.data).toEqual({err: 'test'}));
  });

  it('should resolve promise when POSTV4 request is successful', () => {
    mock.reset();
    mock.onPost('/test').reply(200, {
      test: 'test'
    });
    return postV4('TEST', {}, {}, functionSpy).then((res) => {
      expect(res.data).toEqual({test: 'test'});
    });
  });

  it('should reject promise when POSTV4 request failed', () => {
    mock.reset();
    mock.onPost('/test').reply(500, {
      err: 'test'
    });
    return postV4('TEST', {}, {}, functionSpy).then(() => {}).catch((err) => expect(err.data).toEqual({err: 'test'}));
  });

  it('should resolve promise when postEFormCentral request is successful', () => {
    mock.reset();
    mock.onPost('/test').reply(200, {
      test: 'test'
    });
    return postEFormCentral('TEST', {}, {}, functionSpy).then((res) => {
      expect(res.data).toEqual({test: 'test'});
    });
  });

  it('should reject promise when postEFormCentral request failed', () => {
    mock.reset();
    mock.onPost('/test').reply(500, {
      err: 'test'
    });
    return postEFormCentral('TEST', {}, {}, functionSpy).then(() => {}).catch((err) => expect(err.data).toEqual({err: 'test'}));
  });

  it('should resolve promise when postFace request is successful', () => {
    mock.reset();
    mock.onPost('/test').reply(200, {
      test: 'test'
    });
    return postFace('TEST', {}, {}, functionSpy).then((res) => {
      expect(res.data).toEqual({test: 'test'});
    });
  });

  it('should reject promise when postFace request failed', () => {
    mock.reset();
    mock.onPost('/test').reply(500, {
      err: 'test'
    });
    return postFace('TEST', {}, {}, functionSpy).then(() => {}).catch((err) => expect(err.data).toEqual({err: 'test'}));
  });

  it('should resolve promise when postCGVPayment request is successful', () => {
    mock.reset();
    mock.onPost('/test').reply(200, {
      test: 'test'
    });
    return postCGVPayment('TEST', {}, {}, functionSpy).then((res) => {
      expect(res.data).toEqual({test: 'test'});
    });
  });

  it('should reject promise when postCGVPayment request failed', () => {
    mock.reset();
    mock.onPost('/test').reply(500, {
      err: 'test'
    });
    return postCGVPayment('TEST', {}, {}, functionSpy).then(() => {}).catch((err) => expect(err.data).toEqual({err: 'test'}));
  });

  it('should resolve promise when POSTV3 request is successful', () => {
    mock.reset();
    mock.onPost('/test').reply(200, {
      test: 'test'
    });
    return postV3('TEST', {}, {}, functionSpy).then((res) => {
      expect(res.data).toEqual({test: 'test'});
    });
  });

  it('should reject promise when POSTV3 request failed', () => {
    mock.reset();
    mock.onPost('/test').reply(500, {
      err: 'test'
    });
    return postV3('TEST', {}, {}, functionSpy).then(() => {}).catch((err) => expect(err.data).toEqual({err: 'test'}));
  });

});
