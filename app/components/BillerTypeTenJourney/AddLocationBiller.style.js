import {contentContainerStyle, fontSizeMediumStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: [contentContainerStyle, {
    flex: 1,
    padding: 20
  }],
  filterTextInput: {
    fontSize: 12
  },
  searchBox: {
    borderWidth: 1
  },
  bgSearch: {
    backgroundColor: theme.transparent,
    borderWidth: 1,    
    borderColor: theme.softGrey,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchInput: {
    paddingLeft: 20,
    height: 50,
    fontSize: fontSizeMediumStyle.fontSize
  },
  searchTxtInput: {
    flex: 1
  },
  searchIcon: {
    paddingTop: 15,
    paddingRight: 10,
    height: 50,
  },
  icon: {
    color: theme.black
  },
  iconPick: {
    color: theme.brand
  },
  lineBlack: {
    height: 1,
    backgroundColor: theme.greyLine,
    marginVertical: 15
  },
  rowArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pageTitle: {
    fontSize: theme.fontSizeNormal
  }
};
