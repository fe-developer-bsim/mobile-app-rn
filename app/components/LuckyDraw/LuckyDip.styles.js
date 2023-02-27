import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: theme.greyLine,
    alignItems: 'center',
  },
  containerLuckydipScroll: {
    flex: 1,
    backgroundColor: theme.greyLine,
  },
  containerPropsLuckydipScroll: {
    alignItems: 'center',
  },
  containerImageBackground: {
    width: width,
    alignItems: 'center',
    height: 700
  },
  btn: {
    backgroundColor: '#480032',
    width: 100,
    height: 40,
    padding: 3,
    justifyContent: 'center',
    borderRadius: 6,
    marginTop: 29
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  item1: {
    backgroundColor: 'red',
    padding: 20,
    width: 100,
    margin: 10
  },
  textBtn: {
    color: '#f4f4f4',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  floatingButton: {
    color: '#f4f4f4',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  upperText: {
    alignItems: 'center',
    paddingTop: 80
  },
  textTitle: {
    fontSize: theme.fontSize20,
    textAlign: 'center'
  },
  textLuckyDip: {
    fontSize: theme.fontSize30,
    textAlign: 'center'
  },
  startButton: {
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.4)',
    alignItems: 'center',
    width: 130,
    height: 130,
    borderRadius: 100,
    marginTop: 70
  },
  textStartButton: {
    textAlign: 'center',
    color: theme.softGrey,
    fontSize: theme.fontSizeMedium,
    paddingTop: 5,
    fontWeight: theme.fontWeightBold
  },
  OuterStart: {
    backgroundColor: 'rgba(236,236,236, 0.7)',
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerOutside: {
    flex: 1,
    paddingBottom: 25,
    backgroundColor: theme.greyLine
  },
  containerInside: {
    backgroundColor: theme.white,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 15,
    margin: 25,
  },
  alfaIcon: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  borderGreyDesign: {
    height: 40,
    width: width
  },
  upperContain: {
    alignItems: 'center',
    paddingBottom: 5
  },
  upperTextDetail: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  bottomUpperDetail: {
    paddingVertical: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  timeExpired: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    marginHorizontal: 25,
    textAlign: 'center'
  },
  validText: {
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
    textAlign: 'center'
  },
  formatCurrency: {
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeXL,
    fontFamily: theme.roboto
  },
  valueText: {
    fontSize: theme.fontSize20,
    textAlign: 'center',
    fontWeight: theme.fontWeightBold,
  },
  padding: {
    paddingVertical: 20
  },
  containCode: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  redText: {
    color: 'red'
  },
  containCodeText: {  
    paddingTop: 20,
    paddingBottom: 5
  },
  codeText: {
    fontSize: theme.fontSizeExtraXL,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto,
    textAlign: 'center',
  },
  redUnderlineText: {
    color: theme.red,
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  termConditionContainer: {
    paddingTop: 5
  },
  ticketText: {
    fontWeight: theme.fontWeightBold
  },
  centerAlign: 
  {alignItems: 'center'
  },
  luckyDipBoxAnimation: {
    height: 400,
    width: 365,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginLeft: 115
  },
  luckyDipBoxAnimationOri: {
    height: 390,
    width: 375,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginLeft: 125
  },
  boxImage: {
    height: 325,
    width: 325,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 47
  },
  boxImageOri: {
    height: 375,
    width: 375,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  noboxImage: {
    height: 375,
    width: 375,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  termConditionContainerExist: {
    paddingTop: 40
  },
  urlContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  serialContainer: {
    borderRadius: 10,
    backgroundColor: theme.greyLine,
    borderColor: theme.greyLine,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serialText: {
    maxWidth: width * 0.7,
    padding: 10,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
  },
  copyIcon: {
    color: theme.red,
    paddingRight: 10,
    paddingVertical: 5
  },
};