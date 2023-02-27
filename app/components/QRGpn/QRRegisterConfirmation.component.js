import {Text, View, ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {SinarmasButton} from '../FormComponents';
import styles from './QRRegisterConfirmation.styles';
import {language} from '../../config/language';
import result from 'lodash/result';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import moment from 'moment';

class QRRegisterConfirmation extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    navigation: PropTypes.object,
    QRMerchantRegister: PropTypes.func,
  }

  state = {
    disabled: false,
  }

  onModalSubmit = () => {
    this.setState({disabled: true}, () => {
      const {handleSubmit = noop} = this.props;
      wrapMethodInFunction(handleSubmit());
      setTimeout(() => {
        this.setState({disabled: false});
      }, 7000);
    });
  };

  render () {
    const {navigation} = this.props;
    const {invalid} = this.props;
    const formQRGPN = result(navigation, 'state.params.form', {});
    const formQRGPN2 = result(navigation, 'state.params.form2', {});
    const merchantName = result(formQRGPN, 'merchantName', '');
    const merchantSales = result(formQRGPN, 'merchantSales', '');
    const businessLine = result(formQRGPN, 'businessLine.name', '');
    const merchantPhone = result(formQRGPN, 'merchantPhone', '');
    const nameOwner = result(formQRGPN, 'nameOwner', '');
    const nikOwner = result(formQRGPN, 'nikOwner', '');
    const merchantAddress = result(formQRGPN2, 'merchantAddress', '');
    const merchantKelurahan = result(formQRGPN2, 'district.name', '');
    const merchantKecamatan = result(formQRGPN2, 'subDistrict.name', '');
    const merchantCity = result(formQRGPN2, 'city.name', '');
    const merchantProvince = result(formQRGPN2, 'province.name', '');
    const merchantPostal = result(formQRGPN2, 'postalCode', '');
    const storeName = result(formQRGPN2, 'storeName', '');
    const storePhone = result(formQRGPN2, 'storePhone', '');
    const storeLocation = result(formQRGPN2, 'storeLocation.name', '');
    const merchantAccount = result(formQRGPN, 'accountNo.display', '');
    const ownership = result(formQRGPN2, 'ownership.name', '');
    const cashierName = result(formQRGPN, 'cashierName', '');
    const loginCashierName = result(formQRGPN, 'loginCashierName', '');
    const securityPhone = result(formQRGPN, 'securityPhone', '');
    const isRegisterStore = result(navigation, 'state.params.isRegisterStore', '');
    const isRegisterTerminal = result(navigation, 'state.params.isRegisterTerminal', '');
    const merchantSiup = result(formQRGPN, 'merchantSiup', '');
    const merchantTdp = result(formQRGPN, 'merchantTdp', '');
    const merchantNpwp = result(formQRGPN, 'merchantNpwp', '');
    const ownershipCode = result(formQRGPN2, 'ownership.code', '');
    const fromDate = moment(result(formQRGPN2, 'rentStart', '')).format('DD MMM YYYY');
    const toDate = moment(result(formQRGPN2, 'rentEnd', '')).format('DD MMM YYYY');
    const merchantNmid = result(formQRGPN2, 'merchantNmid', '');
    const merchantCode = result(formQRGPN, 'criteria.merchantCode', '');
    return (
      <View style={styles.halfWidth}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraHeight={200}>
          { isRegisterStore === true && isRegisterTerminal === false ?
            <View style={styles.containerInner}>
              <View>
                <Text style={styles.titles2}>{language.QR_GPN__MERCHANT_DETAIL_08}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.headText}>{language.QR_GPN__MERCHANT_STORE_NAME}</Text>
                <Text style={styles.subText}>{storeName}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.headText}>{language.QR_GPN__MERCHANT_PHONE_NAME}</Text>
                <Text style={styles.subText}>{storePhone}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.headText}>{language.QR_GPN__MERCHANT_PROVINCE}</Text>
                <Text style={styles.subText}>{merchantProvince}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.headText}>{language.QR_GPN__MERCHANT_CITY}</Text>
                <Text style={styles.subText}>{merchantCity}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.headText}>{language.QR_GPN__MERCHANT_KELURAHAN}</Text>
                <Text style={styles.subText}>{merchantKelurahan}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.headText}>{language.QR_GPN__MERCHANT_KECAMATAN}</Text>
                <Text style={styles.subText}>{merchantKecamatan}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.headText}>{language.QR_GPN__MERCHANT_POSTAL_CODE}</Text>
                <Text style={styles.subText}>{merchantPostal}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.headText}>{language.QR_GPN__MERCHANT_ADDRESS}</Text>
                <Text style={styles.subText}>{merchantAddress}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.headText}>{language.QR_GPN__MERCHANT_STORE_LOCATION}</Text>
                <Text style={styles.subText}>{storeLocation}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.headText}>{language.QR_GPN__MERCHANT_OWNERSHIP}</Text>
                <Text style={styles.subText}>{ownership}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.headText}>{language.QR_GPN__MERCHANT_NMID}</Text>
                <Text style={styles.subText}>{merchantNmid}</Text>
              </View>
              {ownershipCode === 1 ?
                <View style={styles.rowRent}>
                  <View style={styles.rentStart}>
                    <Text style={styles.headText}>{language.QR__RENT_DATE_START}</Text>
                    <Text style={styles.subText}>{fromDate}</Text>
                  </View>
                  <View style={styles.rentEnd}>
                    <Text style={styles.headText}>{language.QR__RENT_DATE_END}</Text>
                    <Text style={styles.subText}>{toDate}</Text>
                  </View>
                </View>
                :
                null}

              <View style={styles.borderGreyTop}/>
              <View>
                <Text style={styles.titles2}>{language.QR_GPN__MERCHANT_DETAIL_09}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.headText}>{language.QR_GPN__MERCHANT_CASHIER_NAME}</Text>
                <Text style={styles.subText}>{cashierName}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.headText}>{language.QR_GPN__MERCHANT_LOGIN_CASHIER_NAME}</Text>
                <Text style={styles.subText}>{loginCashierName}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.headText}>{language.QR_GPN__MERCHANT_CASHIER_PHONE}</Text>
                <Text style={styles.subText}>{securityPhone}</Text>
              </View>
            </View>
            :  isRegisterStore === false && isRegisterTerminal === true ?
              <View style={styles.containerInner}>
                <View>
                  <Text style={styles.titles2}>{language.QR_GPN__MERCHANT_DETAIL_09}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_CASHIER_NAME}</Text>
                  <Text style={styles.subText}>{cashierName}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_LOGIN_CASHIER_NAME}</Text>
                  <Text style={styles.subText}>{loginCashierName}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_CASHIER_PHONE}</Text>
                  <Text style={styles.subText}>{securityPhone}</Text>
                </View>
              </View>
              :
              <View style={styles.containerInner}>
                <Text style={styles.titles}>{language.QR_GPN__MERCHANT_DETAIL_07}</Text>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_NAME}</Text>
                  <Text style={styles.subText}>{merchantName}</Text>
                </View>
                {merchantCode !== 'UMI' ?
                  <View>
                    <View style={styles.containerText}>
                      <Text style={styles.headText}>{language.QR_GPN__MERCHANT_SIUP}</Text>
                      <Text style={styles.subText}>{merchantSiup}</Text>
                    </View>
                    <View style={styles.containerText}>
                      <Text style={styles.headText}>{language.QR_GPN__MERCHANT_TDP}</Text>
                      <Text style={styles.subText}>{merchantTdp}</Text>
                    </View>
                  </View>
                  :
                  null
                }
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_NPWP}</Text>
                  <Text style={styles.subText}>{merchantNpwp}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_SALES_VOLUME}</Text>
                  <Text style={styles.subText}>{merchantSales}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_BUSINESS_LINE}</Text>
                  <Text style={styles.subText}>{businessLine}</Text>
                </View>
                <View style={styles.borderGreyTop}/>
                <View>
                  <Text style={styles.titles2}>{language.QR_GPN__MERCHANT_TITLE_OWNER}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_NAME_OWNER}</Text>
                  <Text style={styles.subText}>{nameOwner}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_SALES_VOLUME}</Text>
                  <Text style={styles.subText}>{merchantSales}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_NIK_OWNER}</Text>
                  <Text style={styles.subText}>{nikOwner}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__TERMINAL_PHONE}</Text>
                  <Text style={styles.subText}>{merchantPhone}</Text>
                </View>
                <View>
                  <Text style={styles.titles3}>{language.QR_GPN__MERCHANT_ACCOUNT_01}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_YOUR_ACCOUNT}</Text>
                  <Text style={styles.subText}>{merchantAccount}</Text>
                </View>
                <View style={styles.borderGreyTop}/>
                <View>
                  <Text style={styles.titles2}>{language.QR_GPN__MERCHANT_DETAIL_08}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_STORE_NAME}</Text>
                  <Text style={styles.subText}>{storeName}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_PHONE_NAME}</Text>
                  <Text style={styles.subText}>{storePhone}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_PROVINCE}</Text>
                  <Text style={styles.subText}>{merchantProvince}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_CITY}</Text>
                  <Text style={styles.subText}>{merchantCity}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_KELURAHAN}</Text>
                  <Text style={styles.subText}>{merchantKelurahan}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_KECAMATAN}</Text>
                  <Text style={styles.subText}>{merchantKecamatan}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_POSTAL_CODE}</Text>
                  <Text style={styles.subText}>{merchantPostal}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_ADDRESS}</Text>
                  <Text style={styles.subText}>{merchantAddress}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_STORE_LOCATION}</Text>
                  <Text style={styles.subText}>{storeLocation}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_OWNERSHIP}</Text>
                  <Text style={styles.subText}>{ownership}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_NMID}</Text>
                  <Text style={styles.subText}>{merchantNmid}</Text>
                </View>
                {ownershipCode === 1 ?
                  <View style={styles.rowRent}>
                    <View style={styles.rentStart}>
                      <Text style={styles.headText}>{language.QR__RENT_DATE_START}</Text>
                      <Text style={styles.subText}>{fromDate}</Text>
                    </View>
                    <View style={styles.rentEnd}>
                      <Text style={styles.headText}>{language.QR__RENT_DATE_END}</Text>
                      <Text style={styles.subText}>{toDate}</Text>
                    </View>
                  </View>
                  :
                  null}

                <View style={styles.borderGreyTop}/>

                <View>
                  <Text style={styles.titles2}>{language.QR_GPN__MERCHANT_DETAIL_09}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_CASHIER_NAME}</Text>
                  <Text style={styles.subText}>{cashierName}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_LOGIN_CASHIER_NAME}</Text>
                  <Text style={styles.subText}>{loginCashierName}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_CASHIER_PHONE}</Text>
                  <Text style={styles.subText}>{securityPhone}</Text>
                </View>
              </View>
          }
        </ScrollView>
        <View style={styles.buttonNext}>
          <SinarmasButton onPress={this.onModalSubmit} disabled={invalid} text={language.QR_GPN__MERCHANT_BTN}/>
        </View>
      </View>
    );
  }
}


export default QRRegisterConfirmation;
