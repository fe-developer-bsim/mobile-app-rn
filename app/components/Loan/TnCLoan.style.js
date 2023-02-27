import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

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
    flexDirection: 'row',
    paddingBottom: 10
  },
  textLink: {
    color: theme.lightBlue,
    textDecorationLine: 'underline',
  },
  successTextWeb: {
    justifyContent: 'center',
    paddingVertical: 60
  }
};
