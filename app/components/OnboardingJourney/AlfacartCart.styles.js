import {theme} from '../../styles/core.styles';

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
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: theme.greyLine,
    paddingVertical: 20,
  },
  productContainerOngkir: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    paddingBottom: 10,
    marginBottom: 10
  },
  flex1: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'space-between',
  },
  rowOngkir: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'space-between',

  },
  rowCheck: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'space-between',
  },
  spaceOngkir: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'space-between',
  },
  rowEnd: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  newRow: {
    position: 'absolute',
    marginLeft: 110,
    marginTop: 80,
  },
  rowIcon: {
    position: 'absolute',
    marginLeft: 210,
    paddingTop: 105,
    justifyContent: 'flex-end',
  },
  rowIcon2: {
    position: 'absolute',
    marginLeft: 240,
    paddingTop: 90,
    justifyContent: 'flex-end',
  },
  rowEndOngkir: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  rowEndCheck: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  productNameContainer: {
    position: 'absolute',
    marginLeft: 90,
    marginTop: 20
  },
  selectAll: {
    position: 'absolute',
  },
  totalPriceContainer: {
    position: 'absolute',
    marginLeft: 90,
    marginTop: 35,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 60,
    height: 60,
    paddingRight: 40,
  },
  imageSpace: {
    width: 70
  },
  iconOngkir: {
    justifyContent: 'space-between',
    marginRight: 5,
    marginLeft: 10
  },
  wishlistContainer: {
    justifyContent: 'space-between',
    position: 'absolute',
  },
  textOngkir: {
    justifyContent: 'center',
    marginLeft: 15,
    paddingTop: 10
  },
  cautionOngkir: {
    justifyContent: 'flex-end',
    marginLeft: 25
  },
  cautioni: {
    transform: [{rotate: '180deg'}]
  },
  borderedContainerOngkir: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.white,
    width: 320,
    height: 60,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 160, 1, 0.2)',
  },
  borderedContainer: {
    borderWidth: 1,
    borderRadius: 5,
    width: 90,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  rightBorder: {
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    // backgroundColor: theme.red,
  },
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    marginTop: 10
  },
  center: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginLeft: 10
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
    paddingRight: 10,
    marginBottom: 5
  },
  buttonRight: {
    flex: 1,
    paddingLeft: 10
  },
  cartEmptyContainer: {
    paddingBottom: 140,
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
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'Roboto',
    color: theme.brand
  },
  mediumText: {
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  amountOngkir: {
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'Roboto',
    marginBottom: 5,
    alignItems: 'center'
  },
  ongkirText: {
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'Roboto',
    alignItems: 'center'

  },
  textItems: {
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightLight,
    fontFamily: 'Roboto',
  },
  textTotal: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightMedium,
  },
  amountNew: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeSmall,
  },
  grossAmount: {
    fontWeight: theme.fontWeightLight,
    fontFamily: 'Roboto',
    textDecorationLine: 'line-through',
    fontSize: theme.fontSizeSmall,
  },
  largeText: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'Roboto',
  },
  largeTextDisabled: {
    fontSize: theme.fontSizeLarge,
    color: theme.textLightGrey,
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
    height: 200,
    width: 230,
    marginTop: 120,
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
  ph10: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  padding20: {
    padding: 10
  },
  checkboxStyle: {
    width: 20,
    height: 20,
  },
  checkboxLabel: {
    marginLeft: 150,
  },
  loveFill: {
    color: theme.grey
  },
  loveFillRed: {
    color: theme.brand
  },
  row2: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 30,
  },
  productContainer2: {
    flexDirection: 'row',
    flex: 1,
    borderColor: theme.greyLine,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
};
