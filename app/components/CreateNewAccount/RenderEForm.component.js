import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {result, isEmpty} from 'lodash';
import {connect} from 'react-redux';
import * as thunks from '../../state/thunks/EForm.thunks';
import {Field, change} from 'redux-form';
import * as SinarmasComponents from './EForm.component';
import {View, Text} from 'react-native';
import styles from './EForm.styles';
import {language} from '../../config/language';
import * as validationInput from '../../utils/EFormValidator.util';
import * as util from '../../utils/EForm.util';
import * as pages from './EFormPages.component';
import {doNothing} from '../../utils/transformer.util';

export const fields = {
  formName: 'EForm',
};

const RecursiveEForm = (props) => {
  const {page} = props;
  const {type} = page;
  const PageComponent = pages[type] || pages['form']; // if type is not found, use form (default) 
  return (
    <PageComponent { ...props}/>
  );
};

RecursiveEForm.propTypes = {
  page: PropTypes.object,
};

export default RecursiveEForm;

class EFormComponent extends Component {
  static propTypes = {
    component: PropTypes.string,
    hide: PropTypes.string,
    formValues: PropTypes.object,
    footer: PropTypes.string,
    dependentOn: PropTypes.string,
    selectMobileNo: PropTypes.func,
    dependentOnKeyword: PropTypes.string,
    dependentOnHideCode: PropTypes.string,
    fieldName: PropTypes.string,
    unregisterField: PropTypes.func,
    dependentOnHide: PropTypes.string
  }

  render () {
    const {component = 'SinarmasInput', fieldName, unregisterField, footer, formValues, hide, dependentOnHideCode, dependentOnHide, ...otherProps} = this.props;
    const hideComponent = validationInput[hide] && validationInput[hide](formValues, dependentOnHideCode, dependentOnHide) && unregisterField(fieldName, formValues);
    const generatedProps = generateProps[component] ? generateProps[component](this.props) : {};

    return (
      <View>
        {
          hideComponent ? 
            null :
            <Field
              {...otherProps}
              {...commonGeneratedProps(this.props)}
              {...generateTypeProps(component, this.props)}
              {...generatedProps}
            />
        }
        <Text style={styles.fieldFooter}>{language[footer]}</Text>
      </View>
    );
  }
}

const EFormState = ({form, config, listCity, listProvince, listCity2, listProvince2, listDukcapil, provinceList, cityList, districtList, subDistrictList, jobTypeList}) => ({
  dropdown: {
    listCity, listProvince, listCity2, listProvince2, listDukcapil, 
    provinceList, cityList, districtList, subDistrictList, jobTypeList, ...result(config, 'listConfigEform', {})
  },
  formValues: result(form, `${fields.formName}.values`, {}),
});

const EFormDispatch = (dispatch) => ({
  execute: (functionName) => (value) => thunks[functionName] && dispatch(thunks[functionName](value)),
  doDependent: (functionName, props) => thunks.dependentFunctions[functionName] && dispatch(thunks.dependentFunctions[functionName](props)),
  selectMobileNo: (mobileNumber, fieldtoChange, fieldNameContact, mobileName) => {
    dispatch(change('EForm', fieldtoChange, mobileNumber));
    dispatch(change('EForm', fieldNameContact, mobileName));
  },
  unregisterField: (fieldName, formValues) => formValues[fieldName] && dispatch(change(fields.formName, fieldName, null)) || true
});

export const ConnectedEFormComponent = connect(EFormState, EFormDispatch)(EFormComponent);  

const commonGeneratedProps = (props) => {
  const {label, placeholder, fieldName, component, dependentOnFunction, doDependent, style = 'fieldContainer', theme = 'primary', fieldContactName = ''} = props;
  doDependent(dependentOnFunction, props);
  return ({
    label: language[label], 
    placeholder: language[placeholder], 
    name: fieldName,
    component: SinarmasComponents[component] || SinarmasComponents['SinarmasInput'],
    style: styles[style] || style,
    theme,
    fieldContactName,
  });
};

const commonTypeProps = {
  text: (props) => {
    const {format, normalize, typeField} = props;
    return ({
      format: util[format] || doNothing,
      normalize: util[normalize] || doNothing,
      isUseSuccessInputText: !!typeField,
      validationInput: validationInput[typeField] || doNothing
    }); 
  },
  dropdown: ({itemList, itemListTemp, dropdown, labelKey, execute, onValChange, onClearChange}) => ({
    itemList: !isEmpty(itemListTemp) ? itemListTemp : result(dropdown, itemList, {}),
    labelKey,
    onValChange: execute(onValChange, onClearChange),
  }),
  date: ({onConfirm, onCancel, execute}) => ({
    onConfirm: execute(onConfirm),
    onCancel: execute(onCancel)
  }),
};

const generateTypeProps = (component, props) => commonTypeProps[type[component]] ? commonTypeProps[type[component]](props) : {};

const type = {
  SinarmasIconInput: 'text',
  SinarmasInput: 'text',
  SinarmasPicker: 'dropdown',
  SinarmasPickerLine: 'dropdown',
  SinarmasPickerWithoutBorder: 'dropdown',
  DatePicker: 'date'
};

const generateProps = { // unused for now
  SinarmasPickerWithoutBorder: ({textPickerStyle = 'textPickerStyle'}) => ({
    textPickerStyle: styles[textPickerStyle] || textPickerStyle,    
  }),
};
