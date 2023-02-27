import React from 'react';
import PropTypes from 'prop-types';
import SimasPoinHistory from '../../components/Egift/TabSimasPoinHistory.component.js';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {getSimasPoinHistory, inquirySimasPoin, getSimasPoinHistoryMgm, inquirySimasPoinMgm} from '../../state/thunks/common.thunks';

const mapStateToProps = (state) => {
  const simasPoinHistory = result(state, 'simasPoinHistory', []);
  return {
    simasPoinHistory,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSimasPoinHistory: () => dispatch(getSimasPoinHistory()),
  inquirySimasPoin: () => dispatch(inquirySimasPoin()),
  getSimasPoinHistoryMgm: () => dispatch(getSimasPoinHistoryMgm()),
  inquirySimasPoinMgm: () => dispatch(inquirySimasPoinMgm()),

});

class SimaspoinHistory extends React.Component {

  componentDidMount () {
    this.props.inquirySimasPoinMgm();
  }

  static propTypes = {
    simasPoinHistory: PropTypes.object,
    simasPoin: PropTypes.object,
    isLogin: PropTypes.bool,
    getSimasPoinHistoryMgm: PropTypes.func,
    inquirySimasPoinMgm: PropTypes.func,
    getSimasPoinHistory: PropTypes.func,
    inquirySimasPoin: PropTypes.func,
  }
  render () {
    const {simasPoinHistory, simasPoin, getSimasPoinHistoryMgm} = this.props;
    return <SimasPoinHistory simasPoinHistory={simasPoinHistory} simasPoin={simasPoin} getSimasPoinHistory={getSimasPoinHistoryMgm} inquirySimasPoin={inquirySimasPoinMgm}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SimaspoinHistory);
