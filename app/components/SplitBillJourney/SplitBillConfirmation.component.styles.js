import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import {bold} from '../../styles/common.styles';

export default {
  containerHead: {
    flex: 1
  },
  topSplitBill: {
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 20,
    alignContent: 'stretch'
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  containerDistributionMethod: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  fieldContainer: {
    borderRadius: 50,
    borderColor: theme.grey,
    borderWidth: 50,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  stretch: {
    justifyContent: 'space-between',
  },
  container: {
    padding: 10,
    backgroundColor: theme.white,
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20
  },
  fieldAmount: {
    justifyContent: 'center'
  },
  distributionButton: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: theme.brand,
    borderColor: theme.white,
    paddingHorizontal: 10,
  },
  distributionButtonGrey: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: theme.white,
    borderColor: theme.grey,
    paddingHorizontal: 10,
  },
  paddingVer10: {
    paddingVertical: 10
  },
  headerMember: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 40
  },
  containerByAmout: {
    paddingLeft: 10,
  },
  memberContainer: {
    marginLeft: 10,
    flex: Platform.OS === 'ios' ? 1 : 0,
  },
  memberContainerAddNew: {
    marginLeft: 10,
    flex: 0
  },
  containerMember: {
    paddingLeft: 155,
  },
  memberSelectedContacts: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightBold,
    color: theme.darkBlue
  },
  contactName: [bold, {
    color: theme.darkBlue,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto'
  }],
  contactPhone: {
    color: theme.blueSoftSplitBill,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightRegular,
    fontFamily: 'roboto'
  },
  containerParticipants: {
    marginRight: 10,
    flex: Platform.OS === 'ios' ? 1 : 0
  },
  containerParticipantsEqual: {
    marginRight: 10,
  },
  containerFieldByAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: Platform.OS === 'ios' ? 10 : 0
  },
  labelRp: {
    paddingTop: 10,
  },
  labelIDR: {
    paddingVertical: 18,
    backgroundColor: theme.green,
    paddingHorizontal: 20,
    borderRadius: 100
  },
  labelIDR2: {
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    fontWeight: theme.fontWeightBold
  },
  countParticipants: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightLight,
    color: theme.blueSoftSplitBill,
    paddingLeft: 5
  },
  equalText: {
    color: theme.white,
  },
  equalText2: {
    color: theme.grey,
  },
  amountText: {
    color: theme.grey,
  },
  amountText2: {
    color: theme.white,
  },
  addNewParticipant: {
    paddingHorizontal: 10,
  },
  containerAddNewParticipant: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconStore: {
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  store: {
    color: theme.darkBlue,
  },
  addNewParticipantText: [bold, {
    color: theme.darkBlue,
    fontFamily: 'roboto',
  }],
  buttonSplitBill: {
    paddingHorizontal: 20,
    backgroundColor: theme.superlightGrey
  },
  buttonSpacing: {
    marginVertical: 10
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  buttonLargeTextStyle: {
    color: theme.white,
  },
  groupCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.whiteGrey,
    marginHorizontal: width * -0.028,
    paddingVertical: 20,
    marginTop: 20
  },
  remainingBill: {
    marginLeft: 20,
  },
  counterBill: {
    marginRight: 20,
  },
  splitBillRemaining: [bold, {
    fontSize: theme.fontSizeNormal,
    color: theme.darkBlue,
  }],
  splitBillValidaton: {
    fontSize: theme.fontSizeNormal,
    color: theme.brand,
  },
  objData: {
    paddingTop: 5,
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderColor: theme.greyLine,
    marginBottom: 10,
    alignItems: 'center'
  },

  cameraIconStyle: {
    position: 'absolute', 
    width: 25, 
    right: 10, 
    top: 25,
  },
  errIcon: {
    color: theme.brand,
    marginRight: 5,
    paddingTop: 2
  },
  redText: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: 'Roboto',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    marginTop: 2,
  },
  rowMember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginLeft: 10,
  },
  destinationContainer: {
    marginTop: 10
  },
  wrapContainer: {
    flexGrow: 1
  },
  containerContent: [{justifyContent: 'space-between', flexGrow: 1, paddingBottom: 50}],
  billAmountText: {
    color: theme.black,
    fontFamily: 'Roboto',
  },
  iconEditAmount: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 18,
    paddingLeft: 20,
    color: theme.black
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 10,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * 0.2
  },
  containerBanner: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  containerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    position: 'absolute',
    marginHorizontal: 0,
    marginVertical: Platform.OS === 'ios' ? width * 0.27 : width * 0.22,
    borderRadius: 15,
    top: width * -0.2
  },
  containerInnerBox: {
    marginTop: 5,
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white
  },
  centerRevamp: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.superlightGrey
  },
  containerContentRevamp: [{justifyContent: 'space-between', flexGrow: 1, paddingBottom: 20}],
  containerRevamp: {
    flex: 1,
    backgroundColor: theme.superlightGrey,
  },

  containerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40
  },
  backgroundColor2: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 10,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * 0.4,
    position: 'absolute',
  },
  dateText: {
    color: theme.white,
    marginBottom: 30,
    fontSize: theme.fontSizeLarge,
    marginHorizontal: width * 0.049,
    fontFamily: 'Roboto',
  },
  containerBanner2: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.05,
  },
  contentInnerBox: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  newRpIcon: {
    position: 'absolute', 
    left: 25, 
    top: 25,
    width: 30,
    height: 30
  },
  iconColor: {
    color: theme.darkBlue
  }
};