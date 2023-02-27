import {theme} from '../../styles/core.styles';
import {buttonLargeTextStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  columnContainer: {
    flex: 1,
  },
  label: {
    fontSize: theme.fontSizeSmall
  },
  input: {
    fontSize: theme.fontSizeXL,
    textAlign: 'center',
    paddingVertical: 5,
    height: 60,
  },
  errorContainer: {
    paddingVertical: theme.padding,
  },
  passwordFieldsContainer: {
    flexDirection: 'column'
  },
  centerQR: {
    alignItems: 'center',
    paddingVertical: 100
  },
  releaseTitle: {
    fontSize: theme.fontSizeXL,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20
  },
  releaseText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 17
  },
  picture: {
    alignSelf: 'center',
    width: ((width - 40) * 0.69),
    height: ((width - 40) * 0.6),
    marginVertical: 20,
    marginTop: 50
  },
  eyeIconStyle: {position: 'absolute', width: 30, right: 5, top: 30},
  button: [
    buttonLargeTextStyle
  ]


};
