import {theme} from '../../styles/core.styles';

export default {
  card: {
    flexGrow: 1,
    backgroundColor: theme.contrast,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingHorizontal: 15,
    padding: 10
  }
};