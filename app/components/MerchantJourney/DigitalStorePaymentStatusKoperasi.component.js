import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image, Linking, Platform} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import styles from './DigitalStorePaymentStatusKoperasi.styles';
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

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

const mapStateToProps = (state) => ({
  checked: result(state, 'autoSave.checked', false),
  DigitalStore: result(state, 'autoSave.DigitalStore', false),
});

const mapDispatchToProps = (dispatch) => ({
  autoSaveCek: (isAutoSave, checked, type) =>
    dispatch(autoSaveFeedBackChecklist(isAutoSave, checked, type))
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
  };

  componentDidMount = () => {
    const {DigitalStore, isDigitalStore} = this.props;
    const checked = isDigitalStore ? DigitalStore : null;
    if (checked === true) {
      this.goToGalery();
    } else {
      null;
    }
  };

  state = {
    height: 0,
    width: 0,
    checked: this.props.DigitalStore,
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
  };

  toogleCheckbox = () => {
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

    const message = this.state.checked
      ? language.AUTO_SAVE_TOAST_FALSE
      : language.AUTO_SAVE_TOAST_TRUE;
    Toast.show(message, Toast.SHORT);
  };

  renderCart = (detail) => {
    const productDetail = result(detail, 'items', {});
    const quantity = result(productDetail, 'quantity', 1);
    return (
      <View style={styles.detailRow}>
        <View style={styles.quantityContainer}>
          <Text style={styles.detailText}>{quantity}</Text>
        </View>
        <View style={styles.detailRowBetween}>
          <View style={styles.flex1}>
            <Text style={styles.detailText}>{productDetail.productName}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.detailText}>
              Rp {currencyFormatter(quantity * productDetail.price)}
            </Text>
          </View>
        </View>
      </View>
    );
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

  capturePayment = () => {
    this.refs.viewShot.capture().then((uri) => {
      const options = {
        title: language.PAYMENT_STATUS__SHARE_WITH,
        url:
          Platform.OS === 'ios'
            ? 'file://' + uri
            : 'data:image/png;base64,' + uri
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
    
  };

  getScreenSize = (event) => {
    const {height, width} = event.nativeEvent.layout;
    this.setState({height, width});
  };

  render () {
    const {
      status,
      resultData = {},
      onClose,
      date,
      transRefNum = '',
      total,
      sourceAcc,
      shippingAddress,
    } = this.props;
    const sendAccountNumber = result(sourceAcc, 'accountNumber', '');
    const productType = result(sourceAcc, 'productType', '');
    const place = result(shippingAddress, 'name', ''); // productType
    const adress = result(shippingAddress, 'address1', '');
    const nameDistrict = result(shippingAddress, 'nameDistrict', '');
    const nameCity = result(shippingAddress, 'nameCity', '');
    const fee = result(shippingAddress, 'fee', '');
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
          >
            <View style={styles.topContainer}>
              <View style={styles.logoContainer}>
                <Image source={SimobiPlus} style={styles.mainTitleLogo} />
                <Text style={styles.date}>{date}</Text>
              </View>
              <View style={styles.header}>
                <View style={styles.flex1}>
                  {status === 'SUCCESS' ? (
                    <Text style={styles.status}>
                      {language.EGIFT__TRANSACTION_SUCCESS}
                    </Text>
                  ) : null}
                  <Text style={styles.description}>
                    {status === 'SUCCESS'
                      ? language.DIGISTORE__REDEEM_SUCCESS
                      : language.DIGISTORE__REDEEM_FAILED}
                  </Text>
                </View>
                {status === 'SUCCESS' ? (
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
              <View style={styles.greyContainer}>
                <View style={styles.greyLine} />
              </View>
              {isEmpty(resultData) ? null : (
                <View style={styles.middleContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                      {language.DIGISTORE__REDEEM_DETAIL}
                    </Text>
                  </View>
                  <View style={styles.detailMap}>
                    {map(resultData, this.renderCart)}
                  </View>
                  <View style={styles.totalContainer}>
                    <Text style={styles.detailText}>
                      {language.ALFACART_PAYMENT_DETAILS__DELIVERY_FEE}
                    </Text>
                    <View style={styles.amountContainer}>
                      <Text style={styles.detailText}>
                        Rp {currencyFormatter(fee)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.totalContainer}>
                    <Text style={styles.total}>{language.EGIFT__TOTAL}</Text>
                    <View style={styles.amountContainer}>
                      <Text style={styles.total}>
                        Rp {currencyFormatter(total)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>
                      <Text style={styles.nameBold}>
                        Source of Fund - {sendAccountNumber} {productType}
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                      {language.DIGISTORE__PICK_UP_TITLE}
                    </Text>
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>
                      <Text style={styles.nameBold}>{place}</Text>
                    </Text>
                    <Text style={styles.name}>{adress}</Text>
                    <Text style={styles.name}>
                      {nameDistrict}, {nameCity}
                    </Text>
                  </View>
                </View>
              )}
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
                  {isEmpty(resultData) ? null : (
                    <Text style={styles.footerTextGrey}>
                      {language.PAYMENT_STATUS__LEGAL}
                    </Text>
                  )}
                  <Text style={styles.footerTextGrey}>
                    {language.PAYMENT_STATUS__SEND_EMAIL}
                  </Text>
                </View>
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
          {status === 'SUCCESS' || status === 'PENDING' ? (
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <SinarmasButton
                  buttonType='bw'
                  onPress={this.screenCapture}
                  text={language.PAYMENT_STATUS__SHARE}
                />
              </View>
              <View style={styles.button}>
                <SinarmasButton
                  onPress={onClose}
                  text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}
                />
              </View>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <SinarmasButton
                  onPress={onClose}
                  text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentStatus);
