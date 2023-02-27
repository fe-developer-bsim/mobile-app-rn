import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView} from 'react-native';
import styles from './CreditCardSetInstallment.style';
import noop from 'lodash/noop';
import {SinarmasButton, SinarmasPickerBox} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import {toCCFormater} from '../../utils/transformer.util';
import result from 'lodash/result';



class CreditCardSetInstallment extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    formValues: PropTypes.object,
    toConfirmInstallment: PropTypes.func,
    formVal: PropTypes.object,
    cCperiode: PropTypes.object,
    iPeriode: PropTypes.object
  }

  render () {
    const {formValues, toConfirmInstallment = noop, cCperiode, iPeriode} = this.props;
    const amount = result(formValues, 'sublabel', 'NIL');
    const periode = result(iPeriode, 'term', '');
    const interest = result(iPeriode, 'interestRate[0]', '');
    const firstI = result(iPeriode, 'installmentAmount[0]');
    return (
      <View style={styles.halfWidth}>
        <View style={styles.halfWidth}>
          <ScrollView contentContainerStyle={{paddingBottom: 60}} style={styles.container}>
            <View style={styles.top}>
              <View style={styles.backgroundColor1}/>
              <View style={styles.containerBox}>
                <View style={styles.containerLeft}>
                  <Text style={styles.detailTitle}>{language.DASHBOARD__CREDIT_CARD_CONVERT_PERIODE}</Text>

                  <View style={styles.detail}>

                    <View style={styles.detailPicker}>
                      <Field
                        name='periode'
                        rightIcon='arrow'
                        labelText={language.DASHBOARD__CREDIT_CARD_CONVERT_POT}
                        component={SinarmasPickerBox}
                        itemList={cCperiode}
                        labelKey= 'schmeId'
                        labelName= 'term'
                        isRevamp={true}
                      />
                    </View>

                    <View style={styles.detailInside}>
                      <Text style={styles.detailText}>{language.DETAIL__AMOUNT}</Text>
                      <Text style={styles.detailText}>{'Rp ' + toCCFormater(amount)}</Text>
                    </View>
                    <View style={styles.detailInside}>
                      <Text style={styles.detailText}>{language.DASHBOARD__CREDIT_CARD_CONVERT_POT}</Text>
                      <Text style={styles.detailText}>{periode}</Text>
                    </View>
                    <View style={styles.detailInside}>
                      <Text style={styles.detailText}>{language.DASHBOARD__CREDIT_CARD_CONVERT_INTEREST}</Text>
                      <Text style={styles.detailText}>{interest + ' %'}</Text>
                    </View>
                  </View>

                  <View style={styles.detailInside}>
                    <View style={styles.greyLine}/>
                  </View>

                  <View style={styles.total}>
                    <Text style={styles.detailTitle}>{language.DASHBOARD__CREDIT_CARD_INSTALLMENT}</Text>
                    <Text style={styles.detailTitle}>{'Rp ' + toCCFormater(firstI)}</Text>
                  </View>

                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottomButton}>
            <SinarmasButton onPress={toConfirmInstallment} text={language.GENERIC__CONTINUE} />
          </View>

        </View>

      </View>
    );
  }
}

export default CreditCardSetInstallment;
