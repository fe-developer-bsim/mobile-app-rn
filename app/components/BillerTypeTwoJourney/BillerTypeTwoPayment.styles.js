import {flexRow, flex_1, contentContainerStyle, cardVerticalSpacingStyle, cardRightText, textLightGreyStyle, fontSizeMediumStyle, fontSizeSmallStyle, fontSizeNormalStyle, buttonLargeTextStyle, bold, fontSizeLargeStyle, textAlignCenter} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Platform} from 'react-native';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 40;

export default {
  container: [contentContainerStyle],
  containerContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: 'roboto',
    fontSize: theme.fontSize22,
    color: theme.black
  },
  subTitle: [
    fontSizeNormalStyle,
    bold
  ],

  bgSearch: {
    marginTop: 20
  },

  availableBalanceText: [
    fontSizeNormalStyle, textLightGreyStyle
  ],

  verticalSpacing: [contentContainerStyle],
  availableTokenText: [
    fontSizeNormalStyle,
    bold,
    {paddingBottom: 10}
  ],

  paymentAmountText: [
    fontSizeNormalStyle,
    cardVerticalSpacingStyle
  ],

  totalAmountText: fontSizeNormalStyle,

  rowContainer: flexRow,

  halfWidth: flex_1,

  billAmountText: [
    bold,
    cardRightText,
    fontSizeMediumStyle
  ],

  billDetailText: [
    bold,
    fontSizeSmallStyle
  ],

  billDetailContainer: [
    flexRow,
    cardVerticalSpacingStyle
  ],

  billDetailTitle: textLightGreyStyle,

  billDetailValue: [
    bold,
    cardRightText
  ],

  nextButton: [buttonLargeTextStyle, {
    fontFamily: 'Roboto',
  }],
  denomText: {
    paddingVertical: 5
  },

  amountContainer: {
    alignItems: 'center'
  },

  fieldContainer: {
    width: trueWidth,
    borderRadius: 50,
  },

  currencySymbol: [
    fontSizeLargeStyle,
    textAlignCenter,
    {
      backgroundColor: theme.inputBackground,
      marginTop: 10,
      padding: 10,
      height: Platform.OS === 'ios' ? 50 : 59,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  ],
  formHeader: {
    fontWeight: theme.fontWeightMedium,
    marginTop: 25,
    marginBottom: 0,
    fontSize: theme.fontSizeNormal,
  },
  formHeaderSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
  rowDetail: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amount: {
    color: theme.amount,
    marginTop: 5  
  },
  mr10: {
    marginRight: 10
  },
  labelSpacing: {
    marginBottom: 25,
  },
  textInputContainerPadding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.grey,
    borderRadius: 5,
    height: 50,
  },
  amountField: [bold, {
    textAlign: 'center',
    flex: 1,
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: 'roboto',
    color: theme.black
  }],
  editIcon: {
    paddingRight: 15,
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginTop: 10
  },
  wallet: {
    color: theme.wallet
  },
  mt10: {
    marginTop: 20
  },
  roboto: {
    fontFamily: 'roboto',
  },
  accNo: [bold, {
    color: theme.black
  }],
  name: {
    color: theme.black,
    fontFamily: theme.robotoLight,
  },
  product: {
    color: theme.black,
    fontFamily: theme.robotoLight,
    marginBottom: 5
  },
  balance: {
    color: theme.black
  },
  greyLine2: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginTop: 10
  },
  searchTxtInput: {
    flex: 0.5,
  },
  text: [bold, {
    fontSize: 18,
    marginLeft: 20,
    marginBottom: 5
  }],
  searchIcon: {
    paddingTop: 13,
    paddingRight: 10,
    height: 50,
  },
  subText: {
    textAlign: 'center',
    marginVertical: 10,
    color: theme.black
  },
  informationcolor: {
    color: theme.red,
    size: 30,
    transform: [{rotate: '180deg'}]
  },
  redText: [fontSizeSmallStyle, {
    color: theme.brand,
    fontFamily: 'Roboto'
  }],
  errIcon: {
    color: theme.brand,
    marginRight: 5,
  },
  mt5: {
    marginTop: 5
  },
  rpText: [bold, {
    fontSize: theme.fontSize20,
    marginLeft: 10,
    marginRight: -15,
    color: theme.black
  }],
  black: {
    color: theme.black
  },
  nextButtonbillpay: [buttonLargeTextStyle, {
    fontFamily: 'Roboto',
    marginTop: 200
  }],
  p20: {
    paddingTop: 20
  },
  checkboxLabel: [
    fontSizeNormalStyle,
    {
      color: theme.black,
      paddingRight: 20
    }
  ],
  checkboxStyle: {
    width: 20,
    height: 20
  }
};
