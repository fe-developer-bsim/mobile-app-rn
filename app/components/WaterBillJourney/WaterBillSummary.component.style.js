import {theme} from '../../styles/core.styles';
import {light, fontSizeNormalStyle, cardVerticalSpacingStyle, fontSizeMediumStyle, bold} from '../../styles/common.styles';

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
  halfrow: {
    flexDirection: 'row'
  },
  rightAlign: [{
    alignSelf: 'flex-end',
    textAlign: 'right',
  }, bold, fontSizeNormalStyle],

  leftAlign: [light, fontSizeNormalStyle],

  titleText: [cardVerticalSpacingStyle, bold, fontSizeMediumStyle],

  tabBarMargin: {
  },
  background: {
    backgroundColor: theme.contrast
  },
  horizontalSpacing: {
    paddingHorizontal: 20
  },
  verticalSpacing: {
    paddingVertical: 20
  },
  secondarySpacing: {
    paddingBottom: 10
  },
  bottomSpacing: {
    paddingBottom: 22
  },
  labelSpacing: {
    paddingBottom: 7
  },

  topSpacing: {
    paddingTop: 20
  },
  cardStyle: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: '#DDD'
  },
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
