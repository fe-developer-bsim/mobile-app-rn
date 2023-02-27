import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AccSuccessOpeningComponent from '../../components/OpeningAccountJourney/AccSuccessOpening.component';
import result from 'lodash/result';
import {directToNextSTep, submitPPA} from '../../state/thunks/openingAccount.thunks';

const mapDispatchToProps = (dispatch) => ({
  checkStep: (data) => {
    const code = result(data, 'code', '');
    const nextStep = result(data, 'nextStep', '');
    if (code === 'LoanKPR' && nextStep !== '99') {
      dispatch(submitPPA(data));
    } else {
      dispatch(directToNextSTep(data));
    }
  }
});

const mapStateToProps = (state) => ({
  cif: result(state, 'user.profile.customer.cifCode', ''),
  currentLanguage: result(state, 'currentLanguage.id', ''),
});

class AccSuccessOpeningPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    checkStep: PropTypes.func,
    cif: PropTypes. string,
    currentLanguage: PropTypes.string
  }

  checkStepNav = (approveCode) => () => {
    const dataAccount = result(this.props.navigation, 'state.params.allData.statusNew', {});
    const productCode = result(this.props.navigation, 'state.params.allData.productCode', '');
    const code = result(this.props.navigation, 'state.params.allData.code', '');
    this.props.checkStep({...dataAccount, productCode, code, approveCode});
  }
  render () {
    const {navigation = [], cif, currentLanguage} = this.props;
    const dataAccount = result(navigation, 'state.params.allData', {});

    return (
      <AccSuccessOpeningComponent dataAccount={dataAccount} {...navigation} checkStepNav={this.checkStepNav} cif={cif} currentLanguage={currentLanguage}/>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AccSuccessOpeningPage);
