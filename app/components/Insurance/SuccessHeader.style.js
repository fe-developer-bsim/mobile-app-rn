
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  mainTitleLogo: {
    width: 150,
    height: 30,
    marginTop: 30,
    resizeMode: 'contain',
    paddingVertical: 20,
  },
  transactionDate: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    marginTop: 30,
    marginRight: 20,
    color: theme.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  ph20: {
    paddingHorizontal: 20
  },
  mainTitle: {
    paddingVertical: 20,
    maxWidth: (65 * width - 30) / 100,
  },
  successHeader: {
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
    color: theme.black,
  },
  transrefnum: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    paddingTop: 30,
    color: theme.black,
  },
  logoSuccess: {
    paddingTop: 30,
    color: theme.green
  },
  logoFail: {
    paddingTop: 30,
    color: theme.grey
  },
  borderGreyTop: {
    backgroundColor: theme.greyLine,
    height: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },  
};