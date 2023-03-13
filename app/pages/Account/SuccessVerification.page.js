import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import result from 'lodash/result';
import SuccessVerification from '../../components/Account/SuccessVerification.component';
import {StackActions, NavigationActions} from 'react-navigation';

const mapStateToProps = state => ({
  orderId: result(state, 'confirmFields', ''),
});

const mapDispatchToProps = dispatch => ({
  AccountMenu: () => {
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'AccountMenu'})],
      }),
    );
  },
});

class SuccessVerificationPage extends React.Component {
  static propTypes = {
    AccountMenu: PropTypes.func,
    orderId: PropTypes.object,
  };
  render() {
    const {AccountMenu, orderId} = this.props;
    return <SuccessVerification AccountMenu={AccountMenu} orderId={orderId} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuccessVerificationPage);
