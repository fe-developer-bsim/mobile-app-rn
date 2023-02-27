import {contentContainerStyle, cardVerticalSpacingStyle, fontSizeMediumStyle, fontSizeSmallStyle, bold, fontSizeNormalStyle, textLightGreyStyle, light, fontSizeLargeStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  middleContainer: {
    padding: 20
  },
  textContainer: {
    flexDirection: 'row'
  },
  transactionDetails: [fontSizeMediumStyle, bold, {
    flex: 1,
    paddingTop: 25,
    textAlign: 'center'
  }],
  row: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  lightText: [light, fontSizeNormalStyle],
  lineDiv: {
    borderBottomWidth: 5,
    borderColor: theme.greyLine,
    paddingBottom: 10,
  },
  container: [contentContainerStyle],
  containerContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  summaryContainer: {
    flex: 1,
    paddingVertical: 15
  },
  summaryArea: {
    paddingBottom: 10,
    marginBottom: 10
  },
  rowItem: {flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-between'},
  halfWidth: {
    flex: 1
  },
  verticalSpacing: [cardVerticalSpacingStyle,
    {paddingBottom: 40}
  ],
  rowItemRight: {alignSelf: 'flex-start'},
  rightItemHeader: {fontWeight: theme.fontWeightMedium},
  rightItemText: {fontWeight: theme.fontWeightLight, fontSize: theme.fontSizeSmall},
  titleText: [cardVerticalSpacingStyle, bold, fontSizeMediumStyle],
  boldCard: [bold, fontSizeNormalStyle],
  boldTotal: [bold, fontSizeMediumStyle],
  subtext: [
    {fontWeight: theme.fontWeightLight},
    fontSizeSmallStyle,
    textLightGreyStyle
  ],
  initialDeposit: [
    fontSizeLargeStyle,
    bold,
    {
      color: theme.brand,
      textAlign: 'right'
    }
  ],
  lockedAmount: [
    fontSizeLargeStyle,
    bold,
    {
      color: theme.textGrey,
      textAlign: 'right'
    }
  ],
  detailText: [bold, fontSizeMediumStyle],
  detailTitle: [fontSizeMediumStyle],
  detailContainer: {
    paddingBottom: 10
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
