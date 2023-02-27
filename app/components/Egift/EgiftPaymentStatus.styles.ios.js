import {theme} from '../../styles/core.styles';
import {contentContainerStyle} from '../../styles/common.styles';

export default {
  scrollContainer: [contentContainerStyle],
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
    backgroundColor: theme.white,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20
  },
  topContainer: {
    backgroundColor: theme.white,
    paddingTop: 44,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 8,
    borderColor: theme.greyLine
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 30,
    justifyContent: 'space-between'
  },
  middleContainer: {
    padding: 20,
    backgroundColor: theme.white
  },
  flex1: {
    flex: 1
  },
  flex2: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.5,
  },
  titleContainer: {
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderColor: theme.greyLine
  },
  detailRow: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  detailRow2: {
    fontSize: theme.fontSizeLarge,
    color: theme.brand,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'roboto',
  },
  detailRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  quantityContainer: {
    width: 50
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 30
  },
  detailMap: {
    paddingVertical: 20
  },
  imageContainer: {
    paddingLeft: 4,
    justifyContent: 'center',
  },
  totalContainer: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: theme.greyLine,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  nameContainer: {
    paddingVertical: 10
  },
  footerContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
    backgroundColor: theme.white
  },
  footerItem: {
    marginBottom: 10
  },
  buttonContainer: {
    paddingTop: 20
  },
  refnumContainer: {
    paddingBottom: 5
  },

  logo: {
    color: theme.white
  },
  date: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto'
  },
  status: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto'
  },
  description: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'roboto'
  },
  transRefNum: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto'
  },
  title: {
    fontSize: theme.fontSizeXL,
    color: theme.black,
    fontFamily: 'roboto'
  },
  detailText: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: 'roboto'
  },
  detailTextRed: {
    fontSize: theme.fontSizeNormal,
    color: theme.brand,
    fontFamily: 'roboto'
  },
  amountText: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'roboto'
  },
  amountTextRed: {
    fontSize: theme.fontSizeNormal,
    color: theme.brand,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'roboto'
  },
  failDescription: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'roboto'
  },
  poinImage: {
    height: 10,
    width: 25
  },
  poinImageLarge: {
    height: 14,
    width: 35
  },
  total: {
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    fontFamily: 'roboto'
  },
  name: {
    fontSize: theme.fontSizeNormal,
    color: theme.textGrey,
    fontFamily: 'roboto'
  },
  nameBold: {
    fontSize: theme.fontSizeNormal,
    color: theme.textGrey,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightMedium
  },
  footerTextGrey: {
    fontSize: theme.fontSizeSmall,
    color: theme.textGrey,
    fontFamily: 'roboto',
  },
  footerTextRed: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: 'roboto',
  },
  logoSuccess: {
    color: theme.green
  },
  logoFail: {
    color: theme.grey
  },
  mainTitleLogo: {
    width: 80,
    height: 30,
  },
  rowFieldAgreement: {
    flexDirection: 'row',
  },
  mainTitleCheckBox: {
    paddingHorizontal: 20,
    backgroundColor: theme.white,
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
  checkboxLabel: [
    theme.fontSizeMediumStyle,
    {
      color: theme.black,
      fontWeight: theme.fontWeightMedium,
      paddingRight: 20
    }
  ],
  tncTxt: [
    theme.fontSizeNormalStyle,
    {
      fontFamily: theme.robotoLight,
      fontWeight: theme.fontWeightRegular,
      color: theme.black
    }
  ],
  checkboxStyle: {
    width: 20,
    height: 20,
  },
  footerContainerButton: {
    marginTop: 30,
    paddingHorizontal: 20
  },
  middleContainerUp: {
    backgroundColor: theme.white,
  },
  luckyContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#7ECECC',
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: '#7ECECC',
  },
  rowCenterLuckyDip: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  width: {
    width: 40,
  },
  iconBoxLuckyDip: {
    alignItems: 'center',
    width: 40,
    height: 40
  },
  lucktTxt: [
    theme.fontSizeSmall,
    {
      fontFamily: theme.robotoLight,
      fontWeight: theme.fontWeightRegular,
      color: theme.white,
      paddingLeft: 3
    }
  ],
  hhh2: {
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightMedium,
    fontFamily: theme.robotoLight,
    color: theme.white,
  },
  hhh3: {
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightRegular,
    fontFamily: theme.robotoLight,
    color: theme.white,
  },
  hhh4: {
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightRegular,
    fontFamily: theme.robotoLight,
    color: theme.white,
    textDecorationLine: 'underline',
  }
};