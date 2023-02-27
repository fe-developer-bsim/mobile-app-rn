import {theme} from '../../styles/core.styles';
import {fontSizeNormalStyle, flex_1, contentContainerStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';

const row = {
  flexDirection: 'row',
  paddingBottom: 10,
};

const markerContainer = [
  row, {
    justifyContent: 'flex-start'
  }
];

const {height} = Dimensions.get('window');
const trueHeight = height;

export default {
  detailContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  halfRow: {
    flex: 0.5,
    flexWrap: 'wrap'
  },
  detailTitle: [
    fontSizeNormalStyle,
    {
      color: theme.black,
    }
  ],
  detailText: [
    fontSizeNormalStyle,
    {
      color: theme.textLightGrey,
      textAlign: 'right'
    }
  ],
  headerTitle: {
    fontSize: theme.fontSizeXL,
    alignItems: 'flex-start',
    marginBottom: 25,
    color: theme.black
  },
  greyLineFull: {
    borderTopWidth: 1,
    borderColor: theme.greyLine
  },
  borderBottomRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  borderCaution: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.grey,
    marginTop: 20
  },
  caution: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight,
    marginRight: 10,
    paddingVertical: 7,
    flex: 1
  },
  title: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight,
  },
  value: {
    color: theme.black,
    textAlign: 'right',
    fontFamily: 'roboto',
  },
  value1: {
    color: theme.brand,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
  },
  newTitleContainer: [markerContainer, flex_1],
  container: [contentContainerStyle, {
  }],
  fullContainer: {
    height: trueHeight,
    backgroundColor: 'white'
  },
  explainIcon: {
    color: theme.black,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  appLogoquestion: {
    marginTop: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  explainIconCaution: {
    color: theme.black,
    paddingLeft: 5,
    transform: [{rotate: '180deg'}],
  },
  container1: {
    flex: 1,
  },
  buttonWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  containerContent: [{alignItems: 'stretch', flex: 1}],
  containerMonthlyPlacement: {
    backgroundColor: theme.grey,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 0,
    paddingVertical: 10,
  },
  mainTitleText: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    marginLeft: 10,
    marginRight: 5,
  },
  containerBorderMonthlyPlacement: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: theme.grey,
    paddingHorizontal: 10,
  },
  borderBottomAmount: {
    marginBottom: 10,
    justifyContent: 'flex-end',
  },
  taraAmountContainer: {
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: theme.greyLine,
    borderStyle: 'dashed',
  },
  rpText: {
    top: 12,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto,
    color: theme.black,
  },
  amountText: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto,
    color: theme.black,
  },
  textAmount: {
    fontSize: theme.fontSizeNormal,
    color: theme.textGrey,
    marginTop: 10,
    textAlign: 'center',
  },
};
