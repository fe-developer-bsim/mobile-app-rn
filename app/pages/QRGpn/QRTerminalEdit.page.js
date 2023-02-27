import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import QRTerminalEdit from '../../components/QRGpn/QRTerminalEdit.component';
import {getTerminalEditConfirm} from '../../state/thunks/QRGpn.thunks';
import {validateRequiredFields, isValidTerminalName} from '../../utils/validator.util';
import result from 'lodash/result';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'QRTerminalEdit',
  destroyOnUnmount: false,
  initialValues: {
    merchant_pan_name: '',
    username: '',
    mobile_number: '',
  },
  onSubmit: (values, dispatch, props) => dispatch(getTerminalEditConfirm(result(props.navigation, 'state.params.data', {}))),
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, ['merchant_pan_name', 'username', 'mobile_number'])};
    return {
      username: isValidTerminalName(values.username),      
      ...errors
    };
  }
};

const mapStateToProps = ({state, user}) => ({
  transRefNum: result(state, 'transRefNum', 0), user
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('regist-terminal', amount, true, 'AuthDashboard', params)),
  setPanName: (merchant_pan_name) => dispatch(change('QRTerminalEdit', 'merchant_pan_name', merchant_pan_name)),
  setUsername: (username) => dispatch(change('QRTerminalEdit', 'username', username)),  
  setPhone: (mobile_number) => dispatch(change('QRTerminalEdit', 'mobile_number', mobile_number)),    
});

const QRTerminalEditForm = reduxForm(formConfig)(QRTerminalEdit);

class QRTerminalEditPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    setPanName: PropTypes.func,
    setPhone: PropTypes.func,        
    setUsername: PropTypes.func,        
  };

  componentDidMount () {
    const {setPanName, setPhone, setUsername, navigation} = this.props;
    const data = result(navigation, 'state.params.data', {});
    setPanName(result(data, 'merchant_pan_name', ''));
    setPhone(result(data, 'mobile_number', ''));    
    setUsername(result(data, 'username', ''));    
  }

  render () {
    const {navigation, dispatch} = this.props;
    return <QRTerminalEditForm navigation={navigation} dispatch={dispatch}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRTerminalEditPage);
