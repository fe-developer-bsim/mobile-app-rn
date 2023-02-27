import {theme} from '../../styles/core.styles';
import {light, textLightGreyStyle, fontSizeSmallStyle, fontSizeNormalStyle, fontSizeMediumStyle, bold, cardVerticalSpacingStyle} from '../../styles/common.styles';

export default {
  halfWidth: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  rightAlign: [{
    alignSelf: 'flex-end',
    textAlign: 'right'
  }, bold],
  tabBarMargin: {
  },
  background: {
    backgroundColor: theme.contrast
  },
  horizontalSpacing: {
    paddingHorizontal: 20
  },
  verticalSpacing: [{
    paddingVertical: 20
  }, cardVerticalSpacingStyle],
  secondarySpacing: {
    paddingBottom: 10
  },
  bottomSpacing: {
    paddingBottom: 22
  },
  labelSpacing: {
    paddingBottom: 7
  },
  billDetails: [{
    paddingTop: 5
  }, bold, fontSizeSmallStyle],
  topSpacing: {
    paddingTop: 20
  },
  cardStyle: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: '#DDD'
  },
  availableBalance: [fontSizeNormalStyle, light, textLightGreyStyle],
  titleText: [bold, fontSizeMediumStyle]
};
