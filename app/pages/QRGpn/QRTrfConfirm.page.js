import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import QRTrfConfirm from '../../components/QRGpn/QRTrfConfirm.component';
import ReturnHome from '../../state/thunks/QRGpn.thunks';


const formConfig = {
  form: 'QRTrfShown',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => dispatch(ReturnHome()),
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  ReturnHome: () => dispatch(ReturnHome()),
});

const QRTrfShowForm = reduxForm(formConfig)(QRTrfConfirm);

class QRTrfShowPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    ReturnHome: PropTypes.func,
  };

  render () {
    const {navigation, ReturnHome} = this.props;
    return <QRTrfShowForm navigation={navigation} ReturnHome={ReturnHome}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRTrfShowPage);
