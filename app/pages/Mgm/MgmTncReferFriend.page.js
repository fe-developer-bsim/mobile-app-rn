import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MgmTncReferFriend from '../../components/Mgm/MgmTncReferFriend.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';

const mapStateToProps = (state) => ({
  ccCode: result(state, 'ccCode', ''),
  config: result(state, 'config', {}),
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  urlTncReferFriendId: result(state, 'config.attention.URL_TNC_MGM_IN', ''),
  urlTncReferFriendEn: result(state, 'config.attention.URL_TNC_MGM_EN', ''),
});

const mapDispatchToProps = (dispatch) => ({
  backClose: () => {
    dispatch(NavigationActions.back());
  }
});

class MgmTncReferFriendPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    config: PropTypes.object,
    backClose: PropTypes.func,
    currentLanguage: PropTypes.string,
    urlTncReferFriendId: PropTypes.string,
    urlTncReferFriendEn: PropTypes.string,
  }
  onBackPage = () => {
    this.props.backClose();
  }

  render () {
    const {navigation = {}, urlTncReferFriendEn, urlTncReferFriendId, currentLanguage} = this.props;
    const items = result(navigation, 'state.params.data.code');
    const urlTncMgm = currentLanguage === 'en' ? urlTncReferFriendEn : urlTncReferFriendId;

    return <MgmTncReferFriend
      items={items}
      urlTncMgm={urlTncMgm}
      onBackPage={this.onBackPage}
      currentLanguage={currentLanguage}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MgmTncReferFriendPage);