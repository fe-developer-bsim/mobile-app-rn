import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  columnContainer: {
    backgroundColor: theme.white
  },
  upperWrapper: {
    backgroundColor: theme.red,
    paddingBottom: 30
  },
  mainTitle: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.white
  },
  subTitle: {
    paddingLeft: 40,
    paddingRight: 50,
  },
  subTitleText: {
    fontSize: theme.fontSizeMedium,
    color: theme.white
  },
  mainCheckLogo: {
    height: 50,
    width: 60,
  },
  bottomWrapper: {
    paddingVertical: 10
  },
  containerFieldStep: {
    paddingBottom: 40
  },
  subMainTitle: {
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  subMainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.black
  },
  subSubTitle: {
    paddingLeft: 40,
    paddingRight: 50,
  },
  subSubTitleText: {
    fontSize: theme.fontSizeMedium,
  },
  buttonNext: {
    paddingTop: 20,
    paddingHorizontal: width / 11,
    width: width
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    width: 250,
    color: theme.white,
    textAlign: 'center'
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 20
  },
  helpEmail: {
    color: theme.red,
  },
  fieldRow: {
    flexDirection: 'row',
    paddingHorizontal: 30
  },
  bottomleftWrapper: {
    marginTop: 40,
    alignItems: 'center',
  },
  block: {
    height: 300,
    width: 2,
    backgroundColor: theme.grey,
  },
  blockTwo: {
    height: 440,
    width: 2,
    backgroundColor: theme.grey,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: theme.grey,
  },
  documentStyles: {
    paddingLeft: 45,
    paddingTop: 10,
    paddingRight: 20
  },
  documentStylesText: {
    color: theme.black,
    paddingVertical: 4,
    fontSize: theme.fontSizeMedium
  },
  subMainCheckLogo: {
    height: 70,
    width: 70,
    marginLeft: 30
  },
  buttonLoginSpace: {
    backgroundColor: 'transparent',
    borderColor: theme.red,
    borderWidth: 2,
    borderRadius: 50,
  },
  buttonMainLoginUser: {
    color: theme.red
  },
};
