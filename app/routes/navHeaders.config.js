import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions, Text, Platform, View} from 'react-native';
// import {TabNavigator} from 'react-navigation';
import {result} from 'lodash';
import {theme} from '../styles/core.styles';
import NavLeftLogo from '../components/NavHeader/NavLeftLogo.component';
import NavLeftCart from '../components/NavHeader/NavLeftCart.component';
import NavLeftInfo from '../components/NavHeader/NavLeftInfo.component';
import ProfileHeader from '../components/NavHeader/ProfileHeader.component';
import PayHeader from '../components/NavHeader/PayHeader.component';
// import TrfHeader from '../components/NavHeader/TrfHeader.component';
import TransactionEmoneyHeaderOptions from '../components/TransactionsEmoney/TransactionHeaderOptionsEmoney.component';
import CcHistoryHeaderOptions from '../components/CreditCardHistoryJourney/HistoryHeaderOptions.component';
import LoginSwitch from '../components/NavHeader/LoginSwitch.component';
import Logout from '../components/NavHeader/Logout.component';
import {language} from '../config/language';
import styles from './navHeaders.styles';
import {connect} from 'react-redux';
import LoginSwitchEP from '../components/NavHeader/LoginSwitchEasyPin.component';
import HeaderTitleBlack from '../components/NavHeader/HeaderTitle.component';
import SwitchTologin from '../components/NavHeader/SwitchToLogin.component';
import NavEvoucherHeader from '../components/NavHeader/NavEvoucherHeader.component';
import LocatorHeader from '../components/ATMLocator/LocatorHeader.component';
import TabBarComponent from '../components/TabBarComponent/TabBarComponent.js';
import LuckyDipHeader from '../components/NavHeader/LuckyDIpHeader.component';
import EmoneyHeader from '../components/NavHeader/EmoneyHeader.component';
import NavRightSkip from '../components/NavHeader/NavRightSkip.component';
import NavLeftEForm from '../components/NavHeader/NavLeftEForm.component';
import NavLeftEFormPGO from '../components/NavHeader/NavLeftEFormPGO.component';
import NavLeftOnboard from '../components/NavHeader/NavLeftOnboard.component';
import AlfacartHeader from '../components/NavHeader/AlfacartHeader.component';
import DigitalStoreHeader from '../components/NavHeader/DigitalStoreHeader.component';
import AlfacartCartHeader from '../components/NavHeader/AlfacartCartHeader.component';
import WishlistAlfacartHeader from '../components/NavHeader/WishlistAlfacartHeader.component';
import NavLeftBackEP from '../components/NavHeader/NavLeftBackEP.component';
import NavLeftClose from '../components/NavHeader/NavLeftClose.component';
import NavLeftLanding from '../components/NavHeader/NavLeftLanding.component';
import NavReset from '../components/NavHeader/NavReset.component';
import generateMainTabs from '../components/NavHeader/generateMainTabs.component';
import NavLeftBackRevamp from '../components/NavHeader/NavLeftBackRevamp.component';
import NavBurgerNew from '../components/NavHeader/NavBurgerNew.component';
import NavLeftBackMenuSearch from '../components/NavHeader/NavLeftBackMenuSearch.component';
import FAQmembershop from '../components/NavHeader/FAQmembership.component';
import FAQScoreNilaiQHeader from '../components/NavHeader/FAQScoreNilaiQHeader.component';

const Title = ({langKey}) => <Text style={styles.title}>{language[langKey]}</Text>;
const TitleWhite = ({langKey}) => <Text style={styles.titleWhite}>{language[langKey]}</Text>;
const TitleRed = ({langKey}) => <Text style={styles.titleRed}>{language[langKey]}</Text>;
const TitleMgm = ({langKey}) => <Text style={styles.titleMgm}>{language[langKey]}</Text>;
const TitleTransferProxy = ({langKey}) => <Text style={styles.titleTransferProxy}>{language[langKey]}</Text>;
const mapStateToProps = ({currentLanguage, simasPoin, egiftCart, navigation, inboxCounter, egiftList, generateCodeOnboard, config, tutorialProduct, merchantCart, user, cartAlfacart, wishlistAlfacart, tutorialOnboard, cartCMI, wishlistCMI, currentMerchant}) => ({currentLanguage, simasPoin, egiftCart, navigation, inboxCounter, egiftList, generateCodeOnboard, config, tutorialProduct, merchantCart, user, cartAlfacart, wishlistAlfacart, tutorialOnboard, cartCMI, wishlistCMI, currentMerchant}); // currentLanguage is passed to make sure that the component Title re-renders on language change
export const HeaderTitle = connect(mapStateToProps)(Title);
export const HeaderWhite = connect(mapStateToProps)(TitleWhite);
export const HeaderRed = connect(mapStateToProps)(TitleRed);
export const HeaderMgm = connect(mapStateToProps)(TitleMgm);
export const HeaderTransferProxy = connect(mapStateToProps)(TitleTransferProxy);
const ConnectedNavLeftCart = connect(mapStateToProps)(NavLeftCart);
const ConnectedProfileHeader = connect(mapStateToProps)(ProfileHeader);
const ConnectedLoginSwitch = connect(mapStateToProps)(LoginSwitch);
const ConnectedNavEvoucherHeader = connect(mapStateToProps)(NavEvoucherHeader);
const ConnectedAlfacartHeader = connect(mapStateToProps)(AlfacartHeader);
const ConnectedDigitalStoreHeader = connect(mapStateToProps)(DigitalStoreHeader);
const ConnectedLocatorHeader = connect(mapStateToProps)(LocatorHeader);
const ConnectedPayHeader = connect(mapStateToProps)(PayHeader);
// const ConnectedTrfHeader = connect(mapStateToProps)(TrfHeader);
const ConnectedEmoneyHeader = connect(mapStateToProps)(EmoneyHeader);
const ConnectedNavRightSkip = connect(mapStateToProps)(NavRightSkip);
const ConnectedNavRightFAQ = connect(mapStateToProps)(FAQmembershop);
const ConnectedAlfacartCartHeader = connect(mapStateToProps)(AlfacartCartHeader);
const ConnectedWishlistAlfacartHeader = connect(mapStateToProps)(WishlistAlfacartHeader);

