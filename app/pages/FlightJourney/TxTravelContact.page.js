import React from 'react';
import PropTypes from 'prop-types';
import TxTravelContact from '../../components/FlightJourney/TxTravelContact.component';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {txTravelDetailList} from '../../state/thunks/flight.thunks';
import {validateRequiredFields} from '../../utils/validator.util';

const txTravelContactDetail = {
  form: 'txTravelContactDetail',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => dispatch(txTravelDetailList()),
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, ['firstName', 'lastName', 'phone', 'email']),
    };
    return {
      ...errors
    };
  },
  initialValues: {
    template: true
  }
};

const DecoratedTxTravelContact = reduxForm(txTravelContactDetail)(TxTravelContact);

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

class OffersDetailPage extends React.Component {
  static propTypes = {
    onOfferClick: PropTypes.func,
    navigation: PropTypes.object,
  }

  render () {
    const {navigation = {}} = this.props;
    return <DecoratedTxTravelContact navigation={navigation}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OffersDetailPage);
