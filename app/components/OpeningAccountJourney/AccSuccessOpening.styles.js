import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle, fontSizeSmallStyle, fontSizeXLStyle, fontSizeLargeStyle, fontSizeNormalStyle, bold} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default {
  innerContainerStyles: {
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 30,
    padding: 20
  },

  backgroundImage: {
    width: null,
    height: 130,
    resizeMode: 'cover',
    borderRadius: 100,
    paddingBottom: 30
  },
  footer: {
    paddingBottom: 30
  },
  padding: {
    padding: 10
  },
  paddingBoxTwo: {
    paddingVertical: 10,
    paddingTop: 5
  },
  paddingBoxThree: {
    paddingVertical: 10,
    paddingTop: 15
  },
  rowText: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row'
  },
  rowTextSecondBox: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingVertical: 8
  },
  aprovedText: {
    backgroundColor: theme.green,
    width: 80,
    height: 17,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 10,
    alignSelf: 'flex-end'
  },
  aprovedTextColor: {
    color: 'white',
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    textAlign: 'center',
    fontWeight: theme.fontWeightBold
  },
  loanText: {
    alignItems: 'center'
  },
  loanTitleText: {
    fontSize: theme.fontSizeLarge,
    paddingBottom: 10,
    fontFamily: 'roboto',
    color: 'white',
  },
  loanAmountText: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto',
    color: 'white',
  },
  normalText: {
    color: 'white',
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
  },
  greyLine: {
    height: 1,
    backgroundColor: 'white'
  },
  greyBox: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  normalTextRate: {
    width: 175,
    color: 'white',
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
  },
  backgroundImageBoxThree: {
    width: null,
    height: 145,
    resizeMode: 'cover',
    borderRadius: 100,
    paddingBottom: 30
  },
  container: [
    {
      paddingTop: 8,
    }
  ],
  imageContainer: {
    height: 190,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    margin: 2,
    borderRadius: 15
  },

  featureIconContainer: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  arrowIconContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  roundBorder: {
    borderRadius: 20
  },
  normalTextAccount: {
    color: 'white',
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    textAlign: 'right'
  },

  savingsFeatureIcon: {
    color: theme.white
  },
  depositFeatureIcon: {
    color: theme.white
  },
  creditCardFeatureIcon: {
    color: theme.white
  },
  rdnFeatureIcon: {
    color: theme.white
  },
  loanFeatureIcon: {
    color: theme.white
  },
  savingsFeatureTitle: {
    color: theme.white,
    marginBottom: 34,
    fontFamily: 'roboto',
    paddingTop: 10
  },
  depositFeatureTitle: {
    color: theme.white,
    marginBottom: 34,
    fontFamily: 'roboto',
    paddingTop: 10
  },
  creditCardFeatureTitle: {
    color: theme.white,
    marginBottom: 34,
    fontFamily: 'roboto',
    paddingTop: 10
  },
  rdnFeatureTitle: {
    color: theme.white,
    marginBottom: 34,
    fontFamily: 'roboto',
    paddingTop: 10
  },
  loanFeatureTitle: {
    color: theme.white,
    marginBottom: 18,
    fontFamily: 'roboto',
    paddingTop: 10
  },
  savingsValue: [
    fontSizeXLStyle,
    {
      color: theme.white,
      marginBottom: 17,
      fontFamily: 'roboto',
    }
  ],
  depositValue: [
    fontSizeXLStyle,
    {
      color: theme.white,
      marginBottom: 17,
      fontFamily: 'roboto',
    }
  ],
  rdnValue: [
    fontSizeXLStyle,
    {
      color: theme.white,
      marginBottom: 17,
      fontFamily: 'roboto',
    }
  ],
  loanValueLarge: [
    fontSizeXLStyle,
    {
      color: theme.white,
      marginBottom: 34,
      fontFamily: 'roboto',
    }
  ],
  loanValue: [
    fontSizeMediumStyle,
    bold,
    {
      color: theme.white,
      marginBottom: 7,
      fontFamily: 'roboto',
    }
  ],
  loanDesc: [
    fontSizeSmallStyle,
    {
      color: theme.white,
      fontFamily: 'roboto',
    }
  ],
  savingsAccountNumberValue: [
    fontSizeMediumStyle,
    {
      color: theme.white,
      fontFamily: 'roboto',
      letterSpacing: 1.5
    }
  ],
  savingsAccountNumberText: [
    fontSizeSmallStyle,
    {
      color: theme.white,
      fontFamily: 'roboto',
      paddingRight: 5
    }
  ],
  rdnAccountNumberText: [
    fontSizeSmallStyle,
    {
      color: theme.white,
      fontFamily: 'roboto',
      paddingRight: 5
    }
  ],
  rdnAccountNumberValue: [
    fontSizeMediumStyle,
    {
      color: theme.white,
      fontFamily: 'roboto',
      letterSpacing: 1.5
    }
  ],
  savingsArrowIcon: {
    color: theme.white
  },
  rdnArrowIcon: {
    color: theme.white
  },
  depositAccountNumberValue: [
    fontSizeMediumStyle,
    {
      color: theme.white,
      fontFamily: 'roboto',
    }
  ],
  depositAccountNumberText: [
    fontSizeSmallStyle,
    {
      color: theme.white,
      paddingRight: 5,
      fontFamily: 'roboto',
    }
  ],
  depositArrowIcon: {
    color: theme.white
  },
  creditCardAccountNumberValue: [
    fontSizeLargeStyle,
    {
      color: theme.white,
      marginTop: 10,
      marginBottom: 10,
      fontFamily: 'roboto',
    }
  ],
  creditCardExpiryTitle:
  {
    fontSize: theme.fontSizeXS,
    color: theme.white,
    textAlign: 'right',
    fontFamily: 'roboto',
  },
  creditCardExpiry: [
    fontSizeMediumStyle,
    {
      color: theme.white,
      fontFamily: 'roboto',
    }
  ],
  creditCardAccountName: [
    fontSizeNormalStyle,
    {
      color: theme.white,
      fontFamily: 'roboto',
    }
  ],
  creditCardArrowIcon: {
    color: theme.white
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  visibility: {
    textDecorationLine: 'underline',
    color: 'white',
    marginBottom: 17
  },
  visibilityPadding: {
    paddingLeft: 10
  },
  accountHiddenText: [
    fontSizeNormalStyle,
    {
      color: theme.white,
      marginBottom: 17,
      fontFamily: 'roboto',
    }
  ],
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20
  },
  card: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20
  },
  hideIcon: {
    width: 25,
    height: 25,
    zIndex: 1,
  },
  eyeFillColor: {
    color: theme.opacityWhite
  },
  eyeStrokeColor: {
    color: theme.white
  },
  detailContainer: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: 'transparent',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  arrowContainer: {
    margin: 20,
    marginBottom: 30
  },
  arrowIconCc: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 10
  },
  codeMerchant: {
    color: theme.white,
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeMedium,
    fontFamily: theme.roboto
  },
  containerCode: {
    marginBottom: 5
  },
  textSubtitleLoan: {
    color: theme.white,
    fontFamily: 'roboto',
    fontSize: theme.fontSizeSmall    
  },
  textTitleLoan: {
    color: theme.white,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold
  },
  boxSubtitle: {
    paddingTop: 5,
    paddingBottom: 8
  },
  rowLoan: {
    flexDirection: 'row',
  },
  blockOne: {
    width: 45,
    alignItems: 'center',
    paddingTop: 10,
  },
  blockTwo: {
    paddingTop: 8,
  },
  verticalLine: {
    width: 1,
    height: 25,
    backgroundColor: 'white'
  },
  circleCheck: {
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    height: 17,
    width: 17,
    justifyContent: 'center'
  },
  checkList: {
    color: 'black',
  },
  textTitleLoanApprove: {
    paddingVertical: 25,
    color: theme.white,
    fontFamily: 'roboto',
  },
  arrowIconContainerLoan: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  bodyContainerWithNoTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10,
    paddingTop: 40
  },
  summaryContainer: {
    paddingHorizontal: 20,
  },
  imgContainerAmount: {
    // height: 120,
    // width: 0.89 * width,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 15,
    marginTop: 10,
    zIndex: 1
  },
  imgContainerDetail: {
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
    paddingTop: 10,
    paddingBottom: 30
  },
  buttonWrapperHorizontal: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  ph20: {
    padding: 20,
  },
  inlineFieldDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  installmentDetailText: {
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    fontFamily: theme.roboto,
    paddingVertical: 3,
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
  greyLineThin: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    marginTop: 10,
    opacity: 0.5
  },
  redIconBack: {
    transform: [{rotate: '180deg'}],
    color: theme.red,
    paddingLeft: 15,
    paddingTop: 10,
    width: 40
  },
  bodyContainer: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  },

  buttonContainer: {
    padding: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 70,
    marginBottom: 20
  },
  buttonLeft: {
    flex: 1,
    paddingRight: 10
  },
  buttonRight: {
    flex: 1,
    paddingLeft: 10
  },
  ph20KPR: {
    top: 90,
    paddingHorizontal: 20,
  },
  imageSummaryDetail: {
    flex: 1,
    width: null,
    height: height / 2.7,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  noticeBox: {
    marginVertical: 20
  },
  textDetail: {
    color: theme.black,
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto
  },
};
