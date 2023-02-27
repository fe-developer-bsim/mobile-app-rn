import {contentContainerStyle, fontSizeXLStyle, fontSizeMediumStyle, fontSizeNormalStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
const {height, width} = Dimensions.get('window');
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  container: [contentContainerStyle],
  containerContent: [{flex: 1}],
  titles: [fontSizeXLStyle, {
    marginBottom: 15,
    paddingBottom: 10,
    color: theme.darkBlue
  }],
  titles2: [fontSizeXLStyle, {
    marginBottom: 15,
    paddingBottom: 10,
  }],
  titles3: [fontSizeMediumStyle, {
    marginBottom: 15,
    marginTop: -15,
    paddingBottom: 10,
    color: theme.darkBlue
  }],
  formContainer: {
    flex: 1,
  },
  greyLine: {
    backgroundColor: '#ECECEC',
    height: 10,
    marginTop: 20
  },
  containerInner: [contentContainerStyle, {
    paddingBottom: 10,
  }],
  labelSpacing: {
    paddingVertical: 12
  },
  containerBtn: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  timeSelection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  paddingField: {
    paddingVertical: 10
  },
  radioStyle: {
    color: theme.brand
  },
  extraPadding: {
    paddingLeft: 10
  },
  borderedContainer: {
  },
  disbaledBorderedContainer: {
  },
  wnia: [fontSizeMediumStyle, {
  }],
  wna: {
  },

  // Remittance
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 5 : height / 5,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * 1.2
  },
  containerBanner: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  marginTop: {
    marginTop: 50
  },
  containerTransfer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    position: 'absolute',
    marginHorizontal: 0,
    marginVertical: Platform.OS === 'ios' ? width * 0.27 : width * 0.22,
    borderRadius: 15,
    top: width * -0.15
  },
  containerLeft: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: width * 1,
    backgroundColor: theme.white
  },
  containerShadoow: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 10,
    width: width * 1,
    backgroundColor: theme.opacityWhite
  },
  accNumberContainer: {
    marginBottom: 20,
  },
  bankInformationContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.grey,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginVertical: 10
  },
  buttonBottom: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  nextButton: {
    fontWeight: 'bold'
  },
  bankInformationText: {
    fontSize: fontSizeNormalStyle.fontSize,
    color: theme.softGrey
  },
  arrow: {
    color: theme.darkBlue,
    transform: [{rotate: '180deg'}],
  },
  containerArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20
  },

  // NEW
  pinkBg: {
    backgroundColor: theme.pinkBrand,
    flex: 1,
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height * 0.5,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 10 : 10 : 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  containerNew: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  shadowWhiteBg: {
    backgroundColor: theme.opacityWhite,
    height: height * 0.5,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 30 : 30 : 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  informationText: {
    color: theme.darkBlue,
    fontSize: theme.fontSizeSmall,
    fontWeight: 'bold'
  },
  subTitleText: {
    color: theme.textGrey,
    fontSize: theme.fontSizeSmall,
  },
  containerDisclaimer: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  containtextExplanation: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.greyLine,
    borderRadius: 10,
  },
  explainIcon: {
    color: theme.darkBlue,
    justifyContent: 'center',
  },
  containerSimasIcon: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  textExplanation: {
    fontSize: theme.fontSizeNormal,
    color: theme.textSoftDarkBlue,
    marginHorizontal: 10,
    paddingVertical: 7,
    flex: 1,
    textAlign: 'justify',
  },
};
