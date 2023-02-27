import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 40;
const trueHeight = (trueWidth * 7) / 16;

export default {
  container: {
    backgroundColor: theme.containerGrey,
    flex: 1
  },
  offerContainer: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: theme.disabledGrey,
    marginVertical: 10,
    backgroundColor: theme.contrast,
  },
  offerDetails: {
    padding: 10,
  },
  offerImage: {
    width: trueWidth,
    height: trueHeight
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: theme.brand,
  },
  separatorContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
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
    color: 'white'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.brand
  },
  headerText: {
    color: 'white',
    padding: 20,
    fontSize: theme.fontSizeMedium
  },
  scrollContainer: {
    paddingBottom: 80
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
    backgroundColor: theme.containerGrey,
  },
  containerEgift: {
    backgroundColor: theme.containerGrey
  },
  OffersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textstyle: {
    paddingHorizontal: 20,
    paddingTop: 10
  },
  listViewContainer: {
    paddingHorizontal: 10,
    flex: 1
  }
};
