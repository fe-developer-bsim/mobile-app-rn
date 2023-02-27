import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 40;
const trueHeight = (trueWidth * 7) / 16;

export default {
  container: {
    backgroundColor: theme.whiteGrey,
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 0
  },
  detailContainer: {
    backgroundColor: theme.white
  },
  infoContainer: {
    padding: 20
  },
  offerImage: {
    width: trueWidth,
    height: trueHeight
  },
  labelContainer: {
    paddingBottom: 20
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
  containerRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center'
  },
  formHeader: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: theme.white
  },
  labelPicker: {
    fontSize: 8,
    paddingBottom: 0
  },
  picker: {
  },
  cgvTabDisclaimer: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  TexcgvTabDisclaimerText: {
    textAlign: 'justify',
    color: theme.softGrey
  }
};
