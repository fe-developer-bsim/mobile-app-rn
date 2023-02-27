import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, Platform, Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './AccountMenu.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import others from '../../assets/images/profileBG.png';
import result from 'lodash/result';
import startsWith from 'lodash/startsWith';
import {language} from '../../config/language';
import Touchable from '../../components/Touchable.component';
import noop from 'lodash/noop';
import easyPinStyles from '../OnboardingJourney/EasyPinCreation.component.styles';
import {SinarmasButtonOnboarding} from '../FormComponents';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import SmsOtpInput from '../SmsOtp/SmsOtpInput.component';
import VersionNumber from 'react-native-version-number';
import profileEdit from '../../assets/images/editProfile.png';
import easypin from '../../assets/images/easypin.png';
import cleardata from '../../assets/images/cleardata.png';
import logoib from '../../assets/images/logoIB.png';
import autodebetImg from '../../assets/images/autodebet.png';
import kuponNew from '../../assets/images/kuponNew.png';
import pass from '../../assets/images/password.png';
import favtrx from '../../assets/images/favtrx.png';
import limit from '../../assets/images/limit.png';
import loginpre from '../../assets/images/loginPre.png';
import schedule from '../../assets/images/schedule.png';
import change from '../../assets/images/change.png';
import evoucherNew from '../../assets/images/evouchernew.png';
import languageicon from '../../assets/images/language.png';
import pushNew from '../../assets/images/pushinvoice.png';
import lkNew from '../../assets/images/luckydrawnew.png';
import {SinarmasButton} from '../FormComponents';
import emoneyIcon from '../../assets/images/emonewIconNew.png';
import biFasIcon from '../../assets/images/biFasticon.png';
import isEmpty from 'lodash/isEmpty';
import silver from '../../assets/images/silver.png';
import gold from '../../assets/images/gold.png';
import diamond from '../../assets/images/diamond.png';
import platinum from '../../assets/images/platinum.png';
import nilaiQScore from '../../assets/images/score-nilaiQ.png';
import nilaiQScoreBeta from '../../assets/images/score-nilaiQ-beta.png';

class AccountMenu extends React.Component {
  static propTypes = {
    profile: PropTypes.object,
    inquiryRecurringTransfer: PropTypes.func,
    goToMyCoupon: PropTypes.func,
    goToMyVoucher: PropTypes.func,
    choosePic: PropTypes.func,
    setImageData: PropTypes.func,
    profilePicture: PropTypes.object,
    delImageData: PropTypes.func,
    goToMyLuckyDraw: PropTypes.func,
    isUndian: PropTypes.bool,
    getFavBiller: PropTypes.func,
    couponCounterDetail: PropTypes.number,
    sizeVoucher: PropTypes.number,
    currentLanguage: PropTypes.string,
    goAutodebitList: PropTypes.func,
    inquiryLuckyDipCoupon: PropTypes.func,
    luckyDipCounter: PropTypes.string,
    isLuckyDipActive: PropTypes.string,
    linkCreditCard: PropTypes.func,
    getTdCreate: PropTypes.func,
    getInsurance: PropTypes.func,
    goToOffers: PropTypes.func,
    getQRGpn: PropTypes.func,
    newProduct: PropTypes.func,
    onPrimaryCustomerCall: PropTypes.func,
    onSecondaryCustomerCall: PropTypes.func,
    goToLocator: PropTypes.func,
    goToSettings: PropTypes.func,
    logout: PropTypes.func,
    resetAndNavigate: PropTypes.func,
    onRefresh: PropTypes.func,
    isLogin: PropTypes.bool,
    handleSubmit: PropTypes.func,
    validateBeforeSubmit: PropTypes.func,
    formValues: PropTypes.object,
    forgotEasyPin: PropTypes.func,
    loginFaceRecognition: PropTypes.func,
    isUsingFaceRecog: PropTypes.bool,
    isUsingFingerprint: PropTypes.bool,
    hasFingerprint: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    isFaceRegistered: PropTypes.bool,
    isLockedDevice: PropTypes.bool,
    loginFingerprint: PropTypes.func,
    visible: PropTypes.bool,
    showFingerprintModalAndroid: PropTypes.func,
    showFingerprintModalIOS: PropTypes.func,
    onModalClose: PropTypes.func,
    isFaceRecogEnabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    chooseServices: PropTypes.func,
    validateClosingEmoney: PropTypes.func,
    hideCloseEmoney: PropTypes.bool,
    cif: PropTypes.string,
    getValas: PropTypes.func,
    toMerchantList: PropTypes.func,
    toPushInvoiceList: PropTypes.func,
    goToSplitBillMenu: PropTypes.func,
    labelNewSplitBill: PropTypes.object,
    setLimit: PropTypes.func,
    goToSwitchpage: PropTypes.func,
    primaryToogleAccount: PropTypes.bool,
    switchAccountToogleBE: PropTypes.bool,
    goToTnC: PropTypes.func,
    goToPrivacy: PropTypes.func,
    termsCondition: PropTypes.string,
    privacyPolicy: PropTypes.string,
    goReferralCode: PropTypes.func,
    flagMgm: PropTypes.string,
    getCurrentSectionAccountMenu: PropTypes.func,
    manageBIFast: PropTypes.func,
    emoneyKycOnly: PropTypes.bool,
    getInternetBankingSettings: PropTypes.func,
    getLoginPreference: PropTypes.func,
    toShowQr: PropTypes.func,
    toogleLuckyDraw: PropTypes.string,
    openInbox: PropTypes.func,
    inboxCounter: PropTypes.array,
    upgradeEmoney: PropTypes.func,
    formEasypin: PropTypes.string,
    statusMember: PropTypes.string,
    goToMembership: PropTypes.func,
    username: PropTypes.string,
    prissaWhatsappURL: PropTypes.func,
    goToNilaiQScore: PropTypes.func,
    nilaiQScore_Beta: PropTypes.bool,
    toggleNilaiQ_SDK: PropTypes.bool,
  }

