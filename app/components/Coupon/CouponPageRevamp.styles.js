import {contentContainerStyle, fontSizeSmallStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  headerContainer: {
    paddingBottom: 20
  }, 
  heading: [{
    paddingBottom: 5
  },
  fontSizeSmallStyle, bold
  ],
  subHeading: [fontSizeSmallStyle],
  container: [contentContainerStyle, {
    backgroundColor: theme.white,
  }],
  paddingStyle: {
    paddingTop: 10,
    paddingBottom: 5
  },
  paddingStylePublic: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  limitedLable: {
    height: 17,
    width: 100,
    paddingLeft: 30
  },
  limitedLableId: {
    height: 17,
    width: 140,
    paddingLeft: 30
  },
  textPublic: {
    paddingRight: 8
  },
  containerDetail: {
    flex: 1,
    padding: 20
  },
  whiteBox: {
    backgroundColor: theme.white,
    padding: 20,
  },
  headerDetail: {
    paddingBottom: 20
  },
  headerText: {
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeLarge,
    paddingLeft: 15
  },
  subheaderText: {
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeNormal
  },
  subsubheaderText: {
    fontSize: theme.fontSizeSmall,
    color: theme.black
  },
  padBottom: {
    paddingBottom: 30
  },
  icon: {
    color: theme.grey,
    paddingTop: 5
  },
  rowCou: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  couponText: {
    color: theme.brand,
    fontFamily: 'roboto',
    marginLeft: 20
  },
  couponTextUse: {
    color: theme.black,
    width: width - 140,
    fontFamily: 'roboto',
    paddingLeft: 15,
  },
  iconAplied: {
    marginRight: 5,
    color: theme.brand
  },
  iconNotAplied: {
    marginRight: 5,
    color: theme.brand
  },
  remove: {
    paddingRight: 15,
    paddingTop: 7,
    color: theme.red
  },
  textEmpty: {
    color: theme.textGrey,
    alignText: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
  alignCenterContent: {
    alignItems: 'center',
    paddingTop: 70
  },
  emptyBackGround: {
    width: 250,
    height: 180
  },
  headerDetailRow: {
    paddingBottom: 30,
    flexDirection: 'row'
  },
  lableCoupon: {
    width: 30,
    height: 20,
  },
  subheaderTextDetail: {
    color: theme.black,
    fontSize: theme.fontSizeSmall
  },
  subheaderTextDetailTerm: {
    color: theme.black,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
    paddingBottom: 5
  },
  useButtonDetail: {
    color: theme.white  
  },
  subheaderTextDetailBold: {
    color: theme.black,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
  },
  alignTextCouponRed: {
    textAlign: 'left',
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSize20,

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
    paddingTop: 6,
    paddingBottom: 20,
    flexDirection: 'row',
  },
  justifyContentTop: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center',
  },
  fieldRowTop: {
    flexDirection: 'row'
  },
  buttonUseDetail: {
    paddingHorizontal: 10
  },
  alignTextCoupon: {
    textAlign: 'left',
    paddingRight: 20,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSize20,
    paddingLeft: 15,
    color: theme.black
  },
  headerBorder: {
    borderWidth: 1,
    height: 1,
    borderColor: theme.greyLine,
    borderStyle: 'solid'
  },
  headerTimeAndTerm: {
    paddingVertical: 20
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
  iconWidth: {
    width: 40,
    height: 40,
    marginBottom: 0,

  },
  closeBlack: {
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowAmountCouponUse: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    // paddingHorizontal: 5,
  },
  rowAmountCoupon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
};
