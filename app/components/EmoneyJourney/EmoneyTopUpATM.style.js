import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const trueWidth = (width - 100);
export default {
  contentContainerStyle: [{flexGrow: 1, paddingBottom: 30}],
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
    fontWeight: theme.fontWeightMedium,
    color: theme.black,
  },
  roboto: {
    fontFamily: theme.roboto,
    color: theme.black,
  },
  robotoLight: {
    paddingTop: 10,
    fontFamily: theme.robotoLight,
    fontWeight: theme.fontWeightLight
  },
  infoLight: {
    fontFamily: theme.robotoLight,
    fontWeight: theme.fontWeightLight,
    color: theme.textLightGrey,
    fontSize: theme.fontSizeSmall
  },
  greyLine: {
    borderWidth: 1,
    borderColor: theme.greyLine,
    marginTop: 10,
    marginBottom: 15
  },
  greyLineHorizontal: {
    borderWidth: 1,
    borderColor: theme.greyLine,
    marginVertical: 20,
    marginHorizontal: 20
  },
  titleTextContainer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
    paddingTop: 20
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
    paddingBottom: 10
  },
  rowContainerSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4
  },
  rowText: {
    flexDirection: 'row',
    width: trueWidth,
    top: -2
  },
  columnText: {
    flexDirection: 'column',
    width: trueWidth
  },
  buttonApply: {
    justifyContent: 'center'
  },
  arrowDown: {
    transform: [{rotate: '90deg'}],
  },
  arrowUp: {
    transform: [{rotate: '-90deg'}],
  },
  collapseContainer: {
    backgroundColor: theme.gradientMiddle,
    marginVertical: 20,
    paddingVertical: 10,
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
  },
  numberText: {
    color: theme.white,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto   
  },
  textRed: {
    color: theme.brand,
    fontWeight: theme.fontWeightRegular
  },
  emptyNumberContainer: {
    borderRadius: 10,
    width: 18,
    height: 18,
    marginBottom: 10,
    marginRight: 10
  }, 
  greyBackground: {
    height: 40,
    backgroundColor: theme.greyLine,
    marginVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  imgBank: {
    width: 50,
    height: 30,
    marginRight: 10
  },
  imgBankAtmb: {
    width: 45,
    height: 25,
    marginRight: 10,
    top: 2.2
  },
  imgBankAlto: {
    width: 45,
    height: 30,
    marginRight: 10,
  },
  arrowWhite: {
    color: theme.white,
  },
  titleWhiteText: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightRegular,
    color: theme.white,
  },
  containerTitle: {
    backgroundColor: theme.red,
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
  },
  containerArrow: {
    marginLeft: -10
  },
  column: {
    flexDirection: 'column',
  },
  rowContainerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  itemContainer: {
    paddingHorizontal: 30
  },
  addittionalHeader: {
    fontSize: theme.fontSizeMedium,
    fontFamily: theme.roboto,
    color: theme.black,   
    fontWeight: theme.fontWeightMedium
  },
  textLight: {
    fontWeight: theme.fontWeightLight
  },
  otherContainer: {
    paddingTop: 20,
    paddingBottom: 10
  },
  padBot5: {
    paddingBottom: 5
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  padRight10: {
    paddingRight: 10
  },
  leftContainter: {
    width: trueWidth
  }
};