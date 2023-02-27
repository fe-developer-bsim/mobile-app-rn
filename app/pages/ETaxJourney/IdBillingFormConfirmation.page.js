import * as actionCreators from '../../state/actions/index.actions.js';
import React, {Component} from 'react';
import {change, reduxForm} from 'redux-form';
import {createIDBilling, getIdBilling, goToLanding} from '../../state/thunks/common.thunks';
import IdBillingFormConfirmation from '../../components/ETaxJourney/IdBillingFormConfirmation.component';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {isEmptyOrNull} from '../../utils/transformer.util';
import result from 'lodash/result';

const formConfig = {
  form: 'IdBillingFormConfirmation',
  destroyOnUnmount: true,
  onSubmit: (values, dispatch, {paramsData, billingData, biller}) => {
    dispatch(getIdBilling(paramsData.dataConfirmation, billingData, biller));
  },
};

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.IdBillingFormConfirmation.values'),
  billingData: result(state, 'etaxBilling', {})

});

const mapDispatchToProps = (dispatch) => ({
  createIDBilling: () => dispatch(createIDBilling()),
  setDataConfirmation: (confirmationData) => {
    dispatch(change('IdBillingFormConfirmation', 'npwp', confirmationData.npwp));
    dispatch(change('IdBillingFormConfirmation', 'nama', confirmationData.taxName));
    dispatch(change('IdBillingFormConfirmation', 'alamat', confirmationData.taxAddress));
    dispatch(change('IdBillingFormConfirmation', 'nop', confirmationData.nopNumber));
    dispatch(change('IdBillingFormConfirmation', 'jenisPajak', confirmationData.taxType));
    dispatch(change('IdBillingFormConfirmation', 'jenisSetoran', confirmationData.depositType));
    dispatch(change('IdBillingFormConfirmation', 'dateStart', confirmationData.fromDate));
    dispatch(change('IdBillingFormConfirmation', 'dateEnd', confirmationData.endDate));
    dispatch(change('IdBillingFormConfirmation', 'tahunPajak', confirmationData.taxYear));
    dispatch(change('IdBillingFormConfirmation', 'nomorKetetapan', confirmationData.regularityNumber));
    dispatch(change('IdBillingFormConfirmation', 'jumlahSetor', confirmationData.amount));
    dispatch(change('IdBillingFormConfirmation', 'terbilang', confirmationData.amountText));
    dispatch(change('IdBillingFormConfirmation', 'berita', confirmationData.notes));
  },
  clearBillingData: () => dispatch(actionCreators.clearBillingData()),
  goHome: () => dispatch(goToLanding())
});



const DecoratedForm = reduxForm(formConfig)(IdBillingFormConfirmation);

class IdBillingForm extends Component {
  static propTypes = {
    createIDBilling: PropTypes.func,
    formValues: PropTypes.object,
    navigation: PropTypes.object,
    setDataConfirmation: PropTypes.func,
    billingData: PropTypes.object,
    dispatch: PropTypes.func,
    clearBillingData: PropTypes.func,
    goHome: PropTypes.func
  }
  
  componentWillMount () {
    const {navigation, setDataConfirmation} = this.props;
    const confirmationData = result(navigation, 'state.params.dataConfirmation', {});
    if (confirmationData) {
      setDataConfirmation(confirmationData);
    }
  }

  componentWillUnmount = () => {
    const {clearBillingData, billingData} = this.props;
    if (!isEmptyOrNull(billingData)) {
      clearBillingData();

    }
  }

  render () {
    const {createIDBilling, formValues, billingData, goHome, navigation} = this.props;
    const biller = result(navigation, 'state.params.biller', {});
    const paramsData = result(navigation, 'state.params', {});
    return (
      <DecoratedForm
        billingData={billingData}
        createIDBilling={createIDBilling}
        formValues={formValues}
        goHome={goHome}
        biller={biller}
        paramsData={paramsData}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdBillingForm);