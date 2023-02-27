
import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle, textAlignCenter, fontSizeXLStyle, bold} from '../../styles/common.styles';

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
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: theme.greyLine,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: theme.white,
    paddingTop: 20,
    elevation: 2,
    shadowOffset: {width: 1, height: 1},
    shadowColor: theme.grey,
    shadowOpacity: 0.2,
    shadowRadius: 7,
    paddingBottom: 20,
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
      paddingLeft: 20,
      paddingVertical: 10,
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


};
