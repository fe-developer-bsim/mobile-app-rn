import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
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
    width: width / 3
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
  subTitle: {
    paddingLeft: 40,
    paddingRight: 50,
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
    justifyContent: 'space-between'
  },
  titleField: {
    paddingTop: 25,
    marginBottom: -20,
    color: theme.grey,
    fontSize: theme.fontSizeSmall
  },
  fieldContainer: {
    borderColor: theme.white,
    paddingBottom: 20,
    fontSize: theme.fontSizeNormal,
  },
  errorContainer: {
    paddingHorizontal: 30,
    paddingTop: 10,
    width: 400,
  },
  bottomWrapper: {
    paddingBottom: 20,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  buttonNext: {
    paddingTop: 40,
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
    color: theme.white,
  },
  borderGrey: {
    backgroundColor: theme.greyLine,
    height: 3,
  },
  paddingTop: {
    paddingTop: 20
  }
};
