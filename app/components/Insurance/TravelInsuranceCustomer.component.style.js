import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: {
    justifyContent: 'space-between',
    backgroundColor: theme.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  statusBarRow: {
    flexDirection: 'row',
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    paddingVertical: 10,
    fontSize: 17,
    textAlign: 'right',
  },
  paddingGrey: {
    paddingVertical: 5,
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
  tittleHeader: {
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    fontSize: 30,
    paddingVertical: 17,
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
    paddingHorizontal: 20,
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
  iconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  icon: {
    color: theme.brand,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7.5
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    bottom: 0,
    left: 0,
    right: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  titleHeader: {
    backgroundColor: theme.white,
    fontSize: 20,
    color: theme.black,
    paddingBottom: 10,
  },
  rowGrey: [
    styles.borderGreyStyle,
    styles.rowGray, 
    {borderTopWidth: 2},
  ],
  iconGap: {
    paddingHorizontal: 20,
  },
  bold: [
    styles.bold,
  ], 
  leftRowContainer: {
    alignItems: 'flex-end',
  },
  rightRowContainer: {
    alignItems: 'flex-end',
  },
  header: {
    fontFamily: theme.robotoLight,
  },
  subHeader: {
    fontFamily: theme.roboto,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  leftContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: 50,
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  barStep: {
    flexDirection: 'row',
    height: 7
  },
  partOne: {
    backgroundColor: theme.brand,
    height: 7,
    width: width * 5 / 7
  },
  partTwo: {
    backgroundColor: theme.grey,
    height: 7,
    width: width
  },
};
