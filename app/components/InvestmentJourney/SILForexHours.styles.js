import {bold, buttonLargeTextStyle, contentContainerStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: theme.white,
    paddingBottom: 20,
  },
  containerContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  nextButton: buttonLargeTextStyle,
  buttonContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  service: {
    alignItems: 'center',
    paddingBottom: 20
  },
  textService: [bold, {
    color: theme.black,
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeMedium,
  }],
  textLater: [bold, {
    color: theme.black,
    fontFamily: 'Roboto',
  }],
  operational: {
    textAlign: 'center',
    paddingBottom: 20
  },
  textoperational: {
    textAlign: 'center',
  },
  successImage: {
    width: width / 2.0,
    height: width / 2.0,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50
  },
  buttonBack: [contentContainerStyle],
};