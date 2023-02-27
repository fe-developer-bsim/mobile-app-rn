import * as styles from '../../styles/common.styles';
import {viewportWidth} from '../../utils/device.util';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {height} = Dimensions.get('window');

export default {
  itemContainer: {
    alignItems: 'center',
    height: 50,
    width: (viewportWidth - styles.contentContainerStyle.padding * 3 - 2) / 4,
    marginBottom: 1,
    marginTop: 10,
    marginRight: 4
  },
  icon: {
    alignSelf: 'center',
    width: 40,
    height: 40,
  },
  textContainer: {
    alignSelf: 'center',
    width: (viewportWidth - styles.contentContainerStyle.padding * 3 - 2) / 4,
    height: 20,
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 5
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
  },


  styleCaption: [
    styles.fontSizeSmallStyle,
  ],

  iconStyle: {
    color: theme.black,
  },
  tabIcon: {
    paddingBottom: 5,
  },
  touchableRow: {
    alignItems: 'center',
    height: height / 6,
    borderColor: 'transparent',
    flex: 0.5,
    borderWidth: 0.5,
    paddingVertical: 10,
  },
  pictureIcon: {
    width: 50,
    height: 50,
  }
};
