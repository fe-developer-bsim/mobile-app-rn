import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SignCreateComponent from '../../components/OpeningAccountJourney/SignSignatureOpeningAcc.component';
import result from 'lodash/result';
import {checkingSignDocument} from '../../state/thunks/openingAccount.thunks';
import startsWith from 'lodash/startsWith';
import {NavigationActions} from 'react-navigation';

const mapStateToProps = (state) => ({
  cif: result(state, 'user.profile.customer.cifCode', ''),
  productCode: result(state, 'productCode', '')
});

const mapDispatchToProps = (dispatch) => ({
  goBackHome: (orderId) => {
    dispatch(checkingSignDocument(orderId));
  },
  goToLanding: () => {
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Landing'}),
      ]
    }));
  }
});

class SignDigiPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goBackHome: PropTypes.func,
    goToLanding: PropTypes.func,
    cif: PropTypes.string,
    productCode: PropTypes.string
  }

  goTobackHomeAndCheckDoc =() => {
    const orderId = result(this.props.navigation, 'state.params.dataActivation', '');
    this.props.goBackHome(orderId);
  }

  render () {
    const {navigation = [], goToLanding, cif, productCode} = this.props;
    const urlCreate = result(navigation, 'state.params.htmlCode', '');
    const code = result(this.props.navigation, 'state.params.dataActivation.code', '');
    const checkUrl = startsWith(urlCreate, 'http') ? {uri: urlCreate} : {html: urlCreate};
    return (
      <SignCreateComponent urlAndroid={checkUrl} urlIos={checkUrl} goBackHome={this.goTobackHomeAndCheckDoc} code={code} goToLanding={goToLanding} cif={cif} productCode={productCode}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignDigiPage);
