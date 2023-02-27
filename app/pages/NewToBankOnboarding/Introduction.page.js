import React from 'react';
import PropTypes from 'prop-types';
import IntroductionComponent from '../../components/NewToBankOnboarding/Introduction.component';
import {connect} from 'react-redux';
import {refreshDevice} from '../../state/thunks/onboarding.thunks';
import {NavigationActions} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import {Linking} from 'react-native';
import {result, isEmpty, find} from 'lodash';
import {get, set, storageKeys} from '../../utils/storage.util';
import AgreementEmoney from '../RegisterEmoneyJourney/AgreementEmoney.page';
import {getAllOffersExcept} from '../../utils/transformer.util';
import {
  checkLogin,
  checkLoginAllsegmentFlow,
  checkLoginCC,
  checkLoginForDeeplinkPromo,
  checkLoginSaving,
  checkLoginEmoney,
  resetDevice,
} from '../../state/thunks/onboarding.thunks';
// import {populateOffers}  from '../../state/thunks/common.thunks';
import {populateOffersPrivate} from '../../state/thunks/common.thunks';
import noop from 'lodash/noop';

// import {Platform} from 'react-native';
import {clearUTM} from '../../state/actions/index.actions';

const mapStateToProps = (state) => {
  const isStateEmpty = isEmpty(state.appInitKeys);
  if (!isStateEmpty) {
    SplashScreen.hide();
  }
  const tutorialProduct = result(state, 'tutorialProduct', {});
  const allOffers = result(state, 'promos.offers', []);
  const clickedOffer = find(allOffers, {offerID: {}});
  const offers = getAllOffersExcept(clickedOffer, allOffers);
  return {
    isLockedDevice: Boolean(
      state.appInitKeys &&
        state.appInitKeys.username &&
        state.appInitKeys.tokenClient &&
        state.appInitKeys.tokenServer
    ),
    currentLanguage: state.currentLanguage,
    state,
    link: isEmpty(
      result(
        state,
        'config.attention.urlSimobiOnboardingTnCWithoutCheckbox',
        ''
      )
    )
      ? result(state, 'config.attention.urlSimobiOnboardingTnC', '')
      : result(
        state,
        'config.attention.urlSimobiOnboardingTnCWithoutCheckbox',
        ''
      ),
    link2: result(state, 'config.attention.urlSimobiPrivacyPolicy', ''),
    tutorialProduct: tutorialProduct,
    isDeeplinkExist: state.isDeeplinkExist,
    offers,
    utmState: result(state, 'utmCode', {})
  };
};

const mapDispatchToProps = (dispatch) => ({
  onButtonPress: () => {
    dispatch(clearUTM());
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'Login',
            params: {disableEasyPinLogin: true},
          })
        ]
      })
    );
  },
  onLinkPressTnC: (link, singleBilingual) => () => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'TnCPageAccount',
        params: {urlLink: link, singleBilingual},
      })
    );
  },
  onLinkPressPrivacy: (link2, singleBilingual) => () => {
    dispatch(clearUTM());
    dispatch(
      NavigationActions.navigate({
        routeName: 'PrivacyPageAccount',
        params: {urlLink: link2, singleBilingual},
      })
    );
  },
  onRefresh: () => dispatch(refreshDevice()),
  onButtonProductPress: (tutorialProduct) => {
    // const codeDestination = result(utmState, 'productCode', '');
    // if (codeDestination === 'Emoney') {
    //   dispatch(NavigationActions.navigate({routeName: 'EmoneyRegistration'}));
    // } else if (startsWith(codeDestination, 'SA')) {
    //   dispatch(getSavingProductsItemsForDeeplink(codeDestination));
    // } else if (isEmpty(utmState)) {
    // const firebaseEmoney = true;
    // const os = Platform.OS;
    // Analytics.logEvent('REGIST_EMONEY', {device: os, step_route: '1'});
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChooseRegistration',
        // params: {firebaseEmoney, tutorialProduct},
        params: {tutorialProduct},
      })
    );
  },
  getEmoneyTnc: () => get(storageKeys.TNC_LOCKDOWN),
  initializeEmoneyTnc: () =>
    get(storageKeys.TNC_LOCKDOWN).then((res) => {
      if (res === null || res === undefined) {
        set(storageKeys.TNC_LOCKDOWN, true);
      } else if (res === true) {
        set(storageKeys.TNC_LOCKDOWN, true);
      } else if (res === false) {
        set(storageKeys.TNC_LOCKDOWN, false);
      }
    }),
  checkLogin: (tokenIdbiller, typeActivation, params) =>
    dispatch(checkLogin(tokenIdbiller, typeActivation, params)),
  checkLoginForDeeplinkPromo: (typeActivation) =>
    dispatch(checkLoginForDeeplinkPromo(typeActivation)),
  checkLoginCC: (tokenEmail, typeActivation, referralCode, ccCodereform) =>
    dispatch(
      checkLoginCC(tokenEmail, typeActivation, referralCode, ccCodereform)
    ),
  checkLoginAllsegment: (
    typeLockdownDevice,
    pathRouteFlow,
    typeActivation,
    typeUtm,
    typeCode,
    typereferralCode
  ) =>
    dispatch(
      checkLoginAllsegmentFlow(
        typeLockdownDevice,
        pathRouteFlow,
        typeActivation,
        typeUtm,
        typeCode,
        typereferralCode
      )
    ),
  setToMigrate: (id) => {
    dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'Landing'}),
          NavigationActions.navigate({
            routeName: 'MigrateLandingPage',
            params: {id: id},
          })
        ]
      })
    );
  },
  displayOffers: () => dispatch(populateOffersPrivate()),
  verifyEmail: (tokenEmail, typeActivation, ktp, dob, formid) => {
    dispatch(checkLoginEmoney(tokenEmail, typeActivation, ktp, dob, formid));
  },
  checkLoginSaving: (
    referralCodeOrami,
    typeActivation,
    usernameOrami,
    emailUser,
    handphoneNumber
  ) =>
    dispatch(
      checkLoginSaving(
        referralCodeOrami,
        typeActivation,
        usernameOrami,
        emailUser,
        handphoneNumber
      )
    ),
  menageresetDevice: (id) => dispatch(resetDevice(id)),
});

class IntroductionPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    isLockedDevice: PropTypes.bool,
    onButtonPress: PropTypes.func,
    onRefresh: PropTypes.func,
    easyPinLogin: PropTypes.func,
    goToLoginWithEasyPin: PropTypes.func,
    onRegistrationEmoney: PropTypes.func,
    verifyEmail: PropTypes.func,
    onButtonProductPress: PropTypes.func,
    link: PropTypes.string,
    link2: PropTypes.string,
    onLinkPressTnC: PropTypes.func,
    onLinkPressPrivacy: PropTypes.func,
    getEmoneyTnc: PropTypes.func,
    initializeEmoneyTnc: PropTypes.func,
    tutorialProduct: PropTypes.object,
    isDeeplinkExist: PropTypes.string,
    offers: PropTypes.array,
    checkLogin: PropTypes.func,
    checkLoginCC: PropTypes.func,
    checkLoginAllsegment: PropTypes.func,
    setToMigrate: PropTypes.func,
    displayOffers: PropTypes.func,
    checkLoginSaving: PropTypes.func,
    menageresetDevice: PropTypes.func,
    utmState: PropTypes.object
  };

  state = {
    tncLockdown: false
  };

  componentWillUnmount () {
    // Linking.removeEventListener('url', this.handleUrl);
  }

  handleUrl = ({url}) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        // DeepLinking.evaluateUrl(url);
      }
    });
  };
  componentDidMount () {
    // Linking.addEventListener('url', this.handleUrl);
    // Linking.getInitialURL().then((url) => {
    //   if (url && this.props.isDeeplinkExist !== 'yes') {
    //     this.handleUrl({url});
    //   }
    // }).catch((err) => err);
    // DeepLinking.addScheme('https://');
    // DeepLinking.addScheme('http://');
    // DeepLinking.addScheme('smbplus://');
    // DeepLinking.addScheme('simobiplus://');
    // DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/:activation/:token', ({activation, token}) => {
    //   const tokenEmail = transformToken(token);
    //   const typeActivation = transformToken(activation);
    //   this.props.verifyEmail(tokenEmail, typeActivation);
    // });
    // // uncomment bellow comment if smartfren active
    // // DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/:activation', ({activation}) => {
    // //   const typeActivation = transformToken(activation);
    // //   if (typeActivation === '020') {
    // //     this.props.checkLoginForDeeplinkPromo(typeActivation);
    // //   }
    // // });
    // DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/Billpayment/:idbiller', ({idbiller}) => {
    //   const tokenIdbiller = transformToken(idbiller);
    //   this.props.checkLogin(tokenIdbiller);
    // });
    // // deeplink with some parameter 'params' method ex = /?email=example@gmail.com|name=BSIM|phoneNumber=01234
    // DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/Billpayment/:params/:idbiller', ({params, idbiller}) => {
    //   const tokenIdbiller = transformToken(idbiller);
    //   const paramsDeeplink = transformTokenSpecialChar(params);
    //   this.props.checkLogin(tokenIdbiller, null, paramsDeeplink);
    // });
    // DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/AllSegment/:typeLockdown/:pathRoute', ({typeLockdown, pathRoute}) => {
    //   const typeLockdownDevice = transformToken(typeLockdown);
    //   const pathRouteFlow = transformToken(pathRoute);
    //   this.props.checkLoginAllsegment(typeLockdownDevice, pathRouteFlow);
    // });
    // DeepLinking.addRoute('/www.simobi.com/migrate/:id', ({id}) => {
    //   this.props.setToMigrate(id);
    // });
    // DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/:activation/:token/:referral/:cccode', ({activation, token, referral, cccode}) => {
    //   const tokenEmail = transformToken(token);
    //   const typeActivation = transformToken(activation);
    //   const referralCode = transformToken(referral);
    //   const ccCodereform = transformToken(cccode);
    //   if (typeActivation === '011') {
    //     this.props.checkLoginCC(tokenEmail, typeActivation, referralCode, ccCodereform);
    //   }
    // });
    // DeepLinking.addRoute('/migrate/:id', ({id}) => this.props.menageresetDevice(id));
    // setTimeout(() => {
    //   const {offers = []} = this.props;
    //   if (isEmpty(offers)) {
    //     this.props.displayOffers();
    //   }
    // }, 500);
    // // deeplink orami saving with referral code, code orami saving '021'
    // DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/:activation/:username/:referralCode/:emailOrami/:hpNumber', ({activation, username, referralCode, emailOrami, hpNumber}) => {
    //   const referralCodeOrami = transformToken(referralCode);
    //   const typeActivation = transformToken(activation);
    //   const usernameOrami = transformToken(username);
    //   const emailUser = transformToken(emailOrami);
    //   const handphoneNumber = transformToken(hpNumber);
    //   if (typeActivation === '021') {
    //     this.props.checkLoginSaving(referralCodeOrami, typeActivation, usernameOrami, emailUser, handphoneNumber);
    //   }
    // });
    // DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/AllSegment/:typeLockdown/:pathRoute/:utm/:code/:referralCode/:activation', ({typeLockdown, pathRoute, utm, code, referralCode, activation}) => {
    //   const rawtypeActivation = transformToken(activation);
    //   const typeActivation = transformTokenIos(rawtypeActivation);
    //   const typeUtm = transformToken(utm);
    //   const typeCode = transformToken(code);
    //   const typereferralCode = transformToken(referralCode);
    //   const typeLockdownDevice = transformToken(typeLockdown);
    //   const pathRouteFlow = transformToken(pathRoute);
    //   this.props.checkLoginAllsegment(typeLockdownDevice, pathRouteFlow, typeActivation, typeUtm, typeCode, typereferralCode);
    // });
  }

  refresh = () => {
    const {onRefresh} = this.props;
    this.setState(this.state);
    onRefresh();
  };

  componentWillMount () {
    const {getEmoneyTnc} = this.props;
    SplashScreen.hide();
    set(storageKeys.WELCOME_EMONEY, true);
    getEmoneyTnc().then((res) => {
      this.setState({
        tncLockdown: res,
      });
    });
  }

  onButtonProductPress = () => {
    const {onButtonProductPress, tutorialProduct} = this.props;
    onButtonProductPress(tutorialProduct);
  };

  render () {
    const {
      onButtonPress,
      onRegistrationEmoney,
      onLinkPressTnC = noop,
      onLinkPressPrivacy = noop,
      link,
      link2,
    } = this.props;
    const {tncLockdown} = this.state;
    if (tncLockdown) {
      return <AgreementEmoney tncLockdown={tncLockdown} />;
    } else {
      return (
        <IntroductionComponent
          onButtonPress={onButtonPress}
          onRefresh={this.refresh}
          onPressLinkTnC={onLinkPressTnC}
          onPressLinkPrivacy={onLinkPressPrivacy}
          termsCondition={link}
          privacyPolicy={link2}
          onRegistrationEmoney={onRegistrationEmoney}
          onButtonProductPress={this.onButtonProductPress}
        />
      );
    }
  }
}

const ConnectedIntroductionPage = connect(mapStateToProps, mapDispatchToProps)(IntroductionPage);
export default ConnectedIntroductionPage;
