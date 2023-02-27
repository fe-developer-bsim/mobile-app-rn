import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle} from '../../styles/common.styles';

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
    marginTop: 90,
    paddingHorizontal: 20,
    flex: 1
  },
  separator: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20
  },
  separatorLine: {
    flex: 3,
    height: 0.5,
    backgroundColor: theme.softGrey
  },
  separatorTextContainer: {
    flex: 1
  },
  filterBox: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.darkGrey,
    borderRadius: 5,
    marginTop: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    marginBottom: 10
  },
  billerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    flex: 1,
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
    alignItems: 'center',
  },
  deleteView: {
    backgroundColor: theme.brand
  },
  trash: {
    backgroundColor: theme.pinkBrand,
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center'
  },


  filterTextInput: {
    flex: 1,
    fontSize: fontSizeMediumStyle.fontSize,
  },
  separatorText: {
    textAlign: 'center',
    fontFamily: 'roboto',
    color: theme.softGrey
  },
  title: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeMedium,
    color: theme.black
  },
  searchIcon: {
    fontFamily: 'roboto',
    color: theme.black
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
    // flexWrap: 'wrap',
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
