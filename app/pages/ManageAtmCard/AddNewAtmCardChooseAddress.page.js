import React from 'react';
import PropTypes from 'prop-types';
import AddNewAtmCardChooseAddressComponent from '../../components/ManageAtmCard/AddNewAtmCardChooseAddress.component';
import {result, isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {triggerAuthNavigate, getLinkingCard, popUpRadioButtonAddressAddNewAtm} from '../../state/thunks/common.thunks';
import {generateAddressSelectionAddAtm} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import * as actionCreators from '../../state/actions/index.actions';
import {getCurrentSectionAccountMenu} from '../../state/thunks/digitalAccountOpening.thunks';

const AddNewAtmCardChooseAddressConfig = {
  form: 'AddNewAtmCardChooseAddress',
  destroyOnUnmount: true,
};

const mapStateToProps = (state) => ({
  isiFormChooseAddress: result(state, 'form.AddNewAtmCardChooseAddress.values', {}),
  cifCode: result(state, 'user.profile.customer.cifCode', ''),
  accountList: result(state, 'accounts', []),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (params) => dispatch(triggerAuthNavigate('AddNewAtmCard', 0, false, 'AuthDashboard', params)),
  createLinkingCard: () => dispatch(getLinkingCard()),
  popUpRadioButtonAddressAddNewAtm: () => dispatch(popUpRadioButtonAddressAddNewAtm()),
  getCurrentSectionAccountMenu: () => {
    dispatch(actionCreators.saveProductCode('PD'));
    dispatch(getCurrentSectionAccountMenu());
  },
  goToConfirmationPage: () => dispatch(NavigationActions.navigate({routeName: 'AddNewAtmCardConfirmation'})),
});

const AddNewAtmCardChooseAddress = reduxForm(AddNewAtmCardChooseAddressConfig)(AddNewAtmCardChooseAddressComponent);

class AddNewAtmCardChooseAddressClass extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    isiFormChooseAddress: PropTypes.object,
    createLinkingCard: PropTypes.func,
    triggerAuth: PropTypes.func,
    cifCode: PropTypes.string,
    accountList: PropTypes.array,
    popUpRadioButtonAddressAddNewAtm: PropTypes.func,
    getCurrentSectionAccountMenu: PropTypes.func,
    goToConfirmationPage: PropTypes.func,
  }

  createCardNew = () => {
    const {createLinkingCard, triggerAuth} = this.props;
    const params = {onSubmit: createLinkingCard, amount: '0', isOtp: true, isEasypin: false, shouldSendSmsOtp: true};
    triggerAuth(params);
  }

  render () {
    const {isiFormChooseAddress, navigation, popUpRadioButtonAddressAddNewAtm, getCurrentSectionAccountMenu, goToConfirmationPage} = this.props;
    const params = result(navigation, 'state.params', {});
    const dataPilihAlamat = result(params, 'data', {});
    const radioOptions = generateAddressSelectionAddAtm(dataPilihAlamat);
    const isEmptyForm = isEmpty(result(isiFormChooseAddress, 'deliveryMode', {}));
    const isEmptyAddress = isEmpty(result(isiFormChooseAddress, 'deliveryMode.LengkapForValidasi', ''));
    const isEmptyStreetAddress = isEmpty(result(isiFormChooseAddress, 'deliveryMode.streetAddress', ''));
    const isEmptyRtRw = isEmpty(result(isiFormChooseAddress, 'deliveryMode.RtRw', ''));
    const isEmptySubDistrict = isEmpty(result(isiFormChooseAddress, 'deliveryMode.subDistrict', ''));
    const isEmptyDistrict = isEmpty(result(isiFormChooseAddress, 'deliveryMode.district', ''));
    const isEmptyPostalCode = isEmpty(result(isiFormChooseAddress, 'deliveryMode.postalCode', ''));
    const isEmptyProvince = isEmpty(result(isiFormChooseAddress, 'deliveryMode.province', ''));

    return <AddNewAtmCardChooseAddress
      radioOptions={radioOptions}
      createCardNew={this.createCardNew}
      isEmptyForm={isEmptyForm}
      popUpRadioButtonAddressAddNewAtm={popUpRadioButtonAddressAddNewAtm}
      isEmptyAddress={isEmptyAddress}
      isEmptyStreetAddress={isEmptyStreetAddress}
      isEmptyRtRw={isEmptyRtRw}
      isEmptySubDistrict={isEmptySubDistrict}
      isEmptyDistrict={isEmptyDistrict}
      isEmptyPostalCode={isEmptyPostalCode}
      isEmptyProvince={isEmptyProvince}
      getCurrentSectionAccountMenu={getCurrentSectionAccountMenu}
      goToConfirmationPage={goToConfirmationPage}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAtmCardChooseAddressClass);
