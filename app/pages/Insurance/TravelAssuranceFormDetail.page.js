import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TravelInsuranceFormDetail from '../../components/Insurance/TravelInsuranceFormDetail.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {validateRequiredFields, validateDateRange, validateTravelInsuranceReturnDate} from '../../utils/validator.util';
import {reduxForm} from 'redux-form';
import {TravelCustomer} from '../../state/thunks/Insurance.thunks';
import moment from 'moment';

const formConfig = {
  form: 'travelDetail',
  destroyOnUnmount: false,
  validate: (values, {navParams}) => {
    const durationLimit = result(navParams, 'limit', '');
    const format = 'DD/MM/YYYY';
    let errors = {
      InseptionDate: validateDateRange(values.InseptionDate, values.InseptionDateTo, false, false, format),
      InseptionDateTo: validateTravelInsuranceReturnDate(values.InseptionDateTo, values.InseptionDate, format, durationLimit),
      ...validateRequiredFields(values, ['TripReason', 'OriginatingCity', 'FurthestCity']),   
    };
    return {
      ...errors,
    };
  },
  initialValues: {
    TripReason: '',
    OriginatingCity: '',
    FurthestCity: '',
    InseptionDate: '',
    InseptionDateTo: '',
  },
  onSubmit: (values, dispatch) => (dispatch(TravelCustomer(values))),
};

const DecoratedDetail = reduxForm(formConfig)(TravelInsuranceFormDetail);

class TravelAssuranceDetail extends Component {
  static propTypes = {
    formValues: PropTypes.object,
    navigation: PropTypes.object,
    planPage: PropTypes.func,
    dataDisplay: PropTypes.object,
    isValidDate: PropTypes.bool,
  }

  checkDate = (travelDate, returnDate, format = 'DD/MM/YYYY') => moment(returnDate, format).diff(moment(travelDate, format), 'd') > 0

  render () {
    const {formValues = {}, navigation = {}, planPage, dataDisplay} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const travelDate = result(formValues, 'InseptionDate', new Date());
    const returnDate = result(formValues, 'InseptionDateTo', new Date());
    const isValidDate = this.checkDate(travelDate, returnDate);
    return <DecoratedDetail

      formValues={formValues} navParams={navParams} planPage={planPage} dataDisplay={dataDisplay} isValidDate={isValidDate}
    />;
  }
}

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.travelDetail.values', {}),
  dataDisplay: result(state, 'insuranceDataTravel.DATATRAVEL.dataDisplay', {}),
});

const ConnectedTravelDetail = connect(mapStateToProps, null)(TravelAssuranceDetail);

export default ConnectedTravelDetail;