const ConnectedNavLeftInfo = connect(mapStateToProps)(NavLeftInfo);
const ConnectedGenerateIcon = connect(mapStateToProps)(generateMainTabs);
const ConnectedNavLeftLanding = connect(mapStateToProps)(NavLeftLanding);
const ConnectedNavRightFAQScoreNilaiQ = connect(mapStateToProps)(FAQScoreNilaiQHeader);

Title.propTypes = {langKey: PropTypes.string};
TitleWhite.propTypes = {langKey: PropTypes.string};
TitleRed.propTypes = {langKey: PropTypes.string};
TitleMgm.propTypes = {langKey: PropTypes.string};
TitleTransferProxy.propTypes = {langKey: PropTypes.string};


export const generatedIcon = (focusedIcon, unFocusedIcon, isScan, navProps) => {
  const IconGenerator = (props) => {
    const dispatch = navProps.navigation.dispatch;
    const {focused} = props;
    return (
      <View>
        <ConnectedGenerateIcon dispatch={dispatch} focused={focused} isScan={isScan} focusedIcon={focusedIcon} unFocusedIcon={unFocusedIcon}/>
      </View>
    );
  };
  IconGenerator.propTypes = {
    focused: PropTypes.string,
    tintColor: PropTypes.string,
    tutorialProduct: PropTypes.object
  };
  return IconGenerator;
};

export const navigationOptions = {
  headerBrandRevamp: {
    headerTintColor: theme.contrast,
    headerStyle: {
      backgroundColor: theme.radicalRed,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      height: 80,
      paddingLeft: 15
    },
  },
  headerBrandPaymentStatus: {
    headerTintColor: theme.contrast,
    headerStyle: {
      backgroundColor: theme.radicalRed,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0
    },
    headerLeft: null,
  },
  headerBrand: {
    headerTintColor: theme.contrast,
    headerStyle: {
      backgroundColor: theme.brand,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      height: 80,
      paddingLeft: 15
    }
  },
  headerBrandDark: {
    headerTintColor: theme.contrast,
    headerStyle: {
      backgroundColor: theme.darkRed,
      borderBottomWidth: 0,
      elevation: 0,
      shadowColor: 'transparent',
      height: 80,
      paddingLeft: 15
    }
  },
  headerWhite: {
    headerTintColor: theme.brand,
    headerStyle: {
      backgroundColor: theme.white,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      height: 80,
      paddingLeft: 15
    }
  },
  headerRed: {
    headerStyle: {
      backgroundColor: theme.radicalRed,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      height: 80,
      paddingLeft: 15
    }
  },
  headerNoColor: {
    headerTintColor: theme.white,
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      height: 80,
      paddingLeft: 15
    }
  },
  headerCenterTitle: {
    headerTintColor: theme.white,
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      paddingHorizontal: 15,
      height: 80,
    },
    headerTitleStyle: {
      alignSelf: 'center'
    }
  },
  headerGreen: {
    headerTintColor: theme.contrast,
    headerStyle: {
      backgroundColor: '#1bc276',
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      height: 80,
      paddingLeft: 15
    }
  },
  headerTransparent: {
    headerTintColor: theme.contrast,
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0,
      shadowColor: 'transparent',
      height: 80,
      paddingLeft: 15
    }
  },
  headerWhiteOld: {
    headerTintColor: theme.brand,
    headerStyle: {
      backgroundColor: theme.white,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      height: 80,
      paddingLeft: 15
    }
  },
  headerGreySoft: {
    headerTintColor: theme.brand,
    headerStyle: {
      backgroundColor: theme.greyLine,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      height: 80,
      paddingLeft: 15
    }
  },
  headerBlackCamera: {
    headerTintColor: theme.brand,
    headerStyle: {
      backgroundColor: theme.black,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      height: 80,
      paddingLeft: 15
    }
  },
  headerNewBrand: {
    headerTintColor: theme.white,
    headerStyle: {
      backgroundColor: theme.brand,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      height: 80,
      paddingLeft: 15
    }
  },
  headerNoColorRemittance: {
    headerTintColor: theme.contrast,
    headerStyle: {
      backgroundColor: theme.radicalRed,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
    }
  },
  headerPinkBrand: {
    headerTintColor: theme.white,
    headerStyle: {
      backgroundColor: theme.pinkBrand,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
    }
  },
  headerLightDenim: {
    headerTintColor: theme.white,
    headerStyle: {
      backgroundColor: theme.lightDenim,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      height: 80,
      paddingLeft: 15
    },
  },
  headerNoColorMgm: {
    headerTintColor: theme.contrast,
    headerStyle: {
      backgroundColor: theme.radicalRed,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      height: 80,
      paddingLeft: 15
    }
  },
  headerNoColorMenuSearch: {
    headerTintColor: theme.brand,
    headerStyle: {
      backgroundColor: theme.white,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      height: 80,
      paddingLeft: 15
    }
  },
  headerNoColorTransferProxy: {
    headerTintColor: theme.brand,
    headerStyle: {
      backgroundColor: theme.radicalRed,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
      height: 80,
      paddingLeft: 15
    }
  },
  gesturesEnabled: false,
};

export const LandingPageHeader = {
  headerTintColor: theme.brand,
  headerStyle: {
    backgroundColor: theme.contrast,
    borderBottomWidth: 0,
    shadowColor: theme.contrast,
    elevation: 0,
  }
};

export const LoginPasswordInHeader = (props) => {
  const dispatch = props.navigation.dispatch;
  const loginLanding = result(props, 'navigation.state.params.fromLuckyDip', '');
  const options = {
    ...navigationOptions.headerBrand,
    headerLeft: (<NavLeftBackEP dispatch={dispatch} isBrandColor navParams={props} />),
    headerRight: (<LoginSwitchEP text={language.LOGIN__PASSWORD_NAVBAR} dispatch={dispatch} isBrandColor navigateTo='Login' loginLanding={loginLanding}/>),
    tabBarVisible: false
  };
  return options;
};

