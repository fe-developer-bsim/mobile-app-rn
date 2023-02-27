import {Dimensions} from 'react-native';
import {theme} from '../../styles/core.styles';

const {width} = Dimensions.get('window');
const trueWidth = width - 40;
const trueHeight = (trueWidth * 7) / 16;

export default {
  container: {
    backgroundColor: theme.white,
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 0
  },
  offerImage: {
    width: (trueWidth * 0.6),
    height: trueHeight * 2,
    marginVertical: 20,
  },
  containerImg: {
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: theme.lightGrey,
  },
  containerDetail: {
    marginHorizontal: 30,
    marginBottom: 50,
  },
  detailTextTittle: {
    marginVertical: 20,
    fontWeight: 'bold',
  },
  containerDetailRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 15
  },
  containerDetailRowTrailer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 20
  },
  line: {
    height: 1,
    borderBottomWidth: 0.2,
    borderBottomColor: theme.lightGrey,
  },
  lineGrey: {
    height: 20,
    backgroundColor: theme.lineGrey,
  },
  containerDetailCinema: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  buttonLargeTextStyle: {
    color: theme.white,
    fontSize: 15
  },
  showingSynopsis: {
    fontSize: 12,
    color: theme.red,
  },
  showingSynopsisTittle: {
    fontWeight: 'bold',
    fontSize: 13,
    color: theme.red,
    justifyContent: 'flex-start',
  },
  containerDetailCinemaTrailer: {
    marginHorizontal: 30,
  },
  lineGreyButton: {
    height: 5,
    backgroundColor: theme.lineGrey,
  },
  playButton: {
    color: theme.red,
    justifyContent: 'flex-end',
  },
  rowLeft: {
    maxWidth: ((width - 30) * 70) / 100
  },
  rowRight: {
    maxWidth: ((width - 30) * 30) / 100
  },

};
