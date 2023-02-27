import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';

export default {
  container: [
    styles.borderGreyStyle,
    {
      borderBottomWidth: theme.separatorSize,
      borderBottomColor: theme.separatorColor,
      paddingVertical: 30
    }
  ],
  containerDeposit: [
    styles.borderGreyStyle,
    {
      borderBottomWidth: 1,
      paddingVertical: 10
    }
  ],
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  labelContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  title: [
    styles.fontSizeNormalStyle,
    styles.textBrandStyle
  ],
  subtitle: [
    styles.fontSizeSmallStyle,
    styles.textBrandStyle, {
      paddingTop: 5
    }
  ],
  footer: [
    styles.fontSizeSmallStyle, {
      color: theme.lightGrey,
      paddingTop: 5
    }],
  featureIconContainer: {
    flex: 0,
    width: 40,
    height: 30,
    justifyContent: 'center',
  },
  featureIcon: {
    color: theme.brand,
  },
  navIconContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 30,
    height: 30,
  },
  navIcon: {
    color: theme.black,
  },
  disabled: {
    opacity: 0.5
  },
  optionItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.borderGrey,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    alignItems: 'center',
  },
  optionTextV: [styles.fontSizeMediumStyle, {
    color: theme.darkBlue
  }],

  optionText: [styles.fontSizeMediumStyle],
  paddingContent: {
    paddingHorizontal: 20,
  },
  summaryArea: {
    borderBottomWidth: 0.7,
    borderColor: theme.grey,
    marginTop: 10,
    marginBottom: 10
  },
  optionBox: {
    paddingHorizontal: 20
  },
  optionTextKet: [styles.fontSizeXSStyle, {
    color: theme.white
  }],
  optionRed: {
    backgroundColor: theme.brand,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: 'center',
    marginBottom: 8
  },
  optionKet: {
    backgroundColor: theme.textLightGrey,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: 'center',
    marginBottom: 8
  },
  boxstatus: {
    flexDirection: 'row'
  },
};
