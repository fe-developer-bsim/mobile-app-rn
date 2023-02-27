import {theme} from '../../styles/core.styles';
const headerMaxHeight = 250;
import {fontSizeMediumStyle, fontSizeSmallStyle, fontSizeXLStyle, bold} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
import {flex_1} from '../../styles/common.styles';

const {width} = Dimensions.get('window');

const row = {
  flexDirection: 'row',
  paddingBottom: 15,
};

const markerContainer = [
  row, {
    justifyContent: 'flex-start'
  }
];

const subheading = [
  fontSizeSmallStyle,
  {
    paddingBottom: 10
  }
];

const markerStyle = {
  color: theme.textGrey,
};

export default {
  container: {
    flex: 1,
    backgroundColor: theme.pinkBrand
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.brand,
    overflow: 'hidden',
    height: headerMaxHeight
  },
  placeholderHeader: {
    position: 'absolute',
    top: -100,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: theme.pinkBrand,
  },
  backgroundContainer: {
    margin: 20,
    width: null,
    borderRadius: 30,
    backgroundColor: theme.brand,
  },
  backgroundImage: {
    width: null,
    resizeMode: 'cover',
    borderRadius: 30,
  },
  bar: {
    height: headerMaxHeight - 40,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 34
  },
  transactionContainer: {
    paddingHorizontal: 30,
    flex: 1,
    backgroundColor: theme.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerMaxHeight,
  card: {
    paddingHorizontal: 40,
    paddingBottom: 10,
    flex: 1,
  },
  savingsFeatureTitle: {
    color: theme.white,
    marginBottom: 34,
    fontFamily: 'roboto',
    paddingTop: 10
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  savingsValue: [
    fontSizeXLStyle,
    {
      color: theme.white,
      marginBottom: 17,
      fontFamily: 'roboto',
    }
  ],
  savingsAccountNumberValue: [
    fontSizeMediumStyle,
    bold,
    {
      color: theme.white,
      fontFamily: 'roboto',
      letterSpacing: 1.5
    }
  ],
  savingsAccountNumberText: [
    fontSizeSmallStyle,
    {
      color: theme.white,
      fontFamily: 'roboto',
      paddingRight: 5
    }
  ],
  gradientOrange: [
    theme.darkRed, '#EB493C', '#F35B51'
  ],
  gradientGreen: [
    '#00AB80', '#00BC90', '#00C392'
  ],
  gradientSharia: [
    '#428E2D', '#6DB23B', '#92D146'
  ],
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20
  },
  filterButtonContainer: {
    position: 'absolute',
    bottom: 10,
    width: width,
    alignItems: 'center'
  },
  filterButton: {
    borderRadius: 20,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: theme.white
  },
  filterIcon: {
    color: theme.darkBlue,
    transform: [{rotate: '90deg'}],
  },
  redText: {
    color: theme.brand,
    fontFamily: 'roboto'
  },
  blackText: {
    color: theme.black,
    fontFamily: 'roboto'
  },
  activityContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  errorText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightLight,
    color: theme.softGrey
  },
  extraPadding: {
    paddingVertical: 20
  },
  bold: [
    {
      fontSize: theme.fontSizeMedium,
      fontWeight: theme.fontWeightBold,
      paddingTop: 20,
      color: theme.darkBlue
    }
  ],
  boxLocked: {
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderColor: theme.disabledGrey,
    marginVertical: 20,
    paddingVertical: 15,
    backgroundColor: theme.contrast,

    elevation: 2,
    shadowRadius: 2,
    shadowColor: theme.grey,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.78
  },

  lowExtraPadding: {
    paddingVertical: 10
  },
  amountText: {
    fontWeight: theme.fontWeightMedium,
    color: theme.black
  },
  amountDescription: {
    fontWeight: theme.fontWeightLight,
    color: theme.black
  },
  codeMerchant: {
    color: theme.white,
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeMedium,
    fontFamily: theme.roboto
  },
  touchableRowPoin: {
    borderColor: 'white',
    flex: 2,
    borderWidth: 0.5,
    alignItems: 'center',
    paddingBottom: 10
  },
  containerPoin: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.greyLine,
    borderRadius: 20,
  },
  boldSimasTara: [
    {
      fontSize: theme.fontSizeMedium,
      fontWeight: theme.fontWeightBold,
      paddingTop: 20,
      paddingBottom: 20,
    }
  ],
  borderBottomRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    marginBottom: 10,
  },
  titleSimasTara: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight,
    color: theme.lightBlack,
  },
  value: {
    color: theme.black,
    textAlign: 'right',
    fontFamily: 'roboto',
  },
  value2: {
    color: theme.black,
    textAlign: 'right',
    fontFamily: 'roboto',
    flex_1
  },
  value3: {
    color: theme.black,
    textAlign: 'right',
    fontFamily: 'roboto',
    marginBottom: 15,
  },
  borderSimasTara: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.greyLine,
    padding: 15,
    borderRadius: 10,
  },
  rowNoBorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
  },
  closeSimasTara: {
    color: theme.brand,
    paddingRight: 10,
    fontFamily: 'roboto'
  },
  arrowIcon: {
    color: theme.brand
  },
  interestTextContainer: {
    flex: 2,
  },
  newTitleContainer: [markerContainer, flex_1],
  newNoteStyle: [subheading, markerStyle],
  rowContainer2: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: theme.disabledGrey,
  },
  brandPadding: {
    paddingRight: 15,
    paddingLeft: 1,
  },
  valueContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 15
  },
  rowContainer3: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  valueText: {
    color: theme.black,
    fontWeight: 'bold',
    fontFamily: 'roboto'
  },
  boxLocked2: {
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderColor: theme.disabledGrey,
    marginVertical: 20,
    paddingVertical: 15,
    backgroundColor: theme.contrast,

    elevation: 2,
    shadowRadius: 2,
    shadowColor: theme.grey,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.78
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 10
  },
  filterText: {
    marginTop: 5,
    fontSize: theme.fontSizeSmall
  },
  tooltipView: {
    marginRight: 'auto',
  },
  showInformation: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    color: theme.red,
    transform: [{rotate: '180deg'}],
  },
  contentTextStyle: {
    color: theme.superlightGrey,
    padding: 10, 
    fontFamily: 'roboto',
    fontSize: 13
  },
};
