import {theme} from '../../styles/core.styles';

export default {
  errIcon: {
    color: theme.brand,
    paddingRight: 5,
    fontSize: theme.fontSizeSmall
  },
  errIconSof: {
    color: theme.brand,
    paddingRight: 25,
    fontSize: theme.fontSizeSmall
  },
  errorText: {
    color: theme.brand,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightMedium
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  errorContainerTax: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    marginLeft: 20
  },
  errorContainerSof: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10
  }
};
