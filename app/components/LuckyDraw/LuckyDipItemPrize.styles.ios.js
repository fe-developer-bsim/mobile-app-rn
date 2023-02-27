import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
  
export default {
  container: {
    paddingHorizontal: 10,
    padding: 10,
    backgroundColor: theme.white,
    flex: 1
  },
  cardContainer: {
    backgroundColor: theme.white,
    borderRadius: 3,
    marginVertical: 10,
    flexDirection: 'row',
    borderColor: theme.grey,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 0.4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    margin: 5
  },
  row: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 155,
    height: 94,
    justifyContent: 'center',
    borderRadius: 4
  },
  detailContainer: {
    paddingTop: 7,
    paddingBottom: 5,
    paddingRight: 20,
    width: width * 0.5,
  },
  detailContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 5,
  },
  wordingItemPrize: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wordingItemPrizeText: {
    color: theme.black,
    fontSize: theme.fontSizeMedium
  },
  textDescriptionStyle: {
    color: theme.softGrey,
    fontSize: theme.fontSizeSmall
  },
  description: {
    color: theme.black,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold
  },
  descriptionPoin: {
    color: theme.green,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  claimBox: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
    height: 25,
    backgroundColor: theme.red,
    padding: 5,
    borderRadius: 30
  },
  widthBox: {
    width: 90
  },
  descriptionClaimText: {
    color: theme.white,
    fontSize: theme.fontSizeSmall,
    textAlign: 'center'
  },
  wordingItemPrizeEmpty: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  imageContainerBackGround: {
    width: 155,
    height: 94,
    justifyContent: 'center',
    borderRadius: 4
  },
  imageurlEvoucher: {
    alignSelf: 'center',
    width: 55,
    height: 55,
    marginRight: 55
  }
};