import {theme} from '../../styles/core.styles';

export default {
  input: {
    fontSize: theme.fontSizeXL,
    textAlign: 'center',
    paddingVertical: 5,
    height: 60,
  },
  inputContainer: {
    borderBottomColor: theme.brand,
    borderBottomWidth: 1,
    alignSelf: 'center',
    paddingTop: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 5
  },
  subTextNotification: {
    color: theme.red,
    paddingHorizontal: 10,
  },
  mainTitle: {
    padding: 5
  },
  mainTitleResetPin: {
    fontSize: 12,
  },
  appLogoeasypin: {
    width: 22,
    height: 22,
    marginLeft: 5,
    marginTop: 5
  },
  appLogoquestion: {
    width: 15,
    height: 15,
    marginTop: 15,
    marginRight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  mainTitleAttempts: {
    justifyContent: 'center',
    padding: 5,
    alignItems: 'flex-start',
  },
  mainTitleAttemptstext: {
    color: theme.grey,
    fontSize: theme.fontSizeSmall,
    textAlign: 'center',
    paddingHorizontal: 50
  },
  easyPinText: {
    padding: 5,
    color: theme.grey,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall,
  },
  resetEasyPinText: {
    padding: 5,
    textAlign: 'center',
    color: theme.red,
    fontSize: theme.fontSizeSmall,
  },
  mainTitleInfoEasyPin: {
    textAlign: 'center',
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    paddingLeft: 45
  },
  rowEasyPIN: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14
  },
};
