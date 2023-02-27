import {theme} from '../../styles/core.styles';

export default {
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  amount: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'Roboto',
    fontWeight: theme.fontWeightMedium,
    color: theme.brand
  },
  error: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
    color: theme.brand
  },
  iconStyle: {
    color: theme.brand
  },
  loading: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
    color: theme.textGrey
  },
  imageContainer: {
    paddingTop: 2
  },
  poinImage: {
    height: 14,
    width: 35
  },
};