export const LoginPasswordInHeaderRevamp = () => {
  const options = {
    ...navigationOptions.headerBrandRevamp,
  };
  return options;
};

export const LoginAccount = () => {
  const options = {
    ...navigationOptions.headerBrandRevamp,
    tabBarVisible: false
  };
  return options;
};

export const EasyPinInHeader = (props) => {
  const state = props.navigation.state;
  const dispatch = props.navigation.dispatch;
  const disableEasyPinLogin = result(state, 'params.disableEasyPinLogin', false);
  const regisATM = result(state, 'params.regisATM', false);
  if (regisATM) {
    return {
      ...navigationOptions.headerWhite
    };
  }  else {
    return {
      ...LandingPageHeader,
      tabBarVisible: false,
      headerLeft: <HeaderTitle titleBlack={'LOG_IN__HEADER'} />,
      headerRight: disableEasyPinLogin || regisATM ? null : <LoginSwitch resetToLanding dispatch={dispatch} text={language.LOGIN__EASYPIN_NAVBAR} isBrandColor navigateTo='LoginWithEasyPin'/>
    };
  }
};

export const RegisterInHeader = (props) => {
  const state = props.navigation.state;
  const forgotPassword = result(state, 'params.forgotPassword', false);
  if (forgotPassword) {
    return {
      ...LandingPageHeader,
      headerTitle: language.ONBOARDING__FORGOT_PASSWORD_TITLE_HEADER,
      tabBarVisible: false,
    };
  } else {
    return {
      ...LandingPageHeader,
      tabBarVisible: false,
    };
  }
};

// for adding MGM code "<View style={styles.row}><View><MGMHeader navigate={navigate} headerTheme='white' dispatch={dispatch} state={state}/></View>" temporarrily disabling

export const BankAccNavConfig = (props) => {
  const dispatch = props.navigation.dispatch;
  const options = {
    headerStyle: {
      ...navigationOptions.headerRed.headerStyle,
      paddingLeft: 15
    },
    headerTitle: <HeaderTitleBlack titleWhite={'NEW_BANK_ACC_ACCOUNT'} />,
    headerLeft: <NavLeftLogo headerTheme='white' dispatch={dispatch}/>,
  };
  return options;
};

export const DashboardNavConfig = (props) => {
  const navigate = props.navigation.navigate;
  const dispatch = props.navigation.dispatch;
  const options = {
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingLeft: 20
    },
    headerLeft: (<NavLeftLogo headerTheme='white' dispatch={dispatch}/>),
    headerRight: (<ConnectedProfileHeader navigate={navigate} headerTheme='white' dispatch={dispatch}/>)
  };
  return options;
};

export const MainIndexPageNavConfig = (props) => {
  const navigate = props.navigation.navigate;
  const dispatch = props.navigation.dispatch;
  const options = {
    headerTintColor: theme.contrast,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingLeft: 20
    },
    headerRight: (<ConnectedProfileHeader headerTheme='white' navigate={navigate} dispatch={dispatch}/>),
    tabBarVisible: true
  };
  return options;
};

export const PayHeaderConfig = (props) => {
  const navigate = props.navigation.navigate;
  const dispatch = props.navigation.dispatch;
  const options = {
    headerTintColor: theme.contrast,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingLeft: 20
    },
    headerLeft: (<NavLeftLogo navigate={navigate} dispatch={dispatch}/>),
    headerRight: (<ConnectedPayHeader headerTheme='white' navigate={navigate} dispatch={dispatch}/>),
    tabBarVisible: true
  };
  return options;
};

export const TrfHeaderConfig = () => {
  // const navigate = props.navigation.navigate;
  // const dispatch = props.navigation.dispatch;
  const options = {
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerNewBrand.headerStyle,
      paddingLeft: 20
    },
    tabBarVisible: true
  };
  return options;
};

export const tabsOptions = {
  // TODO: move it to style file
  // ...TabNavigator.Presets.AndroidTopTabs,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  lazy: true,
  swipeEnabled: false,
  tabBarComponent: TabBarComponent,
  tabBarOptions: {
    labelStyle: {
      width: Dimensions.get('window').width / 5, // we know there are 5 tabs
      fontFamily: theme.roboto,
      fontSize: theme.fontSizeSmall,
      paddingBottom: 5
    },
    indicatorStyle: {
      backgroundColor: 'transparent'
    },
    activeTintColor: theme.brand,
    inactiveTintColor: theme.black,
    tintColor: theme.brand,
    showIcon: true,
    style: {
      backgroundColor: theme.contrast,
      borderTopWidth: 0.5,
      borderTopColor: theme.grey,
      height: 65,
      paddingBottom: 5
    },
    tabStyle: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      width: Dimensions.get('window').width / 5, // we know there are 5 tabs
      marginTop: 4,
    },
  },
  backBehavior: 'initialRoute',
};

export const transactionsNavConfig = (props) => {
  const dispatch = props.navigation.dispatch;
  const state = props.navigation.state;
  const headerName = result(state, 'params.name', 'DASHBOARD__TRANSACTION_HEADER');
  const options = {
    ...navigationOptions.headerCenterTitle,
    headerTitle: (<HeaderTitleBlack titleWhite={headerName} />),
    headerLeft: (<NavLeftBackEP dispatch={dispatch} isBrandColor goBack={true} />),
    headerRight: (<View/>),
    tabBarVisible: false,
    headerBackTitle: null
  };
  return options;
};

export const ccHistoryNavConfig = (props) => {
  const navigate = props.navigation.navigate;
  const dispatch = props.navigation.dispatch;
  const state = props.navigation.state;
  const options = {
    ...navigationOptions.headerNoColor, // args: navigation, childRouter,
    tabBarVisible: false,
    headerRight: (<CcHistoryHeaderOptions navigate={navigate} dispatch={dispatch} state={state}/>)
  };
  return options;
};

export const profileHeader = (nav) => ({
  ...navigationOptions.headerBrand,
  headerRight: <Logout dispatch={nav.navigate.dispatch}/>
});

