import {fontSizeXLStyle, contentContainerStyle, fontSizeMediumStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  containerContent: [{alignItems: 'stretch', paddingBottom: 30}],
  row: {
    flexDirection: 'row',
  },
  containerText: {
    paddingVertical: 10
  },
  textTittle1: [
    fontSizeXLStyle,
    {
      color: theme.black,
      paddingTop: 10
    }
  ],
  textTittle2: [
    fontSizeXLStyle,
    {
      color: theme.black,
      paddingTop: 30
    }
  ],
  headText: {
    color: 'grey',
    marginBottom: 3,
  },
  titles2: [fontSizeXLStyle, {
    marginVertical: 10,
  }],
  titles3: [fontSizeXLStyle, {
    marginTop: 20,
  }],
  titles4: [fontSizeMediumStyle, {
    paddingVertical: 5
  }],
  greyLine: {
    backgroundColor: '#ECECEC',
    height: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonNext: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  subText: {
    fontSize: 15,
    color: 'black'
  },
  borderGreyTop: {
    backgroundColor: theme.greyLine,
    height: 10,
    marginHorizontal: -20,
    marginVertical: 20
  },
  containerInner: [contentContainerStyle, {
    paddingBottom: 10,
  }],
  titles: [fontSizeXLStyle, {
  }],
  rowRent: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  rentStart: {
    flex: 1,
    paddingBottom: 15,
    paddingRight: 10,
  },
  rentEnd: {
    alignSelf: 'flex-end',
    paddingBottom: 30,
    paddingLeft: 10,
    flex: 1,
  },
  halfWidth: {
    flex: 1
  }
};
