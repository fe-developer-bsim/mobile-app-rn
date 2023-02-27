import {theme} from '../../styles/core.styles';
import {fontSizeNormalStyle, flex_1, contentContainerStyle} from '../../styles/common.styles';

const row = {
  flexDirection: 'row',
  paddingBottom: 10,
};

const markerContainer = [
  row, {
    justifyContent: 'flex-start'
  }
];

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
    marginTop: 10,
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
  rowNoBorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    marginTop: 5,
  },
  arrowIcon: {
    color: theme.brand
  },
  viewMore: {
    color: theme.brand,
    paddingRight: 10,
    fontFamily: 'roboto'
  },
  newTitleContainer: [markerContainer, flex_1],
  container: [contentContainerStyle, {flex: 1, paddingTop: 20}],
  containerContent: [{alignItems: 'stretch', flex: 1}],
};
