import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {height} = Dimensions.get('window');

export default {
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bgWhite: [
    styles.containerWhiteStyle,  
    {
      flex: 1,
      padding: 20,
      justifyContent: 'space-between'
    }],
  imageContainer: {
    flex: 4,
    aspectRatio: 1,
    alignItems: 'center'
  },
  imageList: {
    resizeMode: 'contain',
    flex: 1,
    width: 100,
    height: 100
  },
  txtBold: {
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    fontSize: theme.fontSizeSmall,
    marginTop: -5,
    fontFamily: theme.roboto,
  },
  txtLight: {
    fontWeight: theme.fontWeightLight,
    color: theme.black,
    fontSize: theme.fontSizeXS,
    paddingTop: 5,
    fontFamily: theme.robotoLight,
  },
  detailContainer: {
    flex: 10,
    paddingLeft: 30,
  },
  cardContainer: {
    alignItems: 'flex-start',
    backgroundColor: theme.white,
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 20
  },
  contentContainerStyle: [{flexGrow: 1, backgroundColor: 'white'}],
  iconContainerStyle: [{flexGrow: 1, backgroundColor: 'white', height: height / 2}],
  container: [
    styles.containerWhiteStyle,
    {
      flex: 1,
      padding: 10,
      justifyContent: 'space-between'
    }
  ],
  offerContainer: {
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.contrast,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 15,
    elevation: 4,
    shadowOffset: {width: 0, height: 1},
    shadowColor: 'grey',
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  cardContainer2: {
    alignItems: 'flex-start',
    backgroundColor: theme.white,
    flexDirection: 'row',
    marginVertical: 20,
    // marginHorizontal: 20,
    marginLeft: 30
  },
  button2: {
    height: 25,
    width: 100,
    top: 10,
  },
  closeBtn: {
    color: 'white',
    fontSize: theme.fontSizeXS,
  }
};
