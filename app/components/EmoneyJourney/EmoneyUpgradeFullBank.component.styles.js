import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  columnContainer: {
    backgroundColor: theme.white
  },
  upperWrapper: {
    backgroundColor: theme.red,
    paddingBottom: 30
  },
  mainTitle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    width: 2 * width / 3,
    marginLeft: 30,
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.white
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
    height: 40,
    width: 40,
    marginTop: 15,
    marginLeft: 30,
  },
  bottomWrapper: {
    paddingVertical: 10
  },
  subMainTitle: {
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  subMainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.black,
  },
  buttonNext: {
    paddingVertical: 10,
    paddingHorizontal: width / 11,
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
    flexDirection: 'row',
    paddingHorizontal: 30
  },
  bottomleftWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  block: {
    height: 160,
    width: 2,
    backgroundColor: theme.grey,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: theme.grey,
    borderColor: theme.grey,

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
    width: 150,
    height: 30,
    padding: 20,
    marginLeft: 10,
    resizeMode: 'contain',
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    width: width
  },
  column: {
    flexDirection: 'column'
  },
  imageSekuritas: {
    width: 100,
    height: 35,
    resizeMode: 'contain'
  },
  mainsubTitleText: {
    fontSize: theme.fontSizeLarge,
    color: theme.white
  },
  subMainCheckLogo2: {
    height: 40,
    width: 40,
  },
};
