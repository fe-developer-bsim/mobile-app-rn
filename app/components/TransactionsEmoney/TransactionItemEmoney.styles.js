import {theme} from '../../styles/core.styles';
import {flexRow, fontSizeSmallStyle, fontSizeNormal, textLightGreyStyle, bold} from '../../styles/common.styles';


export default {
  container: [{
    paddingVertical: 7.5,
    flex: 1
  },
  flexRow
  ],
  amountContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',

  },
  icon: {
    paddingRight: 20,
    alignSelf: 'center',
    flex: .7
  },
  detailsContainer: {
    justifyContent: 'center',
    flex: 3,
    paddingRight: 5,
  },
  transactionHeading: [{
    paddingBottom: 5,
  },
  fontSizeNormal,
  bold
  ],
  transactionDate: [
    fontSizeSmallStyle,
    textLightGreyStyle
  ],
  statusSuccess: {
    color: theme.green
  },
  statusFailure: {
    color: theme.primaryUnHighlighted
  },
  amount: fontSizeNormal,
  iconSecondPage: {
    alignSelf: 'center',
    paddingLeft: 25,
    paddingRight: 5
  },
  iconDetail: {
    color: theme.black
  }
};
