import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  mainContainer: {
    backgroundColor: theme.white,
  },
  topBorder: {
    height: 2,
    backgroundColor: theme.grey
  },
  middleBorder: {
    height: 3,
    backgroundColor: theme.grey
  },
  topContainer: {
    padding: 30
  },
  middleContainer: {
    padding: 30
  },
  downContainer: {
    padding: 30,
    justifyContent: 'space-between'
  },
  checkboxStyle: {
    width: 20,
    height: 20,
    borderColor: theme.red
  },
  checkboxLabel: [
    styles.fontSizeNormalStyle,
    {
      color: theme.black,
      paddingHorizontal: 20
    }
  ],
  rowFieldAgreement: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  downContent: {
    justifyContent: 'space-between',
    padding: 20
  },
  footerContainer: {
    paddingTop: 30
  },
  serialNoContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 9
  },
  number: {
    fontSize: theme.fontSizeNormal,
    color: theme.black
  },
  pageTitle: {
    fontSize: theme.fontSizeNormal,
    color: theme.black
  },
  subTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10
  },
  checkBorder: {
    paddingHorizontal: 15,
  },
  paddingContain: {
    paddingVertical: 5,
    paddingRight: 40
  },
  bigBannerMigrate: {
    justifyContent: 'center',
    paddingTop: 30,
    height: 200
  },
  imageContain: {
    paddingTop: 40,
    paddingHorizontal: 50
  },
  bigTitle: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.bold,
    paddingRight: 70
  },
  bigSecTitle: {
    paddingTop: 20,
    paddingBottom: 10
  },
  paddingLine: {
    paddingVertical: 20
  },
  columnContainer: {
    flex: 1,
    backgroundColor: theme.white
  },
  barStep: {
    flexDirection: 'row',
    height: 7
  },
  partOne: {
    backgroundColor: theme.red,
    height: 7,
    width: width * 0.66
  },
  partTwo: {
    backgroundColor: theme.grey,
    height: 7,
    width: width
  },
  mainTitle: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.black
  },
  subTitleText: {
    fontSize: theme.fontSizeMedium,
    color: theme.black
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    flexGrow: 1
  },
  titleField: {
    paddingTop: 25,
    marginBottom: -20,
    color: theme.grey,
  },
  fieldContainer: {
    borderColor: theme.white,
    paddingBottom: 20,
    flex: 1
  },
  errorContainer: {
    paddingHorizontal: 30,
    paddingTop: 10,
    width: 400,
  },
  bottomWrapper: {
    justifyContent: 'space-between',
    paddingTop: 80
  },
  buttonNext: {
    paddingTop: 40,
    paddingHorizontal: width / 11,
    position: 'relative',
    width: width
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  buttonLogin: {
    color: theme.red,
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    width: 250,
    textAlign: 'center',
    color: theme.white
  },
  topContainerForm: {
    paddingHorizontal: 40,
    paddingTop: 20
  },
  subPading: {
    paddingTop: 5
  }
};
