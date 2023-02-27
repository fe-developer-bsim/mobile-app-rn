import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: [styles.contentContainerStyle, {
    flex: 1,
    backgroundColor: theme.white,
    paddingTop: 5,
    paddingBottom: 15,
  }],
  nextButton: styles.buttonLargeTextStyle,
  buttonContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  containerSign: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between'
  },
  checkboxLabel: {
    width: 300
  },
  rowSign: {
    flexDirection: 'row',
  },
  checkboxStyle: {
    padding: 10
  },
  termText: {
    width: 240,
    paddingRight: 10,
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
  },
  boxTNC: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  textTitleTNC: {
    fontSize: theme.fontSizeMedium,
    paddingBottom: 10,
    fontFamily: 'roboto',
  },
  checkTNC: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: 'roboto',
  },
  paddingBoxTNC: {
    paddingBottom: 15
  },
  containerSignHtml: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  anotherLink: {
    paddingBottom: 20
  },
  textLink: {
    color: theme.lightBlue,
    textDecorationLine: 'underline',
  },
  successTextWeb: {
    justifyContent: 'center',
  },
  mainTitle: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeNormal
  },
  bodyContainer: [styles.contentContainerStyle, {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  }],
  spaceContainer: {
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    paddingVertical: 20,
  },
  successImage: {
    width: width / 2,
    height: width / 2,
    alignSelf: 'center',
    marginBottom: 40
  },
  successDone: {
    width: width / 1.8,
    height: width / 2,
    alignSelf: 'center',
    marginBottom: 40
  }
};
