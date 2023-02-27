import {StyleSheet} from 'react-native';
import {theme} from '../../styles/core.styles';
export default StyleSheet.create({
  navContainer: {
    padding: 10,
  },
  primaryColor: {
    color: theme.primary
  },
  contrastColor: {
    color: 'white'
  },
  blackColor: {
    color: theme.black
  },
  navContainerLogin: {
    padding: 15,
    flexDirection: 'row'
  }

});
