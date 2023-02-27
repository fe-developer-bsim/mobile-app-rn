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
    color: theme.brand,
    transform: [{rotate: '180deg'}],
  },
  arrowWhite: {
    color: theme.black,
    transform: [{rotate: '180deg'}],
  },
  arrowBlack: {
    color: theme.black,
    transform: [{rotate: '180deg'}],
  },
};
