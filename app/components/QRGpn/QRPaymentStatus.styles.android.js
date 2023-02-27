import {theme} from '../../styles/core.styles';
import {contentContainerStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

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
    paddingTop: 36,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 8,
    borderColor: theme.greyLine
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 30,
    justifyContent: 'space-between'
  },
  middleContainer: {
    padding: 20,
  },
  flex1: {
    flex: 1
  },
  titleContainer: {
    paddingVertical: 20,
    borderColor: theme.greyLine
  },
  detailRow: {
    flexDirection: 'row',
    paddingBottom: 10
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
    paddingLeft: 30,
    marginTop: 5
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  nameContainer: {
    paddingVertical: 10
  },
  footerContainer: {
    marginTop: 50,
    paddingHorizontal: 20
  },
  footerItem: {
    marginBottom: 10
  },
  buttonContainer: {
    paddingTop: 20
  },
  refnumContainer: {
    paddingBottom: 5
  },

  logo: {
    color: theme.white
  },
  date: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto'
  },
  status: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto'
  },
  description: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'roboto'
  },
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
  total: {
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    fontFamily: 'roboto'
  },
  totalAmount: {
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    fontFamily: 'roboto',
    fontWeight: 'bold'
  },
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
  logoSuccess: {
    color: theme.green
  },
  logoFail: {
    color: theme.grey
  },
  mainTitleLogo: {
    width: 80,
    height: 30,
  },
  senderDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20
  },
  walletIcon: {
    color: theme.wallet,
    paddingRight: 10,
  },
  sendAccNumber: {
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    color: theme.black
  },
  greyDot: {
    color: theme.grey,
    marginLeft: 3,
    marginBottom: 5
  },
  payeeDetail: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: 'center'
  },
  profileIcon: {
    color: '#0787e3',
    paddingRight: 10,
    paddingTop: 10
  },
  timeInitiate: {
    paddingTop: 15
  },

  timeInitiateText: {
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto'
  },
  sendAccNameType: {
    color: theme.black,
    fontFamily: theme.robotoLight,
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: theme.grey,
    marginVertical: 10
  },
  borderTopCoupon: {
    borderTopWidth: 1,
    borderColor: theme.grey,
    marginRight: 20,
    marginLeft: 20
  },
  paddingCoupon: {
    paddingVertical: 15,
  },
  backgroundColorCouponUse: {
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 128, 0, 0.1)',
  },
  rowCou: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  iconWidth: {
    width: 40,
    height: 40
  },
  couponTextUse: {
    color: theme.black,
    width: width - 120,
    fontFamily: 'roboto',
    paddingLeft: 20,
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
  paddingHHH: {
    padding: 20
  }
};
