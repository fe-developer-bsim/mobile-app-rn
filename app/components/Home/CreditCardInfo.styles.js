import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: {
    paddingHorizontal: 10
  },
  redContainer: {
    paddingRight: 20,
    paddingLeft: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 25,
    color: theme.black
  },
  option: {
    borderTopColor: theme.borderGrey,
    borderTopWidth: 1,
    borderBottomWidth: 0,
  },
  whiteText: {
    fontFamily: 'roboto',
    color: theme.brand,
    fontSize: theme.fontSizeSmall
  },
  largeWhiteText: {
    fontFamily: 'roboto',
    color: theme.brand,
    fontSize: theme.fontSizeMedium
  },
  whiteTextIns: {
    fontFamily: 'roboto',
    color: theme.white,
    fontSize: theme.fontSizeSmall
  },
  largeWhiteTextIns: {
    fontFamily: 'roboto',
    color: theme.white,
    fontSize: theme.fontSizeMedium
  },
  lightWhiteText: {
    fontFamily: 'roboto',
    color: theme.white,
    fontSize: theme.fontSizeSmall,
    paddingTop: 10
  },
  boldWhiteText: {
    fontFamily: 'roboto',
    color: theme.brand,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
  },
  subTitle: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight,
    marginRight: 20
  },
  subTitle2: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight,
    marginRight: 20,
    color: theme.brand
  },
  value: {
    color: theme.black,
    textAlign: 'right',
    flex: 1,
    fontWeight: theme.bold,
    fontFamily: 'roboto',
  },
  valueOrange: {
    color: theme.creditOrange,
    textAlign: 'right',
    flex: 1,
    fontWeight: theme.bold,
    fontFamily: 'roboto',
  },
  valueBrand: {
    textAlign: 'right',
    flex: 1,
    fontWeight: theme.bold,
    fontFamily: 'roboto',
  },
  valueBrand1: {
    textAlign: 'right',
    flex: 1,
    fontWeight: theme.bold,
    fontFamily: 'roboto',
    paddingTop: 10
  },
  valueBrand2: {
    textAlign: 'right',
    flex: 1,
    fontWeight: theme.bold,
    fontFamily: 'roboto',
    color: theme.white
  },
  borderBottomRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    marginBottom: 10,
    paddingBottom: 10
  },
  borderBottomRow2: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    marginTop: 15,
    marginBottom: 10,
    paddingBottom: 10
  },
  borderBottomRow3: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    marginTop: 5,
    marginBottom: 10,
    paddingBottom: 10
  },
  borderBottomRowNoLine: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    position: 'absolute',
    // justifyContent: 'center',
    paddingLeft: 20,
    paddingTop: 10
  },
  arrowIcon: {
    color: theme.brand
  },
  arrowIconwhite: {
    color: theme.white
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
  },
  rowNoBorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    marginTop: 10,
  },
  viewMore: {
    color: theme.brand,
    paddingRight: 10,
    fontFamily: 'roboto'
  },
  redRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  manageCard: {
    paddingVertical: 10,
    backgroundColor: theme.paleGrey,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row'
  },
  showCVV: {
    paddingVertical: 5,
    backgroundColor: theme.paleGrey,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row'
  },
  cvvStyle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  imagestyle1: {
    height: 15,
    width: 15,
  },
  imagestyle2: {
    height: 15,
    width: 15,
  },
  text1manage: {
    paddingLeft: 10
  },
  redCvvStyle: {
    paddingLeft: 10
  },
  imagestyleimg: {
    height: 80,
    width: width,
  },
  bgcontainer: {
    marginLeft: -20
  },
  textWrap: {
    position: 'absolute',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingTop: 10
  },
  imagestyleicon: {
    height: 25,
    width: 25,
  },
  imagestyleicon1: {
    height: 15,
    width: 15
  },
  imagestyleicon2: {
    height: 28,
    width: 35,
  },
  borderPay: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flex: 1,
  },
  borderPay2: {
    borderRadius: 10,
    borderColor: theme.brand,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
};
