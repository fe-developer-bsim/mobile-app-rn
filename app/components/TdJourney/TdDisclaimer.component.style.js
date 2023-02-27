import {theme} from '../../styles/core.styles';
import {fontSizeXLStyle, flex_1} from '../../styles/common.styles';

export default {
  containerContent: {
    alignItems: 'stretch',
    flexGrow: 1,
    borderWidth: 1,
    borderColor: theme.grey,
  },
  formContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20
  },
  button: {
    margin: 20
  },
  title: [
    fontSizeXLStyle,
    {
      marginVertical: 10
    }
  ],
  field: {
    padding: 10
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  number: {
    flex: 0,
    marginHorizontal: 10
  },
  footNoteList: flex_1
};
