import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TravelInsuranceFormResult from '../../components/Insurance/TravelInsuranceFormResult.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {goHome} from '../../state/thunks/common.thunks';
import {TravelPay} from '../../state/thunks/Insurance.thunks';

const mapDispatchToProps = (dispatch) => ({
  confirmData: () => {
    dispatch(TravelPay());
  },
  backHome: () => {
    dispatch(goHome());
  }
});

class TravelInsuranceFormConfirm extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    confirmData: PropTypes.func,
    dataDisplay: PropTypes.object,
    backHome: PropTypes.func,
  }

  handleSubmit = (successStatus) => {
    const {confirmData, backHome} = this.props;
    successStatus ? confirmData() : backHome();
  }

  render () {
    const {dataDisplay, navigation = {}} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return <TravelInsuranceFormResult {...this.props} navParams={navParams} dataDisplay={dataDisplay} handleSubmit={this.handleSubmit}/>;
  }
}

export default connect(null, mapDispatchToProps)(TravelInsuranceFormConfirm);
