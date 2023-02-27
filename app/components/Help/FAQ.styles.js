import * as styles from '../../styles/common.styles';

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
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  }
};
