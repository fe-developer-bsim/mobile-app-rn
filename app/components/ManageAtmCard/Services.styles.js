import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default {
  contentContainerStyle: [{flexGrow: 1, backgroundColor: 'white'}],
  container: [
    styles.containerWhiteStyle,
    {
      flex: 1,
      padding: 20,
      justifyContent: 'space-between'
    }
  ],
  container2: [
    styles.containerWhiteStyle,
    {
      flex: 1,
      padding: 1,
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
  cardContainer: {
    backgroundColor: theme.white,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 15
  },
  imageContainer: {
    flex: 4,
    aspectRatio: 1,
    alignItems: 'center'
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: 100,
  },
  imageContainerList: {
    flex: 4,
    alignItems: 'center',
    aspectRatio: 1,
  },
  imageList: {
    resizeMode: 'contain',
    flex: 1,
    width: 100,
  },
  detailContainer: {
    flex: 10,
    paddingLeft: 15,
  },
  txtBold: {
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    marginTop: -5,
    fontFamily: theme.roboto,
  },
  txtLight: {
    fontWeight: theme.fontWeightLight,
    color: theme.black,
    fontSize: theme.fontSizeSmall,
    paddingTop: 5,
    fontFamily: theme.robotoLight,
  },
  txtLight2: {
    fontWeight: theme.fontWeightLight,
    color: theme.black,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.robotoLight,
  },
  actionTextContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'flex-end',
    right: 5,
  },
  actionText: {
    color: theme.brand,
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightRegular,
    bottom: 8,
  },
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    marginBottom: 20,
  },
  titleTextContainer: {
    paddingBottom: 20,
  },
  titleText: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightRegular,
    color: theme.black,
    fontFamily: theme.roboto
  },
  arrowIcon: {
    color: theme.red,
    bottom: 10,
    paddingLeft: 7
  },
  containerBottom: {
    padding: 20
  },
  columnContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  buttonApply: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'flex-end',
    right: 15,
    flexDirection: 'row'
  },
  offerContainer: {
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.contrast,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    elevation: 4,
    shadowOffset: {width: 0, height: 1},
    shadowColor: 'grey',
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  cardContainer2: {
    alignItems: 'flex-start',
    backgroundColor: theme.white,
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 20
  },
  button2: {
    width: 100,
    height: 25,
    marginTop: 7,
  },
  emptyContainer: {
    padding: 20
  },
  emptyText: {
    alignSelf: 'center',
    fontSize: theme.fontSizeMedium
  },
  activeBlockButton: {
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    fontWeight: theme.fontWeightMedium,
  },
  iconContainerStyle: [{flexGrow: 1, backgroundColor: 'white', height: height / 2}],
  borderCaution: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.greyLine,
  },
  containerIcon: [
    styles.containerWhiteStyle,
    {
      padding: 10,
    }
  ],
  explainIcon: {
    color: theme.black,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  caution: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight,
    marginRight: 10,
    paddingVertical: 7,
    flex: 1
  },
};