import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import DigitalEFormComponent, {fields} from '../../components/DigitalAccountOpening/RenderDigitalEForm.component';
import {validateRequiredFields} from '../../utils/validator.util';
import {forEach, result} from 'lodash';
import {connect} from 'react-redux';
import validate from '../../utils/EFormValidator.util';
import * as thunks from '../../state/thunks/digitalAccountOpening.thunks';

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

const DigitalEForm = reduxForm(formConfig)(DigitalEFormComponent);

class DigitalEFormPage extends Component {
  static propTypes = {
    EForm: PropTypes.object,
    getProvinceList: PropTypes.func,
    filterListJob: PropTypes.func
  }

  componentWillMount () {
    const {EForm: EFormPage, filterListJob} = this.props;
    const usingLocation = result(EFormPage, 'page.usingLocation', false);
    const isWorkerPage = result(EFormPage, 'page.isWorkerPage', false);
    if (usingLocation) {
      this.props.getProvinceList();
    }
    if (isWorkerPage) {
      filterListJob();
    }
  }

  render () {
    const {
      EForm: EFormPage,
      ...otherProps
    } = this.props;
    let initialValues = {};
    const value = result(EFormPage, 'value', {});
    const page = result(EFormPage, 'page', {});
    const pageCode = result(page, 'code', '');
    const fields = result(page, 'fields', []);
    forEach(fields, (obj) => { // for hard-coded values
      obj.value && obj.code ? initialValues = {...initialValues, [obj.code]: obj.value} : '';
    });
    forEach(value, (value, key) => { // for values set by BE
      initialValues = {...initialValues, [key]: value};
    });
    return <DigitalEForm {...otherProps} page={page} initialValues={initialValues} pageName={pageCode}/>;
  }
}

const DigitalEFormState = ({EForm}) => ({
  EForm
});

const DigitalEFormDispatch = (dispatch) => ({
  getProvinceList: () => {
    dispatch(thunks.getProvinceList());
  },
  filterListJob: () => dispatch(thunks.filterListJob())
});

const ConnectedEFormPage = connect(DigitalEFormState, DigitalEFormDispatch)(DigitalEFormPage);

export default ConnectedEFormPage;