export const offersHeader = (props) => {
  const navigation = props.navigation.navigation;
  const isLogin = result(navigation, 'state.params.isLogin', false);
  return {
    ...navigationOptions.headerWhite,
    headerTitle: <HeaderTitle titleBlack={'PROFILE__OPTION_OFFERS'} />,
    headerVisible: isLogin
  };
};

export const noHeader = {
  header: null
};

export const AuthenticateHeader = (props) => {
  const state = props.navigation.state;
  const otpOrEasypin = result(state, 'params.isEasypin', false) ? false : result(state, 'params.shouldSendSmsOtp', false);
  const isOtp = result(state, 'params.isOtp', false);
  const isOwnAccount = result(state, 'params.isOwnAccount', false);
  if (isOwnAccount) {
    return {
      ...navigationOptions.headerBrand,
      headerVisible: false,
      tabBarVisible: false,
    };
  }  else if (otpOrEasypin || isOtp) {
    return {
      ...navigationOptions.headerGreen,
      headerVisible: false,
      tabBarVisible: false,
    };
  } else {
    return {
      ...navigationOptions.headerBrand,
      headerVisible: false,
      tabBarVisible: false,
    };
  }
};

export const FaceRecognitionLoginTitle = (props) => {
  const dispatch = props.navigation.dispatch;
  const state = props.navigation.state;
  if (result(state, 'params.action', 'Register') === 'RegisterExisting') {
    return ({
      ...LandingPageHeader,
      headerLeft: null,
      headerRight: <LoginSwitchEP text={language.LOGIN__SKIP} dispatch={dispatch} isBrandColor isBrandText={true} completedOnboarding={true} params={result(state, 'params.params', {})}/>
    });
  } else if (result(state, 'params.action', 'Register') === 'RegisterLockdown') {
    return ({
      ...LandingPageHeader,
      headerLeft: null,
      headerRight: <LoginSwitchEP text={language.LOGIN__SKIP} dispatch={dispatch} isBrandColor isBrandText={true} goDashboard={true} params={result(state, 'params.params', {})}/>
    });
  } else if (result(state, 'params.action', 'Register') === 'Register') {
    return ({
      ...LandingPageHeader,
      headerLeft: null,
      headerRight: <LoginSwitchEP text={language.LOGIN__SKIP} dispatch={dispatch} isBrandColor isBrandText={true} resetToLanding={true} navigateTo='EasyPin'
        params={result(state, 'params.params', {})} skipRegisterFace={true}/>
    });
  } else {
    return ({
      ...LandingPageHeader,
      tabBarVisible: false,
      headerRight: <LoginSwitchEP resetToLanding text={language.LOGIN__EASYPIN_NAVBAR} dispatch={dispatch} isBrandColor isBrandText={true} navigateTo='LoginWithEasyPin'/>
    });
  }
};

export const headerATMregister = () => ({
  ...navigationOptions.headerWhite,
  tabBarVisible: false
});

export const LandingNavConfig = (props) => {
  const onLockdown = result(props, 'navigation.state.params.resetHeader', false);
  const dispatch = props.navigation.dispatch;
  if (onLockdown) {
    return {
      ...LandingPageHeader,
      headerRight: <LoginSwitch dispatch={props.dispatch} text={language.LOGIN__EASYPIN_NAVBAR} isBrandColor navigateTo='LoginWithEasyPin'/>
    };
  }  else {
    return {// args:dispatch, goBack, navigate, setParams
      headerTintColor: theme.brand,
      headerStyle: {
        ...navigationOptions.headerWhite.headerStyle,
        paddingLeft: 20,
        paddingRight: 20,
      },
      headerLeft: <NavLeftLogo headerTheme='white' dispatch={dispatch}/>,
    };
  }
};

export const EditTransferHeader = (props) => {
  const state = props.navigation.state;
  const maxRecurrence = result(state, 'params.maxRecurrence', 0);
  const recurringInterval = result(state, 'params.recurringInterval', 0);
  if (!maxRecurrence && !recurringInterval) {
    return {
      ...navigationOptions.headerWhite,
      headerTitle: <HeaderTitleBlack titleBlack={'RECURRING__EDIT_HEADER_SCHEDULE_TITLE'} />,
      tabBarVisible: false
    };
  } else {
    return {
      ...navigationOptions.headerWhite,
      headerTitle: <HeaderTitleBlack titleBlack={'RECURRING__EDIT_HEADER_RECURRING'} />,
      tabBarVisible: false
    };
  }
};

export const EmoneyRegisterHeader = (props) => {
  const dispatch = props.navigation.dispatch;
  const options = {
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingLeft: 20
    },
    headerLeft: (<NavLeftLogo headerTheme='white' dispatch={dispatch}/>),
    headerRight: (<SwitchTologin dispatch={dispatch}/>)
  };
  return options;
};

export const transactionsEmoneyNavConfig = (props) => {
  const navigate = props.navigation.navigate;
  const dispatch = props.navigation.dispatch;
  const state = props.navigation.state;
  const options = {
    headerTitle: result(state, 'params.name', language.LOGIN__APPNAME), // args: navigation, childRouter,
    ...navigationOptions.headerWhite,
    headerRight: (<TransactionEmoneyHeaderOptions navigate={navigate} dispatch={dispatch} navProps={state}/>),
    tabBarVisible: false
  };
  return options;
};

export const shopHeader = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingLeft: 20
    },
    headerLeft: <ConnectedNavLeftCart headerTheme='white' dispatch={props.dispatch}/>,
  };
  return options;
};


export const offersShopHeader = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingRight: 20
    },
    headerRight: <ConnectedNavEvoucherHeader headerTheme='white' navigate={props} dispatch={props.dispatch}/>
  };
  return options;
};

export const alfacartHeader = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingRight: 20
    },
    headerRight: <ConnectedAlfacartHeader headerTheme='white' navigate={props} dispatch={props.dispatch}/>
  };
  return options;
};

