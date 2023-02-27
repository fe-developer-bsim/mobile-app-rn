import {theme} from '../../../styles/core.styles';
import {fontSizeNormalStyle, bold, flex_1} from '../../../styles/common.styles';

export default {
  modalContainer: {
    alignSelf: 'stretch'
  },

  modalFontStyle: {
    fontSize: theme.fontSizeLarge,
    color: theme.text,
    paddingTop: theme.cardVerticalSpacing,
    paddingBottom: theme.cardVerticalSpacing,
  },

  arrowDownStyle: {
    position: 'absolute',
    right: 18,
    bottom: 16,
  },

  textStyle: [
    flex_1,
    fontSizeNormalStyle,
    bold
  ],
  arrowDownStyleDisabled: {
    color: theme.softGrey,
    marginRight: 20
  },

  dateSize: theme.fontSizeLarge,
  font: {
    fontSize: theme.fontSizeExtraXL
  },
  columnContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20
  },
  borderGrey: {
    height: 50,
    borderColor: theme.grey,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5
  },
  borderGreyFocus: {
    height: 58,
    borderColor: theme.grey,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5
  },
  textDate: {
    fontSize: theme.fontSizeNormal,
    color: theme.grey,
    fontFamily: theme.roboto,
    paddingHorizontal: 20
  },
  textDateFocus: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: theme.roboto,
    paddingHorizontal: 20
  },
  upperText: {
    fontFamily: theme.roboto,
    color: theme.grey,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightRegular
  },
  lowerText: {
    fontFamily: theme.roboto,
    color: theme.black,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightRegular
  },
  newArrowDownStyle: {
    transform: [{rotate: '90deg'}],
    color: theme.darkBlue,
    marginRight: 20
  },
  darkBlueLowerText: {
    fontFamily: theme.roboto,
    color: theme.darkBlue,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightRegular
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  borderGreyFocus2: {
    height: 58,
    borderColor: theme.grey,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  borderGrey2: {
    height: 58,
    borderColor: theme.grey,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingRight: 20,
  }
};
