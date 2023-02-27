import {theme} from '../../styles/core.styles';
import {bold} from '../../styles/common.styles';

export default {
  container: {
    // flex: 1,
    paddingHorizontal: 20
  },
  emptyList: {
    color: theme.grey
  },
  containerRecommend: {
    marginTop: 30,
  },
  styleMessageResult: [
    bold,
    {
      fontSize: 16,
      color: theme.darkBlue,
      marginBottom: 10,
      marginTop: 20
    }
  ],
  styleMessage: [
    bold,
    {
      fontSize: 16,
      color: theme.darkBlue,
      marginBottom: 10
    }
  ],
  serviceItemRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  containerRecentRow: {
    borderColor: theme.disabledGrey,
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  styleMessageSeeAllBiller: {
    textstyle: theme.red,
    color: 'red'
  },
};