import {theme} from '../../styles/core.styles';
import {fontSizeNormal, textLightGreyStyle} from '../../styles/common.styles';


export default {
  loading: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: -100,
  },
  container: {
    flex: 1,
    backgroundColor: theme.containerGrey,
  },
  brandContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  brandPadding: {
    paddingBottom: 10
  },
  itemsContainer: {
    backgroundColor: theme.white,
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: theme.greyLine,
  },
  imageSize: {
    aspectRatio: 1
  },
  imageContainer: {
    padding: 10,
  },
  itemNameContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  itemName: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'Roboto',
  },
  priceContainer: {
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1
  },
  poinContainer: {
    justifyContent: 'center',
    paddingBottom: 2
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
  brand: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto',
  },
  poinImage: {
    height: 11,
    width: 27
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  error: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'Roboto',
    color: theme.brand
  },
  iconStyle: {
    color: theme.brand
  },
  Seperator: {
    height: 1,
    width: '80',
    backgroundColor: '#CED0CE',
    marginLeft: '14'
  },
  nulleVoucher: [{
    alignItems: 'center',
  },
  fontSizeNormal,
  textLightGreyStyle,
  ],
  nullContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100
  },
  renderFooter:
  {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE'
  },
  red: theme.brand
};
