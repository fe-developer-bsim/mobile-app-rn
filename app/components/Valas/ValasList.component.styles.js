import {theme} from '../../styles/core.styles';
import {flexRow, fontSizeSmallStyle, fontSizeNormal, textLightGreyStyle, bold} from '../../styles/common.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = (width - 40);

export default {
  container: {
    backgroundColor: theme.white
  },
  containerList: [{
    paddingVertical: 7.5,
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: theme.grey,
    borderTopWidth: 1,
    backgroundColor: theme.containerGrey,
  },
  flexRow
  ],
  amountContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 20
  },
  icon: {
    paddingRight: 20,
    alignSelf: 'center',
    flex: .7
  },
  detailsContainer: {
    justifyContent: 'center',
    paddingRight: 5,
    paddingHorizontal: 10,
    backgroundColor: theme.white,
    borderColor: theme.grey,
    borderWidth: 1,
  },
  detailContainer: {
    flex: 4,
    backgroundColor: theme.white,
    flexDirection: 'row'
  },
  transactionHeading: [{
    paddingBottom: 5,
    fontSize: 11,
  },
  bold
  ],
  descriptionHeading: [
    fontSizeNormal,
  ],
  transactionDate: [{
    paddingTop: 10,
  },
  fontSizeSmallStyle,
  textLightGreyStyle
  ],
  statusSuccess: {
    color: theme.green
  },
  statusFailure: {
    color: theme.primaryUnHighlighted
  },
  amount: [{color: 'green'}, fontSizeNormal],
  iconSecondPage: {
    alignSelf: 'center',
    paddingLeft: 25,
    paddingRight: 5
  },
  iconDetail: {
    color: theme.black,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  poinImage: {
    height: 14,
    width: 35
  },
  amountRefund: [{color: theme.red}, fontSizeNormal, bold],
  content: {
    backgroundColor: 'transparent',
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
  },
  wrapCoupon: {
    alignItems: 'center',
    width: trueWidth / 3,
    marginVertical: -10
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
};
