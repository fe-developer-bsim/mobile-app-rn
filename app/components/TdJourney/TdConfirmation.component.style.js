import {fontSizeMediumStyle, bold, buttonLargeTextStyle,
  textLightGreyStyle, fontSizeNormalStyle, fontSizeLargeStyle, fontSizeSmallStyle} from '../../styles/common.styles';

import {theme} from '../../styles/core.styles';

const markerContainer = {
  flex: 1,
  flexDirection: 'row'
};

const lightFont = [textLightGreyStyle, fontSizeNormalStyle];

export default {
  container: {
    padding: 20
  },
  summaryHeading: [
    bold, fontSizeMediumStyle
  ],
  lightFont,
  lightFontItalics: [lightFont, {fontStyle: 'italic'}],
  boldFont: [bold, fontSizeNormalStyle],
  button: buttonLargeTextStyle,
  halfWidth: {
    flex: 1,
    justifyContent: 'center'
  },
  halfWidthRow: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  verticalSpacing: {
    paddingVertical: 20
  },
  principalText: [
    bold,
    fontSizeLargeStyle
  ],
  hr: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: theme.borderGrey,
    marginVertical: 10
  },
  marker: [
    fontSizeNormalStyle,
    {color: theme.red,
      paddingRight: 5
    }],
  markerContainer: markerContainer,
  markerContainerBottom: [
    markerContainer, {
      paddingTop: 30,
      flexDirection: 'row',
    }
  ],
  subheading: [
    fontSizeSmallStyle,
    textLightGreyStyle, {
      paddingBottom: 10
    }
  ],
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
  },
  containtextExplanation: {
    alignItems: 'center',
    paddingVertical: 20
  }
};
