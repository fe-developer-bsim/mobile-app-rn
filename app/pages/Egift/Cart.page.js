import React from 'react';
import PropTypes from 'prop-types';
import Cart from '../../components/Egift/Cart.component.js';
import result from 'lodash/result';
import sortBy from 'lodash/sortBy';
import {addToCart, minusToCart, dropFromCart, goToLanding, goToLogin} from '../../state/thunks/egift.thunks';
import {connect} from 'react-redux';

class ProductDetailPage extends React.Component {
  static propTypes = {
    egiftCart: PropTypes.array,
    addQuantity: PropTypes.func,
    minusQuantity: PropTypes.func,
    dropFromCart: PropTypes.func,
    goToLanding: PropTypes.func,
    goToLogin: PropTypes.func,
    simasPoin: PropTypes.object,
  }
  render () {
    const {egiftCart, addQuantity, minusQuantity, dropFromCart, goToLanding, goToLogin, simasPoin} = this.props;
    const sortedList = sortBy(egiftCart, 'itemName');
    return <Cart egiftCart={sortedList} addQuantity={addQuantity} minusQuantity={minusQuantity} dropFromCart={dropFromCart}
      goToLanding={goToLanding} goToLogin={goToLogin} simasPoin={simasPoin}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  addQuantity: (product) => () => {
    dispatch(addToCart(product));
  },
  minusQuantity: (product) => () => {
    dispatch(minusToCart(product));
  },
  dropFromCart: (product) => () => {
    dispatch(dropFromCart(product));
  },
  goToLanding: () => {
    dispatch(goToLanding());
  },
  goToLogin: () => {
    dispatch(goToLogin());
  }
});

const mapStateToProps = (state) => ({
  egiftCart: result(state, 'egiftCart', []),
  simasPoin: result(state, 'simasPoin', {}),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
