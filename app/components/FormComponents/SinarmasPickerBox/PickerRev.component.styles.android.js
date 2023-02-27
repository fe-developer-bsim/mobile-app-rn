import {theme} from '../../../styles/core.styles';
import {fontSizeNormalStyle, bold, flex_1} from '../../../styles/common.styles';

export default {
  modalContainer: {
    alignSelf: 'stretch',
  },

  modalFontStyle: {
    fontSize: theme.fontSizeLarge,
    color: theme.darkBlue,
    paddingTop: theme.cardVerticalSpacing,
    paddingBottom: theme.cardVerticalSpacing,
  },

  arrowDownStyle: {
    color: theme.brand,
    paddingRight: 15
  },

  textBoxStyle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 70
  },

  textStyle: [fontSizeNormalStyle, {
    flex_1,
    bold,
    color: theme.grey
  }
  ],

  modalContainerPicker: {
    borderRadius: 50
  },

  greyLine: {
    backgroundColor: theme.grey,
    height: 1,
  },

  remittanceTextStyle: [fontSizeNormalStyle, {
    flex_1,
    fontWeight: 'bold',
    color: theme.darkBlue,
  }
  ],
};
