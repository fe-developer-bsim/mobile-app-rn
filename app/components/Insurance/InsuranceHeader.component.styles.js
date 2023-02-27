import {theme} from '../../styles/core.styles';

export default {
  statusBarRow: {
    flexDirection: 'row',
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: theme.grey,
  },
  header: {
    fontFamily: theme.robotoLight,
  },
  subHeader: {
    fontFamily: theme.roboto,
  },
  iconContainer: {

  },
  icon: {
    color: theme.brand,
  },
  paddingGrey: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: theme.greyLine,
  },
};