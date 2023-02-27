import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import * as styles from '../../styles/common.styles';


export default {
  bodyContainerWithTerms:
  [{
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  }, styles.contentContainerStyle],
  bodyContainerWithNoTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10,
    padding: 20
  },
  spaceContainer: {
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonWrapper2: {
    paddingVertical: 20,
  },
  container:
  {
    flexGrow: 1,
    backgroundColor: theme.white
  },
  missingInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.white
  },
  subContainer:
  {
    justifyContent: 'space-between',
  },
  columnContainer: {
    flexGrow: 1,
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
  mainContainer: {
    maxWidth: width - 40
  },
  mainTitle: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mainTitleConf: {
    paddingTop: 0
  },
  subTitle: {
    paddingLeft: 40,
    paddingRight: 50,
  },
  mainTitleText: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    fontWeight: theme.fontWeightBold
  },
  subTitleText: {
    fontSize: theme.fontSizeMedium,
    color: theme.black
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 20,
  },
  contentWrapper: {
    paddingHorizontal: 20,
  },
  orami: {
    color: '#F16D6E',
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
    paddingHorizontal: 30,
    paddingTop: 10,
    width: 400,
  },
  bottomWrapper: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1
  },
  missingInfoBottomWrapper: {
    paddingBottom: 20,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  buttonNext: {
    paddingTop: 20,
    flex: 1
  },
  buttonNextConf: {
    flex: 1
  },
  buttonNextPadding: {
    paddingTop: 40,
    flex: 1,
    marginHorizontal: 10
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
  buttonLargeTextSecondary: {
    fontSize: theme.fontSizeMedium,
    color: theme.brand,
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
  },
  checkboxLabel: [
    styles.fontSizeNormalStyle,
    {
      color: theme.black,
      paddingRight: 20
    }
  ],
  buttonNext3: {
    paddingTop: 190,
  },
  inlineField: {
    flexDirection: 'row',
  },
  inlineFieldEmail: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  childField: {
    width: width / 4,
  },
  childDivide: {
    flexDirection: 'row',
    marginTop: 7,
    marginHorizontal: 5
  },
  childFieldper: {
    width: width / 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captchaFieldContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
    alignSelf: 'center'
  },
  captchaIcon: {
    width: 130,
    height: 50
  },
  captchaPadding: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  captchaBorder: {
    borderWidth: 0.5,
    borderColor: theme.placeholderTextColor,
  },
  refreshCaptcha: {
    textDecorationLine: 'underline',
    fontSize: theme.fontSizeSmall,
    color: theme.placeholderTextColor,
  },
  captchaLoader: {
    size: 80,
    borderWidth: 0,
    color: theme.brand,
    unfilledColor: theme.containerGrey
  },
  captchaInfo: {
    color: theme.placeholderTextColor,
    fontSize: theme.fontSizeSmall,
    paddingVertical: 5,
    textAlign: 'left'
  },
  refreshCaptchaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  paddingAddition: {
    paddingTop: 20,
    paddingHorizontal: 0
  },
  captchaContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    paddingRight: 10
  },
  loginFieldsContainer: {
    flexDirection: 'column'
  },
  cameraIconStyle: {position: 'absolute', width: 25, right: 0, top: 35},
  greenIcon: {color: theme.green},
  redBar: {
    backgroundColor: theme.brand,
    flexDirection: 'row',
  },
  greyBar: {
    backgroundColor: theme.darkGrey,
    flexDirection: 'row',
  },

  progressBar: {
    flexDirection: 'row',
    height: 7
  },
  finePrint: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
  },
  footer: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    marginBottom: 10
  },
  statementTitleText: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    paddingTop: 20
  },
  borderedContainer: {
    borderWidth: 1,
    borderRadius: 5,
    width: 120,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  rightBorder: {
    borderRightWidth: 1,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    height: 40,
    width: 40
  },
  center: {
    height: 40,
    width: 40,
    paddingVertical: 5,
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  quantity: {
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
  },
  mediumText: {
    fontSize: theme.fontSizeMedium,
    fontFamily: theme.roboto,
  },
  largeText: {
    fontSize: theme.fontSizeXL,
    fontFamily: theme.roboto,
    textAlignVertical: 'center',
  },
  largeTextDisabled: {
    fontSize: theme.fontSizeXL,
    color: theme.textLightGrey,
    fontFamily: theme.roboto,
    textAlignVertical: 'center',
  },
  amountContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  dependantContainer: {
    marginVertical: 20,
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
    color: theme.black,
    fontFamily: theme.robotoLight,
    width: width - 100,
    marginLeft: 10
  },
  fieldFooter: {
    color: theme.textGrey,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
  },
  photoTextContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  photoText: {
    fontSize: theme.fontSizeMedium,
    color: theme.brand,
    fontFamily: theme.roboto,
  },
  outerContainer: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  image: {
    width: width - 80,
    height: width / 2
  },
  contentText: {
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  subContentTextTop: {
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightLight,
    fontFamily: theme.roboto
  },
  subContentTextBottom: {
    color: theme.black,
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightLight,
    fontFamily: theme.roboto
  },
  borderGreyTop: {
    marginVertical: 15,
    backgroundColor: theme.greyLine,
    height: 2,
  },
  textTop: {
    fontFamily: theme.roboto, 
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    fontWeight: '100'
  },
  textBottom: {
    fontFamily: theme.roboto, 
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    fontWeight: theme.fontWeightLight
  },
  sendAccountDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  detailLeft: {
    paddingTop: 5,
    paddingBottom: 10
  },
  detailRight: {
    paddingTop: 10,
    alignItems: 'flex-end'
  },
  btnContainer: {
    width: width / 3.5,
    paddingVertical: 10
  },
  borderGreyThin: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  borderGreyThick: {
    backgroundColor: theme.greyLine,
    height: 3,
  },
  buttonText: {
    color: theme.white,
    fontSize: theme.fontSizeLarge
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pt20: {
    paddingTop: 20
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    width: 100,
    height: 100
  },
  greyLine: {
    height: 3,
    backgroundColor: theme.greyLine,
    marginHorizontal: -20,
    marginVertical: 10
  },
  rightTopContain: {
    marginLeft: 20,
    paddingRight: 90
  },
  textProductTitle: {
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightBold
  },
  textProductContainer: {
    paddingTop: 7
  },
  textProductSubTitle: {
    color: theme.black,
    fontSize: theme.fontSizeSmall
  },
  containtextExplanation: {
    borderColor: theme.softGrey,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginTop: 10
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: 'Roboto',
    alignItems: 'center',
    width: width - 100,
  },
  explainIcon: {
    paddingRight: 10
  },
  titleShipTo: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    fontWeight: theme.fontWeightBold,
    paddingVertical: 10
  },
  noteContainer: {
    paddingTop: 20
  },
  titleCustomer: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontWeight: theme.fontWeightBold
  },
  paddingText: {
    paddingTop: 3
  },
  rowCheckBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30
  },
  textCheckBox: {
    paddingHorizontal: 20
  },
  valueText: {
    fontSize: theme.fontWeightBold
  },
  paddingTopDisclaimer: {
    paddingTop: 30
  },
  rowResi: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  resiText: {
    fontSize: theme.fontSize20
  },
  titleTextResi: {
    paddingBottom: 20
  },
  urlTip: {
    paddingTop: 20
  },
  iconCopy: {
    color: theme.red
  },
  textResiStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    fontWeight: theme.fontWeightBold,
  },
  textEmptyResiStyle: {
    fontSize: theme.fontSizeNormal,
    color: theme.grey,
    fontWeight: theme.fontWeightBold,
  },
  webStyle: {
    fontWeight: theme.fontWeightBold
  },
  addressSign: {
    textDecorationLine: 'underline',
    color: theme.blueAmount
  }
};
