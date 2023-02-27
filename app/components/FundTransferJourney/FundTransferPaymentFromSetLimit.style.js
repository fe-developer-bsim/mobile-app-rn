import {theme} from '../../styles/core.styles';
import {contentContainerStyle, bold, fontSizeMediumStyle} from '../../styles/common.styles';

export default {
  containerContent: [{justifyContent: 'space-between', flexGrow: 1, paddingBottom: 20}],
  headerRow: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  headerIcon: {
    color: '#4ed07d',
    paddingRight: 10
  },
  title: {
    fontSize: theme.fontSize22,
    fontFamily: 'roboto',
    color: theme.black
  },
  paddingContent: [contentContainerStyle],
  availableBalanceText: {
    fontFamily: 'roboto',
    color: theme.black,
    paddingTop: 5
  },
  transferTypeHeader: {flexDirection: 'row', justifyContent: 'space-between'},
  information: {
    color: theme.brand,
  },
  checkboxContainer: {
    paddingVertical: 20,
  },
  checkboxLabel: {
    color: theme.black
  },
  checkboxStyle: {
    width: 20,
    height: 20
  },
  textInputContainerPadding: {
    backgroundColor: theme.transparent,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputAmount: {
    flex: 1,
    flexDirection: 'row'
  },
  amountField: {
    textAlign: 'center',
    flex: 1,
    fontSize: theme.fontSize20,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
    marginLeft: 30
  },
  editIcon: {
    paddingRight: 10,
    paddingTop: 10
  },
  walletIcon: {
    color: '#c38a05',
    paddingRight: 10
  },
  sendAccountDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sendAccNumber: [bold, {
    fontFamily: 'roboto',
    color: theme.black,
  }],
  sendAccNameType: {
    color: theme.black,
    fontFamily: theme.robotoLight,
  },
  greyLine: {
    height: 1,
    backgroundColor: theme.greyLine,
    marginTop: 10
  },
  errIcon: {
    color: theme.brand,
    marginRight: 5,
  },
  redText: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: 'Roboto',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  roboto: {
    fontFamily: 'Roboto',
  },
  black: {
    color: theme.black,
  },
  buttonBottom: {
    paddingBottom: 30,
    padding: 20,
  },
  containerDiv: {
    paddingVertical: 20,
    padding: 20,
  },
  rowLeft: {
    flex: 0.2,
    paddingHorizontal: 5,
    alignSelf: 'flex-start'
  },
  rowRight: {
    alignSelf: 'flex-end',
    flex: 0.8,
    paddingHorizontal: 5,
    paddingBottom: 10
  },
  inputStyleCenter: [bold, fontSizeMediumStyle, {
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: theme.black
  }],
  textInputAmountValas: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.softGrey
  },
  icon: {
    marginRight: 10,
    color: theme.black
  },
  exchangeRates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    marginTop: 15
  },
  rowValas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  redTextSetLimit: {       
    fontSize: theme.fontSizeXS,
    color: theme.brand,
    fontFamily: 'Roboto',  
  },  
  blackTextSetLimit: {       
    fontSize: theme.fontSizeXS,
    color: theme.black,
    fontFamily: 'Roboto',  
  },
  alertSetLimit: {
    color: theme.black,
    paddingLeft: 5,
    paddingTop: 5
  },
  rowSetLimit: {
    flexDirection: 'column',
    marginTop: 8,
    paddingHorizontal: 10,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  boxedInfo: {    
    paddingLeft: 2,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    marginHorizontal: 20,
    paddingRight: 20,
    paddingHorizontal: 15
  },
};