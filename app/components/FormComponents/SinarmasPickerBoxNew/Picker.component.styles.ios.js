import {theme} from '../../../styles/core.styles';
import {viewportWidth} from '../../../utils/device.util';
import {fontSizeNormalStyle, bold, flex_1} from '../../../styles/common.styles';

export default {
  overlayContainer: {
    justifyContent: 'flex-end',
    padding: 0,
  },
  innerOverlay: {
    backgroundColor: 'transparent',
    padding: 0,
  },
  modalContainer: {
    width: viewportWidth,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: theme.inputBackground,
  },

  arrowDownStyle: {
    color: theme.brand,
    paddingRight: 15
  },

  textBoxStyle: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  buttonStyle: {
    color: theme.buttonPickerColor,
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightBold
  },
  rightArrow: {
    color: theme.buttonPickerColor
  },
  leftArrow: {
    color: theme.buttonPickerColor,
    transform: [{rotate: '180deg'}]
  },
  buttonContainer: {
    width: viewportWidth,
    height: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  arrowContainer: {
    flexDirection: 'row',
  },

  bottomPicker: {
    width: viewportWidth,
  },

  paddingRight: {
    paddingRight: 20
  },

  paddingLeft: {
    paddingLeft: 20
  },

  textStyle: [
    flex_1,
    fontSizeNormalStyle,
    bold
  ],
  modalFontStyleNew: {
    fontSize: theme.fontSizeLarge,
    color: theme.darkBlue,
    paddingTop: theme.cardVerticalSpacing,
    paddingBottom: theme.cardVerticalSpacing,
  },
  textStyleNew: [
    flex_1,
    fontSizeNormalStyle,
    bold, {
      color: theme.darkBlue
    }
  ],
  arrowDownStyleNew: {
    color: theme.darkBlue,
    paddingRight: 15
  },
};
