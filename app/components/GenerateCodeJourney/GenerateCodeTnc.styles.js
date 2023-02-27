import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default {
  containerWhite: {
    backgroundColor: theme.white
  },
  buttonFinish: {
    backgroundColor: theme.red,
    marginHorizontal: 20,
  },
  containerCode: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 20 / 100
  },
  containerText: {
    paddingHorizontal: 20,
    height: height * 50 / 100
  },
  containerBottom: {
    height: height * 20 / 100
  },
  bgTnc: {
    backgroundColor: theme.greyLine,
    alignItems: 'center',
    marginTop: 10
  },
  textTnc: {
    paddingVertical: 10,
    lineHeight: 20
  },
  buttonText: {
    color: theme.white
  },
  bottonContainer: {
    marginVertical: 20,
  },
  fastCodeIcon: {
    color: theme.red,
  }
};
