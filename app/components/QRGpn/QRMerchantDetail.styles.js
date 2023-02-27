import {fontSizeXLStyle, fontSizeLargeStyle} from '../../styles/common.styles';
import {theme, textBasic} from '../../styles/core.styles';

export default {
  bgGrey: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.cardGrey,
  },
  bgWhite: {
    backgroundColor: theme.white,        
    padding: 10,
  },
  labelSpacing: {
    paddingVertical: 7
  },
  subtext: {
    fontWeight: theme.fontWeightLight
  },
  merchantText: [fontSizeXLStyle, {
    color: theme.red
  }],
  merchantText2: [fontSizeLargeStyle, {
    color: theme.green
  }],
  merchantText3: [fontSizeLargeStyle, {
  }],
  merchantText4: [fontSizeLargeStyle, {
    color: theme.red    
  }],
  plusIcon: {
    color: theme.red,
    paddingHorizontal: 13    
  },
  nameContainer: {
    marginLeft: 11
  },
  merchantContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
  },
  plusContainer: {
    paddingRight: 5,
  },
  subMerchant: [textBasic, {
    fontSize: theme.fontSizeSmall,
    color: theme.grey,
  }],
  borderGreyStyle: {
    borderTopColor: theme.grey,
    borderTopWidth: 1.5,
  },
  headText: {
    color: 'grey',
    marginBottom: 3,
  },
  headText3: {
    color: 'grey',
    marginTop: 5,
  },
  containerInner: {
    paddingHorizontal: 10,
  },
  containerText: {
    paddingVertical: 10
  },
  subText: {
    fontSize: 15,
    color: 'black'
  },
  containerTitle: {
    marginTop: 10,
    marginBottom: 5
  },
  titleText: [fontSizeXLStyle, {
    fontWeight: theme.fontWeightBold
  }]
};
