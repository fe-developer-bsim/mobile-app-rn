import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  contentContainerStyle: [{flexGrow: 1}],
  container: [
    styles.containerWhiteStyle,
    {
      flex: 1,
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
  },
  cardContainer: {
    backgroundColor: theme.white,
  },
  bold: {
    fontWeight: theme.fontWeightBold,
    color: theme.black,
  },
  roboto: {
    fontFamily: 'roboto'
  },
  greyLine: {
    borderWidth: 1,
    borderColor: theme.greyLine,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  titleTextContainer: {
    padding: 20,
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
    paddingHorizontal: 20    
  },
  rowContainerSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  rowText: {
    flexDirection: 'row',
  },
  buttonApply: {
    justifyContent: 'center'
  },
  arrowDown: {
    transform: [{rotate: '90deg'}]
  },
  arrowUp: {
    transform: [{rotate: '-90deg'}]
  },
  collapseContainer: {
    backgroundColor: theme.gradientMiddle,
    marginVertical: 20,
    paddingVertical: 20,
  },
  numberContainer: {
    borderRadius: 10,
    backgroundColor: theme.brand,
    width: 18,
    height: 18,
    marginBottom: 10,
    marginRight: 10
  },
  detailTitleContainer: {
    marginBottom: 15,
    paddingHorizontal: 20    
  },
  numberText: {
    color: theme.white,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto'    
  },
  textRed: {
    color: theme.brand
  }
};