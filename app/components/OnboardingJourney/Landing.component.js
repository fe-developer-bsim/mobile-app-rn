import React from 'react';
import PropTypes from 'prop-types';
import {View, ImageBackground, Text} from 'react-native';
import styles from './Landing.component.styles';
import {language} from '../../config/language';
import noop from 'lodash/noop';
import result from 'lodash/result';
import TabEgift from './EgiftTabs.component';
import find from 'lodash/filter';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import Touchable from '../Touchable.component';
import CountDown from 'react-native-countdown-component';
import LuckyImage from '../../assets/images/IconBoxLuckyDip.png';


const totalSeconds = 60;
const totalSecondsEmoney = 60;

class LandingView extends React.Component {
  static propTypes = {
    login: PropTypes.func,
    isSelectedLanguage: PropTypes.func,
    buttonMap: PropTypes.array,
    onRefresh: PropTypes.func,
    isLockedDevice: PropTypes.bool,
    register: PropTypes.func,
    offers: PropTypes.array.isRequired,
    onOfferClick: PropTypes.func,
    clickedOffer: PropTypes.object,
    closeHandler: PropTypes.func,
    getEgiftList: PropTypes.func,
    egiftList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    goToDetail: PropTypes.func,
    cgvTab: PropTypes.func,
    simasPoin: PropTypes.object,
    getShoppingList: PropTypes.func,
    inquirySimasPoin: PropTypes.func,
    simasPoinHistory: PropTypes.func,
    nav: PropTypes.object,
    goToDiscountMerchant: PropTypes.func,
    goToDiscountQREULA: PropTypes.func,
    goToOffer: PropTypes.func,
    flightTab: PropTypes.func,
    goToBillpay: PropTypes.func,
    openDrawer: PropTypes.func,
    goPayNavigateTo: PropTypes.func,
    goToBiller: PropTypes.func,
    goToQrPayment: PropTypes.func,
    goToCart: PropTypes.func,
    onBuyMobileTopTop: PropTypes.func,
    navigateTo: PropTypes.func,
    getBalanceEmoney: PropTypes.func,
    getBalanceEmoneyBeforeLogin: PropTypes.func,
    emoney: PropTypes.object,
    billerMenuOrder: PropTypes,
    goToEmoneyHistoryNavigate: PropTypes.func,
    toogleMenuKoperasi: PropTypes.string,
    toogleKoperasi: PropTypes.string,
    toggleDisableBillerNKYC: PropTypes.string,
    openInbox: PropTypes.func,
    mostSoldData: PropTypes.array,
    accounts: PropTypes.array,
    onQRTrf: PropTypes.func,
    addOrder: PropTypes.func,
    tutorialProduct: PropTypes.func,
    dataDisplay: PropTypes.object,
    goToAlfacartNew: PropTypes.func,
    goToShipping: PropTypes.func,
    finishOrder: PropTypes.func,
    logout: PropTypes.func,
    isLogin: PropTypes.bool,
    listCategoryOffers: PropTypes.array,
    inquiryLuckyDipCoupon: PropTypes.func,
    luckyDipCounter: PropTypes.string,
    isLuckyDipActive: PropTypes.string,
    serverTime: PropTypes.string,
    luckyDipcache: PropTypes.object,
    loginFromLuckDip: PropTypes.func,
    goToUltraVoucher: PropTypes.func,
    lazyLogin: PropTypes.string,
    loginLanding: PropTypes.func,
    goToTncSimasCatalog: PropTypes.func,
    goToMenuSearch: PropTypes.func,
    newProduct: PropTypes.func,
    getValas: PropTypes.func,
    getTdCreate: PropTypes.func,
    getInsurance: PropTypes.func,
    goToSplitBillMenu: PropTypes.func,
    goReferralCode: PropTypes.func,
    gotoEasyPin: PropTypes.func,
    newProductCC: PropTypes.func,
    gotoProduct: PropTypes.func,
    hideMGM: PropTypes.string,
    goToLoan: PropTypes.func,
    goToMerchantStore: PropTypes.func,
    goToTncAlfacart: PropTypes.func,
    goToAlfacart: PropTypes.func,
    statusMember: PropTypes.string,
    goToMembership: PropTypes.func,
    goToTncUnipin: PropTypes.func,
  }
  state = {
    catagory: '',
    secondsRemaining: totalSeconds,
    disabled: false,
    secondsRemainingEmoney: totalSecondsEmoney,
    timeoutCountdown: false
  }

