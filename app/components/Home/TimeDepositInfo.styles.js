import {theme} from '../../styles/core.styles';
import {fontSizeNormalStyle, fontSizeSmallStyle, flex_1} from '../../styles/common.styles';
import {contentContainerStyle} from '../../styles/common.styles';

const row = {
  flexDirection: 'row',
  paddingBottom: 10,
};

const markerContainer = [
  row, {
    justifyContent: 'flex-start'
  }
];

const subheading = [
  fontSizeSmallStyle,
  {
    paddingBottom: 10
  }
];

const markerStyle = {
  color: theme.grey,
};

const marker = [
  fontSizeNormalStyle,
  {color: theme.red, justifyContent: 'flex-start'}
];

export default {
  container: [contentContainerStyle, {flex: 1, paddingTop: 0}],
  containerContent: [{alignItems: 'stretch', flex: 1}],
  formContainer: {
    flex: 1,
    paddingTop: 20,
  },
  row: {
    ...row,
    flex: 1
  },
  borderBottomRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    marginBottom: 10
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    marginBottom: 10
  },
  value: {
    color: theme.black,
    textAlign: 'right',
    flex: 1,
    fontWeight: theme.bold,
    fontFamily: 'roboto',
  },
  carouselStyle: {
    marginBottom: 20
  },
  title: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight,
    marginRight: 20
  },
  markerStyle,
  newTD: {
    borderTopColor: theme.borderGrey,
  },
  marker,
  newTitleContainer: [markerContainer, flex_1],
  newNoteStyle: [subheading, markerStyle],
  newMarkerStyle: [marker, {paddingRight: 20}],
  markerContainer,
  subheading,
  closeTdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  redText: {
    color: theme.brand,
  },
  greyLine: {
    borderBottomWidth: 1,
    flex: 1,
    borderColor: theme.greyLine,
    marginBottom: 20
  },
  interestTextContainer: {
    flex: 2,
  }
};
