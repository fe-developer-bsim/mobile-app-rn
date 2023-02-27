import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';

export default {
  container: {
    justifyContent: 'space-between',
    backgroundColor: theme.white,
    paddingVertical: 17,
    paddingHorizontal: 20,
  },
  statusBarRow: {
    flexDirection: 'row',
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: theme.grey,
  },
  buttonEdit: {
    paddingVertical: 17,
    backgroundColor: theme.white,
    paddingHorizontal: 40,
  },
  buttonTxt: {
    color: theme.brand,
    fontSize: 17,
    textAlign: 'right',
  },
  paddingGrey: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.greyLine,
  },
  statusBar: {
    flexDirection: 'row',
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    fontSize: 15,
    paddingVertical: 17,
    paddingHorizontal: 40,
    color: theme.black,
  },
  titleHeader: {
    backgroundColor: theme.white,
    fontSize: 20,
    color: theme.black,
  },
  titleSubheader: {
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    fontSize: 18,
    color: theme.black,
  },
  subTittle: {
    paddingVertical: 3,
  },
  statusBarProgress: {
    flexDirection: 'row',
  },
  barProggresRed: {
    backgroundColor: theme.brand,
    height: 7,
    width: 300,
  },
  barProggresGrey: {
    backgroundColor: theme.greyLine,
    width: 200,
    height: 7,
  },
  radioTittle: {
    fontSize: 20,
    color: theme.black,
  },
  radioSubTittle: {
    fontSize: 18,
  },
  addText: {
    fontSize: 15,
    color: 'black'
  },
  radio: {
    paddingHorizontal: 40,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: theme.grey,
    backgroundColor: theme.white,
  },
  buttonContinue: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  containerAdd: {
    flex: 9,
    borderBottomWidth: 1,
    borderBottomColor: theme.grey,
    borderTopWidth: 1,
    borderTopColor: theme.grey,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: theme.white,
  },
  buttonCheck: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 0,
    borderBottomColor: theme.grey,
    borderTopColor: theme.grey,
    paddingTop: 25,
    paddingBottom: 20,
  },
  labelCheck: {
    paddingHorizontal: 10,
    fontSize: 15,
  },
  checkSize: {
    size: 10
  },
  plusContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  plusIcon: {
    color: theme.brand,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7.5
  },
  rowGrey: [
    styles.borderGreyStyle,
    styles.rowGray, 
    {borderTopWidth: 2}
  ],
  italic: [
    styles.italic,
  ],
  bold: [
    styles.bold,
  ],
};
