import {contentContainerStyle, fontSizeXLStyle, fontSizeMediumStyle, fontSizeNormalStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {height, width} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  container: [contentContainerStyle],
  containerContent: [{flex: 1, justifyContent: 'space-between'}],
  titles: [fontSizeXLStyle, {
  }],
  titles2: [fontSizeXLStyle, {
    marginBottom: 15,
    paddingBottom: 10
  }],
  titles3: [fontSizeMediumStyle, {
    marginBottom: 15,
    marginTop: -15,
    paddingBottom: 10
  }],
  formContainer: {
    flex: 1,
  },
  greyLine: {
    paddingVertical: 10
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
    height: Platform.OS === 'ios' ? height / 5 : height / 4,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * 0.15
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
    top: width * 0.002
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
  accNumber: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.grey,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 15,
    height: 76
  },
  buttonBottom: {
    marginVertical: 40,
    width: width * 0.9,
  },
  nextButton: {
    fontWeight: 'bold'
  },
  // remittance new
  bankInformationText: {
    fontSize: fontSizeNormalStyle.fontSize,
    color: theme.softGrey
  },
  bankPickerContainer: {
    marginBottom: 20
  },
  bankContainer: {
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',    
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: theme.grey,
  },
  bankTitle: {
    fontFamily: 'Roboto',
    color: theme.darkBlue,
  },
  bankTitleRemittance: {
    marginBottom: 10,
    fontFamily: 'Roboto',
    color: theme.darkBlue,
    paddingLeft: 18
  },
  roboto: {
    fontFamily: 'Roboto',
  },
  robotoSoftDarkBlue: {
    fontFamily: 'Roboto',
    color: theme.textSoftDarkBlue,
    marginBottom: 10
  },
  softDarkBlue: {
    color: theme.textSoftDarkBlue,
  },
  blackRemittance: {
    color: theme.textSoftDarkBlue,
    paddingLeft: 18
  },
  arrowDownStyle: {
    marginLeft: 5,
    color: theme.darkBlue,
  },
  containerTransferType: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  textChooseTransferType: {
    fontSize: theme.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.darkBlue
  },
  subTextChooseTransferType: {
    fontSize: theme.fontSizeNormal,
    color: theme.textSoftDarkBlue
  },
  testIcon: {
    color: theme.black,
    marginRight: 5,
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.lightPink
  },
  containerTrfTitle: {
    paddingVertical: 20
  },
  transferTitle: {
    color: theme.white,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  imgIcon: {
    width: ((width - 40) * 0.25) / 2,
    height: ((width - 40) * 1) / 8.5,
  },

  // NEW STYLE
  pinkBg: {
    backgroundColor: theme.pinkBrand,
    flex: 1,
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 5 : 5 : 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  containerNew: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  // new
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor: theme.grey,
    backgroundColor: theme.transparent,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center'
  },
  billerDetailsRemittance: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10,
  },
  billerDetailsRemittanceBottom: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10,
    bottom: 10
  },
  flex: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
};
