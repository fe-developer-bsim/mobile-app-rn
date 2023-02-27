import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import EmailVerification, {fields} from '../../components/EmailVerification/EmailVerification.component';
import {validateRequiredFields, validateEmail} from '../../utils/validator.util';
import {verifyEmail} from '../../state/thunks/emailVerification.thunks';
import result from 'lodash/result';

const formConfig = {
  form: fields.formName,
  destroyOnUnmount: false,
  initialValues: {
    [fields.sourceAccount]: {},
  },
  validate: (values) => ({
    ...validateRequiredFields(values, [fields.email]), 
    [`${fields.email}`]: validateEmail(values[fields.email]),
  }),
  onSubmit: (values, dispatch, {navParams = {}, transactionId}) => {
    dispatch(verifyEmail(values[fields.email], navParams, transactionId));
  }
};

const DecoratedEmailVerification = reduxForm(formConfig)(EmailVerification);

class EmailVerificationPage extends Component {
  static propTypes = {
    params: PropTypes.object,
    navigation: PropTypes.object,
    transactionId: PropTypes.string,
  }

  render () {
    const {navigation = {}, params = {}, transactionId = ''} = this.props;
    const navParams =  result(navigation, 'state.params', {});
    const transId = transactionId ? transactionId : result(navParams, 'transactionId', '');
    return (
      <DecoratedEmailVerification navParams={{...navParams, ...params}} transactionId={transId}/>
    );
  }
}

export default EmailVerificationPage;