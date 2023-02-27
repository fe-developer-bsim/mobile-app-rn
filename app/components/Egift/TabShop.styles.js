import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: theme.superlightGrey,
  },
  containerTab: {
    flex: 1,
    backgroundColor: theme.white,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.superlightGrey,
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tabUnselected: {
    backgroundColor: theme.white,
    paddingVertical: 8,
    width: (width - 50) * 0.5,
    borderRadius: 50,
    alignItems: 'center'
  },
  tabSelected: {
    backgroundColor: theme.pinkBrand,
    paddingVertical: 8,
    width: (width - 50) * 0.5,
    borderRadius: 50,
    alignItems: 'center'
  },
  greyText: {
    color: theme.textSoftDarkBlue2,
  },
  whiteText: {
    color: theme.white,
  },
  warningContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.containerGrey,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 10,
  },
  warningText: {
    color: theme.darkBlue,
    display: 'flex',
    flex: 1,
    marginLeft: 10,
  },
  warningIcon: {
    color: theme.darkBlue,
  },
  searchBox: {
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 40,
    backgroundColor: theme.white,
    flex: 2,
  },
  sortButton: {
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    height: 40,
    backgroundColor: theme.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sortButtonSelected: {
    borderRadius: 20,
    flexDirection: 'row',
    height: 40,
    backgroundColor: theme.softPink,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.pinkBrand,
  },
  iconStyle: {
    justifyContent: 'center'
  },
  searchIcon: {
    fontFamily: 'roboto',
    color: theme.disabledGrey,
    marginRight: 5,
  },
  filterSection: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  tooltipButton: {
    padding: 5,
  },
  pinkText: {
    marginLeft: 10,
    color: theme.pinkBrand,
    textAlign: 'center',
  },
  cancelIcon: {
    color: theme.pinkBrand,
  },
  cancelButton: {
    color: theme.pinkBrand,
    paddingVertical: 10,
    paddingLeft: 5,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipContainer: {
    width: 'auto',
    height: 'auto',
    flex: 1,
  },
  searchText: {
    flex: 1,
    color: theme.black,
  },
  placeholderText: theme.placeholderTextColor,
};
