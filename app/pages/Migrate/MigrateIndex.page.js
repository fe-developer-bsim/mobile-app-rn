import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MigrateIndexComponent from '../../components/Migrate/MigrateIndex.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {sendingTokenMigrate} from '../../state/thunks/onboarding.thunks';

const mapDispatchToProps = (dispatch) => ({
  getMigrateToken: (tokenId) => {
    dispatch(sendingTokenMigrate(tokenId));
  }
});

class MigratePage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    getMigrateToken: PropTypes.func,
  }

  getTokenId = () => {
    const {navigation, getMigrateToken} = this.props;
    const tokenId = result(navigation, 'state.params.id', '');
    if (tokenId.charAt(0) === '#') {
      const tokenIdSubstring = tokenId.substring(1, tokenId.length);
      getMigrateToken(tokenIdSubstring);
    } else {
      getMigrateToken(tokenId);
    }
  }
  render () {
    return (
      <MigrateIndexComponent getMigrateToken={this.getTokenId}/>
    );
  }
}

export default connect(null, mapDispatchToProps)(MigratePage);
