import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width;
const trueHeight = (trueWidth * 7) / 16;

export default {
  container: {
    backgroundColor: theme.white,
    flex: 1,
    justifyContent: 'space-between'
  },
  detailContainer: {
    backgroundColor: theme.white
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  offerImage: {
    width: trueWidth,
    height: trueHeight
  },
  labelContainer: {
    paddingTop: 20
  },
  indicator: {
    showsText: true,
    color: theme.brand,
    size: 50,
    thickness: 2
  },
  buttonContainer: {
    backgroundColor: theme.white,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  fullContainer: {
    paddingBottom: 20
  },
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    paddingBottom: 5,
    paddingTop: 5,
    paddingHorizontal: 50
  },
  borderGreyTop: {
    backgroundColor: theme.greyLine,
    height: 10,
    paddingHorizontal: 50
  },
  offerDetails: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingBottom: 20
  },
  label: {
    marginHorizontal: 10,
    color: theme.black
  },
  labelValidDate: {
    marginHorizontal: 10,
    marginTop: 10,
    color: theme.black,
  },
  labelFont: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: theme.fontSizeMediumStyle,
    color: theme.black,
    fontFamily: 'Roboto'
  },
  iconContainer:
  {
    marginTop: 10,
  },
  infoContainerTnC: {
    paddingHorizontal: 10,
  },
  webViewWidth: {
    width: width - 40,
  },
  labelContainerHTML: {
    paddingTop: 20,
    paddingHorizontal: 10
  }
};
