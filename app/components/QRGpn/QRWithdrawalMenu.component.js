import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRMerchantDetail.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';

class QRMerchantDetail extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    QRCustomerS: PropTypes.func,
    WithdrawalForOther: PropTypes.func,
  }

  WithdrawalForMe = () => {
    const {QRCustomerS} = this.props;
    QRCustomerS(4);
  }

  WithdrawalForOther = () => {
    const {WithdrawalForOther} = this.props;
    WithdrawalForOther(3);
  }

  render () {
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <View>
          <View style={styles.merchantContainer}>
            <View>
              <Text>{language.QR_GPN__CARDLESS_CHOOSE}</Text>
            </View>
            <View>
              <SinarmasButton onPress={this.WithdrawalForMe} text={language.QR_GPN__CARDLESS_FORME} />
            </View>
            <View>
              <SinarmasButton onPress={this.WithdrawalForOther} text={language.QR_GPN__CARDLESS_FOROTHER}/>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}


export default QRMerchantDetail;
