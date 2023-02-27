import {bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default {
  container: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: theme.greyLine,
    paddingBottom: 40
  },
  setPageBody: {
    height: (height / 2) - 100,
    backgroundColor: theme.greyLine,
  },
  greyBack: {
    backgroundColor: theme.greyLine,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  greyBackBottom: {
    backgroundColor: theme.greyLine,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  borderPageTop: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: theme.white,
    padding: 15,
  },
  sliderAccount: {
    backgroundColor: theme.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  greyLine: {
    paddingBottom: 20,
    marginTop: 20,
    borderTopColor: theme.greyLine,
    borderTopWidth: 1
  },
  loginItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 30
  },
  row: {
    flexDirection: 'row',
  },
  iconContainer: {
    flexDirection: 'row',
    paddingRight: 10,
    justifyContent: 'center',
    minWidth: 60,
    alignItems: 'center'
  },
  icon: {
    color: theme.brand
  },
  loginType: {
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeNormal
  },
  loginTypeContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightBold,
  },
  fieldsContainerWrapper: {
    width: width
  },
  bgWhite: {
    backgroundColor: theme.white,
    marginVertical: 5,
  },
  rowAccount: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageOffer2: {
    width: 85,
    height: 85
  },
  accTxt2: [bold, {
  }],
  pad2: {
    paddingVertical: 1
  },
  balanceTxt: {
    color: theme.lightGrey,
  },
  arrowContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  rowCheck: {
    flexDirection: 'row',
  },
  coloumnCheck: {
    width: 50,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  infoContainer: {
    width: width / 2
  },
  circleOuter: {
    borderColor: theme.brand,
    borderWidth: 1,
    width: 15,
    height: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    backgroundColor: theme.brand,
    width: 10,
    height: 10,
    borderRadius: 20,
  },
  circleOuterOff: {
    borderColor: theme.greyLine,
    borderWidth: 1,
    width: 15,
    height: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInnerOff: {
    backgroundColor: theme.white,
    width: 10,
    height: 10,
    borderRadius: 20,
  },
  greyLineAccount: {
    borderTopColor: theme.greyLine,
    borderTopWidth: 1,
    marginHorizontal: 15
  },
  understandButton: {
    color: theme.white
  },
  boldText: {
    fontWeight: theme.fontWeightBold
  },
  subTitle: {
    fontSize: theme.fontSizeSmall
  },
  widthText: {
    paddingRight: width / 6
  },
  paddingBeetween: {
    paddingVertical: 15,
    paddingHorizontal: 15
  }
};