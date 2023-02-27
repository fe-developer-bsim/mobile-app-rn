import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window'); 
export default {
  inputContainer: {
    borderBottomColor: theme.brand,
    borderBottomWidth: 1,
    alignSelf: 'center',
    paddingTop: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 5
  },
  childText: {
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightRegular,
    color: theme.black
  },
  redChildText: {
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightRegular,
    color: theme.red
  },
  childComponent: {
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    width: width
  },
  titleText: {
    textAlign: 'left',
    color: theme.black,
    fontSize: theme.fontSizeExtraXL,
  },
  container: {
    width: width,
    height: 270,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    backgroundColor: theme.white
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
    paddingHorizontal: 0,
    width: width,
    paddingRight: 0,
  },
  icon: {
    color: theme.red,
    alignSelf: 'flex-end',
    paddingHorizontal: 20
  }
};
