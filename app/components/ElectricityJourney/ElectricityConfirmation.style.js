import {cardVerticalSpacingStyle, fontSizeMediumStyle, bold, cardRightText, light, fontSizeNormalStyle, paddingBottom} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  halfWidth: {
    flex: 1
  },
  halfWidthRow: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  titleText: [cardVerticalSpacingStyle, bold, fontSizeMediumStyle],
  lightText: [light, fontSizeNormalStyle],
  boldRight: [
    bold,
    fontSizeNormalStyle,
    {
      alignSelf: 'flex-end',
      textAlign: 'right'
    }
  ],
  lightRight: [
    light,
    fontSizeNormalStyle,
    {
      alignSelf: 'flex-end',
      textAlign: 'right'
    }
  ],
  boldCard: [bold, cardRightText, fontSizeNormalStyle],

  buttonStylePadding: [cardVerticalSpacingStyle, paddingBottom],
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
  },
  containtextExplanation: {
    alignItems: 'center',
    paddingVertical: 20
  },
  icon: {
    color: theme.grey,
    paddingTop: 5
  },
  rowCou: {
    flexDirection: 'row',
  },
  couponText: {
    paddingLeft: 8,
    paddingTop: 7
  },
  iconAplied: {
    color: theme.green
  },
  iconNotAplied: {
    color: theme.disabledGrey
  },
  rowAmountCoupon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  remove: {
    paddingRight: 15,
    paddingTop: 7,
    color: theme.red
  }

};