import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image, Linking, Platform} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import styles from './DigitalStorePaymentStatus.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {currencyFormatter} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util';
import SimobiPlus from '../../assets/images/simobiplus.png';
import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import ViewShot from 'react-native-view-shot';
import SuccesIcon from '../../assets/images/successicon.png';
import map from 'lodash/map';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import {connect} from 'react-redux';
import {autoSaveFeedBackChecklist} from '../../state/thunks/onboarding.thunks';
import Touchable from '../Touchable.component';
import CameraRoll from '@react-native-community/cameraroll';
import LinearGradient from 'react-native-linear-gradient';
import LuckyImage from '../../assets/images/IconBoxLuckyDip.png';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

const mapStateToProps = (state) => ({
  checked: result(state, 'autoSave.checked', false),
  DigitalStore: result(state, 'autoSave.DigitalStore', false),
});

const mapDispatchToProps = (dispatch) => ({
  autoSaveCek: (isAutoSave, checked, type) => dispatch(autoSaveFeedBackChecklist(isAutoSave, checked, type))
});

class PaymentStatus extends Component {
  static propTypes = {
    status: PropTypes.string,
    resultData: PropTypes.object,
    fullName: PropTypes.string,
    onClose: PropTypes.func,
    transRefNum: PropTypes.string,
    date: PropTypes.string,
    total: PropTypes.string,
    shippingAddress: PropTypes.object,
    sourceAcc: PropTypes.object,
    emailNew: PropTypes.object,
    storeNameAlfa: PropTypes.object,
    totalItemsAlfa: PropTypes.object,
    dateAlfa: PropTypes.object,
    timeAlfa: PropTypes.object,
    orderNum: PropTypes.string,
    isBillPayBeforeLogin: PropTypes.bool,
    onCloseLogin: PropTypes.func,
    toogleCheckbox: PropTypes.func,
    checked: PropTypes.bool,
    autoSaveChecklist: PropTypes.bool,
    goToNextAutoSave: PropTypes.func,
    nav: PropTypes.object,
    goToGalery: PropTypes.func,
    getAutoSaveChecklist: PropTypes.func,
    saveAutoSaveFunc: PropTypes.func,
    isAutoSave: PropTypes.bool,
    cek: PropTypes.bool,
    autoSaveCek: PropTypes.func,
    DigitalStore: PropTypes.bool,
    isDigitalStore: PropTypes.bool,
    goToHHH: PropTypes.func,
    goToHHHBeforeLogin: PropTypes.func,
    isLuckyDipActive: PropTypes.string,
    currentMerchant: PropTypes.array,
  }

  componentDidMount = () => {
    const {DigitalStore, isDigitalStore} = this.props;
    const checked = isDigitalStore ? DigitalStore : null;
    if (checked === true) {
      this.goToGalery();
    } else {
      null;
    }
  }

  state = {
    height: 0,
    width: 0,
    checked: this.props.DigitalStore,
  }

  capturePic = () => {
    this.refs.viewShot.capture().then((uri) => {
      const image = uri;
      if (Platform.OS === 'ios') {
        CameraRoll.saveToCameraRoll(image, 'photo');
      } else {
        const date = new Date();
        const nameFile = Math.floor(date.getTime() + date.getSeconds() / 2);
        const dirs = RNFetchBlob.fs.dirs;
        const path = `${dirs.DownloadDir}/${nameFile}.png`;
        RNFS.writeFile(path, image, 'base64').then(() => {});
      }
    });
  }

