import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: {
    justifyContent: 'space-between',
    backgroundColor: theme.white,
    paddingVertical: theme.padding,
    paddingHorizontal: 40,
  },
  headerContainer: {
    paddingBottom: theme.padding,
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
    color: theme.red,
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
    marginBottom: 10,
    fontSize: 22,
    color: theme.black,
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
  buttonContinue: {
    paddingTop: 20,
  },
  rowContainer: {
    flexDirection: 'column',
    paddingTop: 10,
  },
  leftRowContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  rightRowContainer: {
    position: 'absolute',
    left: 0,
    right: 0, 
    top: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  bold: [
    styles.bold,
  ], 
  header: {
    fontFamily: theme.robotoLight,
    paddingBottom: 3,
  },
  subHeader: {
    fontFamily: theme.roboto,
    paddingBottom: 5,
  },
  rowGrey: [
    styles.borderGreyStyle,
    styles.rowGray, 
    {borderTopWidth: 8}
  ],
  barStep: {
    flexDirection: 'row',
    height: 7
  },
  partOne: {
    backgroundColor: theme.brand,
    height: 7,
    width: width
  },
  titleSubHeader: {
    fontSize: 16,
    marginBottom: 10,
  }
};
