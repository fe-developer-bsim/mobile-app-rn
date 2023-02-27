import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const leftContainerWidth = (width / 2) + 30;
const rightContainerWidth = width - leftContainerWidth;
const modalWidth = width - 20;

export default {
  viewContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  footerTouchable: {
    backgroundColor: theme.white,
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 7,
    flexDirection: 'row',
    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  footerIcon: {
    paddingLeft: 7,
    color: theme.black
  },
  footerText: {
    color: theme.black,
    textAlign: 'center',
  },
  buttonLocationContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 5,
    right: 0,
  },
  buttonLocationBorder: {
    backgroundColor: theme.white,
    borderRadius: 100,
    padding: 5,
    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  locateIcon: {
    color: theme.black,
  },
  locateIconList: {
    paddingLeft: 5,
    color: theme.black
  },
  locateText: {
    fontSize: theme.fontSizeSmall,
    color: theme.black
  },
  separator: {
    borderBottomColor: theme.separatorColor,
    borderBottomWidth: 1,
  },
  blockContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: rightContainerWidth,
  },
  leftContainer: {
    width: leftContainerWidth
  },
  lastRowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10
  },
  textOperationalHour: {
    paddingRight: 5,
    color: theme.black,
    fontSize: theme.fontSizeNormal,
  },
  textStatusRed: {
    color: theme.brand,
    fontSize: theme.fontSizeNormal
  },
  textStatusGreen: {
    color: theme.green,
    fontSize: theme.fontSizeNormal
  },
  outerContainer: {
    backgroundColor: theme.white,
    width: width,
    flex: 1
  },
  textFirstRow: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    fontWeight: theme.fontWeightRegular,
    lineHeight: 25,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchContainer: {
    backgroundColor: theme.greyLine,
    borderRadius: 100,
    height: 50,
    paddingHorizontal: 20,
    margin: 20,
    flexDirection: 'row'
  },
  searchInput: {
    alignItems: 'flex-start'
  },
  searchATMButton: {
    paddingTop: 15,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: theme.white,
    borderRadius: 5,
    width: modalWidth,
    margin: 10,
    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  blockModalContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  textFirstRowModal: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    fontWeight: theme.fontWeightRegular,
    lineHeight: 25,
  },
  textOperationalHourModal: {
    paddingRight: 5,
    color: theme.black,
    fontSize: theme.fontSizeNormal,
  },
  textStatusRedModal: {
    color: theme.brand,
    fontSize: theme.fontSizeNormal
  },
  textStatusGreenModal: {
    color: theme.green,
    fontSize: theme.fontSizeNormal
  },
  locateTextModal: {
    fontSize: theme.fontSizeSmall,
    color: theme.black
  },
  calloutStyle: {
    flex: 1,
    position: 'relative',
  },
  calloutContainer: {
    backgroundColor: theme.white,
    padding: 10,
    marginBottom: 5
  },
  textInput: {
    width: width - 105,
    height: 50
  },
  emptyContainer: {
    padding: 20
  },
  emptyText: {
    alignSelf: 'center',
    fontSize: theme.fontSizeMedium
  },
  listView: {
    paddingBottom: 100
  }
};