import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  columnContainer: {
    backgroundColor: theme.white,
    flexGrow: 1
  },
  upperWrapper: {
    backgroundColor: theme.red,
    paddingBottom: 20
  },
  mainTitle: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    flex: 2
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.white,
    fontFamily: 'roboto'
  },
  subTitle: {
    paddingLeft: 40,
    paddingRight: 50,
  },
  subTitleText: {
    fontSize: theme.fontSizeMedium,
    color: theme.white
  },
  mainCheckLogo: {
    color: theme.white,
    alignItems: 'flex-end',
    marginTop: 30,
  },
  bottomWrapper: {
    paddingVertical: 10
  },
  subMainTitle: {
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  subMainTitleText: {
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    marginTop: 10,
  },
  buttonNext: {
    paddingHorizontal: 20,
    width: width,
    marginTop: 30,
    marginBottom: 10,
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    width: 250,
    color: theme.white,
    textAlign: 'center'
  },
  fieldRow: {
    paddingTop: 30,
    paddingRight: 30
  },
  bottomleftWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  block: {
    height: 180,
    width: 2,
    backgroundColor: theme.grey,
  },
  circleRed: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: theme.red,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: theme.grey
  },
  documentStyles: {
    paddingLeft: 45,
    paddingTop: 10,
    paddingRight: 20
  },
  subMainCheckLogo: {
    height: 40,
    width: 40,
  },
  mainTitleLogo: {
    width: 130,
    height: 30,
    marginTop: 20,
    resizeMode: 'contain',
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    flex: 1
  },
  column: {
    flexDirection: 'column'
  },
  imageSekuritas: {
    width: 100,
    height: 35,
    resizeMode: 'contain',
  },
  mainsubTitleText: {
    fontSize: theme.fontSizeLarge,
    color: theme.white
  },
  subMainCheckLogo2: {
    height: 40,
    width: 50,
  },
  borderGreyTop: {
    backgroundColor: theme.greyLine,
    height: 5,
  },
  borderGreyBottom: {
    backgroundColor: theme.greyLine,
    height: 10,
  },
  largeText: {
    fontSize: theme.fontSize22,
    color: theme.black,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightRegular
  },
  informationText: {
    fontSize: theme.fontSize20,
    color: theme.black,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightRegular,
    alignItems: 'center'
  },
  greyText: {
    fontSize: theme.fontSizeSmall,
    color: theme.lightGrey,
  },
  copyButtonText: {
    color: theme.red,
    fontSize: theme.fontSizeMedium,
    alignItems: 'flex-end',
    marginTop: 7
  },
  paddingTop: {
    paddingTop: 30,
  },
  check: {
    flex: 1,
    alignItems: 'flex-end',
  },
  check2: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20
  },
  middleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  middle2Container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 2
  },
  ticketContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftContainer: {
    alignItems: 'center',
    flex: 1,
  },
  filler: {
    flex: 1,
    width: 1,
  },
  greyLine: {
    flex: 1,
    width: 1.5,
    backgroundColor: theme.grey,
  },
  iconContainer: {
    flex: 5,
  },
  icon2Container: {
    flex: 1
  },
  arrowIcon: {
    color: theme.lightGrey,
  },
  contentContainer: {
    flex: 15
  },
  contentDetail: {
    fontSize: theme.fontSizeMedium,
    color: theme.lightGrey,
    marginLeft: 5,
    alignItems: 'center'
  },
  textContainer: {
    flex: 5,
    paddingBottom: 30,
    paddingTop: 10
  },
  steps: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'Roboto',
  },
  redText: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'Roboto',
    color: theme.brand
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  containerDetail: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: theme.lightGrey,
    borderWidth: 1,
    padding: 10,
    marginVertical: 30,
  },
  boxedInfo: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    flexDirection: 'row',
    marginVertical: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  iconColor: {
    color: theme.black,
  },
  info: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: theme.robotoLight,
    width: width - 100,
    marginLeft: 10
  },
  divideButton: {
    justifyContent: 'space-between',
    flex: 1
  }
};
