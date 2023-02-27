import React from 'react';
import PropTypes from 'prop-types';
import SimasPoinHistory from '../../components/Egift/TabSimasPoinHistory.component.js';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {getSimasPoinHistory, inquirySimasPoin} from '../../state/thunks/common.thunks';

const mapStateToProps = (state) => {
  const simasPoinHistory = result(state, 'simasPoinHistory', []);
  return {
    simasPoinHistory
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSimasPoinHistory: () => dispatch(getSimasPoinHistory()),
  inquirySimasPoin: () => dispatch(inquirySimasPoin()),
});

class SimaspoinHistory extends React.Component {

  componentDidMount () {
    this.props.getSimasPoinHistory();
    this.props.inquirySimasPoin();
  }

  static propTypes = {
    simasPoinHistory: PropTypes.object,
    simasPoin: PropTypes.object,
    getSimasPoinHistory: PropTypes.func,
    inquirySimasPoin: PropTypes.func,
  }
  render () {
    const {simasPoinHistory, simasPoin, getSimasPoinHistory} = this.props;
    return <SimasPoinHistory simasPoinHistory={simasPoinHistory} simasPoin={simasPoin} getSimasPoinHistory={getSimasPoinHistory} inquirySimasPoin={inquirySimasPoin}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SimaspoinHistory);
