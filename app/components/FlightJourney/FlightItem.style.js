import {theme} from '../../styles/core.styles';
import {flexRow, fontSizeMediumStyle, fontSizeLargeStyle, fontSizeNormal, textLightGreyStyle, bold, textLightBlackStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: [{
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
    alignSelf: 'center',
    flex: .5,
    height: 40,
    width: 40,
    justifyContent: 'center',
    backgroundColor: theme.transparent
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: width,
  },
  transactionHeading: [{
    paddingBottom: 5,
  },
  fontSizeNormal,
  bold
  ],
  transactionDate: [
    fontSizeMediumStyle,
    textLightGreyStyle, {
      paddingHorizontal: 20,
    }
  ],

  iconDetail: {
    color: theme.black
  },
  itemContainer: {
    flexDirection: 'column',
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 10,
    paddingVertical: 10,
    maxWidth: Platform.OS === 'ios' ? width : width,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: theme.white,
    borderColor: theme.borderGrey,
    borderWidth: 5,
    justifyContent: 'center'
  },
  disabledItemContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: width,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: theme.grey,
    borderColor: theme.borderGrey,
    borderWidth: 5,
    justifyContent: 'center'
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingBottom: 0,
    width: width,
    paddingVertical: 10,
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: width,
    paddingVertical: 10,
  },
  belowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    paddingTop: 5,
    marginLeft: 0
  },
  image: {
    height: 40,
    width: 40,
    backgroundColor: theme.transparent,
    marginRight: 40,
  },
  headerFlight: {
    width: width / 3,
    height: 20,
  },
  totalTime: {
    width: width / 3,
    height: 20,
    paddingHorizontal: 30,
  },
  departTime: {
    alignItems: 'center',
  },
  arrriveTime: {
    alignItems: 'center',
  },
  fare: {
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    flexDirection: 'column'

  },
  textDetail: {
    color: theme.red,
    fontSize: theme.fontSizeMedium,
  },
  arrow: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  textFare: [
    bold,
    textLightBlackStyle, {
      fontSize: theme.fontSizeMedium
    }
  ],
  textFareDisplay: [
    bold,
    textLightBlackStyle,
    fontSizeLargeStyle, {
      paddingHorizontal: 20
    }
  ],
  detail: {
    paddingHorizontal: Platform.OS === 'ios' ? 40 : 60,
    alignItems: 'flex-end'
  },
  transit: {
    paddingHorizontal: 30,
  }




};
