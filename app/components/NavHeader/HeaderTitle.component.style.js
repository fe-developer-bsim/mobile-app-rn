import {StyleSheet, Platform} from 'react-native';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default StyleSheet.create({
  title: {
    color: 'white',
    paddingHorizontal: 10,
    fontSize: theme.fontSizeMedium,
    marginHorizontal: 10
  },
  titleBlack: {
    color: 'black',
    paddingHorizontal: 10,
    fontSize: theme.fontSizeMedium,
    marginHorizontal: 10,
  },
  titleRed: {
    color: theme.red,
    paddingHorizontal: 10,
    fontSize: theme.fontSizeMedium,
    marginHorizontal: 10
  },
  titleWhite: {
    color: theme.white,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  titleWhiteBold: {
    color: theme.white,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingRight: 50,
    paddingTop: 10,
  },
  tittleTrf: {
    color: theme.white,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  titleSplitbill: {
    fontSize: 20,
    color: theme.white,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingRight: width / 10,
  },
  titleWhiteRemittance: {
    color: theme.white,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingRight: Platform.OS === 'ios' ? 10 : 20
  },
  titleWhiteMSIG: {
    color: theme.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 15,
    alignSelf: 'center',
    width: width / 1.5,
  },
  tittleEtax: {
    color: theme.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    alignSelf: 'center',
    width: Platform.OS === 'ios' ? width : width,
    left: Platform.OS === 'ios' ? 0 : 15,
    textAlign: 'center'
  },
  headerCenter: {
    width: width / 1.6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  etaxHeader: {
    width: width / 1.6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  padLeft: {
    color: theme.white,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingLeft: Platform.OS === 'ios' ? 0 : 40
  },
  tittleTrfQR: {
    color: theme.white,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingLeft: Platform.OS === 'ios' ? 0 : 40
  }
});
