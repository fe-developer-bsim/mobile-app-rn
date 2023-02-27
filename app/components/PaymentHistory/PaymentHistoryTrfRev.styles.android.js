import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: {
    marginTop: 10
  },
  containerTrf: {
    marginTop: 0,
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
    borderColor: theme.white,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    marginBottom: 20,
    backgroundColor: theme.white
  },
  billerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    flex: 1,
  },
  containerHistory: {
    borderRadius: 20,
    backgroundColor: theme.white
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    backgroundColor: theme.transparent,
  },
  activityContainer: {
    marginTop: 30,
    marginBottom: 50,
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
    fontSize: fontSizeMediumStyle.fontSize
  },
  separatorText: {
    textAlign: 'center',
    fontFamily: 'roboto',
    color: theme.softGrey
  },
  title: {
    fontFamily: 'roboto',
    fontSize: 18,
    color: theme.black,
    fontWeight: 'bold',
    paddingLeft: 20
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
  testIcon: {
    color: theme.black,
    marginRight: 20,
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.lightPink
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
    paddingTop: 5
  },
  containerHistoryRemittance1: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: theme.white,
  },
  containerHistoryRemittanceSearch: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: theme.white,
  },
  containerHistoryRemittance: {
    backgroundColor: theme.white
  },
  containerHistoryRemittanceLast: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: theme.white
  },
  testIconRemittance: {
    color: theme.darkBlue,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 35,
    padding: 5,
    borderRadius: 10,
    backgroundColor: theme.lightPink
  },
  subNoRemittance: {
    fontFamily: 'roboto',
    color: theme.darkBlue,
    fontSize: theme.fontSizeNormal,
  },
  subtextRemittance: {
    fontWeight: theme.fontWeightLight,
    fontSize: 12,
    color: theme.softGrey,
    fontFamily: 'roboto',
  },
  arrowDownStyle: {
    color: theme.darkBlue,
  },
  billerNameRemittance: {
    fontFamily: 'roboto',
    color: theme.softGrey,
    fontSize: theme.fontSizeSmall,
    marginRight: 20,
    textAlign: 'right',
  },
  billerDetailsRemittance: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    justifyContent: 'flex-end',
    flex: 1,
  },
  swiftCodeRemittance: {
    fontFamily: 'roboto',
    color: theme.softGrey,
    fontSize: theme.fontSizeSmall,
    marginRight: 20,
    flex: 1,
    textAlign: 'right'
  },
  imgIcon: {
    width: ((width - 40) * 0.28) / 2,
    height: ((width - 40) * 1) / 8.5,
  },
  subNoProxyAddress: {
    fontFamily: 'roboto',
    color: theme.darkBlue,
    fontSize: theme.fontSizeSmall,
    paddingLeft: 10
  },
  historyItemProxyAddress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    backgroundColor: theme.transparent,
  },
  billerDetailsProxyAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    justifyContent: 'flex-end',
    flex: 1,
  },
  flexProxyAddress: {
    justifyContent: 'center',
    flex: 4,
    // flexWrap: 'wrap',
    // paddingTop: 5
  },
};