import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';


export default {
  container: {
    paddingBottom: 10,
    backgroundColor: theme.containerGrey
  },
  imageContainer: {
    padding: 10,
    backgroundColor: theme.white
  },
  topContainer: {
    backgroundColor: theme.white,
    padding: 20
  },
  priceContainer: {
    flexDirection: 'row'
  },
  qtyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  amountContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  borderedContainer: {
    borderWidth: 1,
    borderRadius: 5,
    width: 120,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  rightBorder: {
    borderRightWidth: 1,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40
  },
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    marginTop: 10
  },
  center: {
    height: 40,
    width: 40,
    paddingVertical: 5,
    alignItems: 'center'
  },
  middleContainer: {
    backgroundColor: theme.white,
    padding: 20,
    marginTop: 10
  },
  bottomContainer: {
    backgroundColor: theme.white,
    padding: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalContainer: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    paddingLeft: 20
  },
  poinContainer: {
    paddingTop: 2,
    justifyContent: 'center',
  },

  // image styles
  imageSize: {
    aspectRatio: 1
  },
  poinImage: {
    height: 11,
    width: 27
  },
  poinImageLarge: {
    height: 14,
    width: 35
  },

  // text styles
  name: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'Roboto',
  },
  price: {
    color: theme.brand,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'Roboto',
  },
  poin: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'Roboto',
  },
  quantity: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'Roboto',
  },
  largeText: {
    fontSize: theme.fontSizeXL
  },
  largeTextDisabled: {
    fontSize: theme.fontSizeXL,
    color: theme.textLightGrey
  },
  totalAmount: {
    color: theme.brand,
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'Roboto',
  },
  webViewWidth: {
    width: Dimensions.get('window').width - 15,
    marginTop: 35,
    opacity: 0.99
  }
};
