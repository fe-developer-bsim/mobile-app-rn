import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default {
  bodyContainerWithTerms:
  [{
    flexGrow: 1,
    backgroundColor: theme.white,
    paddingBottom: -10,
    justifyContent: 'space-between'
  }, styles.contentContainerStyle],

  bodyContainerWithNoTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  },

  spaceContainer: {
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    paddingVertical: 20,
  },
  buttonWrapperHorizontal: {
    paddingVertical: 20,
    paddingHorizontal: 20
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
  missingInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.white,
  },
  subContainer:
  {
    justifyContent: 'space-between',
    padding: 0,
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
  mainTitleEmail: {
    paddingHorizontal: 20,
  },
  subTitle: {
    paddingLeft: 40,
    paddingRight: 50,
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.black,
    marginBottom: 20
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
    fontSize: theme.fontSizeNormal,
  },
  errorContainer: {
    paddingHorizontal: 30,
    paddingTop: 10,
    width: 400,
  },
  missingInfoBottomWrapper: {
    paddingBottom: 20,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  buttonNext: {
    padding: 20,
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
    flexDirection: 'row'
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
    fontFamily: 'roboto',
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
  },
  footer: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    marginBottom: 10
  },
  statementTitleText: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    paddingTop: 20
  },
  greyLine: {
    height: 8,
    backgroundColor: theme.greyLine,
    marginVertical: 15
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
  fieldFooter: {
    color: theme.textGrey,
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20
  },
  photoTextContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20
  },
  photoText: {
    fontSize: theme.fontSizeMedium,
    color: theme.brand,
    fontFamily: theme.roboto,
  },
  txtDeposit: {
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightMedium
  },
  pt20: {
    paddingTop: 20
  },
  container: {
    flex: 1,
  },
  preview: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  capture: {
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: theme.opacityBlack,
    width: width,
  },
  topContainer: {
    width: width,
    height: 10 / 100 * height,
    backgroundColor: theme.opacityBlack,
    alignSelf: 'flex-start',
  },
  sideContainer: {
    width: 15 / 100 * width,
    backgroundColor: theme.opacityBlack,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sideContainerSelfie: {
    paddingHorizontal: 20,
    width: width,
    height: height / 7,
    backgroundColor: theme.opacityBlack,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  rightText: [
    styles.fontSizeXLStyle,
    {
      transform: [{rotate: '90deg'}],
      width: 50 / 100 * height,
      color: theme.white,
      textAlign: 'center'
    }
  ],
  normalText: [
    styles.fontSizeXLStyle,
    {
      color: theme.white,
      textAlign: 'center'
    }
  ],
  footerText: [
    styles.fontSizeNormalStyle,
    {
      color: theme.white,
      textAlign: 'center'
    }
  ],
  leftText: [
    styles.fontSizeNormalStyle,
    {
      transform: [{rotate: '90deg'}],
      width: 50 / 100 * height,
      color: theme.white,
      textAlign: 'center'
    }
  ],
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rowCenterFee: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  centerText: {
    textAlign: 'center',
    fontSize: theme.fontSizeXL,
    color: theme.black
  },
  loanLeftText: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: theme.roboto,
  },
  loanRightText: {
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
  },
  loanRightTextRed: {
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
    color: theme.brand,
    fontWeight: theme.fontWeightBold
  },
  fieldComponent: {
    position: 'absolute',
    width: 130,
    right: 0
  },
  fieldComponentLoan: {
    position: 'absolute',
    width: 130,
    right: 0,
    top: -3,
  },
  borderGreyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginTop: 20,
  },
  loanAmountContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  rpText: {
    top: 12,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto
  },
  amountText: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto
  },
  dropdownText: {
    textAlign: 'right'
  },
  columnCenter: {
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  imgContainerAmount: {
    height: 100,
    width: 0.89 * width,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 15,
    marginTop: 10,
    zIndex: 1
  },
  imgContainerDetail: {
    height: 75,
    width: 0.89 * width,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 15,
    marginTop: 10,
    zIndex: 1
  },
  imgContainerRepayment: {
    height: 110,
    width: 0.89 * width,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 15,
    marginTop: 10,
    zIndex: 1
  },
  imageSummary: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  amountSummaryText: {
    fontSize: theme.fontSizeLarge,
    color: theme.white,
    textAlign: 'center',
    fontFamily: theme.roboto,
    paddingTop: 5
  },
  amountSummarySubText: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightBold,
    color: theme.white,
    textAlign: 'center',
    fontFamily: theme.roboto,
    paddingTop: 10
  },
  inlineFieldDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ph20: {
    paddingHorizontal: 20,
  },
  installmentDetailText: {
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    fontFamily: theme.roboto,
    paddingVertical: 5,
  },
  installmentEstimatedText: {
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    fontFamily: theme.roboto,
    paddingTop: 10,
  },
  installmentEstimatedTextBold: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
    fontFamily: theme.roboto,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: theme.fontWeightBold
  },
  iconInfo: {
    color: theme.white,
  },
  icon: {
    position: 'absolute',
    top: 13,
    left: 130,
    color: theme.white,
    transform: [{rotate: '180deg'}],
  },
  greyLineSummary: {
    borderTopWidth: 5,
    borderColor: theme.greyLine,
    marginTop: 10,
  },
  greyLineThin: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    marginTop: 10,
    opacity: 0.5
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  boxTnC: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.darkGrey,
    borderRadius: 5
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tncContainer: {
    alignItems: 'flex-start',
    width: width / 1.5
  },
  tncTxtTitle: [
    styles.fontSizeNormalStyle,
    {
      fontFamily: theme.roboto,
      fontWeight: theme.fontWeightRegular,
      color: theme.black,
      marginBottom: 5
    }
  ],
  tncTxt: [
    styles.fontSizeSmallStyle,
    {
      fontFamily: theme.robotoLight,
      fontWeight: theme.fontWeightLight,
      color: theme.black
    }
  ],
  redText: {
    fontFamily: theme.robotoLight,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmallStyle,
    color: theme.red
  },
  phv20: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  successContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center'
  },
  successImage: {
    width: width - 45,
    height: height / 4,
    alignItems: 'center'
  },
  successContent: {
    marginTop: 10,
    paddingVertical: 20,
    alignItems: 'center'
  },
  successText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightMedium,
    textAlign: 'center'
  },
  successSubText: {
    paddingVertical: 20,
    fontFamily: theme.robotoLight,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeMedium,
    textAlign: 'center',
    lineHeight: 25
  },
  successBold: {
    fontWeight: theme.fontWeightRegular
  },
  mb20: {
    marginBottom: 20
  },
  textPickerStyle: {
    textAlign: 'right'
  },
  sliderContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    bottom: 20
  },
  minimumAmount: {
    alignItems: 'flex-start'
  },
  maximumAmount: {
    alignItems: 'flex-end'
  },
  amount: {
    top: 12,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.robotoLight,
    color: theme.textGrey
  },
  termsContainer: {
    flex: 1,
    backgroundColor: theme.white,
    paddingBottom: 20,
  },
};
