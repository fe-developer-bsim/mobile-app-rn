import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {height, width} = Dimensions.get('window');
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
  bgWhite: {
    backgroundColor: theme.white,
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
  titleContainerTop: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20
  },
  txtBold: {
    fontWeight: theme.fontWeightBold,
    color: theme.blueDisable,
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
  },
  txtLight: {
    fontWeight: theme.fontWeightBold,
    color: theme.blueDisable,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.robotoLight,
    marginBottom: 10
  },
  boxContainerDate: {
    flexDirection: 'row',
  },
  infoContainerDate: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.grey,
    height: 75,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: width / 2
  },
  txtMasaPajak: {
    fontSize: 15,
    paddingLeft: 20,
    color: theme.black,
    fontWeight: theme.fontWeightBold,
    marginVertical: 10
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
    borderTopWidth: 2,
    borderColor: theme.greyLine,
    marginVertical: 20,
    marginHorizontal: 12
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
    backgroundColor: theme.pinkBrand,
    flex: 1,
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 0 : 10 : 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  whiteBgProductItems: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 0 : 10 : 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleContainerProduct: {
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 10
  },
  containerTnc: {
    marginTop: Platform.OS === 'OS' ? 50 : 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  newTextContainer: {
    backgroundColor: theme.red,
    width: 28,
    height: 14,
    borderRadius: 20,
    bottom: 2,
  },
  newText: {
    color: 'white',
    fontSize: theme.fontSizeXS,
    fontFamily: theme.roboto,
    textAlign: 'center',
    fontWeight: theme.fontWeightBold
  },
  mt20: {
    marginTop: 20
  },
  mt10: {
    marginTop: 10
  },
  mt15: {
    marginTop: 15
  },
  boxContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.grey,
    height: 75,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
  },
  footer: {
    marginTop: 20,
    height: 70
  },
  h10Left: {
    height: 70,
    width: width * 0.41,
  },
  h10Right: {
    height: 70,
    width: width * 0.41,
    marginLeft: 10
  },
  textPickerStyle: {
    marginTop: 20,
  },
  pickerStyle: {
    paddingVertical: 10,
    color: theme.darkBlue,
    marginHorizontal: 10
  },
  bottomContainer: {
    marginHorizontal: 10,
    marginTop: 15
  },
  bottomText: {
    color: theme.darkBlue,
    marginHorizontal: 10,
    fontWeight: 'bold',
    textAlign: 'justify'
  },
  bottomTextIdBilling: {
    color: theme.disabledGrey,
    marginHorizontal: 10,
    marginVertical: 5,
    fontWeight: 'bold',
    textAlign: 'justify'
  },
  dateContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  idBillingContainer: {
    backgroundColor: theme.newLightGrey,
    marginVertical: 20,
    marginHorizontal: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10
  },
  dateBillingContainer: {
    backgroundColor: theme.newLightGrey,
    marginBottom: 20,
    marginHorizontal: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10
  },
  copyIconContainer: {
    marginTop: 10
  },
  idBillingButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  buttonBot: {
    width: width * 0.4
  },
  copyIcon: {
    color: theme.darkBlue,
    paddingRight: 5,
    paddingVertical: 5
  },
  saveBillingContainer: {
    marginBottom: 10
  },
  saveButton: {
    marginHorizontal: 10
  }
};