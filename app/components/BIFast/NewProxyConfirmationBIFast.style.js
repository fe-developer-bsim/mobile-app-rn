import {theme} from '../../styles/core.styles';
import {contentContainerStyle, bold, fontSizeLargeStyle, fontSizeSmallStyle, fontSizeXLStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {height, width} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  container: [contentContainerStyle],

  headerRow: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  headerIcon: {
    color: theme.amount,
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
    color: theme.grey,
    marginLeft: 3,
    marginBottom: 5
  },
  senderDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  containtextExplanation: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.cardGrey,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: theme.cardGrey
  },
  payeeDetail: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: 'center'
  },
  sendAccNumber: {
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    color: theme.darkBlue
  },
  sendAccNameType: {
    color: theme.softGrey,
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
    paddingTop: 15
  },

  timeInitiateText: {
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto'
  },

  greyLineBold: {
    backgroundColor: theme.grey,
    height: 1,
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
    fontSize: theme.fontSizeMedium
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
    color: theme.softGrey,
    fontFamily: 'Roboto'
  }],
  extraPadding: {
    paddingTop: 3
  },
  notes: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailContainer: {
  },
  mv5: {
    marginVertical: 5
  },
  plus: {
    color: theme.black,
  },
  pinkBg: {
    backgroundColor: theme.pinkBrand,
  },
  containerBanner: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  containerTrfTitle: {
    paddingVertical: 20,
    justifyContent: 'space-between',

  },
  headerBack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  menu: {
    marginVertical: 25,
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backHeader: {
    color: theme.white,
    paddingLeft: 50,
    transform: [{rotate: '180deg'}],
  },
  transferTitle: {
    color: theme.white,
    fontSize: 20,
    paddingRight: 70,
    fontWeight: 'bold',
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 5 : 5 : 5,
  },
  containerNew: {
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  containerTransferType: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  captionText: {
    color: theme.softGrey,
    fontFamily: theme.robotoLight,
    marginBottom: 5
  },
  containerContent: [{justifyContent: 'space-between', flexGrow: 1, paddingBottom: 20}],
  buttonLargeTextStyle: {
    color: theme.white
  },
  titles: [fontSizeXLStyle, {
    marginBottom: 15,
    color: theme.darkBlue,
    paddingHorizontal: 10
  }],

};