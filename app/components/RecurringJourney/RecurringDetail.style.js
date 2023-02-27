import {theme} from '../../styles/core.styles';
import {fontSizeSmallStyle, textLightGreyStyle} from '../../styles/common.styles';

export default {
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.greyLine,
    flex: 1
  },
  containerListView: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.greyLine
  },
  contentContainer: {
    backgroundColor: theme.white,
    paddingRight: 10,
    paddingLeft: 20,
    paddingVertical: 10
  },
  icon: {
    color: theme.black,
    paddingHorizontal: 10
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textTitle: {
    color: theme.disabledGrey,
    fontSize: 10
  },
  oval: {
    backgroundColor: theme.white,
    borderColor: theme.green,
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    height: 10,
    width: 10,
    borderRadius: 40
  },
  line: {
    height: 40,
    width: 0,
    borderColor: theme.green,
    borderStyle: 'dashed',
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderRightColor: theme.green,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 12,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: theme.green
  },
  triangleIcon: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 5
  },
  row: {
    flexDirection: 'row'
  },
  rowMid: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingRight: 50
  },
  paddingContent: {
    paddingTop: 22
  },
  textAmount: {
    color: theme.black,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeExtraXL,
  },
  normalText: {
    color: theme.black,
    fontWeight: theme.fontWeightRegular,
    fontSize: theme.fontSizeNormal,
  },
  smallText: {
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightLight,
  },
  textTitleHeadContent: {
    paddingVertical: 10
  },
  paddingTop: {
    paddingTop: 15
  },
  padding: {
    paddingVertical: 10
  },
  contentRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 50
  },
  containerEditing: {
    backgroundColor: theme.white,
    justifyContent: 'space-between',
  },
  contentContainerEditing: {
    paddingRight: 20,
    paddingLeft: 30,
    paddingBottom: 20,
  },
  borderGrey: {
    backgroundColor: theme.greyLine,
    height: 15
  },
  buttonLargeTextStyle: {
    color: theme.white,
    fontSize: theme.fontSizeMedium
  },
  bottomContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 80
  },
  borderLine: {
    height: 2,
    backgroundColor: theme.greyLine
  },
  paddingBorder: {
    paddingTop: 20,
    paddingBottom: 10
  },
  contentContainerEditingBottom: {
    paddingRight: 20,
    paddingLeft: 30,
    paddingBottom: 20,
    paddingTop: 20
  },
  labelNotactive: {
    justifyContent: 'center',
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  notactivetext: {
    fontSize: theme.fontSizeLarge,
    color: theme.textGrey
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
  },
  containtextExplanation: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  textTitleBold: {
    color: theme.black,
    fontSize: 10,
    fontWeight: theme.fontWeightRegular,
  },
  noofferImage: {
    paddingTop: 110,
    alignItems: 'center',
    borderColor: theme.disabledGrey,
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 10,
  },
  imageSize: {
    alignItems: 'center',
    aspectRatio: 1.35,
    height: 170,
    width: 170,
    justifyContent: 'center',
  },
  informationVoucher: [{
    paddingTop: 20,
    fontFamily: 'Roboto'
  },
  fontSizeSmallStyle,
  textLightGreyStyle,
  ],
  transactionDate: [
    fontSizeSmallStyle,
    textLightGreyStyle,
  ],
  detailSchedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: theme.white
  },
  flex: {
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 50
  },
  flexRight: {
    marginRight: 5,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    flex: 1,
  },
};
