import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ETaxPaymentTypeComponent, {fields} from '../../components/ETaxJourney/ETaxPaymentType.component';
import {connect} from 'react-redux';
import {createIDBilling, idBillingPayment} from '../../state/thunks/common.thunks';
import {isEmpty, result} from 'lodash';
import {reduxForm} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {validateRequiredFields} from '../../utils/validator.util';
import {getTransferPossibleAccountsNoEmoney} from '../../utils/transformer.util';
const formConfig = {
  form: 'EtaxPaymentType',
  destroyOnUnmount: true,
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.ID_BILLING, fields.ACC_NO])
    };
    return errors;
  },
  onSubmit: (values, dispatch, {biller}) => {
    dispatch(idBillingPayment(values, biller));
  },
};

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.EtaxPaymentType.values'),
  accounts: getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'bp'),
  jenisPajak: result(state, 'etaxInformation.jenisPajak', []),
  isLogin: !isEmpty(result(state, 'user', {})),
});

const mapDispatchToProps = (dispatch) => ({
  createIDBilling: () => dispatch(createIDBilling()),
  billerAccount: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'EtaxPaymentType', fieldName: 'accountNo', sourceType: 'etaxBiller'}})),
});

const DecoratedForm = reduxForm(formConfig)(ETaxPaymentTypeComponent);


class ETaxPaymentType extends Component {
  static propTypes = {
    createIDBilling: PropTypes.func,
    gotoPayment: PropTypes.func,
    formValues: PropTypes.object,
    accounts: PropTypes.array,
    billerAccount: PropTypes.func,
    isLogin: PropTypes.bool,
    navigation: PropTypes.object,
    jenisPajak: PropTypes.array,
  }
  
  render () {
    const {createIDBilling, gotoPayment, formValues, accounts, billerAccount, isLogin, navigation, jenisPajak} = this.props;
    const biller = result(navigation, 'state.params.biller', {});
    return (
      <DecoratedForm
        createIDBilling={createIDBilling} gotoPayment={gotoPayment} formValues={formValues} accounts={accounts}
        billerAccount={billerAccount} isLogin={isLogin} biller={biller} jenisPajak={jenisPajak}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ETaxPaymentType);