import React from 'react';
import PropTypes from 'prop-types';
import TdFAQForm from '../../components/TdJourney/TdFAQForm.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {confirmTd} from '../../state/thunks/dashboard.thunks';

const mapDispatchToProps = (dispatch) => ({
  confirmsTd: () => dispatch(confirmTd())
});

const mapStateToProps = ({config, currentLanguage}) => ({
  config,
  currentLanguage
});

class TdFAQ extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    confirmsTd: PropTypes.func,
    currentLanguage: PropTypes.object,
    config: PropTypes.object,
    isSearch: PropTypes.bool,
  }

  render () {
    const {confirmsTd, currentLanguage, navigation} = this.props;
    const lang = result(currentLanguage, 'id', 'id');
    const isShariah = result(navigation, 'state.params.isShariaAccount', false);
    const confSha = result(navigation, 'state.params.confSha', '');
    const confConv = result(navigation, 'state.params.confConv', '');
    const isSearch = result(navigation, 'state.params.isSearch', false);
    let url = '';
    if (isShariah) {
      url = (lang === 'en') ?  result(confSha, 'url_en', '') : result(confSha, 'url_id', '');
    } else {
      url = (lang === 'en') ? result(confConv, 'url_en', '') : result(confConv, 'url_id', '');
    }
    return <TdFAQForm navigation={navigation} confirmsTd={confirmsTd} url={url} isSearch={isSearch}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TdFAQ);