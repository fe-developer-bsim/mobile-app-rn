import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {width} = Dimensions.get('window');
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  container: {flex: 1, backgroundColor: theme.superlightGrey},
  containerContent: [{justifyContent: 'space-between'}],
  top: {
    alignItems: 'center',
    maxHeight: hp('50%'),
  },
  mid: {
    paddingHorizontal: 20,
    flex: 1,
  },
  containerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.white,
    position: 'absolute',
    marginVertical: Platform.OS === 'ios' ? width * 0.27 : 0.27,
    borderRadius: 15,
    width: width * 0.9,
    top: 20,
    flex: 1,
  },
  containerLeft: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 30,
    maxHeight: 270,
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
  containerRightDetail: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginTop: 10,
    height: 70
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
  box: {
    width: width * 0.8,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7B7F9E',
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginVertical: 20,
    alignSelf: 'center'
  },
  detailText: {
    fontSize: 15,
    color: theme.darkBlue,
    marginVertical: 10,
    fontWeight: theme.fontWeightBold,
  },
  detailWarning: {
    flexDirection: 'column',
    paddingTop: 5,
  },
  warningText: {
    fontSize: 12,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightRegular,
    width: width * 0.7
  },
  warningIcon: {
    color: theme.darkBlue
  },
  iconContainer: {
    borderRadius: 12,
    marginRight: 10,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightItemContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  rowRight: {
    alignSelf: 'flex-end',
    flex: 0.8,
    paddingHorizontal: 10,
  },
  inputStyle: [styles.bold, {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'left',
    color: theme.black,
    fontSize: 20,
  }],
  warningContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: width * 0.8,
  },
  warningTextContainer: {
    width: width * 0.65,
    paddingLeft: 10,
  },
  warningTextR: {
    fontSize: 12,
    color: theme.red,
    fontWeight: theme.fontWeightRegular,
  },
  warningIconR: {
    color: theme.red,
    paddingTop: 2
  },
};
