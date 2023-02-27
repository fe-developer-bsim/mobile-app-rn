import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image, Linking, Platform} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import styles from './EgiftPaymentStatus.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import find from 'lodash/find';
import Poin from '../../assets/images/poin.png';
import {currencyFormatter} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util';
import SimobiPlus from '../../assets/images/simobiplus.png';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import {connect} from 'react-redux';
import {autoSaveFeedBackChecklist} from '../../state/thunks/onboarding.thunks';
import Touchable from '../Touchable.component';
import ViewShot from 'react-native-view-shot';
import Permissions from 'react-native-permissions';
import CameraRoll from '@react-native-community/cameraroll';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

const mapStateToProps = (state) => ({
  checked: result(state, 'autoSave.checked', false),
  billPay: result(state, 'autoSave.billPay', false),
});

const mapDispatchToProps = (dispatch) => ({
  autoSaveCek: (isAutoSave, checked, type) =>
    dispatch(autoSaveFeedBackChecklist(isAutoSave, checked, type))
});

class PaymentStatus extends Component {
  componentDidMount = () => {
    const {isGenericBiller, billPay} = this.props;
    const checked = isGenericBiller ? billPay : billPay;
    if (checked === true) {
      this.goToGalery();
    } else {
      null;
    }
  };

  static propTypes = {
    status: PropTypes.string,
    resultData: PropTypes.object,
    fullName: PropTypes.string,
    onClose: PropTypes.func,
    transRefNum: PropTypes.string,
    date: PropTypes.string,
    isLogin: PropTypes.bool,
    onCloseLogin: PropTypes.func,
    isbfrEgift: PropTypes.bool,
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
    billPay: PropTypes.bool,
    isGenericBiller: PropTypes.bool,
  };

  state = {
    checked: this.props.billPay,
  };

