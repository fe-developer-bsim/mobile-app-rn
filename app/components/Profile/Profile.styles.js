import {contentContainerStyle, bold, fontSizeLargeStyle, fontSizeMediumStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  headingSection: [contentContainerStyle, {
    alignItems: 'center',
    backgroundColor: theme.brand,
    paddingBottom: 30
  }],
  name: [bold, fontSizeLargeStyle, {
    color: 'white'
  }],
  userInfo: [fontSizeMediumStyle, {
    color: 'white',
    paddingVertical: 5
  }],
  nameLine: {
    borderTopColor: 'white',
    width: 60,
    marginVertical: 15,
    borderTopWidth: 1,
    opacity: 0.5
  },
  optionsList: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  optionsListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.borderGrey
  },
  titleContainer: {
    flex: 7
  },
  infoContainer: {
    flex: 3
  },
  arrow: {
    color: theme.primary
  },
  optionText: [fontSizeMediumStyle],

  selectLanguageStyle: {
    justifyContent: 'center',
    marginTop: -10,
    marginBottom: -10,
    borderWidth: 0
  },

  arrowPickerStyle: {
    paddingRight: -15,
    paddingLeft: 15
  },

  textPickerStyle: {
    textAlign: 'right'
  }
};
