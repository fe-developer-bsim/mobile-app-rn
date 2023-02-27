import {theme} from '../../styles/core.styles';
import {fontSizeLargeStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
import {getModelDevice} from '../../utils/transformer.util';
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');
const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency

const rectDimensions = width * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = width * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'transparent';

let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);


const scanBarWidth = height * 0.35; // this is equivalent to 180 from a 393 device width
const scanBarHeight = height * 0.0025; // this is equivalent to 1 from a 393 device width
const scanBarColor = theme.white;
export default {
  headerText: [fontSizeLargeStyle,
    {
      fontWeight: theme.fontWeightLight,
      color: theme.black,
    }],
  iconSize: {
    height: 50,
    width: 250,
    resizeMode: 'contain',
  },
  iconSize2: {
    height: 50,
    width: 80,
    paddingTop: 100,
    resizeMode: 'contain',
  },
  simaspoin: {
    resizeMode: 'contain',
    height: 80
  },
  buttonText: {
    color: theme.brand,
    fontWeight: theme.fontWeightRegular,
    textAlign: 'center',
  },
  container: {
    width: width,
    height: height,
  },
  topBgLogin: {
    width: width,
    height: Platform.OS === 'android' ? 120 : 140,
    backgroundColor: theme.pinkBrand,
    paddingVertical: 20
  },
  topBg: {
    width: width,
    height: Platform.OS === 'android' ? 60 : 80,
    backgroundColor: theme.pinkBrand,
    paddingVertical: 20
  },
  scan: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 0 : 20
  },
  backButton: {
    transform: [{rotate: '180deg'}],
    color: theme.white,
    fontWeight: 'bold'
  },
  textScan: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.white,
    alignSelf: 'center',
    marginLeft: width / 3
  },
  buttonTopContainer: {
    flexDirection: 'row',
    width: width,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTopScan: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.black
  },
  textTopScanTrue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.white
  },
  textTop: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.white
  },
  textTopTrue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.black
  },
  botContainer: {
    width: width,
    height: 150,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: height / 1.28
  },
  botContainerLogin: {
    width: width,
    height: 150,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: height / 1.26
  },
  bottonTopStyleLeft: {
    backgroundColor: theme.white,
    flexDirection: 'column',
    height: 50,
    width: width / 2.2,
    marginLeft: 40,
    borderWidth: 1,
    borderColor: theme.white,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  bottonTopStyleLeftTrue: {
    flexDirection: 'column',
    height: 50,
    width: width / 2.2,
    marginLeft: 40,
    borderWidth: 1,
    borderColor: theme.white,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  bottonTopStyleRight: {
    flexDirection: 'column',
    height: 50,
    width: width / 2.2,
    marginRight: 40,
    borderWidth: 1,
    borderColor: theme.white,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5
  },
  bottonTopStyleRightTrue: {
    backgroundColor: theme.white,
    flexDirection: 'column',
    height: 50,
    width: width / 2.2,
    marginRight: 40,
    borderWidth: 1,
    borderColor: theme.white,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5
  },
  buttonBot: {
    flexDirection: 'row',
    width: width,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottonStyleLeft: {
    flexDirection: 'column',
    height: 150,
    width: width / 2,
  },
  bottonStyleRight: {
    flexDirection: 'column',
    height: 150,
    width: width / 2,
  },
  bottonStyleRighta: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 20
  },
  botStyle: {
    width: width,
    alignItems: 'center',
    marginBottom: 400
  },
  buttnStyl: {
    flexDirection: 'row',
    marginTop: 100,
    bottom: 90
  },
  extraText: [fontSizeLargeStyle,
    {
      fontWeight: theme.fontWeightLight,
      color: theme.black,
      paddingHorizontal: 20,
      paddingTop: 20
    }],
  imageStyle: {
    paddingTop: 100
  },
  icon: {
    color: theme.white,
    marginBottom: 5
  },
  iconFlash: {
    color: theme.white,
    marginBottom: Platform.OS === 'android' ? 0 : -20
  },
  iconFlash2: {
    color: theme.white,
  },
  buttonGallery: {
    color: theme.white
  },
  botStyle2: {
    backgroundColor: theme.white,
    width: width,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginBottom: 50
  },
  rectangleContainerBl: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 20
  },

  topOverlay: {
    flex: 1,
    height: width,
    width: width,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center'
  },

  bottomOverlay: {
    flex: 1,
    height: width,
    width: width,
    backgroundColor: overlayColor,
    paddingBottom: Platform.OS === 'android' ? width * 0.56 : width * 0.56
  },

  leftAndRightOverlay: {
    height: width * 0.65,
    width: width,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  },
  containerInside: {
    paddingHorizontal: 25,
  },
  label: {
    fontSize: theme.fontSizeSmall
  },
  input: {
    fontSize: theme.fontSizeXL,
    textAlign: 'center',
    paddingVertical: 5,
    height: 60,
  },
  errorContainer: {
    paddingVertical: theme.padding,
  },
  passwordFieldsContainer: {
    flexDirection: 'column'
  },
  centerQR: {
    alignItems: 'center',
    paddingVertical: 10
  },
  releaseTitle: {
    fontSize: theme.fontSizeL,
    textAlign: 'center',
  },
  eyeIconStyle: {position: 'absolute', width: 30, right: 5, top: 30},
  button: {
    color: theme.white,
    marginBottom: Platform.OS === 'android' ? 0 : -20
  },
  button2: {
    color: theme.white,
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'space-between',

    borderWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.contrast,

    // elevation: 2,
    // shadowOffset: {width: 5, height: 5},
    // shadowColor: 'grey',
    // shadowOpacity: 0.3,
    // shadowRadius: 7,
    // marginTop: 30
  },
  rowTimer: {
    flexDirection: 'row',
  },
  topQRText: {
    textAlign: 'left',
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 20,
  },
  topQRTextTimer: {
    textAlign: 'center',
    color: theme.red,
  },
  shadowTimer: {
    borderRadius: 7,
    marginVertical: 15,
    padding: 5,
    alignSelf: 'center',
    textAlign: 'center',
    borderColor: theme.greyLine,
    backgroundColor: theme.greyLine
  },
  bodyBox: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // borderRadius: 15,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.contrast,

    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 7,
  },
  bodyBoxEmpty: {
    borderWidth: 1,
    borderTopWidth: 1,
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.contrast,
  },
  lineDashed: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.dashLine,
  },
  picture: {
    marginTop: 20,
    alignSelf: 'center',
    width: 265,
    height: 41,
  },
  qrisExplanation: {
    color: theme.lightGrey
  },
  qrisLogoContainer: {
    backgroundColor: theme.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    bottom: Platform.OS === 'ios' ? height * 0.03 : height * 0.05,
    alignItems: 'center'
  },
  pictureExpired: {
    marginTop: 20,
    alignSelf: 'center',
    width: 100,
    height: 200,
  },
  warningBox: {
    marginHorizontal: 25,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: theme.padding,
    paddingHorizontal: 15,
    borderColor: theme.disabledGrey,
    marginTop: 40,
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyleBlack: {
    paddingRight: 10,
    color: theme.darkBlue,
  },
  wrapTextWarning: {
    paddingRight: 30,
    color: theme.darkBlue,
  },
  iconTitleTop: {
    alignItems: 'center'
  },
  renewText: {
    textAlign: 'right',
    paddingRight: 20,
    paddingVertical: 20,
    color: theme.red,
    fontWeight: 'bold'
  },
  renewView: {
    alignItems: 'flex-end',
  },
  innerTextQR: {
    paddingTop: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerTextQREmpty: {
    paddingVertical: 120,
    paddingHorizontal: 80,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.black
  },
  logoBSIM: {
    position: 'absolute',
    backgroundColor: theme.white,
  },
  viewImg: {
    margin: 10,
    backgroundColor: theme.white,
  },
  imgBSIM: {
    width: ((width - 40) * 0.6) / 2,
    height: ((width - 40) * 0.6) / 8.5,
    backgroundColor: theme.white,
    margin: 5
  },
  midleImageQR: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    alignSelf: 'center',
    width: ((width - 40) * 0.31),
    height: ((width - 40) * 0.6),
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    paddingLeft: 25,
    paddingRight: 30,
    paddingTop: 20,
  },
  buttonSpacing: {
    paddingHorizontal: 20,
    bottom: 10
  },
  pickerText: {
    color: theme.darkBlue
  },
  darkBlueArrow: {
    color: theme.darkBlue,
  },
  buttonLargeTextStyle: {
    color: theme.white,
    fontSize: theme.fontSizeNormal,
    fontWeight: 'bold'
  },
  pinkBg: {
    backgroundColor: theme.pinkBrand,
    flex: 1,
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 5,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 0 : 10 : 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imgQris: {
    width: 83,
    height: 31,
    backgroundColor: theme.white,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    alignSelf: 'center'
  },
};