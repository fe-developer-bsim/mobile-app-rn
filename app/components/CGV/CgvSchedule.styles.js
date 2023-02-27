import {Dimensions} from 'react-native';
import {getViewWidth} from '../../utils/device.util';

const {width} = Dimensions.get('window');
const trueWidth = width - 40;
const trueHeight = (trueWidth * 7) / 16;
const timeWidth = (width - 50) / 8;
const dateWidth = (width - 40) / 5;
const slideWidth = getViewWidth(0.75);
const itemWidth = slideWidth * 0.2;


export default {
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 0,
    paddingHorizontal: 20
  },
  offerImage: {
    width: (trueWidth * 0.6),
    height: trueHeight * 2,
    marginVertical: 20,
  },
  containerImg: {
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: 'grey'
  },
  containerDetail: {
    marginHorizontal: 30,
    marginBottom: 50,
  },
  detailTittle: {
    paddingVertical: 20,
    fontSize: 25,
    color: 'black'
  },
  caroselDetailTextTittle: {
    paddingHorizontal: 0

  },
  containerDetailRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 15
  },
  line: {
    height: 1,
    borderBottomWidth: 0.2,
    borderBottomColor: 'grey',
    paddingTop: 10
  },
  lineGrey: {
    backgroundColor: '#ECECEC',
    height: 20,
    borderTopWidth: 1,
    borderTopColor: 'grey'
  },
  containerDetailCinema: {
    marginHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  containerRow: {
    padding: 0
  },
  viewSelect: {
    paddingTop: 20,
  },
  textSelect: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black'
  },
  textStudioType: {
    color: 'grey',
    paddingVertical: 10,
    fontSize: 12
  },
  bgWhite: {
    backgroundColor: 'white'
  },
  containerTime: {
    marginHorizontal: 20,
  },
  containerType: {
    paddingTop: 20
  },
  timeContainer: {
    paddingVertical: 10,
    paddingHorizontal: 0
  },
  slideStyle: {
    width: itemWidth,
  },
  rowCarousel: {
    flexDirection: 'row'
  },
  monthTextTittle: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingBottom: 10,
    color: 'black'

  },
  detailTextTittleRed: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'red',
    textAlign: 'center'
  },
  detailTextTittle: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  detailTextTittleTop: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingBottom: 20,
    textAlign: 'center'
  },
  detailTextTittleTopSelect: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingBottom: 15,
    textAlign: 'center'
  },
  containerTittle: {
    paddingBottom: 10,
  },
  nameTittle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    paddingTop: 15
  },
  roundTime: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    alignItems: 'center',
    width: dateWidth,
    justifyContent: 'space-between',
  },
  roundTimeDisable: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    backgroundColor: '#ECECEC',
    width: dateWidth,
    justifyContent: 'space-between',
  },
  roundTimeTextDisable: {
    color: 'grey',
    textAlign: 'center'
  },
  roundTimeText: {
    color: 'black',
    textAlign: 'center'
  },
  textMovieType: {
    color: 'black',
  },
  containerPadding: {
    paddingVertical: 10,
  },
  scrollContainer: {
    paddingBottom: 100
  },
  dateRoundSelect: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'red',
    width: timeWidth - 5,
    height: timeWidth - 8,
    backgroundColor: 'red',
    marginHorizontal: 10
  },
  dateRoundNotSelect: {
  },
  detailTextTittleSelected: {
    paddingTop: 5,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    textAlign: 'center'
  },
  touchableWhite: {
    backgroundColor: 'transparent'
  },
  stdRow: {
    flexDirection: 'row',
  }


};
