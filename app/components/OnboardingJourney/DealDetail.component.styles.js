import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 40;
const trueHeight = (trueWidth * 7) / 16;

export default {
  container: {
    paddingTop: 20,
    backgroundColor: theme.containerGrey,
    flex: 1,
    justifyContent: 'space-between'
  },
  detailContainer: {
    backgroundColor: theme.white
  },
  infoContainer: {
    padding: 20
  },
  offerImage: {
    width: trueWidth,
    height: trueHeight,
  },
  labelContainer: {
    paddingBottom: 20,
  },
  promoContainer: {
    paddingBottom: 10
  },
  labelFooter: {
    paddingTop: 20,
  },
  label: {
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    fontWeight: theme.fontWeightRegular
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
    marginHorizontal: 20,
    paddingBottom: 20
  },
  subtitle: {
    color: theme.black,
    fontWeight: theme.fontWeightLight
  },
  locateContainer: {
    backgroundColor: theme.opacityBlack,
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 90,
    flexDirection: 'row',
    borderRadius: 100,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  locateText: {
    color: theme.white
  },
  locateIcon: {
    color: theme.white,
    paddingLeft: 5
  }
};
