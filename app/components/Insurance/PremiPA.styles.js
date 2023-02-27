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
    justifyContent: 'space-between',
    paddingRight: 20
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
    width: width / 4
  },
  partTwo: {
    backgroundColor: theme.grey,
    height: 7,
    width: width
  },
  contentContainerPremi: {
    flex: 9,
    paddingBottom: 10
  },
  contentBar: {
    padding: 10,
    marginHorizontal: 10
  },
  iconCurve: {
    paddingRight: 10,
    paddingBottom: 90

  },
  rowGreyTitle: [
    styles.borderGreyStyle,
    styles.rowGray
  ],
  arrowIconContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  arrowIcon: {
    color: theme.red,
  },
};
