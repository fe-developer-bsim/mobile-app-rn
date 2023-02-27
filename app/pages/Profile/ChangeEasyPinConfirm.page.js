import React, {Component} from 'react';
import result from 'lodash/result';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import EasyPinConfirmForm from '../../components/Profile/ChangeEasyPinConfirm.component';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'easyPinUpdateForm',
  destroyOnUnmount: false,
  initialValues: {
    easyPinConfirm: '',
  },
  onSubmit: (values, dispatch) => dispatch(NavigationActions.navigate({routeName: 'ChangeEasyPinPasswordValidate'}))
};

const DecoratedForm = reduxForm(formConfig)(EasyPinConfirmForm);

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.easyPinUpdateForm.values', {})
});

const mapDispatchToProps = (dispatch) => ({
  validateBeforeSubmit: () => {
    dispatch(change('easyPinUpdateForm', 'easyPin', ''));
    dispatch(NavigationActions.back());
  }
});
const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(DecoratedForm);

class EasyPinScreen extends Component {
  render () {
    return (
      <ConnectedForm/>);
  }
}

export default EasyPinScreen;
