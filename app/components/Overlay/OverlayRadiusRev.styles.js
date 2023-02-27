import {theme} from '../../styles/core.styles';
import {fontSizeLargeStyle} from '../../styles/common.styles';

export default {
  wrapperContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: theme.overlayBackground,
    paddingVertical: 150
  },
  contentContainerStyle: {
    flex: 1
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: theme.white,
    padding: 20,
    // borderRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingTop: 0,
  },
  innerContainerTitle: {
    alignItems: 'center',
    backgroundColor: theme.pinkBrand,
    // paddingHorizontal: 160,
    paddingVertical: 30,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  modalStyle: {
    padding: 0,
    margin: 0
  },
  hidderPicker: [fontSizeLargeStyle, {
    color: theme.white,
    alignItems: 'center',
    position: 'absolute',
    paddingVertical: 20,
  }],
};
