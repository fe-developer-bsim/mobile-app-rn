import {theme} from '../../styles/core.styles';
import {contentContainerStyle, bold, fontSizeLargeStyle} from '../../styles/common.styles';

export default {
  scrollContainer: [contentContainerStyle],
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
    backgroundColor: theme.white,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20
  },
  topContainer: {
    backgroundColor: theme.white,
    paddingTop: 44,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 30,
    justifyContent: 'space-between'
  },
  middleContainer: {
    paddingVertical: 20,
  },
  flex1: {
    flex: 1
  },
  flex2: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.5,
  },
  titleContainer: {
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderColor: theme.greyLine
  },
  detailRow: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  detailRow2: {
    fontSize: theme.fontSizeLarge,
    color: theme.brand,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'roboto',
  },
  detailRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  quantityContainer: {
    width: 50
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 30
  },
  detailMap: {
    paddingVertical: 20
  },
  imageContainer: {
    paddingLeft: 4,
    justifyContent: 'center',
  },
  totalContainer: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: theme.greyLine,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  nameContainer: {
    paddingVertical: 10
  },
  footerContainer: {
    justifyContent: 'space-between',
    marginTop: -10,
  },
  footerItem: {
    marginBottom: 10
  },
  footerItem1: {
    marginBottom: 40
  },
  accNo: [bold, {color: theme.black}],
  buttonContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    backgroundColor: theme.white,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  amountBill2: [bold, fontSizeLargeStyle, {
    fontSize: theme.fontSizeXL,
  }],
  amountBill3: [bold, fontSizeLargeStyle, {
    fontSize: theme.fontSizeXL,
  }],
  receipt: {
    color: theme.textGrey,
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    textAlign: 'center',
    marginTop: 5,
    paddingBottom: 5
  },
  refnumContainer: {
    paddingBottom: 5
  },

  logo: {
    color: theme.white
  },
  date: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    justifyContent: 'flex-end',
  },
  status: [bold, {
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto',
    color: theme.black
  }],
  description: [bold, {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'roboto',
    color: theme.black
  }],
  transRefNum: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto'
  },
  title: {
    fontSize: theme.fontSizeXL,
    color: theme.black,
    fontFamily: 'roboto'
  },
  detailText: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: 'roboto'
  },
  detailTextRed: {
    fontSize: theme.fontSizeNormal,
    color: theme.brand,
    fontFamily: 'roboto'
  },
  amountText: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'roboto'
  },
  amountTextRed: {
    fontSize: theme.fontSizeNormal,
    color: theme.brand,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'roboto'
  },
  failDescription: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'roboto'
  },
  poinImage: {
    height: 10,
    width: 25
  },
  poinImageLarge: {
    height: 14,
    width: 35
  },
  total: [bold, {
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    fontFamily: 'roboto',

  }],
  totalNew: [bold, {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    fontFamily: 'roboto',

  }],
  name: {
    fontSize: theme.fontSizeNormal,
    color: theme.textGrey,
    fontFamily: 'roboto'
  },
  nameBold: {
    fontSize: theme.fontSizeNormal,
    color: theme.textGrey,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightMedium
  },
  footerTextGrey: {
    fontSize: theme.fontSizeSmall,
    color: theme.textGrey,
    fontFamily: 'roboto',
  },
  footerTextRed: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: 'roboto',
  },
  footerTextRed2: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: 'roboto',
    paddingBottom: 20
  },
  logoSuccess: {
    position: 'absolute',
    width: 200,
    height: 200,
    marginLeft: -80,
    marginTop: 10
  },
  logoFail: {
    color: theme.grey,
  },
  logoFailCircle: {
    color: theme.grey,
    paddingTop: 90,
  },
  mainTitleLogo: {
    width: 80,
    height: 30,
  },
  button: {
    flex: 1,
    paddingHorizontal: 10,
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 4,
  },
  greyContainer: {
    paddingTop: 30,
    marginHorizontal: -20
  },
  logoSuccessIcon: {
    paddingTop: 30,
    color: theme.green
  },
  share: {
    marginTop: 10,
    paddingHorizontal: 10,
    color: theme.black,
    fontSize: 19,
  },
  footerTextGrey1: {
    fontSize: theme.fontSizeSmall,
    color: theme.textGrey,
    fontFamily: 'roboto',
    paddingTop: 15
  },
  footerTextGrey2: {
    fontSize: theme.fontSizeSmall,
    color: theme.textGrey,
    fontFamily: 'roboto',
    justifyContent: 'flex-end',
    paddingTop: 10
  },
  close: {
    color: theme.black,
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: -10,
    fontSize: 19
  },
  product: {
    color: theme.black,
    marginTop: 5
  },
  roboto: {
    fontFamily: 'roboto',
    color: theme.black
  },
  lineAlfa: {
    borderWidth: 1,
    borderColor: theme.dashLine,
    borderStyle: 'dashed',
    marginBottom: 25,
    borderRadius: 1,
    marginTop: 20
  },
  ph15: {
    paddingHorizontal: 15
  },
  time: {
    color: theme.black,
    textAlign: 'center',
  },
  transdetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 15
  },
  transdetailId: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 2,
    paddingHorizontal: 15
  },
  logoFailed: {
    width: 150,
    height: 30,
    marginTop: 30,
    resizeMode: 'contain',
    paddingVertical: 20,
    justifyContent: 'flex-start'
  },
  titleContainerFailed: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  transactionDate: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    marginTop: 30,
    marginRight: 20,
    color: theme.black,
  },
  redText: {
    color: theme.brand,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
  },
  buttonContainerFailed: {
    paddingHorizontal: 20,
    backgroundColor: theme.white,
    marginBottom: 50
  },
  transaction: {
    color: theme.textGrey,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
  },
  rowFieldAgreement: {
    flexDirection: 'row',
  },
  mainTitleCheckBox: {
    paddingHorizontal: 20,
    backgroundColor: theme.white,
  },
  containtextExplanation: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.grey,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20
  },
  checkboxLabel: [
    theme.fontSizeMediumStyle,
    {
      color: theme.black,
      fontWeight: theme.fontWeightMedium,
      paddingRight: 20
    }
  ],
  tncTxt: [
    theme.fontSizeNormalStyle,
    {
      fontFamily: theme.robotoLight,
      fontWeight: theme.fontWeightRegular,
      color: theme.black
    }
  ],
  checkboxStyle: {
    width: 20,
    height: 20,
  },
  linearGradient: {
    borderRadius: 5,
    marginHorizontal: -10,
    paddingHorizontal: 20,
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  luckyDipBox: {
    paddingVertical: 5,
    paddingRight: 40
  },
  iconBoxLuckyDip: {
    alignItems: 'center',
    width: 50,
    height: 50
  },
  rowCenterLuckyDip: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  width: {
    width: 50,
  },
  paddingHHHBanner: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25
  },
  fontBannerHHH: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    color: theme.white
  },
  iconLuckyDip: {
    width: 175,
    height: 25
  },
  textBannerContainer: {
    paddingLeft: 5
  },
  fontBannerHHHTwo: {
    fontWeight: theme.fontWeightBold
  },
  fontBannerHHHFour: {
    textDecorationLine: 'underline',
  },
  headerButtonContainer: {
    flexDirection: 'row',
    width: 65,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginTop: 20
  },
  mainTitleLogoSuccess: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
    paddingVertical: 40,
    paddingRight: 50,
  },
  whiteBgHHH: {
    backgroundColor: theme.white,
  }
};
