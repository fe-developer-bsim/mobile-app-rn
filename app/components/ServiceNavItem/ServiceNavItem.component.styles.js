import * as styles from '../../styles/common.styles';
import {viewportWidth} from '../../utils/device.util';
import {theme} from '../../styles/core.styles';

export default {
  itemContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: (viewportWidth - styles.contentContainerStyle.padding * 2 - 2) / 4,
    // backgroundColor: 'yellow',
    marginBottom: 1,
    marginTop: 15,
  },
  itemContainerDisabled: {
    // justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: (viewportWidth - styles.contentContainerStyle.padding * 2 - 2) / 4,
    marginBottom: 1,
    marginTop: 15,
    backgroundColor: theme.lightGrey
  },
  icon: {
    alignSelf: 'center',
    width: 40,
    height: 40,
  },
  textContainer: {
    alignSelf: 'center',
    width: (viewportWidth - styles.contentContainerStyle.padding * 2 - 2) / 4,
    height: 30,
    justifyContent: 'center'
  },
  enable: {
    color: theme.black,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall
  },
  disable: {
    color: theme.grey,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall
  }
};
