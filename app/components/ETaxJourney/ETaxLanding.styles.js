import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {height} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  contentContainerStyle: [{flexGrow: 1, backgroundColor: 'white'}],
  container: [
    styles.containerWhiteStyle,
    {
      flex: 1,
      padding: 20,
      justifyContent: 'space-between'
    }
  ],
  tabBarContainer: {
    flexGrow: 1,
    backgroundColor: theme.transparent,
  },
  productContainer: 
  {
    flex: 1,
    padding: 20
  },
  pageTitle: [
    styles.fontSizeLargeStyle,
    {
      marginBottom: 10,
      fontWeight: '700'
    }
  ],
  pageSubtitle: [
    styles.fontSizeNormalStyle
  ],
  navItemsContainer: {
    flex: 1
  },
  cardContainer: {
    backgroundColor: theme.white,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 15
  },
  imageContainer: {
    flex: 4,
    aspectRatio: 1,
    alignItems: 'center'
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  imageContainerCC: {
    flex: 4,
    alignItems: 'center',
    aspectRatio: 1.4,
  },
  imageContainerCC2: {
    flex: 4,
    alignItems: 'center',
    aspectRatio: 0.8,
  },
  imageCC: {
    resizeMode: 'contain',
    flex: 1,
    width: 100
  },
  detailContainer: {
    flex: 10,
    paddingLeft: 15,
  },
  txtBold: {
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    marginTop: 10,
    fontFamily: theme.roboto,
  },
  txtLight: {
    fontWeight: theme.fontWeightLight,
    color: theme.black,
    fontSize: theme.fontSizeNormal,
    paddingTop: 5,
    fontFamily: theme.robotoLight,
  },
  actionTextContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'flex-end',
    right: 5,
  },
  actionText: {
    color: theme.brand,
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightRegular,
    bottom: 8,
  },
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    marginBottom: 20,
  },
  titleTextContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  titleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  titleText: {
    fontSize: theme.fontSizeExtraXL,
    fontWeight: theme.fontWeightRegular,
    color: theme.black,
    fontFamily: theme.roboto,
  },
  arrowIcon: {
    color: theme.red,
    bottom: 10,
    paddingLeft: 7
  },
  containerBottom: {
    padding: 20
  },
  columnContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  buttonApply: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'flex-end',
    right: 15,
    flexDirection: 'row'
  },
  offerContainer: {
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.contrast,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginHorizontal: 10,

    elevation: 4,
    shadowOffset: {width: 0, height: 1},
    shadowColor: 'grey',
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  cardContainer2: {
    alignItems: 'flex-start',
    backgroundColor: theme.white,
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 20
  },
  tooltip: {
    top: 60, 
    bottom: 80,
    left: 80,
    right: 80,
  },
  offerContainerTooltip: {
    borderRadius: 10,
    borderColor: theme.brand,
    backgroundColor: theme.brand,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,

    elevation: 4,
    shadowOffset: {width: 0, height: 1},
    shadowColor: 'grey',
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  tnCContainer: {
    flex: 1,
    backgroundColor: theme.white,
    paddingBottom: 20,
  },
  nextButton: styles.buttonLargeTextStyle,
  buttonTNCContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  pinkBg: {
    flex: 1,
  },
  whiteBg: {
    backgroundColor: theme.whiteGrey,
    height: height,
    flex: 1,
    padding: 20,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 0 : 10 : 0,
  },
  textPickerStyle: {
    marginTop: 20,
  },
  pickerStyle: {
    paddingVertical: 10,
    color: theme.darkBlue,
    marginHorizontal: 10,
    backgroundColor: theme.white
  },
  textPickerStylePayment: {
    marginTop: 0,
  },
  pickerStylePayment: {
    color: theme.darkBlue,
    marginHorizontal: 10,
    backgroundColor: theme.white
  },
  emptySourceAccountContainer: {
    backgroundColor: theme.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.grey,
    height: 80,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row'
  },
  mt10: {
    marginTop: 10,
    fontWeight: theme.fontWeightBold,
    color: theme.blueDisable,
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
  },
  accNumber: {
    fontWeight: theme.fontWeightBold,
    color: theme.lightBlack,
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
  },
  mt15: {
    marginTop: 15
  },
  iconDetail: {
    color: theme.grey,
    marginTop: 10
  },
  sourceAccountContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.grey,
    backgroundColor: theme.white,
    // height: 80,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    flex: 0.2,
    alignItems: 'center',
  },
  imageOffer2: {
    width: 65,
    height: 65
  },
  infoContainer: {
    flex: 0.75,
    marginLeft: 10
  },
  footer: {
    marginTop: 20,
    height: 70,
    marginHorizontal: 20
  },
};