import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle, textAlignCenter, fontSizeXLStyle, bold} from '../../styles/common.styles';
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
  containerInnerShipping: {
    height: 100,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.05,
    width: width * 0.9,
    elevation: 1
  },
  containerAlfa: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 7,
    justifyContent: 'space-between'
  },
  textAlfaContainer: {
    justifyContent: 'center'
  },
  titleCode: {
    color: theme.black,
    justifyContent: 'center',
    paddingLeft: 10
  },
  arrowIcon: {
    justifyContent: 'center',
    paddingRight: 20
  },
  styleMessage: [
    bold,
    {
      fontSize: 16,
      paddingBottom: 20,
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
    height: 3,
    backgroundColor: theme.greyLine,
    marginVertical: 10
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
    paddingVertical: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyle: {
    paddingRight: 20
  },
  AddressStyle: {
    paddingLeft: 10
  },
  moreStrokeStyle: {
    alignSelf: 'flex-end',
  },
  tabAddressStyle: {
    paddingVertical: 30
  },
  overlayHeader: {
    fontWeight: 'bold',
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    textAlignCenter,
    paddingBottom: 20,
  },
  textBuy: {
    color: 'red',

  }

};
