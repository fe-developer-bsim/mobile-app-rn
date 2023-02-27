import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TravelInsuranceFormBeneficiary from '../../components/Insurance/TravelInsuranceFormBeneficiary.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {validateRequiredFields, validateCheckbox} from '../../utils/validator.util';
import {reduxForm} from 'redux-form';
import {TravelConfirm, goToTnC} from '../../state/thunks/Insurance.thunks';

const formConfig = {
  form: 'travelBeneficiary',
  destroyOnUnmount: false,
  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, ['BeneficiaryName', 'BeneficiaryRelationship', 'BeneficiaryPercentage']),
      checkTnc: validateCheckbox(result(values, 'checkTnc', false)),

    };
    return errors;
  },
  initialValues: {
    BeneficiaryName: '',
    BeneficiaryRelationship: '',
    BeneficiaryPercentage: '100',
  },
  onSubmit: (values, dispatch) => dispatch(TravelConfirm(values))

};

const DecoratedBeneficiary = reduxForm(formConfig)(TravelInsuranceFormBeneficiary);

class TravelAssuranceBeneficiary extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    planPage: PropTypes.func,
    detailPage: PropTypes.func,
    custPage: PropTypes.func,
    dataDisplay: PropTypes.object,
    goToTnc: PropTypes.func,
  }

  render () {
    const {navigation = {}, planPage, detailPage, dataDisplay, custPage, goToTnc} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return <DecoratedBeneficiary navParams={navParams} planPage={planPage} detailPage={detailPage} custPage={custPage} 
      dataDisplay={dataDisplay} goToTnc={goToTnc}/>;
  }
}

const mapStateToProps = (state) => ({
  payeeDisabled: result(state, 'form.travelBeneficiary.values.payeeNameDisabled', false),
  dataDisplay: result(state, 'insuranceDataTravel.DATATRAVEL.dataDisplay', {}),
});

const mapDispatchToProps = (dispatch) => ({
  goToTnc: (planSelect) => dispatch(goToTnC(planSelect)),
});

const ConnectedTravelDetail = connect(mapStateToProps, mapDispatchToProps)(TravelAssuranceBeneficiary);

export default ConnectedTravelDetail;
