import {View, Text, FlatList, ScrollView, Image} from 'react-native';
import React from 'react';
import styles from './QRStoreList.styles';
import {language} from '../../config/language';
import result from 'lodash/result';
import {listViewComparator} from '../../utils/transformer.util';
import QRStoreItem from './QRStoreItem.component';
import {SinarmasButton} from '../FormComponents';
import PropTypes from 'prop-types';
import businessIcon from '../../assets/images/business-icon.png';

class QRMerchantTerminal extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    getMerchantDetail: PropTypes.func,
    getMerchantTerminal: PropTypes.func,
    goToTerminalRes: PropTypes.func,
    goToTerminalEdit: PropTypes.func,
    goToTerminalReset: PropTypes.func,
    dispatch: PropTypes.func,
    getRefundCreate: PropTypes.func,
    addNewStore: PropTypes.func,
    goToTerminalList: PropTypes.func,
  }
  comparator = listViewComparator

  state = {
    selectedMerchantId: '',
    pan: '',
    isRegisterStore: true,
    isRegisterTerminal: false
  }

  addNewStore = () => {
    const {addNewStore, navigation} = this.props;
    const isRegisterStore = this.state.isRegisterStore;
    const isRegisterTerminal = this.state.isRegisterTerminal;
    const merchantId = result(navigation, 'state.params.merchantId', '');
    addNewStore(isRegisterStore, isRegisterTerminal, merchantId);
  }

  renderListItemDetail = () => {
    const {goToTerminalList = {}} = this.props;
    return goToTerminalList ? goToTerminalList : {};
  }

  renderListItem = ({item}) => (<QRStoreItem {...item} getTerminalitemList={this.renderListItemDetail()} />);

  render () {
    
    const {navigation} = this.props;
    const data = result(navigation, 'state.params.terminalList', []);
    const merchant_name = result(navigation, 'state.params.merchant_name', '');
    const merchant_status = result(navigation, 'state.params.merchant_status', '');
    const checkMerchant = merchant_status.substring(0, 1);
    return (
      <View style={styles.halfWidth}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.wrapContainer} style={styles.bgGrey}>
          <View>
            <Text style={styles.titleStyle}>{language.QR_GPN__MERCHANT_LIST}</Text>
            <View style={styles.bgWhite2}>
              <View style={styles.merchantContainerList}>
                <View style={styles.iconContainerImage}>
                  <Image source={businessIcon} style={styles.iconSize}/>
                </View>  
                <View style={styles.nameContainer}>
                  <Text style={styles.titleStyleMerchant}>{merchant_name}</Text>
                </View>
              </View>
            </View>
            <View style={styles.containerMargin}>
              <Text style={styles.titleStyle}>{language.QR_GPN__OUTLET_LIST}</Text>
            </View>
            <FlatList enableEmptySections data={data} renderItem={this.renderListItem} removeClippedSubviews={false}/>
          </View>
        </ScrollView>
        {checkMerchant === '6' ?
          <View style={styles.buttonContainer}>
            <SinarmasButton disabled={true} text={language.QR_GPN__MERCHANT_NEW_REGIST_06} />
          </View>
          :
          <View style={styles.buttonContainer}>
            <SinarmasButton style={styles.addNewButton} onPress={this.addNewStore} text={language.QR_GPN__MERCHANT_NEW_REGIST_06} />
          </View>
        }
      </View>
    );
  }
}


export default QRMerchantTerminal;
