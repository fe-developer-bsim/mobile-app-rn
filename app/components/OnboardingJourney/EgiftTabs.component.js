import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image, ActivityIndicator, Animated, Dimensions} from 'react-native';
import styles from './EgiftTabs.component.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';
import BackgroundTimer from 'react-native-background-timer';
import ServiceBillpay from './ServiceBillpay.component';
import isEmpty from 'lodash/isEmpty';
import Poin from '../../assets/images/simas-poin-new.png';
import {currencyFormatter, getDayName, dataProduct} from '../../utils/transformer.util';
import moment from 'moment';
import Bar from 'react-native-progress/Bar';
import {theme} from '../../styles/core.styles';
import iconhnb from '../../assets/images/icon-health.png';
import iconent from '../../assets/images/icon-ent.png';
import iconfnb from '../../assets/images/iconfnb.png';
import iconshop from '../../assets/images/icon-shop.png';
import icontransport from '../../assets/images/icon-transport.png';
import iconothers from '../../assets/images/icon-more.png';
import Tooltip from 'react-native-walkthrough-tooltip';
import TutorialContent from '../ProductOptions/TutorialContent.component';
import simas_poin from '../../assets/images/simas_point.png';
import gopay from '../../assets/images/Gopay-new.png';
import ccicon from '../../assets/images/ccicon.png';
import more from '../../assets/images/more.png';
import ovo from '../../assets/images/Ovo.png';
import pln from '../../assets/images/PLN.png';
import postpaid from '../../assets/images/postpaid.png';
import prepaid from '../../assets/images/prepaid.png';
import dana from '../../assets/images/dana.png';
import lowerCase from 'lodash/lowerCase';
import {result, filter, size, orderBy, startsWith, map, noop} from 'lodash';
import gold from '../../assets/images/goldmem.png';
import silver from '../../assets/images/silvermem.png';
import diamond from '../../assets/images/diamondmem.png';
import platinum from '../../assets/images/platinummem.png';


const totalSeconds = 60;
const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;
const {width} = Dimensions.get('window');

class LandingTabView extends React.Component {
  static propTypes = {
    getEgiftList: PropTypes.func,
    egiftList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    goToDetail: PropTypes.func,
    simasPoin: PropTypes.object,
    TabShopping: PropTypes.func,
    cgvTab: PropTypes.func,
    inquirySimasPoin: PropTypes.func,
    nav: PropTypes.object,
    SimasPoinHistory: PropTypes.func,
    goToDiscountMerchant: PropTypes.func,
    goToDiscountQREULA: PropTypes.func,
    flightTab: PropTypes.func,
    goToBillpay: PropTypes.func,
    billerConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    setupPaymentForNavigation: PropTypes.func,
    goToBiller: PropTypes.func,
    setupPaymentGopayForNavigation: PropTypes.func,
    checkEULAandNavigate: PropTypes.func,
    goToQrPayment: PropTypes.func,
    billerMenuOrder: PropTypes.array,
    onBuyMobileTopTop: PropTypes.func,
    goPayNavigateTo: PropTypes.func,
    goToCart: PropTypes.func,
    navigateTo: PropTypes.func,
    toogleMenuKoperasi: PropTypes.string,
    toogleKoperasi: PropTypes.string,
    toggleDisableBillerNKYC: PropTypes.string,
    emoney: PropTypes.object,
    goToEmoneyHistoryNavigate: PropTypes.func,
    inboxCounter: PropTypes.array,
    openInbox: PropTypes.func,
    offers: PropTypes.array.isRequired,
    onOfferClick: PropTypes.func,
    goToOffer: PropTypes.func,
    mostSoldData: PropTypes.array,
    getBalanceEmoney: PropTypes.func,
    login: PropTypes.func,
    addOrder: PropTypes.func,
    tutorialProduct: PropTypes.object,
    dataDisplay: PropTypes.object,
    dispatch: PropTypes.func,
    finishOrder: PropTypes.func,
    logout: PropTypes.func,
    isLogin: PropTypes.bool,
    listCategoryOffers: PropTypes.array,
    accounts: PropTypes.array,
    goToOpenBank: PropTypes.func,
    goToMerchantStore: PropTypes.func,
    goToUltraVoucher: PropTypes.func,
    loginLanding: PropTypes.func,
    lazyLogin: PropTypes.string,
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
    goToAlfacart: PropTypes.func,
    goToTncAlfacart: PropTypes.func,
    statusMember: PropTypes.string,
    goToMembership: PropTypes.func,
    goToTncUnipin: PropTypes.func,
  }

  state = {
    catagory: '',
    secondsRemaining: totalSeconds,
    disabled: false,
    categoryOffers: ''
  }

  scrollX = new Animated.Value(0) // this will be the scroll location of our ScrollView
  scrollLS = new Animated.Value(0)
  scrollProduct = new Animated.Value(0)

  callInbox = () => {
    const {openInbox} = this.props;
    openInbox();
  }

