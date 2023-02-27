import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default {
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
    flex: 1
  },
  wrapperIOS: {
    backgroundColor: 'transparent',
  },
  wrapperAndroid: {
    backgroundColor: 'transparent',
    flex: 1
  },
  slide: {
    backgroundColor: 'transparent',
  },
  pagination_x: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  pagination_y: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 10,
    bottom: -30,
    left: 0,
    flexWrap: 'nowrap',
    width: 250,
    backgroundColor: 'transparent'
  },
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 50,
    color: '#007aff',
    fontFamily: 'Arial'
  },
  ButtonLogin: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonMain: {
    paddingHorizontal: 30,
    paddingBottom: 25,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  buttonSecond: {
    paddingHorizontal: 20,
    padding: 10
  },
  mainbutton: {
    backgroundColor: theme.white,
    borderWidth: 2,
    borderColor: theme.white,
    borderRadius: 50
  },
  secondButton: {
    backgroundColor: theme.white,
    borderWidth: 2,
    borderColor: theme.white,
    borderRadius: 50,
  },
  activeDot: {
    backgroundColor: theme.white,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 3,
    marginBottom: (height - 30) / 3.5,
  },
  dot: {
    backgroundColor: 'transparent',
    width: 4,
    height: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.white,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 3,
    marginBottom: (height - 30) / 3.5,
  },
  pageStyleLoading: {
    width: width,
    height: height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pageStyle: {
    width: width,
    height: height,
  },
  containerBottomtext: {
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  contentText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: theme.fontSizeSmall,
    color: theme.white
  },
  textTerm: {
    textAlign: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    textDecorationLine: 'underline',
    fontSize: theme.fontSizeSmall,
    color: theme.white
  },
  centerText: {
    justifyContent: 'center',
    paddingHorizontal: 50
  },
  centerTextStyles: {
    color: theme.white,
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonMainSecond: {
    paddingHorizontal: 30,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  buttonLogin: {
    borderWidth: 2,
    borderColor: theme.white,
    borderRadius: 50,
    backgroundColor: 'transparent',
  },
  buttonMainLoginUser: {
    color: theme.white,
    fontSize: theme.fontSizeMedium
  },
  underlineText: {
    textDecorationLine: 'underline',
    fontSize: theme.fontSizeSmall,
    color: theme.white
  },
  containerBottomtextrow: {
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentTextSub: {
    fontSize: theme.fontSizeSmall,
    color: theme.white
  },
  continueButtonMedium: {
    color: theme.black,
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeMedium
  }
};
