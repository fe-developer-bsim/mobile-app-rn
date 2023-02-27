import {theme, text as textStyles} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  cameraIconStyle: {position: 'absolute', width: 40, right: 0, top: 35},
  bodyContainerWithNoTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  },
  spaceContainer: {
    justifyContent: 'space-between',
  },
  loginFieldsContainer: {
    paddingTop: 5,
    flexDirection: 'column',
    paddingHorizontal: 20
  },
  greySmallText: {
    color: theme.placeholderTextColor,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall
  },
  loginWelcomeSubMessageOTP: {
    fontSize: theme.fontSizeMedium,
    paddingHorizontal: 20,
    color: theme.white
  },
  pinBodyContainer: [{
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
  }],
  scrambleKeyboardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  redSmallText: {
    color: theme.brand,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall
  },
  footerText: {
    textAlign: 'center'
  },
  captchaContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    paddingBottom: 10,
    paddingRight: 10
  },
  captchaFieldContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
    alignSelf: 'center',
    paddingBottom: 10,
    paddingTop: 20,
  },
  captchaIcon: {
    width: 130,
    height: 50
  },
  
  captchaPadding: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  inlineField: {
    flexDirection: 'row',
    paddingTop: 5
  },
  childField: {
    flowDirection: 'row',
    marginTop: 6,
  },
  subText: {
    fontSize: theme.fontSizeXL,
    paddingHorizontal: 20,
    fontFamily: 'roboto'
  },
  orami: {
    color: '#F16D6E',
    marginHorizontal: -12
  },
  mainContainer: {
    maxWidth: width - 40,
  },
  captchaBorder: {
    borderWidth: 0.5,
    borderColor: theme.placeholderTextColor,
  },
  registerAtmWelcomeMessage: {
    fontSize: theme.fontSizeXL,
    paddingHorizontal: 20,
    fontFamily: 'roboto'
  },
  registerAtmWelcomeSubMessage: {
    ...textStyles.text,
    color: theme.black,
    paddingLeft: 20
  },
  registerAtmTitle: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  registerAtmTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.black,
    paddingHorizontal: 10,
    fontWeight: '300',
  },
  registerAtmTitleTextBottom: {
    fontSize: theme.fontSizeXL,
    color: theme.black,
    paddingHorizontal: 10,
    paddingBottom: 20,
    fontWeight: '300',
  },
  registerAtmSubMessage: {
    ...textStyles.text,
    paddingHorizontal: 10
  },
  receiptImage: {
    width: 150,
    height: 200
  },
  receiptContainer: {
    paddingTop: 20,
    paddingHorizontal: 10
  },
  underlinedText: {
    paddingLeft: 5,
    paddingVertical: 10,
    textDecorationLine: 'underline',
    fontSize: theme.fontSizeSmall,
    color: theme.placeholderTextColor,
  },
  refreshCaptcha: {
    textDecorationLine: 'underline',
    fontSize: theme.fontSizeSmall,
    color: theme.placeholderTextColor,
  },
  captchaLoader: {
    size: 80,
    borderWidth: 0,
    color: theme.brand,
    unfilledColor: theme.containerGrey
  },
  captchaInfo: {
    color: theme.placeholderTextColor,
    fontSize: theme.fontSizeSmall,
    paddingVertical: 5,
    textAlign: 'center'
  },
  refreshCaptchaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  buttonMainLogin: {
    color: theme.white
  },
  paddingAddition: {
    paddingTop: 20,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  fieldContainer: {
    paddingHorizontal: 20
  },
  redBar: {
    backgroundColor: theme.brand,
    flexDirection: 'row',
  },
  greyBar: {
    backgroundColor: theme.darkGrey,
    flexDirection: 'row',
  },
  progressBar: {
    flexDirection: 'row',
    height: 7
  },
  mainTitle: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.black
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 20,
  },
  
};
