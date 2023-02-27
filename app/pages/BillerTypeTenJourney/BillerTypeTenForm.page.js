import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BillerTypeTenForm from '../../components/BillerTypeTenJourney/BillerTypeTenForm.component';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import {getAmountForGenericBillerTypeTen} from '../../state/thunks/genericBill.thunks';
import {validateRequiredFields, validateSubscriberNo} from '../../utils/validator.util';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'BillerTypeTenFormForm',
  validate: (values, {navigation}) => {
    const biller = result(navigation, 'state.params.biller', {});
    const subscriberNoValidation = result(biller, 'validation', '');
    const subscriberNoText = result(biller, 'billerPreferences.paymentSubscriberNoKey', '');
    const errors = {
      subscriberNo: validateSubscriberNo(values.subscriberNo, subscriberNoValidation, subscriberNoText),
      ...validateRequiredFields(values, ['subscriberNo'])
    };
    return errors;
  },
  initialValues: {
    subscriberNo: ''
  },
  onSubmit: (values, dispatch, {navigation}) => {
    const biller = result(navigation, 'state.params.biller', {});
    dispatch(getAmountForGenericBillerTypeTen(values, biller));
  }
};

const mapStateToProps = ({state, user, form}) => ({
  transRefNum: result(state, 'transRefNum', 0), 
  user,
  formDataBillerTen: result(form, 'BillerTypeTenFormForm', {})
});

const mapDispatchToProps = (dispatch) => ({
  setSubsNo: (subscriberNo) => dispatch(change('BillerTypeTenFormForm', 'subscriberNo', subscriberNo)),
  pickAreaName: (areaList) => () => dispatch(NavigationActions.navigate({routeName: 'BillerTypeTeSearchAreaName', params: {areaList}}))
});

const BillerTypeTenFormForm = reduxForm(formConfig)(BillerTypeTenForm);

class BillerTypeTenFormPage extends Component {
  static propTypes = {
    billers: PropTypes.array,
    updateRecentTransactions: PropTypes.func,
    setSubsNo: PropTypes.func,
    navigation: PropTypes.object,
    formDataBillerTen: PropTypes.object,
    pickAreaName: PropTypes.func
  }

  componentDidMount () {
    const {setSubsNo, navigation} = this.props;
    const values = result(navigation, 'state.params.values', {});
    setSubsNo(result(values, 'subscriberNo', ''));
  }
  
  render () {
    const {navigation, formDataBillerTen, pickAreaName, ...extraProps} = this.props;
    return <BillerTypeTenFormForm navigation={navigation} pickAreaName={pickAreaName} formDataBillerTen={formDataBillerTen} {...extraProps}/>;
  }
}

const ConnectedBillerTypeTenFormPage = connect(mapStateToProps, mapDispatchToProps)(BillerTypeTenFormPage);
export default ConnectedBillerTypeTenFormPage;
