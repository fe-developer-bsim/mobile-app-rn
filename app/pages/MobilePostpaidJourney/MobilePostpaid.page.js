import React from 'react';
import PropTypes from 'prop-types';
import MobilePostpaidView from '../../components/MobilePostpaidJourney/MobilePostpaid.component';
import {language} from '../../config/language';
import {validateRequiredFields} from '../../utils/validator.util';
import {reduxForm, change} from 'redux-form';
import {getAmountForPostpaid} from '../../state/thunks/mobilePostpaid.thunks';
import {connect} from 'react-redux';
import {getFilteredBillerData, getBillerForMobile} from '../../utils/transformer.util';
import result from 'lodash/result';

const formConfig = {
  form: 'MobilePostpaidForm',
  validate: (values, props) => {
    const {postPaidBillers} = props;
    const selectedBiller = getBillerForMobile(postPaidBillers, values.mobileNo);

    const validateMobile = (val) => {
      let error = undefined;
      if (selectedBiller.validation) {
        const regex = new RegExp(selectedBiller.validation);
        error = regex.test(val) ? undefined : language.VALIDATE__VALID_MOBILE_NO; // redux form expects to return undefined if the field is valid
      } else error = language.VALIDATE__TOPUP_OPERATOR;
      return {mobileNo: error};
    };

    const errors = {...validateMobile(values.mobileNo), ...validateRequiredFields(values, ['mobileNo'])};
    return errors;
  },
  onSubmit: (values, dispatch, {postPaidBillers}) => {
    const selectedBiller = getBillerForMobile(postPaidBillers, values.mobileNo);
    return dispatch(getAmountForPostpaid(values.mobileNo, selectedBiller));
  },
  initialValues: {
    mobileNo: ''
  }
};

const mapDispatchToProps = (dispatch) => ({
  updatePostpaidForm: (mobileNo) => {
    dispatch(change('MobilePostpaidForm', 'mobileNo', mobileNo));
  }
});

const mapStateToProps = (state) => {
  const postPaidBillers = getFilteredBillerData(state.billerConfig, 'MOBILE POSTPAID');
  const recentTransactions = result(state, 'lastPostpaidPayments.recentPostpaidPayments', []);
  return {
    recentTransactions,
    postPaidBillers
  };
};

const MobilePostpaidForm = reduxForm(formConfig)(MobilePostpaidView);

class MobilePostpaidPage extends React.Component {
  static propTypes = {
    formValues: PropTypes.object,
    navigation: PropTypes.object,
    postPaidBillers: PropTypes.array,
    recentTransactions: PropTypes.array,
    handleCardClick: PropTypes.func,
    updatePostpaidForm: PropTypes.func,
  }

  handleCardClick = (transaction) => () => {
    const {mobileNo} = transaction;
    this.props.updatePostpaidForm(mobileNo);
  }
  render () {
    const {postPaidBillers, recentTransactions} = this.props;
    return (<MobilePostpaidForm handleCardClick={this.handleCardClick} postPaidBillers={postPaidBillers} recentTransactions={recentTransactions}/>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobilePostpaidPage);
