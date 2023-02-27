import {fontSizeLargeStyle, bold} from '../../styles/common.styles';
import {theme, textBasic} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 20;
const trueHeight = (trueWidth * 7.5) / 16;

export default {
  refundCont: {
    color: theme.red,
    paddingTop: 10,
    flex: 1.5,
  },
  refundText: {
    color: theme.red,
    fontWeight: theme.fontWeightBold,
  },
  container: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 5,
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
  },
  bgWhite2: {
    backgroundColor: theme.white,
    paddingHorizontal: 20,
    height: 120,
    justifyContent: 'center',
  },
  bgGrey: {
    paddingTop: 5,
    backgroundColor: theme.white,
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
  merchantText3: [fontSizeLargeStyle],
  merchantText4: [fontSizeLargeStyle, {
    color: theme.red
  }],
  subText3: {
    paddingVertical: 5,
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
  iconContainer: {flex: 0.5},
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
    paddingVertical: 10,
  },
  buttonNext2: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  pb30: {
    paddingVertical: 10,
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
    fontSize: 24,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: theme.black,
    fontWeight: theme.fontWeightBold
  },
  halfWidth: {
    flex: 1
  }
};
