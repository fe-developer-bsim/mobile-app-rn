import {fontSizeLargeStyle, buttonLargeTextStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
const trueWidth = (width - 40);
const trueWidths = width - 150;


export default {
  // Main Page Styling
  midContainer: {
    backgroundColor: theme.superlightGrey
  },
  upperContainer: {
    backgroundColor: theme.pinkBrand,
  },
  borderHeader: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: width * 0.049,
    backgroundColor: theme.darkRed,
  },
  textReferYour: {
    color: theme.white,
    fontSize: theme.fontSizeLarge,
    paddingTop: 25,
    alignSelf: 'center',
    fontFamily: 'Roboto',
  },
  textReferYour2: {
    color: theme.white,
    fontSize: theme.fontSize22,
    alignSelf: 'center',
    fontFamily: 'Roboto',
  },
  textReferYour3: {
    color: theme.white,
    fontSize: theme.fontSizeXL,
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  backgroundImage: {
    width: null,
    height: Platform.OS === 'ios' ? height / 5 : height / 2,
    resizeMode: 'stretch',
    marginHorizontal: width * 0.049,
  },
  media: {
    backgroundColor: theme.darkRed,
    height: Platform.OS === 'ios' ? height / 5 : height / 2.7,
    marginHorizontal: width * 0.049,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: 'transparent',
    marginBottom: 10
  },
  textReferral: {
    color: theme.white,
    paddingBottom: 10,
    alignSelf: 'center'
  },
  rowShare: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  box: {
    fontFamily: 'Roboto',
    paddingHorizontal: 15,
    width: trueWidths,
    color: theme.softGrey,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: theme.white,
  },
  copyIcon: {
    color: theme.black
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  amountText: [fontSizeLargeStyle, {
    fontFamily: 'Roboto',
    color: theme.black,
  }],
  buttonShare: {
    flexDirection: 'row',
    backgroundColor: theme.pinkBrand,
    borderWidth: 1,
    borderColor: theme.pinkBrand,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 50,
    width: 85,
    alignItems: 'center',
  },
  pictureIconShare: {
    width: 10,
    height: 10,
    marginHorizontal: 5
  },
  textButtonShare: {
    fontFamily: 'Roboto',
    color: theme.white,
    fontSize: theme.fontSizeSmall,
    paddingHorizontal: 5,
    fontWeight: theme.fontWeightBold,
  },
  content: {
    marginVertical: 30,
    alignSelf: 'center'
    // alignItems: 'center',
    // marginHorizontal: 10
    // marginHorizontal: width * 0.029,
  },
  row: {
    flexDirection: 'row',
  },
  wrapCoupon: {
    width: trueWidth / 3,
    alignItems: 'center',
  },
  height: {
    height: 35
  },
  pictureIcon: {
    alignSelf: 'center',
    width: 45,
    height: 45,
  },
  mv20: {
    marginTop: 15,
  },
  roboto: {
    fontFamily: 'Roboto',
    color: theme.white,
    fontSize: theme.fontSizeXS,
    alignSelf: 'center',
    fontWeight: theme.fontWeightBold
  },
  readTnc: {
    alignItems: 'center',
  },
  textTnc: {
    fontFamily: 'Roboto',
    color: theme.white,
    fontSize: theme.fontSizeSmall,
    textDecorationLine: 'underline',
  },


  // How Referral Page And TabBar Styling
  containerDetailProduct: {
    backgroundColor: theme.darkRed
  },
  scrollStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 0
  },
  borderText: {
    borderRadius: 10,
    paddingHorizontal: 35,
    paddingTop: 10,
    backgroundColor: theme.pinkBrand,
    borderWidth: 1,
    borderColor: theme.white,
    height: 40,
    width: 150,
  },
  rowReward: {
    flexDirection: 'row',
    backgroundColor: theme.pinkBrand,
    justifyContent: 'center',
    paddingBottom: 10
  },
  upperContainerTextYouActive: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 35,
    backgroundColor: theme.pinkBrand,
    borderWidth: 1,
    borderColor: theme.white,
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperContainerTextYouInActive: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 35,
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.white,
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperContainerTextActiveFriend: {
    paddingHorizontal: 35,
    backgroundColor: theme.pinkBrand,
    borderWidth: 1,
    borderColor: theme.white,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperContainerTextInActiveFriend: {
    paddingHorizontal: 35,
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.white,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTabReferralActive: {
    color: theme.white,
    fontSize: theme.fontSizeNormal,
  },
  textTabReferralInActive: {
    color: theme.black,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
  },
  titleCode: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20
  },
  referalCode: {
    height: 25,
    width: 25,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.white,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.white,
  },
  redText: {
    color: theme.red,
    fontWeight: theme.fontWeightBold,
  },
  titleCodeText: {
    alignItems: 'center',
    paddingTop: 10,
  },
  whiteText: {
    color: theme.white,
    fontFamily: 'Roboto',
  },
  whiteTextBold: {
    color: theme.white,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto',
  },
  imageIcon: {
    height: Platform.OS === 'ios' ? height / 5 : height / 12,
    marginHorizontal: width * 0.04,
    position: 'absolute'
  },
  backgroundImageReferral1: {
    alignSelf: 'center',
    width: ((width - 70) * 0.88),
    height: ((width - 70) * 1.8),
  },
  titleCode2: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 30
  },
  pb30: {
    paddingBottom: 30
  },
  backgroundImageReferral2: {
    alignSelf: 'center',
    width: ((width - 70) * 0.88),
    height: ((width - 70) * 1.8),
  },
  backgroundImageReferral3: {
    alignSelf: 'center',
    width: ((width - 70) * 0.88),
    height: ((width - 70) * 1.8),
  },
  backgroundImageReferral4: {
    alignSelf: 'center',
    width: ((width - 70) * 0.88),
    height: ((width - 70) * 1.8),
  },
  valueReferralList: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.029,
    marginBottom: 20,
  },
  chooseFilter: {
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    marginHorizontal: 10
  },
  textEmptyInviting: {
    alignSelf: 'center',
    fontSize: theme.fontSizeSmall,
    paddingTop: 40,
    marginBottom: height * 0.12,
  },


  // History Reward Styling
  flex: {
    backgroundColor: theme.superlightGrey,
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 8.5,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'absolute',
  },
  containerBanner: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.029,
  },
  rowInformation: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  textBonusReward: {
    marginTop: 10,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    marginHorizontal: width * 0.009,
  },
  containerBannerFilter: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.029,
    marginBottom: 10,
    marginTop: 10
  },
  textFilterDate: {
    marginTop: 10,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold, 
    marginHorizontal: width * 0.049,
  },
  information: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
    marginTop: 12,
  },
  containerLeft: {
    paddingVertical: 15,
    borderRadius: 15,
    marginHorizontal: width * 0.049,
  },
  swiftCodeField1: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.orange,
    paddingHorizontal: 15,
    paddingTop: 10,
    height: 65,
  },
  successInvite: {
    borderRadius: 20,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.029,
    paddingBottom: 15
  },
  containerSuccessInvite: {
    paddingTop: 10,
    paddingBottom: 10
  },
  lastReward: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.029,
    marginBottom: 20,
  },
  textLastReward: {
    paddingTop: 15,
    paddingBottom: 10,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold, 
    marginHorizontal: width * 0.049,
  },
  textEmpty: {
    alignSelf: 'center',
    fontSize: theme.fontSizeSmall,
    paddingTop: 40,
  },
  textEmptys: {
    alignSelf: 'center',
    fontSize: theme.fontSizeSmall,
    paddingTop: 10,
    marginBottom: height * 0.12,
  },
  textValue: {
    marginBottom: 20
  },
  textSeeMore: {
    alignSelf: 'center',
    fontSize: theme.fontSizeNormal,
    paddingBottom: 30,
    paddingTop: 15
  },
  containerYouSuccessInvite: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  textSuccessInvite: {
    alignSelf: 'center',
    paddingTop: 10,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold, 
  },
  textSuccessEarn: {
    alignSelf: 'center',
    paddingTop: 15,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold, 
  },
  textReward: {
    alignSelf: 'center',
    paddingTop: 5,
    color: theme.red,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeExtraXL,
  },
  textCustomer: {
    alignSelf: 'center',
    color: theme.red,
    fontSize: theme.fontSizeLarge
  },
  textPoin: {
    alignSelf: 'center',
    color: theme.red,
    fontSize: theme.fontSizeLarge,
    paddingBottom: 20
  },
  buttonClaimReward: {
    paddingTop: 20,
    paddingBottom: 20,
    marginHorizontal: width * 0.049,
    backgroundColor: theme.pinkBrand,
    borderRadius: 30,
    height: 47,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  buttonClaimRewardDisabled: {
    paddingTop: 30,
    paddingBottom: 40,
    marginHorizontal: width * 0.049,
    backgroundColor: theme.superlightGrey,
    borderRadius: 10,
    height: 47,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  buttonTextClaim: {
    color: theme.lightPurple,
    fontSize: theme.fontSizeSmall,
    textAlign: 'center',
  },
  pointPicture: {
    flexDirection: 'row',
    marginHorizontal: 10
  },
  pointText: {
    color: theme.black,
    fontSize: theme.fontSizeXS
  },
  claimPoint: {
    height: 45,
    width: 45,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.pinkBrand,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.pinkBrand,
    marginLeft: 3
  },
  claimPointDisabled: {
    height: 45,
    width: 45,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.lightPink,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.lightPink,
    marginLeft: 3
  },
  claimPointTier: {
    height: 27,
    width: 27,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.pinkBrand,
    // borderColor: theme.lightPink,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.pinkBrand,
    // backgroundColor: theme.lightPink,
  },
  claimPointTierDisabled: {
    height: 27,
    width: 27,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.lightPink,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.lightPink,
  },
  containerBox: {
    paddingTop: 18
  },
  mt5: {
    marginTop: 5,
  },
  contentBonusReward: {
    marginVertical: 10,
  },
  column: {
    backgroundColor: theme.white
  },
  tierBoxRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  whiteTextBoldTier: {
    color: theme.white,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: theme.fontSizeSmall
  },
  whiteTextBoldBonus: {
    color: theme.white,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: theme.fontSizeXS
  },

  // Inviting Record Styling
  wrapContentProfile: {
    alignItems: 'flex-start',
  },
  // heightProfile: {
  //   // height: 35
  //   marginBottom: 35
  // },
  textFilterName: {
    marginTop: 5,
    color: theme.black,
    fontWeight: theme.fontWeightBold, 
    marginHorizontal: width * 0.019,
  },
  rowInviting: {
    flexDirection: 'row',
    marginHorizontal: width * 0.019,
    paddingTop: 5
  },
  invitingSucess: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: theme.pinkBrand,
    borderWidth: 1,
    borderColor: theme.white,
    height: 30,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  invitingFriends: {
    backgroundColor: theme.greyLine,
    borderWidth: 1,
    borderColor: theme.white,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    height: 30,
    width: 90,
    paddingLeft: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  people: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  picture: {
    alignSelf: 'center',
    width: 60,
    height: 60,
  },
  shadowImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  wrapProfile: {
    marginHorizontal: width * 0.049,
  },
  contentProfile: {
    marginVertical: 10,
    marginHorizontal: width * 0.029,
  },
  backgroundColorProfile: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 11,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'absolute',
  },
  textRewardYou: {
    color: theme.white,
    fontSize: theme.fontSizeXS
  },
  textRewardLengthYouFriend: {
    color: theme.darkBlue,
    paddingRight: 5
  },
  textRewardYouFriend: {
    color: theme.darkBlue,
    fontSize: theme.fontSizeXS
  },

  // Calendar Styling
  contentContainerStyle: {
    backgroundColor: theme.superlightGrey,
  },
  backgroundColorCalendar: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 4,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * 0.4,
    position: 'absolute',
  },
  dateText: {
    color: theme.white,
    marginBottom: 30,
    fontSize: theme.fontSizeLarge,
    marginHorizontal: width * 0.049,
    fontFamily: 'Roboto',
    fontWeight: theme.fontWeightBold,
  },
  closeText: {
    color: theme.white,
    marginHorizontal: width * 0.049,
  },
  containerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40
  },
  containerBannerCalendar: {
    borderRadius: 10,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.049,
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeLabel: {
    color: theme.darkGrey,
    fontSize: theme.fontSizeSmall,
    paddingBottom: 10,
    fontWeight: theme.fontWeightBold,
  },
  timeSubLabel: {
    color: theme.black,
    fontWeight: theme.fontWeightBold,
    paddingBottom: 15
  },
  couponOutline: {
    transform: [{rotate: '90deg'}],
  },

  
  // TNC MGM
  pinkBg: {
    backgroundColor: theme.pinkBrand,
    flex: 1,
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 50 : 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  containerTnc: {
    marginTop: Platform.OS === 'OS' ? 50 : 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonContainer: {
    backgroundColor: theme.white,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  container: {
    flex: 1,
    backgroundColor: theme.white,
    paddingBottom: 20,
  },
  rowCenterHere: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonTextClaimHere: {
    color: theme.red,
    fontSize: theme.fontSizeSmall,
    textDecorationLine: 'underline',
  },
  nextButton: [buttonLargeTextStyle],
};
