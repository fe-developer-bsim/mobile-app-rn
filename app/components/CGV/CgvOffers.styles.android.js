import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 40;
const trueHeight = (trueWidth * 7) / 16;

export default {
  container: {
    backgroundColor: theme.containerGrey
  },
  offerContainerCinema: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.disabledGrey,
    marginTop: 10,
    backgroundColor: theme.contrast,
    marginHorizontal: 10
  },
  containerMovie: {
    maxWidth: (trueWidth / 2),
  },
  offerImage: {
    height: trueHeight * 1.5
  },
  offerContainer: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: theme.disabledGrey,
    marginVertical: 1,
    marginLeft: 13,
    backgroundColor: theme.contrast,
    width: (trueWidth / 2),
  },
  offerDetails: {
    padding: 10,
    height: trueHeight * 0.4,
    justifyContent: 'flex-start'
  },
  cinemaImage: {
    width: trueWidth + 20,
    height: trueHeight
  },
  offerCinemaDetails: {
    marginHorizontal: 20,
    marginVertical: 10
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: theme.brand
  },
  separatorContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center'
  },
  separatorText: {
    textAlign: 'center',
    flex: 1,
    color: theme.brand,
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSizeNormal
  },
  crossButtonWrapper: {
    padding: 20,
  },
  iconStyle: {
    color: theme.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: theme.brand
  },
  headerText: {
    color: theme.white,
    padding: 20,
    fontSize: theme.fontSizeMedium
  },
  scrollContainer: {
    paddingBottom: 100
  },
  promoDetailContainer: {
    padding: 10,
    flexDirection: 'row'
  },
  promoAmountContainer: {
    backgroundColor: theme.brand,
    padding: 5,
    justifyContent: 'center',
  },
  promoDetailDateContainer: {
    flex: 4,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  discountType: {
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    fontWeight: theme.fontWeightMedium
  },
  discountAmount: {
    color: theme.white,
    fontWeight: theme.fontWeightBold
  },
  boldText: {
    fontWeight: theme.fontWeightBold
  },
  tabbar: {
    backgroundColor: theme.white,
  },
  indicator: {
    backgroundColor: theme.brand,
  },
  tabTextActive: {
    color: theme.black
  },
  qrTag: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  qrTagText: {
    color: theme.qrPromoTurqoise,
    fontWeight: theme.fontWeightBold,
    fontStyle: 'italic'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  containerNoPadding: {
    paddingVertical: 10,
    backgroundColor: theme.containerGrey
  },
  tittleCinema: {
    fontWeight: 'bold',
    paddingTop: 10,
    fontSize: 15

  },
  contentCinema: {
    color: theme.lightGrey,
    paddingTop: 10,
    fontSize: 12,
    fontWeight: '100',

  },
  buttonCinema: {
    color: theme.red,
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 15
  },
  textOfferMovie: {
    fontSize: 11

  },
  contentCinemaCity: {
    color: theme.lightGrey,
    fontSize: 12,
    paddingVertical: 4
  }
};
