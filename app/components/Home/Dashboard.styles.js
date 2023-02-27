import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const trueWidth = width - 60;
const trueHeight = (trueWidth * 15) / 9.5;


export default {
  container: [{
    backgroundColor: theme.white,
    flex: 1
  }],
  containerGrey: [{
    backgroundColor: theme.greyLine,
    flex: 1
  }],
  tabText: {
    textAlign: 'center',
  },
  scrollStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 0
  },
  modalContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalImageContainer: {
    marginBottom: 15

  },
  modalImageContainer1: {
    marginBottom: 5
  },
  imageModal: {
    width: trueWidth - 40,
    height: trueHeight - 60
  },
  imageModal1: {
    width: trueWidth - 30,
    height: trueHeight - 50
  },
  modalTextContainer: {
    width: trueWidth - 40,
    height: 130,
    backgroundColor: theme.inputBackground,
    borderRadius: 6,
  },
  modalText: {
    width: trueWidth - 30,
  },
  modalTextRow: {
    flexDirection: 'row',
    top: 25
  },
  modalTextTitleContainer: {
    top: 18,
    marginLeft: 10,
    marginBottom: 5,
    marginRight: 10
  },
  modalTextSubTitleContainer: {
    top: 18,
    marginLeft: 10,
    marginRight: 30,
    marginBottom: 5
  },
  modalTextLeftContainer: {
    width: 23,
    height: 23,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: theme.green,
    borderRadius: 100,
    marginLeft: 10,
  },
  modalTextRightContainer: {
    marginTop: 11,
    marginLeft: 9,
    marginRight: 60,
    justifyContent: 'space-between',
  },
  modalTextTitle: {
    fontSize: theme.fontSizeSmall,
    backgroundColor: theme.transparent,
    fontFamily: 'Roboto',
    fontWeight: theme.fontWeightBold
  },
  modalTextSubTitle: {
    fontSize: theme.fontSizeXS,
    backgroundColor: theme.transparent,
    fontFamily: 'Roboto',
  },
  modalTextLeft: {
    textAlign: 'center',
    paddingVertical: 2,
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    backgroundColor: theme.transparent,
    fontFamily: 'Roboto',
  },
  modalTextRight: {
    fontSize: theme.fontSizeXS,
    fontFamily: 'Roboto',
    textAlign: 'justify',
    paddingVertical: 2
  },
  modalButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 17,
    alignItems: 'flex-end',
  },
  modalGuideButton: {
    color: theme.brand,
    alignItems: 'flex-end',
    fontFamily: 'Roboto',
  },
  containerOpacity: {
    width: trueWidth + 60,
    marginLeft: -20,
    backgroundColor: theme.transparent,
  },
  gradientGrey: {
    backgroundColor: theme.pinkBrand,
  },
  header: {
    paddingBottom: 15,
    backgroundColor: theme.white,
  },
  topContainer: {
    backgroundColor: theme.radicalRed,
    alignItems: 'center',
    height: 230
  },
  topCardContainer: {
    marginTop: 25,
    backgroundColor: theme.white,
    alignItems: 'center',
    borderRadius: 15,
    height: 60,
    width: 60
  },
  textContaionerTop: {
    marginTop: 25,
    alignItems: 'center',
  },
  totalBal: {
    color: theme.white,
    fontWeight: 'bold'
  },
  balance: {
    marginTop: 5,
    color: theme.white,
    fontSize: 20,
    fontWeight: 'bold'
  },
  totalCard: {
    marginTop: 8,
    color: theme.white,
    fontSize: 10,
    fontWeight: 'bold'
  },

  floatLuckydip: {
    position: 'absolute',
    right: 10,
    top: height * 0.64,
    bottom: 0
  },
  imageLucky: {
    width: 120,
    height: 120,
    paddingLeft: 10
  },
  countdown: {
    top: 30,
    backgroundColor: 'transparent',
    margin: 10,
    marginHorizontal: 15,
    borderRadius: 100
  },
  redRound: {
    backgroundColor: theme.darkOrange,
    height: 25,
    width: 25,
    borderRadius: 100,
    right: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  counterTextLuckyDip: {
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    paddingTop: 1,
    paddingHorizontal: 4
  },
  shadowRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40
  },
  clockBox: {
    backgroundColor: theme.red,
    borderRadius: 100
  },
  iconBlack: {
    color: theme.radicalRed,
    marginTop: 12
  },
};
