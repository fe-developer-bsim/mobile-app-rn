import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRMerchantDetail.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {result, isEmpty} from 'lodash';

class QRMerchantDetail extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
  }

  render () {
    const {navigation} = this.props;
    const detailData = result(navigation, 'state.params', {});
    const detailInfo = result(navigation, 'state.params.detailData.0', {});
    const detailStore = result(navigation, 'state.params.detailStore.0', {});
    const merchantId = result(detailData, 'merchantId', '');
    const merchantName = result(detailInfo, 'merchant_name', '');
    const merchantPhone = result(detailInfo, 'merchant_phone', '');    
    const merchantOwner = result(detailInfo, 'merchant_owner', '');
    const merchantAddress = result(detailInfo, 'merchant_address', '');

    const storeAddress = result(detailStore, 'store_address', '');
    const storeKelurahan = result(detailStore, 'kelurahan', '');
    const storeKecamatan = result(detailStore, 'kecamatan', '');
    const storeCity = result(detailStore, 'city', '');
    const storeProvince = result(detailStore, 'province', '');
    const storePostal = result(detailStore, 'postal_code', '');

    const merchantKtp = result(detailInfo, 'merchant_ktp', '');
    const merchantPasporWni = result(detailInfo, 'merchant_passportwni', '');
    const merchantPasporWna = result(detailInfo, 'merchant_passportwna', '');
    const merchantAccount = result(detailInfo, 'merchant_account_num', '');    
    const merchantSIUP = result(detailInfo, 'merchant_siup', '');    
    const merchantTDP = result(detailInfo, 'merchant_tdp', '');
    const merchantCriteria = result(detailInfo, 'merchant_criteria', '');
    
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' style={styles.bgGrey} extraHeight={120}>
        <View style={styles.bgWhite}>
          <View style={styles.merchantContainer}>
            <View style={styles.iconContainer}>
              <SimasIcon name={'user-black'} size={45} style={styles.userIcon}/>
            </View>
            <View style={styles.nameContainer} >
              <Text style={styles.merchantText3}>{merchantName}</Text>
              <Text style={styles.headText3}>{language.QR_GPN__MERCHANT_ID}</Text>
              <Text>{merchantId}</Text>
            </View>
          </View>
          <View style={styles.labelSpacing} />
          <View style={styles.borderGreyStyle} />
          <View style={styles.labelSpacing} />

          <View style={styles.containerInner}>
            <View style={styles.containerTitle}>
              <Text style={styles.titleText}>{language.QR_GPN__MERCHANT_DETAIL_11}</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.headText}>{language.QR_GPN__MERCHANT_NAME}</Text>
              <Text style={styles.subText}>{merchantName}</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.headText}>{language.QR_GPN__MERCHANT_PHONE_NUMBER}</Text>
              <Text style={styles.subText}>{merchantPhone}</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.headText}>{language.QR_GPN__MERCHANT_OWNER}</Text>
              <Text style={styles.subText}>{merchantOwner}</Text>
            </View>
            <View style={styles.containerTitle}>
              <Text style={styles.titleText}>{language.QR_GPN__MERCHANT_DETAIL_12}</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.headText}>{language.QR_GPN__MERCHANT_ADDRESS}</Text>
              <Text style={styles.subText}>{!isEmpty(storeAddress) ? storeAddress : merchantAddress}</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.headText}>{language.QR_GPN__MERCHANT_KELURAHAN}</Text>
              <Text style={styles.subText}>{storeKelurahan}</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.headText}>{language.QR_GPN__MERCHANT_KECAMATAN}</Text>
              <Text style={styles.subText}>{storeKecamatan}</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.headText}>{language.QR_GPN__MERCHANT_CITY}</Text>
              <Text style={styles.subText}>{storeCity}</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.headText}>{language.QR_GPN__MERCHANT_PROVINCE}</Text>
              <Text style={styles.subText}>{storeProvince}</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.headText}>{language.QR_GPN__MERCHANT_POSTAL_CODE}</Text>
              <Text style={styles.subText}>{storePostal}</Text>
            </View>
            <View style={styles.containerTitle}>
              <Text style={styles.titleText}>{language.QR_GPN__SUPPORTING_DOC}</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.headText}>{language.QR_GPN__MERCHANT_KTP}</Text>
              <Text style={styles.subText}>{merchantKtp}</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.headText}>{language.QR_GPN__MERCHANT_PASPORWNI}</Text>
              <Text style={styles.subText}>{merchantPasporWni}</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.headText}>{language.QR_GPN__MERCHANT_PASPORWNA}</Text>
              <Text style={styles.subText}>{merchantPasporWna}</Text>
            </View>
            {merchantCriteria !== 'UMI' ?
              <View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_SIUP}</Text>
                  <Text style={styles.subText}>{merchantSIUP}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.headText}>{language.QR_GPN__MERCHANT_TDP}</Text>
                  <Text style={styles.subText}>{merchantTDP}</Text>
                </View>
              </View>
              :
              null
            }
            <View style={styles.containerTitle}>
              <Text style={styles.titleText}>{language.QR_GPN__MERCHANT_ACCOUNT_01}</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.headText}>{language.QR_GPN__MERCHANT_YOUR_ACCOUNT}</Text>
              <Text style={styles.subText}>{merchantAccount}</Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}


export default QRMerchantDetail;
