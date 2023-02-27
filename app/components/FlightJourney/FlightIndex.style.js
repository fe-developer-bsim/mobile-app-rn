import {contentContainerStyle, fontSizeNormalStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {textLightGreyStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');


export default {
  container: [contentContainerStyle, {paddingVertical: 10, paddingHorizontal: 0}],
  pickPayeeHeader: [fontSizeNormalStyle, bold, {paddingTop: 30, paddingBottom: 10}],
  containerContent: [{alignItems: 'center', paddingBottom: 10, paddingHorizontal: 30}],
  containerView: [{paddingBottom: 0}],
  titleContainer: {
    paddingTop: 20,
    paddingHorizontal: 10
  },
  formContainer: {
    flex: 1,
    paddingBottom: 25,
    paddingHorizontal: 20
  },
  paddingContent: {
    paddingHorizontal: 40
  },
  footerContainer: {
    backgroundColor: theme.inputBackground,
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 20
  },
  extraPadding: {
    paddingLeft: 10
  },
  darkLineFull: {
    borderTopWidth: 2,
    borderColor: theme.darkGrey,
    marginTop: 10
  },
  greyLineFull: {
    borderTopWidth: 10,
    borderColor: theme.greyLine,
    paddingBottom: 10
  },
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    paddingBottom: 10,
    marginTop: 10
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  timeSelection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  timeAddContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  borderedContainer: {
    borderWidth: 1,
    borderRadius: 5,
    width: 120,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  disbaledBorderedContainer: {
    borderWidth: 1,
    borderRadius: 5,
    width: 120,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    borderColor: theme.textGrey
  },
  rightBorder: {
    borderRightWidth: 1,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40
  },
  disbaledRightBorder: {
    borderRightWidth: 1,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderColor: theme.textGrey
  },
  center: {
    height: 40,
    width: 40,
    paddingVertical: 5,
    alignItems: 'center'
  },
  largeText: {
    fontSize: theme.fontSizeXL
  },
  largeTextDisabled: {
    fontSize: theme.fontSizeXL,
    color: theme.textGrey
  },
  radioStyle: {
    color: theme.brand
  },
  noRecurringContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  timesText: {
    fontSize: theme.fontSizeMedium
  },
  titleText: {
    fontSize: theme.fontSizeXL
  },
  flex1: {
    flex: 1
  },
  leftPadding: {
    flex: 1,
    paddingLeft: 10
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10
  },
  iconColor: {
    color: theme.red,
    backgroundColor: theme.white,
  },
  infoTextContainer: {
    flex: 1
  },
  info: [textLightGreyStyle, {
    fontSize: theme.fontSizeSmall
  }],
  textStyle: [fontSizeNormalStyle, {
    
  }],
  textView: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  passenger: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  bottomWrapper: {
    paddingHorizontal: 20,
  },
  switch: {
    width: 30,
    height: 40,
    alignSelf: 'flex-end',
    paddingTop: 10
  },
  buttonNext: {
    paddingVertical: 20,
  },
  originView: {
    width: 300
  },
  destinationView: {
    width: 300,
    marginTop: -20
  },
  buttonLargeTextStyle: {
    color: theme.white
  },
  banner: {
    width: width,
    height: 80,
    justifyContent: 'center'
  },
  bannerTitle: {
    fontWeight: theme.fontWeightBold,
    fontSize: 32,
    color: theme.white
  },
  bannerTitleView: {
    paddingHorizontal: 10,
    backgroundColor: theme.transparent
  },
  borderGrey: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  mh20: {
    paddingHorizontal: 20,
    marginBottom: 30
  },
  passStyle: {
    color: theme.lightGrey
  }
};
