import {View, Text, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SendSourceAcc.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import result from 'lodash/result';
import {currencyFormatter} from '../../utils/transformer.util';
import savingPay from '../../assets/images/saving-paycard.png';
import emoney from '../../assets/images/simas-emoney.png';

class SendAccounts extends React.Component {
  static propTypes = {
    accountNumber: PropTypes.string,
    productType: PropTypes.string,
    name: PropTypes.string,
    balances: PropTypes.object,
    getConfirmation: PropTypes.func,
  }

  render () {
    const {accountNumber, productType, name, balances, getConfirmation} = this.props;
    const availableBalance = result(balances, 'availableBalance', '');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View>
          <View style={styles.bgWhite}>
            <Touchable onPress={getConfirmation}>
              <View style={styles.row}>
                <View style={styles.iconContainer}>
                  <Image source={productType === 'Emoney Account' ? emoney : savingPay} style={productType === 'Emoney Account' ? styles.imageOfferEmoney : styles.imageOffer2} />
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.pad2}>
                    <Text style={styles.accTxt2}>{accountNumber}</Text>
                  </View>
                  <View style={styles.pad2}>
                    <Text style={styles.typeTxt}>{productType}</Text>
                  </View>
                  <View style={styles.pad2}>
                    <Text style={styles.nameTxt}>{name}</Text>
                  </View>
                  <View style={styles.pad2}>
                    <Text style={styles.balanceTxt}>{language.CGV__AVAIL_BALANCE} {currencyFormatter(availableBalance)}</Text>
                  </View>
                </View>
                <View style={styles.arrowContainer}>
                  <SimasIcon name={'arrow'} size={15} style={styles.arrowIcon}/>
                </View>
              </View>
            </Touchable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default SendAccounts;
