import React from 'react';
import PropTypes from 'prop-types';
import MobileTopupForm from '../../components/MobileTopupJourney/MobileTopupForm.component';
import {validateRequiredFields, validateMobile} from '../../utils/validator.util';
import {reduxForm, change} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import {getFilteredBillerData, getBillerForMobile} from '../../utils/transformer.util';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';

const formConfig = {
  form: 'MobileTopupForm',
  destroyOnUnmount: false,
  validate: (values, {selectedBiller = {}}) => {
    const mobileValidation = selectedBiller.validation;
    const errors = {
      mobileNo: validateMobile(values.mobileNo, mobileValidation),
      ...validateRequiredFields(values, ['topupAmount', 'mobileNo'])
    };
    return errors;
  },
  initialValues: {
    myAccount: {},
    topupAmount: {},
    mobileNo: ''
  }
};

const DecoratedMobileTopupForm = reduxForm(formConfig)(MobileTopupForm);

class MobileTopupFormPage extends React.Component {

  static propTypes = {
    goToPayment: PropTypes.func,
    clearAccountNoField: PropTypes.func,
    selectedBiller: PropTypes.object
  }

  onMobileNoChange = (selectedBiller) => () => {
    if (isEmpty(selectedBiller)) {
      this.props.clearAccountNoField();
    }
  }
  render () {
    const {selectedBiller, goToPayment} = this.props;
    return <DecoratedMobileTopupForm onMobileNoChange={this.onMobileNoChange}
      selectedBiller={selectedBiller} goToPayment={goToPayment} />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  goToPayment (biller) {
    dispatch(NavigationActions.navigate({routeName: 'MobileTopupPayment', params: {biller}}));
  },
  clearAccountNoField () {
    dispatch(change('MobileTopupForm', 'topupAmount', null));
  }
});

const mapStateToProps = (state) => {
  const {billerConfig} = state;
  const billerData = getFilteredBillerData(billerConfig, 'TOPUP');
  const mobileNo = result(state, 'form.MobileTopupForm.values.mobileNo');
  const selectedBiller = getBillerForMobile(billerData, mobileNo);
  return {selectedBiller};
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileTopupFormPage);
