import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EmoneySuccessRegistrationComp from '../../components/DigitalAccountOpening/EmoneySuccessRegistration.component';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';
import {result} from 'lodash';
import {getCurrentSection} from '../../state/thunks/digitalAccountOpening.thunks';
import {saveNewOnboarding} from '../../state/actions/index.actions';
import {Platform} from 'react-native';
let adjustAndroid;

if (Platform.OS === 'android') {
  adjustAndroid = require('react-native-adjust');
}

const mapStateToProps = state => ({
  productCode: result(state, 'productCode', ''),
  creditCardType: result(state, 'productData.creditCardType', ''),
  newSavingNTB:
    result(state, 'config.flag.flagNewSavingNTB', 'INACTIVE') === 'ACTIVE',
  isNewOnboarding: result(state, 'newOnboarding', ''),
  cif: result(state, 'user.profile.customer.cifCode', ''),
});

const mapDispatchToProps = dispatch => ({
  goToCreditCardFormNkyc: () =>
    dispatch(NavigationActions.navigate({routeName: 'CreditCardKTPCamera'})),
  goToSectionPage: () => dispatch(getCurrentSection(true)),
  goToLoanFormNkyc: () =>
    dispatch(NavigationActions.navigate({routeName: 'CreditCardForm1'})),
  goToSavingAccountFormNkyc: () =>
    dispatch(NavigationActions.navigate({routeName: 'SavingKTPCamera'})),
  clearOnboardingFlag: () => dispatch(saveNewOnboarding('no')),
  goToLanding: () =>
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Landing'})],
      }),
    ),
});

class EmoneySuccessRegistration extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    config: PropTypes.object,
    backToHome: PropTypes.func,
    productCode: PropTypes.string,
    creditCardType: PropTypes.string,
    newSavingNTB: PropTypes.bool,
    goToCreditCardFormNkyc: PropTypes.func,
    goToSectionPage: PropTypes.func,
    goToLoanFormNkyc: PropTypes.func,
    goToSavingAccountFormNkyc: PropTypes.func,
    clearOnboardingFlag: PropTypes.func,
    isNewOnboarding: PropTypes.string,
    goToLanding: PropTypes.func,
    cif: PropTypes.string,
  };

  nextpage = () => {
    const {productCode, creditCardType, newSavingNTB} = this.props;
    if (productCode !== '') {
      if (productCode.includes('CC')) {
        if (creditCardType === 'secured') {
          this.props.goToCreditCardFormNkyc();
        } else {
          this.props.goToSectionPage();
        }
      } else if (productCode.includes('PGO')) {
        this.props.goToLoanFormNkyc();
      } else if (productCode.includes('SA')) {
        if (newSavingNTB) {
          this.props.goToSectionPage();
        } else {
          this.props.goToSavingAccountFormNkyc();
        }
      } else {
        this.props.goToSectionPage();
      }
    } else {
      this.props.goToLanding();
    }
  };

  componentWillMount() {
    const {isNewOnboarding, clearOnboardingFlag} = this.props;
    if (isNewOnboarding === 'yes') {
      clearOnboardingFlag();
    }
  }

  componentDidMount = () => {
    const {productCode, cif} = this.props;
    let adjustEvent;
    if (productCode.includes('SA')) {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('csndco');
        adjustEvent.addCallbackParameter('page_id', 'ak-dao-4');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    } else if (productCode.includes('CC')) {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('geq1m6');
        adjustEvent.addCallbackParameter('page_id', 'ak-daocc-4');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    }
  };

  render() {
    return <EmoneySuccessRegistrationComp nextpage={this.nextpage} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmoneySuccessRegistration);
