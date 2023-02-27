import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');
const trueHeight = height * 4.5 / 10;
const trueHeight2 = height * 3 / 10;
const trueHeight3 = height * 1.5 / 10;

export default {
  container: {
    flexDirection: 'column',
  },
  ticketContainer: {
    height: trueHeight
  },
  merchantDetailContainer: {
    backgroundColor: theme.white,
    height: trueHeight2
  },
  merchantText: {
    textAlign: 'center',
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightMedium,
    color: theme.black,
  },
  ticketTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
  ticketImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40
  },
  ticketImage: {
    height: 200,
    resizeMode: 'contain',
  },
  discountAmount: {
    fontSize: 90,
    fontWeight: theme.fontWeightBold,
    textAlign: 'center',
    paddingLeft: 60,
    color: theme.black,
    marginBottom: -10
  },
  promo: {
    fontSize: theme.fontSizeNormal,
    textAlign: 'center',
    paddingLeft: 110,
    paddingRight: 30,
    color: theme.black,
    marginBottom: -10,
    lineHeight: 20
  },
  discountText: {
    fontSize: theme.fontSizeExtraXL,
    fontWeight: theme.fontWeightMedium,
    textAlign: 'center',
    paddingLeft: 10,
    color: theme.black,
  },
  discountTopTitle: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightMedium,
    textAlign: 'center',
    color: theme.black,
    paddingVertical: 10,
  },
  logoMerchant: {
    height: 110,
    width: 110,
    resizeMode: 'contain',
  },
  logoMerchantContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 20
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: trueHeight3,
    backgroundColor: theme.white
  },
  buttonSpacing: {
    marginVertical: 10,
  },
  buttonLargeText: {
    color: theme.white,
    fontSize: theme.fontSizeMedium
  }
};
