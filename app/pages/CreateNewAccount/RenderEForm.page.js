import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import EFormComponent, {fields} from '../../components/CreateNewAccount/RenderEForm.component';
import {validateRequiredFields} from '../../utils/validator.util';
import {forEach, result} from 'lodash';
import {connect} from 'react-redux';
import validate from '../../utils/EFormValidator.util';
import * as thunks from '../../state/thunks/EForm.thunks';

const formConfig = {
  form: fields.formName,
  destroyOnUnmount: false,
  validate: (values, props) => {
    const {page = {}} = props;
    const {fields} = page;
    let mandatoryFields = [];
    forEach(fields, (obj) => !obj.optional && mandatoryFields.push(obj.code));
    let errors = validateRequiredFields(values, mandatoryFields);
    let filteredValidated = [];
    forEach(fields, (obj) => obj.typeField && filteredValidated.push({...obj, key: obj.code}));
    forEach(filteredValidated, ({key, typeField}) => {
      validate[typeField] ? errors = {...errors, [key]: validate[typeField](values[key])} : null;
    });
    return errors;
  },
  onSubmit: (values, dispatch, props) => {
    const {page} = props;
    const {handleSubmit} = page;
    const submit = thunks[handleSubmit] ? thunks[handleSubmit] : thunks['handleSubmit'];
    dispatch(submit(values, props));
  }
};

const EForm = reduxForm(formConfig)(EFormComponent);

class EFormPage extends Component {
  static propTypes = {
    EForm: PropTypes.object,
    getProvinceList: PropTypes.func
  }

  componentWillMount () {
    this.props.getProvinceList();
  }

  render () {
    const {
      EForm: EFormPage,
      ...otherProps
    } = this.props;
    const value = result(EFormPage, 'value', {});
    const page = result(EFormPage, 'page', {});
    let initialValues = {};
    const pageCode = result(page, 'code', '');
    const fields = result(page, 'fields', []);
    forEach(fields, (obj) => { // hard-coded values
      obj.value && obj.code ? initialValues = {...initialValues, [obj.code]: obj.value} : null;
    });
    forEach(value, (value, key) => { // values set by BE
      initialValues = {...initialValues, [key]: value};
    });
    return <EForm {...otherProps} page={page} initialValues={initialValues} pageName={pageCode}/>;
  }
}

const EFormState = ({EForm}) => ({
  EForm
});

const EFormDispatch = (dispatch) => ({
  getProvinceList: () => {
    dispatch(thunks.getProvinceList());
  },
});

const ConnectedEFormPage = connect(EFormState, EFormDispatch)(EFormPage);

export default ConnectedEFormPage;
