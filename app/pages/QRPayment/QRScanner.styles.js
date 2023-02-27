import {theme} from '../../styles/core.styles';
import {fontSizeLargeStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency

const rectDimensions = width * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = width * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'transparent';

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
    // marginBottom: 100,
    height: height,
    // marginTop: -150,
  },
  topBg: {
    width: width,
    height: 120,
    backgroundColor: theme.pinkBrand,
    paddingVertical: 20
  },
  scan: {
    flexDirection: 'row',
    paddingHorizontal: 20,
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
    marginBottom: 10
  },
  
  button: {
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
    backgroundColor: 'transparent'
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
    paddingBottom: width * 0.5
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
  }
};
