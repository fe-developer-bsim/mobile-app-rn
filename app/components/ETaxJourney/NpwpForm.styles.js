import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  mt20: {
    marginTop: 20
  },
  mt15: {
    marginTop: 15
  },
  mt10: {
    marginTop: 10
  },
  marginTop: {
    marginTop: 20
  },
  footer: {
    marginTop: 20,
    height: 70
  },
  h10Left: {
    height: 70,
    width: width * 0.45,
  },
  h10Right: {
    height: 70,
    width: width * 0.45,
  },
  textPickerStyle: {
    marginTop: 20,
  },
  pickerStyle: {
    paddingVertical: 10,
    color: theme.darkBlue,
    marginHorizontal: 10
  },
  bottomContainer: {
    marginTop: 15
  },
  bottomText: {
    color: theme.darkBlue,
    marginHorizontal: 20,
    fontWeight: 'bold'
  },
  dateContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
};