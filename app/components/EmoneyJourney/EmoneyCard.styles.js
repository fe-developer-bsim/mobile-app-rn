import {theme} from '../../styles/core.styles';

export default {
  container: {
    paddingHorizontal: 10,
    borderRadius: 15,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    marginTop: 10,
    marginBottom: 0
  },
  purpleContainer: {
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5}, // for IOS
    shadowOpacity: 0.2, // for IOS
    shadowRadius: 3, // for IOS
    elevation: 3, // for Android
  },
  activateInfoContainer: {
    flex: 1,
    paddingLeft: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padddingTop: 28
  },
  rowNoAcc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padddingTop: 28
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  rowEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingTop: 20
  },
  topupContainer: {
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1},  // for IOS
    shadowOpacity: 0.2, // for IOS
    shadowRadius: 3,  // for IOS
    elevation: 2, // for Android
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: theme.white,
    borderRadius: 20
  },
  activateButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: theme.white,
    borderRadius: 20,
    marginLeft: 30
  },
  upgradeButton: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: theme.emoneyGold,
    borderRadius: 20,
    marginLeft: 10
  },
  emoneyBalance: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    fontWeight: theme.fontWeightBold,
    marginTop: 2
  },
  redText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeNormal,
    color: theme.brand
  },
  blackSmallText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeSmall,
    color: theme.black,
  },
  whiteSmallText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeSmall,
    color: theme.white,
  },
  whiteText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeNormal,
    color: theme.white,
  },
  upgradeText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeXS,
    color: theme.white,
    textAlign: 'center',
    fontWeight: theme.fontWeightBold,
  },
  whiteMediumText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeLarge,
    color: theme.white,
    fontWeight: theme.fontWeightMedium,
  },
  smallLightText: {
    fontFamily: theme.robotoLight,
    fontSize: theme.fontSizeXS,
    color: theme.black,
    fontWeight: theme.fontWeightLight,
    marginTop: 1
  },
  mediumText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    paddingVertical: 1
  },
  accountNumberText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontWeight: theme.fontWeightMedium
  },
  activateImage: {
    width: 70,
    height: 70
  },
  redIcon: {
    alignItems: 'center',
    color: theme.brand,
    paddingBottom: 5
  },
  blackIcon: {
    color: theme.black
  },
  whiteIcon: {
    color: theme.white,
    paddingBottom: 5
  },
  simasIcon: {
    color: theme.brand,
    paddingBottom: 5
  },
  purpleGradient: ['#7423AE', '#A636A6', '#D448A0'],
  columnCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  columnCenterAutoDebit: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70
  },
  buttonDefaultON: {
    marginTop: 7,
    paddingHorizontal: 10,
    backgroundColor: theme.brand,
    borderRadius: 20
  },
  buttonDefaultOFF: {
    marginTop: 7,
    paddingHorizontal: 10,
    backgroundColor: theme.greyLine,
    borderRadius: 20
  },
  eachDiv: {
    flex: 1.5,
    marginLeft: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: theme.white,
    borderRadius: 10,
    elevation: 2, // for Android
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5}, // for IOS
    shadowOpacity: 0.2, // for IOS
    height: 90
  },
  blackTextTopUp: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeXS,
    color: theme.black,
    textAlign: 'center',
    width: 50
  },
  blackText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeXS,
    color: theme.black,
    textAlign: 'center',
    width: 70
  },
  redDiv: {
    flex: 1.5,
    backgroundColor: theme.brand,
    paddingHorizontal: 3,
    paddingVertical: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    height: 90,
    elevation: 2, // for Android
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5}, // for IOS
    shadowOpacity: 0.2 // for IOS
  },
  whiteDiv: {
    flex: 1.5,
    backgroundColor: theme.white,
    paddingHorizontal: 3,
    paddingVertical: 10,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    height: 90,
    elevation: 2, // for Android
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5}, // for IOS
    shadowOpacity: 0.2 // for IOS
  },
  balanceDiv: {
    flex: 4.5,
    height: 90,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: theme.white,
    elevation: 3, // for Android
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5}, // for IOS
    shadowOpacity: 0.2 // for IOS
  },
  greyIcon: {
    color: theme.grey,
    paddingBottom: 5
  },
  defaultText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeXS,
    color: theme.black,
    textAlign: 'center',
  },
  defaultTextWhite: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeXS,
    color: theme.white,
    textAlign: 'center',
  },
  defaultTextGrey: {
    color: theme.grey,
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeXS,
    textAlign: 'center',
  },
  defaultTextLightGrey: {
    color: theme.lightGrey,
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeXS,
    textAlign: 'center',
  },
  column: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  balanceContainer: {
    width: 300,
    paddingTop: 3
  },
  setDefaultIcon: {
    color: theme.red,
    paddingBottom: 7,
    paddingTop: 5
  },
  gradientRed: [
    '#FC2F1F', '#F84C3F', '#F5685E'
  ],
  reloadBalance: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  reloadIcon: {
    paddingVertical: 3,
    paddingHorizontal: 3
  },
  rowIconEmoney: {
    flexDirection: 'row'
  },
  premiumIcon: {
    color: theme.brand,
    marginTop: -2
  },
  defaultTextAutoDebit: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    textAlign: 'center',
  },
};
