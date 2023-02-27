import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  columnContainer: {
    flex: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between'
  },
  barStep: {
    flexDirection: 'row',
    height: 7
  },
  partOne: {
    backgroundColor: theme.red,
    height: 7,
    width: width
  },
  partTwo: {
    backgroundColor: theme.grey,
    height: 7,
    width: width
  },
  mainTitle: {
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.black
  },
  FieldsContainerWrapper: {
    paddingTop: 20,
    paddingHorizontal: 40,
    paddingBottom: 30
  },
  titleLearnMore: {
    paddingLeft: 40,
    flexDirection: 'row',
  },
  redArrow: {
    width: 25,
    height: 25
  },
  agreement: {
    paddingHorizontal: 40,
    paddingTop: 20
  },
  termAndConditionText: {
    textDecorationLine: 'underline',
    paddingBottom: 30,
    paddingTop: 10,
    paddingHorizontal: 65
  },
  bottomWrapper: {
    paddingTop: 10,
    paddingBottom: 20
  },
  buttonNext: {
    paddingTop: 40,
    paddingHorizontal: width / 11,
    width: width
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    width: 250,
    color: theme.white,
    textAlign: 'center'
  },

  captchaContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    paddingRight: 10,
    paddingTop: 10,
    marginBottom: 30,
  },
  captchaFieldContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
    alignSelf: 'center'
  },
  captchaIcon: {
    width: 150,
    height: 50,
  },
  captchaPadding: {
    flexDirection: 'row',
    padding: 20
  },
  captchaBorder: {
    borderWidth: 0.5,
    borderColor: theme.placeholderTextColor
  },
  refreshCaptcha: {
    textDecorationLine: 'underline',
    fontSize: theme.fontSizeSmall,
    color: theme.placeholderTextColor,
  },
  captchaLoader: {
    size: 90,
    borderWidth: 0,
    color: theme.brand,
    unfilledColor: theme.containerGrey,
  },
  greySmallText: {
    color: theme.placeholderTextColor,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall
  },
};
