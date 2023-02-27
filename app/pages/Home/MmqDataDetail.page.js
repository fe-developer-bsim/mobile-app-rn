import React from 'react';
import PropTypes from 'prop-types';
import MMQdetail from '../../components/Home/MmqDataDetail.component.js';
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

class MmqDataDetail extends React.Component {

  static propTypes = {
    simasPoinHistory: PropTypes.object,
    simasPoin: PropTypes.object,
    getSimasPoinHistory: PropTypes.func,
    inquirySimasPoin: PropTypes.func,
    navigation: PropTypes.object,
  }
  render () {
    const {navigation} = this.props;
    const data = result(navigation, 'state.params', {});
    return <MMQdetail navigation={navigation} data={data} />;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MmqDataDetail);
