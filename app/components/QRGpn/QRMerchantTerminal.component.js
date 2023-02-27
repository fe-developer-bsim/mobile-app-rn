import {View, Text, FlatList, ScrollView, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRMerchantTerminal.styles';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import result from 'lodash/result';
import {listViewComparator} from '../../utils/transformer.util';
import QRTerminalList from './QRTerminalList.component';
import {SinarmasButton} from '../FormComponents';
import storeIcon from '../../assets/images/store-icon.png';

class QRMerchantTerminal extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    getStoreDetail: PropTypes.func,
    getMerchantTerminal: PropTypes.func,
    goToTerminalRes: PropTypes.func,
    goToTerminalEdit: PropTypes.func,
    goToTerminalReset: PropTypes.func,
    dispatch: PropTypes.func,
    getRefundCreate: PropTypes.func,
    addNewCashier: PropTypes.func,
    getRefundCode: PropTypes.func
  }
  comparator = listViewComparator

  state = {
    selectedMerchantId: '',
    pan: '',
    isRegisterStore: false,
    isRegisterTerminal: true
  }

  renderListItemTerminalDelete = (value) => () => {
    const {goToTerminalRes = {}} = this.props;
    return goToTerminalRes ? goToTerminalRes(value) : {};
  }

  renderListItemTerminalEdit = (value) => () => {
    const {goToTerminalEdit = {}} = this.props;
    return goToTerminalEdit ? goToTerminalEdit(value) : {};
  }

  renderListItemTerminalReset = (value) => () => {
    const {goToTerminalReset = {}} = this.props;
    return goToTerminalReset ? goToTerminalReset(value) : {};
  }

  renderListItem = ({item}) => (<QRTerminalList {...item} getTerminalDelete={this.renderListItemTerminalDelete(item)} getTerminalEdit={this.renderListItemTerminalEdit(item)} getTerminalReset={this.renderListItemTerminalReset(item)} />);

  goMerchantDetail = () => {
    const {navigation, getStoreDetail} = this.props;
    const detailData = result(navigation, 'state.params', {});
    const merchantId = result(detailData, 'merchantId', '');
    const terminalId = result(detailData, 'terminal_id', '');
    getStoreDetail(merchantId, terminalId);
  };

  goMerchantTerminal = () => {
    const {navigation, getMerchantTerminal} = this.props;
    const detailData = result(navigation, 'state.params', {});
    const merchantId = result(detailData, 'merchantId', '');
    const merchant_criteria = result(detailData, 'merchant_criteria', '');
    const terminalList = result(detailData, 'terminalList', []);
    getMerchantTerminal(merchantId, merchant_criteria, terminalList);
  };

  goRefundCreate = () => {
    const {navigation, getRefundCreate} = this.props;
    const merchantId = result(navigation, 'state.params.merchantId', '');
    getRefundCreate(merchantId);
  };

  addNewCashier = () => {
    const {addNewCashier, navigation} = this.props;
    const merchantId = result(navigation, 'state.params.merchantId', '');
    const terminal_id = result(navigation, 'state.params.terminal_id', '');
    const pan = result(navigation, 'state.params.pan', '');
    const isRegisterStore = this.state.isRegisterStore;
    const isRegisterTerminal = this.state.isRegisterTerminal;
    addNewCashier(isRegisterStore, isRegisterTerminal, merchantId, terminal_id, pan);
  }

  getRefundCodeState = () => {
    const {navigation, getRefundCode} = this.props;
    const merchantId = result(navigation, 'state.params.merchantId', '');
    getRefundCode(merchantId);
  }

  render () {
    
    const {navigation} = this.props;
    const data = result(navigation, 'state.params.terminalList', []);
    const merchantId = result(navigation, 'state.params.merchantId', '');
    const store_label = result(navigation, 'state.params.store_label', '');
    const city = result(navigation, 'state.params.city', '');
    const postal_code = result(navigation, 'state.params.postal_code', '');
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled' extraHeight={120} style={styles.bgGrey}>
          <Text style={styles.titleStyle}>{language.QR_GPN__OUTLET_LIST}</Text>
          { data.length === 0 ?
            <View style={styles.bgWhite2}>
              <View style={styles.merchantContainer}>
                <View style={styles.iconContainerImage}>
                  <Image source={storeIcon} style={styles.iconSize}/>
                </View>
                <View style={styles.nameContainer} >
                  <Text style={styles.merchantText3}>{store_label}</Text>
                  <Text style={styles.subText3}>{city}, {postal_code}</Text>
                  <Text style={styles.merchantText4}>{language.QR_GPN__STORE_ID}</Text>
                  <Text style={styles.subText3}>{merchantId}</Text>
                </View>
              </View>
              <View style={styles.buttonsContainer}>
                <Touchable onPress={this.getRefundCodeState}>
                  <View style={styles.buttonCont}>
                    <Text style={styles.buttonText}>{language.QR_GPN__REFUND_TRANSACTION}</Text>
                  </View>
                </Touchable>
                <Touchable onPress={this.goMerchantDetail}>
                  <View style={styles.buttonCont}>
                    <Text style={styles.buttonText}>{language.QR_GPN__OUTLET_DETAIL}</Text>
                  </View>
                </Touchable>
              </View>
            </View>
            :
            <View>
              <View style={styles.bgWhite2}>
                <View style={styles.merchantContainer}>
                  <View style={styles.iconContainerImage}>
                    <Image source={storeIcon} style={styles.iconSize}/>
                  </View>
                  <View style={styles.nameContainer} >
                    <Text style={styles.merchantText3}>{store_label}</Text>
                    <Text style={styles.subText3}>{city}, {postal_code}</Text>
                    <Text style={styles.merchantText4}>{language.QR_GPN__STORE_ID}</Text>
                    <Text style={styles.subText3}>{merchantId}</Text>
                  </View>
                </View>
                <View style={styles.buttonsContainer}>
                  <Touchable onPress={this.getRefundCodeState}>
                    <View style={styles.buttonCont}>
                      <Text style={styles.buttonText}>{language.QR_GPN__REFUND_TRANSACTION}</Text>
                    </View>
                  </Touchable>
                  <Touchable onPress={this.goMerchantDetail}>
                    <View style={styles.buttonCont}>
                      <Text style={styles.buttonText}>{language.QR_GPN__OUTLET_DETAIL}</Text>
                    </View>
                  </Touchable>
                </View>
              </View>
              <View style={styles.cashierListCont}>
                <Text style={styles.titleStyle}>{language.QR_GPN__CASHIER_LIST}</Text>
              </View>
              <View>
                <FlatList enableEmptySections data={data} renderItem={this.renderListItem} removeClippedSubviews={false}/>
              </View>
            </View>
          }
        </ScrollView>

        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={this.addNewCashier} text={language.QR_GPN__MERCHANT_NEW_REGIST_07} />
        </View>
      </View>
    );
  }
}


export default QRMerchantTerminal;
