import {theme} from '../../styles/core.styles';
import {textLightGreyStyle} from '../../styles/common.styles';
import {contentContainerStyle} from '../../styles/common.styles';

export default {
  container: [contentContainerStyle],
  containerContent: [{alignItems: 'stretch', justifyContent: 'space-between', flexGrow: 1}],
  titleContainer: {
    paddingTop: 20,
    paddingHorizontal: 20
  },
  formContainer: {
    flex: 1,
    paddingBottom: 25,
    paddingHorizontal: 20
  },
  paddingContent: [contentContainerStyle],
  footerContainer: [contentContainerStyle],
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
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  timeSelection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  timeAddContainer: {
    flexDirection: 'row',
    flex: 1,
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
  noRecurringContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  timesText: {
    fontSize: theme.fontSizeMedium,
    color: theme.black
  },
  titleText: {
    fontSize: theme.fontSize22,
    fontFamily: 'roboto',    
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
  scheduleContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  schedulePicker: {
    width: 155
  }
};
