import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  container: {flex: 1, backgroundColor: theme.superlightGrey},
  containerContent: [{justifyContent: 'space-between'}],
  top: {
    alignItems: 'center',
    minHeight: hp('30%')
  },
  mid: {
    paddingHorizontal: 2,
    flex: 1,
    top: -20
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
    backgroundColor: theme.white,
    marginVertical: Platform.OS === 'ios' ? width * 0.27 : 0.27,
    borderRadius: 15,
    width: width * 0.9,
    top: -40,
    flex: 1
  },
  containerLeft: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    maxHeight: hp('65%'),
    marginBottom: 20,
    flexGrow: 0
  },
  containerLeftDetail: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 30,
    height: 240
  },
  containerRightDetail: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    height: 100
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
    paddingHorizontal: 40
  },
  detailTitleInContainer: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.darkBlue,
    marginVertical: 10,
    paddingHorizontal: 20
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    flex: 1,
    height: 1,
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  containerLeftSourceAcc: {
    flexDirection: 'column',
    width: width * 0.9,
    maxHeight: hp('55%'),
    paddingHorizontal: 20,
  },
  detail: {
    flexDirection: 'column'
  },
  detailInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  detailText: {
    fontSize: 15,
    color: theme.darkBlue,
    marginVertical: 3,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rightItemContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  boxAmount: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7B7F9E',
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginVertical: 10,
    alignSelf: 'center'
  },
  boxAddInfo: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.emoneyGold,
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginVertical: 10,
    alignSelf: 'center',
  },

  icon: {
    color: theme.pinkBrand,
    marginRight: 20
  },


  inputStyle: [styles.bold, {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'left',
    color: theme.black,
    fontSize: 20,
  }],
  rowRight: {
    alignSelf: 'flex-end',
    flex: 0.8,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  sourceAcc: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  labelSourceAcc: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textStyleName: {
    fontSize: 16,
    paddingLeft: 5,
    fontWeight: 'bold',
    color: theme.black
  },
  textStyleType: {
    paddingLeft: 5,
    color: theme.darkBlue,
    fontSize: 13,
  },
  textStyleNumber: {
    fontSize: 16,
    paddingLeft: 5,
    color: theme.darkBlue,
    fontWeight: 'bold',
  },
  textStyleBal: {
    paddingLeft: 5,
    color: theme.darkBlue,
    fontSize: 13,
    fontWeight: 'bold',
  },
  iconContainer: {
    backgroundColor: '#E9F2FF',
    borderRadius: 12,
    marginRight: 10,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconSize: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  fieldStyle: {
    paddingHorizontal: 30
  },
  redText: {
    color: theme.red,
    paddingLeft: 5
  },
  errIcon: {
    color: theme.red,
  }
};
