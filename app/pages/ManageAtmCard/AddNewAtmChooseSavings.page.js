import React from 'react';
import PropTypes from 'prop-types';
import AddNewAtmChooseSavingsComponent from '../../components/ManageAtmCard/AddNewAtmChooseSavings.component';
import {result, isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {checkBalanceAddAtm, getCustomerDetailAddAtm} from '../../state/thunks/common.thunks';

const AddNewAtmChooseSavingsConfig = {
  form: 'AddNewAtmChooseSavings',
  destroyOnUnmount: true,
  initialValues: {
    AvailableBalance: 0,
  },
};

const mapStateToProps = (state) => ({
  accounts: result(state, 'accounts', []),
  isiForm: result(state, 'form.AddNewAtmChooseSavings.values', {}),
  currentLanguage: result(state, 'currentLanguage.id', ''),
});

const mapDispatchToProps = (dispatch) => ({
  goToCheckBalanceAddAtm: () => dispatch(checkBalanceAddAtm()),
  goToNextPage: () => () => dispatch(getCustomerDetailAddAtm()),
});

const AddNewAtmChooseSavings = reduxForm(AddNewAtmChooseSavingsConfig)(AddNewAtmChooseSavingsComponent);

class AddNewAtmChooseSavingsClass extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    goToNextPage: PropTypes.func,
    goToCheckBalanceAddAtm: PropTypes.func,
    isiForm: PropTypes.object,
    currentLanguage: PropTypes.string,
  }

  state = {
    isDisabled: true
  }

  render () {
    const {goToNextPage, isiForm, navigation, goToCheckBalanceAddAtm, accounts, currentLanguage} = this.props;
    const card = result(navigation, 'state.params', {});
    const data = result(card, 'data', []);
    const balances = parseFloat(result(isiForm, 'AvailableBalance', 0));
    const minBalance = parseFloat(result(isiForm, 'MinimumBalance', 0));
    const isLessAmount = balances < minBalance;
    const isEmptyForm = isEmpty(result(isiForm, 'accountNo', {}));

    return <AddNewAtmChooseSavings
      isDisabled={this.state.isDisabled}
      goToNextPage={goToNextPage}
      data={data}
      getCheckBalanceAddAtm={goToCheckBalanceAddAtm}
      isEmptyForm={isEmptyForm}
      isLessAmount={isLessAmount}
      accounts={accounts}
      isiForm={isiForm}
      currentLanguage={currentLanguage}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAtmChooseSavingsClass);
