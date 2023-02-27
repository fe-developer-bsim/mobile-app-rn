import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 40;
const trueHeight = (trueWidth * 7) / 16;
const bannerHeight = (trueWidth * 6) / 10;

export default {
  container: {
    padding: 5,
    backgroundColor: theme.white
  },
  offerContainer: {
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: theme.disabledGrey,
    marginVertical: 10,
    backgroundColor: theme.contrast,

    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  offerDetails: {
    padding: 10,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: theme.greyLine
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
  noOffers: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingTop: 10,
    paddingHorizontal: 20
  },
  containerNoPadding: {
    paddingVertical: 10,
    backgroundColor: theme.containerGrey,
  },
  containerEgift: {
    backgroundColor: theme.containerGrey
  },
  OffersContainer: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  textstyle: {
    paddingHorizontal: 20,
    paddingTop: 10
  },
  seeAll: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: 65,
    height: 25,
    borderRadius: 20,
    marginHorizontal: 10,
    position: 'absolute',
    right: 10,
    bottom: 45,
    alignSelf: 'flex-end',
  },
  burgerMenuContainer: {
    backgroundColor: 'rgba(252, 252, 245, 0.5)',
    width: 40,
    height: 40,
    borderRadius: 5,
    marginHorizontal: 18,
    marginVertical: 10,
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  seeAlltext: {
    color: theme.white,
    alignSelf: 'center',
    paddingTop: 5
  },
  offerBannerContainer: {
    width: width,
    height: bannerHeight,
  },
  greyLine3: {
    height: 20,
    backgroundColor: theme.greyLine,
  },
  offersStylesImage: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: theme.disabledGrey,
  },
  offerImageBanner: {
    width: trueWidth,
    height: trueHeight,
  },
  bannerFlex: {
    flex: 1
  },
  label: {
    marginHorizontal: 10,
    fontSize: theme.fontSizeSmall,
    color: theme.black
  },
  labelValidDate: {
    marginHorizontal: 10,
    color: theme.black
  },
  iconStyleBlack: {
    color: theme.black
  },
  greyLine: {
    height: 10,
    backgroundColor: theme.greyLine,
    marginVertical: 15
  },
  greyLine2: {
    height: 10,
    backgroundColor: theme.red,
    marginVertical: 50,
  },
  burger: {
    color: theme.black,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  bannercontainer: {
    marginVertical: 6
  },
  categoryTabContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 5,
    marginTop: 25
  },
  categoryActive: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: theme.pinkBrand,
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 5,
    justifyContent: 'center'
  },
  categoryInActive: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: theme.white,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: theme.grey,
    justifyContent: 'center'

  },
  activeText: {
    color: theme.white
  },
  inActiveText: {

  }
};
