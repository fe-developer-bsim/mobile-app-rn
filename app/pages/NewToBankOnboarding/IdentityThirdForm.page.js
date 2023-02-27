import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import IdentityThirdForm, {fields} from '../../components/NewToBankOnboarding/IdentityThirdForm.component';
import {validateRequiredFields} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import result from 'lodash/result';

const formConfig = {
  form: 'IdentityThirdForm',
  destroyOnUnmount: false,
  initialValues: {
    [fields.SAVINGTYPE]: '',
  },
  onSubmit: (values, dispatch) => {
    if (values.savingType.value === 'Smartfren Promo') {
      dispatch(NavigationActions.navigate({routeName: 'SmartPromoAbout', params: {values: values}}));
    }    else {
      dispatch(NavigationActions.navigate({routeName: 'IdentityForm', params: values}));
    }
  },
  validate: (values) => ({
    ...validateRequiredFields(values, [fields.SAVINGTYPE]),
  })
};

const mapDispatchToProps = () => ({
});

const mapStateToProps = ({currentLanguage, captcha, config}) => ({currentLanguage, captcha, config});

const RegisterForm = reduxForm(formConfig)(IdentityThirdForm);

class IdentityThirdFormPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setUsername: PropTypes.func,
    goToForgotPassword: PropTypes.func,
    generateCaptcha: PropTypes.func,
    captcha: PropTypes.object,
    config: PropTypes.object,
  }


  onLearnMoreProduct = () => {
    this.props.navigation.navigate('LearnMoreProductPage');
  }

  render () {
    const {navigation, config} = this.props;
    const smartfrenEnable = result(config, 'smartfrenPromo.isSmartfrenPromoEnable', 'no');
    return (
      <RegisterForm LearnMoreProduct={this.onLearnMoreProduct} navigation={navigation} smartfrenEnable={smartfrenEnable}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentityThirdFormPage);
