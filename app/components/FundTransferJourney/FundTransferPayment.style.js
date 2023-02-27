import {theme} from '../../styles/core.styles';
import {contentContainerStyle, bold, fontSizeMediumStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  containerContent: [{justifyContent: 'space-between', flexGrow: 1, paddingBottom: 20}],
  containerContentSplitBill: [{flexGrow: 1, backgroundColor: theme.superlightGrey, justifyContent: 'space-between'}],

  headerRow: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  headerIcon: {
    color: '#4ed07d',
    paddingRight: 10
  },
  title: {
    fontSize: theme.fontSize22,
    fontFamily: 'roboto',
    color: theme.black
  },
  paddingContent: [contentContainerStyle],
  availableBalanceText: {
    fontFamily: 'roboto',
    color: theme.black,
    paddingTop: 5
  },
  transferTypeHeader: {flexDirection: 'row', justifyContent: 'space-between'},
  information: {
    color: theme.brand,
  },
  checkboxContainer: {
    paddingVertical: 20,
  },
  checkboxLabel: {
    color: theme.black
  },
  checkboxStyle: {
    width: 20,
    height: 20
  },
  textInputAmount: {
    flex: 1,
    flexDirection: 'row'
  },
  amountField: {
    textAlign: 'center',
    flex: 1,
    fontSize: theme.fontSize20,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
    marginLeft: 30
  },
  editIcon: {
    paddingRight: 10,
    paddingTop: 10
  },
  walletIcon: {
    color: '#c38a05',
    paddingRight: 10
  },
  sendAccountDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sendAccNumber: [bold, {
    fontFamily: 'roboto',
    color: theme.black,
  }],
  sendAccNameType: {
    color: theme.black,
    fontFamily: theme.robotoLight,
  },
  greyLine: {
    height: 1,
    backgroundColor: theme.greyLine,
    marginTop: 10
  },
  errIcon: {
    color: theme.brand,
    marginRight: 5,
  },
  redText: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: 'Roboto',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  roboto: {
    fontFamily: 'Roboto',
  },
  black: {
    color: theme.black,
  },
  buttonBottom: {
    paddingBottom: 30,
    padding: 20,
  },
  containerDiv: {
    paddingVertical: 20,
    padding: 20,
  },
  rowLeft: {
    flex: 0.2,
    paddingHorizontal: 5,
    alignSelf: 'flex-start'
  },
  rowRight: {
    alignSelf: 'flex-end',
    flex: 0.8,
    paddingHorizontal: 5,
    paddingBottom: 10
  },
  inputStyleCenter: [bold, fontSizeMediumStyle, {
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: theme.black
  }],
  textInputAmountValas: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.softGrey
  },
  icon: {
    marginRight: 10,
    color: theme.black
  },
  exchangeRates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    marginTop: 15
  },
  rowValas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  // SPLITBILL
  backgroundColor2: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 10,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * 0.4,
    position: 'absolute',
  },
  containerBanner2: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.05,
  },
  contentInnerBox: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  newRpIcon: {
    position: 'absolute', 
    left: 25, 
    top: 25,
    width: 30,
    height: 30
  },
  containerHead: {
    flex: 1,
  },
  containerContentRevamp: [{justifyContent: 'space-between', flexGrow: 1, paddingBottom: 20}],
  containerRevamp: {
    flex: 1,
    backgroundColor: theme.superlightGrey,
  },
  sendAccountDetailContainer2: {
    backgroundColor: theme.white,
    borderRadius: 10,
    paddingLeft: 10,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginBottom: 60,
  },
  containerTarget: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  iconSplitBill: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    left: 20, 
    top: 5,
    width: 40,
    height: 40
  },
  targetPayee: {
    paddingHorizontal: 30
  },
  targetPayeeName: [bold, {
    fontFamily: 'roboto',
    color: theme.darkBlue,
  }],
  targetAccountNumber: [bold, {
    fontFamily: 'roboto',
    color: theme.blueSoftSplitBill,
    fontSize: theme.fontSizeSmall
  }],
  sourceAccountContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  sourceAccountText: [bold, {
    fontFamily: 'roboto',
    color: theme.darkBlue,
    fontSize: theme.fontSizeMedium
  }],
  buttonBottomSplitBill: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  imageSummary: {
    flex: 1,
    width: width,
    height: height * 0.9,
    position: 'absolute',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  topContainerItem: {
    alignItems: 'center'

  },
  bottomSpacing: {
    marginTop: hp('0%'),
    backgroundColor: theme.white,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  containerTransfer: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    marginHorizontal: 0,
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
  iconRp: {
    backgroundColor: theme.darkGreen,
    width: 45,
    height: 45,
    borderRadius: 15,
    alignItems: 'center'
  },
  sourceAccTitle: {
    paddingLeft: 30,
    marginBottom: 10,
    marginTop: 15
  },
  sourceAccText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.darkBlue
  },
  containerLeftSourceAcc: {
    marginTop: 0,
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    height: 320
  },
  redTextSetLimit: {       
    fontSize: theme.fontSizeXS,
    color: theme.brand,
    fontFamily: 'Roboto',    
  },  
  blackTextSetLimit: {       
    fontSize: theme.fontSizeXS,
    color: theme.black,
    fontFamily: 'Roboto',    
  },
  alertSetLimit: {
    color: theme.black,
    paddingLeft: 5,
    paddingTop: 5
  },
  rowSetLimit: {
    flexDirection: 'column',
    marginTop: 8,
    paddingHorizontal: 10,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  boxedInfo: {    
    paddingLeft: 2,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    marginHorizontal: 20,
    paddingRight: 20,
    paddingHorizontal: 15
  },
};