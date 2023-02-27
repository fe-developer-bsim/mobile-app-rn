import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle, textAlignCenter, fontSizeXLStyle} from '../../styles/common.styles';

export default {
  heading: [fontSizeXLStyle,
    textAlignCenter,
    {
      paddingTop: 10,
      color: theme.text
    }
  ],
  subheading: [textAlignCenter,
    {
      paddingTop: 20,
      paddingBottom: 30,
      paddingHorizontal: 20
    }
  ],
  cancelText: [fontSizeMediumStyle,
    {color: theme.textLightGrey}
  ],
  logoutText: [fontSizeMediumStyle,
    {color: theme.primary}
  ],
  buttonContainer: {
    flexDirection: 'row'
  },
  buttonAlign: {
    flex: 1,
    alignItems: 'center'
  }
};
