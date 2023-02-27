import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {payPA} from '../../state/thunks/Insurance.thunks';
import ResultPAComponent from '../../components/Insurance/ResultPA.component';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';

const mapDispatchToProps = (dispatch) => ({
  goToPayPA: () => dispatch(payPA()),
  goToClosePA: () => dispatch(NavigationActions.back()),
});

class InsurancePage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToPayPA: PropTypes.func,
    goToClosePA: PropTypes.func
  }
  state = {
    isDisabled: true
  }
  render () {
    const {navigation = {}, goToPayPA, goToClosePA} = this.props;
    const navParams = result(navigation, 'state.params', {});

    return (
      <ResultPAComponent {...navigation} navParams={navParams} goToPayPA={goToPayPA} goToClosePA={goToClosePA}/>
    );
  }

}

export default connect(null, mapDispatchToProps)(InsurancePage);
