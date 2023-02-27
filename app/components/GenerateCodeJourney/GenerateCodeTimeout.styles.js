import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

export default {
  containerWhite: {
    backgroundColor: theme.white,
    height: height,
  },
  buttonFinish: {
    backgroundColor: theme.red,
    marginHorizontal: 20,
  },
  buttonText: {
    color: theme.white,
    fontSize: 18,
  },
  containerButtonX: {
    alignItems: 'flex-end',
    paddingTop: 20
  },
  viewImageSand: {
    alignItems: 'center',
    marginTop: 130,
  },
  viewImageSand2: {
    alignItems: 'center',
    marginTop: 150,
  },
  codeText: {
    fontWeight: 'bold',
    fontSize: 30
  },
  imageSand: {
    width: width * 40 / 100,
    height: width * 77 / 100,
  },
  buttonX: {
    paddingHorizontal: 20
  },
  buttonTextX: {
    color: theme.red,
    alignItems: 'center',
    fontSize: 20
  },
  expiredText: {
    paddingVertical: 20,
    fontSize: 20,
    color: theme.black,
    fontWeight: 'bold'
  },
  buttonBottom: {
    backgroundColor: theme.white,
    paddingBottom: 50
  },
  closeIcon: {
    paddingTop: 30,
    color: theme.black
  }
};