  onFinishTime = () => {
    this.setState({timeoutCountdown: !this.state.timeoutCountdown});
  }

  tick = () => {
    const {nav} = this.props;
    if (nav.routes[0].routes[0].key === 'Init') {
      this.setState({secondsRemaining: this.state.secondsRemaining - 1});
      this.setState({disabled: true});
      if (this.state.secondsRemaining <= 0) {
        this.setState({disabled: false});
      } else {
        this.setState({disabled: true});
      }
    }
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

  reloadBalanceEmoney = () => {
    const {getBalanceEmoney} = this.props;
    this.setState({disabled: true});
    return getBalanceEmoney();
  }

  render () {
    const {login, simasPoin, offers = [],
      onOfferClick = noop, clickedOffer = {},
      closeHandler = noop, cgvTab = noop, getShoppingList, toogleKoperasi, toggleDisableBillerNKYC,
      inquirySimasPoin, nav, goToDiscountMerchant, listCategoryOffers, goToTncSimasCatalog,
      goToDiscountQREULA, goToOffer, goToBillpay, toogleMenuKoperasi,
      navigateTo, onBuyMobileTopTop, goToQrPayment, goPayNavigateTo,
      billerMenuOrder, goToBiller, goToCart, emoney, goToEmoneyHistoryNavigate, goToAlfacart, openInbox,
      mostSoldData, getBalanceEmoney, accounts, addOrder, tutorialProduct, dataDisplay, goToDetail,
      goToAlfacartNew, goToShipping, goToTncAlfacart, finishOrder, logout, isLogin, serverTime, isLuckyDipActive, luckyDipCounter,
      loginFromLuckDip, luckyDipcache, lazyLogin, loginLanding, goToMenuSearch, gotoEasyPin, newProduct, getValas, getTdCreate, getInsurance,
      goToSplitBillMenu, goReferralCode, newProductCC, gotoProduct, hideMGM, goToLoan,  goToMerchantStore, statusMember, goToMembership, goToTncUnipin} = this.props;
    const {...reduxFormProps} = this.props;
    const {TabShopping, SimasPoinHistory} = reduxFormProps;
    const payByQr = find(payByQr, function (o) {
      return o.title === language.SCAN_QR__TITLE;
    });


    const nowDate = moment(serverTime).format('YYYY/MM/DD H:mm');
    const rawnextDate = moment(serverTime).format('YYYY/MM/DD');
    const nextDate = rawnextDate + ' ' + '23:59';
    const diff = moment(nextDate).diff(moment(nowDate));
    const gapTime = Math.round(moment.duration(diff).asSeconds());
    const flagLuckyDip = isLuckyDipActive === 'active' || isLuckyDipActive === 'ACTIVE' ? '1' : '0';
    // cache luckyDip
    const localTimePast = result(luckyDipcache, 'localTime', '');
    const localTimePresent = moment(new Date()).format('YYYY/MM/DD H:mm');
    const differenceTimePresent = moment(localTimePresent).diff(moment(localTimePast));
    const gapTimePresent = Math.round(moment.duration(differenceTimePresent).asSeconds());
    const checkEligible = gapTimePresent > 3700 || gapTimePresent < 0;
    const formatTimeserver = result(luckyDipcache, 'formatTimeserver', '0');
    const differenceServerFromPresentGlobal = moment(localTimePresent).diff(moment(formatTimeserver));
    const gapdifferenceServerFromPresentGlobal = Math.round(moment.duration(differenceServerFromPresentGlobal).asSeconds());
    const luckyDipCounterCache = result(luckyDipcache, 'currentToken', '0');
    const timeServerGap = result(luckyDipcache, 'totalGapLocalServer', 0);

    const countExpireGap = gapdifferenceServerFromPresentGlobal >= timeServerGap || gapdifferenceServerFromPresentGlobal < 0;
    const timeGapComponent = isLogin ? gapTime : timeServerGap - gapdifferenceServerFromPresentGlobal;
    const selection = isLogin ? luckyDipCounter === '' || luckyDipCounter === '0' || luckyDipCounter === undefined || flagLuckyDip === '0' || this.state.timeoutCountdown : countExpireGap || checkEligible || luckyDipCounterCache === '' || luckyDipCounterCache === '0' || luckyDipCounterCache === undefined || flagLuckyDip === '0' || this.state.timeoutCountdown;
    const luckyDipCounterSelection = isLogin ? luckyDipCounter : luckyDipCounterCache;
    return (

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TabEgift offers={offers} clickedOffer={clickedOffer}
            closeHandler={closeHandler} onOfferClick={onOfferClick}
            simasPoin={simasPoin} TabShopping={TabShopping}
            SimasPoinHistory={SimasPoinHistory} isLogin={isLogin}
            cgvTab={cgvTab} getShoppingList={getShoppingList}
            inquirySimasPoin={inquirySimasPoin} nav={nav} goToTncSimasCatalog={goToTncSimasCatalog}
            goToDiscountMerchant={goToDiscountMerchant} listCategoryOffers={listCategoryOffers}
            goToDiscountQREULA={goToDiscountQREULA} toogleKoperasi={toogleKoperasi} toggleDisableBillerNKYC={toggleDisableBillerNKYC}
            goToBillpay={goToBillpay} navigateTo={navigateTo} onBuyMobileTopTop={onBuyMobileTopTop}
            goToQrPayment={goToQrPayment} goPayNavigateTo={goPayNavigateTo}
            billerMenuOrder={billerMenuOrder} toogleMenuKoperasi={toogleMenuKoperasi}
            goToBiller={goToBiller} goToCart={goToCart} goToEmoneyHistoryNavigate={goToEmoneyHistoryNavigate} goToAlfacart={goToAlfacart} openInbox={openInbox} emoney={emoney} goToOffer={goToOffer}
            mostSoldData={mostSoldData} getBalanceEmoney={getBalanceEmoney} accounts={accounts} login={login} addOrder={addOrder} tutorialProduct={tutorialProduct}
            dataDisplay={dataDisplay} goToDetail={goToDetail}  goToAlfacartNew={goToAlfacartNew} goToShipping={goToShipping} goToTncAlfacart={goToTncAlfacart} finishOrder={finishOrder}
            logout={logout} lazyLogin={lazyLogin} loginLanding={loginLanding} goToMenuSearch={goToMenuSearch} gotoEasyPin={gotoEasyPin} newProduct={newProduct} getValas={getValas} getTdCreate={getTdCreate}
            getInsurance={getInsurance} goToSplitBillMenu={goToSplitBillMenu} goReferralCode={goReferralCode} newProductCC={newProductCC} gotoProduct={gotoProduct} hideMGM={hideMGM} goToLoan={goToLoan} goToMerchantStore={goToMerchantStore}
            goToMembership={goToMembership}  statusMember={statusMember} goToTncUnipin={goToTncUnipin}/>

        </View>

        {selection ?
          null :
          <View style={styles.floatLuckydip}>
            <Touchable onPress={loginFromLuckDip}>
              <ImageBackground source={LuckyImage} style={styles.imageLucky}>
                <View style={styles.shadowRow}>
                  <View />
                  <View style={styles.redRound}>
                    <Text style={styles.counterTextLuckyDip}>{luckyDipCounterSelection}</Text>
                  </View>
                </View>
                <View style={styles.countdown}>
                  <CountDown
                    until={timeGapComponent}
                    size={8}
                    digitStyle={{backgroundColor: 'transparent', borderRadius: 100}}
                    digitTxtStyle={{color: 'white', fontSize: 10, fontFamily: 'roboto'}}
                    timeToShow={['H', 'M', 'S']}
                    timeLabels={{}}
                    separatorStyle={{fontSize: 10, color: 'white', fontFamily: 'roboto'}}
                    showSeparator
                    style={styles.clockBox}
                    onFinish={this.onFinishTime}
                  />
                </View>
              </ImageBackground>
            </Touchable>
          </View>}
      </View>
    );
  }
}

export default LandingView;
