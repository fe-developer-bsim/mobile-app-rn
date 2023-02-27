import {contentContainerStyle, bold, fontSizeSmallStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';


export default {
  container: {
    flex: 1,
  },
  bgWhite: [contentContainerStyle, {
    backgroundColor: theme.white,
  }],
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.white,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTxt: [bold, {
    fontSize: theme.fontSize22,
  }],
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 10,
  },
  greyLine2: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  contentCont: {
    marginVertical: 10
  },
  headTxt: {
    paddingBottom: 2
  },
  valueTxt: [bold, {

  }],
  amountHead1: {
  },
  amountHead2: [fontSizeSmallStyle, {
    marginTop: 3,
    marginBottom: 15,
    color: theme.textLightGrey,
  }],
  amountHead2Red: [bold, fontSizeSmallStyle, {
    marginBottom: 15,
    marginTop: 3,
    color: theme.brand
  }],
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  row2: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  amountTxt2: {
    flex: 0.4,
    marginVertical: 15,
  },
  amountTxt3: {
    marginVertical: 15
  },
  amountTxt4: {
    marginVertical: 15,
    flex: 0.4,
  },
  amountTxt4View: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  amountTxt5View: {
    marginVertical: 15,
    flex: 0.5,
    alignItems: 'flex-end',
  },
  amountTxt5: {
    color: theme.green
  },
  iconContainer: {
    alignItems: 'flex-end',
    flex: 0.05
  },
  button2: {
    width: 135,
  },
  buttonTxt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.black,
    height: 30
  },
  mb10: {
    marginBottom: 10,
  }
};
