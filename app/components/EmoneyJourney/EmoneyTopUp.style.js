import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

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
  cardsContainer: {
    paddingHorizontal: 10
  },
  cardContainer: {
    backgroundColor: theme.white,
  },
  bold: {
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    fontSize: theme.fontSizeMedium
  },
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    marginVertical: 20,
  },
  titleTextContainer: {
    paddingBottom: 5,
  },
  titleText: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightRegular,
    color: theme.black,
  },
  arrowIcon: {
    color: theme.black,
  },
  containerBottom: {
    padding: 20
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonApply: {
    justifyContent: 'center'
  }
};