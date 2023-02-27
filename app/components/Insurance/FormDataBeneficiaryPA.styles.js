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
  rowGray: [
    styles.borderGreyStyle,
    styles.rowGray
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
    width: width / 1.5
  },
  partTwo: {
    backgroundColor: theme.grey,
    height: 7,
    width: width / 1.5
  },
  editPart: [
    styles.fontSizeNormalStyle,

  ],
  editButton: [
    styles.fontSizeLargeStyle,
    {
      marginTop: 10,
      color: theme.red,
    }
  ],
  contentContainerEdit: {
    flex: 9,
    paddingBottom: 10
  },
  partEditBar: {
    backgroundColor: theme.grey,
    height: 10,
    width: width
  },
  EditBar: {
    backgroundColor: theme.grey,
    height: 5,
    width: width
  },
  rowCheckbox: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    flexDirection: 'row',

    justifyContent: 'center'
  },
  checkboxPadding: {
    paddingHorizontal: 10,

  },
  textUnderline: {
    textDecorationLine: 'underline'
  },
};
