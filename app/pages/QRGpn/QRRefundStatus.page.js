import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import QRRefundStatus from '../../components/QRGpn/QRRefundStatus.component';
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

const QRRefundForm = reduxForm(formConfig)(QRRefundStatus);

class QRRefundStatusPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  render () {

    const {navigation} = this.props;
    return <QRRefundForm navigation={navigation} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRRefundStatusPage);
