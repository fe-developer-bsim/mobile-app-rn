import {theme} from '../../styles/core.styles';

export default {
  container: {
    padding: 15,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    flex: 1,
    height: 170,
    borderColor: theme.disabledGrey,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkText: {
    color: theme.black,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'roboto'
  },
  imageContainer: {
    minHeight: 195,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 7
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
    justifyContent: 'center'
  },
  addCreditCard: {
    color: theme.primary
  },
  linkImage: {
    flex: 1
  },
  iconStyle: {
    color: theme.brand
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
    backgroundColor: theme.transparent
  },
  textContainer: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: theme.transparent
  }
};
