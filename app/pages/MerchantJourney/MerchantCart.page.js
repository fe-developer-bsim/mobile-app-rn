import React from 'react';
import PropTypes from 'prop-types';
import Cart from '../../components/MerchantJourney/MerchantCart.component';
import result from 'lodash/result';
import sortBy from 'lodash/sortBy';
import {
  addToCartMerchant,
  minusToCart,
  dropFromCart,
  goToLogin,
  getPurchaseOrderAlfa,
} from '../../state/thunks/digitalStore.thunks';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';

class ProductDetailPage extends React.Component {
  static propTypes = {
    egiftCart: PropTypes.array,
    addQuantity: PropTypes.func,
    minusQuantity: PropTypes.func,
    dropFromCart: PropTypes.func,
    goToLanding: PropTypes.func,
    goToLogin: PropTypes.func,
    simasPoin: PropTypes.object,
    EStorePurchaseLimit: PropTypes.number,
    getPurchaseOrder: PropTypes.func,
  };

  goaddQuantity = values => () => {
    const {addQuantity} = this.props;
    addQuantity(values);
  };

  render() {
    const {
      egiftCart,
      minusQuantity,
      dropFromCart,
      EStorePurchaseLimit,
      goToLanding,
      goToLogin,
      simasPoin,
    } = this.props;
    const sortedList = sortBy(egiftCart, 'itemName');
    return (
      <Cart
        egiftCart={sortedList}
        addQuantity={this.goaddQuantity}
        minusQuantity={minusQuantity}
        dropFromCart={dropFromCart}
        goToLanding={goToLanding}
        goToLogin={goToLogin}
        simasPoin={simasPoin}
        EStorePurchaseLimit={EStorePurchaseLimit}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addQuantity: quantity => {
    dispatch(addToCartMerchant(quantity));
  },
  minusQuantity: product => () => {
    dispatch(minusToCart(product));
  },
  dropFromCart: product => () => {
    dispatch(dropFromCart(product));
  },
  goToLanding: () => {
    dispatch(
      StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'Landing'}),
          NavigationActions.navigate({routeName: 'MerchantDashboard'}),
        ],
      }),
    );
  },
  goToLogin: () => {
    dispatch(goToLogin());
  },
  getPurchaseOrder: () => {
    dispatch(getPurchaseOrderAlfa());
  },
});

const mapStateToProps = state => ({
  egiftCart: result(state, 'merchantCart', []),
  simasPoin: result(state, 'simasPoin', {}),
  EStorePurchaseLimit: result(state, 'config.flag.EStorePurchaseLimit', 0),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
