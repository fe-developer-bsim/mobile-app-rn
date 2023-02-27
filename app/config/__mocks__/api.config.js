import env from '../env.config';

export const SERVER_URL = 'http://test.test';

export const endpoints = {
  TEST: '/test',
  LOGIN: '/login'
};

let fixtures = null;
if (env.ENV === 'dev') {
  fixtures = {
    MOCKTEST: {response: {MOCK_TEST: true}},
  };
}

export const mockResponses = fixtures || {};
