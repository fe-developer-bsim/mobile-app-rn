import {theme} from '../../styles/core.styles';
import {fontSizeNormalStyle, fontSizeSmallStyle, cardRightText, flex_1} from '../../styles/common.styles';
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

const titleContainer = [flex_1, {
  justifyContent: 'flex-end',
}];

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
  row,
  value: {
    color: theme.textLightGrey,
    alignSelf: 'flex-start',
    flex: 2
  },
  carouselStyle: {
    marginBottom: 20
  },
  title: [{
    marginRight: 20,
  }, cardRightText],
  noteStyle: {
    color: theme.grey,
  },
  markerStyle,
  newTD: {
    borderTopColor: theme.borderGrey,
    borderTopWidth: 1,
    borderBottomWidth: 0,
  },
  marker,
  newTitleContainer: [markerContainer, titleContainer],
  newNoteStyle: [subheading, markerStyle],
  newMarkerStyle: [marker, {paddingRight: 20}],
  markerContainer,
  subheading,
  titleContainer,
};