  finishOrder = () => {
    const {finishOrder} = this.props;
    finishOrder();
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

  componentDidMount = () => {
    this.setState({disabled: false});
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }

  componentWillReceiveProps (nextProps) {
    const {categoryOffers} = this.state;
    if (categoryOffers === '') {
      const listCategoryOffers = result(nextProps, 'listCategoryOffers', []);
      const firstCat = filter(listCategoryOffers, {priority: 1});
      const catName = result(firstCat, '0.categoryName', '');
      this.setState({categoryOffers: catName});
    }
  }

  onPressTab = (category) => () => {
    const {TabShopping} = this.props;
    TabShopping(category);
  }

  addOrder = () => {
    const {addOrder} = this.props;
    addOrder();
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

  setActiveCat = (categoryType) => () => {
    this.setState({categoryOffers: categoryType});
  }

  renderCategory = (cat) => {
    const {categoryOffers} = this.state;
    const categoryType = result(cat, 'categoryName', '');
    const activeCategory = categoryType === categoryOffers;
    const textCategory = categoryType === 'All' ? 'All Deals' : categoryType;
    return (
      <View style={activeCategory ? styles.categoryActive : styles.categoryInActive}>
        <Touchable onPress={this.setActiveCat(categoryType)}>
          <Text style={activeCategory ? styles.activeText : styles.inActiveText}>{textCategory}</Text>
        </Touchable>
      </View>
    );
  }

  renderOffer = (offers = []) => {
    const {onOfferClick} = this.props;
    let offerDate = '';
    if (offers.validStartDate || offers.validEndDate) {
      offerDate = offers.validStartDate === offers.validEndDate ? language.DAY__EVERY + getDayName(offers.validStartDate) : `${moment(offers.validStartDate, 'DD-MM-YYYY').format('DD MMM YYYY')}${' - '}${moment(offers.validEndDate, 'DD-MM-YYYY').format('DD MMM YYYY')}`;
    }
    return (
      <Touchable style={styles.containerInnerOffer} onPress={onOfferClick(offers)}>
        <Image source={{uri: offers.imgUrl}} resizeMode={'stretch'} renderError={loadError} indicator={Bar} indicatorProps={{
          showsText: true,
          color: theme.brand,
          size: 50,
          thickness: 2
        }} style={styles.bannerinnerOffer} />
        <View style={styles.containerAlfa}>
          <View>
            <View style={styles.offerDetails}>
              <View style={styles.iconContainer}><SimasIcon name='time-black' size={30} style={styles.iconStyleBlack} /></View>
              <View>
                <Text style={styles.label}>{language.OFFER__BANNER_VALID_DATE}</Text>
                <Text style={styles.labelValidDate}>{offerDate}</Text>
              </View>
            </View>
          </View>
          <View style={styles.arrowIcon}>
            <SimasIcon name={'chevron'} size={20} />
          </View>
        </View>
      </Touchable>
    );
  }

  renderEgiftFav = (egiftData = []) => {
    const {goToDetail} = this.props;
    return (
      <Touchable dtActionName='Redeem My Simas Poin' style={styles.containerInnerEgift} onPress={goToDetail(egiftData)}>
        <Image source={{uri: egiftData.image}} resizeMode={'cover'} renderError={loadError} indicator={Bar} indicatorProps={{
          showsText: true,
          color: theme.brand,
          size: 50,
          thickness: 2
        }} style={styles.bannerEgift} />
        <View>
          <View style={styles.offerDetails}>
            <View style={styles.iconContainer}><Image source={simas_poin} style={styles.poinamount} /></View>
            <Text style={styles.labelpoin}>{egiftData.value}</Text>
            <Text style={styles.labelpoin}>poin</Text>
          </View>
        </View>
      </Touchable>
    );
  }

  renderProduct = (data = []) => {
    const {gotoEasyPin, isLogin, newProduct, getValas, getTdCreate, getInsurance, goToSplitBillMenu, goReferralCode, newProductCC, goToLoan} = this.props;
    const productName = result(data, 'product', '');
    const productGoTo = productName === 'cc' ? newProductCC : productName === 'sa' ?  newProduct : productName === 'insurance' ? getInsurance : productName === 'td' ? getTdCreate : productName === 'exrate' ? getValas : productName === 'mgm' ? goReferralCode : productName === 'splitbill' ? goToSplitBillMenu : productName === 'loan' ? goToLoan : noop;
    return (
      <Touchable style={styles.containerInnerProduct} onPress={isLogin ? productGoTo : gotoEasyPin(productName)}>
        <Image source={data.image} resizeMode={'cover'} renderError={loadError} indicator={Bar} indicatorProps={{
          showsText: true,
          color: theme.brand,
          size: 50,
          thickness: 2
        }} style={styles.bannerProduct} />
      </Touchable>
    );
  }

  render () {
    const {navigateTo, goToBiller, goToCart, goToAlfacart, toogleMenuKoperasi, toggleDisableBillerNKYC, SimasPoinHistory, simasPoin, emoney, goToEmoneyHistoryNavigate,
      offers, goToOffer, mostSoldData, login, tutorialProduct, dataDisplay, goToTncAlfacart, logout, isLogin, inboxCounter = [], listCategoryOffers, lazyLogin,
      loginLanding, goToTncSimasCatalog, goToMenuSearch, gotoProduct, hideMGM, goToMerchantStore, statusMember, goToMembership, goToTncUnipin} = this.props;
    const poin = result(simasPoin, 'simasPoin.data.total_point');
    const {categoryOffers} = this.state;
    const emptyCat = isEmpty(listCategoryOffers);
    let selectedCategory = [];
    if (categoryOffers === 'All') {
      selectedCategory = [...offers, ...toogleMenuKoperasi];
    } else if (categoryOffers === 'Lifestyle') {
      selectedCategory = toogleMenuKoperasi;
    } else {
      selectedCategory = filter(offers, {category: categoryOffers});
    }
    const statusEmoney = result(emoney, 'status', '');
    const availableBalance = result(emoney, 'availableBalance', '');
    const status = result(simasPoin, 'status');
    const flagSpecialPromoOffers = filter(selectedCategory, {flag: 1});
    const lifeStyleOffers = filter(selectedCategory, {category: 'Lifestyle'});
    const bannerList = categoryOffers === 'Lifestyle' ? lifeStyleOffers : categoryOffers === 'All' ? [...flagSpecialPromoOffers, ...lifeStyleOffers] :  [...selectedCategory];
    const sortBanner = orderBy(bannerList, 'order', ['asc']);
    const tutorialON = result(tutorialProduct, 'tutorialON', '');
    const order = result(tutorialProduct, 'order', '');
    const title = result(dataDisplay, 'title', '');
    const name = result(dataDisplay, 'name', '');
    const cif = result(dataDisplay, 'cifCode', '');
    const isNonKyc = startsWith(cif, 'NK');

    const checkToogleMenuKoperasi = size(filter(toogleMenuKoperasi, function (val) {
      const offersTitle = result(val, 'offersTitle', '');
      return offersTitle === 'KoperasiOffer';
    })) > 0 ? 'yes' : 'no';

    const checkToogleMenuAlfa = size(filter(toogleMenuKoperasi, function (val) {
      const offersTitle = result(val, 'offersTitle', '');
      return offersTitle === 'AlfaCartOffer';
    })) > 0 ? 'yes' : 'no';

    const checkToogleMenuUV = size(filter(toogleMenuKoperasi, function (val) {
      const offersTitle = result(val, 'offersTitle', '');
      return offersTitle === 'UVOffer';
    })) > 0 ? 'yes' : 'no';

    const checkToggleMenuUnipin = size(filter(toogleMenuKoperasi, function (val) {
      const offersTitle = result(val, 'offersTitle', '');
      return offersTitle === 'UnipinOffer';
    })) > 0 ? 'yes' : 'no';

    let position = Animated.divide(this.scrollX, width * 0.50);
    let positionLifeStyle = Animated.divide(this.scrollLS, width * 0.32);
    const checkToogleMenuCMI = size(filter(toogleMenuKoperasi, function (val) {
      const offersTitle = result(val, 'offersTitle', '');
      return offersTitle === 'CMIOffer';
    })) > 0 ? 'yes' : 'no';
    let positionProd = Animated.divide(this.scrollProduct, width);
    const hideMGMon = lowerCase(hideMGM) === 'yes';
    const productData = dataProduct(isNonKyc, hideMGMon);
    // const textMember = statusMember === 'silver' ? language.MEMBERSHIP__SILVER : statusMember === 'gold' ? language.MEMBERSHIP__GOLD : statusMember === 'diamond' ? language.MEMBERSHIP__DIAMOND : statusMember === 'platinum' ? language.MEMBERSHIP__PLATINUM : null;
    const bgColor = statusMember === 'silver' ? silver : statusMember === 'gold' ? gold : statusMember === 'diamond' ? diamond : statusMember === 'platinum' ? platinum : null;
    return (
      <ScrollView>
        <View style={styles.containerScrollView}>
          <View style={ isLogin ? styles.backgroundColor1 : styles.backgroundColorNoLogin}>
            <View style={styles.rowContainerHead}>
              <SimasIcon name={'simobiplus-logo'} size={25} style={styles.iconSearch}/>
              <View style={styles.rowHeader}>
                <Touchable onPress={goToMenuSearch}>
                  <SimasIcon name={'search'} size={20} style={styles.iconSearch}/>
                </Touchable>
                <Touchable dtActionName='Notification' onPress={this.callInbox}><SimasIcon name={'alert-black'} size={30} style={styles.iconNotif}/>
                  {inboxCounter.length === 0 ?
                    null
                    :
                    <View style={styles.cartRed}/>
                  }
                </Touchable>
                {isLogin ?
                  <Touchable dtActionName='Logout' onPress={logout}>
                    <View style={styles.buttonLanding}>
                      <Text style={styles.textLogout}>{language.GENERIC_LOGOUT}</Text>
                    </View>
                  </Touchable>
                  :
                  <Touchable dtActionName='Login' onPress={loginLanding} >
                    <View style={styles.buttonLanding}>
                      <Text style={styles.textLogin}>LOGIN</Text>
                    </View>
                  </Touchable>
                }
              </View>
            </View>
            <View style={isLogin ? styles.rowHeader1Login : styles.rowHeader1}>
              <View style={styles.textContainerLogin1}>
                <Text style={styles.nameInfo}>{title} {name}</Text>
              </View>
              {isLogin ?
                <Touchable onPress={goToMembership} >
                  <View style={styles.buttonLanding2}>
                    <Image source={bgColor} style={statusMember === 'silver' || statusMember === 'gold' ? styles.memberimage : styles.memberimage2}/>
                  </View>
                </Touchable> : null }
            </View>
            <View style={isLogin ? styles.containerBillpay2login : styles.containerBillpay2}>
              <View style={styles.containerLeft}>
                <View style={styles.border}>
                  {isEmpty(emoney) ?
                    <Touchable onPress={this.reloadBalanceEmoney} style={styles.borderBillpay}>
                      <View style={{alignItems: 'center'}}>
                        <SimasIcon name='simas' style={styles.redIcon} size={10}/>
                        <SimasIcon name='emoney' style={styles.blackIcon} size={9}/>
                      </View>
                      <View style={{alignItems: 'center', paddingTop: 10}}>
                        <View><SimasIcon name='reload' style={styles.iconStyle} size={16}/></View>
                        <View><Text style={styles.textStyle}>{lazyLogin === 'active' ? language.LANDING_RELOAD : availableBalance === 0 ? '-' : currencyFormatter(availableBalance)}</Text></View>
                      </View>
                    </Touchable>
                    : statusEmoney === 'loading' ?
                      <View style={styles.borderBillpay}>
                        <View style={{alignItems: 'center'}}>
                          <SimasIcon name='simas' style={styles.redIcon} size={10}/>
                          <SimasIcon name='emoney' style={styles.blackIcon} size={9}/>
                        </View>
                        <View style={styles.containerPoin} >
                          <ActivityIndicator size='small' color={styles.red}/>
                        </View>
                      </View>
                      :
                      <View>
                        { !isEmpty(emoney) ?
                          <Touchable dtActionName='Simas Emoney Tap for History' onPress={goToEmoneyHistoryNavigate} style={styles.borderBillpay}>
                            <View style={{alignItems: 'center'}}>
                              <SimasIcon name='simas' style={styles.redIcon} size={10}/>
                              <SimasIcon name='emoney' style={styles.blackIcon} size={9}/>
                            </View>
                            <View style={{alignItems: 'center', paddingTop: 8}}>
                              <Text style={styles.stylePoin}> {availableBalance === 0 ? '-' : currencyFormatter(availableBalance)} </Text>
                              <View><Text style={styles.textStyle}>{language.TAP_HISTORY}</Text></View>
                            </View>
                          </Touchable>
                          :
                          <Touchable disabled={this.state.disabled} onPress={this.reloadBalanceEmoney} style={styles.borderBillpay}>
                            <View style={{alignItems: 'center'}}>
                              <SimasIcon name='simas' style={styles.redIcon} size={10}/>
                              <SimasIcon name='emoney' style={styles.blackIcon} size={9}/>
                            </View>
                            <View style={{alignItems: 'center', paddingTop: 6}}>
                              <View><SimasIcon name='reload' style={styles.poinImageReload} size={20}/></View>
                              <Text style={styles.textStyle}>{lazyLogin === 'active' ? language.LANDING_RELOAD : availableBalance === 0 ? '-' : currencyFormatter(availableBalance)}</Text>
                            </View>
                          </Touchable>

                        }
                      </View>
                  }
                </View>
                <View style={styles.greyLineSlim}/>
                <View style={styles.border}>
                  {isEmpty(simasPoin) ?
                    <Touchable onPress={this.reloadSimaspoin} style={styles.borderBillpaySimasPoin}>
                      <View style={{alignItems: 'center'}}><Image source={Poin} style={styles.poinImage}/></View>
                      <View style={{alignItems: 'center', paddingTop: 7}}>
                        <View><SimasIcon name='reload' style={styles.iconStyle} size={16}/></View>
                        <View><Text style={styles.textStyle}>{lazyLogin === 'active' ? language.LANDING_RELOAD : poin === 0 ? '-' : currencyFormatter(poin)}</Text></View>
                      </View>
                    </Touchable>
                    : status === 'loading' ?
                      <View style={styles.borderBillpay}>
                        <View style={{alignItems: 'center'}}><Image source={Poin} style={styles.poinImage}/></View>
                        <View style={styles.containerPoin} >
                          <ActivityIndicator size='small' color={styles.red}/>
                        </View>
                      </View>
                      :
                      <View>
                        { !isEmpty(poin) ?
                          <Touchable dtActionName='Simas Poin Tap for History' onPress={SimasPoinHistory} style={styles.borderBillpaySimasPoin}>
                            <View style={{alignItems: 'center'}}><Image source={Poin} style={styles.poinImage}/></View>
                            <View style={{alignItems: 'center', paddingTop: 8}}><Text style={styles.stylePoin}> {poin === 0 ? '-' : currencyFormatter(poin)} </Text></View>
                            <View style={{alignItems: 'center'}}><Text style={styles.textStyle}>{language.TAP_HISTORY}</Text></View>
                          </Touchable>
                          :
                          <Touchable disabled={this.state.disabled} onPress={this.reloadSimaspoin} style={styles.borderBillpay}>
                            <View style={{alignItems: 'center'}}><Image source={Poin} style={styles.poinImage}/></View>
                            <View style={{alignItems: 'center', paddingTop: 5}}>
                              <View><SimasIcon name='reload' style={styles.iconStyle} size={17}/></View>
                              <View><Text style={styles.textStyle}>{lazyLogin === 'active' ? language.LANDING_RELOAD : poin === 0 ? '-' : currencyFormatter(poin)}</Text></View>
                            </View>
                          </Touchable>
                        }
                      </View>
                  }
                </View>
                <View style={styles.greyLineSlim}/>
                <View style={styles.border2}>
                  <Tooltip
                    animated
                    isVisible={tutorialON ? order === 1 : false}
                    content={<TutorialContent text={language.TOOLTIP_2}
                      order={order} next={this.addOrder}/>}
                    placement='bottom'
                    displayInsets={styles.tooltip}
                    onClose={this.finishOrder}
                  >
                    <View style={styles.borderBillpay}>
                      <Touchable dtActionName='Bank Account' onPress={login}>
                        <View style={{alignItems: 'center'}}>
                          <SimasIcon name={'new_card'} size={20} style={styles.iconRed}/>
                          <View style={{alignItems: 'center', paddingTop: 8}}>
                            <Text style={styles.textStyleBank}>Summary</Text>
                            <Text style={styles.textStyleBank}>Portofolio</Text>
                          </View>
                        </View>
                      </Touchable>
                    </View>
                  </Tooltip>
                </View>
              </View>
            </View>
          </View>

          <View>
            <View>
              <View style={styles.greyLine} />
              <View style={styles.backgroundColor}>
                <View style={styles.containerRowRedeem} >
                  <View style={styles.textEstoreTitle} >
                    <Text style={styles.styleMessage}>{language.SPECIAL_OFFERS_LANDING}</Text>
                  </View>
                  <View style={styles.textBillPayStyle2} >
                    <Touchable dtActionName='See all Offers' onPress={goToOffer}>
                      <Text style={styles.styleMessageSeeAllBiller}>{language.OFFER__BANNER_SEEALL}</Text>
                    </Touchable>
                  </View>
                </View>
                <View>
                  {
                    emptyCat ?
                      null
                      :
                      <ScrollView horizontal={true} style={styles.categoryTabContainer}>
                        {listCategoryOffers.map(this.renderCategory)}
                      </ScrollView>
                  }
                  {
                    isEmpty(selectedCategory) || selectedCategory === [] ?
                      <View style={styles.emptyBannerKoperasi}>
                        <Text>{language.OFFER__NO_OFFER}</Text>
                      </View>
                      :
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        onScroll={  categoryOffers === 'Lifestyle' ?
                          Animated.event([{nativeEvent: {contentOffset: {x: this.scrollLS}}}], {useNativeDriver: true})
                          :
                          Animated.event([{nativeEvent: {contentOffset: {x: this.scrollX}}}], {useNativeDriver: true})
                        }
                        scrollEventThrottle={16}>
                        {
                          categoryOffers === 'Lifestyle' ?
                            map(sortBanner, (offers, i) => {
                              const nameLifestyle = result(offers, 'offersTitle', '');
                              const titleLifestyle = nameLifestyle === 'UVOffer' ? language.ULTRA_VOUCHER__TITLE : nameLifestyle === 'AlfaCartOffer' ? language.ALFACART_LANDING : nameLifestyle === 'KoperasiOffer' ? language.GALERI__SINARMAS_HEADER : nameLifestyle === 'CMIOffer' ? language.MM__TITTLE_BANNER : nameLifestyle === 'UnipinOffer' ? language.UNIPIN__TITLE : null;
                              const subTitleLifestyle = nameLifestyle === 'UVOffer' ? language.ULTRA_VOUCHER__SUBTITLE : nameLifestyle === 'AlfaCartOffer' ? language.ALFACART__SUBTITLE_TEXT : nameLifestyle === 'KoperasiOffer' ? language.DIGISTORE__SUBTITLE_BANNER : nameLifestyle === 'CMIOffer' ? language.MM__SUBTITTLE_BANNER : nameLifestyle === 'UnipinOffer' ? language.UNIPIN__SUBTITLE : null;
                              const TouchableLifestyle = nameLifestyle === 'UVOffer' ? goToTncSimasCatalog : nameLifestyle === 'AlfaCartOffer' ?  goToTncAlfacart : nameLifestyle === 'KoperasiOffer' ? goToAlfacart : nameLifestyle === 'CMIOffer' ? goToMerchantStore(offers.offersCode) : nameLifestyle === 'UnipinOffer' ? goToTncUnipin : noop;
                              const toogleTouchableLifestyle = !!(nameLifestyle === 'UVOffer' &&  lowerCase(checkToogleMenuUV) === 'yes' || nameLifestyle === 'AlfaCartOffer' &&  lowerCase(checkToogleMenuAlfa) === 'yes' || nameLifestyle === 'KoperasiOffer' &&  lowerCase(checkToogleMenuKoperasi) === 'yes' || nameLifestyle === 'CMIOffer' && lowerCase(checkToogleMenuCMI) === 'yes' || nameLifestyle === 'UnipinOffer' &&  lowerCase(checkToggleMenuUnipin) === 'yes');
                              const lengthLifestyle = sortBanner.length === 1;

                              return (
                                <View key={i}>
                                  {(toogleTouchableLifestyle) &&
                                  <Touchable style={lengthLifestyle ? styles.containerInnerOffer : styles.containerInnerOfferLifestyle} onPress={TouchableLifestyle}>
                                    <Image source={{uri: offers.iconPath}} resizeMode={'stretch'} renderError={loadError} indicator={Bar} indicatorProps={{
                                      showsText: true,
                                      color: theme.brand,
                                      size: 50,
                                      thickness: 2
                                    }} style={lengthLifestyle ? styles.bannerinnerOffer : styles.bannerLifestyleElse} />
                                    <View style={styles.containerAlfa}>
                                      <View>
                                        <View style={styles.textAlfaContainer}>
                                          <Text style={styles.titleCodeBold}>{titleLifestyle}</Text>
                                          <Text style={styles.titleCode}>{subTitleLifestyle}</Text>
                                        </View>
                                      </View>
                                    </View>
                                  </Touchable>
                                  }
                                </View>
                              );
                            }
                            )
                            :
                            map(sortBanner, (offers, i) => {
                              const {onOfferClick} = this.props;
                              let offerDate = '';
                              const categoryName = result(offers, 'category', '');
                              const categoryLifeStyle = categoryName === 'Lifestyle';
                              const nameLifestyle = result(offers, 'offersTitle', '');
                              const titleLifestyle = nameLifestyle === 'UVOffer' ? language.ULTRA_VOUCHER__TITLE : nameLifestyle === 'AlfaCartOffer' ? language.ALFACART_LANDING : nameLifestyle === 'KoperasiOffer' ? language.GALERI__SINARMAS_HEADER : nameLifestyle === 'CMIOffer' ? language.MM__TITTLE_BANNER : nameLifestyle === 'UnipinOffer' ? language.UNIPIN__TITLE : null;
                              const subTitleLifestyle = nameLifestyle === 'UVOffer' ? language.ULTRA_VOUCHER__SUBTITLE : nameLifestyle === 'AlfaCartOffer' ? language.ALFACART__SUBTITLE_TEXT : nameLifestyle === 'KoperasiOffer' ? language.DIGISTORE__SUBTITLE_BANNER : nameLifestyle === 'CMIOffer' ? language.MM__SUBTITTLE_BANNER : nameLifestyle === 'UnipinOffer' ? language.UNIPIN__SUBTITLE : null;
                              const TouchableLifestyle = nameLifestyle === 'UVOffer' ? goToTncSimasCatalog : nameLifestyle === 'AlfaCartOffer' ?  goToTncAlfacart : nameLifestyle === 'KoperasiOffer' ? goToAlfacart : nameLifestyle === 'CMIOffer' ? goToMerchantStore(offers.offersCode) : nameLifestyle === 'UnipinOffer' ? goToTncUnipin : noop;
                              const toogleTouchableLifestyle = !!(nameLifestyle === 'UVOffer' &&  lowerCase(checkToogleMenuUV) === 'yes' || nameLifestyle === 'AlfaCartOffer' &&  lowerCase(checkToogleMenuAlfa) === 'yes' || nameLifestyle === 'KoperasiOffer' &&  lowerCase(checkToogleMenuKoperasi) === 'yes' || nameLifestyle === 'CMIOffer' && lowerCase(checkToogleMenuCMI) === 'yes' || nameLifestyle === 'UnipinOffer' &&  lowerCase(checkToggleMenuUnipin) === 'yes');
                              if (offers.validStartDate || offers.validEndDate) {
                                offerDate = offers.validStartDate === offers.validEndDate ? language.DAY__EVERY + getDayName(offers.validStartDate) :  `${moment(offers.validStartDate, 'DD-MM-YYYY').format('DD MMM YYYY')}${' - '}${moment(offers.validEndDate, 'DD-MM-YYYY').format('DD MMM YYYY')}`;
                              }
                              const isSingle = sortBanner.length === 1;
                              return (
                                <View key={i}>
                                  {
                                    categoryLifeStyle ?
                                      <View>
                                        {(toogleTouchableLifestyle) &&
                                        <Touchable style={isSingle ? styles.containerInnerOffer : styles.shortContainerInnerOffer} onPress={TouchableLifestyle}>
                                          <Image source={{uri: offers.iconPath}} resizeMode={'stretch'} renderError={loadError} indicator={Bar} indicatorProps={{
                                            showsText: true,
                                            color: theme.brand,
                                            size: 50,
                                            thickness: 2
                                          }} style={styles.bannerLifestyleElse} />
                                          <View style={styles.containerAlfa}>
                                            <View>
                                              <View style={styles.textAlfaContainer}>
                                                <Text style={styles.titleCodeBold}>{titleLifestyle}</Text>
                                                <Text style={styles.titleCode}>{subTitleLifestyle}</Text>
                                              </View>
                                            </View>
                                          </View>
                                        </Touchable>
                                        }
                                      </View>
                                      :
                                      <Touchable style={isSingle ? styles.containerInnerOffer : styles.shortContainerInnerOffer} onPress={onOfferClick(offers)}>
                                        <Image source={{uri: offers.imgUrl}} resizeMode={'stretch'} renderError={loadError} indicator={Bar} indicatorProps={{
                                          showsText: true,
                                          color: theme.brand,
                                          size: 50,
                                          thickness: 2
                                        }} style={isSingle ? styles.bannerinnerOffer : styles.bannerLifestyleElse} />
                                        <View style={isSingle ? styles.containerAlfa : styles.containerAlfaSmall}>
                                          <View>
                                            <View style={styles.offerDetails}>
                                              <View style={styles.iconContainer}><SimasIcon name='time-black' size={isSingle ? 30 : 20} style={styles.iconStyleBlack}/></View>
                                              <View>
                                                <Text style={isSingle ? styles.label : styles.labelSmall}>{language.OFFER__BANNER_VALID_DATE}</Text>
                                                <Text style={isSingle ? styles.labelValidDate : styles.labelSmall}>{offerDate}</Text>
                                              </View>
                                            </View>
                                          </View>
                                        </View>
                                      </Touchable>
                                  }
                                </View>
                              );
                            }
                            )
                        }
                      </ScrollView>
                  }
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                    <View style={{flexDirection: 'row'}}>
                      {sortBanner.map((offers, i) => {
                        const categoryName = result(offers, 'category', '');
                        const categoryLifeStyle = categoryName === 'Lifestyle';
                        const opacityLS = positionLifeStyle.interpolate({inputRange: [i - 1, i, i + 1], outputRange: [0.3, 1, 0.3], extrapolate: 'clamp'});
                        const opacityOffers = position.interpolate({inputRange: [i - 1, i, i + 1], outputRange: [0.3, 1, 0.3], extrapolate: 'clamp'});
                        let opacity = categoryOffers === 'Lifestyle' ? opacityLS : opacityOffers;
                        const nameLifestyle = result(offers, 'offersTitle', '');
                        const toogleTouchableLifestyle = !!(nameLifestyle === 'UVOffer' &&  lowerCase(checkToogleMenuUV) === 'yes' || nameLifestyle === 'AlfaCartOffer' &&  lowerCase(checkToogleMenuAlfa) === 'yes' || nameLifestyle === 'KoperasiOffer' &&  lowerCase(checkToogleMenuKoperasi) === 'yes' || nameLifestyle === 'CMIOffer' &&  lowerCase(checkToogleMenuCMI) === 'yes' || nameLifestyle === 'UnipinOffer' &&  lowerCase(checkToggleMenuUnipin) === 'yes' || nameLifestyle === 'CMIOffer' &&  lowerCase(checkToogleMenuCMI) === 'yes');
                        return (
                          <View>
                            {
                              categoryOffers === 'Lifestyle' || categoryLifeStyle ?
                                toogleTouchableLifestyle && <Animated.View
                                  key={i}
                                  style={{opacity, height: 7, width: 7, backgroundColor: theme.pinkBrand, margin: 5, borderRadius: 5}}/>
                                :
                                <Animated.View
                                  key={i}
                                  style={{opacity, height: 7, width: 7, backgroundColor: theme.pinkBrand, margin: 5, borderRadius: 5}}/>
                            }
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              </View>
            </View>




            <View>
              <View style={styles.greyLine}/>
              <View style={styles.backgroundColor}>
                <View style={styles.containerRowRedeem} >
                  <View style={styles.textEstoreTitle} >
                    <Text style={styles.styleMessage}>{language.ACCOUNT_MENU_PRODUCT_SERVICES}</Text>
                  </View>
                  <View style={styles.textBillPayStyle2} >
                    <Touchable onPress={gotoProduct}>
                      <Text style={styles.styleMessageSeeAllBiller}>{language.OFFER__BANNER_SEEALL}</Text>
                    </Touchable>
                  </View>
                </View>
                <ScrollView horizontal={true}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  onScroll={Animated.event([{nativeEvent: {contentOffset: {x: this.scrollProduct}}}], {useNativeDriver: true})}
                  scrollEventThrottle={16}>
                  {productData.map(this.renderProduct)}
                </ScrollView>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    {productData.map((_, i) => {
                      let opacity = positionProd.interpolate({
                        inputRange: [i - 1, i, i + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp'});
                      return (
                        <Animated.View
                          key={i}
                          style={{opacity, height: 7, width: 7, backgroundColor: theme.pinkBrand, margin: 5, borderRadius: 5}}/>
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>




            <Tooltip
              animated
              isVisible={tutorialON ? order === 2 : false}
              content={<TutorialContent text={language.TOOLTIP_3}
                order={order} next={this.addOrder}/>}
              placement='bottom'
              displayInsets={styles.tooltip}
              onClose={this.finishOrder}
            >
              <View style={styles.containerBillpay3}>
                <View style={styles.containerRowServiceBillpay} >
                  <View style={styles.textBillPayStyleBL} >
                    <Text style={styles.styleMessage}>{language.BEFORE_LOGIN__TITTLE_BILLPAYMENT}</Text>
                  </View>
                </View>

                <View style={styles.containerRowBillpayOne}>
                  <ServiceBillpay text={language.PAY_BILLS__OVO} onPress={goToBiller('OVO')} layers={ovo} disable={isNonKyc} toggleDisableBillerNKYC={toggleDisableBillerNKYC}/>
                  <ServiceBillpay text={language.PAY_BILLS__GOPAY} onPress={goToBiller('GOJEK')} layers={gopay} disable={isNonKyc} toggleDisableBillerNKYC={toggleDisableBillerNKYC}/>
                  <ServiceBillpay text={language.PAY_BILLS__DANA} onPress={goToBiller('DANA')} disable={isNonKyc} layers={dana} toggleDisableBillerNKYC={toggleDisableBillerNKYC}/>
                  <ServiceBillpay text={language.PAY_BILLS__ELECTRICITY} onPress={navigateTo('GenericBiller', 'ELECTRICITY')} layers={pln}/>
                </View>
                <View style={styles.containerRowBillpay}>
                  <ServiceBillpay text={language.PAY_BILLS__MOBILE_TOP_UP} onPress={navigateTo('BillerTypeSix')} layers={prepaid}/>
                  <ServiceBillpay text={language.PAY_BILLS__MOBILE_POSTPAID} onPress={navigateTo('BillerTypeOne')} layers={postpaid}/>
                  <ServiceBillpay text={language.PAY_BILLS__CREDIT_CARD} onPress={navigateTo('CreditCard')} layers={ccicon} disable={isNonKyc} toggleDisableBillerNKYC={'YES'}/>
                  <ServiceBillpay text={language.OFFER__BANNER_SEEALL} onPress={navigateTo('GenericBiller')} layers={more}/>
                </View>
              </View>
            </Tooltip>



            <View style={styles.greyLine}/>
            <View style={styles.backgroundColor}>
              <View style={styles.containerRowRedeem} >
                <View style={styles.textBillPayStyleBL1} >
                  <Text style={styles.styleMessage}>{language.BEOFRE_LOGIN__REDEEM_TITTLE}</Text>
                </View>

                <View style={styles.textBillPayStyle2} >
                  <Touchable dtActionName='Redeem My Simas Poin' onPress={goToCart}>
                    <SimasIcon name='more-menu-2' size={17} style={styles.iconStyle}/>
                  </Touchable>
                </View>
              </View>
              <ScrollView horizontal={true}>
                <Touchable dtActionName='Redeem My Simas Poin' style={styles.touchableRow} onPress={this.onPressTab('01')}>
                  <View style={styles.tabIcon} >
                    <Image source={iconhnb} style={styles.pictureIcon} />
                  </View>
                  <Text style={styles.styleCaption}>{language.TAB_TITLE_LANDING__HNB}</Text>
                  <Text style={styles.styleCaption}>{language.TAB_TITLE_LANDING__HNB_2}</Text>
                </Touchable>

                <Touchable dtActionName='Redeem My Simas Poin' style={styles.touchableRow} onPress={this.onPressTab('02')}>
                  <View style={styles.tabIcon} >
                    <Image source={iconent} style={styles.pictureIcon} />
                  </View>
                  <Text style={styles.styleCaption}>{language.TAB_TITLE_LANDING__ENTERTAINMENT}</Text>
                  <Text style={styles.styleCaption}>{language.TAB_TITLE_LANDING__ENTERTAINMENT_2}</Text>
                </Touchable>
                <Touchable dtActionName='Redeem My Simas Poin' style={styles.touchableRow} onPress={this.onPressTab('03')}>
                  <View style={styles.tabIcon} >
                    <Image source={iconfnb} style={styles.pictureIcon} />
                  </View>
                  <Text style={styles.styleCaption}>{language.TAB_TITLE_LANDING__FNB}</Text>
                  <Text style={styles.styleCaption}>{language.TAB_TITLE_LANDING__FNB_2}</Text>
                </Touchable>
                <Touchable dtActionName='Redeem My Simas Poin' style={styles.touchableRow} onPress={this.onPressTab('04')}>
                  <View style={styles.tabIcon} >
                    <Image source={iconshop} style={styles.pictureIcon} />
                  </View>
                  <Text style={styles.styleCaption}>{language.TAB_TITLE_LANDING__SHOPPING}</Text>
                </Touchable>

                <Touchable dtActionName='Redeem My Simas Poin' style={styles.touchableRow} onPress={this.onPressTab('05')}>
                  <View style={styles.tabIcon} >
                    <Image source={icontransport} style={styles.pictureIcon} />
                  </View>
                  <Text style={styles.styleCaption}>{language.TAB_TITLE_LANDING__TRANSPORTATION}</Text>
                </Touchable>
                <Touchable dtActionName='Redeem My Simas Poin' style={styles.touchableRow} onPress={this.onPressTab('99')}>
                  <View style={styles.tabIcon} >
                    <Image source={iconothers} style={styles.pictureIcon} />
                  </View>
                  <Text style={styles.styleCaption}>{language.TAB_TITLE_LANDING__OTHERS}</Text>
                </Touchable>

                <View style={styles.touchableRow}>
                  <View style={styles.tabIcon} >
                    <View style={styles.emptyIcon} />
                  </View>
                </View>
                <View style={styles.touchableRow}>
                  <View style={styles.tabIcon} >
                    <View style={styles.emptyIcon} />
                  </View>
                </View>
              </ScrollView>
              <ScrollView horizontal={true}>
                {mostSoldData.map(this.renderEgiftFav)}
              </ScrollView>
            </View>


            <View style={styles.greyLine} />

          </View>
        </View>
      </ScrollView >

    );
  }
}

export default LandingTabView;
