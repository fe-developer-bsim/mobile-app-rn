import {theme} from '../../../styles/core.styles';
import {Platform} from 'react-native';

export default {
  container: {
    justifyContent: 'center',
    borderColor: theme.grey,
    paddingHorizontal: 20,
    marginBottom: 5
  },
  texLabelTop: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    marginBottom: -15
  },
  marginLabel: {
    marginTop: 15,
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    marginBottom: -10
  },
  arrowDownStyle: {
    transform: [{rotate: '90deg'}],
    alignSelf: 'flex-end',
    left: 5,
    bottom: 10,
    color: 'black',
  },
  iosPickerBackgroundColor: {
    backgroundColor: theme.white
  },
  box: {
    borderWidth: 1,
    borderRadius: 10,
    color: theme.grey,
    marginVertical: 5
  },
  boxQR: {
    borderWidth: Platform.OS === 'ios' ? 0.5 : 0.2,
    borderRadius: 10,
    color: theme.grey,
    marginVertical: 5
  },
  texLabelTopNew: {
    fontSize: theme.fontSizeSmall,
    color: theme.grey,
    marginBottom: -15,
    paddingVertical: 5
  },
  arrowDownStyleNew: {
    transform: [{rotate: '90deg'}],
    alignSelf: 'flex-end',
    left: 5,
    bottom: 10,
    color: theme.darkBlue,
  },
};
