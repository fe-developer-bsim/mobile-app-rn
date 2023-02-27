import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);
const trueWidth = width - 40;
const trueHeight = (trueWidth * 7) / 16;

export default {
  pinkBg: {
    flex: 1,
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 0 : 10 : 0,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  iconBack: {
    flex: 1,
    // backgroundColor: theme.green,
  },
  scoreText: {
    flex: 1,
    alignItems: 'center'
    // backgroundColor: theme.black,
  },
  imageSimobiPlus: {
    // backgroundColor: theme.blueAmount,
    flex: 1,
  },
  
  closeIcon: {
    color: theme.black,
    // paddingRight: 50,
    fontSize: theme.fontSize22,
  },
  close: {
    color: theme.darkBlue,
    fontSize: 30,
  },

  topDate: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  textTopDate: {
    fontSize: theme.fontSizeXS,
  },
  tesAja: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  circleContainer: {
    width: 200,
    height: 200,
    borderRadius: 130,
    backgroundColor: theme.white,
    borderWidth: 0.5,
    borderColor: theme.greyLine,
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 7,
    shadowColor: theme.greyLine, // for IOS
    shadowOpacity: 0.2,
    elevation: 10,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainerIOS: {
    width: 195,
    height: 195,
    borderRadius: 130,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.disabledGrey,
    marginVertical: 5,
    backgroundColor: theme.contrast,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'grey',
    shadowOpacity: 0.9,
    shadowRadius: 7,
    
  },
  circleContainerUIUX: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  NotScorePoint: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDetailScorePoor: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    fontWeight: 'bold',
    // paddingTop: 20,
    marginBottom: -10,
  },
  textDetailScoreFair: {
    fontSize: theme.fontSizeExtraXL,
    color: theme.black,
    fontWeight: 'bold',
    // paddingTop: 20,
    marginBottom: -10,
  },
  textDetailScoreGood: {
    fontSize: theme.fontSizeExtraXL,
    color: theme.black,
    fontWeight: 'bold',
    // paddingTop: 20,
    marginBottom: -10,
  },
  textDetailScoreGreat: {
    fontSize: theme.fontSizeXL,
    color: theme.black,
    fontWeight: 'bold',
    // paddingTop: 20,
    marginBottom: -10,
  },
  textDetailScoreExcellent: {
    fontSize: theme.fontSize26,
    color: theme.black,
    fontWeight: 'bold',
    // paddingTop: 20,
    marginBottom: -10,
  },
  noScorePoint: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  scorePoint: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  textNotAvailable: {
    alignItems: 'center',
    fontSize: theme.fontSizeXL,
    color: theme.black,
    fontWeight: 'bold',
  },
  sumScoreTextKit: {
    fontSize: theme.fontSizeXXL,
    color: theme.black,
    fontWeight: 'bold',
    marginBottom: -15,
  },
  sumScoreText: {
    fontSize: theme.fontSizeXXL,
    color: theme.darkBlue,
    fontWeight: 'bold',
    marginBottom: -15,
  },
  pointsText: {
    fontSize: theme.fontSizeMedium,
    color: theme.darkBlue,
  },
  textPoorScoreValue: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.radicalRed,
    backgroundColor: theme.radicalRed,
    paddingHorizontal: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 8
  },
  textFairScoreValue: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.textOrange,
    backgroundColor: theme.textOrange,
    paddingHorizontal: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 8
  },
  textGoodScoreValue: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.textYellow,
    backgroundColor: theme.textYellow,
    paddingHorizontal: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 8
  },
  textGreatScoreValue: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.textSoftGreen,
    backgroundColor: theme.textSoftGreen,
    paddingHorizontal: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 8
  },
  textExcellentScoreValue: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.textLightGreen,
    backgroundColor: theme.textLightGreen,
    paddingHorizontal: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 8
  },
  textNoScoreValue: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.whiteGrey,
    backgroundColor: theme.whiteGrey,
    paddingHorizontal: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 8
  },
  scoreDesc: {
    color: theme.white,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  NoscoreDesc: {
    color: theme.darkBlue,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  textDateUpdate: {
    fontSize: 9,
    marginBottom: 30,
  },
  textOffers: {
    color: theme.darkBlue,
    marginLeft: 5,
  },
  rowOffers: {
    // alignSelf: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  colorTextOffers: {
    backgroundColor: theme.radicalRed,
    paddingHorizontal: 2,
  },
  buttonDetail: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.blueAmount,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  mainTitleLogo: {
    width: 150,
    height: 30,
    resizeMode: 'contain',
    // paddingVertical: 20,
  },

  containerInnerOffer: {
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: theme.disabledGrey,
    marginVertical: 10,
    backgroundColor: theme.contrast,
    marginHorizontal: width * 0.05,
    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  shortContainerInnerOffer: {
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: theme.disabledGrey,
    marginVertical: 5,
    backgroundColor: theme.contrast,
    marginHorizontal: width * 0.05,
    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  bannerinnerOffer: {
    width: trueWidth,
    height: trueHeight
  },
  bannerLifestyleElse: {
    width: trueWidth,
    height: trueHeight
  },
  containerAlfa: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  containerAlfaSmall: {
    flexDirection: 'row',
    paddingVertical: 1.5,
    justifyContent: 'space-between'
  },
  label: {
    marginHorizontal: 10,
    fontSize: theme.fontSizeSmall
  },
  labelSmall: {
    marginHorizontal: 10,
    fontSize: theme.fontSizeXS,
    color: theme.black
  },
  labelValidDate: {
    marginHorizontal: 10,
  },
  offerDetails: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: theme.greyLine,
    alignItems: 'center',
  },
  iconContainer: {
    paddingLeft: 5
  },
  emptyBannerKoperasi: {
    marginTop: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },
};