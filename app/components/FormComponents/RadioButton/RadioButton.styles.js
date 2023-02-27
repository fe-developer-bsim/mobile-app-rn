import {theme} from '../../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  optionStyle: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  optionStyleSourceAcc: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 5,
    marginBottom: 10,
  },
  buttonStyleSelect: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.brand,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.pinkBrand,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyleTrfAccCC: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.pinkBrand,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonDisabled: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.textGrey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailContainer: {
    paddingTop: 10,
    paddingLeft: 20
  },
  buttonActive: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: theme.brand
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelContainerSourceAcc: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  imageOffer2: {
    width: 50,
    height: 50
  },
  textProdType: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontWeight: 'bold',
    color: theme.black
  },
  textStyleType: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontWeight: 'bold',
    color: theme.black
  },
  textStyleNumber: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontWeight: 'bold',
    color: theme.darkBlue
  },
  textStyle: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontWeight: '100'
  },
  textStyleDisabled: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    color: theme.textGrey,
    fontWeight: '100'
  },
  smallGreyText: {
    color: theme.textGrey,
    fontSize: theme.fontSizeSmall,
    paddingRight: 5,
    fontWeight: '100',
    textAlign: 'right'
  },
  smallText: {
    fontSize: theme.fontSizeSmall,
    paddingRight: 5,
    fontWeight: '100',
    textAlign: 'right'
  },
  subtextStyle: {
    fontSize: theme.fontSizeSmall,
    paddingRight: 5
  },
  boldTextStyle: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontWeight: theme.fontWeightBold
  },
  boldTextDisabled: {
    color: theme.textGrey,
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontWeight: theme.fontWeightBold
  },
  greyLineFull: {
    borderTopWidth: 2,
    borderColor: theme.greyLine,
    marginTop: 20,
    paddingBottom: 10
  },
  webViewContainer: {
    paddingLeft: 20,
  },
  webViewStyle: {
    height: 90,
  },
  halfWidth: {
    width: (width - 40) / 2
  },
  renderContainerRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  renderContainer: {
    flexWrap: 'wrap',
  },
  optionContainer: {
    paddingHorizontal: 20
  },
  flex2: {
    flex: 2
  },
  flex1: {
    flex: 1
  },
  subtextGreyStyle: {
    fontSize: theme.fontSizeSmall,
    paddingLeft: 5,
    color: theme.lightGrey,
    fontFamily: 'roboto'
  },
  label: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontFamily: 'roboto'
  },
  labelBold: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    marginBottom: 5,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
  },
  flex1Skn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  skn: {
    backgroundColor: theme.brand,
    width: 60,
    height: 20,
    marginBottom: 5,
    alignItems: 'center',
  },
  sknText: {
    color: theme.white,
    fontFamily: 'roboto',
    textAlign: 'center',
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold
  },
  optionStyleCC: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  labelContainerCC: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    width: 20
  },
  greyLineCC: {
    backgroundColor: theme.greyLine,
    flex: 1,
    height: 1,
    marginVertical: 5
  },
  textStyleCC: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    color: theme.darkBlue,
    fontWeight: 'bold'
  },
  optionStyleSourceAccCC: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    marginBottom: 15,
  },
  darkBlueTextStyle: {
    color: theme.darkBlue,
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontWeight: Platform.OS === 'android' ? '100' : '300'
  },
  whiteBoxOptionStyle: {
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingRight: 10,
    flexDirection: 'row',
    backgroundColor: theme.white,
  },
  newButtonStyle: {
    color: theme.containerGrey
  },
  checkIcon: {
    color: theme.blueAmount,
  },
  greyLine: {
    borderBottomWidth: 1,
    borderColor: theme.containerGrey,
    flex: 1,
    marginHorizontal: 20,
    paddingRight: 10,
  },
  labelContainerSourceAccCC: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  iconContainer: {
    backgroundColor: '#E9F2FF',
    borderRadius: 12,
    marginRight: 10,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainerSaving: {
    backgroundColor: '#FFE8E1',
    borderRadius: 12,
    marginRight: 10,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: '#2f82ed'
  },
  iconSaving: {
    color: '#DA3832'
  },
  buttonStyleTrfAcc: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.pinkBrand,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  textStyleName: {
    fontSize: 16,
    paddingLeft: 5,
    fontWeight: 'bold',
    color: theme.black
  },
  textStyleTypeCC: {
    paddingLeft: 5,
    color: theme.darkBlue,
    fontSize: 13,
  },
  textStyleBal: {
    paddingLeft: 5,
    color: theme.darkBlue,
    fontSize: 13,
    fontWeight: 'bold',
  },
  iconSize: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  horizontalLine: {
    height: 20,
    backgroundColor: theme.black
  }
};