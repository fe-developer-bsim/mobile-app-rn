import {theme} from '../../../styles/core.styles';
import {fontSizeNormalStyle, bold, flex_1} from '../../../styles/common.styles';

export default {
  modalContainer: {
    alignSelf: 'stretch'
  },

  modalFontStyle: {
    fontSize: theme.fontSizeLarge,
    color: theme.text,
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
    height: 50
  },

  textStyle: [
    flex_1,
    fontSizeNormalStyle,
    bold
  ]
};