export const digitalStoreHeader = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingRight: 20,
    },
    headerTitle: <HeaderTitleBlack titleBlack={'ALFACART__HEADER_TITTLE'} />,
    headerRight: <ConnectedDigitalStoreHeader headerTheme='white' navigate={props} dispatch={props.dispatch}/>,
    tabBarVisible: false
  };
  return options;
};

export const MainTabsHeader = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingLeft: 20,
      paddingRight: 20
    },
    headerLeft: <NavLeftLogo headerTheme='white' dispatch={props.dispatch}/>,
    headerRight: <ConnectedNavLeftCart headerTheme='white' dispatch={props.dispatch}/>,
  };
  return options;
};

export const LandingChooseProduct = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingLeft: 20,
      paddingRight: 20
    },
    headerLeft: <NavLeftLogo headerTheme='white' dispatch={props.navigation.dispatch} />,
    headerRight: <ConnectedLoginSwitch dispatch={props.navigation.dispatch} text={language.IDENTITYFORM__HAVE_AN_ACCOUNT} text2={language.IDENTITYFORM__HAVE_AN_ACCOUNT_LOG_IN} isLogin resetLoginOrCreate isBrandColor navigateTo='Login' />
  };
  return options;
};

export const LandingLogin = (props) => {
  const onLockdown = result(props, 'navigation.state.params.resetHeader', false);
  if (onLockdown) {
    return {
      ...LandingPageHeader,
      tabBarVisible: false,
      headerRight: <LoginSwitch dispatch={props.navigation.dispatch} text={language.LOGIN__EASYPIN_NAVBAR} isBrandColor navigateTo='LoginWithEasyPin'/>,
      headerLeft: null,
    };
  }  else {
    return {// args:dispatch, goBack, navigate, setParams
      headerTintColor: theme.brand,
      headerStyle: {
        ...navigationOptions.headerWhite.headerStyle,
        paddingLeft: 20,
        paddingRight: 20
      },
      tabBarVisible: false,
      headerLeft: <NavLeftLogo headerTheme='white' dispatch={props.navigation.dispatch} />,
      headerRight: <ConnectedLoginSwitch dispatch={props.navigation.dispatch} text={language.LOGIN__DONT_HAVE_ACCOUNT} text2={language.INTRODUCTION__REVAMP_REGISTER} resetLoginOrCreate isCreate isBrandColor navigateTo='ChooseRegistration' />,
    };
  }
};

export const atmLocator = (props) => {
  const navigate = props.navigation.navigate;
  const dispatch = props.navigation.dispatch;
  const state = props.navigation.state;
  const setParams = props.navigation.setParams;
  const options = {// args:dispatch, goBack, navigate, setParams
    ...navigationOptions.headerWhite,
    headerTitle: <HeaderTitleBlack titleBlack={'ATM_LOCATOR__TITLE'} />,
    headerRight: <ConnectedLocatorHeader navigate={navigate} dispatch={dispatch} navProps={state} setParams={setParams}/>,
    tabBarVisible: false
  };
  return options;
};

export const validatePasswordHeader = (props) => {
  const state = props.navigation.state;
  const nextRouteName = result(state, 'params.nextRouteName');
  const headerLabel = nextRouteName === 'Dashboard' ? 'Verify Password' : language.PROFILE__PASSWORD_TITLE;
  if (headerLabel === 'Verify Password') {
    return {
      ...noHeader,
      headerTitle: <Text style={{color: 'black', fontFamily: 'roboto', paddingHorizontal: 10, fontSize: theme.fontSizeMedium, marginHorizontal: 10}}> {headerLabel} </Text>, // args: navigation, childRouter,
      tabBarVisible: false,

    };
  } else if (headerLabel === language.PROFILE__PASSWORD_TITLE) {
    return  {
      ...navigationOptions.headerWhite, headerTitle: <Text style={{color: 'black', fontFamily: 'roboto', paddingHorizontal: 10, fontSize: theme.fontSizeMedium, marginHorizontal: 10}}> {headerLabel} </Text>, // args: navigation, childRouter,
      tabBarVisible: false,
    };
  }
};

export const qrPromoHeader = (props) => {
  const state = props.navigation.state;
  const headerLabel = result(state, 'params.promo.label', language.OFFERS__OFFER_DETAIL).toUpperCase();
  const options = {// args:dispatch, goBack, navigate, setParams
    ...navigationOptions.headerWhite,
    headerTitle: <Text style={{color: 'black', fontFamily: 'roboto', paddingHorizontal: 10, fontSize: theme.fontSizeMedium, marginHorizontal: 10}}> {headerLabel} </Text>, // args: navigation, childRouter,
    tabBarVisible: false
  };
  return options;
};

export const listAutoDebitHeader = (props) => {
  const dispatch = props.navigation.dispatch;
  const options = {// args:dispatch, goBack, navigate, setParams
    headerStyle: {
      ...navigationOptions.headerBrand.headerStyle,
      paddingLeft: 20,
    },
    headerLeft: <NavLeftBackRevamp dispatch={dispatch} />,
    headerTitle: <Text style={{color: 'white', fontFamily: 'roboto', fontSize: theme.fontSizeMedium, fontWeight: 'bold', alignSelf: 'center'}}>{language.AUTODEBIT__LIST_TITLE}</Text>,
    headerRight: <View/>,
    tabBarVisible: false
  };
  return options;
};

export const autoDebitTransactionsHeader = (props) => {
  const dispatch = props.navigation.dispatch;
  const options = {
    headerStyle: {
      ...navigationOptions.headerBrand.headerStyle,
      paddingLeft: 20,
    },
    headerLeft: <NavLeftBackRevamp dispatch={dispatch} />,
    headerTitle: <HeaderTitleBlack titleWhite={'DASHBOARD__TRANSACTION_HISTORY'} />,
    tabBarVisible: false
  };
  return options;
};

