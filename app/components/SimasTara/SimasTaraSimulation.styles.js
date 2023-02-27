import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';
import {fontSizeNormalStyle, fontSizeSmallStyle, flex_1} from '../../styles/common.styles';
import {getViewWidth, viewportWidth} from '../../utils/device.util';
import {Dimensions, Platform} from 'react-native';

const slideWidth = getViewWidth(0.95);
const sliderWidth = viewportWidth;
const itemHorizontalMargin = getViewWidth(0.03);
const itemWidth = slideWidth + itemHorizontalMargin * 2;
const {width, height} = Dimensions.get('window');

const row = {
  flexDirection: 'row',
  paddingBottom: 10,
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
  detailContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  halfRow: {
    flex: 0.5,
    flexWrap: 'wrap'
  },
  detailTitle: [
    fontSizeNormalStyle,
    {
      color: theme.black,
    }
  ],
  detailText: [
    fontSizeNormalStyle,
    {
      color: theme.textLightGrey,
      textAlign: 'right'
    }
  ],
  greyLineFull: {
    borderTopWidth: 1,
    borderColor: theme.greyLine
  },
  borderBottomRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    marginBottom: 10
  },
  arrowIcon: {
    color: theme.brand
  },
  viewMore: {
    color: theme.brand,
    paddingRight: 10,
    fontFamily: theme.roboto,
  },

  bodyContainerWithTerms:
  [{
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  }],
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    marginBottom: 30
  },
  row: {
    ...row,
    flex: 1
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    bottom: 15,
    paddingBottom: 15,
  },
  taraAmountContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  mainTitleText: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    marginLeft: 10,
    marginRight: 5,
  },
  rpText: {
    top: 30,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto,
    color: theme.black,
    textAlign: 'right',
  },
  minimumAmount: {
    alignItems: 'flex-start'
  },
  maximumAmount: {
    alignItems: 'flex-end'
  },
  amount: {
    top: 12,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    color: theme.textGrey
  },
  sliderContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  amountText: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto,
    color: theme.black,
  },
  interestTextContainer: {
    flex: 2,
  },
  title: {
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightLight,
    color: theme.black,
  },
  value: {
    color: theme.brand,
    textAlign: 'right',
    flex: 1,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto,
    paddingTop: 10,
  },
  sendAccountDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    alignItems: 'center'
  },
  detailLeft: {
    paddingVertical: 10,
    alignItems: 'center'
  },
  detailRight: {
    paddingTop: 5,
    alignItems: 'flex-end',
  },
  textCenter: {
    alignItems: 'center',
    paddingBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 7,
  },
  textThin: {
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightLight,
    fontFamily: theme.robotoLight
  },
  rowFieldAgreement: {
    flexDirection: 'row',
  },
  subContentTextBottom: {
    paddingTop: 5,
    textAlign: 'right',
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightRegular,
    fontFamily: theme.roboto
  },
  errIcon: {
    color: theme.brand,
    marginRight: 5,
  },
  redText: [fontSizeSmallStyle, {
    color: theme.brand,
    fontFamily: theme.robotoLight
  }],
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  row3: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
  },
  iconCollapsedStyle: {
    transform: [{rotate: '90deg'}],
  },
  buttonWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  appLogoquestion: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  explainIconCaution: {
    color: theme.black,
    paddingLeft: 5,
    transform: [{rotate: '180deg'}],
  },
  borderedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightLeftBorder: {
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  centerBorder: {
    paddingVertical: 5,
  },
  largeText: {
    fontSize: theme.fontSizeExtraXL,
    fontWeight: theme.fontWeightMedium,
    color: theme.black,
  },
  largeTextDisabled: {
    fontSize: theme.fontSizeExtraXL,
    fontWeight: theme.fontWeightMedium,
    color: theme.textLightGrey
  },
  iconPlus: {
    paddingTop: 4,
    color: theme.black,
  },
  iconPlusDisabled: {
    paddingTop: 4,
    color: theme.textLightGrey,
  },
  container1: {
    flex: 1,
  },
  newNoteStyle: [subheading, markerStyle],
  newTitleContainer: [markerContainer, flex_1],
  container: [
    {
      flex: 1,
      paddingTop: 0,
    }
  ],
  containerMonthlyPlacement: {
    backgroundColor: theme.grey,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 0,
    paddingVertical: 10,
  },
  containerBorderMonthlyPlacement: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: theme.grey,
    paddingHorizontal: 10,
  },
  textAmount: {
    fontSize: theme.fontSizeNormal,
    color: theme.textGrey,
    marginTop: 10,
  },
  value2: {
    color: theme.black,
    textAlign: 'right',
    flex: 1,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto,
    paddingTop: 10,
  },
  rowSourceAccount: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    flex: 0.7,
    alignItems: 'center',
  },
  imageOffer2: {
    width: 85,
    height: 85
  },
  imageOfferEmoney: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1.7,
  },
  pad2: {
    paddingVertical: 1
  },
  accTxt2: [styles.bold, {
  }],
  balanceTxt: {
    color: theme.lightGrey,
  },
  sliderWidth,
  itemWidth,
  slideStyle: {
    width: itemWidth,
    paddingHorizontal: 10
  },
  onbView: {
    width: Platform.OS === 'android' ? width - 40 : width,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  onbViewSelect: {
    width: Platform.OS === 'android' ? width - 40 : width,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.green,
  },

  contentContainerStyle: [{flexGrow: 1, backgroundColor: theme.white, marginBottom: 50}],
  containerSourceAccount: [{
    backgroundColor: theme.white,
    flexGrow: 1,
    paddingHorizontal: 20,
  }],
  bgWhite: {
    width: Platform.OS === 'android' ? width - 40 : width - 40,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: theme.lightBlack,
    marginRight: 5,
    backgroundColor: theme.white,
  },
  bgWhiteSelect: {
    width: Platform.OS === 'android' ? width - 40 : width,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: theme.green,
    marginRight: 5,
    backgroundColor: theme.white,
  },
  subtitleTxt: {
    color: theme.lightGrey,
    paddingVertical: 10
  },

  listView: {
    height: height / 8,
    width: width - 40,
    flex: 1,
    backgroundColor: theme.white,
  },
  inlineField: {
    paddingHorizontal: 65,
  },
  rowAlignBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: theme.whiteGrey,
  },
  accNo: {color: theme.textGrey},
  product: {color: theme.black, marginTop: 5},
  roboto: {
    fontFamily: 'roboto',
  },
  containerContent: [{alignItems: 'stretch', flex: 1}],
};
