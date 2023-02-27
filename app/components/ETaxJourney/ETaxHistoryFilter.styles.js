import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  pinkBg: {
    flex: 1,
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 0 : 10 : 0,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25
  },
  taxType: {
    padding: 20
  },
  pickMonth: {
    paddingHorizontal: 20,
    marginVertical: 10
  },
  transacionContainer: {
    backgroundColor: '#f1f3f6',
    flexDirection: 'row',
    alignItems: 'center'
  },
  explanationContainer: {
    backgroundColor: '#f1f3f6',
    paddingHorizontal: 30,
    paddingVertical: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  disclaimerIcon: {
    color: theme.black,
    paddingRight: 5,
    fontSize: theme.fontSizeNormal,
  },
  closeIcon: {
    color: theme.black,
    paddingRight: 5,
    fontSize: theme.fontSize22,
  },
  close: {
    color: theme.darkBlue,
    fontSize: 30,
  },
  textTrans: {
    color: theme.darkBlue,
    fontSize: 17,
    fontWeight: 'bold',
    paddingHorizontal: 30,
    paddingVertical: 15
  },
  textExplanation: {
    color: theme.darkBlue,
    fontSize: 12,
    fontWeight: 'bold',
    
  },
  todayOption: {
    color: theme.darkBlue,
    fontSize: 15,
    paddingHorizontal: 30,
    paddingVertical: 15
  },
  dateContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'center',
  },
  h10Left: {
    height: 70,
    width: width / 2.5,
    marginHorizontal: 10
  },
  h10Right: {
    height: 70,
    width: width / 2.5,
    marginHorizontal: 10
  },
  circleButton: {
    backgroundColor: '#f1f3f6',
    fontSize: 15,
    height: 20,
    width: 20,
    marginRight: 40,
    borderRadius: 20,
    alignItem: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: theme.grey
  },
  circleButtonInsideActive: {
    backgroundColor: theme.blueAmount,
    height: 15,
    width: 15,
    borderRadius: 30,
    alignSelf: 'center'
  },
  circleButtonInsideInactive: {
    height: 15,
    width: 15,
    borderRadius: 20,
    alignSelf: 'center'
  },
  borderBlue: {
    borderWidth: 1,
    marginHorizontal: 30,
    borderColor: '#f1f3f6',
  },
  dateContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5
  },
  reset: {
    color: theme.radicalRed,
    fontSize: 12,
    fontWeight: 'bold'
  },
  mt10: {
    marginTop: 10
  },
  mt15: {
    marginTop: 15
  },
  footer: {
    marginTop: 20,
    height: 70,
    marginHorizontal: 20
  },
  textPickerStyle: {
    marginTop: 20,
  },
  pickerStyle: {
    paddingVertical: 10,
    color: theme.darkBlue,
    marginHorizontal: 10
  },
  textPickerStyleMonth: {
    marginTop: 20,
  },
  pickerStyleMonth: {
    paddingVertical: 5,
    color: theme.darkBlue,
    marginHorizontal: 10
  },
  bottomErrContainer: {
    marginLeft: 10,
    marginTop: 10
  }
};