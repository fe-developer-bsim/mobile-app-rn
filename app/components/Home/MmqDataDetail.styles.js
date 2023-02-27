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
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
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
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    marginBottom: 10
  },
  borderCaution: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.greyLine,
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
    marginRight: 20
  },
  value: {
    color: theme.black,
    textAlign: 'right',
    flex: 1,
    fontWeight: theme.bold,
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
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  containerContent: [{alignItems: 'stretch', flex: 1}],
};
