import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImageConfirmation, {fields} from '../../components/EmoneyJourney/EmoneyImageConfirmation.component';
import {result, noop} from 'lodash';
import {reduxForm} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import {validateRequiredFields, validateRequiredString, validateKtpDukcapil} from '../../utils/validator.util';

const formConfig = {
  form: 'EmoneyImageConfirmation',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation}) => {
    const nextFunction = () => result(navigation, 'state.params.nextFunction', noop);
    nextFunction();
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.KTP_NUMBER])
    };
    const validationFormat = {
      ...validateRequiredString(values, [fields.BIRTH_DATE])
    };
    return {
      ktpId: validateKtpDukcapil(values.ktpId),
      ...validationFormat,
      ...errors,
    };
  }
};

const mapDispatchToProps = (dispatch) => ({
  goToCamera: (goBackToRoute) => {
    dispatch(NavigationActions.back());
    dispatch(NavigationActions.navigate({routeName: goBackToRoute}));
  },
});

const CreditCardForm = reduxForm(formConfig)(ImageConfirmation);

class ImageConfirmationPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToCamera: PropTypes.func,
    imageRotate: PropTypes.string,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
  }

  backToCamera = () => {
    const {goToCamera, navigation} = this.props;
    const goBackToRoute = result(navigation, 'state.params.route', '');
    goToCamera(goBackToRoute);
  }

  render () {
    const {navigation} = this.props;
    const base64Image = result(navigation, 'state.params.data', '');
    const flagKTP = result(navigation, 'state.params.flagKTP', false);
    const imageRotate = '0deg';
    return (
      <CreditCardForm base64Image={base64Image} navigation={navigation} backToCamera={this.backToCamera} 
        imageRotate={imageRotate} flagKTP={flagKTP}/>
    );
  }
}

export default connect(null, mapDispatchToProps)(ImageConfirmationPage);

