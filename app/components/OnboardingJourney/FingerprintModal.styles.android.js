import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle, fontSizeXLStyle} from '../../styles/common.styles';

export default {
  heading: [fontSizeXLStyle,
    {
      color: theme.text
    }
  ],
  subheading: [fontSizeMediumStyle,
    {
      paddingTop: 20,
      paddingBottom: 28
    }
  ],
  cancelText: {
    color: theme.androidTextColor,
    fontWeight: theme.fontWeightMedium
  },
  logoutText: [fontSizeMediumStyle,
    {color: theme.primary}
  ],
  buttonContainer: {
    flexDirection: 'row'
  },
  buttonAlign: {
    flex: 1,
    alignItems: 'flex-end'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconText: [fontSizeMediumStyle,
    {
      color: theme.textLightGrey,
      paddingLeft: 16
    }
  ]
};
