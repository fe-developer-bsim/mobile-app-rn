import {contentContainerStyle, bold} from '../../styles/common.styles';
import {theme, text as textStyles} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
const {width, height} = Dimensions.get('window');
const trueWidth = (width - 40);
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    left: 5,
    alignSelf: 'center',
    backgroundColor: theme.white,
    borderRadius: 50,
    padding: 5,
    shadowColor: theme.black,
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {width: 0, height: 1.5},
    marginTop: -33,
    marginRight: -68,
    elevation: 4
  },
  container: [contentContainerStyle, {backgroundColor: theme.superLightpurple, flexGrow: 1, justifyContent: 'space-between',
  }],
  roboto: {
    fontFamily: 'Roboto',
    color: theme.black
  },
  robotoPassed: {
    fontFamily: 'Roboto',
    color: theme.green
  },
  wrapPicture: {

  },
  picture: {
    width: 20,
    height: 20,
  },
  picture2: {
    width: 20,
    height: 20,
  },
  shadowImage: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  wrapSettings: {
    alignSelf: 'flex-end',
  },
  wrapNames: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 70,
    marginHorizontal: -150
  },
  names: [bold, {
    fontSize: theme.fontSizeMedium
  }],
  bold: [bold],
  subNames: {

  },
  content: {
    backgroundColor: theme.white,
    marginVertical: 10,
  },
  couponFill: {
    position: 'absolute',
    color: '#F5E5E6',
  },
  height: {
    height: 30
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowCenter1: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  ml5: {
    marginLeft: 5,
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  menu1: {
    marginVertical: 25,
    // flex: 1
  },
  menu: {
    marginVertical: 25,
    flex: 1
  },
  menuTitle: [bold, {
    fontSize: theme.fontSizeMedium
  }],
  menuTitlePassed: [bold, {
    fontSize: theme.fontSizeMedium,
    color: theme.green
  }],
  menuTxt: {
    fontWeight: theme.fontWeightLight,
  },
  menuTxt2: {
    fontWeight: theme.fontWeightLight,
    paddingTop: 10
  },
  menuTxt22: {
    fontWeight: theme.fontWeightLight,
  },
  menuTxt3: {
    fontWeight: theme.fontWeightLight,
    color: theme.white,
    alignItems: 'center'
  },
  wrapCoupon: {
    alignItems: 'center',
    width: trueWidth / 3,
  },
  wrapCoupon2: {
    alignItems: 'center',
    width: trueWidth / 2,
  },
  wrapCoupon2New: {
    alignSelf: 'center',
    width: trueWidth / 2,
    flexDirection: 'row',
  },
  media: {
    backgroundColor: 'transparent',
    // borderRadius: 10,
    // borderColor: 'transparent',
    position: 'absolute',
    marginVertical: width * 0.08,
  },
  mediaFilling: {
    backgroundColor: theme.white,
    borderRadius: 10,
    width: Platform.OS === 'ios' ? width * 0.87 : width * 0.87,
    marginRight: Platform.OS === 'ios' ? 15 : 16,
    padding: 10
  },

  mediaFilling2: {
    backgroundColor: theme.white,
    flex: 1,
    borderRadius: 10,
    width: width * 0.87,
    marginRight: 10,
    padding: 10,
    marginTop: 20
  },
  width: {
    width: 50,
  },
  width2: {
    width: 50,
  },
  activitiesFill: {
    color: '#F8E71C'
  },
  activitiesOutline: {
    position: 'absolute'
  },
  scheduledFill: {
    color: '#C1FFD7'
  },
  scheduledOutline: {
    position: 'absolute',
    color: theme.black
  },
  pushillOutline: {
    position: 'absolute',
    color: theme.white
  },
  couponOutline: {
    color: theme.brand
  },
  couponOutline1: {
    color: theme.brand
  },
  rowNotif: {
    flexDirection: 'row',
  },
  numberCoupon: {
    backgroundColor: theme.brand,
    height: 15,
    borderRadius: 10,
    alignItems: 'center',
    top: 3,
    left: 50,
    zIndex: 1,
    position: 'absolute'
  },
  numberCouponText: {
    fontSize: theme.fontSizeXS,
    color: theme.white,
    paddingTop: 1,
    paddingHorizontal: 4,
  },
  faveFill: {
    color: '#FFE205'
  },
  pushBillFill: {
    color: theme.white
  },
  autodebetFill: {
    color: theme.green
  },
  linearGradient: {
    borderRadius: 5,
    marginHorizontal: -10,
    paddingHorizontal: 10,
  },
  luckyDipBox: {
    paddingVertical: 5
  },
  iconBoxLuckyDip: {
    alignItems: 'center',
    width: 75,
    height: 75
  },
  iconLuckyDip: {
    width: 175,
    height: 25
  },
  rowCenterLuckyDip: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  luckyDipCounterText: {
    fontWeight: theme.fontWeightBold,
  },
  header: {
    backgroundColor: theme.pinkBrand,
    height: normalIosphone === true ?  height / 5.5 : normalIosphone === false ? height / 6 : height / 6,
    margin: -25,
    borderColor: 'transparent',
    marginBottom: 40,
    borderWidth: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  wrapProfile: {
    position: 'absolute',
    justifyContent: 'center',
    marginHorizontal: width * 0.45,
    marginVertical: Platform.OS === 'ios' ? width * 0.19 : width * 0.19,
  },
  m20: {
    marginHorizontal: 20
  },
  transparent: {
    color: theme.white
  },
  menuTitle2: {
    fontSize: theme.fontSizeMedium
  },
  subTitle: [bold, {
    fontSize: theme.fontSizeLarge,
    paddingTop: 40,
    paddingBottom: 20
  }],
  greyLine2: {
    height: 10,
    backgroundColor: theme.superLightpurple,
    marginVertical: -20
  },
  media2: {
    backgroundColor: theme.white,
    borderRadius: 10,
    marginTop: 100
  },
  content2: {
    backgroundColor: theme.white,
    marginHorizontal: 20
  },
  buttonLogin: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  buttonSpacing: {
    marginVertical: 10,
    color: '#FED3E0'
  },
  pictureIcon: {
    width: 10,
    height: 10,
  },
  mv20: {

    marginVertical: 10
  },
  pictureIcon2: {
    width: 35,
    height: 35,
  },
  pictureIconnew: {
    width: 60,
    height: 60,
  },
  textVersion: {
    alignItems: 'center',
    paddingBottom: 20
  },
  VersionText: {
    color: theme.grey
  },


  // login style
  bodyContainerEasyPin: [{
    flexGrow: 1,
    backgroundColor: theme.radicalRed,
    justifyContent: 'space-between',
    paddingBottom: -10
  }, contentContainerStyle],

  rowEasyPINFormat: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  easypinHeaderTitle: {
    ...textStyles.h1,
    color: theme.white,
    paddingBottom: 10
  },
  easypinIcon: {
    color: theme.white,
    alignSelf: 'center',
    paddingLeft: 15,
    paddingTop: 5,
  },
  rowLoginEasyPIN: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 20,
    paddingRight: 60
  },
  welcomeSubTextNewVerifyEP: {
    padding: 30,
    color: theme.white
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    marginTop: theme.padding,
    paddingHorizontal: 30
  },
  forgotEasyPinContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30
  },
  resendOtpButton: {
    color: theme.white,
    textDecorationLine: 'underline',
  },
  quickLoginContainer: {
    flexDirection: 'row',
    padding: 30
  },
  registerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quickLoginIconContainer: {
    paddingRight: 10
  },
  quickLoginIcon: {
    color: theme.white
  },
  quickLoginBorder: {
    borderLeftWidth: 1,
    paddingRight: 20,
    marginLeft: 20,
    borderColor: theme.white
  },
  buttonOtpSubmit: {
    paddingBottom: 65,
    paddingTop: 20,
  },
  colorBg: {
    color: theme.brand
  },
  buttonOtpSubmitPage2: {
    color: theme.white
  },
  buttonOtpSubmitPage: {
    color: theme.black
  },
  navigationContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  newSplitBillContainer: {
    flexDirection: 'row',
  },
  newSplitBill: {
    backgroundColor: theme.brand,
    height: 15,
    width: 30,
    borderRadius: 10,
    marginLeft: 5,
    marginTop: -5,
  },
  newSplitBillText: {
    color: theme.white,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall,
    marginTop: -2,
  },
  buttonOn: {
    marginLeft: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: theme.brand,
    borderRadius: 20
  },
  buttonOff: {
    marginLeft: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: theme.greyLine,
    borderRadius: 20
  },
  defaultTextWhite: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    textAlign: 'center',
  },
  defaultTextGrey: {
    color: theme.grey,
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeSmall,
    textAlign: 'center',
  },

  // Header
  profileHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  nameHeader: {
    top: hp(3),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  subNameHeader: {
    fontWeight: theme.fontWeightBold,
    color: theme.white,
    paddingLeft: 10
  },
  subNameHeader2: {
    color: theme.white,
    paddingLeft: 10
  },

  // ShowQR
  showQrBtn: {
    top: hp(4),
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: theme.white,
    width: wp(32),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  showQrTxt: {
    padding: 5,
    color: theme.red,
    fontWeight: theme.fontWeightBold,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall
  },
  showQrIcon: {
    color: theme.red,
    padding: 5,
  },
  editIcon: {
    color: theme.black
  },
  btnEdit: {
    left: 5,
  },
  logoutBtn: {
    alignSelf: 'center',
    width: wp(90),
    backgroundColor: theme.softPink,
  },
  logoutTxt: {
    color: theme.pinkBrand,
    fontWeight: theme.fontWeightMedium
  },
  pinFill: {
    color: theme.brand
  },
  pinOutline: {
    position: 'absolute',
    color: theme.black
  },
  passFill: {
    color: '#7FF2A8'
  },
  passOutline: {
    position: 'absolute',
    color: theme.black
  },
  iconSize: {
    flex: 1,
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  gearFill: {
    color: '#FCC86F'
  },
  gearOutline: {
    position: 'absolute',
    color: theme.black
  },
  langFill: {
    color: '#ADF9FF'
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'right',
    marginRight: 10
  },
  iconNotif: {
    color: theme.white
  },
  cartRed: {
    borderRadius: 15,
    height: 10,
    width: 10,
    overflow: 'hidden',
    backgroundColor: theme.brand,
    position: 'absolute',
    top: 5,
    right: 3,
    zIndex: 1
  },
  rowHeader2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'left',
    marginRight: 10
  },
  greyLineVertical: {
    backgroundColor: theme.greyLine,
    width: 1,
  },
  textStyle: {
    paddingTop: 8
  },
  padding: {
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonNew: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: theme.brand,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    width: 90,
    marginTop: 10,
    alignItems: 'center'
  },
  textTittle: {
    flex: 1
  },
};
