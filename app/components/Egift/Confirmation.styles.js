import {theme} from '../../styles/core.styles';
import {textLightGreyStyle, bold, fontSizeSmallStyle, fontSizeLargeStyle} from '../../styles/common.styles';

export default {
  container: {
    flex: 1
  },
  contentContainer: {
    justifyContent: 'space-between',
  },
  detailContainer: {
    padding: 20,
  },
  topContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  quantityContainer: {
    paddingRight: 15
  },
  titleContainer: [bold, {
    fontSize: theme.fontSize22,
  }],
  middleContainer: {
    padding: 20
  },
  bottomContainer: {
    padding: 10,
    paddingTop: 30
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10
  },
  productContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    marginTop: 20,
    justifyContent: 'space-between'
  },
  amountContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  poinContainer: {
    paddingTop: 2,
    justifyContent: 'center',
  },
  priceContainer: {
    flexDirection: 'row'
  },

  title: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'Roboto',
  },
  titleLight: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'Roboto',
    fontWeight: theme.fontWeightLight,
  },
  total: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'Roboto',
  },
  name: {
    fontSize: theme.fontSizeMedium,
    fontFamily: 'Roboto',
  },
  poin: {
    fontSize: theme.fontSizeNormal,
    color: theme.textGrey,
    fontFamily: 'Roboto',
  },
  iconColor: {
    color: theme.textGrey
  },
  infoTextContainer: {
    paddingTop: 10
  },
  info: [textLightGreyStyle, {
    fontSize: theme.fontSizeSmall
  }],
  quantity: {
    fontSize: theme.fontSizeNormal,
    color: theme.brand,
    fontFamily: 'Roboto',
  },
  product: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'Roboto',
  },
  amount: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'Roboto',
    fontWeight: theme.fontWeightMedium,
  },

  poinImage: {
    height: 11,
    width: 27
  },
  poinImageLarge: {
    height: 14,
    width: 35
  },
  pb20: {
    paddingBottom: 20
  },
  buttonTxt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.black,
    height: 30
  },
  evTxt: {
    color: theme.lightGrey,
    paddingBottom: 10
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  greyLine2: {
    backgroundColor: theme.greyLine,
    height: 10,
  },
  bgWhite: [{
    padding: 20,
    backgroundColor: theme.white,
  }],
  amountHead2: [fontSizeSmallStyle, {
    marginTop: 3,
    marginBottom: 15,
    color: theme.textLightGrey,
  }],
  amountTxt2: {
    flex: 0.4,
    marginVertical: 15,
  },
  amountTxt3: {
    marginVertical: 15
  },
  amountTxt4View: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  iconContainer2: {
    alignItems: 'flex-end',
    flex: 0.05
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.white,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button2: {
    width: 135,
  },
  amount2: [fontSizeLargeStyle, bold]
};
