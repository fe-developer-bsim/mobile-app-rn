import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './QRStoreItem.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import PropTypes from 'prop-types';
import storeIcon from '../../assets/images/store-icon.png';

class QRMenu extends React.Component {
  getTerminalList = () => this.props.getTerminalitemList(this.props.merchant_id, this.props.terminal_id, this.props.store_label, this.props.pan, this.props.username, this.props.city, this.props.postal_code, this.props.merchant_status);
  getMerchantInquiryState = () => this.props.getMerchantInquiry(this.props.merchant_id);
  getRefundCodeState = () => this.props.getRefundCode(this.props.merchant_id);

  static propTypes = {
    isMerchantAccount: PropTypes.array,
    merchant_id: PropTypes.string,
    terminal_id: PropTypes.string,
    merchant_criteria: PropTypes.string,
    getMerchantTerminal: PropTypes.func,
    getTerminalitemList: PropTypes.func,
    getMerchantInquiry: PropTypes.func,
    getRefundCode: PropTypes.func,
    store_label: PropTypes.string,
    postal_code: PropTypes.string,
    city: PropTypes.string,
    pan: PropTypes.string,
    username: PropTypes.string,
    merchant_status: PropTypes.string
  }

  render () {
    const {merchant_id, store_label, postal_code, city} = this.props;
    const checkMerchant = merchant_id.substring(0, 4);
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={100} style={styles.container}>
        { checkMerchant === 'REFF' ?
          <View style={styles.bgWhiteList}>
            <Touchable onPress={this.getMerchantInquiryState}>
              <View style={styles.row}>
                <View>
                  <Text style={styles.merchantText3}>{store_label}</Text>
                  <Text style={styles.subText3}>{city} {postal_code}</Text>
                  <Text style={styles.subText3}>{merchant_id}</Text>
                </View>
                <View style={styles.iconContainerImage}>
                  <Image source={storeIcon} style={styles.iconSize}/>
                </View>
              </View>
              <View style={styles.progressContainer}>
                <View>
                  <Text style={styles.merchantText2}>{language.QR_GPN__MERCHANT_REGIST_01}</Text>
                  <Text style={styles.merchantText2}>{language.QR_GPN__MERCHANT_REGIST_02}</Text>
                </View>
              </View>
            </Touchable>
          </View>
          : checkMerchant === 'FAIL' ?
            null
            : checkMerchant !== 'REFF' ?
              <View style={styles.bgWhite2}>
                <View style={styles.merchantContainerList}>
                  <View style={styles.iconContainerImage}>
                    <Image source={storeIcon} style={styles.iconSize}/>
                  </View>
                  <View style={styles.nameContainer} >
                    <Text style={styles.merchantText3}>{store_label}</Text>
                    <Text style={styles.subText3}>{city}, {postal_code}</Text>
                    <Text style={styles.merchantText4}>{language.QR_GPN__STORE_ID}</Text>
                    <Text style={styles.subText3}>{merchant_id}</Text>
                  </View>
                </View>
                <View style={styles.storeListCont}>
                  <Touchable onPress={this.getTerminalList}>
                    <Text style={styles.storeListText}>{language.QR_GPN__CASHIER_LIST}</Text>
                  </Touchable>
                </View>
              </View>
              :
              null
        }
      </KeyboardAwareScrollView>
    );
  }
}


export default QRMenu;
