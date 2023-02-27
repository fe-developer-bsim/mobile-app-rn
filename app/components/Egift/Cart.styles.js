import {theme} from '../../styles/core.styles';
import {contentContainerStyle} from '../../styles/common.styles';

export default {
  container: {
    paddingBottom: 10,
    backgroundColor: theme.white
  },
  contentContainer: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  productContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    paddingBottom: 20
  },
  flex1: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'space-between',

  },
  rowEnd: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  productNameContainer: {
    position: 'absolute',
    marginLeft: 90,
    marginTop: 40
  },
  imageContainer: [contentContainerStyle],
  imageSpace: {
    width: 70
  },
  iconContainer: {
    marginRight: 20,
    marginTop: 10
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  totalContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 70
  },
  priceContainer: {
    flexDirection: 'row'
  },
  poinContainer: {
    paddingTop: 3,
    justifyContent: 'center',
  },
  poinContainerProduct: {
    paddingTop: 5,
  },
  emptyCartContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.inputBackground
  },
  buttonLeft: {
    flex: 1,
    paddingRight: 10
  },
  buttonRight: {
    flex: 1,
    paddingLeft: 10
  },
  cartEmptyContainer: {
    paddingTop: 20,
    alignItems: 'center'
  },
  errorContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  errorIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10
  },
  errorTextContainer: {
    flex: 1
  },
  quantity: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'Roboto',
    color: theme.brand
  },
  mediumText: {
    fontSize: theme.fontSizeSmall,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginBottom: 5
  },
  largeText: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'Roboto'
  },
  largeTextDisabled: {
    fontSize: theme.fontSizeXL,
    color: theme.textLightGrey
  },
  amount: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'Roboto'
  },
  total: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'Roboto'
  },
  cartEmptyText: {
    fontSize: theme.fontSizeNormal,
    color: theme.softGrey,
    fontFamily: 'Roboto'
  },
  errorIconColor: {
    color: theme.brand,
  },
  error: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: 'Roboto',
    fontWeight: theme.fontWeightLight
  },
  errorPoin: {
    fontSize: theme.fontSizeNormal,
    color: theme.brand,
    fontFamily: 'Roboto'
  },
  imageSize: {
    width: 60,
    height: 60
  },
  emptyCartImage: {
    height: 170,
    width: 230
  },
  poinImage: {
    height: 14,
    width: 35
  },
  poinImageLarge: {
    height: 15,
    width: 37
  },
  ph20: {
    paddingHorizontal: 20,
  },
  padding20: {
    padding: 10
  }
};
