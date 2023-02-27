import {View, Text, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SourceAccountSetLimit.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import result from 'lodash/result';
import {currencyFormatter} from '../../utils/transformer.util';
import savingPay from '../../assets/images/saving-paycard.png';

class EmallAccounts extends React.Component {
  static propTypes = {
    accountNumber: PropTypes.string,
    productType: PropTypes.string,
    name: PropTypes.string,
    balances: PropTypes.object,
    getConfirmation: PropTypes.func,
    accountType: PropTypes.string,
    simasPoin: PropTypes.object,
    currency: PropTypes.func,
  }

  render () {
    const {accountNumber, productType, name, balances, getConfirmation, currency = 'IDR'} = this.props;
    const availableBalance = result(balances, 'availableBalance', '');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View>
          { productType === 'SimasPoinAccount' || productType === 'Simas Poin Account' ? 
            null
            :
            <View style={styles.bgWhite}>
              <Touchable onPress={getConfirmation}>
                <View style={styles.row}>
                  <View style={styles.iconContainer}>
                    <Image source={savingPay} style={styles.imageOffer2} />
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
                      <Text style={styles.balanceTxt}>{currency} {currencyFormatter(availableBalance)}</Text>
                    </View>
                  </View>
                  <View style={styles.arrowContainer}>
                    <SimasIcon name='arrow' style={styles.arrow} size={10}/>
                  </View>
                </View>
              </Touchable>
            </View>
          }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default EmallAccounts;
