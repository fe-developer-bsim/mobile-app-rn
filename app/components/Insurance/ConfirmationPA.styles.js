import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  serialNoContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 9
  },
  content: [
    styles.contentContainerStyle
  ],
  number: [
    styles.fontSizeLargeStyle,
    styles.bold
  ],
  pageTitle: [
    styles.fontSizeLargeStyle,
    styles.bold
  ],
  pageSubtitle: [
    styles.fontSizeNormalStyle,
    {
      marginBottom: 20,
    }
  ],
  confirmSubtitle: [
    styles.fontSizeLargeStyle,
    styles.bold,
    {
      marginBottom: 20,
    }
  ],
  confirmTitle: [
    styles.fontSizeNormalStyle,

  ],
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  rowGrey: [
    styles.borderGreyStyle,
    styles.rowGray, {borderTopWidth: 5}
  ],
  formContainer: {
    flex: 1,
    paddingBottom: 10
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    width: 250,
    textAlign: 'center',
    color: theme.white
  },
  barStep: {
    flexDirection: 'row',
    height: 7
  },
  partOne: {
    backgroundColor: theme.red,
    height: 7,
    width: width / 1
  },
  partTwo: {
    backgroundColor: theme.grey,
    height: 7,
    width: width / 1
  },
  contentContainerTitle: {
    flex: 9,
    paddingBottom: 20,
    paddingTop: 10
  },
  pageTitleXL: [
    styles.fontSizeXLStyle,
    styles.bold
  ],
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
  },
  containtextExplanation: {
    alignItems: 'center',
    paddingVertical: 20
  }
};
