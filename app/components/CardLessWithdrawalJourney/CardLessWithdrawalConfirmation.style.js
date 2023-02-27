import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: {flex: 1, backgroundColor: theme.white},

  containerContent: [{justifyContent: 'space-between'}],

  title: {
    fontFamily: 'roboto',
    fontSize: theme.fontSize22,
    color: theme.black
  },

  summaryContainer: {
    flex: 1,
    padding: 20
  },
  middleContainer: {
    flex: 1,
    paddingHorizontal: 20
  },

  headerSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },

  summaryArea: {
    borderBottomWidth: 1,
    borderColor: theme.grey,
    marginTop: 10,
    marginBottom: 20
  },

  rowItem: {
    flexDirection: 'row',
    paddingVertical: 5
  },


  dateContainer: {
    flexDirection: 'row',
    paddingVertical: 20
  },

  rowItemRight: {
    alignSelf: 'flex-start',
    flexDirection: 'row'
  },

  rightItemContainer: {
    flex: 1,
    flexDirection: 'column'
  },

  rightItemHeader: {
    color: theme.black,
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightBold
  },

  rightItemText: {
    fontFamily: theme.robotoLight,
    color: theme.black,
    fontWeight: theme.fontWeightLight
  },

  amountLeft: {
    fontWeight: theme.fontWeightMedium
  },

  amountRight: {
    fontFamily: theme.roboto,
    color: theme.black,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeLarge
  },

  halfWidth: {
    flex: 1
  },

  bottomSpacing: {
    paddingBottom: 20,
    paddingHorizontal: 20
  },

  information: {
    color: theme.brand,
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: 'roboto',
    alignItems: 'center',
    marginLeft: 10,
    width: width - 100
  },
  containtextExplanation: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.grey,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: theme.grey,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  fieldWidth: {
    justifyContent: 'space-between',
    borderBottomColor: theme.grey,
    paddingBottom: 5
  },
  center: {
    paddingTop: 20,
    flex: 1,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    flex: 1
  },
  iconAmount: {
    color: theme.green,
    backgroundColor: theme.transparent,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  left: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 12
  },
  textAmount: {
    fontSize: theme.fontSizeXL
  },
  paddingVer: {
    paddingVertical: 20
  },
  dateText: {
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSize,
    color: theme.black,
    fontFamily: 'roboto',
  },
  iconWallet: {
    color: theme.wallet,
    paddingRight: 10,
  },
  iconSend: {
    color: theme.lightBlue,
    paddingRight: 10
  },
  iconMenu: {
    color: theme.grey,
    paddingHorizontal: 5
  },
  paddingHor: {
    paddingHorizontal: 10
  },
  iconPlusMinus: {
    color: theme.black,
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  iconCircle: {
    color: theme.black
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerBottom: {
    paddingVertical: 10,
  },

  lineSeparator: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  header: {
    padding: 20
  },
  box: {
    borderWidth: 1,
    borderColor: theme.grey,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  blackText: {
    color: theme.black,
    fontFamily: 'roboto',
  }
};
