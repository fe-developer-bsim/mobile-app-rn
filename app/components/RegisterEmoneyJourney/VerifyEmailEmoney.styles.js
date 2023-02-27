import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  bodyContainerWithTerms: [{
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between'
  }],
  columnContainer: {
    backgroundColor: theme.white,
  },
  iconStyle: {
    color: theme.white,
  },
  upperWrapper: {
    backgroundColor: theme.brand,
    paddingBottom: 70
  },
  subTitle: {
    marginBottom: 60
  },
  subTitleContainer: {
    paddingTop: 10,
    paddingHorizontal: 20
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    fontFamily: 'roboto',
    color: theme.white
  },
  subTitleText: {
    fontSize: theme.fontSizeLarge,
    color: theme.white,
  },
  bottomWrapper: {
    paddingVertical: 10
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  column: {
    flexDirection: 'column'
  },
  mainsubTitleText: {
    fontSize: theme.fontSizeLarge,
    color: theme.white
  },
  paddingTop: {
    paddingTop: 30,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  mainContent: {
    paddingVertical: 20,
  },
  middleContainer: {
    paddingHorizontal: 40,
    paddingVertical: 30
  },
  stepContainer: {
    paddingVertical: 20
  },
  textContent: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'roboto',
    color: theme.black,
    fontWeight: theme.fontWeightRegularb
  },
  borderGreyTop: {
    backgroundColor: theme.greyLine,
    height: 5,
  },
  imageContain: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20
  },
  simobiPng: {
    width: 100,
    height: 40,
  },
};
