import {theme} from '../../styles/core.styles';

export default {
  cardFooter: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: -10
  },
  button: {
    height: 30
  },
  buttonText: {
    color: theme.buttonTextColor,
    fontSize: theme.fontSizeSmall
  },
  leftWrapper: {
    flex: 1
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10
  },
  date: {
    fontSize: theme.fontSizeSmall
  },
  billerName: {
    fontSize: theme.fontSizeLarge,
    paddingRight: 20
  }
};
