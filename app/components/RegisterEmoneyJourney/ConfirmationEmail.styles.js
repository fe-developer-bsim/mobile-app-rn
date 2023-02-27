import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import {fontSizeNormalStyle} from '../../styles/common.styles';

export default {
  columnContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
  barStep: {
    flexDirection: 'row',
    height: 7
  },
  partOne: {
    backgroundColor: theme.red,
    height: 7,
    width: width / 3
  },
  partTwo: {
    backgroundColor: theme.grey,
    height: 4,
    width: width
  },
  mainTitle: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  subTitle: {
    paddingTop: 10,
    paddingHorizontal: 20
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.white
  },
  subTitleText: {
    fontSize: theme.fontSizeLarge,
    color: theme.white
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 40,
    justifyContent: 'space-between'
  },
  titleField: {
    paddingTop: 25,
    marginBottom: -20,
    color: theme.grey,
    fontSize: theme.fontSizeSmall
  },
  fieldContainer: {
    borderColor: theme.white,
    paddingBottom: 20,
    fontSize: theme.fontSizeNormal,
  },
  errorContainer: {
    paddingHorizontal: 30,
    paddingTop: 10,
    width: 400,
  },
  bottomWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  buttonLogin: {
    color: theme.red,
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  borderGrey: {
    height: 1,
    backgroundColor: theme.grey
  },
  percentLoanRow: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedAmount: {
    paddingHorizontal: 5
  },
  borderAmount: {
    borderRadius: 30,
    borderColor: theme.lightGrey,
    borderWidth: 2,
    width: (width - 100) / 2,
    padding: 15
  },
  textAmount: {
    color: theme.lightGrey,
    alignSelf: 'center',
  },
  containerAmount: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 20
  },
  sparateBorder: {
    paddingVertical: 10
  },
  bottomleftWrapper: {
    marginTop: 5,
    alignItems: 'center',
  },
  block: {
    height: 190,
    width: 2,
    backgroundColor: theme.lightGrey,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: theme.grey
  },
  rowField: {
    flexDirection: 'row',
    paddingVertical: 20
  },
  checkboxStyle: {
    width: 20,
    height: 20,
    borderColor: theme.red
  },
  checkboxLabel: [
    fontSizeNormalStyle,
    {
      color: theme.black,
      paddingHorizontal: 20
    }
  ],
  bottomrightWrapper: {
    paddingBottom: 20,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  rowFieldAgreement: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  containerFieldContent: {
    paddingBottom: 30
  },
  textLineBlack: {
    paddingTop: 15,
    color: theme.black,
    fontSize: theme.fontSizeLarge,
  },
  textLineBlackBold: {
    paddingTop: 15,
    color: theme.black,
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold
  },
  textLineBoldBlack: {
    color: theme.black,
    fontSize: theme.fontSizeNormal,
  },
  textLineColorRed: {
    color: theme.brand,
    fontSize: theme.fontSizeNormal,
  },
  textLineColorGreen: {
    color: theme.green,
    fontSize: theme.fontSizeNormal,
  },
  emailText: {
    paddingTop: 20,
    marginBottom: 10
  },
  percentLoanRowConfirmation: {
    paddingTop: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountConfirmation: {
    fontSize: 20,
    color: theme.black
  },
  amountConfirmationColor: {
    fontSize: 20,
    color: theme.red
  },
  confirmationDetail: {
    fontSize: theme.fontSizeNormal,
    color: theme.black
  },
  circleRed: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: theme.red,
  },
  envelopeIcon: {
    color: theme.black,
  },
  checkImage: {
    imageColor: theme.black
  },
  textLineBlackFinalized: {
    paddingTop: 5,
    color: theme.black,
    fontSize: theme.fontSizeLarge,
  },
  textLineBlackFinalizedBold: {
    color: theme.black,
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold
  },
  bottomWrapperFinalize: {
    paddingTop: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  buttonNextFinalize: {
    paddingTop: 10,
    paddingHorizontal: 30
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 30,
    backgroundColor: theme.white,
  },
  blockFinalize: {
    height: 175,
    width: 2,
    backgroundColor: theme.grey,
  },
  bottomPadding: {
    paddingTop: 90
  },
  forfeitText: {
    paddingTop: 40
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
  },
  containtextExplanation: {
    alignItems: 'center',
    paddingVertical: 20
  },
  upperWrapper: {
    backgroundColor: theme.red,
    paddingBottom: 80,
    paddingTop: 30
  },
  mainCheckLogo: {
    height: 50,
    width: 60,
  },
  mainTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  envelopeIconWhite: {
    color: theme.white,
  },
  logInText: {
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 20
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  simobiPng: {
    width: 100,
    height: 40,
  },
  imageContain: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonMainLoginUser: {
    color: theme.red,
    fontSize: theme.fontSizeMedium,
    fontFamily: 'Roboto',
  },
  buttonLoginSpace: {
    backgroundColor: 'transparent',
    borderColor: theme.red,
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 20
  },
  buttonNext: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  spaceContainer: {
    justifyContent: 'space-between',
  },
  bodyContainerWithNoTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  },
};
