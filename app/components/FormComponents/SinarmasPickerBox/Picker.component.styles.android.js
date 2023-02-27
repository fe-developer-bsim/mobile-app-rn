import {theme} from '../../../styles/core.styles';
import {fontSizeNormalStyle, bold, flex_1} from '../../../styles/common.styles';

export default {
  modalContainer: {
    alignSelf: 'stretch',
  },

  modalFontStyle: {
    fontSize: theme.fontSizeLarge,
    color: theme.text,
    paddingTop: theme.cardVerticalSpacing,
    paddingBottom: theme.cardVerticalSpacing,
  },

  modalFontStyleRe: {
    fontSize: theme.fontSizeMedium,
    color: theme.darkBlue,
    paddingTop: theme.cardVerticalSpacing,
    paddingBottom: theme.cardVerticalSpacing,
    alignSelf: 'center',
    marginVertical: 10
  },

  tittleCont: {
    backgroundColor: theme.pinkBrand,
    paddingVertical: 25,
    alignSelf: 'stretch',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },

  tittle: {
    backgroundColor: theme.pinkBrand,
    fontSize: theme.fontSizeLarge,
    fontWeight: 'bold',
    color: theme.white,
    alignSelf: 'center'
  },

  summaryArea: {
    borderBottomWidth: 1,
    borderColor: theme.grey,
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
  ],

  modalContainerPicker: {
    borderRadius: 50
  }
};
