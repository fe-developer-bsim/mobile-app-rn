import deviceUtil from '../device.util';

jest.mock('react-native', () => ({
  Dimensions: {
    get: () => ({
      width: 200,
      height: 300
    })
  },
  Platform: {OS: 'ios'}
}));

describe('device utils', () => {

  it('getViewHeight', () => {
    expect(deviceUtil.getViewHeight(20)).toBe(6000);
  });

  it('getViewWidth', () => {
    expect(deviceUtil.getViewWidth(20)).toBe(4000);
  });

});
