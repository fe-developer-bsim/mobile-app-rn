import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import QRTerminalStatus from '../../components/QRGpn/QRTerminalStatus.component';
import {QRStatusComplete} from '../../state/thunks/QRGpn.thunks';

const formConfig = {
  form: 'QRForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => dispatch(QRStatusComplete()),
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

const QRTerminalForm = reduxForm(formConfig)(QRTerminalStatus);

class QRTerminalStatusPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  render () {

    const {navigation} = this.props;
    return <QRTerminalForm navigation={navigation} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRTerminalStatusPage);
