import React from 'react';
import PropTypes from 'prop-types';
import SearchATMBranch from '../../components/ATMLocator/SearchATMBranch.component';
import result from 'lodash/result';

class SearchATMBranchPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  render () {
    const {navigation} = this.props;
    const data = result(navigation, 'state.params', {});
    return <SearchATMBranch data={data}/>;
  }
}

export default SearchATMBranchPage;
