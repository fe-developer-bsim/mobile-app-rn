import {theme} from '../../../styles/core.styles';

export default {
  container: {
    justifyContent: 'center',
    marginBottom: 10,
    height: 50,
    backgroundColor: theme.contrast,
    borderColor: 'grey',
    borderBottomWidth: 0.5,
  },
  texLabelTop: {
    fontSize: 12,
    color: 'black',
    marginBottom: -10
  },
  arrowDownStyle: {
    transform: [{rotate: '90deg'}],
    alignItem: 'center',
    color: 'black',
  },
  iosPickerBackgroundColor: {
    backgroundColor: theme.white
  }
};
