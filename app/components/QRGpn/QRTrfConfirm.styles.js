import {contentContainerStyle, fontSizeXLStyle, fontSizeLargeStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  containerContent: {
    borderWidth: 1,
    borderColor: theme.white,
    justifyContent: 'space-between',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  labelSpacing: {
    paddingVertical: 14
  },
  amountView: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subtext: {
    fontWeight: theme.fontWeightLight
  },
  redContainer: [contentContainerStyle, {
    backgroundColor: theme.brand,
  }],
  whiteContainer: [contentContainerStyle, {
    marginTop: -80,
  }],
  logoImage: {
    width: 85,
    height: 33,
    marginVertical: 25,
  },
  merchantText: [fontSizeXLStyle, {
    color: theme.white,
  }],
  whiteUnderlineText: {
    color: theme.white,
    textDecorationLine: 'underline'
  },
  whiteText: {
    color: theme.white,
  },
  row: {
    flexDirection: 'row'
  },
  info: {
    marginVertical: 20,
  },
  info2: {
    marginVertical: 20,
  },
  regCont: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  plusContainer: {
    paddingRight: 20,
  },
  plusIcon: {
    color: theme.white
  },
  bulletIcon: {
    paddingTop: 10,
    color: theme.grey
  },
  txt: [fontSizeLargeStyle],
  buttonAgree: {
    padding: 10
  },
  containerInner: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    alignItems: 'center'
  }
};
