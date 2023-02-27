import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import TokenHistory from '../../components/TokenJourney/TokenHistory.component';
import {tokenPaymentDetail, expiredInvoice} from '../../state/thunks/common.thunks';
import result from 'lodash/result';

const formConfig = {
  form: 'TokenHistory',
  destroyOnUnmount: false,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  tokenPaymentDetail: (data) => () => {
    dispatch(tokenPaymentDetail(data));
  },
  expiredInvoice: (formatDate) => () => {
    dispatch(expiredInvoice(formatDate));
  },

});

const DecoratedTokenForm = reduxForm(formConfig)(TokenHistory);

class TokenHistoryPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    tokenPaymentDetail: PropTypes.func,
    expiredInvoice: PropTypes.func
  };

  render () {
    const {navigation = {}, tokenPaymentDetail, expiredInvoice} = this.props;
    const data = result(navigation, 'state.params.data', {});
    return <DecoratedTokenForm
      data= {data}
      tokenPaymentDetail= {tokenPaymentDetail}
      expiredInvoice= {expiredInvoice}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenHistoryPage);
