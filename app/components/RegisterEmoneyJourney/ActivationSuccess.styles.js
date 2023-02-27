import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width;
const trueHeight = (trueWidth * 8) / 16;

export default {
  scrollContainer: {
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.white
  },
  topContainer: {
    backgroundColor: theme.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  redBG: {
    height: trueHeight,
    width: trueWidth
  },
  redContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 5,
  },
  whiteContainer: {
    backgroundColor: theme.white,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  logoImage: {
    width: 110,
    height: 40,
  },
  logoContainer: {
    paddingTop: 10,
  },
  greyLine: {
    flex: 1,
    width: 1,
    backgroundColor: theme.grey,
  },
  filler: {
    flex: 1,
    width: 1,
  },
  greyLineBottom: {
    flex: 1,
    width: 1,
    backgroundColor: theme.grey,
    paddingBottom: 30
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.grey
  },
  contentContainer: {
    paddingTop: 10,
    backgroundColor: theme.greyLine
  },
  content: {
    paddingBottom: 30
  },
  row: {
    flexDirection: 'row'
  },
  rowGotoDashboard: {
    flexDirection: 'row',
    paddingTop: 30,
    alignItems: 'center'
  },
  leftContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 5,
  },
  iconContainer: {
    paddingBottom: 30
  },
  title: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'Roboto',
    paddingBottom: 10,
    paddingHorizontal: 10,
    color: theme.black
  },
  subtitle: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'Roboto',
  },
  titleOffer: {
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
    padding: 20,
    color: theme.black
  },
  whiteTitle: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'Roboto',
    color: theme.white,
    paddingBottom: 40,
    paddingTop: 40,
    flex: 4
  },
  blackTitle: {
    fontSize: theme.fontSizeXL,
    fontFamily: theme.roboto,
    color: theme.black,
    paddingBottom: 15,
    paddingTop: 30,
    flex: 4
  },
  iconStyle: {
    color: theme.black,
    paddingTop: 40,
    flex: 1
  },
  whiteSubtitle: {
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
    color: theme.white,
    paddingHorizontal: 10
  },
  blackSubtitle: {
    fontSize: theme.fontSizeLarge,
    fontFamily: theme.roboto,
    color: theme.black,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    backgroundColor: theme.white
  },
  contentButton: {
    backgroundColor: theme.white,
    borderColor: theme.red
  },
  imageOffer: {
    width: trueWidth - 20,
    height: trueHeight
  },
  actionTextContainer: {
    paddingLeft: 10,
    paddingVertical: 30,
  },
  actionText: {
    color: theme.brand,
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightRegular,
    bottom: 5
  },
  imageContainer: {
    paddingTop: 30,
    paddingLeft: 20,
  },
  image: {
    width: 110,
    height: 110
  },
  detailContainer: {
    flex: 6,
    paddingLeft: 20,
  },
  detailSubtitleContainer: {
    paddingRight: 60,
    paddingTop: 5
  },
  detailTitle: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightRegular,
    color: theme.white,
    paddingTop: 40,
  },
  detailSubtitle: {
    color: theme.white,
    fontSize: theme.fontSizeMedium
  },
  bold: {
    fontWeight: theme.fontWeightBold,
    color: theme.white,
    fontSize: theme.fontSizeMedium
  },
  detailButtonContainer: {
    paddingTop: 25,
    paddingHorizontal: 30,
  },
  detailButton: {
    backgroundColor: theme.white,
    borderColor: theme.white,
    width: 200
  },
  detailButtonText: {
    color: theme.black,
    fontSize: theme.fontSizeMedium
  },
  secondContainer: {
    height: trueHeight,
  },
  redText: {
    color: theme.brand,
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeMedium
  },
  arrowIcon: {
    color: theme.brand,
    paddingLeft: 20
  }
};
