import React from 'react';
import PropTypes from 'prop-types';
import ValasItemComponent from '../../components/Valas/ValasItem.component.js';
import result from 'lodash/result';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {NavigationActions} from 'react-navigation';
import {getValas} from '../../state/thunks/common.thunks';
import {reduxForm} from 'redux-form';

const formConfig = {
  form: 'ValasItem'
};

const mapStateToProps = (state) => {
  const simasPoinHistory = result(state, 'simasPoinHistory', []);
  const currencyRates = result(state, 'currencyRates', []);
  return {
    simasPoinHistory,
    isLogin: !isEmpty(result(state, 'user', {})),
    currencyRates
  };
};

const mapDispatchToProps = (dispatch) => ({
  goToTransfer: () => {
    dispatch(NavigationActions.back());
    dispatch(NavigationActions.navigate({routeName: 'Send'}));

  },
  getValas: () => dispatch(getValas()),
});

const ValasItemComponents = reduxForm(formConfig)(ValasItemComponent);

class ValasItem extends React.Component {

  componentDidMount () {
    this.props.getValas();
  }

  static propTypes = {
    getValas: PropTypes.func,
    navigation: PropTypes.object,
    isLogin: PropTypes.bool,
    goToTransfer: PropTypes.func,
    currencyRates: PropTypes.array
  }
  render () {
    const {getValas, navigation, isLogin, goToTransfer, currencyRates} = this.props;
    const valasList = result(navigation, 'state.params', []);
    const isOBMPassword = result(navigation, 'state.params.isOBMPassword', false);
    return <ValasItemComponents getValas={getValas} valasList={valasList} isLogin={isLogin} goToTransfer={goToTransfer} currencyRates={currencyRates} isOBMPassword={isOBMPassword}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ValasItem);