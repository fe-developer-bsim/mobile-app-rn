import {theme} from '../../styles/core.styles';
import {light, fontSizeNormalStyle, cardVerticalSpacingStyle, fontSizeMediumStyle, bold, fontSizeLargeStyle} from '../../styles/common.styles';

export default {
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
  titleText: [cardVerticalSpacingStyle, bold, fontSizeMediumStyle],
  tabBarMargin: {
    paddingTop: 15,
    paddingHorizontal: 30
  },
  tabBarMarginMain: {
    paddingTop: 15,
    paddingHorizontal: 30,
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
  border: {
    height: 1,
    backgroundColor: theme.grey
  },
  title: [bold, fontSizeLargeStyle, {
    fontSize: theme.fontSizeLarge,
    color: theme.darkBlue,
  }],
  leftAlign: [light, fontSizeNormalStyle, {color: theme.lightGrey}],
  bottomAlign: [bold, fontSizeNormalStyle, {color: theme.darkBlue}],
};
