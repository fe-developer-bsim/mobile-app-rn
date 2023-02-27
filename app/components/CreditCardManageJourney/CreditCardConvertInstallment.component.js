import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView, Image} from 'react-native';
import styles from './CreditCardConvertInstallment.style';
import noop from 'lodash/noop';
import {SinarmasButton, RadioButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {Toast} from '../../utils/RNHelpers.util';
import paylaterbg from '../../assets/images/paylaterbg.png';
import paylaterheader from '../../assets/images/paylaterheader.png';



class CreditCardConvertInstallment extends Component {

  static propTypes = {
    selectedAccount: PropTypes.object,
    CCtransaction: PropTypes.array,
    toSetInstallment: PropTypes.func,
    formValues: PropTypes.object,
  }

  state = {
    buttonDisabled: true,
  }

  enableButton = () => {
    this.setState({buttonDisabled: false});
  }

  toastDisable = () => {
    Toast.show(language.DASHBOARD__CREDIT_CARD_TOAST_KOLEK_2);
  }

  render () {
    const {CCtransaction = [], toSetInstallment = noop, selectedAccount} = this.props;
    const cardStatus = result(selectedAccount, 'cardStatus', '');
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image source={paylaterheader} style={styles.imagestyleimg} />
          <View style={styles.top}>
            {isEmpty(CCtransaction) ?
              <Text style={styles.noText}>{language.DASHBOARD__NOTHING_TO_SHOW}</Text>
              :
              <View>
                <Text style={styles.noText2}>{language.DASHBOARD__CREDIT_CARD_PAYLATER_DESC}</Text>
                <View style={styles.row1}>
                  <View style={{marginRight: 10, paddingTop: 10}}>
                    <Image source={paylaterbg} style={styles.imagestyleimg2} />
                  </View>
                  <Text style={styles.noText2}>{language.DASHBOARD__CREDIT_CARD_PAYLATER_DESC_2}</Text>
                </View>

                <View style={styles.containerBox}>
                  <View style={styles.containerLeft}>
                    <View style={styles.containerLeftItem}>
                      <ScrollView nestedScrollEnabled={true} style={{flexGrow: 0}}>
                        <Field name='transaction' component={RadioButton} options={CCtransaction} renderCC={true} onChange={this.enableButton}/>
                      </ScrollView>
                    </View>
                  </View>
                </View>
              </View> }
          </View>
        </ScrollView>


        <View style={styles.bottomButton}>
          <SinarmasButton disabled={this.state.buttonDisabled} onPress={cardStatus === '4' ? this.toastDisable : toSetInstallment} text={language.GENERIC__CONTINUE} />
        </View>

      </View>
    );
  }
}

export default CreditCardConvertInstallment;
