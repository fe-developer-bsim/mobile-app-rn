import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle} from '../../styles/common.styles';

export default {
  container: {
    padding: 15,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderWidth: 3,
    height: 170,
    borderRadius: 5,
    borderColor: theme.darkGrey,
    flexDirection: 'column'
  },
  red: theme.brand,
  spinner: theme.spinnerSizeLarge,
  textContainer: {
    borderWidth: 3,
    borderRadius: 30,
    borderColor: theme.brand,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  refreshText: [
    fontSizeMediumStyle,
    {
      paddingVertical: 10,
      color: theme.brand,
      alignSelf: 'center',
      textAlign: 'center'
    }
  ],
};
