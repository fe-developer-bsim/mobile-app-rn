import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TravelDetail} from '../../state/thunks/Insurance.thunks';
import PlanTravelComponent from '../../components/Insurance/PlanTravel.component';
import result from 'lodash/result';

const mapDispatchToProps = (dispatch) => ({
  getTravelDetail: (selectPremi) => () => dispatch(TravelDetail(selectPremi)),
});

const mapStateToProps = (state) => ({
  dataDisplay: result(state, 'insuranceDataTravel.DATATRAVEL.dataDisplay', {}),
});

class InsurancePage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    getTravelDetail: PropTypes.func,
    dataDisplay: PropTypes.object,
  }
  state = {
    isDisabled: true
  }

  render () {
    const {getTravelDetail, navigation = [], dataDisplay} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return (
      <PlanTravelComponent getTravelDetail = {getTravelDetail} {...navigation} navParams={navParams} isDisabled={this.state.isDisabled} dataDisplay={dataDisplay}/>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(InsurancePage);