  goToGalery = () => {
    if (Platform.OS === 'android') { 
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((response) => {
        if (!response) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((res) => { 
            if (res !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.capturePic();
            }
          });
        } else {
          this.capturePic();
        }
      });
    } else {
      Permissions.check('ios.permission.PHOTO_LIBRARY').then((response) => {
        if (response !== 'granted') {
          Permissions.request('ios.permission.PHOTO_LIBRARY').then((response) => {
            if (response !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.capturePic();
            }
          });
        } else {
          this.capturePic();
        }

      });
    }
  }

  toogleCheckbox= () => {
    const {autoSaveCek} = this.props;
    const {DigitalStore, isDigitalStore} = this.props;
    const type = {isDigitalStore};

    const checked = !this.state.checked;
    this.setState({checked: checked});
    const isAutoSave = checked;
    isDigitalStore ? DigitalStore === isAutoSave : null;

    this.props.saveAutoSaveFunc({isAutoSave: isAutoSave, checked: checked});
    autoSaveCek(isAutoSave, checked, type);
    checked ? this.goToGalery() : null;

    const message = this.state.checked ? language.AUTO_SAVE_TOAST_FALSE : language.AUTO_SAVE_TOAST_TRUE;
    Toast.show(message, Toast.SHORT);
  }

  renderCart = (detail) => {
    const productDetail = result(detail, 'items', {});
    const quantity = result(productDetail, 'quantity', 1);
    return (
      <View style={styles.detailRow}>
        <View style={styles.amountContainer}>
          <Text style={styles.detailText}>Rp {currencyFormatter(quantity * productDetail.price)}</Text>
        </View>
        <View style={styles.quantityContainer}><Text style={styles.detailText}>{quantity}</Text></View>
        <View style={styles.detailRowBetween}>
          <View style={styles.flex1}>
            <Text style={styles.detailText}>{productDetail.productName}</Text>
          </View>
        </View>
      </View>
    );
  }
  closeLogin = () => {
    const {isBillPayBeforeLogin, onCloseLogin} = this.props;
    onCloseLogin(isBillPayBeforeLogin);
  }

  closeLoginHHH = () => {
    const {isBillPayBeforeLogin, goToHHHBeforeLogin} = this.props;
    goToHHHBeforeLogin(isBillPayBeforeLogin);
  }

  openStoreURL = () => {
    Linking.canOpenURL('http://.bit.ly/simobiplus').then((supported) => {
      if (supported) {
        Linking.openURL('http://bit.ly/simobiplus');
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }

  call = () => {
    Linking.canOpenURL('tel:1500153').then((supported) => {
      if (supported) {
        Linking.openURL('tel:1500153');
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }

  capturePayment = () => {
    this.refs.viewShot.capture().then((uri) => {
      const options = {
        title: language.PAYMENT_STATUS__SHARE_WITH,
        url: Platform.OS === 'ios' ? 'file://' + uri : 'data:image/png;base64,' + uri
      };
      Share.open(options);
    });
  }

  screenCapture = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((response) => {
        if (!response) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((res) => { 
            if (res !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.capturePayment();
            }
          });
        } else {
          this.capturePayment();
        }
      });
    } else {
      Permissions.check('ios.permission.PHOTO_LIBRARY').then((response) => {
        if (response !== 'granted') {
          Permissions.request('ios.permission.PHOTO_LIBRARY').then((response) => {
            if (response !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.capturePayment();
            }
          });
        } else {
          this.capturePayment();
        }
      });
    }
  }

  getScreenSize = (event) => {
    const {height, width} = event.nativeEvent.layout;
    this.setState({height, width});
  }

  render () {
    const {status, resultData = {}, onClose, date, transRefNum = '', total, sourceAcc, shippingAddress, emailNew, storeNameAlfa, totalItemsAlfa, isBillPayBeforeLogin, orderNum, currentMerchant,
      goToHHH, isLuckyDipActive} = this.props;
    const isUseSimas = result(sourceAcc, 'isUseSimas');
    const sendAccountNumber = result(sourceAcc, 'accountNumber', '');
    const productType = result(sourceAcc, 'productType', '');
    const place = result(shippingAddress, 'name', '');
    const adress = result(shippingAddress, 'address1', '');
    const nameDistrict = result(shippingAddress, 'nameDistrict', '');
    const nameCity = result(shippingAddress, 'nameCity', '');
    const fee = result(shippingAddress, 'fee', '');
    const merchant = result(currentMerchant, 'name', {});
    const options = {
      result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
      quality: 0.5,
      height: this.state.height,
      width: this.state.width
    };
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled' bounces={false} contentContainerStyle={styles.contentContainerStyle}>
          <ViewShot onLayout={this.getScreenSize} ref='viewShot' options={options}>
            <View style={styles.topContainer}>
              <View style={styles.header}>
                <View>
                  {status === 'SUCCESS' ?
                    <Image source={SimobiPlus} style={styles.mainTitleLogoSuccess}/>
                    :
                    <View style={styles.logoContainer}>
                      <Image source={SimobiPlus} style={styles.logoFail} size={50} />
                    </View>
                  }
                  <Text style={styles.amountBill2}>{language.ALFACART_CHECKOUT_PAYMENT_TITTLE}</Text>
                  {/* {/ {merchant === 'ALFACART' ? <Text style={styles.amountBill3}>{language.ALFACART_LANDING}</Text> : <Text style={styles.amountBill3}>{language.CMI__WORDING_TEXT}</Text>} /} */}
                  <Text style={styles.amountBill3}>
                    {status === 'SUCCESS' ?
                      language.ALFACART_WORDING__PAYMENT_FOOTER
                      : language.QR_GPN__MERCHANT_FAILED
                    }
                  </Text>
                </View>
                {status === 'SUCCESS' ?
                  <View style={styles.iconSuccess}>
                    <Image source={SuccesIcon} style={styles.logoSuccess} size={20} />
                    <View style={styles.headerButtonContainer}>
                      <SimasIcon name={'export'} style={styles.share} onPress={this.screenCapture} />
                      <SimasIcon name={'close-black'} style={styles.close} size={15} onPress={isBillPayBeforeLogin ? this.closeLogin : onClose} />
                    </View>
                  </View>
                  :
                  <View style={styles.titleContainerFailed}>
                    <Text style={styles.date}>{date}</Text>
                    <SimasIcon name={'fail-circle'} style={styles.logoFailCircle} size={50} />
                  </View>
                }
              </View>
              {
                isEmpty(resultData) ?
                  null
                  :
                  <View style={styles.middleContainer}>
                    <View style={styles.titleContainer}><Text style={styles.title}>{language.DIGISTORE__REDEEM_DETAIL}</Text></View>
                    <View style={styles.detailMap}>
                      {map(resultData, this.renderCart)}
                    </View>
                    <View style={styles.totalContainer}>
                      <Text style={styles.detailText}>{language.ALFACART_PAYMENT_DETAILS__DELIVERY_FEE}</Text>
                      <View style={styles.amountContainer}>
                        <Text style={styles.detailText}>Rp {currencyFormatter(fee)}</Text>
                      </View>
                    </View>
                    <View style={styles.nameContainer}>
                      {
                        isUseSimas ?
                          <Text style={styles.name}><Text style={styles.nameBold}>{language.ONBOARDING__REDEEM_TITLE}</Text></Text>
                          :
                          <Text style={styles.name}><Text style={styles.nameBold}>{productType} {sendAccountNumber}</Text></Text>

                      }
                    </View>
                    <View style={styles.titleContainer}><Text style={styles.title}>{language.DIGISTORE__PICK_UP_TITLE}</Text></View>
                    <View style={styles.nameContainer}>
                      <Text style={styles.name}>
                        <Text style={styles.nameBold}>{place}</Text>
                      </Text>
                      <Text style={styles.name}>{adress}</Text>
                      <Text style={styles.name}>{nameDistrict}, {nameCity}</Text>
                    </View>
                  </View>
              }
              <View>
                {status === 'SUCCESS' ?
                  <View style={styles.content}>
                    <Text style={styles.footerTextGrey2}>{language.ALFACART_PAYMENT_DETAILS__TOTAL_PAYMENT} <Text style={styles.footerTextRed} /></Text>
                    <Text style={styles.amountBill2}>Rp {currencyFormatter(total)}</Text>
                    <Text style={styles.footerTextGrey1}>{'PAYMENT DETAIL'} <Text style={styles.footerTextRed} /></Text>
                    <Text style={styles.footerTextGrey1}>{language.COMMON__EMAIL} <Text style={styles.footerTextRed} /></Text>
                    <Text style={[styles.accNo, styles.roboto]}>{emailNew}</Text>
                    <Text style={styles.footerTextGrey1}>{language.TIME_DEPOSIT__PAY_FROM} <Text style={styles.footerTextRed} /></Text>
                    {
                      isUseSimas ?
                        <Text style={[styles.accNo, styles.roboto]}>{language.ONBOARDING__REDEEM_TITLE}</Text>
                        :
                        <Text style={[styles.accNo, styles.roboto]}>{productType} - {sendAccountNumber}</Text>
                    }
                    <Text style={styles.footerTextGrey1}>{language.ALFACART_STORE__NAME_PAYMENT} <Text style={styles.footerTextRed} /></Text>
                    {/* <Text style={[styles.accNo, styles.roboto]}>{storeNameAlfa}</Text> */}
                    {merchant === 'ALFACART' ? <Text style={[styles.accNo, styles.roboto]}>{storeNameAlfa}</Text> : <Text style={[styles.accNo, styles.roboto]}>{'Muara mas'}</Text> }
                    <Text style={styles.footerTextGrey1}>{language.ALFACART_TOTAL__ITEMS_PAYMENT} <Text style={styles.footerTextRed} /></Text>
                    <Text style={[styles.accNo, styles.roboto]}>{totalItemsAlfa}</Text>
                    <Text style={styles.footerTextGrey1}>{language.ALFACART_CONTACT__INFO_PAYMENT} <Text style={styles.footerTextRed} /></Text>
                    {merchant === 'ALFACART' ? <Text style={[styles.accNo, styles.roboto]}>{'cs@alfadigital.id or 1500860'}</Text> : null }
                    <Text style={[styles.accNo, styles.roboto]}>{'care@banksinarmas.com or 1500153 '}</Text>
                    <Text style={[styles.accNo, styles.roboto]}>{'admin_muaramas@pingloka.com '}</Text>

                  </View>
                  : <View style={styles.transdetailId} >
                    <Text style={[styles.roboto]}>{language.PAYMENT_STATUS__ID_TRANS} </Text>
                    <Text style={[styles.time, styles.roboto]}>{transRefNum}</Text>
                  </View>
                }
                {status === 'SUCCESS' ?

                  <View style={styles.lineAlfa} />
                  : null
                }
                {status === 'SUCCESS' ?
                  <View>
                    <View style={styles.ph20}>
                      <Text>{language.SUCCESS__TRANSACTION_DETAIL}</Text>
                    </View>
                  </View>
                  : null
                }
                {status === 'SUCCESS' ?

                  <View style={styles.transdetail}>
                    <Text style={[styles.roboto]}>{language.DATE__TIME_SUCCESS}</Text>
                    <Text style={[styles.time, styles.roboto]}>{date}</Text>
                  </View>
                  : null
                }
                {status === 'SUCCESS' ?

                  <View style={styles.transdetailId} >
                    <Text style={[styles.roboto]}>{language.PAYMENT_STATUS__ID_TRANS} </Text>
                    <Text style={[styles.time, styles.roboto]}>{transRefNum}</Text>
                  </View>
                  : null
                }
                {status === 'SUCCESS' ?

                  <View style={styles.transdetailId} >
                    <Text style={[styles.roboto]}>{language.ALFACART_ORDER__NUMBER_SCREEN} </Text>
                    <Text style={[styles.time, styles.roboto]}>{orderNum}</Text>
                  </View>
                  : null
                }
                <View style={styles.lineAlfa} />
                {status === 'SUCCESS' ?

                  <View>
                    <Text style={styles.receipt}>{language.PAYMENT_STATUS__NEW_SUCCESS}</Text>
                  </View>
                  : <Text style={styles.transaction}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.redText} onPress={this.call}>1500 153</Text></Text>

                }
                {status === 'SUCCESS' ? 
                  null :
                  <View style={styles.buttonContainerFailed}>
                    <View style={styles.button}>
                      <SinarmasButton onPress={isBillPayBeforeLogin ? this.closeLogin : onClose} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE} />
                    </View>
                  </View>
                }
                <View style={styles.footerItem}>
                  {
                    isEmpty(resultData) ?
                      null
                      :
                      <Text style={styles.footerTextGrey}>{language.PAYMENT_STATUS__LEGAL}</Text>
                  }
                </View>

              </View>
            </View>
            <View style={styles.whiteBgHHH}>
              <View style={styles.paddingHHHBanner}>
                {isLuckyDipActive === 'INACTIVE' || isLuckyDipActive === 'inactive' ? 
                  null :
                  <LinearGradient colors={['#7ECECC', '#30BEAF']} style={styles.linearGradient} locations={[0.2, 1, 1]}
                    start={{x: 0.0, y: -0.2}} end={{x: 1.0, y: 0.0}}>
                    <View style={[styles.luckyDipBox, styles.rowCenter]}>
                      <View style={styles.rowCenterLuckyDip}>
                        <View style={styles.width}>
                          <Image source={LuckyImage} style={styles.iconBoxLuckyDip}/>
                        </View>
                      </View>
                      <View style={styles.textBannerContainer}>
                        <Text style={styles.fontBannerHHH}>{language.STATUS_PAYMENT_BANNER_HHH_ONE}
                          <Text style={styles.fontBannerHHHTwo}>{language.STATUS_PAYMENT_BANNER_HHH_TWO}</Text>
                          <Text>{language.STATUS_PAYMENT_BANNER_HHH_THREE}</Text>
                          <Text onPress={goToHHH} style={styles.fontBannerHHHFour}>
                            {language.STATUS_PAYMENT_BANNER_HHH_FOUR}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                }
              </View>
            </View>
          </ViewShot>

          <View style={styles.mainTitleCheckBox}>
            <View style={styles.containtextExplanation}>
              <View style={styles.rowFieldAgreement}>
                <Touchable>
                  <View>
                    <CheckBox
                      onChange={this.toogleCheckbox}
                      uncheckedImage={RedCheckBox}
                      checkedImage={UnCheckBox}
                      label={language.AUTO_SAVE_RECEIPT}
                      checkboxStyle={styles.checkboxStyle}
                      labelStyle={styles.checkboxLabel}
                      checked={!this.state.checked} // somehow checked value is reversed
                    />
                  </View>
                  <View>
                    <Text style={styles.tncTxt}>{language.AUTO_SAVE_DESCRIPTION}</Text>
                  </View>
                </Touchable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStatus);