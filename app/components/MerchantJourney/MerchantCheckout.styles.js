import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle, textAlignCenter, fontSizeXLStyle, bold, contentContainerStyle} from '../../styles/common.styles';
const {width} = Dimensions.get('window');
import {Dimensions} from 'react-native';

export default {
  heading: [fontSizeXLStyle,
    textAlignCenter,
    {
      paddingTop: 10,
      color: theme.text
    }
  ],
  subheading: [textAlignCenter,
    {
      paddingTop: 20,
      paddingBottom: 30,
      paddingHorizontal: 20
    }
  ],
  cancelText: [fontSizeMediumStyle,
    {color: theme.textLightGrey}
  ],
  logoutText: [fontSizeMediumStyle,
    {color: theme.primary}
  ],
  buttonContainer: {
    flexDirection: 'row'
  },
  buttonAlign: {
    flex: 1,
    alignItems: 'center'
  },
  alfaIcon: {
    width: 40,
    height: 40
  },
  containerInnerAlfaCart: {
    backgroundColor: theme.white,
    marginHorizontal: width * 0.05,
    borderRadius: 10,
    width: width * 0.9,
    paddingVertical: 20
  },
  containerAlfa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 3
  },
  textAlfaContainer: {
    justifyContent: 'center'
  },
  titleCode: {
    color: theme.grey,
    fontSize: 13,
  },
  arrowIcon: {
    justifyContent: 'center',
    paddingLeft: 15
  },
  styleMessage: [
    bold,
    {
      fontSize: 16,
      paddingLeft: 20,
      color: theme.black}
  ],
  textBillPayStyleBL: {
    paddingHorizontal: 5,
    paddingLeft: 10,
    textstyle: bold,
    marginBottom: 36,
    marginTop: 10,
    fontSize: theme.fontSizeMedium
  },
  textBillPayStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  styleMessageSeeAllBiller: {
    textstyle: theme.red,
    color: 'red',
    justifyContent: 'flex-end'
  },
  greyLine: {
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
  },
  greyLine2: {
    height: 10,
    backgroundColor: theme.greyLine,
    marginVertical: 10
  },
  paymentStyle: {
    fontSize: 14,
    paddingLeft: 20,
    paddingVertical: 5,
    color: theme.black
  },
  textButton: {
    color: theme.white,
  },
  buttonCenter: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyle: {
    paddingRight: 20
  },
  productContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    padding: 20
  },
  flex1: {
    flex: 1
  },
  row1: {
    flexDirection: 'row',
    flex: 2,

  },
  imageContainer: [contentContainerStyle],
  imageSize: {
    width: 60,
    height: 60
  },
  productNameContainer: {
    position: 'absolute',
    marginLeft: 90,
    marginTop: 40
  },
  mediumText: {
    fontSize: theme.fontSizeSmall,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginBottom: 5
  },
  padding20: {
    paddingBottom: 20
  },
  containerDiv: {
    paddingVertical: 20,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  rowProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2
  },
  paymentStyle2: {
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: theme.black
  },
  containerShippment: {
    borderWidth: 2,
    borderColor: theme.greyLine,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  containerRowShippmenAndFundAndVoucher: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  styleRedMessage: [
    bold,
    {
      fontSize: theme.fontSizeNormal,
      paddingLeft: 20,
      paddingRight: 20,
      color: theme.brand}
  ],
  styleRedMessageError: [
    bold,
    {
      fontSize: theme.fontSizeNormal,
      paddingTop: 20,
      paddingRight: 20,
      color: theme.brand}
  ],
  centerItem: {
    alignItems: 'center',
    justifyContent: 'center'
  }
};
