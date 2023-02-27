import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
import {fontSizeMediumStyle, buttonLargeTextStyle} from '../../styles/common.styles';

const {width, height} = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
  },
  titleContainer: {
    padding: 20,
    alignSelf: 'flex-start'
  },
  signaturePad: {
    width: width * 0.8,
    height: height * 0.5
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: theme.greyLine,
    paddingTop: 5,
    width: width * 0.8,
    marginBottom: 10
  },
  title: [
    fontSizeMediumStyle,
  ],
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20
  },
  buttonContainer: {
    marginTop: 90,
    paddingHorizontal: 10,
    flex: 1
  },
  middleContainer: {
    backgroundColor: theme.white,
    alignItems: 'center',
  },
  buttonText: [buttonLargeTextStyle],
  buttonTextClear: [buttonLargeTextStyle, {
    color: theme.brand,
    fontWeight: 'bold',
    justifyContent: 'center',
  }],
  buttonContainerClear: {
    paddingHorizontal: 10,
    color: theme.brand,
  },
  SilTitleHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
  SilTitleHeader: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
  },
  progressBar: {
    flexDirection: 'row',
    height: 7,
  },
  redBar: {
    backgroundColor: theme.blueAmount,
    flexDirection: 'row',
  },
  greyBar: {
    backgroundColor: theme.darkGrey,
    flexDirection: 'row',
  },
};
