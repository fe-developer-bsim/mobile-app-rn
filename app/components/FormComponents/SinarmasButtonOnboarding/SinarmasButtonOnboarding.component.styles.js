import {theme} from '../../../styles/core.styles';

export default {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 47
  },
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 47
  },
  secondaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 15,
    backgroundColor: theme.white,
    borderWidth: 2,
    borderColor: theme.brand,
    height: 47
  },
  linkButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: theme.white,
    height: 47
  },
  primaryButtonText: {
    fontSize: theme.fontSizeMedium,
    color: theme.black
  },
  secondaryButtonText: {
    fontSize: theme.fontSizeMedium,
    color: theme.black
  },
  linkButtonText: {
    fontSize: theme.fontSizeMedium,
    color: theme.brand
  },
  primaryButtonDisabled: {
    backgroundColor: theme.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 47
  },
  secondaryButtonDisabled: {
    borderColor: theme.white,
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 47
  },
  linkButtonDisabled: {
    backgroundColor: theme.white,
  },
  linkButtonTextDisabled: {
    color: theme.buttonDisabledBg,
  }
};
