import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {PremiPA} from '../../state/thunks/Insurance.thunks';
import PremiPAComponent from '../../components/Insurance/PremiPA.component';
import result from 'lodash/result';
import {reduxForm} from 'redux-form';
import {validateRequiredFields} from '../../utils/validator.util';

const formConfig = {
  form: 'InsurancePA',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => {
    dispatch(PremiPA(values));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, ['premium'])};
    return {
      ...errors
    };
  }
};
const FormDataBeneficiaryPAForm = reduxForm(formConfig)(PremiPAComponent);
const mapDispatchToProps = (dispatch) => ({
  getPremiPA: (selectPremi) => () => dispatch(PremiPA(selectPremi)),
});

class InsurancePage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    getPremiPA: PropTypes.func,
  }
  state = {
    isDisabled: true
  }
  render () {
    const {getPremiPA} = this.props;
    const {navigation = []} = this.props;
    const navParams = result(navigation, 'state.params', []);

    return (
      <FormDataBeneficiaryPAForm getPremiPA = {getPremiPA} {...navigation} navParams={navParams} isDisabled={this.state.isDisabled}/>
    );
  }

}

export default connect(null, mapDispatchToProps)(InsurancePage);
