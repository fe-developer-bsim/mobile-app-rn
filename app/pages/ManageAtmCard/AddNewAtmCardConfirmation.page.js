import React from 'react';
import PropTypes from 'prop-types';
import AddNewAtmCardConfirmationComponent from '../../components/ManageAtmCard/AddNewAtmCardConfirmation.component';
import {result} from 'lodash';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {triggerAuthNavigate, getLinkingCard} from '../../state/thunks/common.thunks';

const AddNewAtmCardConfirmationConfig = {
  form: 'AddNewAtmCardConfirmation',
  destroyOnUnmount: false,
};

const mapStateToProps = (state) => ({
  isiFormChooseSavings: result(state, 'form.AddNewAtmChooseSavings.values', {}),
  isiFormChooseAddress: result(state, 'form.AddNewAtmCardChooseAddress.values', {}),
  isiFormConfirmation: result(state, 'form.AddNewAtmCardConfirmation.values', {}),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (params) => dispatch(triggerAuthNavigate('AddNewAtmCard', 0, false, 'AuthDashboard', params)),
  createLinkingCard: () => dispatch(getLinkingCard()),
});

const AddNewAtmCardConfirmation = reduxForm(AddNewAtmCardConfirmationConfig)(AddNewAtmCardConfirmationComponent);

class AddNewAtmCardConfirmationClass extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    isiFormChooseAddress: PropTypes.object,
    isiFormChooseSavings: PropTypes.object,
    isiFormConfirmation: PropTypes.object,
    createLinkingCard: PropTypes.func,
    triggerAuth: PropTypes.func,
  }

  createCardNew = () => {
    const {createLinkingCard, triggerAuth} = this.props;
    const params = {onSubmit: createLinkingCard, amount: '0', isOtp: true, isEasypin: false, shouldSendSmsOtp: true};
    triggerAuth(params);
  }

  render () {
    const {isiFormChooseSavings, isiFormChooseAddress, isiFormConfirmation} = this.props;
    const accLinked = result(isiFormChooseSavings, 'accountNo.display', '');
    const embossName = result(isiFormConfirmation, 'embossedName', '');
    const cardNetwork = result(isiFormChooseSavings, 'accountNo.tncConfig.cardNetwork', '');
    const fee = result(isiFormChooseSavings, 'MinimumBalance', '');
    const imageCard = result(isiFormChooseSavings, 'accountNo.imageCard', '');
    const deliveryAddress = result(isiFormChooseAddress, 'deliveryMode.sublabel', '');

    return <AddNewAtmCardConfirmation
      accLinked={accLinked}
      embossName={embossName}
      cardNetwork={cardNetwork}
      fee={fee}
      imageCard={imageCard}
      deliveryAddress={deliveryAddress}
      createCardNew={this.createCardNew}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAtmCardConfirmationClass);
