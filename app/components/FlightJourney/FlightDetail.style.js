import {fontSizeNormalStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {textLightGreyStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: [{flex: 1, paddingHorizontal: 10}],
  pickPayeeHeader: [fontSizeNormalStyle, bold, {paddingTop: 30, paddingBottom: 10}],
  containerContent: [{paddingBottom: 30}],
  titleContainer: {
    paddingTop: 20,
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
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 20,
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
    justifyContent: 'flex-start',
    paddingHorizontal: 40
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 0,
  },
  timeSelection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  center: {
    height: 40,
    width: 40,
    paddingVertical: 5,
    alignItems: 'center'
  },
  largeText: {
    fontSize: theme.fontSizeXL,
    color: theme.black
  },
  largeTextDisabled: {
    fontSize: theme.fontSizeXL,
    color: theme.textGrey
  },
  radioStyle: {
    color: theme.brand
  },
  timesText: {
    fontSize: theme.fontSizeSmall,
  },
  titleText: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightMedium
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
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detail: {
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    height: 50
  },
  upperTitleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  flight: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  image: {
    height: 40,
    width: 40,
    backgroundColor: theme.transparent,
  },
  titleInformation: {
  },
  date: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  detailView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 100
  },
  wrapper: {
    paddingVertical: 0,
    width: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bold: {
    fontWeight: theme.fontWeightBold
  },
  arrowDownStyle: {
    transform: [{rotate: '90deg'}],
    color: 'black',
  },
  infoPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  blockLong: {
    height: 130,
    width: 1,
    justifyContent: 'center',
    borderColor: theme.grey,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  greenText: {
    color: theme.green,
    fontSize: theme.fontSizeSmall
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  flightIcon: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginLeft: 10
  },
  rowSpace: {
    flexDirection: 'row',
    marginLeft: 0
  },
  transitView: {
    flexDirection: 'column',
  },
  number: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 20,
    paddingHorizontal: Platform.OS === 'ios' ? 60 : 100,
  },
  icon: {
    alignSelf: 'center',
    flex: .5,
    height: 40,
    width: 40,
    justifyContent: 'center'
  },
  upperWrapper: {
    width: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rowFooter: {
    flexDirection: 'row'
  },
  time: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingHorizontal: Platform.OS === 'ios' ? 30 : 10,
  },
  radioStyle1: {
    color: theme.black,
  },
  transitTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: -30
  },
  transitContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 30
  },
  transitDate: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  mainTransit: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    backgroundColor: theme.whiteGrey,
    width: width,
    height: 130,
    flexDirection: 'row'
  },
  transitCity: {
    paddingHorizontal: 10,
    flexDirection: 'column'
  },
  topContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  upperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  bottomWrapper: {
    width: 10,
    paddingVertical: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  blockShort: {
    height: 10,
    width: 1,
    borderColor: theme.grey,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  bottomDetail: {
    paddingHorizontal: 40,
    justifyContent: 'center',
    height: 50
  },
  blockLongTransit: {
    height: 110,
    width: 1,
    justifyContent: 'center',
    borderColor: theme.grey,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },


};
