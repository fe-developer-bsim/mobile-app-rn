import {theme, bold} from '../../styles/core.styles';
import {contentContainerStyle} from '../../styles/common.styles';

export default {
  fieldsContainerWrapper: {
    justifyContent: 'space-between',
    paddingVertical: 30
  },
  container: [contentContainerStyle, {backgroundColor: theme.white,
  }],
  mr10: {
    marginRight: 10
  },
  titleLimitTransaction: {
    color: theme.darkBlue,
    alignSelf: 'flex-start',
    fontFamily: 'Roboto',
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeMedium,
  },
  titleSetLimit: {
    color: theme.darkBlue,
    alignSelf: 'flex-start',
    paddingBottom: 30,
    fontFamily: 'Roboto',
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeMedium,
  },
  labelSpacing: {
    paddingVertical: 10
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row3: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  row4: {

    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  accNo: [bold, {
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    alignItems: 'center',

  }],
  debitName: [bold, {
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    alignItems: 'center',
    justifyContent: 'flex-start',


  }],
  name: {
    color: theme.black,
    fontFamily: 'Roboto',
    fontWight: theme.fontWeightBold,
    fontSize: theme.fontSizeNormal,
    alignSelf: 'center',

  },
  product: {
    color: theme.black,
    fontFamily: 'Roboto',
    marginBottom: 5,
    fontSize: theme.fontSizeSmall,
    alignItems: 'center',
  },
  balance: {
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,

    fontSize: theme.fontSizeSmall
  },
  balance1: {
    color: theme.darkBlue,
    fontFamily: 'Roboto',
    marginBottom: 5,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
  },
  spaceContainer: {
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 20,
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  loginFieldsContainerCel: {
    paddingHorizontal: 10,
    marginTop: 20,
    paddingLeft: 20
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 5,
  },
  choose: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: 'Roboto',
    color: theme.red,
    fontWeight: theme.fontWeightBold,
    paddingLeft: 45,
  },
  walletIcon: {
    flex: 1,
    color: theme.darkRed,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: theme.orangeWallet,
    paddingHorizontal: 1
  },
  arrowContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  transferto: {
    color: theme.grey,
    fontFamily: 'Roboto',
    marginBottom: 5,
    fontSize: theme.fontSizeSmall,
  },
  select: {
    color: theme.black,
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
    paddingLeft: 5
  },
  infoContainer: {
    flex: 1.7,
  },
  fieldContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: 50,
    marginBottom: 10
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingLeft: 20
  },
  couponOutline: {
    color: theme.black
  },
  arrowIcon: {
    paddingLeft: 10,
    paddingRight: 5,
    color: theme.black,
    justifyContent: 'space-between'
  },
  paddingBottom: {
    paddingBottom: 10
  },
  boxedInfoTransferTo: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  boxedInfoTransferSelected: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  rowProduct: {
    flexDirection: 'row',
  },
  start: {
    justifyContent: 'flex-start',
  },
  end: {
    justifyContent: 'flex-end',
    paddingLeft: 20
  },
};
