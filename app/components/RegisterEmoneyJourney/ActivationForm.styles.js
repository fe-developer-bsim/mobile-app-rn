import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import * as styles from '../../styles/common.styles';
import {contentContainerStyle} from '../../styles/common.styles';
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  eyeIconStyle: {position: 'absolute', width: 30, right: 13, top: 15},
  bodyContainerWithTerms: [{
    flex: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
  }, contentContainerStyle],
  columnContainer: {
    flex: 1,
    backgroundColor: theme.white
  },
  barStep: {
    flexDirection: 'row',
    height: 7
  },
  partOne: {
    backgroundColor: theme.red,
    height: 7,
    width: width / 3
  },
  partTwo: {
    backgroundColor: theme.grey,
    height: 7,
    width: width
  },
  mainTitle: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  subTitle: {
    paddingLeft: 20,
    paddingRight: 30,
  },
  mainTitleText: {
    fontSize: theme.fontSizeExtraXL,
    fontWeight: theme.fontWeightRegular,
    color: theme.black,
    fontFamily: theme.roboto,
  },
  subTitleText: {
    fontSize: theme.fontSizeMedium,
    color: theme.black
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  titleField: {
    paddingTop: 25,
    marginBottom: -20,
    color: theme.grey,
    fontSize: theme.fontSizeSmall
  },
  fieldContainer: {
    borderColor: theme.white,
    paddingBottom: 20,
    fontSize: theme.fontSizeNormal,
  },
  errorContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  bottomWrapper: {
    paddingBottom: -10,
    paddingHorizontal: 10,
  },
  buttonNext: {
    paddingTop: 40,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  buttonLogin: {
    color: theme.red,
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  borderGrey: {
    backgroundColor: theme.greyLine,
    height: 3,
  },
  paddingTop: {
    paddingTop: 20
  },
  checkBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowFieldAgreement: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 20,
  },
  checkboxLabel: [
    styles.fontSizeNormalStyle,
    {
      color: theme.black,
      paddingHorizontal: 20
    }
  ],
  buttonNext3: {

  },
  inlineField: {
    flexDirection: 'row',

  },
  childField: {
    width: width / 7,
  },
  childFieldper: {
    width: width / 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tintColor: {
    textInput: '#D72F33',
    successTextInput: '#4ED07D',
    disabled: theme.softGrey
  },
  imageContain: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  simobiPng: {
    width: 100,
    height: 40,
  },
  bodyContainerWithNoTerms: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },

  pinkBg: {
    backgroundColor: theme.pinkBrand,
    flex: 1,
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 70 : 50 : 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10
  },
  spaceContainer: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipsBox: {
    borderColor: theme.grey,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 60,
    width: width * 0.85,
  },
  tipsBoxText: {
    width: width * 0.75,
  },
  tipsTxt: {
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'Roboto',
    paddingVertical: 10
  },
  greyLine: {
    marginTop: 10,
    backgroundColor: theme.greyLine,
    height: 2,
  },
  titleTxt: {
    fontWeight: theme.fontWeightLight,
    fontFamily: 'Roboto'
  },
  promptTxt: {
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto'
  },
  switchRight: {
    paddingRight: 10
  },
  menu: {
    paddingTop: 25,
  },
  boxedInfo: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    flexDirection: 'row',
    marginVertical: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  iconColor: {
    color: theme.black,
  },
  info: {
    fontSize: theme.fontSizeSmall,
    color: theme.red,
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightBold,
    width: width - 100,
    marginLeft: 10
  },
  additionalInfoContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  additionalInfo: {
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightBold,
    width: width - 100,
    marginLeft: 10
  }
};
