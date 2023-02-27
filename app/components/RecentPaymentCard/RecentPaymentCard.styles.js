import {theme} from '../../styles/core.styles';
import {bold, fontSizeSmallStyle} from '../../styles/common.styles';

export default {
  card: {
    paddingBottom: 0,
  },
  upperHalf: {
    paddingBottom: 10,
  },
  areaCode: [{
    textAlign: 'right'
  }, bold, fontSizeSmallStyle],
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomHalf: {
    paddingVertical: 10
  },
  status: {
    paddingBottom: 5,
    color: theme.errorColor
  },
  cardStyle: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: '#DDD'
  }
};
