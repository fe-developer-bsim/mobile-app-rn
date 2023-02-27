import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  container: {flex: 1, backgroundColor: theme.superlightGrey},
  containerContent: [{justifyContent: 'space-between'}],
  top: {
    alignItems: 'center',
    height: hp('20%')
  },
  mid: {
    paddingHorizontal: 20,
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
    backgroundColor: 'transparent',
    position: 'absolute',
    marginVertical: Platform.OS === 'ios' ? width * 0.02 : 0.27,
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
    height: 180
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
  greyLine: {
    backgroundColor: theme.greyLine,
    flex: 1,
    height: 1,
    marginVertical: 5,
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
  detailInsideName: {
    alignItems: 'flex-start',
    width: width * 0.4,
  },
  detailInsideAmt: {
    alignItems: 'flex-end',
    width: width * 0.4,
  },
  detailText: {
    fontSize: 15,
    color: theme.darkBlue,
    marginVertical: 3,
  },
  detailTextBold: {
    fontWeight: 'bold',
    fontSize: 17,
    color: theme.darkBlue,
    marginVertical: 10,
    paddingHorizontal: 20
  },
  detailTextInstallmet: {
    fontSize: 15,
    color: theme.darkBlue,
    marginVertical: 3,
    alignSelf: 'center'
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rightItemContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  installmentContainer: {
    flexDirection: 'row',
    width: width * 0.9,
  },
  detailInsideInstallment: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: width * 0.3,
  },
  containerInstallmentDetail: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    height: 200
  },
  containerInstallmentDetail3: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    height: 130
  },
  containerInstallmentDetail5: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    height: 190
  },
  containerInstallmentDetail6: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    height: 210
  }
};
