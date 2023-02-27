import React from 'react';
import PropTypes from 'prop-types';
import OpenAndromax from '../../components/OpenNewAccount/OpenAndromax.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {goToAndromaxForm} from '../../state/thunks/openAccount.thunks';

const mapDispatchToProps = (dispatch) => ({
  openAccount: () => dispatch(goToAndromaxForm())
});

const mapStateToProps = ({config, currentLanguage}) => ({
  config,
  currentLanguage
});

class OpenAndromaxPage extends React.Component {
  static propTypes = {
    openAccount: PropTypes.func,
    currentLanguage: PropTypes.object,
    config: PropTypes.object,
  }

  render () {
    const {openAccount, config, currentLanguage} = this.props;
    const lang = result(currentLanguage, 'id', 'id');
    const url = lang === 'en' ? result(config, 'attention.urlSmartfrenPromo.url_en', '') : result(config, 'attention.urlSmartfrenPromo.url_id', '');
    return <OpenAndromax openAccount={openAccount} url={url}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenAndromaxPage);
