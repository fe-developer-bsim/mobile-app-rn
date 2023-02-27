import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20
  },
  navigationContainer: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 20,
    backgroundColor: theme.brand
  },
  arrowIcon: {
    color: theme.white
  },
  title: {
    fontSize: theme.fontSizeXL,
    fontFamily: theme.roboto,
    color: theme.white,
  },
  titleBlack: {
    fontSize: theme.fontSizeXL,
    fontFamily: theme.roboto
  },
  subtitle: {
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    color: theme.white
  },
  arrowIconDisabled: {
    color: theme.textGrey
  },
  titleDisabled: {
    fontSize: theme.fontSizeLarge,
    fontFamily: theme.roboto,
    color: theme.textGrey
  },
  subtitleDisabled: {
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    color: theme.textGrey
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  flex1: {
    flex: 1
  },
  additionalPadding: {
    paddingBottom: 5
  },
  otherMethod: {
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto
  },
  infoTitle: {
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightBold
  },
  infoSubtitle: {
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightLight
  },
  infoSubtitleBold: {
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightBold
  },
  middleContainer: {
    paddingHorizontal: 10
  },
  infoContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: theme.greyLine
  },
  row: {
    flexDirection: 'row',
    width: width - 60,
    justifyContent: 'space-between',
    paddingTop: 10,
    alignItems: 'center'
  },
  accountNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.greyLine,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1
  },
  accountNumberTitle: {
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    color: theme.textGrey
  },
  accountNumber: {
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
  },
  copyIcon: {
    color: theme.brand,
    paddingHorizontal: 10
  },
  methodContainer: {
    paddingHorizontal: 10
  },
  imagesContainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  logoPadding: {
    paddingRight: 10
  },
  textContainer: {
    marginRight: 40
  }
};
