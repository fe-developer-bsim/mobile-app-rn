import {Platform} from 'react-native';
import {theme} from '../../styles/core.styles';
import {contentContainerStyle, cardVerticalSpacingStyle, fontSizeSmallStyle, fontSizeMediumStyle, bold, textLightGreyStyle} from '../../styles/common.styles';

export default {
  container: [contentContainerStyle],
  containerContent: [{alignItems: 'stretch', flex: 1}],
  formContainer: {
    flex: 1
  },
  titleText: [cardVerticalSpacingStyle, bold, fontSizeMediumStyle],
  labelSpacing: {
    paddingVertical: 14
  },
  smallLabelSpacing: {
    paddingVertical: 6
  },
  subtext: [
    {fontWeight: theme.fontWeightLight, paddingBottom: 10},
    fontSizeSmallStyle,
    textLightGreyStyle
  ],
  subtextBlack: [
    {paddingTop: 10},
    bold,
    fontSizeSmallStyle
  ],
  title: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    paddingBottom: 10
  },
  cameraIconStyle: {
    position: 'absolute',
    right: 0,
    width: 20,
    top: (Platform.OS === 'ios') ? 33 : 35,
    backgroundColor: 'transparent'
  }
};
