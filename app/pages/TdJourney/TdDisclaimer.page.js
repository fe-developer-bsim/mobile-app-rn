import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import TdDisclaimerForm from '../../components/TdJourney/TdDisclaimer.component';
import {getTdConfig} from '../../state/thunks/dashboard.thunks';
import {checkShariaAccount} from '../../utils/transformer.util';
import result from 'lodash/result';
import {connect} from 'react-redux';

const formConfig = {
  form: 'TdDisclaimerForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {extraNoteList}) => {
    dispatch(getTdConfig(extraNoteList));
  }
};

const mapStateToProps = (state) => ({state});

const mapDispatchToProps = (dispatch) => ({dispatch});

const DecoratedTdDisclaimerForm = reduxForm(formConfig)(TdDisclaimerForm);

class TdDisclaimerFormPage extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
  };

  render () {
    const {navigation} = this.props;
    const props = this.props;
    const isShariaAccount = checkShariaAccount(result(props, 'state.form.TdForm.values.accountNo', ''));
    const extraNoteList = String(result(navigation, 'state.params.extraNoteList', ''));
    const footNoteList = isShariaAccount ? result(navigation, 'state.params.footNoteListSya', []) : result(navigation, 'state.params.footNoteList', []);
    return <DecoratedTdDisclaimerForm extraNoteList={extraNoteList} footNoteList={footNoteList}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TdDisclaimerFormPage);
