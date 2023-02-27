import React from 'react';
import PropTypes from 'prop-types';
import ProductDetail from '../../components/Egift/ProductDetail.component.js';
import result from 'lodash/result';
import filter from 'lodash/filter';
import {connect} from 'react-redux';
import {goToCart} from '../../state/thunks/egift.thunks';
import {inquirySimasPoin} from '../../state/thunks/common.thunks';

class ProductDetailPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToCart: PropTypes.func,
    egiftCart: PropTypes.array,
  }

  state = {
    quantity: 1,
    totalAmount: 0
  }

  addQuantity = () => {
    const {navigation = {}} = this.props;
    const amount = result(navigation, 'state.params.detailProduct.value', 0);
    this.setState({quantity: this.state.quantity + 1});
    this.setState({totalAmount: (this.state.quantity + 1) * amount});
  }

  minusQuantity = () => {
    const {navigation = {}} = this.props;
    const amount = result(navigation, 'state.params.detailProduct.value', 0);
    this.setState({quantity: this.state.quantity - 1});
    this.setState({totalAmount: (this.state.quantity - 1) * amount});
  }

  componentWillMount () {
    const {navigation = {}, egiftCart} = this.props;
    const quantity = filter(egiftCart, {id: result(navigation, 'state.params.detailProduct.egiftId', '')}).length || 1;
    this.setState({totalAmount: result(navigation, 'state.params.detailProduct.value', 0)});
    this.setState({quantity});
  }

  goToCart = () => {
    const {navigation, goToCart} = this.props;
    const product = result(navigation, 'state.params.detailProduct', {});
    goToCart(product, this.state.quantity);
  }

  render () {
    const {navigation} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return <ProductDetail {...navParams} addQuantity={this.addQuantity} minusQuantity={this.minusQuantity} quantity={this.state.quantity}
      totalAmount={this.state.totalAmount} goToCart={this.goToCart}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  goToCart: (product, quantity) => {
    dispatch(inquirySimasPoin({isSpiner: true}));
    dispatch(goToCart(product, quantity));
  },
});
const mapStateToProps = (state) => ({
  egiftCart: result(state, 'egiftCart', []),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