export const eformHeader = (props) => {
  const state = props.navigation.state;
  const pageName = result(state, 'params.pageName', '');
  const isCamera = pageName.toLowerCase().includes('camera') || pageName.toLowerCase().includes('liveness');
  const isSimulation = pageName.toLowerCase().includes('simulation');
  const isSummary = pageName.toLowerCase().includes('summary');
  const isLoanScheme = pageName.toLowerCase().includes('scheme');

  let options = '';

  if (isCamera) {
    options = {
      ...noHeader,
      tabBarVisible: false,
    };
  } else if (isSimulation) {
    options = {
      headerTintColor: theme.brand,
      headerStyle: {
        ...navigationOptions.headerWhite.headerStyle,
      },
      ...navigationOptions.headerWhite,
      headerLeft: (<NavLeftEForm headerTheme='white' dispatch={props.navigation.dispatch} props={props}/>),
      headerTitle: <HeaderTitleBlack titleBlack={'LOAN__SIMULATION_HEADER'}/>,
      tabBarVisible: false,
    };
  } else if (isSummary) {
    options = {
      headerTintColor: theme.brand,
      headerStyle: {
        ...navigationOptions.headerWhite.headerStyle,
      },
      ...navigationOptions.headerWhite,
      headerLeft: (<NavLeftEForm headerTheme='white' dispatch={props.navigation.dispatch} props={props}/>),
      headerTitle: <HeaderTitleBlack titleBlack={'LOAN__SUMMARY_HEADER'}/>,
      tabBarVisible: false,
    };
  } else if (isLoanScheme) {
    options = {
      headerTintColor: theme.brand,
      headerStyle: {
        ...navigationOptions.headerWhite.headerStyle,
      },
      ...navigationOptions.headerWhite,
      headerLeft: (<NavLeftEForm headerTheme='white' dispatch={props.navigation.dispatch} props={props}/>),
      headerTitle: <HeaderTitleBlack titleBlack={'MORTGAGELOAN__SCHEME'}/>,
      tabBarVisible: false,
    };
  } else {
    options = {
      headerTintColor: theme.brand,
      headerStyle: {
        ...navigationOptions.headerWhite.headerStyle,
      },
      ...navigationOptions.headerWhite,
      headerLeft: (<NavLeftEForm headerTheme='white' dispatch={props.navigation.dispatch} props={props}/>),
      headerTitle: <HeaderTitleBlack titleBlack={'EFORM__NAVBAR'}/>,
      tabBarVisible: false,
    };
  }
  return options;
};

export const eformHeaderPGO = (props) => {
  const state = props.navigation.state;
  const pageName = result(state, 'params.pageName', '');
  const isCamera = pageName.toLowerCase().includes('camera');
  const isSimulation = pageName.toLowerCase().includes('simulation');
  const isSummary = pageName.toLowerCase().includes('summary');

  let options = '';

  if (isCamera) {
    options = {
      ...noHeader,
      tabBarVisible: false,
    };
  } else if (isSimulation) {
    options = {
      headerTintColor: theme.brand,
      headerStyle: {
        ...navigationOptions.headerWhite.headerStyle,
      },
      ...navigationOptions.headerWhite,
      headerLeft: (<NavLeftEFormPGO headerTheme='white' dispatch={props.navigation.dispatch} props={props}/>),
      headerTitle: <HeaderTitleBlack titleBlack={'LOAN__SIMULATION_HEADER'}/>,
      tabBarVisible: false,
    };
  } else if (isSummary) {
    options = {
      headerTintColor: theme.brand,
      headerStyle: {
        ...navigationOptions.headerWhite.headerStyle,
      },
      ...navigationOptions.headerWhite,
      headerLeft: (<NavLeftEFormPGO headerTheme='white' dispatch={props.navigation.dispatch} props={props}/>),
      headerTitle: <HeaderTitleBlack titleBlack={'LOAN__SUMMARY_HEADER'}/>,
      tabBarVisible: false,
    };
  } else {
    options = {
      headerTintColor: theme.brand,
      headerStyle: {
        ...navigationOptions.headerWhite.headerStyle,
      },
      ...navigationOptions.headerWhite,
      headerLeft: (<NavLeftEFormPGO headerTheme='white' dispatch={props.navigation.dispatch} props={props}/>),
      headerTitle: <HeaderTitleBlack titleBlack={'EFORM__NAVBAR'}/>,
      tabBarVisible: false,
    };
  }
  return options;
};

export const LandingChooseProductEmoney = (props) => {
  const navigate = props.navigation.navigate;
  const dispatch = props.navigation.dispatch;
  const state = props.navigation.state;
  const setParams = props.navigation.setParams;
  const options = {// args:dispatch, goBack, navigate, setParams
    ...navigationOptions.headerWhite,
    headerTitle: <HeaderTitleBlack titleBlack={'EMONEY__CHOOSE_PRODUCTS'} />,
    headerRight: <ConnectedEmoneyHeader navigate={navigate} dispatch={dispatch} navProps={state} setParams={setParams}/>,
    tabBarVisible: false
  };
  return options;
};


export const investmentHeader = (props) => {
  const state = props.navigation.state;
  const headerLabel = result(state, 'params.nextRouteName', 'portofolio_mutualfund') === 'portofolio_mutualfund' ? language.SINARMAS_REKSADANA : language.SINARMAS_BANCASSURANCE;
  const options = {// args:dispatch, goBack, navigate, setParams
    ...navigationOptions.headerWhite,
    headerTitle: <Text style={{color: 'black', fontFamily: 'roboto', paddingHorizontal: 10, fontSize: theme.fontSizeMedium, marginHorizontal: 10}}> {headerLabel} </Text>, // args: navigation, childRouter,
    tabBarVisible: false
  };
  return options;
};

export const chooseProduct = (props) => {
  const state = props.navigation.state;
  const options = {// args:dispatch, goBack, navigate, setParams
    ...navigationOptions.headerNewBrand,
    headerTitle: <HeaderTitle langKey={'PRODUCTS__SELECTIONS'}/>,
    headerRight: <ConnectedNavRightSkip headerTheme='white' dispatch={props.navigation.dispatch} navProps={state}/>,
    tabBarVisible: false
  };
  return options;
};

