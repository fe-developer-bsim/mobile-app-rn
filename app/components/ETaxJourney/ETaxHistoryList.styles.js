import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {height, width} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  pinkBg: {
    backgroundColor: theme.pinkBrand,
    flex: 1,
    marginBottom: 20
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 0 : 10 : 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  historyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusContainer: {
    alignItems: 'center',
    flex: 1
  },
  successText: {
    color: theme.darkGreen,
    marginTop: 10,
    fontWeight: theme.fontWeightMedium
  },
  failText: {
    color: theme.radicalRed,
    marginTop: 10,
    fontWeight: theme.fontWeightMedium

  },
  dataContainer: {
    flex: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  }, 
  exportIcon: {
    color: theme.darkBlue,
    fontWeight: 'bold'
  },
  succesIcon: {
    color: theme.white,
    fontWeight: 'bold'
  },
  successCircle: {
    borderRadius: 20,
    width: 35,
    height: 35,
    backgroundColor: theme.darkGreen,
    alignItems: 'center',
    justifyContent: 'center'
  },
  failCircle: {
    borderRadius: 20,
    width: 35,
    height: 35,
    backgroundColor: theme.radicalRed,
    alignItems: 'center',
    justifyContent: 'center'
  },
  failIcon: {
    color: theme.white,
    fontWeight: 'bold'
  },
  billingText: {
    fontWeight: theme.fontWeightMedium,
    color: theme.darkBlue,
    marginBottom: 3
  },
  typeText: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightMedium,
    color: theme.darkBlue,
    marginBottom: 3

  },
  date: {
    fontSize: theme.fontSizeNormal,
    color: theme.darkBlue
  },
  bottomLine: {
    borderWidth: 1,
    borderColor: '#f1f3f6',
    marginVertical: 10
  },
  mt20: {
    marginTop: 20
  },
  mt10: {
    marginTop: 10
  },
  footer: {
    height: 70,
    width: width * 0.9,
    justifyContent: 'center'
  },
};