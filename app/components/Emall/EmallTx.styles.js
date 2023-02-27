import {contentContainerStyle, fontSizeXLStyle, bold, fontSizeSmallStyle, fontSizeLargeStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 40;

export default {
  container: {
    flex: 1,
  },
  bgWhite: [{
    backgroundColor: theme.white,
  }],
  bgGrey: {
    backgroundColor: theme.cardGrey,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.white,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTxt: [fontSizeXLStyle, bold, {
    paddingVertical: 20,
  }],
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 10,
  },
  greyLine2: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  row2: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  row3: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  wd100: {
    width: trueWidth / 2.05,
  },
  wd80: {
    width: width - 70,
  },
  wd50: {
    width: trueWidth / 15,
  },
  smallTxt: [fontSizeSmallStyle, {}],
  iconContainer: {
    alignItems: 'flex-end',
    flex: 0.05
  },
  button2: {
    width: 135,
  },
  buttonTxt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.black,
    height: 30
  },
  proceedIcon: {
    color: theme.brand,
  },
  imageFlight: {
    width: 40,
    height: 40
  },
  depturnTxt: [fontSizeLargeStyle, {
    color: theme.lightGrey,
  }],
  depturnView: {
    marginVertical: 10
  },
  flightView: {
    marginHorizontal: 20
  },
  iconView: {
    marginRight: 10
  },
  airlineTxt: {},
  typeTxt: {
    color: theme.lightGrey,
    marginVertical: 2
  },
  flNumberTxt: [bold, {
    marginTop: -19,
  }],
  flNumberView: {
  },
  arriveTime: [{
    color: theme.lightGrey,
  }],
  arriveTxt: [fontSizeSmallStyle, {
    color: theme.lightGrey,
  }],
  originTxt: [fontSizeXLStyle, bold],
  mv5: {
    marginVertical: 5
  },
  mv10: {
    marginVertical: 10
  },
  mv20: {
    marginVertical: 20
  },
  mpv10: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  bottomleftWrapper: {
    alignItems: 'center',
  },
  block: {
    height: 130,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.grey
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: theme.white,
    borderColor: theme.brand,
    borderWidth: 2,
  },
  transitCircle: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: theme.white,
    borderColor: theme.grey,
    borderWidth: 2,
  },
  arrivedCircle: {
    width: 15,
  },
  transitView: {
    paddingHorizontal: 20,
  },
  arrivedView: {
    paddingHorizontal: 20,
    marginBottom: 15
  },
  transitBlock: {
    height: 13,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.grey
  },
  transitBlock2: {
    height: 135,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.grey
  },
  pv10: {
    paddingVertical: 10
  },
  pv15: {
    paddingVertical: 15,
  },
  cgrey: {
    color: theme.lightGrey
  },
  mh20: {
    marginHorizontal: 20
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  arrivedBlock: {
    height: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.grey
  },
  arrowIcon: {
    transform: [{rotate: '90deg'}],
    color: theme.black,
  },
  contactView: [contentContainerStyle, {
  }],
  contactDetailsView: {

  },
  passengerView: [contentContainerStyle, {
  }],
  amountHead2: [fontSizeSmallStyle, {
    marginTop: 3,
    marginBottom: 15,
    color: theme.textLightGrey,
  }],
  amountHead2Red: [bold, fontSizeSmallStyle, {
    marginBottom: 15,
    marginTop: 3,
    color: theme.brand
  }],
  amountTxt2: {
    flex: 0.4,
    marginVertical: 15,
  },
  amountTxt3: {
    marginVertical: 15
  },
  amountTxtGreen: {
    marginVertical: 15,
    color: theme.green,
  },
  amountTxt4: {
    marginVertical: 15,
    flex: 0.4,
  },
  amountTxt4View: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  amountTxt5View: {
    marginVertical: 15,
    flex: 0.5,
    alignItems: 'flex-end',
  },
  amountTxt5: {
    color: theme.green
  },
  greyTxt: {
    color: theme.lightGrey
  }
};
