import {theme} from '../../../styles/core.styles';
import {fontSizeNormalStyle, flex_1, softGrey} from '../../../styles/common.styles';

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
    color: theme.black,
    paddingRight: 15,
    transform: [{rotate: '90deg'}],
  },

  arrowSize: theme.fontSizeNormal,

  textBoxStyle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50
  },

  arrowDownStyleDisabled: {
    color: theme.softGrey,
    paddingRight: 15,
    transform: [{rotate: '90deg'}],
  },

  modalFontStyleDisabled: {
    fontSize: theme.fontSizeLarge,
    color: theme.softGrey,
    paddingTop: theme.cardVerticalSpacing,
    paddingBottom: theme.cardVerticalSpacing,
  },

  textStyle: [
    flex_1,
    fontSizeNormalStyle,
  ],

  textStyleDisabled: [
    flex_1,
    fontSizeNormalStyle,
    softGrey
  ],

  disabled: {
    color: theme.softGrey
  }

};
