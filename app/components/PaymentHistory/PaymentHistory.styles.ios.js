import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle, fontSizeLargeStyle, bold} from '../../styles/common.styles';

export default {
  container: {
    marginTop: 10
  },
  containerTrf: {
    marginTop: 10,
    paddingHorizontal: 20
  },
  separator: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  separatorLine: {
    flex: 3,
    height: 1,
    backgroundColor: theme.softGrey
  },
  separatorTextContainer: {
    flex: 2,
  },
  filterBox: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: theme.softGrey,
    borderRadius: 5,
    marginTop: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10
  },
  billerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    flexWrap: 'wrap',
    flex: 3,
  },
  historyItem: {
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    backgroundColor: theme.white,
    paddingVertical: 15,
  },
  historyItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityContainer: {
    marginTop: 30,
    alignItems: 'center'
  },
  deleteView: {
    backgroundColor: theme.brand
  },
  trash: {
    backgroundColor: 'red',
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flex: {
    flex: 2,
    flexWrap: 'wrap',
  },
  redArrow: {
    marginLeft: 10,
  },


  filterTextInput: {
    flex: 1,
    fontSize: fontSizeMediumStyle.fontSize,
    color: theme.black
  },
  separatorText: {
    textAlign: 'center',
    fontFamily: 'roboto',
    color: theme.softGrey,
    fontSize: theme.fontSizeSmall
  },
  title: [fontSizeLargeStyle, {
    fontFamily: 'roboto',
    color: theme.black
  }],
  searchIcon: {
    fontFamily: 'roboto',
    color: theme.black,
  },
  billerName: {
    fontFamily: 'roboto',
    color: theme.softGrey,
    fontSize: theme.fontSizeSmall,
    marginRight: 5,
    flex: 1,
    textAlign: 'right'
  },
  subNo: {
    fontFamily: 'roboto',
    color: theme.black
  },
  desc: [bold, {
    fontFamily: 'roboto',
    color: theme.black,
    marginBottom: 3
  }],
  errorText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightLight,
    color: theme.softGrey
  },
  reloadText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightLight,
    color: theme.brand
  },
  arrow: {
    marginHorizontal: 10,
  },
  whiteIcon: {
    color: theme.white
  },
  iconStyle: {
    justifyContent: 'center'
  },
  subtext: {
    fontWeight: theme.fontWeightLight,
    fontSize: 12,
    color: theme.black,
    fontFamily: 'roboto',
  },

};
