import {theme} from '../../styles/core.styles';

export default {
  wrapper: {
    flex: 1,
  },
  mainTextWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: theme.alignItems,
    paddingHorizontal: 30,
    backgroundColor: 'transparent'
  },
  text: {
    color: theme.black,
    fontSize: theme.fontSizeXL,
    paddingBottom: 100
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'space-between'
  },
  flex: {
    flex: 1
  },
  mainbutton: {
    borderWidth: 2,
    borderColor: theme.red,
    borderRadius: 50
  },
  secondButton: {
    borderWidth: 2,
    borderColor: theme.red,
    borderRadius: 50,
  },
  contentText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: theme.fontSizeSmall,
    color: theme.black
  },
  textTerm: {
    textAlign: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    textDecorationLine: 'underline',
    fontSize: theme.fontSizeSmall,
    color: theme.black
  },
  container: {
    flex: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  topContainer: {
    flexDirection: 'row',
  },
  bankLogoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1
  },
  footerContainer: {
    paddingBottom: 20,
  }
};
