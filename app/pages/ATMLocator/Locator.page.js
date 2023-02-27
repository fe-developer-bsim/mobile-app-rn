import React from 'react';
import PropTypes from 'prop-types';
import Locator from '../../components/ATMLocator/Locator.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {goToSearch} from '../../state/thunks/common.thunks';
import noop from 'lodash/noop';

const mapDispatchToProps = (dispatch) => ({
  goToSearch: (data) => () => {
    dispatch(goToSearch(data));
  },
});

class LocatorPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToSearch: PropTypes.func,
  }

  render () {
    const {navigation, goToSearch = noop} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return <Locator {...navParams} goToSearch={goToSearch}/>;
  }
}

export default connect(null, mapDispatchToProps)(LocatorPage);
