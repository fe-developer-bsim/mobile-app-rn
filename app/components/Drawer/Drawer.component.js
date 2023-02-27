import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import Touchable from '../Touchable.component';
import styles from './Drawer.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';
import noop from 'lodash/noop';
import VersionNumber from 'react-native-version-number';
import stylesTerm from '../OnboardingJourney/TermConditionLink.styles';
import LogoImage from '../../assets/images/banksinarmas2x.png';
import BackgroundTimer from 'react-native-background-timer';

const totalSeconds = 60;

class Drawer extends React.Component {
  static propTypes = {
    resetAndNavigate: PropTypes.func,
    user: PropTypes.object,
    logout: PropTypes.func,
    changeCurrentLanguage: PropTypes.func,
    currentLanguage: PropTypes.object,
    linkCreditCard: PropTypes.func,
    getTdCreate: PropTypes.func,
    getInsurance: PropTypes.func,
    onPrimaryCustomerCall: PropTypes.func,
    onSecondaryCustomerCall: PropTypes.func,
    onRefresh: PropTypes.func,
    isLockedDevice: PropTypes.bool,
    cardLessWithdrawal: PropTypes.func,
    forgotPassword: PropTypes.func,
    getLoginPrefs: PropTypes.func,
    paydayLoanEligible: PropTypes.string,
    goToPaydayLoanAgreement: PropTypes.func,
    goToinquiryRecurringTransfer: PropTypes.func,
    accounts: PropTypes.array,
    validateClosingEmoney: PropTypes.func,
    cif: PropTypes.string,
    newProduct: PropTypes.func,
    goToLocator: PropTypes.func,
    goToOffers: PropTypes.func,
    isLogin: PropTypes.bool,
    flag: PropTypes.object,
    link: PropTypes.string,
    isQrGPNEnable: PropTypes.bool,
    getQRGpn: PropTypes.func,
    simasPoin: PropTypes.object,
    inquirySimasPoin: PropTypes.func,
    getSimasPoinHistory: PropTypes.func,
    goToProfile: PropTypes.func,
    goToSettings: PropTypes.func,
    goToSimasPoinHistory: PropTypes.func,
    showNewBurgerMenuIcon: PropTypes.object,
    generateCode: PropTypes.func,
    toOfflineMain: PropTypes.func,
    showLkdMenu: PropTypes.bool,
    getGenerateCodeII: PropTypes.func,
    profilePicture: PropTypes.object,
    toGenerateMain: PropTypes.func,
    flagReleaseDevice: PropTypes.bool,
    getSavingProducts: PropTypes.func,
    goToSplitBillMenu: PropTypes.func,
    labelNewSplitBill: PropTypes.object,
    hideCloseEmoney: PropTypes.bool,
    chooseServices: PropTypes.func,
    getValas: PropTypes.func,

  }

  state = {
    secondsRemaining: totalSeconds,
    disabled: false,
  }

