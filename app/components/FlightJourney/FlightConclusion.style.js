import {contentContainerStyle, fontSizeNormalStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {textLightGreyStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
export default {
  container: [contentContainerStyle, {flex: 1, paddingVertical: 0, backgroundColor: theme.whiteGrey}],
  pickPayeeHeader: [fontSizeNormalStyle, bold, {paddingTop: 30, paddingBottom: 10}],
  containerContent: [{alignItems: 'stretch', paddingBottom: 30}],
  titleContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  formContainer: {
    flex: 1,
    paddingBottom: 25,
    paddingHorizontal: 20
  },
  paddingContent: {
    paddingHorizontal: 10
  },
  footerContainer: {
    backgroundColor: theme.inputBackground,
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 0
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
    paddingHorizontal: 10
  },
  duration: {
    paddingHorizontal: 40,
    justifyContent: 'flex-end',
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
    fontSize: theme.fontSizeLarge,
    color: theme.black
  },
  timesText: {
    fontSize: theme.fontSizeSmall
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
    color: theme.textGrey
  },
  infoTextContainer: {
    flex: 1
  },
  info: [textLightGreyStyle, {
    fontSize: theme.fontSizeSmall
  }],
  titleForm: {
    marginLeft: 30,
  },
  titleTo: {
    marginLeft: 100,
  },
  information: {
    marginLeft: 10.
  },
  contentContainer: {
    flexDirection: 'column',
    width: width
  },
  detail: {
    marginLeft: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 120,
    alignSelf: 'flex-start'
  },
  upperTitleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between'
  },
  flight: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 40,
    height: 40,
    paddingHorizontal: 10,
  },
  date: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  detailView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  wrapper: {
    marginTop: 25,
    marginLeft: -5,
    alignItems: 'center'
  },
  bold: {
    fontWeight: theme.fontWeightBold
  },
  
  infoPrice: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 40,
  },
  block: {
    height: 200,
    width: 2,
    color: theme.greyLine
  },
  containerDepart: {
    backgroundColor: theme.white,
    borderColor: theme.greyLine,
    borderWidth: 2
  },
  contentPassenger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0
  },
  number: {
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  flightIcon: {
    flexDirection: 'row',
  },
  bottomWrapper: {
    marginVertical: 20,
    bottom: 0,
  },
  column: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'center',
    flex: .5,
    height: 40,
    width: 40,
    justifyContent: 'center'
  },
  buttonLargeTextStyle: {
    color: theme.white
  }

};

