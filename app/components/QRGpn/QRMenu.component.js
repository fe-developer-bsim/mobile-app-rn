import {View, Text, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRMenu.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import businessIcon from '../../assets/images/business-icon.png';

class QRMenu extends React.Component {
  getDetailMerchantState = () => this.props.getDetailMerchant(this.props.merchant_id, this.props.merchant_name, this.props.merchant_criteria, this.props.merchant_status);
  getMerchantInquiryState = () => this.props.getMerchantInquiry(this.props.merchant_id);

  static propTypes = {
    isMerchantAccount: PropTypes.array,
    merchant_id: PropTypes.string,
    merchant_name: PropTypes.string,
    merchant_criteria: PropTypes.string,
    getMerchantTerminal: PropTypes.func,
    getDetailMerchant: PropTypes.func,
    getMerchantInquiry: PropTypes.func,
    getRefundCode: PropTypes.func,
    merchant_status: PropTypes.string,
  }

  render () {
    const {merchant_id, merchant_name} = this.props;
    const checkMerchant = merchant_id.substring(0, 4);
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120} style={styles.container}>
        { checkMerchant === 'REFF' ?
          <View style={styles.bgWhiteList}>
            <Touchable onPress={this.getMerchantInquiryState}>
              <View style={styles.row}>
                <View>
                  <Text style={styles.merchantText3}>{merchant_name}</Text>
                  <Text style={styles.subText3}>{merchant_id}</Text>
                </View>
                <View style={styles.waitContainer}>
                  <SimasIcon name={'waiting'} size={30} style={styles.waitIcon}/>
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
                    <Image source={businessIcon} style={styles.iconSize}/>
                  </View>
                  <View style={styles.nameContainer} >
                    <Text style={styles.merchantText3}>{merchant_name}</Text>
                  </View>
                </View>
            
                <View style={styles.storeListCont}>
                  <Touchable onPress={this.getDetailMerchantState}>
                    <Text style={styles.storeListText}>{language.QR_GPN__OUTLET_LIST}</Text>
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
