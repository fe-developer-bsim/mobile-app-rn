import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import VersionNumber from 'react-native-version-number';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const getViewWidth = (percentage) => {
  const value = percentage * viewportWidth;
  return Math.round(value);
};
const getViewHeight = (percentage) => {
  const value = percentage * viewportHeight;
  return Math.round(value);
};

const deviceInfo = {
  id: DeviceInfo.getUniqueID(),
  name: DeviceInfo.getBrand(),
  model: DeviceInfo.getModel()
};

module.exports = {
  getViewWidth,
  getViewHeight,
  viewportWidth,
  viewportHeight,
  deviceInfo,
  currentPlatform: Platform.OS,
  currentAppVersion: VersionNumber.appVersion
};
