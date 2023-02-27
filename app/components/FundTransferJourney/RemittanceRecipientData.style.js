import {contentContainerStyle, fontSizeXLStyle, fontSizeMediumStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
const {height, width} = Dimensions.get('window');
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  container: [contentContainerStyle],
  containerContent: [{flexGrow: 1, justifyContent: 'space-between'}],
  titles: [fontSizeXLStyle, {
    marginBottom: 15,
    paddingVertical: 20,
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
    height: Platform.OS === 'ios' ? height / 5 : height / 1.9,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * 0.96
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
    marginTop: -5,
    marginVertical: Platform.OS === 'ios' ? width * 0.27 : width * 0.22,
    borderRadius: 15,
    width: width * 0.9,
    top: width * 0.05
  },
  containerLeft: {
    marginTop: 5,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: width * 1,
    backgroundColor: theme.white
  },
  containerShadoow: {
    flexDirection: 'column',
    paddingVertical: 8,
    marginVertical: 10,
    borderRadius: 20,
    width: width * 1,
    backgroundColor: theme.opacityWhite
  },
  accNumberContainer: {
    marginBottom: 8,
  },
  accNumbeRecipientField: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.darkOrange,
    flexDirection: 'row',
    justifyContent: 'space-between',    
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    height: 70
  },
  accNumberRecipientField2: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.darkOrange,
    flexDirection: 'row',
    justifyContent: 'space-between',    
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingTop: 40,
    height: 70
  },
  recipientField: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.grey,
    flexDirection: 'row',
    justifyContent: 'space-between',    
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    height: 70
  },
  recipientField2: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.grey,
    flexDirection: 'row',
    justifyContent: 'space-between',    
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingTop: 40,
    height: 70
  },
  buttonBottom: {
    width: width * 0.9,
    paddingVertical: 10,
    paddingTop: 30
  },
  nextButton: {
    fontWeight: 'bold'
  },
  progressBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    height: 7,
    flex: 1,
    marginTop: 11
  },
  redBar: {
    backgroundColor: theme.blueAmount,
    flexDirection: 'row',
    marginRight: 5
  },
  greyBar: {
    backgroundColor: theme.darkGrey,
    flexDirection: 'row',
    marginLeft: 5
  },
  arrow: {
    color: theme.darkBlue,
    transform: [{rotate: '180deg'}],
  },
  containerArrow: {
    flexDirection: 'row',
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
  }
};
