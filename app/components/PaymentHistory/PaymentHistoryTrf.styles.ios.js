import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle, fontSizeLargeStyle} from '../../styles/common.styles';

export default {
  container: {
    marginTop: 10
  },
  containerTrf: {
    marginTop: 10,
    paddingHorizontal: 20,
    flex: 1
  },
  containerTrfBI: {
    marginTop: 80,
    paddingHorizontal: 20,
    flex: 1
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
    height: 0.5,
    backgroundColor: theme.softGrey
  },
  separatorTextContainer: {
    flex: 1,
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
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    flex: 1
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    backgroundColor: theme.white
  },
  activityContainer: {
    marginTop: 30,
    alignItems: 'center'
  },
  deleteView: {
    backgroundColor: theme.brand
  },
  trash: {
    backgroundColor: theme.pinkBrand,
    flex: 1,
    width: 54,
    alignItems: 'center',
    justifyContent: 'center'
  },


  filterTextInput: {
    flex: 1,
    fontSize: fontSizeMediumStyle.fontSize,
    color: theme.black
  },
  separatorText: {
    textAlign: 'center',
    fontFamily: 'roboto',
    color: theme.softGrey
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
    marginLeft: 10,
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
  flex: {
    flex: 1,
  },
  flexProxyAddress: {
    justifyContent: 'center',
    flex: 4,
  },
  subNoProxyAddress: {
    fontFamily: 'roboto',
    color: theme.black,
    fontSize: theme.fontSizeSmall,
    paddingLeft: 10
  },
};
