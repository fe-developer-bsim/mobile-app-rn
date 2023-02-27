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
    height: hp('60%')
  },
  mid: {
    paddingHorizontal: 2,
    marginTop: Platform.OS === 'ios' ? 10 : 50,
    flex: 1
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 10,
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
    position: 'absolute',
    marginVertical: Platform.OS === 'ios' ? width * 0.02 : 0.27,
    borderRadius: 15,
    width: width * 0.9,
    top: 20,
    flex: 1
  },
  leftItemContainer: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 0
  },
  containerLeftDetail: {
    flexDirection: 'column',
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    height: 500
  },
  containerMidDetail: {
    flexDirection: 'column',
    paddingVertical: 0,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    height: 160,
  },
  containerRightDetail: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    height: 60
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
    paddingHorizontal: 20
  },
  detailTitleInContainer: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.darkBlue,
    marginVertical: 10,
    paddingHorizontal: 25
  },
  detailTitleTop: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.black,
    paddingTop: 10,
    paddingHorizontal: 25
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
    paddingHorizontal: 20,
  },
  detail: {
    flexDirection: 'column',
    paddingTop: 20
  },
  detailInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  detailWarning: {
    flexDirection: 'column',
    paddingTop: 5,
  },
  footerText: {
    fontSize: 12,
    color: theme.textLightGrey,
    marginTop: 10,
    marginLeft: 10,
    fontWeight: theme.fontWeightRegular,
  },
  warningText: {
    fontSize: 12,
    color: theme.darkBlue,
    marginRight: 40,
    fontWeight: theme.fontWeightRegular,
    width: 250
  },
  warningIcon: {
    color: theme.darkBlue
  },
  detailText: {
    fontSize: 15,
    color: theme.darkBlue,
    marginVertical: 3,
    fontWeight: theme.fontWeightRegular,
    paddingLeft: 5,
  },
  textRight: {
    fontSize: 15,
    color: theme.darkBlue,
    marginVertical: 3,
    fontWeight: theme.fontWeightRegular,
    paddingRight: 5
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalText: {
    fontSize: 18,
    color: theme.darkBlue,
    marginVertical: 3,
    fontWeight: theme.fontWeightBold,
    paddingLeft: 20,
  },
  totalPrice: {
    fontSize: 18,
    color: theme.black,
    marginVertical: 3,
    fontWeight: theme.fontWeightBold,
    paddingRight: 20,
  },
  midItemContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 140
  },
  rightItemContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fieldStyle: {
    paddingVertical: 10
  },
  box: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7B7F9E',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 10,
    alignSelf: 'center'
  },
  boxAddInfo: {
    borderRadius: 10,
    borderColor: '#7B7F9E',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 20,
    alignSelf: 'center'
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
  moreMenuStyle: {
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  sourceAcc: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  destAcc: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    marginBottom: 10,
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
    borderRadius: 12,
    marginRight: 10,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconSize: {
    flex: 1,
    width: 35,
    height: 35,
    resizeMode: 'contain'
  },
  textStyleAmount: {
    fontSize: styles.fontSizeXLStyle.fontSize,
    fontWeight: 'bold',
    color: theme.black,
    fontFamily: 'Roboto',
    width: 250,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  textStyleInfo: {
    fontSize: styles.fontSizeMediumStyle.fontSize,
    fontFamily: 'Roboto',
    width: 250,
    padding: 0,
    marginTop: 20,
    marginBottom: 20,
  },
};
