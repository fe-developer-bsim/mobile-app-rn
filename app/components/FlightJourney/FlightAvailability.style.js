import {contentContainerStyle, fontSizeNormalStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {textLightGreyStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: [contentContainerStyle, {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0
  }],
  pickPayeeHeader: [fontSizeNormalStyle, bold, {
    paddingTop: 30,
    paddingBottom: 10
  }],
  containerContent: [{
    alignItems: 'stretch',
    paddingBottom: 30
  }],
  titleContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: theme.red,
    maxWidth: width,
    height: 120,
    justifyContent: 'center'
  },
  formContainer: {
    flex: 1,
    paddingBottom: 25,
    paddingHorizontal: 20
  },
  paddingContent: {
    paddingHorizontal: 20
  },
  footerContainer: {
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
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
    paddingHorizontal: 20
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
    borderWidth: 3,
    borderRadius: 100,
    width: 300,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    borderColor: theme.grey
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
    paddingVertical: 3,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 150,
    flexDirection: 'row'
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
  timesText: {
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    fontWeight: theme.fontWeightLight,
  },
  titleText: {
    fontSize: theme.fontSizeXL,
    color: theme.white,
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
  titleFrom: {
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    maxWidth: 90
  },
  titleTo: {
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    maxWidth: 90
  },
  information: {
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  redBar: {
    backgroundColor: theme.brand,
    flexDirection: 'row',
  },
  greyBar: {
    backgroundColor: theme.darkGrey,
    flexDirection: 'row',
  },
  progressBar: {
    flexDirection: 'row',
    height: 7
  },
  iconStyle: {
    color: theme.white,
    backgroundColor: theme.transparent
  },
  timesTextFooter: {
    color: theme.black,
    fontSize: theme.fontSizeMedium
  },
  depatureContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightTitle: {
    flexDirection: 'row',
  },
  specialText: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
    fontWeight: theme.fontWeightMedium,
  },
  separatorContainer: {
    width: 10,
  },
  calendarContainer: {
    width: 50,
  },
  modalPrecise: {
    width: 100
  },
  footerIconStyle: {
    color: theme.black,
    backgroundColor: theme.transparent,
    paddingHorizontal: 10
  }

};
