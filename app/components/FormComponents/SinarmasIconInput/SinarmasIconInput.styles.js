import {theme} from '../../../styles/core.styles';

export default {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    marginTop: 10,
    color: theme.textLightGrey,
    width: 40
  },
  inputWrapper: {
    flex: 1
  },
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderColor: theme.brand,
    backgroundColor: 'transparent',
  },
  inputStyles: {
    paddingVertical: 5,
    paddingHorizontal: 0
  },
  disabledIcon: {
    color: theme.softGrey
  }
};
