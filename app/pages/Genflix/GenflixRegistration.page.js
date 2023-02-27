import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import GenflixRegistration, {fields} from '../../components/Genflix/GenflixRegistration.component';
import {validateCheckbox, validateEmail, validateGenflixPassword, validateBalance, validateRequiredFields} from '../../utils/validator.util';
import {getAccountAmount, isEmptyOrNull, wrapMethodInFunction} from '../../utils/transformer.util';
import {GenflixUsernameQuery, GenflixPaymentConfirmation, GenflixInit} from '../../state/thunks/Genflix.thunk';
import result from 'lodash/result';
import {Toast} from '../../utils/RNHelpers.util.js';

const formConfig = {
  form: fields.formName,
  destroyOnUnmount: false,
  initialValues: {
    [fields.sourceAccount]: {},
  },
  validate: (values, {isHidden}) => ({
    ...validateRequiredFields(values, [fields.username]), 
    [`${fields.tnc}`]: validateCheckbox(values[fields.tnc]),
    [`${fields.username}`]: validateEmail(values[fields.username]),
    [`${fields.password}`]: validateGenflixPassword(values[fields.password], isHidden),
    [`${fields.sourceAccount}`]: validateBalance(getAccountAmount(values[fields.sourceAccount], 0))
  }),
  onSubmit: (values, dispatch, {isHidden}) => {
    dispatch(GenflixPaymentConfirmation(values[fields.username], values[fields.password], values[fields.sourceAccount], isHidden));
  }
};

const DecoratedGenflixRegistration = reduxForm(formConfig)(GenflixRegistration);

const mapStateToProps = (state) => ({
  formVal: result(state, `form.${fields.formName}.values`, {}),
});

const mapDispatchToProps = (dispatch) => ({
  query: (username) => dispatch(GenflixUsernameQuery(username)),
  clearPassword: () => dispatch(change(fields.formName, fields.password, '')),
  setEmail: (currEmail) => dispatch(change(fields.formName, fields.username, currEmail)),
  init: () => dispatch(GenflixInit()),
});

class GenflixRegistrationPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: false,
      isGenflixUsername: true,
      error: false,
    };
  }
  
  static propTypes = {
    query: PropTypes.func,
    formVal: PropTypes.object,
    clearPassword: PropTypes.func,
    email: PropTypes.string,
    setEmail: PropTypes.func,
    init: PropTypes.func, 
  }

  isGenflixUsername = (usernameExist) => this.setState({isGenflixUsername: usernameExist})

  handleQuery = (username) => {
    if (validateEmail(username)) {
      this.isGenflixUsername(true);
      return;
    }
    const {query} = this.props;
    this.showSpinner();
    query(username).then(({isUser, disabled}) => {
      this.isGenflixUsername(isUser);
      this.setState({error: disabled});
      this.hideSpinner();
    }, (errorMsg) => {
      this.handleQueryRejection(errorMsg).then(() => {
        setTimeout(wrapMethodInFunction(this.handleQuery, username), 5000);
      });
    }).catch((err) => {
      const errorMsg = result(err, 'data.responseMessage', '');
      this.handleQueryRejection(errorMsg).then(() => {
        setTimeout(wrapMethodInFunction(this.handleQuery, username), 5000);
      });
    });
  }

  handleQueryRejection = (errorMsg) => {
    this.setState({error: !!errorMsg});
    Toast.show(errorMsg, Toast.LONG);
    this.hideSpinner();
    return Promise.resolve();
  }

  showSpinner = () => this.setState({isLoading: true})

  hideSpinner = () => this.setState({isLoading: false})

  componentWillMount = () => {
    const {email, init, setEmail} = this.props;
    if (!email) init().then((res) => setEmail(result(res, 'email', '')));
  }

  render () {
    const {formVal, email, setEmail} = this.props;
    const disabled = !!validateGenflixPassword(formVal[fields.password], this.state.isGenflixUsername) || 
      isEmptyOrNull(result(formVal, fields.sourceAccount, {})) || this.state.error;
    return  (
      <DecoratedGenflixRegistration isLoading={this.state.isLoading} handleQuery={this.handleQuery} isHidden={this.state.isGenflixUsername} 
        disabled={disabled} email={email} setEmail={setEmail}
      />
    );
  }
}

const ConnectedGenflixRegistration = connect(mapStateToProps, mapDispatchToProps)(GenflixRegistrationPage);

export default ConnectedGenflixRegistration;