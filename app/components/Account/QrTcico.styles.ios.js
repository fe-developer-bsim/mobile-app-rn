import {theme} from '../../styles/core.styles';
import {buttonLargeTextStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 25,
  },
  pinkBg: {
    backgroundColor: theme.pinkBrand,
    flex: 1,
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 5,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 0 : 10 : 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  label: {
    fontSize: theme.fontSizeSmall
  },
  input: {
    fontSize: theme.fontSizeXL,
    textAlign: 'center',
    paddingVertical: 5,
    height: 60,
  },
  errorContainer: {
    paddingVertical: theme.padding,
  },
  passwordFieldsContainer: {
    flexDirection: 'column'
  },
  centerQR: {
    paddingTop: 20,
    alignItems: 'center',
    paddingVertical: 10
  },
  releaseTitle: {
    fontSize: theme.fontSizeL,
    textAlign: 'center',
  },
  eyeIconStyle: {position: 'absolute', width: 30, right: 5, top: 30},
  button: [
    buttonLargeTextStyle
  ],
  headerBox: {
    flexDirection: 'row',
    alignItems: 'space-between',

    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.contrast,

    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 7,
    marginTop: 30
  },
  rowTimer: {
    flexDirection: 'row',
  },
  topQRText: {
    textAlign: 'left',
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 20,
  },
  topQRTextTimer: {
    textAlign: 'center',
    color: theme.red,
  },
  shadowTimer: {
    borderRadius: 7,
    marginVertical: 15,
    padding: 5,
    alignSelf: 'center',
    textAlign: 'center',
    borderColor: theme.greyLine,
    backgroundColor: theme.greyLine
  },
  bodyBox: {
    marginTop: 5,
    borderRadius: 15,
    backgroundColor: theme.contrast,
  },
  lineDashed: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.dashLine,
  },
  picture: {
    alignSelf: 'center',
    width: ((width - 40) * 0.31),
    height: ((width - 40) * 0.6),
  },
  warningBox: {
    borderWidth: 0.5,
    borderRadius: 10,
    paddingVertical: theme.padding,
    paddingHorizontal: 15,
    borderColor: theme.darkBlue,
    marginTop: 40,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyleBlack: {
    paddingRight: 10,
    color: theme.darkBlue
  },
  wrapTextWarning: {
    paddingRight: 30,
    color: theme.darkBlue
  },
  iconTitleTop: {
    alignItems: 'center'
  },
  renewText: {
    textAlign: 'right',
    paddingRight: 20,
    paddingVertical: 20,
    color: theme.red,
    fontWeight: 'bold'
  },
  renewView: {
    alignItems: 'flex-end',
  },
  innerTextQR: {
    paddingTop: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBSIM: {
    position: 'absolute',
    backgroundColor: theme.white,
  },
  viewImg: {
    margin: 10,
    backgroundColor: theme.white,
  },
  imgQris: {
    width: 83,
    height: 31,
    backgroundColor: theme.white,
    marginTop: 10,
    marginHorizontal: 10,
    alignSelf: 'center'
  },
  midleImageQR: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    alignSelf: 'center',
    width: ((width - 40) * 0.31),
    height: ((width - 40) * 0.6),
    alignItems: 'center',
  },
  formContainer: {
    paddingTop: 20
  },
  formContainerMethod: {
    marginTop: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: theme.grey,
    borderRadius: 15
  },
  formContainerAmount: {
    marginTop: 20,
  },
  buttonLogin: {
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  textPickerStyle: {
    marginTop: 20,
    color: theme.darkBlue,
  },
  pickerStyle: {
    paddingVertical: 10,
    borderColor: theme.darkBlue,
    color: theme.darkBlue,
  },
  containerInputBox: {
    paddingVertical: 7,
    borderWidth: Platform.OS === 'ios' ? 0.5 : 0.2,
    borderRadius: 10,
    borderColor: theme.darkBlue,
    marginVertical: 5
  },
  buttonSpacing: {
    height: 50
  },
  nextButton: {
    color: theme.white,
    fontSize: theme.fontSizeMedium,
    fontWeight: 'bold'
  }
};
