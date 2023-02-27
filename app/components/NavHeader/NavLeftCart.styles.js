import {theme} from '../../styles/core.styles';

export default {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  burger: {
    color: theme.black
  },
  iconContainer: {
    paddingRight: 10
  },
  cartRed: {
    borderRadius: 15,
    height: 10,
    width: 10,
    overflow: 'hidden',
    backgroundColor: theme.brand,
    position: 'absolute',
    top: 5,
    right: 3,
    zIndex: 1
  },
  headerContainer: {
    width: 280,
    alignItems: 'center',
  },
  rowIcon: {
    flexDirection: 'row',
  },
  iconQr: {
    paddingRight: 5
  }
};
