import {theme} from '../../styles/core.styles';
import {contentContainerStyle, bold} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: [contentContainerStyle, {
    backgroundColor: theme.white,
  }],
  containerContent: [{alignItems: 'stretch', justifyContent: 'center', flexGrow: 1, paddingBottom: 30, backgroundColor: theme.white}],
  title: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    paddingBottom: 10
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginTop: 10,
    justifyContent: 'center',
  },
  formHeader: {
    fontWeight: theme.fontWeightMedium,
    paddingTop: 25,
    paddingBottom: 0,
    fontSize: theme.fontSizeNormal
  },
  formHeaderSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
  paddingContent: {
  },
  payee: {
    borderBottomColor: theme.separatorColor,
    borderBottomWidth: theme.separatorSize,
    paddingVertical: 15
  },
  payeeName: {
    fontWeight: theme.fontWeightMedium
  },
  payeeBank: {
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall,
    paddingVertical: 5
  },
  availableBalanceText: {
    color: theme.black,
    fontFamily: 'Roboto',
    marginTop: 5
  },
  transferTypeHeader: {flexDirection: 'row', justifyContent: 'space-between'},
  information: {
    color: theme.brand,
  },
  account: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  moreMenu: {
    color: theme.black
  },
  fieldContainer: {
    maxHeight: 100,
    width: 0.8 * width,
    borderWidth: 1,
    borderColor: theme.greyLine,
    borderRadius: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.transparent,
  },
  center: {
    marginLeft: -5
  },
  iconAmount: {
    color: theme.green,
    backgroundColor: theme.transparent,
    paddingRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  labelSpacing: {
    marginBottom: 25,
    marginTop: 10
  },
  textAmount: {
    fontSize: theme.fontSize22,
    color: theme.black,
    fontFamily: 'roboto',
  },
  iconWallet: {
    color: theme.wallet,
    paddingRight: 10,
  },
  paddingVer: {
  },
  amount: {
    fontSize: theme.fontSize22,
    width: 0.7 * width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBold: {
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
  },
  textGrey: {
    fontFamily: 'roboto',
    color: theme.grey,
    fontWeight: theme.fontWeightBold
  },
  down: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textOptional: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    color: theme.black
  },

  paddingHor: {
    paddingHorizontal: 30,
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

  blackText: {
    color: theme.black
  },
  left: {
    marginLeft: -5,
  }

};