export const membershipHeader = (props) => {
  const state = props.navigation.state;
  const options = {// args:dispatch, goBack, navigate, setParams
    headerStyle: {
      paddingLeft: -15
    },
    ...navigationOptions.headerNewBrand,
    headerTitle: <HeaderTitle langKey={'MEMBERSHIP__TITLE'}/>,
    headerRight: <ConnectedNavRightFAQ headerTheme='white' dispatch={props.navigation.dispatch} navProps={state}/>,
    tabBarVisible: false
  };
  return options;
};

export const onboardProductHeader = (props) => {
  const options = {
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
    },
    ...navigationOptions.headerWhite,
    headerLeft: (<NavLeftOnboard headerTheme='white' dispatch={props.navigation.dispatch} props={props}/>),
    headerTitle: <HeaderTitleBlack titleBlack={'CREDITCARD__NAVBAR'}/>,
    tabBarVisible: false,
  };
  return options;
};

export const LuckyDipRightHeader = (props) => {
  const dispatch = props.navigation.dispatch;
  const navigation = result(props, 'navigation', {});
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
    },
    headerRight: <LuckyDipHeader headerTheme='white' dispatch={dispatch} navigation={navigation}/>,
    tabBarVisible: false
  };
  return options;
};

export const LandingHeaderNew = (props) => {
  const heightIos = Dimensions.get('window').height > 750;
  const osDevice = Platform.OS === 'ios';
  const isLogin = result(props, 'navigation.isLogin', false);
  if (heightIos && osDevice) {
    return {
      headerStyle: {
        backgroundColor: isLogin ? theme.pinkBrand : theme.lightGrey,
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        elevation: 0,
        marginTop: -30
      },
    };
  } else {
    return {
      header: null
    };
  }
};

export const LandingHeaderNew2 = () => {
  const heightIos = Dimensions.get('window').height > 750;
  const osDevice = Platform.OS === 'ios';
  if (heightIos && osDevice) {
    return {
      headerStyle: {
        backgroundColor: theme.pinkBrand,
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        elevation: 0,
        marginTop: -30
      },
    };
  } else {
    return {
      header: null
    };
  }
};

export const closeHeader = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingLeft: 20,
      paddingRight: 20
    },
    headerLeft: <NavLeftClose headerTheme='white' dispatch={props.navigation.dispatch} />,
    tabBarVisible: false
  };
  return options;
};

export const transactionsFilterHeader = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingLeft: 10,
      paddingRight: 10
    },
    headerLeft: <NavLeftClose headerTheme='white' dispatch={props.navigation.dispatch} goBack={true}/>,
    headerRight: <NavReset dispatch={props.navigation.dispatch} form={'TransactionsFilter'}/>,
    tabBarVisible: false
  };
  return options;
};

export const detailTransactionHeader = (props) => {
  const dispatch = props.navigation.dispatch;
  const state = props.navigation.state;
  const options = {
    ...navigationOptions.headerCenterTitle,
    headerStyle: {
      ...navigationOptions.headerCenterTitle.headerStyle,
      backgroundColor: theme.brand,
    },
    headerTitle: result(state, 'params.name', language.OPEN_NEW_ACCOUNT__TRANSACTION_DETAIL), // args: navigation, childRouter,
    headerLeft: (<NavLeftBackEP dispatch={dispatch} isBrandColor goBack={true} />),
    headerRight: (<View/>),
    tabBarVisible: false,
    headerBackTitle: null
  };
  return options;
};

export const qrHeader = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingRight: 20
    },
    headerTitle: <HeaderTitleBlack titleBlack={'QR_GPN__GENERATE__QR'} />,
    headerRight: <ConnectedNavLeftInfo headerTheme='white' dispatch={props.dispatch}/>,
    tabBarVisible: false
  };
  return options;
};

export const alfacartCartHeader = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingRight: 20,
    },
    headerTitle: <HeaderTitleBlack titleBlack={'ALFACART__HEADER_CART'} />,
    headerRight: <ConnectedAlfacartCartHeader headerTheme='white' navigate={props} dispatch={props.dispatch}/>,
    tabBarVisible: false
  };
  return options;
};

export const wishlistAlfacartCartHeader = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
      paddingRight: 20,
    },
    headerTitle: <HeaderTitleBlack titleBlack={'ALFACART__HEADER_WISHLIST'} />,
    headerRight: <ConnectedWishlistAlfacartHeader headerTheme='white' navigate={props} dispatch={props.dispatch}/>,
    tabBarVisible: false
  };
  return options;
};

export const merchantHeader = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerWhite.headerStyle,
    },
    headerTitle: <HeaderTitleBlack titleBlack={'GALERI__SINARMAS_HEADER'} />,
    headerRight: <ConnectedAlfacartHeader headerTheme='white' navigate={props} dispatch={props.dispatch}/>
  };
  return options;
};
export const AccountHeader = (props) => {
  const isLogin = result(props, 'navigation.isLogin', false);
  const option1 = {// args:dispatch, goBack, navigate, setParams
    ...navigationOptions.headerBrand,
    headerLeft: <ConnectedNavLeftLanding headerTheme='white' dispatch={props.navigation.dispatch} />,
  };
  const options2 = {// args:dispatch, goBack, navigate, setParams
    ...navigationOptions.headerBrand,
    headerLeft: <ConnectedNavLeftLanding headerTheme='white' dispatch={props.navigation.dispatch} />,
    tabBarVisible: false
  };
  const options = isLogin ? option1 : options2;
  return options;
};
export const remittanceHeader = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerNoColorRemittance.headerStyle,
      paddingLeft: 10
    },
    headerLeft: <NavLeftBackRevamp dispatch={props.navigation.dispatch} />,
    headerTitle: <HeaderTitleBlack titleWhite={'TITLE__REMITTANCE'} remittance={true}/>,
    tabBarVisible: false
  };
  return options;
};
export const remittanceConfirmHeader = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerNoColorRemittance.headerStyle,
      paddingLeft: 30
    },
    tabBarVisible: false,
    headerLeft: <NavLeftBackRevamp dispatch={props.navigation.dispatch}/>,
    headerTitle: <HeaderTitleBlack titleWhite={'TITLE__CONFIRMATION_REMITTANCE'} />,
  };
  return options;
};

