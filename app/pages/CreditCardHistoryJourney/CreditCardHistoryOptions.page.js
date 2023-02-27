import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import CreditCardHistoryOptions from '../../components/CreditCardHistoryJourney/CreditCardHistoryOptions.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {validateRequiredFields} from '../../utils/validator.util';
import {getCcHistoryUrl} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import {Linking} from 'react-native';
// import AesCrypto from '@figureai/react-native-aes-kit';

const formConfig = {
  form: 'ccHistoryOptions',
  onSubmit: (values, dispatch, {iPass, lang, navigation}) => {
    const navParams = result(navigation, 'state.params', {});
    const creditCardNumber = result(navParams, 'selectedAccount.accountNumber', '');
    const period = result(values, 'selectedRange.value');
    const url = getCcHistoryUrl(creditCardNumber, iPass, lang, period);
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL);
      }
    });
    // const iv = '1112131415161718';
    // const key = '0102030405060708';
    // let accNumber = '';
    // let ipassport = '';
    // AesCrypto.encrypt(creditCardNumber, key, iv).then((accNum) => {
    //   accNumber = accNum;
    //   AesCrypto.encrypt(iPass, key, iv).then((res) => {
    //     ipassport = res;
    //     const url = getCcHistoryUrl(accNumber, ipassport, lang, period);
    //     Linking.canOpenURL(url).then((supported) => {
    //       if (supported) {
    //         Linking.openURL(url);
    //       } else {
    //         Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL);
    //       }
    //     });
    //   }).catch(() => {
    //
    //   });
    // }).catch(() => {
    //
    // });
  },
  validate: (values) => ({
    ...validateRequiredFields(values, ['selectedRange']),
  }),
  destroyOnUnmount: false
};

const mapStateToProps = (state) => ({
  lang: result(state, 'currentLanguage.id', 'id'),
  iPass: result(state, 'user.ipassport', '')
});

const DecoratedCcHistoryOptions = reduxForm(formConfig)(CreditCardHistoryOptions);

class CreditCardHistoryOptionsPage extends Component {
  static propTypes = {
    formValues: PropTypes.object,
    navigation: PropTypes.object,
    lang: PropTypes.string,
    iPass: PropTypes.string,
  }
  rangeOptions = [ // MIGHT BE USED LATER IF THE HEADING IS SUPPOSED TO BE DIFFERENT THAN THE DROPDOWN LABEL
    {value: 'currPeriod', label: language.CREDIT_CARD__CURRENT_STATEMENT},
    {value: 'prevPeriod', label: language.CREDIT_CARD__1_CYCLE_AGO},
    {value: 'prev2Period', label: language.CREDIT_CARD__2_CYCLE_AGO},
    {value: 'prev3Period', label: language.CREDIT_CARD__3_CYCLE_AGO},
    {value: 'prev4Period', label: language.CREDIT_CARD__4_CYCLE_AGO},
    {value: 'prev5Period', label: language.CREDIT_CARD__5_CYCLE_AGO},
  ]
  render () {
    const {navigation, lang, iPass} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return <DecoratedCcHistoryOptions rangeOptions={this.rangeOptions} lang={lang}
      iPass={iPass} navigation={navigation} {...navParams}/>;
  }
}


export default connect(mapStateToProps)(CreditCardHistoryOptionsPage);
