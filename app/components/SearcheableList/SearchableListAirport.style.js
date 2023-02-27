import {fontSizeNormalStyle, bold, containerWhiteStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
export default {
  container: {flex: 1},
  scrollViewContent: [containerWhiteStyle, {flex: 1}],
  pickPayeeHeader: [fontSizeNormalStyle, bold],
  inputContainer: {
    flexDirection: 'row',
    paddingBottom: 30,
    borderBottomWidth: theme.separatorSize,
    borderBottomColor: theme.separatorColor
  },
  input: {
    flex: 1,
    paddingLeft: 20
  },
  inputWithPaddingHorizontal: {
    flex: 1,
    paddingHorizontal: 20
  },
  NButton: {
    paddingRight: 20
  },
  ErrorTextIndicator: {
    paddingHorizontal: 20
  },
  inputHeader: [fontSizeNormalStyle, bold],
  listHeader: [fontSizeNormalStyle, bold, {paddingVertical: 20, paddingHorizontal: 20}]
};
