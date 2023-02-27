import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import QRTrfShow from '../../components/QRGpn/QRTrfShow.component';
import {QRShowForTrf} from '../../state/thunks/QRGpn.thunks';
import {validateRequiredFields} from '../../utils/validator.util';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import result from 'lodash/result';

const formConfig = {
  form: 'QRTransfer',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => dispatch(QRShowForTrf()),
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, ['accountNo', 'amount'])};
    return {
      ...errors
    };
  }
};

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.QRTransfer.values', {}),
});

const QRTrfShowForm = reduxForm(formConfig)(QRTrfShow);

class QRTrfShowPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
  };

  render () {
    const {navigation, dispatch, accounts, formValues} = this.props;
    return <QRTrfShowForm navigation={navigation} accounts={accounts} dispatch={dispatch} formValues={formValues} />;
  }
}

export default connect(mapStateToProps)(QRTrfShowPage);
