import {theme} from '../../../styles/core.styles';

export default {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.buttonBg,
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 47
  },
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.buttonBg,
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
  bwButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 15,
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.black,
    height: 47
  },
  drawerLogoutButton: {
    flexDirection: 'row',
    borderRadius: 30,
    paddingHorizontal: 15,
    backgroundColor: theme.white,
    borderWidth: 2,
    borderColor: theme.darkBrand,
    height: 40,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: theme.white
  },
  secondaryButtonText: {
    fontSize: theme.fontSizeMedium,
    color: theme.brand
  },
  bwButtonText: {
    fontSize: theme.fontSizeMedium,
    color: theme.black
  },
  linkButtonText: {
    fontSize: theme.fontSizeMedium,
    color: theme.brand
  },
  primaryButtonDisabled: {
    backgroundColor: theme.buttonDisabledBg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 47
  },
  bwButtonDisabled: {
    backgroundColor: theme.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 47
  },
  secondaryButtonDisabled: {
    borderColor: theme.buttonDisabledBg,
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 47
  },
  linkButtonDisabled: {
    backgroundColor: theme.white,
  },
  linkButtonTextDisabled: {
    color: theme.buttonDisabledBg,
  },
  awButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 15,
    backgroundColor: theme.white,
    height: 47
  },
  awButtonText: {
    fontSize: theme.fontSizeMedium,
    color: theme.darkBlue
  },
};
