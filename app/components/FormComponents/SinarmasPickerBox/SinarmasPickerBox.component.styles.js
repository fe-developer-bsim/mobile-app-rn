import {theme} from '../../../styles/core.styles';

export default {
  container: {
    justifyContent: 'center',
    borderColor: 'grey',
    paddingHorizontal: 20
  },
  texLabelTop: {
    fontSize: 12,
    color: 'black',
    marginBottom: -15
  },
  arrowDownStyle: {
    transform: [{rotate: '90deg'}],
    position: 'absolute',
    right: 0,
    bottom: 10,
    color: 'black',
  },
  iosPickerBackgroundColor: {
    backgroundColor: theme.white
  },
  box: {
    borderWidth: 1,
    borderRadius: 10,
    color: theme.grey
  }
};
