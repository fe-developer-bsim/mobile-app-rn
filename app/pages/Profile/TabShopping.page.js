import React from 'react';
import PropTypes from 'prop-types';
import TabShopping from '../../components/Egift/TabShopping.component.js';
import {connect} from 'react-redux';
import noop from 'lodash/noop';
import {getShoppingList, goToDetail, getEgiftPage} from '../../state/thunks/common.thunks';
import result from 'lodash/result';


const mapStateToProps = (state) => {
  const orderData = result(state, 'myDataOrder', []);
  const detail = result(state, 'myDataOrder.0.voucher.url', []);
  const maximumNumberOfEachPage = result(state, 'config.ECommerceConfig.maximumNumberOfEachPage');
  return {
    user: result(state, 'user.profile'),
    orderData,
    detail,
    egiftList: state.egiftList,
    maximumNumberOfEachPage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  goToDetail: (items) => dispatch(goToDetail(items)),
  getShoppingList: (category) => dispatch(getShoppingList(category)),
  getEgiftPage: (pageList, category) => dispatch(getEgiftPage(pageList, category)),
});

class ShopPagee extends React.Component {


  componentDidMount () {
    const {navigation} = this.props;
    const category = result(navigation, 'state.params.category', '');
    this.props.getShoppingList(category);
  }

  static propTypes = {
    orderData: PropTypes.array,
    changeTab: PropTypes.func,
    getDataList: PropTypes.func,
    onOrderDetail: PropTypes.func,
    egiftList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    goToDetail: PropTypes.func,
    getShoppingList: PropTypes.func,
    getEgiftPage: PropTypes.func,
    navigation: PropTypes.object,
    maximumNumberOfEachPage: PropTypes.string,
  }

  goToDetail = (product) => () => {
    this.props.goToDetail(product);
  }

  render () {
    const {getDataList = noop, orderData = [], onOrderDetail = noop, egiftList, getShoppingList, getEgiftPage, navigation, maximumNumberOfEachPage} = this.props;
    const category = result(navigation, 'state.params.category', '');
    return <TabShopping getDataList={getDataList} changeTab={this.changeTab} orderData={orderData} onOrderDetail={onOrderDetail}
      egiftList={egiftList} goToDetail={this.goToDetail} getShoppingList={getShoppingList} getEgiftPage={getEgiftPage} category={category} maximumNumberOfEachPage={maximumNumberOfEachPage}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopPagee);
