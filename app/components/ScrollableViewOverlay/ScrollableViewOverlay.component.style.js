import {theme} from '../../styles/core.styles';

export default {
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: theme.overlayBackground
  },
  scroller: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
