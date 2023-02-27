import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  card: {
    flexGrow: 1,
    backgroundColor: theme.contrast,
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingHorizontal: 15,
    padding: 10
  },
  square: {
    backgroundColor: 'transparent',
    paddingHorizontal: 1,
    borderWidth: 1,
    borderColor: theme.grey,
    marginBottom: 10,
    borderRadius: 20
  },
  boxOne: {
    backgroundColor: '#FFFFFF',
    paddingRight: 10,
    borderRadius: 10,
    elevation: 2
  },
  boxTwo: {
    height: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    width: width - 40,
    borderRadius: 10,
  },
  boxOnePublic: {
    backgroundColor: '#FFFEF0',
    paddingRight: 10,
    borderRadius: 10,
    elevation: 2
  },
  boxTwoPublic: {
    height: 60,
    backgroundColor: '#FFFEF0',
    justifyContent: 'center',
    width: width - 40,
    borderRadius: 10,
  },
  circleOne: {
    position: 'absolute',
    left: -10,
    top: 125,
    width: 20,
    height: 20,
    backgroundColor: theme.white,
    borderRadius: 30,
    elevation: 3,
    borderWidth: 1,
    borderColor: theme.grey
  },
  circleTwo: {
    position: 'absolute',
    right: -10,
    top: 125,
    width: 20,
    height: 20,
    backgroundColor: theme.white,
    borderRadius: 30,
    elevation: 4,
    borderWidth: 1,
    borderColor: theme.grey
  },
  padding: {
    paddingVertical: 6
  },
  alignTextCoupon: {
    textAlign: 'left',
    paddingRight: 20,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSize20,
    paddingLeft: 15,
    color: theme.black
  },
  alignTextCouponSub: {
    textAlign: 'left',
    paddingRight: 15,
    paddingLeft: 15

  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  redButton: {
    borderRadius: 30,
    borderColor: theme.red,
    backgroundColor: theme.red,
    height: 25,
    paddingHorizontal: 10
  },
  alignContent: {
    justifyContent: 'center',
    borderColor: theme.red,
    borderRadius: 30,
    height: 25,
    alignItems: 'center'
  },
  useButton: {
    borderRadius: 30,
    borderColor: theme.red,
    backgroundColor: theme.red,
    margin: 5,
    color: theme.white
  },
  justifyContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 20,
    alignItems: 'center',
    width: width - 40
  },
  justifyContentSecond: {
    height: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 20,
    alignItems: 'center',
    width: width - 40
  },
  field: {
    width: width - 105,
  },
  arrowIcon: {
    color: theme.black,
    paddingTop: 10,
  },
  fieldRow: {
    width: width - 105,
    flexDirection: 'row'
  },
  fieldRowTop: {
    flexDirection: 'row'
  },
  fieldRowTopBorder: {
    flexDirection: 'row',
    paddingTop: 10
  },
  textValid: {
    justifyContent: 'center'
  },
  validTime: {
    paddingHorizontal: 10
  },
  justifyContentTop: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 10,
    paddingTop: 10,
    alignItems: 'center',
    width: width - 40
  },
  widthButton: {
    width: 40,
    height: 10
  },
  linecenter: {
    height: 1,
    backgroundColor: '#F2F1DC',
    width: width * 0.69
  },
  lineOne: {
    height: 1,
    backgroundColor: '#FFFEF0',
    width: width * 0.1
  },
  lineTwo: {
    height: 1,
    backgroundColor: '#FFFEF0',
    width: width * 0.5
  },  
  alignTextCouponRed: {
    textAlign: 'left',
    paddingRight: 20,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSize20,
    paddingLeft: 15,
    color: theme.red,
  },
  limitedLabelstyle: {
    width: 60,
    height: 15
  },
  cashBacklabel: {
    width: 60,
    height: 15,
  },
  cashBorder: {
    paddingLeft: 15,
    paddingTop: 6,
    flexDirection: 'row',
  },
  termConditionfield: {
    height: 60,
    paddingLeft: 15,
    paddingTop: 12,
  },
  termtext: {
    fontSize: theme.fontSizeSmall,
    height: 45
  },
  paddingHor: {
    paddingHorizontal: 5,
    width: 80,
  },
  speciallabel: {
    width: 80,
    height: 15,
  },
  absoluteText: {
    color: theme.white,
    fontSize: theme.fontSizeXS,
    textAlign: 'center'
  },
  absolutView: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingLeft: 8,
  },
  countCoupon: {
    backgroundColor: theme.red,
    borderRadius: 5,
    alignContent: 'center'
  },
  textCouponCounter: {
    textAlign: 'center',
    padding: 5,
    color: theme.white
  },
  fieldRowTopnCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paddingImage: {
    paddingRight: 5
  }

};