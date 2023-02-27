import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: {flex: 1, backgroundColor: theme.white},

  containerContent: [{
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    paddingBottom: 30,
    backgroundColor: theme.superlightGrey}
  ],
  rightItemContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  containerLeft: {
    flexDirection: 'row',
    paddingVertical: 20,
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  optionText: [styles.fontSizeMediumStyle],
  paddingContent: {
    paddingHorizontal: 20,
  },
  summaryArea: {
    borderBottomWidth: 0.7,
    borderColor: theme.grey,
    marginVertical: 10,
    marginHorizontal: 20,
  },
};
