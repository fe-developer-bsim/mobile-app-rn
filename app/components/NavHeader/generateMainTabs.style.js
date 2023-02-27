import {theme} from '../../styles/core.styles';

export default {
  textRed: {
    color: theme.brand,
    fontWeight: theme.fontWeightMedium
  },
  textRedWithMT: {
    color: theme.brand,
    fontWeight: theme.fontWeightMedium,
    marginLeft: 19,
    marginTop: 24
  },
  circleShine: {
    backgroundColor: theme.white,
    borderRadius: 50,
    width: 85,
    height: 85,
    justifyContent: 'center',
    right: -10,
    top: -2
  },
  outerCircle: {
    backgroundColor: theme.darkGrey,
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    right: -40,
    top: -10
  },
  iconScan: {
    height: 50,
    width: 50,
    borderRadius: 20,
  },
  pictureIcon: {
    height: 100,
    width: 100,
    right: 25,
    bottom: 40
  },
};
