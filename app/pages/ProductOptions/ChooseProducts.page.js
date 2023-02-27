import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProductsComponent from '../../components/ProductOptions/ChooseProducts.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {result, isEmpty, find, startsWith} from 'lodash';
import {getListSavingProduct} from '../../state/thunks/savingAccount.thunks';
import {getListLoanProduct} from '../../state/thunks/EForm.thunks';
import {getOffersPGOLoan} from '../../utils/transformer.util';
import {addOrder, finishOrder} from '../../state/thunks/onboarding.thunks';

const mapStateToProps = (state) => ({currentLanguage, config, user, tutorialProduct}) => ({
  currentLanguage, 
  config, 
  isLogin: !isEmpty(user),
  cifCode: result(state, 'user.profile.customer.cifCode', ''),
  accountList: result(state, 'accounts', []),
  tutorialProduct,
  privateOffers: result(state, 'privateOffers', []) 
});

const mapDispatchToProps = (dispatch) => ({
  goToCreditCard: () => dispatch(NavigationActions.navigate({routeName: 'ChooseCreditCard'})),
  goToSavingAccount: () => dispatch(getListSavingProduct()),
  goToLoan: () => dispatch(getListLoanProduct()),
  addOrder: () =>  dispatch(addOrder()),
  finishOrder: () => dispatch(finishOrder())
});

class ChooseProducts extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToCreditCard: PropTypes.func,
    goToSavingAccount: PropTypes.func,
    goToLoan: PropTypes.func,
    config: PropTypes.object,
    isLogin: PropTypes.bool,
    cifCode: PropTypes.string,
    accountList: PropTypes.array,
    tutorialProduct: PropTypes.number,
    privateOffers: PropTypes.array,
    addOrder: PropTypes.func,
    finishOrder: PropTypes.func
  }
  
  render () {
    const {goToCreditCard, goToSavingAccount, goToLoan, config, isLogin, cifCode, accountList, 
      tutorialProduct, privateOffers, addOrder, finishOrder} = this.props;
    const indigoEnabledNTB = result(config, 'flag.flagRegisterCCINTB', 'INACTIVE') === 'ACTIVE';
    const indigoEnabledETB = result(config, 'flag.flagRegisterCCIETB', 'INACTIVE') === 'ACTIVE';

    const platinumEnabledNTB = result(config, 'flag.flagRegisterCCPNTB', 'INACTIVE') === 'ACTIVE';
    const platinumEnabledETB = result(config, 'flag.flagRegisterCCPETB', 'INACTIVE') === 'ACTIVE';

    const oramiEnabledNTB = result(config, 'flag.flagRegisterCCONTB', 'INACTIVE') === 'ACTIVE';
    const oramiEnabledETB = result(config, 'flag.flagRegisterCCOETB', 'INACTIVE') === 'ACTIVE';

    const alfamartEnabledNTB = result(config, 'flag.flagRegisterCCANTB', 'INACTIVE') === 'ACTIVE';
    const alfamartEnabledETB = result(config, 'flag.flagRegisterCCAETB', 'INACTIVE') === 'ACTIVE';
    
    const creditCardEnabled = indigoEnabledNTB || indigoEnabledETB || platinumEnabledNTB || platinumEnabledETB || oramiEnabledNTB || oramiEnabledETB || alfamartEnabledNTB || alfamartEnabledETB;

    const loanMenuEnabledNTB = result(config, 'flag.loanMenuNTB', 'INACTIVE') === 'ACTIVE';
    const loanMenuEnabledETB = getOffersPGOLoan(privateOffers);

    const isEmoneyKyc = !isEmpty(find(accountList, {accountType: 'emoneyAccount'})) && !startsWith(cifCode, 'NK');
    const tutorialON = result(tutorialProduct, 'tutorialON', '');
    const order = result(tutorialProduct, 'order', '');

    return (
      <ProductsComponent
        goToCreditCard={goToCreditCard}
        goToSavingAccount={goToSavingAccount}
        config={config}
        creditCardEnabled={creditCardEnabled}
        goToLoan={goToLoan}
        loanMenuEnabledNTB={loanMenuEnabledNTB}
        loanMenuEnabledETB={loanMenuEnabledETB}
        isEmoneyKyc={isEmoneyKyc}
        isLogin={isLogin}
        tutorialON={tutorialON}
        order={order}
        addOrder={addOrder}
        privateOffers={privateOffers}
        finishOrder={finishOrder}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseProducts);