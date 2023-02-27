import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle, fontSizeNormalStyle, fontSizeLargeStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const headerMaxHeight = 250;

const {width} = Dimensions.get('window');

export default {
  container: {
    flex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.brand,
    overflow: 'hidden',
    height: headerMaxHeight
  },
  placeholderHeader: {
    position: 'absolute',
    top: -100,
    left: 0,
    right: 0,
    height: 100
  },
  backgroundContainer: {
    margin: 20,
    width: null,
    borderRadius: 30,
    backgroundColor: theme.brand,
  },
  backgroundImage: {
    width: null,
    resizeMode: 'cover',
    borderRadius: 30,
  },
  bar: {
    height: headerMaxHeight - 40,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 34
  },
  transactionContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 1,
    zIndex: -1,
  },
  headerMaxHeight,
  card: {
    paddingHorizontal: 40,
    paddingVertical: 65,
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20
  },
  filterButtonContainer: {
    position: 'absolute',
    bottom: 10,
    width: width,
    alignItems: 'center'
  },
  filterButton: {
    borderRadius: 20,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: theme.white
  },
  filterIcon: {
    paddingLeft: 10,
    color: theme.black
  },
  redText: {
    color: theme.brand,
    fontFamily: 'roboto'
  },
  blackText: {
    color: theme.black,
    fontFamily: 'roboto'
  },
  activityContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  errorText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightLight,
    color: theme.softGrey
  },
  creditCardFeatureTitle: {
    color: theme.white,
    marginBottom: 34,
    fontFamily: 'roboto',
    paddingTop: 10,
    backgroundColor: 'transparent'
  },
  creditCardAccountNumberValue: [
    fontSizeLargeStyle,
    {
      color: theme.white,
      marginTop: 10,
      marginBottom: 10,
      fontFamily: 'roboto',
      backgroundColor: 'transparent'
    }
  ],
  creditCardExpiryTitle:
  {
    fontSize: theme.fontSizeXS,
    color: theme.white,
    textAlign: 'right',
    fontFamily: 'roboto',
    backgroundColor: 'transparent'
  },
  creditCardExpiry: [
    fontSizeMediumStyle,
    {
      color: theme.white,
      fontFamily: 'roboto',
      backgroundColor: 'transparent'
    }
  ],
  creditCardAccountName: [
    fontSizeNormalStyle,
    {
      color: theme.white,
      fontFamily: 'roboto',
      backgroundColor: 'transparent'
    }
  ],
  creditCardArrowIcon: {
    color: theme.white,
    backgroundColor: 'transparent'
  },
  placheholderHeader: {
    position: 'absolute',
    top: -70,
    left: 0,
    right: 0,
    height: 70
  },

  gradientBlack: ['#030303', '#272525', '#2F2E2E'],
  gradientGold: ['#AF9242', '#B89B49', '#D6C36C'],
  gradientGrey: ['#A5A5A5', '#B2B2B2', '#BFBFBF'],
  gradientPink: ['#F2AEAD', '#F4BABA', '#F7CECE'],
  gradientOrange: [
    theme.darkRed, '#EB493C', '#F35B51'
  ],
  extraPadding: {
    paddingVertical: 20
  }
};
