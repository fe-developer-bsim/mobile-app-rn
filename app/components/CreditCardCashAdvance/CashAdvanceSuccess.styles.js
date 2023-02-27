import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {bold, fontSizeSmallStyle} from '../../styles/common.styles';

export default {
  container: {flex: 1},
  containerContent: [{justifyContent: 'space-between'}],
  flexGrey: {
    backgroundColor: theme.superlightGrey
  },

  top: {
    alignItems: 'center',
    height: hp('70%')
  },
  bottom: {
    paddingHorizontal: 2,
    flex: 1
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 10,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  containerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.white,
    position: 'absolute',
    marginVertical: Platform.OS === 'ios' ? width * 0.02 : 0.27,
    borderRadius: 15,
    width: width * 0.9,
    top: 20,
    flex: 1
  },
  midItemContainer: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 0
  },
  topItemContainer: {
    flexDirection: 'column',
    paddingVertical: 10,
    width: width * 0.9,
    alignItems: 'center',
  },
  containerLeftDetail: {
    flexDirection: 'column',
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    height: 400
  },
  containerMidDetail: {
    flexDirection: 'column',
    paddingVertical: 0,
    borderRadius: 15,
    width: width * 0.85,
    backgroundColor: theme.paleGrey,
    alignSelf: 'center',
    marginBottom: 20,
    height: 160
  },
  containerBottomDetail: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 420,
    alignSelf: 'center',
  },
  bottomButton: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.white,
  },
  halfWidth: {
    flex: 1
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.darkBlue,
    marginVertical: 5,
    paddingHorizontal: 20
  },
  detailTitleInContainer: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.darkBlue,
    marginVertical: 10,
    paddingHorizontal: 25
  },
  detailTitleTop: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.black,
    paddingTop: 10,
    paddingHorizontal: 25
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    flex: 1,
    height: 1,
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  containerLeftSourceAcc: {
    flexDirection: 'column',
    width: width * 0.9,
    paddingHorizontal: 20,
  },
  detail: {
    flexDirection: 'column',
    paddingTop: 20
  },
  detailInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  footerText: {
    fontSize: 12,
    color: theme.textLightGrey,
    marginTop: 10,
    marginLeft: 10,
    fontWeight: theme.fontWeightRegular,
  },
  detailText: {
    fontSize: 15,
    color: theme.darkBlue,
    marginVertical: 3,
    fontWeight: theme.fontWeightRegular,
    paddingLeft: 5,
  },
  textRight: {
    fontSize: 15,
    color: theme.darkBlue,
    marginVertical: 3,
    fontWeight: theme.fontWeightRegular,
    paddingRight: 5
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalText: {
    fontSize: 18,
    color: theme.darkBlue,
    marginVertical: 3,
    fontWeight: theme.fontWeightBold,
    paddingLeft: 20,
  },
  totalPrice: {
    fontSize: 18,
    color: theme.black,
    marginVertical: 3,
    fontWeight: theme.fontWeightBold,
    paddingRight: 20,
  },

  fieldStyle: {
    paddingVertical: 10
  },
  box: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7B7F9E',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 10,
    alignSelf: 'center'
  },
  boxAddInfo: {
    borderRadius: 10,
    borderColor: theme.darkBlue,
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 5,
    marginVertical: 10,
    alignSelf: 'center'
  },

  icon: {
    color: theme.pinkBrand,
    marginRight: 20
  },


  inputStyle: [styles.bold, {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'left',
    color: theme.black,
    fontSize: 20,
  }],
  rowRight: {
    alignSelf: 'flex-end',
    flex: 0.8,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  moreMenuStyle: {
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 5
  },
  sourceAcc: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  labelSourceAcc: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textStyleName: {
    fontSize: 16,
    paddingLeft: 5,
    fontWeight: 'bold',
    color: theme.black
  },
  textStyleType: {
    paddingLeft: 5,
    color: theme.darkBlue,
    fontSize: 13,
  },
  textStyleNumber: {
    fontSize: 16,
    paddingLeft: 5,
    color: theme.darkBlue,
    fontWeight: 'bold',
  },
  textStyleBal: {
    paddingLeft: 5,
    color: theme.darkBlue,
    fontSize: 13,
    fontWeight: 'bold',
  },
  iconContainer: {
    borderRadius: 12,
    marginRight: 10,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconSize: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  textStyleAmount: {
    fontSize: styles.fontSizeXLStyle.fontSize,
    fontWeight: 'bold',
    color: theme.black,
    fontFamily: 'Roboto',
    width: 250,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  textStyleInfo: {
    fontSize: styles.fontSizeMediumStyle.fontSize,
    fontFamily: 'Roboto',
    width: 250,
    padding: 0,
    marginTop: 20,
    marginBottom: 20,
  },
  successIcon: {
    color: theme.green
  },
  successInfoIcon: {
    marginTop: 20,
  },
  transNoContainer: {
    borderRadius: 15,
    width: width * 0.85,
    backgroundColor: theme.paleGrey,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 300,
    paddingVertical: 10,
    width: width * 0.9,
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: theme.white,
    width: 150,
    borderRadius: 40,
    paddingVertical: 15,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareText: {
    color: theme.darkBlue,
    marginRight: 40,
  },
  insideButton: {
    flexDirection: 'row',
  },
  shareIconSize: {
    flex: 1,
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  doneButton: {
    backgroundColor: theme.darkBlue,
    width: 150,
    borderRadius: 40,
    paddingVertical: 20,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  doneText: {
    color: theme.white,
  },
  redText: {
    color: theme.brand,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
  },


  backgroundColorPink: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 5.6,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'absolute',
  },
  bankTitle: {
    paddingTop: 5,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
  },
  successText: {
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
    color: theme.black,
  },
  marginTop: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  tittleTrf: [
    styles.fontSizeLargeStyle,
    {
      fontWeight: theme.fontWeightBold,
      color: theme.white,
    }
  ],
  containerBannerWhite: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.029,
  },
  paddingBox: {
    paddingHorizontal: 10,
    paddingTop: 10
  },
  containerLeft: {
    marginBottom: height * 0.015
  },
  iconSuccess: {
    alignItems: 'center',
    paddingBottom: 10
  },
  transNumber: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.couponGrey,
    borderRadius: 10,
    height: 50,
  },
  transrefnumSuccess: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    color: theme.black,
  },
  logoSuccessIcon: {
    color: theme.green
  },
  greyLine2: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    marginVertical: 20,
  },
  receiptTextSuccess: {
    color: theme.darkBlue,
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
    marginHorizontal: 10,
    paddingBottom: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  mv5: {
    marginVertical: 5,
  },
  accNoNewOne: {color: theme.darkBlue},
  robotoNew: {
    fontFamily: 'roboto',
    color: theme.darkBlue
  },
  containerAmount: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    backgroundColor: theme.couponGrey,
    paddingTop: 10,
  },
  labelSpacing: {
    paddingVertical: 10
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    marginVertical: 10,
  },
  accNo: [bold, {color: theme.black,  fontSize: 18}],
  button2: {
    marginBottom: 20,
    marginTop: 20,
    marginHorizontal: 10,
  },
  rowAlignSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowAlignSuccessFrom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    marginRight: height * 0.1,
  },
  imgIconFrom: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginHorizontal: 5
  },
  imgIconSend: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginHorizontal: 10
  },
  sendAccNumber: {
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    color: theme.darkBlue
  },
  sendAccNameType: {
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    color: theme.black
  },
  sendAccType: {
    fontFamily: theme.robotoLight,
    color: theme.softGrey
  },
  dotContainer: {
    marginVertical: 5,
  },
  greyDot: {
    color: theme.darkBlue,
    marginHorizontal: 25
  },
  spaceContainer: {
    paddingVertical: 20
  },
  middleContainerBot: {
    paddingHorizontal: 10,
    backgroundColor: theme.redText,
    borderColor: theme.greyLine,
    paddingVertical: 10
  },
  helpContainerSuccess: {
    marginBottom: 10,
  },
  transactionRevamp: {
    color: theme.darkBlue,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
  },
  help: [fontSizeSmallStyle, {
    color: theme.textGrey,
    fontFamily: 'Roboto',
  }],
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 20,
    backgroundColor: theme.white,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingHorizontal: 10,
  },
  middleContainerTop: {
    backgroundColor: theme.white,
    borderColor: theme.greyLine,
  },
  mainTitleLogo: {
    width: 150,
    height: 30,
    marginTop: 30,
    resizeMode: 'contain',
    paddingVertical: 20,
  },
  titleContainer: {
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
  ph20: {
    paddingHorizontal: 10,
  },
  columnHeader: {
    marginTop: 20,
    marginLeft: -5,
    marginBottom: -10
  },
  mainTitle: {
    paddingVertical: 10,
    maxWidth: (65 * width - 30) / 100,
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto',
    color: theme.black,
  },
  borderGreyTop: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginTop: 30
  },
  middleContainerBoth: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderColor: theme.greyLine,
  },
  helpContainer: {
    marginBottom: 10,
    marginTop: 20,
  },
  transaction: {
    color: theme.textLightGrey,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
  },
  transrefnum: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    color: theme.black,
    marginTop: 20
  },
  buttonContainerbotNew: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.superlightGrey
  },
  buttonShare: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconShare: {
    color: theme.darkBlue,
  },
  buttonShareText: {
    color: theme.darkBlue,
    fontSize: theme.fontSizeMedium,
  },
  doneButton2: {
    backgroundColor: theme.darkBlue
  },
};
