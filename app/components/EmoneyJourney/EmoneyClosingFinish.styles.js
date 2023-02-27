import {theme} from '../../styles/core.styles';

export default {
  scrollContainer: {
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  redContainer: {
    padding: 20,
    backgroundColor: theme.red,
    height: 300
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
    padding: 20
  },
  content: {
    paddingBottom: 30
  },
  row: {
    flexDirection: 'row',
  },
  leftContainer: {
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 5,
    paddingBottom: 30
  },
  iconContainer: {
    flex: 5,
  },
  title: {
    fontSize: theme.fontSizeLarge,
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
    paddingBottom: 60,
    paddingTop: 40,
    flex: 4
  },
  iconStyle: {
    color: theme.white,
    paddingTop: 40,
    paddingBottom: 60,
    paddingLeft: 20,
    flex: 1,
  },
  whiteSubtitle: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'Roboto',
    color: theme.white,
  },
  bottomContainer: {
    paddingTop: 20,
    paddingHorizontal: 20
  }
};
