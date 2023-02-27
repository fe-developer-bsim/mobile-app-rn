import {fontSizeNormalStyle, bold, containerWhiteStyle, fontSizeMediumStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
export default {
  container: {flex: 1, backgroundColor: theme.white},
  scrollViewContent: [containerWhiteStyle, {flex: 1}],
  pickPayeeHeader: [fontSizeNormalStyle, bold],
  inputContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 10
  },
  input: {
    flex: 1,
    paddingLeft: 20
  },
  inputWithPaddingHorizontal: {
    flex: 1,
    paddingHorizontal: 20
  },
  NButton: {
    paddingRight: 20
  },
  ErrorTextIndicator: {
    paddingHorizontal: 20
  },
  inputHeader: [fontSizeNormalStyle, bold],
  listHeader: [fontSizeNormalStyle, bold, {paddingVertical: 20, paddingHorizontal: 20}],
  inputContainerSrc: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  searchTxtInput: {
    flex: 1
  },
  searchIcon: {
    paddingTop: 15,
    paddingRight: 10,
    height: 50,
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
    fontSize: fontSizeMediumStyle.fontSize,
    color: theme.black
  },
  lineRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  lineText: {
    fontSize: theme.fontSizeSmall,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  greyLineLeft: {
    backgroundColor: theme.grey,
    height: 1,
    marginTop: 20,
    right: 20,
    width: 130
  },
  greyLineRight: {
    backgroundColor: theme.grey,
    height: 1,
    marginTop: 20,
    left: 20,
    width: 130
  },
  icon: {
    color: theme.black
  },
  burger: {
    paddingLeft: 10,
    color: theme.black
  },
};
