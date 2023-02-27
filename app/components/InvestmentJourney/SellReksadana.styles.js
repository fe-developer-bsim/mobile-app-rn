import {theme} from '../../styles/core.styles';
import {contentContainerStyle, bold} from '../../styles/common.styles';

export default {
  containerContent: [{justifyContent: 'space-between', flexGrow: 1, paddingBottom: 20}],
  container: {
  },
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
    paddingTop: 30
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
  amountContainer: {
    paddingHorizontal: 20
  },
  selectAccountContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  unitDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  unitContainer: {
    borderWidth: 1,
    borderColor: theme.textGrey,
    borderRadius: 5,
    marginTop: 10,
    paddingBottom: 10
  },
  unitNAB: {
    marginLeft: 10,
    marginTop: 10,
    color: theme.textGrey,
    fontFamily: 'Roboto',    
  },
  unitPrice: {
    marginRight: 10,
    marginTop: 10,
    color: theme.lightGrey,
    fontFamily: 'Roboto',    
  },
  textInputAmount: {
    flex: 1,

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
    paddingTop: 10
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
    marginVertical: 20
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
    marginTop: 8,
    marginRight: 5
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
    paddingBottom: 20,
    padding: 20,
  },
  
  arrowDownStyle: {
    transform: [{rotate: '90deg'}],
    color: 'black',
    right: 20,
    top: 20,
    position: 'absolute'
  },
  arrowUpStyle: {
    transform: [{rotate: '-90deg'}],
    color: 'black',
    right: 20,
    top: 20,
    position: 'absolute'
  },
  collapsibleContainerShow: {
    position: 'absolute',
    right: 22,
    top: 101,
    paddingHorizontal: 10,
    backgroundColor: theme.white,
    borderRadius: 3,
    borderColor: theme.grey,
    borderWidth: 1,
    alignItems: 'center',
    zIndex: 1,
    shadowOffset: {width: 0, height: 1},
    shadowColor: 'grey',
    shadowOpacity: 0.7,
    shadowRadius: 2
  },
  collapsibleContainerHide: {
    position: 'absolute',
    right: 22,
    top: 101,
    paddingHorizontal: 10,
    backgroundColor: theme.white,
    alignItems: 'center',
    zIndex: 1,
  },
  greyLineCollapse: {
    height: 1,
    backgroundColor: theme.greyLine,
  },
  textCollapse: {
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 2
  }
};
