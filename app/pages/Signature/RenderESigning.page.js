import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import RenderESigningComp, {fields} from '../../components/Signature/RenderESigning.component';
// import RenderESigningComp from '../../components/Signature/ESigningCanvas.component';
import {validateRequiredFields} from '../../utils/validator.util';
import {forEach, result} from 'lodash';
import {connect} from 'react-redux';
import validate from '../../utils/EFormValidator.util';
import * as thunks from '../../state/thunks/ESigning.thunks';

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

const RenderESigning = reduxForm(formConfig)(RenderESigningComp);

class RenderESigningPage extends Component {
  static propTypes = {
    EForm: PropTypes.object,
    getProvinceList: PropTypes.func
  }

  componentWillMount () {
    const {EForm: EFormPage} = this.props;
    const usingLocation = result(EFormPage, 'page.usingLocation', false);
    if (usingLocation) {
      this.props.getProvinceList();
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
      obj.value && obj.code ? initialValues = {...initialValues, [obj.code]: obj.value} : null;
    });
    forEach(value, (value, key) => { // for values set by BE
      initialValues = {...initialValues, [key]: value};
    });
    return <RenderESigning {...otherProps} page={page} initialValues={initialValues} pageName={pageCode}/>;
  }
}

const RenderESigningState = ({EForm}) => ({
  EForm
});

const RenderESigningDispatch = (dispatch) => ({
  getProvinceList: () => {
    dispatch(thunks.getProvinceList());
  },
});

const ConnectedEFormPage = connect(RenderESigningState, RenderESigningDispatch)(RenderESigningPage);

export default ConnectedEFormPage;