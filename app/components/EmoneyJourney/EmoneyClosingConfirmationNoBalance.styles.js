import {theme} from '../../styles/core.styles';

export default {
  redContainer: {
    backgroundColor: theme.red,
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  logoImage: {
    width: 116,
    height: 41,
  },
  filler: {
    flex: 1,
    width: 1,
  },
  contentContainer: {
    paddingTop: 20
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
    paddingBottom: 30
  },
  iconContainer: {
    paddingBottom: 30
  },
  title: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'Roboto',
  },
  subtitle: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'Roboto',
  },
  titleOffer: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'Roboto',
  },
  whiteTitle: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'Roboto',
    color: theme.white,
    paddingBottom: 40,
    paddingTop: 40,
    flex: 5
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
    paddingHorizontal: 20,
    paddingBottom: 20
  },
};
