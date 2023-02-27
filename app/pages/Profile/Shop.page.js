import React from 'react';
import PropTypes from 'prop-types';
import ShopPage from '../../components/Egift/TabShop.component.js';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import noop from 'lodash/noop';
import {deleteVoucher, getDataOrder, moveVoucher} from '../../state/thunks/common.thunks';
import result from 'lodash/result';


const mapStateToProps = (state) => {
  const orderData = result(state, 'myDataOrder', []);
  const detail = result(state, 'myDataOrder.0.voucher.url', []);
  const expiredRangeConfig = result(state, 'config.valueExpiredDayRange', '');
  return {
    user: result(state, 'user.profile'),
    orderData,
    detail,
    egiftList: state.egiftList,
    expiredRangeConfig,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDataList: () => dispatch(getDataOrder()),
  onOrderDetail: (detail) => () => {
    dispatch(NavigationActions.navigate({routeName: 'DetailOrder', params: {detail}}));
  },
  goToDetail: (product) => {
    dispatch(NavigationActions.navigate({routeName: 'ShopProductDetail', params: {product}}));
  },
  goToEvoucherDetail: (data) => () => {
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipEvoucherDetailPage', params: {data}}));
  },
  moveVoucher: (orderNumber, voucherId) => {
    dispatch(moveVoucher(orderNumber, voucherId));
  },
  deleteVoucher: (orderNumber, voucherId) => {
    dispatch(deleteVoucher(orderNumber, voucherId));
  },
});

class ShopPagee extends React.Component {

  componentWillMount () {
    this.props.getDataList();
  }

  static propTypes = {
    orderData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    changeTab: PropTypes.func,
    getDataList: PropTypes.func,
    onOrderDetail: PropTypes.func,
    egiftList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    goToDetail: PropTypes.func,
    getEgiftList: PropTypes.func,
    inquirySimasPoin: PropTypes.func,
    goToEvoucherDetail: PropTypes.func,
    moveVoucher: PropTypes.func,
    deleteVoucher: PropTypes.func,
    expiredRangeConfig: PropTypes.string,
  }

  goToDetail = (product) => () => {
    this.props.goToDetail(product);
  }

  render () {
    const {getDataList = noop, orderData = [], onOrderDetail = noop, egiftList, getEgiftList, goToEvoucherDetail, moveVoucher = noop, deleteVoucher = noop, expiredRangeConfig} = this.props;
    return <ShopPage getDataList={getDataList} changeTab={this.changeTab} orderData={orderData} onOrderDetail={onOrderDetail}
      egiftList={egiftList} goToDetail={this.goToDetail} getEgiftList={getEgiftList} goToEvoucherDetail={goToEvoucherDetail}
      moveVoucher={moveVoucher} deleteVoucher={deleteVoucher} expiredRangeConfig={expiredRangeConfig}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopPagee);
