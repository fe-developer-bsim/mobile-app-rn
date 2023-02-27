import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  container: {flex: 1, backgroundColor: theme.superlightGrey},
  containerContent: [{justifyContent: 'space-between'}],
  contentContainer: {
    backgroundColor: theme.superlightGrey,
  },
  top: {
    alignItems: 'center',
    height: hp('25%'),
  },
  mid: {
    paddingHorizontal: 20,
    flex: 1
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 5 : height / 10,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  containerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    position: 'absolute',
    marginVertical: Platform.OS === 'ios' ? width * 0.27 : 0.27,
    borderRadius: 15,
    width: width * 0.9,
    top: 20,
    flex: 1
  },
  containerLeft: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20
  },
  containerLeftDetail: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    height: 150
  },
  bottomButton: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.white,

  },
  halfWidth: {
    flex: 1
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.darkBlue,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center'
  },
  detailSubTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.darkBlue,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    borderWidth: 0.3,
    flex: 1,
    height: 1,
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  detail: {
    flexDirection: 'column',
    marginVertical: 10
  },
  detailNum: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.superlightGrey,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  detailInsideSource: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.superlightGrey,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    width: width * 0.8,
  },
  detailInsideIns: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.superlightGrey,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  detailIns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailInsideName: {
    alignItems: 'flex-start',
    width: width * 0.35,
  },
  detailInsideAmt: {
    alignItems: 'flex-end',
    width: width * 0.35,
  },
  detailText: {
    fontSize: 15,
    color: theme.darkBlue,
    marginVertical: 3,
  },
  detailTextB: {
    fontSize: 20,
    color: theme.darkBlue,
    marginVertical: 3,
  },
  detailTextCall: {
    fontSize: 20,
    color: theme.pinkBrand,
    marginVertical: 3,
  },
  detailTextAdd: {
    fontSize: 15,
    color: theme.darkBlue,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.darkBlue,
  },
  rightItemContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10
  },
  senderDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  greyDot: {
    color: theme.grey,
    marginLeft: 15,
    marginBottom: 5
  },
  sendAccNumber: {
    fontWeight: 'bold',
    fontSize: 15,
    color: theme.darkBlue
  },
  sendAccName: {
    color: theme.black,
    fontWeight: 'bold',
    fontSize: 15,
  },
  sendAccType: {
    color: theme.softGrey,
    fontSize: 15,
  },
  profileIcon: {
    color: '#0787e3',
    paddingRight: 5,
    marginLeft: 15
  },
  walletIcon: {
    width: 50,
    height: 50
  },
  boxAddInfo: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#7B7F9E',
    borderWidth: 1,
    height: 60
  },
  successIcon: {
    color: theme.green,
    alignSelf: 'center'
  },
  shareButton: {
    backgroundColor: theme.white,
    width: 150,
    borderRadius: 40,
    paddingVertical: 20,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareText: {
    color: theme.darkBlue,
    marginRight: 40,
  },
  insideButton: {
    flexDirection: 'row',
  },
  shareIconSize: {
    flex: 1,
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  doneButton: {
    backgroundColor: theme.darkBlue,
    width: 150,
    borderRadius: 40,
    paddingVertical: 20,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  doneText: {
    color: theme.white,
  },
  bottom: {
    paddingHorizontal: 2,
    paddingVertical: 20,
    flex: 1
  },
  containerBottomDetail: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 420,
    alignSelf: 'center',
  },
};
