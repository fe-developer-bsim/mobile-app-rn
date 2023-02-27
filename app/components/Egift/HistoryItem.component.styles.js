import {theme} from '../../styles/core.styles';
import {flexRow, fontSizeSmallStyle, fontSizeNormal, textLightGreyStyle, bold} from '../../styles/common.styles';


export default {
  container: [{
    paddingVertical: 0,
    flex: 1,
  },
  flexRow,
  ],
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
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: 20,
  },
  icon: {
    paddingRight: 10,
    marginVertical: 23,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: .4,
    backgroundColor: theme.superlightGrey,
  },
  imageContainer: {
    paddingTop: 20,
    paddingLeft: 5,
  },
  detailsContainer: {
    justifyContent: 'center',
    flex: 3,
    paddingRight: 15,
    paddingHorizontal: 10,
    backgroundColor: theme.white,
  },
  detailContainer: {
    justifyContent: 'center',
    flex: 3,
    paddingRight: 5,
    paddingHorizontal: 10,
  },
  transactionHeading: [{
    paddingBottom: 5,
    fontSize: 11,
  },
  bold
  ],
  descriptionHeading: [{
    paddingBottom: 5,
  },
  fontSizeNormal,
  bold
  ],
  billerName: [{
    paddingBottom: 5,
  },
  fontSizeNormal
  ],
  transactionDate: [{
    paddingTop: 1,
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
  iconSuccess: {
    fontFamily: 'roboto',
    color: theme.darkGreen,
    fontWeight: theme.fontWeightNormal,
    transform: [{rotate: '180deg'}],
  },
  iconFailure: {
    fontFamily: 'roboto',
    color: theme.radicalRed,
    fontWeight: theme.fontWeightNormal,
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
    paddingHorizontal: 10,
  },
  poinImage: {
    height: 35,
    width: 35,
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    flex: 1,
    height: 1,
    marginVertical: 10
  },
  amountRefund: [{color: theme.text}, fontSizeNormal],
  
};