  tick = () => {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      this.setState({disabled: false});
    } else {
      this.setState({disabled: true});
    }
  }

  componentDidMount = () => {
    this.setState({disabled: false});
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }

  reloadSimaspoin = () => {
    const {inquirySimasPoin} = this.props;
    this.setState({disabled: true});
    return inquirySimasPoin().then(() => {
      this.interval = BackgroundTimer.setInterval(this.tick, 1000);
      this.setState({
        secondsRemaining: totalSeconds,
        reload: false
      });
    }).catch(() => {
      this.setState({
        secondsRemaining: 0,
        reload: false,
      });
    });
  }

  render () {
    const {resetAndNavigate = noop, onPrimaryCustomerCall = noop, onSecondaryCustomerCall = noop, onRefresh = noop, isLockedDevice, link, goToSettings, goToLocator} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <View style={styles.contentContainer}>
            { isLockedDevice ? 
              null :
              <View>
                <View>
                  <View style={styles.groupContainer}>
                    <Text style={styles.textGroup}>{language.BURGER_MENU__PRODUCTS_SERVICES}</Text>
                  </View>
                  <Touchable onPress={resetAndNavigate('Offers')}>
                    <View style={styles.navigationContainer}>
                      <View>
                        <Text style={styles.userInfo}>{language.BURGER_MENU__OFFERS}</Text>
                      </View>
                      <View style={styles.arrowContainer}>
                        <SimasIcon name={'chevron'} size={20} style={styles.arrowIcon}/>
                      </View>
                    </View>
                  </Touchable>
                </View>
              </View>
            }
            <View style={styles.groupContainer}>
              <Text style={styles.textGroup}>{language.BURGER_MENU__PRODUCTS_SERVICES}</Text>
            </View>
            <View style={styles.groupContainer}>
              <Text style={styles.textGroup}>{language.BURGER_MENU__HELP_SUPPORT}</Text>
            </View>
            <Touchable onPress={onPrimaryCustomerCall}>
              <View style={styles.navigationContainer}>
                <View style={styles.row}>
                  <Text style={styles.userInfo}>{language.BURGER_MENU__CALL_SUPPORT}</Text>
                  <Text style={styles.userInfo}>{' '}</Text>
                  <Text style={styles.userInfoBold}>{language.HELP__CALL_US__SUBTITLE}</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <SimasIcon name={'phone'} size={20} style={styles.arrowIcon}/>
                </View>
              </View>
            </Touchable>
            <Touchable onPress={onSecondaryCustomerCall}>
              <View style={styles.navigationContainer}>
                <View style={styles.row}>
                  <Text style={styles.userInfo}>{language.BURGER_MENU__CALL_SUPPORT}</Text>
                  <Text style={styles.userInfo}>{' '}</Text>
                  <Text style={styles.userInfoBold}>{language.HELP__CALL_US__SUBTITLE_SECONDARY}</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <SimasIcon name={'phone'} size={20} style={styles.arrowIcon}/>
                </View>
              </View>
            </Touchable>
            <Touchable onPress={resetAndNavigate('FAQform')}>
              <View style={styles.navigationContainer}>
                <View>
                  <Text style={styles.userInfo}>{language.BURGER_MENU__FREQUENTLY_ASKED_QUESTIONS}</Text>
                  <Text style={styles.userInfo}>{language.BURGER_MENU__FAQ}</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <SimasIcon name={'chevron'} size={20} style={styles.arrowIcon}/>
                </View>
              </View>
            </Touchable>
            <Touchable onPress={goToLocator}>
              <View style={styles.navigationContainer}>
                <View>
                  <Text style={styles.userInfo}>{language.ATM_LOCATOR__DRAWER}</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <SimasIcon name={'chevron'} size={20} style={styles.arrowIcon}/>
                </View>
              </View>
            </Touchable>
            <View style={styles.additionalPadding}/>
            <View style={styles.whiteLine}/>
            <View style={styles.additionalPadding}/>
            <View>
              <Touchable onPress={goToSettings}>
                <View style={styles.navigationContainer}>
                  <Text style={styles.textGroup}>{language.BURGER_MENU__SETTING}</Text>
                  <View style={styles.arrowContainer}>
                    <SimasIcon name={'chevron'} size={20} style={styles.arrowIcon}/>
                  </View>
                </View>
              </Touchable>
            </View>
            { isLockedDevice ?
              <View>
                <View style={styles.additionalPadding}/>
                <View style={styles.whiteLine}/>
                <View style={styles.additionalPadding}/>
                <Touchable onPress={onRefresh}>
                  <View style={styles.navigationContainer}>
                    <View>
                      <Text style={styles.userInfo}>{language.LANDING__REFRESH_DEVICE}</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                      <SimasIcon name={'Exclamation-Triangle-White'} size={15} style={styles.arrowIcon}/>
                    </View>
                  </View>
                </Touchable>
              </View>
              :
              null}

          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image source={LogoImage} style={styles.logoImage}/>
          </View>
          <View>
            <Text onPress={resetAndNavigate('WebForm', {urlLink: link, drawer: true})} style={stylesTerm.whiteUnderlineText}>{language.DRAWER__TERM_CONDITION_LINK}.</Text>
            <Text style={stylesTerm.whiteSmallText}>SimobiPlus v{VersionNumber.appVersion}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Drawer;
