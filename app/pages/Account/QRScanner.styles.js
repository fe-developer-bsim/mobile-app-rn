import {theme} from '../../styles/core.styles';
import {fontSizeLargeStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  headerText: [fontSizeLargeStyle,
    {
      fontWeight: theme.fontWeightLight,
      color: theme.black,
    }],
  iconSize: {
    height: 50,
    width: 100
  },
  iconBottom: {
    marginHorizontal: 10,
  },
  textBottom: {
  },
  bottomIcon: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 200
  },
  container: {
    width: width,
  },
  topStyle: {
    backgroundColor: theme.white,
    width: width,
    alignItems: 'center',
    zIndex: 1,
    paddingVertical: 10
  },
  botStyle: {
    backgroundColor: theme.white,
    width: width,
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'row',
  },
};