export const InquirySil = () => {
  const options = {
    headerTintColor: theme.white,
    headerStyle: {
      ...navigationOptions.headerLightDenim.headerStyle,
    },
    headerTitle: <HeaderTitleBlack titleWhite={'SINARMAS_ASJ'} />,
    tabBarVisible: false
  };
  return options;
};

export const LandingHeaderNewOnboarding = (props) => {
  const heightIos = Dimensions.get('window').height > 750;
  const osDevice = Platform.OS === 'ios';
  if (heightIos && osDevice) {
    return {
      headerStyle: {
        backgroundColor: theme.pinkBrand,
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        elevation: 0,
        paddingLeft: 20
      },
      headerLeft: <NavBurgerNew headerTheme='white' dispatch={props.navigation.dispatch} />,
      tabBarVisible: false
    };
  } else {
    return {
      headerStyle: {
        backgroundColor: theme.pinkBrand,
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        elevation: 0,
        paddingLeft: 20
      },
      headerLeft: <NavBurgerNew headerTheme='white' dispatch={props.navigation.dispatch} />,
      tabBarVisible: false
    };
  }
};

export const mgmReferFriend = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerNoColorMgm.headerStyle,
    },
    headerLeft: <NavLeftBackRevamp dispatch={props.navigation.dispatch} />,
    headerTitle: <HeaderMgm langKey={'ACCOUNT__MGM'} />,
    tabBarVisible: false
  };
  return options;
};

export const mgmHowReferral = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerNoColorMgm.headerStyle,
    },
    headerLeft: <NavLeftBackRevamp dispatch={props.navigation.dispatch} />,
    headerTitle: <HeaderMgm langKey={'MGM__HOW_REFERRAL_WORKS'} />,
    tabBarVisible: false
  };
  return options;
};

export const mgmHistoryReward = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerNoColorMgm.headerStyle,
    },
    headerLeft: <NavLeftBackRevamp dispatch={props.navigation.dispatch} />,
    headerTitle: <HeaderMgm langKey={'MGM__HISTORY_REWARD'} />,
    tabBarVisible: false
  };
  return options;
};

export const mgmInvitingRecord = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerNoColorMgm.headerStyle,
    },
    headerLeft: <NavLeftBackRevamp dispatch={props.navigation.dispatch} />,
    headerTitle: <HeaderMgm langKey={'MGM__INVITING_RECORD'} />,
    tabBarVisible: false
  };
  return options;
};

export const mgmDetailTrans = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerNoColorMgm.headerStyle,
    },
    headerLeft: <NavLeftBackRevamp dispatch={props.navigation.dispatch} />,
    headerTitle: <HeaderMgm langKey={'MGM__CLAIM_REWARD_DETAILS'} />,
    tabBarVisible: false
  };
  return options;
};

export const HomeMenuSearch = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerNoColorMenuSearch.headerStyle,
    },
    headerLeft: <NavLeftBackMenuSearch dispatch={props.navigation.dispatch} />,
    headerTitle: <HeaderTitleBlack titleBlack={'AUTODEBIT__LIST_SEARCH_TITLE'} />,
    tabBarVisible: false
  };
  return options;
};

export const offerSeeall = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerNoColorMgm.headerStyle,
    },
    headerLeft: <NavLeftBackRevamp dispatch={props.navigation.dispatch} />,
    headerTitle: <HeaderTitleBlack titleWhite={'SPECIAL_OFFERS_LANDING'} />,
    tabBarVisible: false
  };
  return options;
};

export const EVoucherHeader = (props) => {
  const dispatch = props.navigation.dispatch;
  const state = props.navigation.state;
  const headerName = result(state, 'params.name', 'PROFILE__SIMAS_POIN_MYORDER');
  
  const options = {
    ...navigationOptions.headerCenterTitle,
    headerStyle: {
      ...navigationOptions.headerCenterTitle.headerStyle,
      backgroundColor: theme.brand,
    },
    headerTitle: (<HeaderTitleBlack titleWhite={headerName} />), // args: navigation, childRouter,
    headerLeft: (<NavLeftBackRevamp dispatch={dispatch} />),
    headerRight: (<View/>),
    tabBarVisible: false,
    headerBackTitle: null
  };
  return options;
};
export const manageBiFast = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerNoColorTransferProxy.headerStyle,
      // paddingLeft: 30
    },
    headerLeft: <NavLeftBackRevamp dispatch={props.navigation.dispatch} />,
    headerTitle: <HeaderTransferProxy langKey={'BIFAST_MANAGE'}/>,
    tabBarVisible: false
  };
  return options;
};

export const transferProxy = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerNoColorTransferProxy.headerStyle,
      // paddingLeft: 30
    },
    headerLeft: <NavLeftBackRevamp dispatch={props.navigation.dispatch} />,
    headerTitle: <HeaderTransferProxy langKey={'BIFAST_TRANSFER_PROXY'}/>,
    tabBarVisible: false
  };
  return options;
};

export const confirmTransferProxy = (props) => {
  const options = {// args:dispatch, goBack, navigate, setParams
    headerTintColor: theme.brand,
    headerStyle: {
      ...navigationOptions.headerNoColorTransferProxy.headerStyle,
      // paddingLeft: 30
    },
    headerLeft: <NavLeftBackRevamp dispatch={props.navigation.dispatch} />,
    headerTitle: <HeaderTransferProxy langKey={'TITLE__TRANSFER_CONFIRMATION'}/>,
    tabBarVisible: false
  };
  return options;
};

export const scoreNilaiQHeader = (props) => {
  const state = props.navigation.state;
  const options = {// args:dispatch, goBack, navigate, setParams
    headerStyle: {
      paddingLeft: -15
    },
    ...navigationOptions.headerNewBrand,
    headerTitle: <HeaderTitle langKey={'ACCOUNT_MENU_NILAI_Q_SCORE'}/>,
    headerRight: <ConnectedNavRightFAQScoreNilaiQ headerTheme='white' dispatch={props.navigation.dispatch} navProps={state}/>,
    tabBarVisible: false
  };
  return options;
};