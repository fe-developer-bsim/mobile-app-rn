import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: [styles.contentContainerStyle, {
    backgroundColor: theme.white,
    flexGrow: 1,
  }],
  wrapContainer: {
    backgroundColor: theme.white,
    flexGrow: 1,
  },
  titleTxt: {
    fontSize: theme.fontSize20,
    color: 'black'
  },
  subtitleTxt: {
    color: theme.lightGrey,
    paddingVertical: 10
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10
  },
  buttonTxt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.black,
    height: 30
  },
  bgWhite: {
    backgroundColor: theme.white,
    marginVertical: 5,
    paddingVertical: 10
  },
  iconContainer: {
    flex: 0.7,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1.7,
  },
  simasTxt: [styles.fontSizeMediumStyle, {
    color: theme.brand,
    fontWeight: '900'
  }],
  imageOffer: {
    width: 50,
    height: 18
  },
  poinImage: {
    height: 15,
    width: 40
  },
  pad2: {
    paddingVertical: 1
  },
  accTxt: [styles.fontSizeXLStyle, {
    fontWeight: '800'
  }],
  balanceTxt: {
    color: theme.lightGrey,
  },
  arrowContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  cardIcon: {
    color: theme.red
  },
  arrowIcon: {
    paddingRight: 15,
    color: theme.red,
  },
  row2: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  accTxt2: [styles.bold, {
  }],
  imageOffer2: {
    width: 85,
    height: 85
  },
  imageOfferEmoney: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  borderCaution: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.greyLine,
    borderRadius: 10
  },
  containerIcon: [
    styles.containerWhiteStyle,
    {
      padding: 10,
    }
  ],
  explainIcon: {
    color: theme.black,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  caution: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight,
    marginRight: 10,
    paddingVertical: 10,
    flex: 1
  },
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
    fontSize: theme.fontSizeNormal,
    marginTop: -5,
    fontFamily: theme.roboto,
  },
  txtLight: {
    fontWeight: theme.fontWeightLight,
    color: theme.black,
    fontSize: theme.fontSizeSmall,
    paddingTop: 5,
    fontFamily: theme.robotoLight,
  },
  detailContainer: {
    flex: 10,
    paddingLeft: 20,
  },
  cardContainer: {
    alignItems: 'flex-start',
    backgroundColor: theme.white,
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 20
  },
  contentContainerStyle: [{flexGrow: 1, backgroundColor: 'white'}],
  container2: [
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
    marginHorizontal: 20
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
