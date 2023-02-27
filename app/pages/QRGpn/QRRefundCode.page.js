import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QRRefundCode from '../../components/QRGpn/QRRefundCode.component';
import {goToRefundCreate, goToRefundInfo} from '../../state/thunks/QRGpn.thunks';

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  getRefundCreate: (merchantId) => dispatch(goToRefundCreate(merchantId)), 
  goToRefundInfo: (value) => dispatch(goToRefundInfo(value)),    
});

class QRRefundCodePage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    getRefundCreate: PropTypes.func,
    goToRefundInfo: PropTypes.func,
  };

  render () {
    const {navigation, dispatch, getRefundCreate, goToRefundInfo} = this.props;
    return <QRRefundCode navigation={navigation} dispatch={dispatch} getRefundCreate={getRefundCreate} goToRefundInfo={goToRefundInfo}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRRefundCodePage);
