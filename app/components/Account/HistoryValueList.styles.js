import {theme} from '../../styles/core.styles';
import {bold, contentContainerStyle} from '../../styles/common.styles';

export default {

  infoContainer: {
    flex: 1.7,
  },
  flex: {
    paddingTop: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pad2: {
    paddingVertical: 1
  },
  subNo: {
    fontFamily: 'roboto',
    color: theme.black
  },
  billerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    flex: 1,
  },
  billerName: {
    fontFamily: 'roboto',
    color: theme.softGrey,
    fontSize: theme.fontSizeSmall,
    flex: 1,
    textAlign: 'right',
    paddingRight: 5
  },
  iconArrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  more: {
    color: theme.grey,
    marginLeft: 3,
    marginBottom: 5
  },
  wrapContainer: [{justifyContent: 'space-between', flexGrow: 1, paddingBottom: -10}],
  headerRow: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  activityContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  spaceContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 20,
  },
  fieldsContainerWrapper: {
    justifyContent: 'space-between',
    paddingVertical: 30
  },
  titleLimitTransaction: {
    color: theme.darkBlue,
    alignSelf: 'flex-start',
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
  // endNumber: {
  //   justifyContent: 'flex-end',
  // },
  walletIcon: {
    flex: 1,
    color: theme.darkRed,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: theme.orangeWallet,
  },
  debitName: [bold, {
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    paddingVertical: 2


  }],
  accNo: [bold, {
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,

    paddingVertical: 2

  }],
  product: {
    color: theme.black,
    fontFamily: 'Roboto',
    marginBottom: 5,
    fontSize: theme.fontSizeSmall,

    paddingVertical: 2
  },
  balance1: {
    color: theme.darkBlue,
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
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
    paddingVertical: 5,
    paddingLeft: 45,
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
    paddingLeft: 5,
    paddingRight: 5
  },
  arrowContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  arrowIcon: {
    color: theme.black,
    paddingLeft: 10,
    paddingRight: 5,
    justifyContent: 'space-between',
  },
  row4: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginFieldsContainerCel: {
    paddingHorizontal: 10,
    marginTop: 20,
    paddingLeft: 20
  },
  titleSetLimit: {
    color: theme.darkBlue,
    alignSelf: 'flex-start',
    paddingBottom: 30,
    fontFamily: 'Roboto',
    fontWeight: theme.fontWeightBold,

    fontSize: theme.fontSizeMedium,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 30,
    paddingBottom: 10
  },
  whiteIcon: {
    color: theme.white
  },
  trash: {
    backgroundColor: theme.pinkBrand,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingHorizontal: 2
  },
  edit: {
    backgroundColor: theme.darkBlue,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingHorizontal: 2,
    paddingRight: 5,
  },
  historyItem: {
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    backgroundColor: theme.white,
    paddingVertical: 15,
  },
  billerName2: {
    fontFamily: 'roboto',
    color: theme.softGrey,
    fontSize: theme.fontSizeXS,
    flex: 1,
    textAlign: 'right',
    paddingRight: 5
  },
  subtext: {
    fontWeight: theme.fontWeightLight,
    fontSize: 12,
    color: theme.black,
    fontFamily: 'roboto',
  },
  container: [{
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -15
  }, contentContainerStyle],

  bottom: {
    paddingBottom: 30,
    padding: 20,
  },
  flexHighValue: {
    flex: 1,
    justifyContent: 'space-between'
  },

  boxedInfo: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10

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

  blackTextSetLimit: {
    fontSize: theme.fontSizeXS,
    color: theme.black,
    fontFamily: 'Roboto',
    textAlign: 'justify',
    paddingHorizontal: 5
  },
  alertSetLimit: {
    color: theme.black,
    paddingLeft: 5,
    paddingTop: 5
  },

};
