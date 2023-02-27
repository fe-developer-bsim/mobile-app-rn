import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

export default {
  buttonNext: {
    paddingVertical: 30,
  },
  containerWhite: {
    backgroundColor: theme.white
  },
  buttonFinish: {
    backgroundColor: theme.red,
    marginHorizontal: 20,
    marginTop: 20
  },
  buttonText: {
    color: theme.white,
    fontSize: 18,
  },
  whiteBottom: {
    paddingBottom: height,
    backgroundColor: theme.white
  },
  containerCode: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center'
  },
  codeBorder: {
    flexDirection: 'row',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: theme.grey,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.white,
    paddingVertical: 20,
    paddingLeft: 20,
  },
  imageLeft: {
    width: width * 15 / 100,
    justifyContent: 'center',
  },
  imageCenter: {
    width: width * 60 / 100,
  },
  imageRight: {
    width: width * 5 / 100,
    justifyContent: 'center',
  },
  merchantPayRp: {
    borderRadius: 50,
    padding: 5,
    backgroundColor: theme.lightBlue,
    borderWidth: 1,
    borderColor: theme.grey,
    alignItems: 'center',
  },
  containerCodeMenu: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  subtitleCode: {
    color: theme.lightGrey,
    fontSize: 12
  },
  imageRoundedBlue: {
    borderColor: theme.white,
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: theme.lightBlue
  },
  imageRoundedGreen: {
    borderColor: theme.white,
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: theme.green
  },
  iconBlue: {
    color: theme.greyLine
  },
  titleCode: {
    fontWeight: 'bold'
  },
  iconArrow: {
    color: theme.grey
  },
  iconColor: {
    color: theme.blueAmount
  },
};
