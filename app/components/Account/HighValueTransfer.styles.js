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
  container: [contentContainerStyle, {backgroundColor: theme.superLightpurple,
  }],
  rowWallet: {
    flexDirection: 'row',
  },
  mr10: {
    marginRight: 10
  },
  titleWallet: {
    fontSize: theme.fontSize22,
    fontFamily: 'roboto',
    color: theme.black
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
  accNo: [bold, {
    color: theme.black,
    fontWeight: theme.fontWeightBold
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
    color: theme.black,
    fontWeight: theme.fontWeightBold
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
    paddingTop: 200
  },
  spaceText: {
    justifyContent: 'space-between',
    paddingTop: 50
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    marginTop: 20
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
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
  picture: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 20
  },
  shadowImage: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textWording: {
    color: theme.darkBlue,
    alignSelf: 'center',
    paddingLeft: 15,
    paddingTop: 5,    
    fontFamily: 'Roboto',
    fontWeight: theme.fontWeightBold
  },
  wrapContainer: {
    backgroundColor: theme.white,
    flexGrow: 1,
  },
  
};