import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {flex_1} from '../../styles/common.styles';
import {Platform} from 'react-native';

const row = {
  flexDirection: 'row',
  paddingBottom: 15,
};

const markerContainer = [
  row, {
    justifyContent: 'flex-start'
  }
];

export default {
  serialNoContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 9
  },
  content: [

    {marginHorizontal: 15, padding: 10}
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
    styles.fontSizeNormalStyle, styles.textLightGreyStyle,
    {
      marginBottom: 20,
    }
  ],
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  greyLine: {
    backgroundColor: styles.greyLine,
    height: 1,
  },
  rowGray: [
    styles.borderGreyStyle,
    styles.rowGray
  ],
  valueBlack: [
    styles.fontSizeMedium,
    styles.bold, {
      fontWeight: '500',
      color: 'black',
    }],
  titleBlack: [
    styles.fontSizeLargeStyle,
    styles.bold, {
      fontWeight: '500',
      color: 'black',
      marginHorizontal: 15,
      padding: 5
    }],
  titleTC: [
    styles.fontSizeLargeStyle, styles.textLightGreyStyle, {
      fontWeight: '500',
      marginHorizontal: 15,
      padding: 5
    }],
  valueTC: [
    styles.textLightGreyStyle],

  containerCarousel: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: theme.white
  },
  upperContainer: {
    height: 220,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginVertical: 7,
    elevation: 2,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
  },
  padding: {
    padding: 15
  },
  dropDownContainer: {
    paddingBottom: 7,
  },
  fieldContainer: {
    borderRadius: 10,
    marginHorizontal: 7,
    height: 35,
  },
  bgPolisName: {
    backgroundColor: theme.opacityWhite,
    flexDirection: 'row',
    borderRadius: 15,
    justifyContent: 'center',
    width: 140,
    height: Platform.OS === 'ios' ? 19 : 22,
    marginBottom: 7,
    alignSelf: 'center',
  },
  polis: {
    textAlign: 'center',
    fontSize: theme.fontSizeNormal,
    color: theme.white,
  },
  stylePembayaran: {
    marginBottom: 7,
    textAlign: 'center',
    fontSize: 13,
    color: theme.white,
  },
  rowPolisStatus: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 7,
  },
  textTitle: {
    fontSize: theme.fontSizeNormal,
    color: theme.white,
    marginTop: 7,
  },
  value: {
    color: theme.white,
    textAlign: 'right',
    flex: 1,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto,
    marginTop: 7,
  },

  boldSimasTara: [
    {
      fontSize: theme.fontSizeMedium,
      fontWeight: theme.fontWeightBold,
      paddingTop: 10,
      paddingBottom: 15,
      marginLeft: 10,
    }
  ],
  borderBottomRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    marginBottom: 10,
  },
  borderBottomNoRow: {
    flexDirection: 'row',
  },
  titleSimasTara: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight,
    color: theme.lightBlack,
  },
  valueDetail: {
    color: theme.black,
    textAlign: 'right',
    fontFamily: 'roboto',
  },
  value3: {
    color: theme.black,
    textAlign: 'right',
    fontFamily: 'roboto',
  },
  borderSimasTara: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.darkGrey,
    padding: 15,
    borderRadius: 10,
  },
  newTitleContainer: [markerContainer, flex_1],

  dot: {
    backgroundColor: theme.transparent,
    width: 10,
    height: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: theme.transparent,
    marginBottom: -20,
    marginTop: -15,
  },
  activeDot: {
    backgroundColor: theme.black,
    width: 10,
    height: 10,
    borderRadius: 4,
    marginBottom: -20,
    marginTop: -15,
    borderColor: theme.grey,
    borderWidth: 0.5,
  },
  pagination: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flex: 2,
  },
  valueCollapsibleText: {
    color: theme.lightPinkNew,
    textAlign: 'right',
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
  },
  accordionIcon: {
    transform: [{rotate: '270deg'}],
  },
  iconCollapsedStyle: {
    transform: [{rotate: '90deg'}],
  },
  collapsibleButton: {
    color: theme.lightPinkNew,
    fontWeight: theme.fontWeightBold,
  },
  collapsibleContainer: {
    flexDirection: 'row',
  },
  borderCaution: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.greyLine,
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  explainIcon: {
    color: theme.black,
    paddingHorizontal: 10,
  },
  containerIcon: {
    justifyContent: 'center',
  },
  caution: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight,
    marginRight: 10,
    paddingVertical: 7,
    flex: 1
  },
  arrowDownStyle: {
    transform: [{rotate: '90deg'}],
    position: 'absolute',
    right: 0,
    bottom: 10,
    color: 'black',
    marginRight: 10,
  },
};
