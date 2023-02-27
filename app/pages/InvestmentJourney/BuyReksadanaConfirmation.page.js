import React from 'react';
import PropTypes from 'prop-types';
import BuyReksadana from '../../components/InvestmentJourney/BuyReksadanaConfirmation.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {medalionTriggerAuthNavigate, medalionConvertUSDTriggerAuthNavigate} from '../../state/thunks/common.thunks';
import {subscriptionReksadana} from '../../state/thunks/dashboard.thunks';

const formConfig = {
  form: 'buyReksadana',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {doSubscription, triggerAuth, formValues, currencyMedalion, convertUsd}) => {
 
    const currency = result(currencyMedalion, '0.Fund_Currency');
    const params = {onSubmit: doSubscription, amount: formValues.amount, currency};
    if (currency === 'USD') {
      convertUsd(formValues.amount, params);
  
    } else {
      triggerAuth(formValues.amount, params);
    }
  }
};

const DecoratedReksadana = reduxForm(formConfig)(BuyReksadana);

const mapStateToProps = (state) => ({ 
  currentLanguage: result(state, 'currentLanguage.id', 'id')  
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(medalionTriggerAuthNavigate('reksadana', amount, false, 'AuthDashboard', params)),
  subscription: (formValues, item) => dispatch(subscriptionReksadana(formValues, item)),
  convertUsd: (amount, params) => dispatch(medalionConvertUSDTriggerAuthNavigate(amount, params))
});

class BuyReksadanaform extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    subscription: PropTypes.func,
    currentLanguage: PropTypes.string,
    convertUsd: PropTypes.func,     
  }

  doSubscription = () => {
    const {subscription, navigation} = this.props;
    const formValues = result(navigation, 'state.params.formValues', {});
    const item = result(navigation, 'state.params.item', {});
    subscription(formValues, item);
  }

  render () {
    const {navigation, triggerAuth, currentLanguage, convertUsd} = this.props;
    const formValues = result(navigation, 'state.params.formValues', {});
    const item = result(navigation, 'state.params.item', {});
    const currencyMedalion = result(item, 'detailPortfolio.portfolio', {});

    return (
      <DecoratedReksadana doSubscription={this.doSubscription} triggerAuth={triggerAuth} formValues={formValues} item={item} currentLanguage={currentLanguage} currencyMedalion={currencyMedalion}
        convertUsd={convertUsd}/>
    );
  }
}


const connectedTransfer = connect(mapStateToProps, mapDispatchToProps)(BuyReksadanaform);
export default connectedTransfer;
