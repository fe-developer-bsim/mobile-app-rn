import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RedeemSmartfrenResult from '../../components/Home/RedeemSmartfrenResult.component';
import {reduxForm} from 'redux-form';

const formConfig = {
  form: 'RedeemSmartfrenResult',
};

const RedeemSmartfrenResultForm = reduxForm(formConfig)(RedeemSmartfrenResult);

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', ''),
});

class RedeemSmartfrenResultPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  };
  render () {
    const {navigation} = this.props;
    return <RedeemSmartfrenResultForm
      navigation={navigation}
    />;
  }
}

export default connect(mapStateToProps)(RedeemSmartfrenResultPage);
