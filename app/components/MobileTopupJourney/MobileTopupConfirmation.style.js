
import {theme} from '../../styles/core.styles';
import {bold, light, fontSizeNormalStyle, contentContainerStyle} from '../../styles/common.styles';

export default {
  container: [contentContainerStyle],
  containerContent: [{alignItems: 'stretch', flex: 1}],
  title: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold
  },
  summaryContainer: {
    flex: 1,
    paddingVertical: 15
  },
  headerSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
  summaryArea: {
    borderBottomWidth: 1,
    borderColor: theme.grey,
    paddingBottom: 10,
    marginBottom: 10
  },
  rowItem: {flexDirection: 'row', paddingVertical: 10},
  rowItemLeft: {
    fontWeight: theme.fontWeightLight
  },
  rowItemRight: {alignSelf: 'flex-start'},
  rightItemHeader: {fontWeight: theme.fontWeightMedium},
  rightItemText: {fontWeight: theme.fontWeightLight, fontSize: theme.fontSizeSmall},
  amountLeft: {fontWeight: theme.fontWeightMedium},
  amountRight: {
    alignSelf: 'flex-start',
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeMedium
  },
  halfWidth: {flex: 1},
  lightText: [light, fontSizeNormalStyle],
  boldRight: [
    bold,
    fontSizeNormalStyle,
    {
      alignSelf: 'flex-end',
      textAlign: 'right'
    }
  ],
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
    paddingVertical: 15
  },
  remove: {
    paddingRight: 15,
    paddingTop: 7,
    color: theme.red
  }
};