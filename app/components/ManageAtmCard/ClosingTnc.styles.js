import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {height} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  container: {
    flex: 1,
    backgroundColor: theme.white,
    paddingBottom: 20,
  },
  nextButton: styles.buttonLargeTextStyle,
  buttonContainer: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 20
  },
  whiteBgProductItems: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 0 : 10 : 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
};
