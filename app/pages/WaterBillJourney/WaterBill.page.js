import React from 'react';
import PropTypes from 'prop-types';
import WaterBill from '../../components/WaterBillJourney/WaterBill.component';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import {validateRequiredFields, validateWaterbillConsumerNo} from '../../utils/validator.util';
import {getFilteredBillerData} from '../../utils/transformer.util';
import {enquireWaterBill as enquireWaterBillThunk} from '../../state/thunks/waterBill.thunks';
import result from 'lodash/result';

const formConfig = {
  form: 'WaterBillerSelectionForm',
  destroyOnUnmount: false,
  validate: (values, {billerName}) => {
    const requiredFields = billerName === '009937' ? ['waterBiller', 'consumerNo', 'areaCode'] : ['waterBiller', 'consumerNo'];
    return {
      consumerNo: validateWaterbillConsumerNo(values.consumerNo),
      ...validateRequiredFields(values, requiredFields)
    };
  },
  onSubmit: (values, dispatch) => {
    dispatch(enquireWaterBillThunk());
  },
  initialValues: {
    waterBiller: {},
    consumerNo: '',
    areaCode: {}
  }
};



const mapStateToProps = (state) => {
  const {billerConfig} = state;
  const billerData = getFilteredBillerData(billerConfig, 'WATER');
  const billerCode = result(state, 'form.WaterBillerSelectionForm.values.waterBiller.billerPreferences.code', '');
  const biller = result(state, 'form.WaterBillerSelectionForm.values.waterBiller', {});
  const recentTransactions = result(state, 'lastWaterPayments.recentWaterPayments', []);
  return {billerData, billerCode, recentTransactions, biller};
};

const mapDispatchToProps = (dispatch) => ({
  updateWaterBillAmount: (consumerNo, areaCode, waterBiller) => {
    dispatch(change('WaterBillerSelectionForm', 'consumerNo', consumerNo));
    if (result(waterBiller, 'billerPreferences.code', '') === '009937') {
      dispatch(change('WaterBillerSelectionForm', 'areaCode', areaCode));
    } else {
      dispatch(change('WaterBillerSelectionForm', 'areaCode', {}));
    }
    dispatch(change('WaterBillerSelectionForm', 'waterBiller', waterBiller));
  }
});
class WaterBillScreen extends React.Component {
  static propTypes = {
    updateWaterBillAmount: PropTypes.func,
    navigation: PropTypes.object,
    formValues: PropTypes.object,
  }
  handleCardClick = (transaction) => () => {
    const {consumerNo, areaCode, waterBiller} = transaction;
    this.props.updateWaterBillAmount(consumerNo, areaCode, waterBiller);
  }
  render () {

    return (
      <WaterBill {...this.props} handleCardClick={this.handleCardClick} />
    );
  }
}

const ContainerForm = reduxForm(formConfig)(WaterBillScreen);

export default connect(mapStateToProps, mapDispatchToProps)(ContainerForm);
