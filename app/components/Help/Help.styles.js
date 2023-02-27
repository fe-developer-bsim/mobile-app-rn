import * as styles from '../../styles/common.styles';

export default {
  contentContainerStyle: [{flexGrow: 1}],
  container: [
    styles.containerWhiteStyle,
    {
      flex: 1,
      padding: 20,
      justifyContent: 'space-between'
    }
  ],
  pageTitle: [
    styles.fontSizeLargeStyle,
    {
      marginBottom: 10,
      fontWeight: '700'
    }
  ],
  pageSubtitle: [
    styles.fontSizeNormalStyle
  ],
  navItemsContainer: {
    flex: 1
  },
  versionNumber: {
    textAlign: 'center',
    color: styles.placeholderTextColor,
    fontSize: styles.fontSizeSmall,
    paddingTop: 20
  }
};
