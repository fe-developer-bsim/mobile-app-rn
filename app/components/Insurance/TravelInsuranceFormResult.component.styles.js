import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';

export default {
  container: {
    justifyContent: 'space-between',
    backgroundColor: theme.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  statusBarRow: {
    flexDirection: 'row',
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingHorizontal: 40,
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
    paddingVertical: 17,
  },
  padding: {
    paddingVertical: 10,
    paddingHorizontal: 40,
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
  tittleHeader: {
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    fontSize: 26,
    color: theme.black,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  subTittle: {
    paddingVertical: 3,
  },
  barProggres: {
    backgroundColor: theme.brand,
    height: 7,
    width: 500,
  },
  radioTittle: {
    fontSize: 20,
    color: theme.black,
  },
  radioSubTittle: {
    fontSize: 18,
  },
  radio: {
    paddingHorizontal: 40,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: theme.grey,
    backgroundColor: theme.white,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    backgroundColor: theme.white,
    paddingVertical: 17,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  textHeader: {
    fontFamily: theme.robotoLight,
    marginBottom: 3,
  },
  textSubheader: {
    fontFamily: theme.roboto
  },
  textContainer: {
    paddingVertical: 20,
  },
  textPadding: {
    paddingVertical: 5,
  },
  bold: [
    styles.bold
  ],
  textFont: {
    fontSize: 17,
  }, 
  headerFont: {
    fontSize: 17,
  },
  iconSuccess: {
    color: theme.green
  },
  iconContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconFail: {
    color: theme.red,
  },
  rowGrey: [
    {
      marginTop: 10,
    },
    styles.borderGreyStyle,
    styles.rowGray, {borderTopWidth: 5}
  ],
};
