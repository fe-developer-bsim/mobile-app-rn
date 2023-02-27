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
    position: 'absolute',
    right: 5,
    bottom: 18,
  },

  arrowPointDownStyle: {
    position: 'absolute',
    right: 5,
    bottom: 18,
    transform: [{rotate: '90deg'}]
  },

  textStyle: [
    flex_1,
    fontSizeNormalStyle,
    bold
  ],
  arrowDownStyleDisabled: {
    color: theme.softGrey,
  },

  dateSize: theme.fontSizeLarge,

};
