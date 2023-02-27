import {flex_1, cardVerticalSpacingStyle, textLightGreyStyle, fontSizeMediumStyle, fontSizeNormalStyle, buttonLargeTextStyle, bold, fontSizeLargeStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  container: {
    paddingVertical: 20
  },
  containerContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 40
  },

  title: [
    fontSizeMediumStyle,
    bold
  ],

  subTitle: [
    fontSizeNormalStyle,
    bold
  ],

  availableBalanceText: [
    fontSizeNormalStyle, textLightGreyStyle
  ],

  verticalSpacing: cardVerticalSpacingStyle,

  halfWidth: flex_1,

  nextButton: buttonLargeTextStyle,

  formHeader: {
    fontWeight: theme.fontWeightMedium,
    marginTop: 25,
    marginBottom: 0,
    fontSize: theme.fontSizeNormal,
  },
  formHeaderSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
  rowItem: {flexDirection: 'row', paddingVertical: 10},
  titleText: [cardVerticalSpacingStyle, bold, fontSizeLargeStyle],
  halfWidthRow: {
    flex: 1
  },
  rowItemRight: {alignSelf: 'flex-end'},
  rightItemHeader: {fontWeight: theme.fontWeightMedium},
  blackMediumText: [fontSizeMediumStyle, {
    color: theme.black
  }],
  blackLargeText: [fontSizeLargeStyle, {
    color: theme.black
  }],
  redLargeText: [
    fontSizeLargeStyle,
    bold, {
      color: theme.brand
    }],
  redItalicLargeText: [
    fontSizeLargeStyle,
    bold, {
      fontStyle: 'italic',
      color: theme.brand
    }],
  rightItemContainer: {
    flexDirection: 'row'
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  buttonContainer: {
    paddingHorizontal: 20
  },
  greyLineFull: {
    width: width,
    height: 5,
    backgroundColor: theme.greyLine,
    marginVertical: 15
  },
  greyLine: {
    width: width - 40,
    height: 1,
    backgroundColor: theme.lightGrey
  },
  summaryArea: {
    paddingHorizontal: 20,
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
  },
  containtextExplanation: {
    alignItems: 'center',
    paddingVertical: 20
  }
};
