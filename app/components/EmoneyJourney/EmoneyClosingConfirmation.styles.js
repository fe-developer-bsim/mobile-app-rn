import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width;
const trueHeight = (trueWidth * 8) / 16;

export default {
  scrollContainer: {
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  redContainer: {
    padding: 20,
    backgroundColor: theme.red,
    height: 300,
  },
  greyContainer: {
    backgroundColor: theme.containerGrey,
    height: trueHeight,
  },
  logoImage: {
    width: 116,
    height: 41,
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  content: {
    paddingBottom: 30
  },
  row: {
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 5,
    paddingBottom: 50
  },
  iconContainer: {
    paddingBottom: 30
  },
  title: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'Roboto',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'Roboto',
  },
  titleOffer: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'Roboto',
    padding: 20,
  },
  whiteTitle: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'Roboto',
    color: theme.white,
    paddingBottom: 40,
    paddingTop: 40,
    flex: 4
  },
  iconStyle: {
    color: theme.white,
    paddingTop: 40,
    flex: 1
  },
  whiteSubtitle: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'Roboto',
    color: theme.white,
  },
  bottomContainer: {
    paddingHorizontal: 20
  },
  contentButton: {
    backgroundColor: theme.white,
    borderColor: theme.red
  },
  imageOffer: {
    width: trueWidth,
    height: trueHeight
  }
};
