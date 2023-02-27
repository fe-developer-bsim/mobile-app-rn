import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle, fontSizeSmallStyle, fontSizeXLStyle, fontSizeLargeStyle, fontSizeNormalStyle, bold} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default {
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
    borderRadius: 15,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
  },
  backgroundImage2: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
    backgroundColor: theme.opacityMidWhite,
  },
  featureIconContainer: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  arrowIconContainer: {
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  arrowIconContainer3: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  loanArrow: {
    color: 'white'
  },
  loanAmountGo: {
    color: theme.white,
    fontFamily: 'roboto',
    fontSize: theme.fontSizeXL,
    paddingBottom: 10
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
  rowNoSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    margin: 20,
    marginBottom: 30
  },
  arrowContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowIconCc: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 10
  },
  imageOffer2: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: 100,
    bottom: 50,
  },
  informationText: {
    position: 'absolute',
    right: 115,
    bottom: 50,
    alignItems: 'center'
  },
  cvvNumber: {
    position: 'absolute',
    backgroundColor: theme.white,
    right: 100,
    bottom: -15,
  },
  textBlack: {
    color: theme.black,
    fontWeight: 'bold',
    fontSize: theme.fontSizeMedium,
    padding: 5
  },
  codeMerchant: {
    color: theme.white,
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
    marginBottom: 10,
  },
  containerCode: {
    marginBottom: 5
  },
  defAcc: [bold, {
    textAlign: 'center',
    color: theme.textGrey,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  }],
  circleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
    backgroundColor: theme.radicalRed,
    height: 8,
    width: 30,
    borderRadius: 15,
    marginHorizontal: 5
  },
  circleView2: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
    backgroundColor: theme.grey,
    height: 8,
    width: 10,
    borderRadius: 15,
  },
  setAcc: {
    textAlign: 'center',
    color: theme.brand,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    paddingLeft: 10
  },
  iconKey: {
    color: theme.black
  },
  checkDefault: {
    color: theme.brand,
  },
  iconStyle:
  {
    color: theme.textGrey,
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
    paddingBottom: 5,
    marginBottom: 5
  },
  rowLoan: {
    flexDirection: 'row',
  },
  blockOne: {
    width: 45,
    alignItems: 'center',
    paddingTop: 8,
  },
  blockTwo: {
    paddingTop: 8,
  },
  verticalLine: {
    width: 1,
    height: 25,
    backgroundColor: 'white'
  },
  verticalLineSA: {
    width: 1,
    height: 40,
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
    color: 'green',
  },
  textTitleLoanApprove: {
    paddingVertical: 23,
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
  buttonPay: {
    alignItems: 'center',
    backgroundColor: '#2c2aa6',
    borderRadius: 3,
    justifyContent: 'center',
    height: 50,
  },
  textPay: {
    color: theme.white,
    fontSize: theme.fontSizeMedium,
    textAlign: 'center',
    alignItems: 'center'
  },
  mmqArrowIcon: {
    color: theme.white
  },
  mmqFeatureIcon: {
    color: theme.white
  },
  mmqFeatureTitle: {
    color: theme.white,
    marginBottom: 25,
    fontFamily: 'roboto',
    paddingTop: 10
  },
  mmqValueLarge: [
    fontSizeXLStyle,
    {
      color: theme.white,
      marginBottom: 10,
      fontFamily: 'roboto',
    }
  ],
  mmqExpiryTitle:
  {
    fontSize: theme.fontSizeXS,
    color: theme.white,
    textAlign: 'right',
    fontFamily: 'roboto',
  },
  mmqExpiry: [
    fontSizeMediumStyle,
    {
      color: theme.white,
      fontFamily: 'roboto',
    }
  ],
  mmqAccountName: [
    fontSizeNormalStyle,
    {
      color: theme.white,
      fontFamily: 'roboto',
    }
  ],
  reloadBalance: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  reloadIcon: {
    paddingHorizontal: 5,
    color: theme.white
  },
  reloadText: {
    color: theme.white,
    fontSize: theme.fontSizeLarge,
    fontFamily: theme.roboto
  },
  borderSignDocument: {
    paddingTop: 20
  },
  buttonSignDocument: {
    alignItems: 'center',
    backgroundColor: theme.brand,
    borderRadius: 30,
    justifyContent: 'center',
    height: 40
  },
  textSignDocument: {
    fontFamily: theme.roboto,
    color: theme.white,
    fontSize: theme.fontSizeMedium,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: theme.fontWeightBold
  },
  blockTwoOA: {
    marginBottom: 5
  },
  textTitleLoanApproveOA: {
    paddingTop: 12,
    paddingBottom: 12,
    color: theme.white,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeSmall
  },
  textTitleLoanOA: {
    color: theme.white,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeSmall,
    marginBottom: 15
  },
  textTitleLoanOASA: {
    color: theme.white,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeSmall,
    marginBottom: 32
  },
  textTitleLoanOAIOS: {
    color: theme.white,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeSmall,
    marginBottom: 9
  },
  textTitleLoanOAIOSSA: {
    color: theme.white,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeSmall,
    marginBottom: 25
  },
  titleContainer: {
    marginTop: 1
  },
  reloadUpdates: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25
  },
  detailRow: {
    flexDirection: 'row',
    marginTop: 5
  },
  detailRowSA: {
    flexDirection: 'row',
    marginTop: 12
  },
  detailRowAndr: {
    flexDirection: 'row',
    marginTop: 5
  },
  detailRowAndrSA: {
    flexDirection: 'row',
    marginTop: 15
  },
  boxedInfo: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.newLightGrey,
    backgroundColor: theme.newLightGrey,
    flexDirection: 'row',
    marginVertical: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  iconColor: {
    color: theme.textGrey,
    transform: [{rotate: '180deg'}]
  },
  info: {
    fontSize: 11,
    color: theme.textGrey,
    fontFamily: theme.roboto,
    width: width - 100,
    marginLeft: 10
  },
  imagestyle: {
    height: 25,
    width: 33,
    marginTop: -20
  },
  arrowIconContainer2: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 2
  },
  textWhite: {
    color: theme.white,
    fontWeight: 'bold',
    fontSize: theme.fontSizeMedium,
    padding: 5,
  },
  cvvNumber2: {
    position: 'absolute',
    right: 150,
    bottom: -15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    backgroundColor: theme.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: width,
    maxHeight: height * 0.7,
    paddingBottom: 15,
    alignItems: 'center',
  },
  simasTaraDetailTitle: {
    width: width,
    paddingHorizontal: 20,
    marginBottom: 15,
    color: theme.darkBlue,
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold
  },
  modalDetailRow: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 15,
    alignItems: 'center'
  },
  modalDetailLabel: {
    color: theme.softGrey,
  },
  modalDetailValue: {
    fontWeight: theme.fontWeightBold,
    color: theme.darkBlue,
    width: width * 0.4,
    textAlign: 'right'
  },
  greyLine: {
    height: 1,
    width: width * 0.9,
    backgroundColor: theme.newLightGrey,
  },
  simasTaraDetailContainer: {
    alignItems: 'center',
  },
  closeSimasTaraButton: {
    width: width - 40,
    marginVertical: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 20,
    alignSelf: 'center',
    backgroundColor: '#f9f8fd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
  },
  closeSimasTaraIcon: {
    color: theme.pinkBrand
  },
  closeSimasTaraLabel: {
    color: theme.pinkBrand,
    fontWeight: theme.fontWeightBold,
  },
  closeSimasTaraArrow: {
    marginTop: 3,
    color: theme.pinkBrand,
    flex: 1,
    textAlign: 'right'
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  simasTaraDetailArrowClose: {
    width: width * 0.6,
    alignItems: 'center',
    paddingVertical: 15,
  },
  simasTaraDetailArrow: {
    transform: [{rotate: '90deg'}],
    color: theme.darkBlue,
  },
  center: {
    alignItems: 'center',
    flex: 1,
  },
  lockedTitle: {
    color: theme.darkBlue,
    fontWeight: 'bold',
  },
  lockContainer: {
    width: width - 40,
    marginTop: 10,
  },
  brandPadding: {
    paddingRight: 15,
    paddingLeft: 1,
  },
  boxLocked: {
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingVertical: 15,
    backgroundColor: theme.superlightGrey,
  },
  rowContainer3: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  valueContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 15
  },
  rowContainer2: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: theme.disabledGrey,
  },
  lockedBalanceNote: {
    fontSize: theme.fontSizeNormal,
    marginRight: 20,
  },
  cautionIcon: {
    paddingTop: 2,
    marginRight: 5,
  },
  accountNumberContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  blockOneLoop: {
    width: 45,
    alignItems: 'center',
    paddingTop: 5,
  },
  circleCheckLoop: {
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    height: 15,
    width: 15,
    justifyContent: 'center'
  },
  detailRowLoop: {
    flexDirection: 'row',
    marginTop: 2
  },
  boxSubtitleIOS: {
    paddingTop: 5,
    paddingBottom: 3,
    marginBottom: 2
  }
};
