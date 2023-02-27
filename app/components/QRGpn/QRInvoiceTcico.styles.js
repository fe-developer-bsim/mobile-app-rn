import {theme, bold} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {height, width} = Dimensions.get('window');
import {contentContainerStyle, fontSizeLargeStyle, fontSizeSmallStyle} from '../../styles/common.styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  container: [contentContainerStyle, {marginTop: height * 0.5}],

  containerContent: [{flexGrow: 1, backgroundColor: theme.superlightGrey, justifyContent: 'space-between'}],

  headerRow: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  imageSummary: {
    flex: 1,
    width: width,
    height: height * 0.9,
    position: 'absolute',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  tes: {
    alignItems: 'center'

  },
  walletIcon: {
    color: theme.wallet,
    paddingRight: 10,
  },
  profileIcon: {
    color: '#0787e3',
    paddingRight: 10,
    paddingTop: 10
  },
  greyDot: {
    color: theme.darkBlue,
    marginLeft: 3,
  },
  senderDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  payeeDetail: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: 'center'
  },
  sendAccNumber: {
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    color: theme.black
  },
  sendAccName: {
    color: theme.darkBlue,
    fontFamily: theme.robotoLight,
    fontSize: 15,
    fontWeight: theme.fontWeightBold,

  },
  sendAccType: {
    color: theme.darkBlue,
    fontFamily: theme.robotoLight,
  },
  title: {
    fontSize: theme.fontSize22,
    fontFamily: 'roboto',
    color: theme.black
  },
  labelSpacing: {
    paddingVertical: 10
  },

  titleContainer: {
    marginBottom: 15
  },

  textInputContainerPadding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.grey,
    borderRadius: 10,
    height: 55,
  },
  topContainer: {
    alignItems: 'center',
    height: hp('100%'),
  },
  amountField: {
    textAlign: 'center',
    flex: 1,
    fontSize: theme.fontSize20,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
    marginLeft: 30
  },
  leftIcon: {
  },

  rightIcon: {
    right: 10,
  },

  timeInitiate: {
    paddingTop: 0
  },

  timeInitiateText: {
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto'
  },

  greyLineBold: {
    backgroundColor: theme.grey,
    height: 2,
  },
  greyLineThin: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: 330
  },
  summaryContainer: {
    flex: 1,
    paddingVertical: 15
  },

  headerSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
  summaryArea: {
    borderBottomWidth: 1,
    borderColor: theme.grey,
    paddingBottom: 10,
    marginBottom: 10
  },
  rowItem: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  detailTitle: [bold, {
    marginBottom: 2,
    fontFamily: 'Roboto',
    color: theme.black
  }],
  rowItemRight: {
    alignSelf: 'flex-start',
    flexDirection: 'row'
  },
  rightItemContainer: {
  },
  summaryDetail: {
    fontFamily: theme.robotoLight,
    color: theme.black
  },
  rightItemText: {
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
  amountLeft: {
    fontWeight: theme.fontWeightMedium
  },
  amountRight: {
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeMedium,
    marginLeft: 15,
    // justifyContent: 'center',
  },
  textAmount: {
    top: Platform.OS === 'ios' ? 10 : 25
  },
  amountRightNote: {
    marginTop: 15,
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeMedium,
    // justifyContent: 'center'
  },
  bottomSpacing: {
    marginTop: hp('0%'),
    backgroundColor: theme.white,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  halfWidth: {
    flex: 1
  },
  detailAmtHide: {
    height: 0,
    width: 0,
  },
  box: {
    borderWidth: 1,
    borderColor: theme.grey,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  amount: {
    color: '#4ed07d',
  },
  amountText: [bold, fontSizeLargeStyle, {
    fontFamily: 'Roboto',
    color: theme.black,
  }],
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  information: {
    color: theme.brand,
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
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
    marginTop: 10
  },
  containExplantionRight: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: 'Roboto',
    width: width - 100,
    marginLeft: 10
  },
  explainIcon: {
    color: theme.black
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4
  },
  smallGreyText: [fontSizeSmallStyle, {
    color: theme.darkBlue,
    fontFamily: 'Roboto',
    fontSize: 13
  }],
  extraPadding: {
    paddingTop: 15,
    padding: 10
  },
  notes: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mv5: {
    marginVertical: 5
  },
  plus: {
    color: theme.black,
  },
  center: {
    alignItems: 'center',
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 5 : height / 7.5,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * 0.3

  },
  containerTransfer: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    // position: 'absolute',
    marginHorizontal: 0,
    // marginVertical: Platform.OS === 'ios' ? width * 0.27 : width * 0.01,
    borderRadius: 15,
    width: width * 0.9,
    top: 2,
    flex: 1
  },
  containerLeft: {
    marginTop: 5,
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white
  },
  accNumberContainer: {
    marginBottom: 10,
  },
  targetAcc: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 20,
  },
  targetName: {
    color: theme.darkBlue,
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: width * 0.2,
  },
  accNumber: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.grey,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 80,
    alignItems: 'center'
  },
  headerIcon: {
    color: theme.white,
    alignSelf: 'center',
    bottom: 4,
    right: 3
  },
  iconRp: {
    backgroundColor: theme.darkGreen,
    width: 45,
    height: 45,
    borderRadius: 15,
    alignItems: 'center'
  },
  textAcc: {
    marginBottom: 10
  },
  additionalText: {
    color: theme.darkBlue,
    fontSize: 17
  },
  sofCard: {
    backgroundColor: theme.lightPink,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 20
  },
  iconRed: {
    color: theme.red
  },
  iconBlue: {
    color: theme.darkBlue,
    fontWeight: 'bold'
  },
  dotContainer: {
    marginVertical: 5,
    marginLeft: 7
  },
  scheduleContainer: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 80,
    backgroundColor: theme.white,
    marginTop: 20
  },
  testIcon: {
    color: theme.black,
  },
  iconAcc: {
    borderRadius: 10,
    backgroundColor: theme.lightPink,
    marginRight: 20,
    marginTop: 5,
    padding: 10,
  },
  merchIcon: {
    padding: 10,
    backgroundColor: theme.white,
    borderColor: theme.grey,
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 20,
  },
  merchantSize: {
    height: 40,
    width: 40
  },
  sourceAccTitle: {
    paddingLeft: 30,
    marginBottom: 10,
    marginTop: 25
  },
  sourceAccText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.darkBlue
  },
  containerLeftSourceAcc: {
    marginTop: 5,
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    height: 270

  },
  containerLeftSourceAccBL: {
    marginTop: 5,
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    height: 100

  },
  buttonLargeTextStyle: {
    color: theme.white,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  errIcon: {
    color: theme.brand,
    marginRight: 5,
  },
  redText: [fontSizeSmallStyle, {
    color: theme.brand,
    fontFamily: 'Roboto'
  }],
  wallet: {
    color: theme.wallet
  },
  mr10: {
    marginRight: 10
  },
  labelSpacingSource: {
    marginBottom: 25,
    paddingTop: 10
  },
  accNo: [bold, {
    marginTop: 4,
    color: theme.black
  }],
  roboto: {
    fontFamily: 'roboto',
  },
  informationcolor: {
    color: theme.red,
    size: 30,
    transform: [{rotate: '180deg'}]
  },
};