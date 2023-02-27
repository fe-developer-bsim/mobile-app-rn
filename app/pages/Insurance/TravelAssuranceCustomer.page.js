import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TravelAssuranceCustomerComponent from '../../components/Insurance/TravelInsuranceCustomer.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {TravelBeneficiary, addSize, editDetail, deleteParty} from '../../state/thunks/Insurance.thunks';
import map from 'lodash/map';

class TravelAssuranceCustomer extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    planPage: PropTypes.func,
    detailPage: PropTypes.func,
    addPartySize: PropTypes.func,
    party: PropTypes.object,
    editDetail: PropTypes.func,
    ageRange: PropTypes.string,
    displayFormat: PropTypes.object,
    hiddenDisplay: PropTypes.object,
    handleSubmit: PropTypes.func,
    deleteParty: PropTypes.func,
    dataDisplay: PropTypes.object,
    isFilled: PropTypes.bool,
  }

  isFilled = (party) => {
    let isFilled = true;
    map(party, (object, key) => {
      isFilled = (key === 'Insured' || !isNaN(parseInt(key))) ? isFilled && object.isFilled : isFilled;
    });
    return isFilled;
  }

  showWarning = (tooFew, handleSubmit, showModal) =>   tooFew ? showModal() : handleSubmit()
  render () {
    const {navigation = {}, addPartySize, party, editDetail, handleSubmit, deleteParty, dataDisplay} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const isFull = (party.size >= party.maxSize);
    const isFilled = this.isFilled(party);
    const tooFew = party.size < party.minSize;
    return <TravelAssuranceCustomerComponent navParams={navParams} addPartySize={addPartySize} party={party} editDetail={editDetail} 
      dataDisplay={dataDisplay} isFull={isFull} handleSubmit={handleSubmit} deleteParty={deleteParty} isFilled={isFilled} tooFew={tooFew}
      showWarning={this.showWarning}/>;
  }
}

const mapStateToProps = (state) => ({
  party: result(state, 'insuranceAddParty', {}),
  dataDisplay: result(state, 'insuranceDataTravel.DATATRAVEL.dataDisplay', {}),
  payeeDisabled: result(state, 'form.travelCustomer.values.payeeNameDisabled', false),
});

const mapDispatchToProps = (dispatch) => ({
  addPartySize: () => dispatch(addSize()),
  editDetail: (index) => dispatch(editDetail(index)),
  handleSubmit: () => dispatch(TravelBeneficiary()),
  deleteParty: (index) => dispatch(deleteParty(index)),
});

const ConnectedTravelDetail = connect(mapStateToProps, mapDispatchToProps)(TravelAssuranceCustomer);

export default ConnectedTravelDetail;
