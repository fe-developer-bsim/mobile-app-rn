import env from '../env.config';

describe('Default env settings', () => {
  it('mock should be false', () => {
    expect(env.MOCKAPI).toBe(false);
  });
  xit('environment should not be dev', () => {
    expect(env.ENV).not.toBe('dev');
  });
  it('URL should not be dev', () => {
    expect(env.URL).not.toBe('http://10.32.1.13:8080/PersonalBanking/rest/v3/action');
  });
});
