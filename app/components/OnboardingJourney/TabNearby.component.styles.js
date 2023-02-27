import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 40;
const trueHeight = (trueWidth * 7) / 16;
const filterWidth = (width / 3) + 30;
const stickyWidth = width / 3;

export default {
  listViewContainer: {
    flex: 1,
    marginBottom: 100
  },
  listViewContainerAllSmall: {
    flex: 1,
    paddingBottom: 110
  },
  listViewContainerAll: {
    flex: 1,
  },
  container: {
    backgroundColor: theme.containerGrey
  },
  offerContainer: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: theme.disabledGrey,
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: theme.contrast
  },
  offerDetails: {
    padding: 10
  },
  offerImage: {
    height: trueHeight
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
    color: 'white'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: theme.brand
  },
  headerText: {
    color: 'white',
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
  OffersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textstyle: {
    paddingHorizontal: 10,
    paddingTop: 10,
    fontSize: theme.fontSizeMedium
  },
  textstyleBold: {
    paddingHorizontal: 10,
    paddingTop: 10,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeMedium,
  },
  searchBox: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: theme.white,
  },
  searchBoxInput: {
    flex: 9.5,
    paddingRight: 20,
    paddingBottom: 10,
    backgroundColor: '#ECECEC',
    borderRadius: 100,
    marginVertical: 20
  },
  searchBoxIcon: {
    flex: 0.5,
    paddingTop: 35,
    paddingLeft: 20,
    paddingRight: 10
  },
  searchIcon: {
    height: 50,
    justifyContent: 'flex-end'
  },
  footerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  borderedContainer: {
    borderRadius: 100,
    width: filterWidth,
    overflow: 'hidden',
    backgroundColor: theme.white,
    position: 'absolute',
    bottom: 10,
    left: stickyWidth,
    right: stickyWidth,
    borderColor: theme.grey,
    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  filterContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  findNearby: {
    color: theme.black,
    paddingBottom: 2,
    textAlign: 'center'
  },
  iconDiscount: {
    paddingLeft: 2,
    color: theme.black
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 20
  },
  errorText: {
    textAlign: 'center',
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightMedium
  },
  searchTxtInput: {
    flex: 1,
  },
  searchInput: {
    paddingHorizontal: 20,
    height: 45,
  },
};
