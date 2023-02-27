import {theme} from '../../styles/core.styles';
import {fontSizeSmallStyle} from '../../styles/common.styles';

export default {
  promoImage: {
    resizeMode: 'contain',
  },
  imageSize: {
    resizeMode: 'contain',
  },
  merchantAmount: [
    fontSizeSmallStyle,
    {
      color: theme.textGrey,
    }
  ],
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
  greyLine: {
    borderBottomWidth: 1,
    borderColor: theme.greyLine
  },
  cardContainer: {
    backgroundColor: theme.white
  },
  row: {
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 0.15,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicatorStyle: {
    showsText: true,
    color: theme.brand,
    size: 50,
    thickness: 2
  },
  mechantDetailContainer: {
    flex: 1
  },
  container: {flex: 1},
};
