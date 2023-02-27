import {theme} from '../../styles/core.styles';

export default {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    width: 50,
    height: 50
  },
  arrow: {
    color: theme.white,
    transform: [{rotate: '180deg'}],
  },
};
