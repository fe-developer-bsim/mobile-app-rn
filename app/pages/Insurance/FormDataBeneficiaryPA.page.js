import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormDataBeneficiaryPA, getPA} from '../../state/thunks/Insurance.thunks';
import FormDataBeneficiaryPAComponent, {fields} from '../../components/Insurance/FormDataBeneficiaryPA.component';
import result from 'lodash/result';
import {reduxForm, change} from 'redux-form';
import {validateRequiredFields} from '../../utils/validator.util';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'InsurancePAForm',
  destroyOnUnmount: false,
  initialValues: {
    [fields.BENEF_NAME]: '',
    [fields.BENEF_DOB]: '',
    [fields.BENEF_SEX]: '',
    [fields.BENEF_RELATION]: '',
  },
  onSubmit: (values, dispatch) => {
    dispatch(FormDataBeneficiaryPA(values));

  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.BENEF_NAME, fields.BENEF_DOB, fields.BENEF_SEX, fields.BENEF_RELATION])};
    return {
      ...errors
    };
  }
};

const mapStateToProps = (state) => ({
  uriImage: result(state, 'config.attention.urlTncPersonalAccident', '')
});

const mapDispatchToProps = (dispatch) => ({
  sumbitFormDataBeneficiaryPA: (values) => () => dispatch(FormDataBeneficiaryPA(values)),
  editPremi: () => dispatch(getPA()),
  editFormData: () =>  dispatch(NavigationActions.back()),
  goTCPA: (uriImage) => dispatch(NavigationActions.navigate({routeName: 'DetailPA', params: {id: 4, uriImage: uriImage}})),
  setFormVal: (label, val) => dispatch(change('InsurancePAForm', label, val)),
});


const FormDataBeneficiaryPAForm = reduxForm(formConfig)(FormDataBeneficiaryPAComponent);

class InsurancePage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    sumbitFormDataBeneficiaryPA: PropTypes.func,
    editPremi: PropTypes.func,
    editFormData: PropTypes.func,
    goTCPA: PropTypes.func,
    uriImage: PropTypes.string,
    setFormVal: PropTypes.func,
  }

  goOnPage = () => {
    this.props.goTCPA(this.props.uriImage);

  }

  render () {
    const {sumbitFormDataBeneficiaryPA, navigation, editPremi, editFormData, goTCPA, setFormVal} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return (
      <FormDataBeneficiaryPAForm sumbitFormDataBeneficiaryPA={sumbitFormDataBeneficiaryPA} {...navigation} navParams={navParams} editPremi={editPremi} editFormData={editFormData} goTCPA={goTCPA} goOnPage={this.goOnPage} setFormVal={setFormVal}/>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(InsurancePage);
