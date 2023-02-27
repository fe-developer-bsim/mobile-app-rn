import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CreditCardManageInput from '../../components/CreditCardManageJourney/CreditCardManageInput.component';
import {reduxForm, change} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {validateRequiredFields, validateDateFormat, validateName, isInRange} from '../../utils/validator.util';
import result from 'lodash/result';
import {language} from '../../config/language';
import {connect} from 'react-redux';

const formConfig = {
  form: 'CreditCardManageInputForm',
  validate: (values, {data}) => {
    const menu = result(data, 'label');
    const valValue = menu === 'ChangeLimit' ? {
      limit: isInRange(1000, 10000000000, values.limit),
      ...validateRequiredFields(values, ['creditCardName', 'creditCardBirth', 'limit'])
    } : {
      ...validateRequiredFields(values, ['creditCardName', 'creditCardBirth', 'status'])
    };
    return {
      creditCardName: validateName(values.creditCardName),
      creditCardBirth: validateDateFormat(values.creditCardBirth),
      ...valValue
    };
  },
  initialValues: {
    creditCardName: '',
    creditCardBirth: '',
    limit: '',
    status: ''
  },
  onSubmit: (values, dispatch, {data}) => {
    dispatch(NavigationActions.navigate({routeName: 'CreditCardManageConfirmation', params: {values, data}}));
  }
};

const ConnectedForm = reduxForm(formConfig)(CreditCardManageInput);

class CreditCardManageInputPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setStatus: PropTypes.func
  }

  componentDidMount () {
    const {setStatus} = this.props;
    setStatus({
      value: 'On', label: language.CREDIT_CARD_MANAGE__CONFIRMATION_ENABLED
    });
  }

  render () {
    const {navigation} = this.props;
    const data = result(navigation, 'state.params');
    const options = [{
      value: 'On', label: language.CREDIT_CARD_MANAGE__CONFIRMATION_ENABLED
    }, {
      value: 'Off', label: language.CREDIT_CARD_MANAGE__CONFIRMATION_DISABLED
    }];
    return (
      <ConnectedForm
        data={data}
        options={options}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setStatus: (status) => {
    dispatch(change('CreditCardManageInputForm', 'status', status));
  },

});

const connectedCreditCardManage = connect(null, mapDispatchToProps)(CreditCardManageInputPage);
export default connectedCreditCardManage;
