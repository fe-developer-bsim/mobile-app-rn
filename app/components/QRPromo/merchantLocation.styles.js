import {theme} from '../../styles/core.styles';
import {fontSizeSmallStyle, buttonLargeTextStyle} from '../../styles/common.styles';

export default {
  promoImage: {
    resizeMode: 'contain',
  },
  imageSize: {
    resizeMode: 'contain',
  },
  merchantName: {
    fontWeight: theme.bold
  },
  merchantAddress:
  [
    fontSizeSmallStyle,
    {
      color: theme.textGrey,
    }
  ],
  merchantDistance: {
    color: theme.textGrey,
    textAlign: 'right',
    fontSize: theme.fontSizeXS
  },
  payByQR: {
    color: theme.qrPromoTurqoise
  },
  merchantAmountContainer: {
    paddingHorizontal: 10,
    backgroundColor: theme.white
  },
  cardContainer: {
    backgroundColor: theme.white
  },
  row: {
    flexDirection: 'row'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 70,
    height: null,
    alignSelf: 'center'
  },
  indicatorStyle: {
    showsText: true,
    color: theme.brand,
    size: 50,
    thickness: 2
  },
  mechantDetailContainer: {
    flex: 1,
    paddingRight: 10,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  container: {flex: 1},
  buttonStyle: [buttonLargeTextStyle],
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  buttonContainer: {
    padding: 20
  }
};