  capturePic = () => {
    this.refs.viewShot.capture().then((uri) => {
      const image = uri;
      if (Platform.OS === 'ios') {
        CameraRoll.saveToCameraRoll(image, 'photo');
      } else {
        const date = new Date();
        const nameFile = Math.floor(
          date.getTime() + date.getSeconds() / 2
        );
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
              Toast.show(language.ERROR_MESSAGE__PERMISSION_PHOTOS);
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
    
  };

  getScreenSize = (event) => {
    const {height, width} = event.nativeEvent.layout;
    this.setState({height, width});
  };

  toogleCheckbox = () => {
    const {autoSaveCek} = this.props;
    const {isGenericBiller, billPay} = this.props;
    const type = {isGenericBiller};

    const checked = !this.state.checked;
    this.setState({checked: checked});
    const isAutoSave = checked;
    isGenericBiller ? billPay === isAutoSave : null;

    this.props.saveAutoSaveFunc({isAutoSave: isAutoSave, checked: checked});
    autoSaveCek(isAutoSave, checked, type);
    checked ? this.goToGalery() : null;

    const message = this.state.checked
      ? language.AUTO_SAVE_TOAST_FALSE
      : language.AUTO_SAVE_TOAST_TRUE;
    Toast.show(message, Toast.SHORT);
  };

  renderCart = (detail) => {
    if (isEmpty(detail.purchaseResponse) || detail.purchaseResponse === null) {
      return (
        <View style={styles.detailRow}>
          <View style={styles.quantityContainer}>
            <Text style={styles.detailTextRed}>{detail.quantity}</Text>
          </View>
          <View style={styles.detailRowBetween}>
            <View style={styles.flex1}>
              <Text style={styles.detailTextRed}>{detail.itemName}</Text>
              <Text style={styles.failDescription}>
                {language.PAYMENT_STATUS__REDEEM_FAIL}
              </Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.detailTextRed}>
                {currencyFormatter(detail.priceGift)}
              </Text>
              <View style={styles.imageContainer}>
                <Image source={Poin} style={styles.poinImage} />
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.detailRow}>
          <View style={styles.quantityContainer}>
            <Text style={styles.detailText}>{detail.quantity}</Text>
          </View>
          <View style={styles.detailRowBetween}>
            <View style={styles.flex1}>
              <Text style={styles.detailText}>{detail.itemName}</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.detailText}>
                {currencyFormatter(detail.quantity * detail.priceGift)}
              </Text>
              <View style={styles.imageContainer}>
                <Image source={Poin} style={styles.poinImage} />
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  openStoreURL = () => {
    Linking.canOpenURL('http://.bit.ly/simobiplus').
      then((supported) => {
        if (supported) {
          Linking.openURL('http://bit.ly/simobiplus');
        } else {
          Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
        }
      }).
      catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  };

  call = () => {
    Linking.canOpenURL('tel:1500153').
      then((supported) => {
        if (supported) {
          Linking.openURL('tel:1500153');
        } else {
          Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
        }
      }).
      catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  };

  render () {
    const {
      status,
      resultData = {},
      fullName,
      onClose,
      date,
      onCloseLogin,
      isbfrEgift,
      transRefNum = ''
    } = this.props;
    const resultPurchase = result(resultData, 'resultPurchase', []);
    const agreCashbac = find(
      resultPurchase,
      (agre) => agre.agregator === 'CASHBAC'
    );
    const agregatorType = result(agreCashbac, 'agregator', '');
    const isErrorCashbac = result(agreCashbac, 'responseCode', '');
    const errorCashbacMsg = result(agreCashbac, 'responseMessage', '');
    const isNotError = find(
      resultPurchase,
      (item) => item.purchaseResponse !== null
    );
    const options = {
      result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
      quality: 0.5,
      height: this.state.height,
      width: this.state.width
    };
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps='handled'
          bounces={false}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <ViewShot
            onLayout={this.getScreenSize}
            ref='viewShot'
            options={options}
            style={styles.middleContainerUp}
          >
            <View>
              <View style={styles.topContainer}>
                <View style={styles.logoContainer}>
                  <Image source={SimobiPlus} style={styles.mainTitleLogo} />
                  <Text style={styles.date}>{date}</Text>
                </View>
                <View style={styles.header}>
                  <View style={styles.flex1}>
                    {status === 'SUCCESS' && isNotError ? (
                      <Text style={styles.status}>
                        {language.EGIFT__TRANSACTION_SUCCESS}
                      </Text>
                    ) : null}
                    <Text style={styles.description}>
                      {status === 'SUCCESS' && isNotError
                        ? language.EGIFT__REDEEM_SUCCESS
                        : language.EGIFT__REDEEM_FAILED}
                    </Text>
                  </View>
                  {status === 'SUCCESS' && isNotError ? (
                    <SimasIcon
                      name={'success-circle'}
                      style={styles.logoSuccess}
                      size={50}
                    />
                  ) : (
                    <SimasIcon
                      name={'fail-circle'}
                      style={styles.logoFail}
                      size={50}
                    />
                  )}
                </View>
                {transRefNum === '' || transRefNum === null ? null : (
                  <View style={styles.refnumContainer}>
                    <Text style={styles.transRefNum}>
                      {language.TRANSFERSTATUS__TRANSACTION_ID}: {transRefNum}
                    </Text>
                  </View>
                )}
              </View>
              {isEmpty(resultPurchase) ? null : (
                <View style={styles.middleContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                      {language.EGIFT__REDEEM_DETAIL}
                    </Text>
                  </View>
                  {agregatorType === 'CASHBAC' ? (
                    isErrorCashbac === '01' ? (
                      <View style={styles.flex2}>
                        <Text style={styles.detailRow2}>{errorCashbacMsg}</Text>
                      </View>
                    ) : null
                  ) : null}
                  <View style={styles.detailMap}>
                    {resultPurchase.map(this.renderCart)}
                  </View>
                  <View style={styles.totalContainer}>
                    <Text style={styles.total}>{language.EGIFT__TOTAL}</Text>
                    <View style={styles.amountContainer}>
                      <Text style={styles.total}>
                        {currencyFormatter(resultData.redeemPoin)}
                      </Text>
                      <View style={styles.imageContainer}>
                        <Image source={Poin} style={styles.poinImageLarge} />
                      </View>
                    </View>
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>
                      {language.SIMAS_POIN__BRAND} -{' '}
                      <Text style={styles.nameBold}>{fullName}</Text>
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.footerContainer}>
              <View style={styles.footerItem}>
                <Text style={styles.footerTextGrey}>
                  {language.PAYMENT_STATUS__NEED_HELP}{' '}
                  <Text style={styles.footerTextRed} onPress={this.call}>
                    1500 153
                  </Text>
                </Text>
              </View>
              <View style={styles.footerItem}>
                <Text style={styles.footerTextGrey}>
                  {language.PAYMENT_STATUS__DOWNLOAD}{' '}
                  <Text
                    style={styles.footerTextRed}
                    onPress={this.openStoreURL}
                  >
                    bit.ly/simobiplus
                  </Text>
                </Text>
              </View>
              <View style={styles.footerItem}>
                {isEmpty(resultPurchase) ? null : (
                  <Text style={styles.footerTextGrey}>
                    {language.PAYMENT_STATUS__LEGAL}
                  </Text>
                )}
                <Text style={styles.footerTextGrey}>
                  {language.PAYMENT_STATUS__SEND_EMAIL}
                </Text>
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
                    <Text style={styles.tncTxt}>
                      {language.AUTO_SAVE_DESCRIPTION}
                    </Text>
                  </View>
                </Touchable>
              </View>
            </View>
          </View>
          <View style={styles.footerContainerButton}>
            <View style={styles.buttonContainer}>
              <SinarmasButton
                onPress={isbfrEgift ? onClose : onCloseLogin}
                text={language.SERVICE__OK_BUTTON}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentStatus);
