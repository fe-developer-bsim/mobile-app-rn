import {fontSizeLargeStyle, bold} from '../../styles/common.styles';
import {theme, textBasic} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 20;
const trueHeight = (trueWidth * 7.5) / 16;

export default {
  refundCont: {
    alignItems: 'flex-end',
    paddingTop: 15
  },
  refundText: {
    color: theme.red,
    fontWeight: theme.fontWeightBold,
  },
  container: {
    paddingHorizontal: 10,
  },
  bgWhite: {
    backgroundColor: theme.white,
    alignItems: 'center',
  },
  bgWhiteList: {
    backgroundColor: theme.white,
    paddingHorizontal: 15,
    height: 120,
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.greyLine,

    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  bgWhite2: {
    backgroundColor: theme.white,
    paddingHorizontal: 10,
    height: 150,
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.greyLine,
    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  bgGrey: {
    paddingTop: 5,
    backgroundColor: theme.cardGrey,
  },
  merchantText: [bold, {
    color: theme.red,
    fontSize: 25,
    paddingTop: 10,
    paddingHorizontal: 10
  }],
  merchantSubText: {
    fontSize: 16,
    paddingHorizontal: 10
  },
  merchantText2: [fontSizeLargeStyle, {
    color: theme.green
  }],
  merchantText3: {fontSize: 16,
    fontWeight: 'bold',
    color: theme.black,
  },
  merchantText4: [fontSizeLargeStyle, {
    color: theme.black,
    fontSize: 12,
    fontWeight: theme.fontWeightBold, 
  }],
  subText3: {
    paddingVertical: 2,
    fontSize: 12,
    color: theme.black,
  },
  progressContainer: {
    paddingVertical: 2
  },
  headText5: {
    color: 'red',
    marginTop: 5,
  },
  plusIcon: {color: theme.red},
  arrowIcon: {color: theme.red},
  waitIcon: {},
  iconContainer: {
    flex: 0.5, 
    paddingLeft: 5,
    marginTop: 10,
  },
  nameContainer: {flex: 1.5},
  arrowContainer: {flex: 0.5, justifyContent: 'center', alignItems: 'flex-end'},
  waitContainer: {},
  merchantContainer: {
    paddingHorizontal: 10,
  },
  merchantContainerList: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  plusContainer: {
    paddingRight: 5,
  },
  subMerchant: [textBasic, {
    fontSize: theme.fontSizeSmall,
    color: theme.grey,
    paddingHorizontal: 10,
    paddingTop: 10,
  }],
  borderGreyStyle: {
    borderTopColor: theme.grey,
    borderTopWidth: 1.5,
  },
  headText3: {
    color: 'grey',
    paddingTop: 6,
    paddingBottom: 3,
  },
  buttonNext: {
    paddingHorizontal: 20,
  },
  buttonNext2: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  pb30: {
    paddingBottom: 20,
  },
  imageOffer: {
    width: trueWidth,
    height: trueHeight
  },
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    marginTop: 10
  },
  titleStyle: {
    fontSize: 20
  },
  userIcon:
  {
    color: '#3892FC',
  },
  storeListCont: {
    alignItems: 'flex-end',
  },
  storeListText: {
    backgroundColor: theme.brand,
    color: theme.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  iconSize: {
    color: '#3892FC',
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  iconContainerImage: {
    marginRight: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
};
