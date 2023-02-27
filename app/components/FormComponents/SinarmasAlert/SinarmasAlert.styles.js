import {theme} from '../../../styles/core.styles';
import {fontSizeMediumStyle, textAlignCenter, fontSizeXLStyle, fontSizeSmallStyle, fontSizeLargeStyle, fontSizeXSStyle} from '../../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
import {getViewWidth, viewportWidth} from '../../../utils/device.util';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');
const trueWidth = width - 40;
const trueHeight = (trueWidth * 27) / 32;

const slideWidth = getViewWidth(0.95);
const sliderWidth = viewportWidth;
const itemHorizontalMargin = getViewWidth(0.03);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default {
  heading: [fontSizeXLStyle,
    textAlignCenter,
    {
      paddingTop: 10,
      color: theme.text
    }
  ],
  headingUnlinkMerchant: 
  {
    paddingTop: 10,
    color: theme.newLightBlack,
    fontWeight: 'bold',
    fontSize: theme.fontSizeXL,
    textAlign: 'center'
  },
  text: [textAlignCenter,
    {
      paddingTop: 20,
      paddingBottom: 30,
      paddingHorizontal: 20
    }
  ],
  textPopUpAtm: [textAlignCenter,
    {
      paddingTop: 20,
      paddingBottom: 30,
      fontSize: theme.fontSizeSmall,
    }
  ],
  textSIL1: {
    paddingLeft: 28,
    paddingTop: 20,
    fontSize: 18,
    color: theme.black
  },
  textSIL2: {
    paddingLeft: 28,
    marginRight: 20,
    paddingBottom: 10,
    fontSize: 15,
    color: theme.blueAmount
  },
  textUnlinkMerchant: [textAlignCenter,
    {
      paddingTop: 20,
      paddingBottom: 20,
      paddingHorizontal: 10,
      fontWeight: 'bold',
      color: theme.newLightBlack
    }
  ],
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconNew: {
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.black,
  },
  blackText: [fontSizeMediumStyle,
    {color: theme.black}
  ],
  buttonContainer: {
    flexDirection: 'row'
  },
  buttonContainerES: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonAlign: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5
  },
  buttonAlignUnlinkMerchant: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 5,
    backgroundColor: theme.newGreyPalete,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    left: 10
  },
  buttonAlignUnlinkMerchant2: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 5,
    backgroundColor: theme.newGreyPalete,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    right: 10,
  },
  buttonAlignSuccessUnlinkMerchant: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 80,
    marginBottom: 5,
    backgroundColor: theme.newGreyPalete,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
  },
  button1bankAcc: {
    marginHorizontal: 10,
    backgroundColor: theme.white,
    borderRadius: 50,
    height: 55,
    width: 120,
    textAlign: 'center',
  },
  buttonSILOk: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bankAccTopContainer: {
    height: 140,
    width: 140,
    backgroundColor: theme.white,
    marginBottom: 50,
    transform: [{rotate: '45deg'}],
    borderRadius: 10
  },
  bankText: {
    top: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: theme.radicalRed
  },
  silText: {
    textAlign: 'center',
    fontSize: 15,
    color: theme.radicalRed
  },
  bankTextTop: {
    top: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: theme.radicalRed
  },
  textAcc: [textAlignCenter,
    {
      transform: [{rotate: '-45deg'}],
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 32,
      left: 3,
      top: 10,
      right: 8,
      color: theme.black
    }
  ],
  additionalPadding: {
    paddingBottom: 20,
  },
  additionalPaddingSad: {
    alignSelf: 'center'
  },
  iconURL: {
    justifyContent: 'center',
    width: 100
  },

  imageBanner: {
    width: 320,
    height: 470
  },
  checkboxStyle: {
    width: 20,
    height: 20,
  },
  checkboxLabel: [
    fontSizeSmallStyle,
    {
      color: theme.textGrey
    }
  ],
  buttonAlignTop: {
    flex: 1,
    alignItems: 'center'
  },
  buttonContainerTop: {
    flexDirection: 'row',
    padding: 5,
  },
  checkboxLabelTop: [
    fontSizeSmallStyle,
    {
      color: theme.textGrey
    }
  ],
  buttonContainerSIL: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxAlignSIL: {
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 10,
    paddingTop: 5,
  },
  checkboxLabelReksadana: [
    fontSizeXSStyle,
    {
      color: theme.textGrey,
      marginLeft: -1,
      paddingRight: 20,
      justifyContent: 'space-between',
      backgroundColor: 'transparent'
    }
  ],
  containerTextTop: {
    height: 100,
  },
  containerTextTopColorMedium: {
    color: theme.white,
    fontSize: 20,
  },
  containerTextTopColorLarge: {
    color: theme.white,
    fontSize: 30,
  },
  backgroundImage: {
    width: trueWidth - 70,
    height: trueHeight,
    padding: 20,
  },
  checkboxAlignTop: {
    paddingBottom: 10,
  },
  containerTextTopColorMediumBlack: {
    color: theme.black,
    fontSize: 20,
  },
  imageBannerLockDown: {
    width: ((width - 40) * 0.45),
    height: ((width - 40) * 0.4),
  },
  imgSuccessUnlink: {
    width: ((width - 40) * 0.25),
    height: ((width - 40) * 0.2),
  },
  rowTimer: {
    flexDirection: 'row',
  },
  topQRText: {
    textAlign: 'left',
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 5,
  },
  topQRTextTimer: {
    textAlign: 'center',
    color: theme.red,
  },
  iconBlack: {
    color: theme.black,
    fontWeight: theme.fontWeightBold
  },
  shadowTimer: {
    borderRadius: 7,
    padding: 5,
    alignSelf: 'center',
    textAlign: 'center',
    borderColor: theme.greyLine,
    backgroundColor: theme.greyLine
  },
  marginQR: {
    marginTop: 20
  },
  midleImageQR: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
  },
  logoBSIM: {
    position: 'absolute',
    backgroundColor: theme.white,
  },
  imgBSIM: {
    width: ((width - 40) * 0.6) / 2,
    height: ((width - 40) * 0.6) / 8.5,
    backgroundColor: theme.white,
    margin: 5
  },
  blackTextTop: {
    alignItems: 'flex-end',
  },
  rowView: {
    flexDirection: 'row',

  },
  textInstruction: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 5,
    alignItems: 'flex-start',
  },
  containerInstruction: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 20
  },
  numberInstruction: {
    borderWidth: 1,
    borderColor: theme.black,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  spinner: {
    alignSelf: 'center',
    width: ((width - 40) * 0.31),
    height: ((width - 40) * 0.6),
    alignItems: 'center',
  },
  heading3: [fontSizeLargeStyle,
    textAlignCenter,
    {
      paddingTop: 10,
      color: theme.text,
      fontWeight: theme.fontWeightBold
    }
  ],
  backgroundImageLuckyDip: {
    width: trueWidth - 60,
    height: trueHeight - 60,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingLucky: [fontSizeXLStyle,
    textAlignCenter,
    {
      paddingVertical: 10,
      color: theme.text
    }
  ],
  LuckyDipPrizeText: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto
  },
  buttonAlignLuckyDip: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 20
  },
  upgView: {
    justifyContent: 'center',
  },
  upgImg: {
    width: width * 55 / 100,
    height: height * 42 / 100,
  },
  upgSad: {
    alignSelf: 'center',
    marginBottom: 20
  },
  upgTextSad: {
    alignSelf: 'center',
    marginBottom: 30
  },
  upgCont: {
  },
  upgHeading: [fontSizeXLStyle,
    {
      paddingTop: 10,
      color: theme.text,
      paddingHorizontal: 20
    }
  ],
  upgText: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20
  },
  buttonUpg: {
    backgroundColor: theme.emoneyGold,
    paddingVertical: 10,
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 20
  },
  redTextUpg: [fontSizeMediumStyle,
    {
      color: theme.white,
      textAlign: 'center'
    }
  ],
  wlcEmImg: {
    width: width - 40,
    height: height / 3.5,
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  textNormal: {
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightLight,
  },
  textBold: {
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightBold,
  },
  textView: {
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    justifyContent: 'center'
  },
  onbCont: {
    width: Platform.OS === 'ios' ? width - 40 : width,
    height: height / 2.3,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: -30,
  },
  containerCustomStyle: {
    marginHorizontal: -20,
    paddingVertical: 10,
    paddingHorizontal: 0
  },
  sliderWidth,
  itemWidth,
  slideStyle: {
    width: itemWidth,
    paddingHorizontal: 10
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  onbView: {
    width: Platform.OS === 'android' ? width : width,
    justifyContent: 'center',
    paddingHorizontal: 20,

  },
  activeDot: {
    backgroundColor: theme.brand,
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 7,
    marginBottom: -20,
    borderColor: theme.grey,
    borderWidth: 0.5,
  },
  dot: {
    backgroundColor: theme.transparent,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: theme.transparent,
    marginLeft: 7,
    marginBottom: -20,
  },
  pagination: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  inActiveSlide: {
    backgroundColor: theme.white,
    color: theme.white
  },
  buttonAlignonBoard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30
  },
  imagePopUpManageAtmCard: {
    width: ((width - 250) * 0.63),
    height: ((width - 250) * 0.5),
  },
  imageThankyou: {
    width: ((width - 190) * 0.45),
    height: ((width - 190) * 0.4),
    paddingTop: 50
  },
  feedbackText: [
    textAlignCenter,
    {
      paddingTop: 12,
      color: theme.text,
      paddingBottom: 30
    }
  ],
  border: {
    borderRadius: 20
  },
  icons: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: [
    theme.fontWeightBold

  ],
  centerCont: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  iconLuckyDip: {
    width: 200,
    height: 30
  },
  iconLuckyDipContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 15
  },
  iconLuckySad: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15
  },
  textLuckyDip: [textAlignCenter,
    {
      paddingTop: 10,
      paddingBottom: 30,
      paddingHorizontal: 20
    }
  ],
  headingLuckyDip: [
    textAlignCenter,
    {
      fontSize: theme.fontSize20,
      paddingTop: 10,
      color: theme.text
    }
  ],
  splitbill: {
    width: ((width - 40) * 0.3),
    height: ((width - 40) * 0.25),
    alignSelf: 'center',
    // marginBottom: 20
  },
  upgviewSplitBill: {
    alignItems: 'center',
    marginTop: 10
  },
  upgHeadingSplitBill: 
  [fontSizeXLStyle, textAlignCenter,
    {
      paddingTop: 20,
      color: theme.darkBlue,
    }
  ],
  upgHeadingSplitBillSuccess: [
    fontSizeXLStyle, textAlignCenter,
    {
      paddingTop: 10,
      color: theme.darkBlue,
    }
  ],
  textSplitBill: [textAlignCenter,
    {
      alignSelf: 'center',
      marginBottom: 30,
      color: theme.darkBlue
    }
  ],
  textSplitBillSuccess: [textAlignCenter,
    {
      alignSelf: 'center',
      marginBottom: 20,
      color: theme.darkBlue
    }
  ],
  numberContainer: {
    borderRadius: 10,
    backgroundColor: theme.brand,
    width: 18,
    height: 18,
    marginTop: 5,
    marginRight: 10
  },
  numberText: {
    color: theme.white,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto,
  },
  buttonAlignSplitBill: {
    alignItems: 'center',
    paddingHorizontal: 80,
    backgroundColor: theme.primary,
    borderRadius: 20,
    paddingVertical: 10
  },
  marginStyle: {
    marginTop: 50,
  },
  button1Border: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: theme.newLightGrey,
    borderRadius: 50,
    marginBottom: 30,
    height: 50,
  },
  button1Style: {
    fontWeight: theme.fontWeightBold,
    color: theme.brand,
    fontSize: theme.fontSizeMedium,
  },
  button1BorderOpenMenuActiveAtm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: theme.brand,
    borderRadius: 50,
    marginBottom: 30,
    height: 50,
    width: 120,
  },
  button1StyleOpenMenuActiveAtm: {
    fontWeight: theme.fontWeightBold,
    color: theme.white,
    fontSize: theme.fontSizeMedium,
  },
  button2BorderOpenMenuActiveAtm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: theme.newLightGrey,
    borderRadius: 50,
    marginBottom: 30,
    height: 50,
    width: 120,
  },
  button2StyleOpenMenuActiveAtm: {
    fontWeight: theme.fontWeightBold,
    color: theme.brand,
    fontSize: theme.fontSizeMedium,
  },
  headingRemittance: [
    textAlignCenter,
    {
      fontSize: theme.fontSizeLarge,
      paddingTop: 10,
      color: theme.darkBlue,
      fontWeight: 'bold'
    }
  ],
  headingSIL: [
    textAlignCenter,
    {
      fontSize: 22,
      paddingTop: 10,
      color: theme.text,
      paddingHorizontal: 25,
    }
  ],
  textRemittance: [textAlignCenter,
    {
      paddingTop: 10,
      paddingBottom: 30,
      paddingHorizontal: 20,
      color: theme.darkBlue
    }
  ],
  iconRemittanceWrong: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    marginTop: 30,
  },
  buttonAlignRemittance: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.pinkBrand,
    borderRadius: 50,
    marginBottom: 30,
  },
  buttonSILCancel: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  whiteText: [fontSizeMediumStyle,
    {color: theme.white}
  ],
  buttonAlignSplitBillCancel: {
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 5,
    marginTop: 15,
    marginBottom: 20
  },
  buttonAlignSplitBillGotIt: {
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 5,
    marginBottom: 20
  },
  whiteText1: [fontSizeMediumStyle,
    {
      color: theme.white,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingVertical: 10
    }],
  redText1: [fontSizeMediumStyle,
    {
      color: theme.red,
      fontSize: 20,
      paddingVertical: 10
    }],
  imgIcon: {
    width: ((width - 40) * 0.6) / 2,
    height: ((width - 40) * 2) / 8.5,
  },
  urlEvoucher: {
    width: (trueWidth - 30) / 3,
    height: (trueHeight - 30) / 3,
    padding: 20,
    marginRight: trueHeight / 6,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  button1QRGPN: {
    marginHorizontal: 10,
    backgroundColor: theme.superlightGrey,
    borderRadius: 50,
    height: 55,
    width: 120,
    textAlign: 'center',
  },
  imageRewardClaim: {
    width: ((width - 200) * 0.5),
    height: ((width - 200) * 0.5),
  },
  imageMgmReward: {
    width: ((width - 100) * 0.5),
    height: ((width - 100) * 0.5),
  },
  iconMgm: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  textMgm: [textAlignCenter,
    {
      paddingTop: 5,
      paddingBottom: 20,
      paddingHorizontal: 40,
      color: theme.darkBlue,
    }
  ],
  textRewardMgm: [textAlignCenter,
    {
      paddingTop: 5,
      paddingBottom: 10,
      paddingHorizontal: 40,
      color: theme.darkBlue,
    }
  ],
  textMgmInformation: [textAlignCenter,
    {
      paddingTop: 5,
      paddingBottom: 20,
      paddingHorizontal: 10,
      color: theme.darkBlue,
    }
  ],
  textSuccessMgm: [textAlignCenter,
    {
      paddingTop: 5,
      paddingBottom: 20,
      paddingHorizontal: 30,
      color: theme.darkBlue,
    }
  ],
  headingMgm: [fontSizeLargeStyle,
    textAlignCenter,
    {
      paddingTop: 10,
      color: theme.darkBlue,
      fontWeight: theme.fontWeightBold,
    }
  ],
  bankTextTopMgm: {
    top: 17,
    textAlign: 'center',
    fontSize: 15,
    color: theme.radicalRed,
  },
  bankTextRewardMgm: {
    top: 10,
    textAlign: 'center',
    fontSize: 15,
    color: theme.radicalRed,
  },
  bankTextInfoMgm: {
    top: 5,
    textAlign: 'center',
    fontSize: 15,
    color: theme.radicalRed,
    backgroundColor: theme.superLightpurple,
    paddingTop: 15,
    borderRadius: 30,
    height: 47,
    fontWeight: theme.fontWeightBold,
  },
  button1info: {
    backgroundColor: theme.white,
    height: 55,
    width: 250,
  },
  bankTextReward: {
    top: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: theme.radicalRed
  },
  checkboxStyleMgm: {
    width: 12,
    height: 12
  },
  selfie: {
    resizeMode: 'contain',
    width: hp(20),
    height: wp(30),
  },
  heading2PD: [
    fontSizeLargeStyle,
    textAlignCenter, {
      color: theme.darkBlue,
      fontWeight: theme.fontWeightBold
    }
  ],
  buttonAlignPD: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  redTextPD: [
    fontSizeMediumStyle,
    {
      color: theme.primary,
      fontWeight: theme.fontWeightMedium,
      marginBottom: 10,
    },
  ],
  orderIdRequest: [
    textAlignCenter,
    {
      paddingTop: 20,
      fontSize: 16,
      color: theme.darkBlue,
    }
  ],
  iconsPD: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPDSub: [textAlignCenter,
    {
      paddingTop: 5,
      paddingBottom: 30,
      paddingHorizontal: 10,
      color: theme.darkBlue,
    }],
  heading3PD: [
    fontSizeLargeStyle,
    textAlignCenter,
    {
      color: theme.darkBlue,
      fontWeight: theme.fontWeightBold
    }
  ],
  timeProgress: {
    height: ((width - 60) * 0.45),
    width: ((width - 50) * 0.4),
  },
  buttonPopUpWarningAddressAddNewATM: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.pinkBrand,
    borderRadius: 50,
  },
  bRad: {
    borderRadius: 10
  },
  tManDetail: {
    justifyContent: 'center'
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.darkBlue,
    marginVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  detailTitlePeriode: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.darkBlue,
    paddingHorizontal: 10,
  },
  redText: [fontSizeMediumStyle,
    {color: theme.primary}
  ],
  redTextUnlinkMerchant: [fontSizeMediumStyle,
    {
      color: theme.primary,
      fontWeight: 'bold'
    }
  ],
  button1ES: {
    backgroundColor: theme.brand,
    borderRadius: 50,
    height: 50,
    width: width * 0.6,
    justifyContent: 'center'
  },
  button2ES: {
    borderRadius: 50,
    paddingBottom: 20,
    paddingTop: 10
  },
  boxI: {
    paddingBottom: 30,
    paddingHorizontal: 10,
    width: 320
  },
  fieldSty: {
    justifyContent: 'center',
  },
  detailTitleModal: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.darkBlue,
    marginVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  confText: {
    fontSize: 14,
    color: theme.darkBlue,
    marginBottom: 30,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  heading1MoveVoucher: [
    fontSizeLargeStyle,
    textAlignCenter,
    {
      paddingTop: 10,
      color: theme.darkBlue,
      fontWeight: theme.fontWeightBold,
    }
  ],
  textMoveVoucher: [
    textAlignCenter,
    {
      paddingTop: 5,
      paddingBottom: 10,
      paddingHorizontal: 20,
      color: theme.darkBlue,
      lineHeight: 20
    }
  ],
  button1MoveVoucher: {
    backgroundColor: theme.pinkBrand,
    paddingVertical: 15,
    width: width * 0.5,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 10,
  },
  button2MoveVoucher: {
    backgroundColor: theme.white,
    paddingVertical: 5,
    width: width * 0.5,
    borderRadius: 50,
    alignItems: 'center',
  },
  redTextBold: [
    fontSizeMediumStyle,
    {
      color: theme.primary,
      fontWeight: theme.fontWeightMedium,
    }
  ],
  whiteTextBold: [
    fontSizeMediumStyle,
    {
      color: theme.white,
      fontWeight: theme.fontWeightMedium,
    }
  ],
  checkboxStyleReksadana: {
    width: 12,
    height: 12,
  },
  textReksadana: {
    paddingLeft: 28,
    paddingTop: 20,
    fontSize: 18,
    color: theme.black
  },
  textDisclaimerReksadana: [textAlignCenter,
    {
      paddingTop: 20,
      paddingHorizontal: 20
    }
  ],
  checkboxStyleMedalion: {
    width: 12,
    height: 12,
  },
  iconInformationMedalion: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    marginTop: 30,
  },
  imgInformation: {
    width: ((width - 40) * 0.6) / 2,
    height: ((width - 40) * 2) / 8.5,
  },
  buttonInformationToogle: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    margin: 20,
  },
  headingInformationToogle: [
    textAlignCenter,
    {
      fontSize: 22,
      paddingTop: 10,
      color: theme.text,
      paddingHorizontal: 25,
    }
  ],
  textInformationToggle: {
    // paddingLeft: 28,
    paddingTop: 20,
    fontSize: 15,
    color: theme.black
  },
  headingNewMedalion: [
    textAlignCenter,
    {
      fontSize: 22,
      paddingTop: 10,
      color: theme.text,
      paddingHorizontal: 25,
      marginBottom: 20,
    }
  ],
  iconDisclaimerMedalion: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60,
    paddingTop: 15,
    // marginTop: 30,
  },
  checkboxAlignMedalion: {
    paddingBottom: 80,
    // marginLeft: -0,
    marginLeft: -20,
    // marginRight: 10,
    // paddingTop: 5,
  },
  buttonMedalionOK: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    // marginHorizontal: 20,
    // marginBottom: 20,
  },
  buttonMedalionCancel: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    // marginHorizontal: 20,
    justifyContent: 'center',
    // paddingBottom: 20,
  },
  textLinkReksadanaStyle: {
    // paddingBottom: 10,
    // paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    marginLeft: 10
  },
  linkStyleMedalion: {
    // paddingLeft: 28,
    // paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginRight: 20,
    paddingTop: -10,
    // paddingBottom: 20,
    // fontSize: 15,
    fontWeight: 'bold',
    color: theme.blueAmount
  },
  wordingDisclaimerMedalion: {
    // paddingTop: 20,
    paddingBottom: 20,
    // paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    // marginTop: 20,
    marginRight: -20,
    marginLeft: 10
  },
  textListMedalion: {
    paddingLeft: 28,
    paddingTop: 20,
    fontSize: 18,
    marginBottom: 100,
    color: theme.black
  },
  listRowMedalion: {
    flexDirection: 'row',
    marginLeft: -40
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // paddingVertical: 10,
    // alignSelf: 'center',
  },
  rowContentMedalion: {
    // flex: 2,
  },
  imageProxyResolution: {
    width: ((width - 200) * 0.63),
    height: ((width - 200) * 0.5),
  },
  bankTextProxyResolution: {
    top: 17,
    textAlign: 'center',
    fontSize: 15,
    color: theme.radicalRed,
  },
  button1Proxy: {
    backgroundColor: theme.brand,
    borderRadius: 50,
    height: 55,
    width: width * 0.6,
    textAlign: 'center',
    marginTop: 10
  },
  bankTextProxy: {
    top: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: theme.white
  },
};
