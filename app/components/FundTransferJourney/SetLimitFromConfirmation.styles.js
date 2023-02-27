import {theme, bold} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import * as styles from '../../styles/common.styles';
import {contentContainerStyle} from '../../styles/common.styles';
import {text as textStyles} from '../../styles/core.styles';

export default {
  fieldsContainerWrapper: {
    justifyContent: 'space-between',
    paddingVertical: 30
  },
  SilTitleHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
  SilTitleHeader: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
  },
  wallet: {
    color: theme.wallet
  },
  container: [contentContainerStyle, {backgroundColor: theme.white,
  }],
  rowWallet: {
    flexDirection: 'row',
  },
  mr10: {
    marginRight: 10
  },
  titleWallet: {
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
  roboto: {
    fontFamily: 'roboto',
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
  rowPadding: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  
  rowCard: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 15
  },
  accNo: [bold, {
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    
  }],
  debitName: [bold, {
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    
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
    paddingLeft: 31,
    fontWeight: theme.fontWeightBold,
    
  },
  styleRedMessageError: [
    bold,
    {
      fontSize: theme.fontSizeNormal,
      paddingTop: 20,
      paddingRight: 20,
      color: theme.brand}
  ],
  bodyContainerWithTerms:
  [{
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  }, styles.contentContainerStyle],
  bodyContainerWithNoTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  },
  spaceContainer: {
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 40,
    paddingBottom: 10
  },
  info: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: theme.robotoLight,
    width: width - 100,
    marginLeft: 10
  },
  mainTitleText: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 25
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 20,
  },
  fieldContainer: {
    borderColor: theme.white,
    paddingTop: 20,
    fontSize: theme.fontSizeNormal,
    paddingHorizontal: 20,
    marginBottom: -10
  },
  fieldContainers: {
    borderColor: theme.white,
    paddingTop: 20,
    fontSize: theme.fontSizeNormal,
    marginBottom: -10
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  redBar: {
    backgroundColor: theme.blueAmount,
    flexDirection: 'row',
  },
  greyBar: {
    backgroundColor: theme.darkGrey,
    flexDirection: 'row',
  },
  progressBar: {
    flexDirection: 'row',
    height: 7
  },
  redText: {
    color: theme.brand,
  },
  row: {
    flexDirection: 'row',
  },
  errIcon: {
    color: theme.brand,
    paddingRight: 5,
    paddingTop: 3,
  },
  sendAccountDetailContainer1: {
    backgroundColor: theme.white,
    borderRadius: 10,
    paddingLeft: 10,
    paddingVertical: 20
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

  

  // login style
  bodyContainerEasyPin: [{
    flexGrow: 1,
    backgroundColor: theme.radicalRed,
    justifyContent: 'space-between',
    paddingBottom: -10
  }, contentContainerStyle],

  rowEasyPINFormat: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  easypinHeaderTitle: {
    ...textStyles.h1,
    color: theme.white,
    paddingBottom: 10
  },
  easypinIcon: {
    color: theme.white,
    alignSelf: 'center',
    paddingLeft: 15,
    paddingTop: 5,
  },
  rowLoginEasyPIN: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 20,
    paddingRight: 60
  },
  welcomeSubTextNewVerifyEP: {
    padding: 30,
    color: theme.white
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    marginTop: theme.padding,
    paddingHorizontal: 30
  },
  forgotEasyPinContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30
  },
  resendOtpButton: {
    color: theme.white,
    textDecorationLine: 'underline',
  },
  quickLoginContainer: {
    flexDirection: 'row',
    padding: 30
  },
  registerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quickLoginIconContainer: {
    paddingRight: 10
  },
  quickLoginIcon: {
    color: theme.white
  },
  quickLoginBorder: {
    borderLeftWidth: 1,
    paddingRight: 20,
    marginLeft: 20,
    borderColor: theme.white
  },
  buttonOtpSubmit: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  buttonOtpSubmitPage: {
    color: theme.black
  },
  choose: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: 'Roboto',
    color: theme.red,
    fontWeight: theme.fontWeightBold,
    paddingLeft: 31,
  },
  walletIcon: {
    color: theme.darkRed,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: theme.orangeWallet
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
  accTarget: {
    color: theme.black,
    fontFamily: 'Roboto',
    marginBottom: 5,
    fontSize: theme.fontSizeSmall,
    paddingHorizontal: 10,
    

  },
  select: 
  {
    color: theme.black,
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeSmall,
    
    fontWeight: theme.fontWeightBold,
    paddingLeft: 5

  },
  infoContainer: {
    flex: 1.7,
  },
  boxedInfoTransferTo: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    paddingHorizontal: 15,
    paddingVertical: 10,
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