  handleValidate = () => {
    Keyboard.dismiss();
  }

  showFingerprintModalAndroid = () => {
    this.props.showFingerprintModalAndroid();
    Keyboard.dismiss();
  }

  state = {
    selected: ''
  };

  callInbox = () => {
    const {openInbox} = this.props;
    openInbox();
  }

  render () {
    const {resetAndNavigate = noop, profile, inquiryRecurringTransfer, goToMyCoupon, goToMyVoucher, profilePicture, goToMyLuckyDraw, getFavBiller, couponCounterDetail, sizeVoucher,
      goAutodebitList, getQRGpn, onPrimaryCustomerCall, onSecondaryCustomerCall,
      goToLocator, onRefresh, isLogin, forgotEasyPin, isFaceRegistered, isUsingFaceRecog, isUsingFingerprint, hasFingerprint, loginFaceRecognition,
      showFingerprintModalIOS, isFaceRecogEnabled, chooseServices, cif = '', toPushInvoiceList, goToTnC, goToPrivacy, termsCondition, privacyPolicy, getCurrentSectionAccountMenu, setLimit,
      manageBIFast, emoneyKycOnly, logout, getInternetBankingSettings, getLoginPreference, toShowQr, toogleLuckyDraw, inboxCounter = [], upgradeEmoney, validateClosingEmoney, hideCloseEmoney, formEasypin,
      statusMember, goToMembership, username, prissaWhatsappURL, goToNilaiQScore, nilaiQScore_Beta, toggleNilaiQ_SDK, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const name = result(profile, 'name', '');
    const genderDiv = others;
    const picture = result(profilePicture, 'base64', '');
    const renderImage = `data:image/jpeg;base64,${picture}`;
    const isKyc = !startsWith(cif, 'NK');
    const isNKyc = startsWith(cif, 'NK');
    const mobileNumber = result(profile, 'mobileNumberMasking', '');
    const flagCloseEmoney = isKyc ? hideCloseEmoney : true;
    const checkValueEasypin = isEmpty(formEasypin);
    const imageMember = statusMember === 'silver' ? silver : statusMember === 'gold' ? gold : statusMember === 'diamond' ? diamond : statusMember === 'platinum' ? platinum : null;
    const textMember = statusMember === 'silver' ? language.MEMBERSHIP__SILVER : statusMember === 'gold' ? language.MEMBERSHIP__GOLD : statusMember === 'diamond' ? language.MEMBERSHIP__DIAMOND : statusMember === 'platinum' ? language.MEMBERSHIP__PLATINUM : null;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'  contentContainerStyle={isLogin ? styles.container : styles.bodyContainerEasyPin} extraHeight={120}>
        { isLogin ?
          <View>
            <View>
              <View style={styles.header}>
                <View style={styles.profileHeader}>
                  <View style={styles.rowHeader2}>
                    <Image source={picture === null || picture === '' ? genderDiv : {uri: renderImage}} style={styles.picture}/>
                    <View style={styles.textStyle}>
                      <Text style={styles.subNameHeader}>{name}</Text>
                      <Text style={styles.subNameHeader2}>{mobileNumber}</Text>
                    </View>
                  </View>
                  <View style={styles.rowHeader}>
                    <Touchable onPress={this.callInbox}><SimasIcon name={'alert-black'} size={30} style={styles.iconNotif}/>
                      {inboxCounter.length === 0 ?
                        null
                        :
                        <View style={styles.cartRed}/>
                      }
                    </Touchable>
                  </View>
                </View>
              </View>



              <View style={styles.media}>
                {toogleLuckyDraw === 'YES' ?
                  <View style={[styles.content, styles.row]}>
                    {couponCounterDetail > 0 ?
                      <Touchable dtActionName='Coupon' style={toogleLuckyDraw === 'NO' ? styles.wrapCoupon2 : styles.wrapCoupon} onPress={goToMyCoupon}>
                        <View style={styles.rowNotif}>
                          <View style={styles.height}>
                            <Image source={kuponNew} style={styles.pictureIcon}/>
                          </View>
                          <View style={styles.numberCoupon}>
                            <Text style={styles.numberCouponText}>{couponCounterDetail}</Text>
                          </View>
                        </View>
                        <View style={styles.mv20}>
                          <Text style={styles.roboto}>{language.ACCOUNT__COUPON}</Text>
                        </View>
                      </Touchable>
                      :
                      <Touchable dtActionName='Coupon' style={toogleLuckyDraw === 'NO' ? styles.wrapCoupon2 : styles.wrapCoupon} onPress={goToMyCoupon}>
                        <View style={styles.height}>
                          <Image source={kuponNew} style={styles.pictureIcon}/>
                        </View>
                        <View style={styles.mv20}>
                          <Text style={styles.roboto}>{language.ACCOUNT__COUPON}</Text>
                        </View>
                      </Touchable>
                    }
                    {sizeVoucher > 0 ?
                      <Touchable dtActionName='Evoucher' style={toogleLuckyDraw === 'NO' ? styles.wrapCoupon2 : styles.wrapCoupon} onPress={goToMyVoucher}>
                        <View style={styles.rowNotif}>
                          <View style={styles.height}>
                            <Image source={evoucherNew} style={styles.pictureIcon}/>
                          </View>
                          <View style={styles.numberCoupon}>
                            <Text style={styles.numberCouponText}>{sizeVoucher}</Text>
                          </View>
                        </View>
                        <View style={styles.mv20}>
                          <Text style={styles.roboto}>{language.ACCOUNT__EVOUCHER}</Text>
                        </View>
                      </Touchable>
                      :
                      <Touchable dtActionName='Evoucher' style={toogleLuckyDraw === 'NO' ? styles.wrapCoupon2 : styles.wrapCoupon} onPress={goToMyVoucher}>
                        <View style={styles.height}>
                          <Image source={evoucherNew} style={styles.pictureIcon}/>
                        </View>
                        <View style={styles.mv20}>
                          <Text style={styles.roboto}>{language.ACCOUNT__EVOUCHER}</Text>
                        </View>
                      </Touchable>
                    }
                    {toogleLuckyDraw === 'NO' ?
                      null
                      :
                      <Touchable dtActionName='Lucky Draw' style={styles.wrapCoupon} onPress={goToMyLuckyDraw}>
                        <View style={styles.height}>
                          <Image source={lkNew} style={styles.pictureIcon}/>
                        </View>
                        <View style={styles.mv20}>
                          <Text style={styles.roboto}>{language.LUCKYDRAW__TITLE}</Text>
                        </View>
                      </Touchable>}
                  </View>


                  :

                  <View style={[styles.content, styles.row]}>
                    <Touchable dtActionName='Coupon' style={styles.wrapCoupon2New} onPress={goToMyCoupon}>
                      <View style={styles.height}>
                        <Image source={kuponNew} style={styles.pictureIcon}/>
                      </View>
                      <View style={styles.mv20}>
                        <Text style={styles.roboto}>{language.ACCOUNT__COUPON}</Text>
                        <Text style={styles.roboto}>{couponCounterDetail} {language.COUPON_COUNTER_MANY}</Text>
                      </View>
                    </Touchable>

                    <View style={styles.greyLineVertical} />
                    <Touchable dtActionName='Evoucher' style={styles.wrapCoupon2New} onPress={goToMyVoucher}>
                      <View style={styles.height}>
                        <Image source={evoucherNew} style={styles.pictureIcon}/>
                      </View>
                      <View style={styles.mv20}>
                        <Text style={styles.roboto}>{language.ACCOUNT__EVOUCHER}</Text>
                        <Text style={styles.roboto}>{sizeVoucher} {language.PROFILE__MYORDER}</Text>
                      </View>
                    </Touchable>
                  </View>
                }

              </View>


              <View>
                { isNKyc || isEmpty(statusMember) ?
                  null :
                  <Text style={styles.subTitle}>{language.ACCOUNT_MENU_ACCOUNT_MEMBER}</Text> }
              </View>
              { isNKyc || isEmpty(statusMember) ?
                null :
                <View style={styles.media2}>
                  <View style={styles.content2}>
                    <Touchable style={[styles.menu, styles.rowCenter]} onPress={goToMembership}>
                      <View style={styles.rowCenter}>
                        <View style={styles.width}>
                          <Image source={imageMember} style={styles.pictureIcon2}/>
                        </View>
                        <View style={styles.textTittle}>
                          <Text style={[styles.menuTitle, styles.roboto]}>{textMember}</Text>
                          <Text style={[styles.menuTxt, styles.roboto]}>{language.MEMBERSHIP__DESC_1 + textMember + language.MEMBERSHIP__DESC_2}</Text>
                        </View>
                      </View>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </Touchable>
                  </View>
                </View> }

              { isNKyc || toggleNilaiQ_SDK ?
                null :
                <View style={styles.topNilaiQ}>
                  <View style={styles.media2}>
                    <View style={styles.content2}>
                      <Touchable style={[styles.menu, styles.rowCenter]} onPress={goToNilaiQScore} dtActionName='NilaiQ' >
                        <View style={styles.rowCenter}>
                          <View style={styles.width}>
                            <Image source={nilaiQScore_Beta ? nilaiQScoreBeta : nilaiQScore} style={styles.pictureIcon2}/>
                          </View>
                          <View style={styles.textTittle}>
                            <Text style={[styles.menuTitle, styles.roboto]}>{language.ACCOUNT_MENU_NILAI_Q_SCORE}</Text>
                            <Text style={[styles.menuTxt, styles.roboto]}>{language.ACCOUNT_MENU_NILAI_Q_SCORE_TEXT}</Text>
                          </View>
                        </View>
                        <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                      </Touchable>
                    </View>
                  </View>
                </View>
              }

              <View>
                <Text style={styles.subTitle}>{language.ACCOUNT_MENU_ACCOUNT_SETTING}</Text>
              </View>
              <View style={styles.media2}>
                <View style={styles.content2}>
                  { username === '62999' ?
                    null :
                    <Touchable style={[styles.menu, styles.rowCenter]} onPress={isKyc ? getCurrentSectionAccountMenu : upgradeEmoney}>
                      <View style={styles.rowCenter}>
                        <View style={styles.width}>
                          <Image source={profileEdit} style={styles.pictureIcon2}/>
                        </View>
                        <View style={styles.textTittle}>
                          <Text style={[styles.menuTitle, styles.roboto]}>{language.ACCOUNT_MENU_PERSONAL_DATA}</Text>
                          <Text style={[styles.menuTxt, styles.roboto]}>{language.ACCOUNT_MENU_PERSONAL_DATA_TEXT}</Text>
                        </View>
                        <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                      </View>
                    </Touchable> }

                  <View style={styles.greyLine} />
                  <Touchable  dtActionName='Change Easy PIN' style={[styles.menu, styles.rowCenter]} onPress={resetAndNavigate('UpdateEasyPin')}>
                    <View style={styles.rowCenter}>
                      <View style={styles.width}>
                        <Image source={easypin} style={styles.pictureIcon2}/>
                      </View>
                      <View style={styles.textTittle}>
                        <Text style={[styles.menuTitle, styles.roboto]}>{language.ACCOUNT__EASYPIN}</Text>
                        <Text style={[styles.menuTxt, styles.roboto]}>{language.ACCOUNT__EASYPIN_TEXT}</Text>
                      </View>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>

                  <View style={styles.greyLine} />
                  <Touchable dtActionName='Change Password' style={[styles.menu, styles.rowCenter]} onPress={resetAndNavigate('ValidatePassword', {nextRouteName: 'CreateNewPassword'})}>
                    <View style={styles.rowCenter}>
                      <View style={styles.width}>
                        <Image source={pass} style={styles.pictureIcon2}/>
                      </View>
                      <View style={styles.textTittle}>
                        <Text style={[styles.menuTitle, styles.roboto]}>{language.ACCOUNT__PASS}</Text>
                        <Text style={[styles.menuTxt, styles.roboto]}>{language.ACCOUNT__PASS_TEXT}</Text>
                      </View>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>

                  <View style={styles.greyLine} />
                  { username === '62999' ?
                    null
                    : isKyc ?
                      <Touchable style={[styles.menu, styles.rowCenter]} onPress={getInternetBankingSettings}>
                        <View style={styles.rowCenter}>
                          <View style={styles.width}>
                            <Image source={logoib} style={styles.iconSize}/>
                          </View>
                          <View style={styles.textTittle}>
                            <Text style={[styles.menuTitle, styles.roboto]}>{language.TITLE_INTERNET_BANKING}</Text>
                            <Text style={[styles.menuTxt, styles.roboto]}>{language.SUBTITLE_INTERNET_BANKING}</Text>
                          </View>
                          <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                        </View>
                      </Touchable> : null}

                  <View style={styles.greyLine} />
                  { flagCloseEmoney ?
                    <Touchable dtActionName='Close Emoney' style={[styles.menu, styles.rowCenter]} onPress={validateClosingEmoney}>
                      <View style={styles.rowCenter}>
                        <View style={styles.width}>
                          <Image source={emoneyIcon} style={styles.pictureIcon2}/>
                        </View>
                        <View style={styles.textTittle}>
                          <Text style={[styles.menuTitle, styles.roboto]}>{language.BURGER_MENU__CLOSE_EMONEY}</Text>
                          <Text style={[styles.menuTxt, styles.roboto]}>{language.BURGER_MENU__CLOSE_EMONEY_DESC}</Text>
                        </View>
                        <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                      </View>
                    </Touchable> : null}

                </View>
              </View>




              <View>
                <Text style={styles.subTitle}>{language.ACCOUNT_MENU_APP_SETTING}</Text>
              </View>
              <View style={styles.media2}>
                <View style={styles.content2}>
                  <Touchable dtActionName='Login Preferences' style={[styles.menu, styles.rowCenter]} onPress={getLoginPreference}>
                    <View style={styles.rowCenter}>
                      <View style={styles.width}>
                        <Image source={loginpre} style={styles.iconSize}/>
                      </View>
                      <View style={styles.textTittle}>
                        <Text style={[styles.menuTitle, styles.roboto]}>{language.BURGER_MENU__LOGIN_PREFERENCES}</Text>
                        <Text style={[styles.menuTxt, styles.roboto]}>{language.ACCOUNT__LOGIN_PREF_TEXT}</Text>
                      </View>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>

                  <View style={styles.greyLine} />
                  <Touchable dtActionName='Language' style={[styles.menu, styles.rowCenter]} onPress={resetAndNavigate('LanguageSetting')}>
                    <View style={styles.rowCenter}>
                      <View style={styles.width}>
                        <Image source={languageicon} style={styles.iconSize}/>
                      </View>
                      <View style={styles.textTittle}>
                        <Text style={[styles.menuTitle, styles.roboto]}>{language.PROFILE__SELECT_LANGUAGE}</Text>
                        <Text style={[styles.menuTxt, styles.roboto]}>{language.ACCOUNT__LANGUAGE_TEXT}</Text>
                      </View>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>

                  <View style={styles.greyLine} />
                  <Touchable dtActionName='Change Device' style={[styles.menu, styles.rowCenter]} onPress={toShowQr}>
                    <View style={styles.rowCenter}>
                      <View style={styles.width}>
                        <Image source={change} style={styles.iconSize}/>
                      </View>
                      <View style={styles.textTittle}>
                        <Text style={[styles.menuTitle, styles.roboto]}>{language.TITLE_CHANGE_DEVICE_DRAWER}</Text>
                        <Text style={[styles.menuTxt, styles.roboto]}>{language.SUBTITLE_CHANGE_DEVICE_DRAWER}</Text>
                      </View>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>

                  <View style={styles.greyLine} />
                  <Touchable dtActionName='Clear SimobiPlus Data' style={[styles.menu, styles.rowCenter]} onPress={onRefresh}>
                    <View style={styles.rowCenter}>
                      <View style={styles.width}>
                        <Image source={cleardata} style={styles.iconSize}/>
                      </View>
                      <View style={styles.textTittle}>
                        <Text style={[styles.menuTitle, styles.roboto]}>{language.LANDING__REFRESH_DEVICE}</Text>
                        <Text style={[styles.menuTxt, styles.roboto]}>{language.ACCOUNT_MENU_CLEAR_DATA_TEXT}</Text>
                      </View>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>
                </View>
              </View>



              <View>
                <Text style={styles.subTitle}>{language.ACCOUNT_MENU_TRANSACTIONS_SETTING}</Text>
              </View>
              <View style={styles.media2}>
                <View style={styles.content2}>
                  {
                    emoneyKycOnly || isNKyc || username === '62999' ?
                      null
                      :
                      <Touchable style={[styles.menu, styles.rowCenter]} onPress={manageBIFast}>
                        <View style={styles.rowCenter}>
                          <View style={styles.width}>
                            <Image source={biFasIcon} style={styles.pictureIcon2}/>
                          </View>
                          <View style={styles.textTittle}>
                            <Text style={[styles.menuTitle, styles.roboto]}>{language.BIFAST_MANAGE}</Text>
                            <Text style={[styles.menuTxt, styles.roboto]}>{language.BIFAST_MANAGE_DESC}</Text>
                          </View>
                          <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                        </View>
                      </Touchable>}
                  <View style={styles.greyLine} />
                  { username === '62999' ?
                    null :
                    <Touchable dtActionName='Schedule Transfer' style={[styles.menu, styles.rowCenter]} onPress={inquiryRecurringTransfer}>
                      <View style={styles.rowCenter}>
                        <View style={styles.width}>
                          <Image source={schedule} style={styles.pictureIcon2}/>
                        </View>
                        <View style={styles.textTittle}>
                          <Text style={[styles.menuTitle, styles.roboto]}>{language.ACCOUNT__SCHEDULED}</Text>
                          <Text style={[styles.menuTxt, styles.roboto]}>{language.ACCOUNT__SCHEDULED_TEXT}</Text>
                        </View>
                        <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                      </View>
                    </Touchable>}
                  <View style={styles.greyLine} />
                  <Touchable dtActionName='Fav Transaction' style={[styles.menu, styles.rowCenter]} onPress={getFavBiller}>
                    <View style={styles.rowCenter}>
                      <View style={styles.width}>
                        <Image source={favtrx} style={styles.pictureIcon2}/>
                      </View>
                      <View style={styles.textTittle}>
                        <Text style={[styles.menuTitle, styles.roboto]}>{language.FAVORITE_TRANSACTION}</Text>
                        <Text style={[styles.menuTxt, styles.roboto]}>{language.FAVORITE_TRANSACTION_DESC}</Text>
                      </View>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>
                  <View style={styles.greyLine} />
                  <Touchable dtActionName='Autodebit List' style={[styles.menu, styles.rowCenter]} onPress={goAutodebitList}>
                    <View style={styles.rowCenter}>
                      <View style={styles.width}>
                        <Image source={autodebetImg} style={styles.pictureIcon2}/>
                      </View>
                      <View style={styles.textTittle}>
                        <Text style={[styles.menuTitle, styles.roboto]}>{language.AUTODEBIT__LIST}</Text>
                        <Text style={[styles.menuTxt, styles.roboto]}>{language.AUTODEBIT__LIST_DESC}</Text>
                      </View>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>
                  <View style={styles.greyLine} />
                  { username === '62999' ?
                    null :
                    <Touchable dtActionName='Push Invoice Transaction' style={[styles.menu]} onPress={toPushInvoiceList}>
                      <View style={styles.rowCenter}>
                        <View style={styles.width}>
                          <Image source={pushNew} style={styles.pictureIcon2}/>
                        </View>
                        <View style={styles.textTittle}>
                          <Text style={[styles.menuTitle, styles.roboto]}>{language.PUSH_BILLING__TRANSACTION_MENU}</Text>
                          <Text style={[styles.menuTxt, styles.roboto]}>{language.PUSH_BILLING__TRANSACTION_DESC}</Text>
                        </View>
                        <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                      </View>
                    </Touchable>}
                  <View style={styles.greyLine} />
                  { username === '62999' ?
                    null :
                    <Touchable style={[styles.menu, styles.rowCenter]} onPress={setLimit}>
                      <View style={styles.rowCenter}>
                        <View style={styles.width}>
                          <Image source={limit} style={styles.pictureIcon2}/>
                        </View>
                        <View style={styles.textTittle}>
                          <Text style={[styles.menuTitle, styles.roboto]}>{language.SET_LIMIT_TITLE}</Text>
                          <Text style={[styles.menuTxt, styles.roboto]}>{language.SET_TRANSFER_LIMIT_DESC}</Text>
                        </View>
                        <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                      </View>
                    </Touchable>}


                </View>
              </View>



              <View>
                { username === '62999' ?
                  null :
                  <Text style={styles.subTitle}>{language.ACCOUNT_MENU_PRODUCT_SETTING}</Text>}
              </View>
              <View style={styles.media2}>
                <View style={styles.content2}>
                  { username === '62999' ?
                    null :
                    <Touchable dtActionName='Manage Your ATM Card' style={[styles.menu, styles.rowCenter]} onPress={chooseServices}>
                      <View style={styles.rowCenter}>
                        <View>
                          <Text style={[styles.menuTitle2, styles.roboto]}>{language.BURGER_MENU__MANAGE_YOUR_ATM_CARD_NEW}</Text>
                        </View>
                      </View>
                      <View style={styles.rowCenterIcon}>
                        <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                      </View>
                    </Touchable> }
                  <View style={styles.greyLine} />
                  { username === '62999' ?
                    null :
                    <Touchable dtActionName='Apply and Manage Merchant' style={[styles.menu, styles.rowCenter]} onPress={getQRGpn}>
                      <View style={styles.rowCenter}>
                        <View>
                          <Text style={[styles.menuTitle2, styles.roboto]}>{language.BURGER_MENU__QR_MERCHANT}</Text>
                        </View>
                      </View>
                      <View style={styles.rowCenterIcon}>
                        <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                      </View>
                    </Touchable> }
                </View>
              </View>



              <View>
                <Text style={styles.subTitle}>{language.ACCOUNT_MENU_HELP_SUPPORT}</Text>
              </View>
              <View style={styles.media2}>
                <View style={styles.content2}>
                  <Touchable dtActionName='Help Call Support' style={[styles.menu, styles.rowCenter]} onPress={onPrimaryCustomerCall}>
                    <View style={styles.rowCenter}>
                      <View style={styles.row}>
                        <Text style={[styles.menuTitle2, styles.roboto]}>{language.BURGER_MENU__CALL_SUPPORT}</Text>
                        <Text style={[styles.menuTitle2, styles.roboto]}>{' '}</Text>
                        <Text style={[styles.menuTitle2, styles.roboto]}>{language.HELP__CALL_US__SUBTITLE}</Text>
                      </View>
                    </View>
                    <View style={styles.rowCenterIcon}>
                      <SimasIcon style={styles.couponOutline} name={'phone'} size={20}/>
                    </View>
                  </Touchable>
                  <View style={styles.greyLine} />
                  <Touchable dtActionName='Help Call Support' style={[styles.menu, styles.rowCenter]} onPress={onSecondaryCustomerCall}>
                    <View style={styles.rowCenter}>
                      <View style={styles.row}>
                        <Text style={[styles.menuTitle2, styles.roboto]}>{language.BURGER_MENU__CALL_SUPPORT}</Text>
                        <Text style={[styles.menuTitle2, styles.roboto]}>{' '}</Text>
                        <Text style={[styles.menuTitle2, styles.roboto]}>{language.HELP__CALL_US__SUBTITLE_SECONDARY}</Text>
                      </View>
                    </View>
                    <View style={styles.rowCenterIcon}>
                      <SimasIcon style={styles.couponOutline} name={'phone'} size={20}/>
                    </View>
                  </Touchable>
                  <View style={styles.greyLine} />
                  <Touchable dtActionName='Frequently Asked Questions' style={[styles.menu, styles.rowCenter]} onPress={resetAndNavigate('FAQform')}>
                    <View style={styles.rowCenter}>
                      <View>
                        <Text style={[styles.menuTitle2, styles.roboto]}>{language.BURGER_MENU__FREQUENTLY_ASKED_QUESTIONS}</Text>
                      </View>
                    </View>
                    <View style={styles.rowCenterIcon}>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>
                  <View style={styles.greyLine} />
                  <Touchable dtActionName='ATM & Branch Locator' style={[styles.menu, styles.rowCenter]} onPress={goToLocator}>
                    <View style={styles.rowCenter}>
                      <View>
                        <Text style={[styles.menuTitle2, styles.roboto]}>{language.ATM_LOCATOR__DRAWER}</Text>
                      </View>
                    </View>
                    <View style={styles.rowCenterIcon}>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>
                  <View style={styles.greyLine} />
                  <Touchable dtActionName='Chat with Prissa' style={[styles.menu, styles.rowCenter]} onPress={prissaWhatsappURL}>
                    <View style={styles.rowCenter}>
                      <View>
                        <Text style={[styles.menuTitle2, styles.roboto]}>{language.CHAT_WITH_PRISSA}</Text>
                      </View>
                    </View>
                    <View style={styles.rowCenterIcon}>
                      <SimasIcon  style={styles.couponOutlineWA} name='whatsappIcon' size={30}/>
                    </View>
                  </Touchable>
                </View>
              </View>

              <View>
                <Text style={styles.subTitle}>{language.ACCOUNT_MENU_LEGAL}</Text>
              </View>
              <View style={styles.media2}>
                <View style={styles.content2}>
                  <Touchable dtActionName='T&C' style={[styles.menu, styles.rowCenter]} onPress={goToTnC(termsCondition, 'yes')}>
                    <View style={styles.rowCenter}>
                      <View style={styles.row}>
                        <Text style={[styles.menuTitle2, styles.roboto]}>{language.LEGAL_MENU_TERMS}</Text>
                      </View>
                    </View>
                    <View style={styles.rowCenterIcon}>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>
                  <View style={styles.greyLine} />
                  <Touchable dtActionName='Privacy Policy' style={[styles.menu, styles.rowCenter]} onPress={goToPrivacy(privacyPolicy, 'yes')}>
                    <View style={styles.rowCenter}>
                      <View>
                        <Text style={[styles.menuTitle2, styles.roboto]}>{language.LEGAL_MENU_PRIVACY}</Text>
                      </View>
                    </View>
                    <View style={styles.rowCenterIcon}>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>
                </View>
              </View>
              <View style={styles.buttonLogin}>
                <View style={styles.textVersion}>
                  <Text style={styles.VersionText}>{language.SIMOBI_VERSION_INFO} {VersionNumber.appVersion}</Text>
                </View>
              </View>
            </View>
          </View>
          :
          <View style={styles.topContainerEasyPin}>
            <View>
              <View style={styles.rowEasyPINFormat}>
                <View>
                  <View style={styles.paddingHeader}/>
                  <Text style={styles.easypinHeaderTitle}>
                    {language.LOGIN_EASYPIN__TITLE}
                  </Text>
                </View>
                <View>
                  <SimasIcon name='EasyPIN' style={styles.easypinIcon} size={50}/>
                </View>
              </View>

              <View style={styles.rowLoginEasyPIN}>
                <Text style={styles.welcomeSubTextNewVerifyEP}>
                  {language.EASYPIN__ENTER_EASYPIN_SUBTEXT}
                </Text>
              </View>
              <View style={easyPinStyles.containerEasyPin}>
                <View style={easyPinStyles.inputOTPCOntainer}>
                  <Field name={'easyPin'} style={easyPinStyles.inputOTP} secureTextEntry={true} component={SmsOtpInput} submitHandler={this.handleValidate}/>
                </View>
                <View style={styles.forgotPasswordContainer}>
                  <Text style={easyPinStyles.loginProblemTextEP}>{language.EASYPIN__ENTER_EASYPIN_SUBTEXT_POPOVER_ATTEMPTS}</Text>
                </View>
                <View style={styles.forgotEasyPinContainer}>
                  <Touchable onPress={forgotEasyPin}>
                    <Text style={easyPinStyles.loginProblemTextEP}>{language.LOGIN__LOGIN_PROBLEM}
                      <Text style={styles.resendOtpButton}>{language.LOGIN__FORGOT_EASYPIN}</Text>
                    </Text>
                  </Touchable>
                </View>

                <View style={styles.quickLoginContainer}>
                  {
                    hasFingerprint && isUsingFingerprint ?
                      <Touchable onPress={Platform.OS === 'android' ? this.showFingerprintModalAndroid : showFingerprintModalIOS}>
                        <View style={styles.registerContent}>
                          <View style={styles.quickLoginIconContainer}>
                            <SimasIcon name='fingerprint' style={styles.quickLoginIcon} size={40}/>
                          </View>
                          <View>
                            <Text style={styles.resendOtpButton}>{language.LOGIN__QUICK_FINGERPRINT_1}</Text>
                            <Text style={styles.resendOtpButton}>{language.LOGIN__QUICK_FINGERPRINT_2}</Text>
                          </View>
                        </View>
                      </Touchable>
                      : null
                  }
                  {(hasFingerprint && isFaceRegistered && isUsingFaceRecog && isUsingFingerprint) ?
                    <View style={styles.quickLoginBorder}/> : null
                  }
                  {isFaceRegistered && isUsingFaceRecog && isFaceRecogEnabled ?
                    <Touchable onPress={loginFaceRecognition}>
                      <View style={styles.registerContent}>
                        <View style={styles.quickLoginIconContainer}>
                          <SimasIcon name='face-recog' style={styles.quickLoginIcon} size={40}/>
                        </View>
                        <View>
                          <Text style={styles.resendOtpButton}>{language.LOGIN__QUICK_FACE_1}</Text>
                          <Text style={styles.resendOtpButton}>{language.LOGIN__QUICK_FACE_2}</Text>
                        </View>
                      </View>
                    </Touchable>
                    : null
                  }
                </View>
              </View>
            </View>
          </View>}
        { isLogin ?
          <View style={styles.buttonOtpSubmit}>
            <SinarmasButton onPress={logout} >
              <Text style={styles.buttonOtpSubmitPage2}>{language.GENERIC_LOG_OUT}</Text>
            </SinarmasButton>
          </View> :
          <View style={styles.buttonOtpSubmitEP}>
            <SinarmasButtonOnboarding onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting || checkValueEasypin}  >
              <Text style={styles.buttonOtpSubmitPage}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButtonOnboarding>
          </View>}
      </KeyboardAwareScrollView>
    );
  }
}

export default AccountMenu;
