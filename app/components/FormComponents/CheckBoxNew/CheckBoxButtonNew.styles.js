import {theme} from '../../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  optionStyle: {
    flexDirection: 'row',
    paddingTop: 10
  },
  buttonStyle: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: theme.brand,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonActive: {
    height: 12,
    width: 12,
    backgroundColor: theme.brand
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textStyle: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5
  },
  subtextStyle: {
    fontSize: theme.fontSizeSmall,
    paddingRight: 5
  },
  webViewContainer: {
    paddingLeft: 20,
  },
  webViewStyle: {
    height: 90,
  },
  halfWidth: {
    width: (width - 40) / 2
  },
  renderContainerRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  }
};
