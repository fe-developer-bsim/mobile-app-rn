import {theme} from '../../../styles/core.styles';

export default {
  container: {
    justifyContent: 'center',
    borderColor: theme.grey,
    paddingHorizontal: 20,
    paddingRight: 30
  },
  texLabelTop: {
    fontSize: 12,
    color: 'black',
    marginBottom: -15,
  },
  texLabelTopRemittance: {
    fontSize: 12,
    color: theme.darkBlue,
    marginBottom: -15
  },
  arrowDownStyle: {
    transform: [{rotate: '90deg'}],
    position: 'absolute',
    right: 0,
    bottom: 10,
    color: 'black',
  },
  arrowDownStyleRemittance: {
    transform: [{rotate: '90deg'}],
    position: 'absolute',
    right: -20,
    bottom: 20,
    color: theme.darkBlue,
  },
  iosPickerBackgroundColor: {
    backgroundColor: theme.white
  },
  box: {
    borderWidth: 1,
    borderRadius: 10,
    color: theme.grey,
  },
};
