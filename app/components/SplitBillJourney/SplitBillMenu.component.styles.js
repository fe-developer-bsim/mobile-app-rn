import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
import * as styles from '../../styles/common.styles';
const {width} = Dimensions.get('window');
const trueWidth = width - 30;
const trueHeight = (trueWidth * 7) / 16;
const bannerHeight = (trueWidth * 7) / 10;
const {height} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  container: {
    backgroundColor: theme.white,
    flexGrow: 1,
  },
  scrollContainer: {
    paddingBottom: 80
  },
  promoAmountContainer: {
    backgroundColor: theme.brand,
    padding: 5,
    justifyContent: 'center',
  },
  promoDetailDateContainer: {
    flex: 4,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  tabTextActive: {
    color: theme.black
  },
  qrTag: {
    justifyContent: 'center',
  },
  qrTagText: {
    color: theme.qrPromoTurqoise,
    fontWeight: theme.fontWeightBold,
    fontStyle: 'italic'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 20
  },
  containerNoPadding: {
    paddingVertical: 10,
    backgroundColor: theme.containerGrey,
  },
  containerEgift: {
    backgroundColor: theme.containerGrey
  },
  OffersContainer: {
    marginHorizontal: 10
  },

  textstyle: {
    paddingHorizontal: 20,
    paddingTop: 10
  },
  seeAll: {
    backgroundColor: theme.black,
    width: 65,
    height: 25,
    borderRadius: 20,
    marginHorizontal: 10,
    position: 'absolute',
    right: 10,
    bottom: 50,
    alignSelf: 'flex-end',
  },
  seeAlltext: {
    color: theme.white,
    alignSelf: 'center',
    paddingTop: 3
  },
  offerBannerContainer: {
    width: width,
    height: bannerHeight
  },
  offersStylesImage: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: theme.disabledGrey,
  },
  offerImageBanner: {
    width: trueWidth,
    height: trueHeight,
  },
  bannerFlex: {
    flex: 1
  },
  label: {
    marginHorizontal: 10,
    fontSize: theme.fontSizeSmall,
    color: theme.black
  },
  labelValidDate: {
    marginHorizontal: 10,
    color: theme.black
  },
  iconStyleBlack: {
    color: theme.black
  },
  containerButton: {
    flex: 1,
  },
  buttonSplitBill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  mainContainer: {
    backgroundColor: theme.newLightGrey,
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  buttonSpacing: {
    marginVertical: 10
  },
  nextButton: styles.buttonLargeTextStyle,

  pinkBg: {
    backgroundColor: theme.pinkBrand,
    flexGrow: 1,
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    padding: 20,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 0 : 10 : 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabText: {
    backgroundColor: theme.pinkBrand,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  buttoTopBill: {
    paddingHorizontal: 50,
    backgroundColor: theme.white
  },
  buttoTopBillMember: {
    paddingHorizontal: 42,
    backgroundColor: theme.white
  },
  buttoTopBillActive: {
    paddingHorizontal: 50,
  },
  buttoTopBillActiveMember: {
    paddingHorizontal: 42,
  },
  topButtonTextActive: {
    color: theme.white,
    fontFamily: 'roboto'
  },
  topButtonText: {
    color: theme.pinkBrand,
    fontFamily: 'roboto'
  },
  containerHead: {
    flex: 1
  },
  containerContentRevamp: [{justifyContent: 'space-between', flexGrow: 1, paddingBottom: 20}],
  containerRevamp: {
    flex: 1,
    backgroundColor: theme.superlightGrey,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.8
  },

  iconSize: {
    alignSelf: 'center',
    width: 120,
    height: 240
  },

  emptyExplanation: {
    fontSize: theme.fontSizeNormal,
    color: theme.blueText,
    fontFamily: theme.roboto,
    paddingVertical: 10,
    fontWeight: theme.fontWeightBold,
    paddingLeft: 5,
    width: width * 0.5,
    textAlign: 'center'
  },
  amountText: {
    fontSize: theme.fontSize20,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto,
    paddingTop: 5,
  },
  pinkBgLoginProduct: {
    backgroundColor: theme.pinkBrand,
    flex: 1,
    padding: 20
  },
  containerBanner: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  containerTrfTitle: {
    paddingVertical: 10
  },
  transferTitle: {
    color: theme.white,
    marginHorizontal: 20,
    fontSize: 16,
    alignSelf: 'center',
  },
};