import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FAQWebBiFastComponent from '../../components/Help/FAQWeb.component';
import result from 'lodash/result';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  const currentLanguage = result(state, 'currentLanguage.id', '');
  const urlFAQId = result(state, 'config.attention.URL_BIFAST_FAQ.url_id', '');
  const urlFAQEn = result(state, 'config.attention.URL_BIFAST_FAQ.url_en', '');
  return {
    currentLanguage,
    urlFAQId,
    urlFAQEn
  };
};

class FAQWebBiFastPage extends Component {
  static propTypes = {
    currentLanguage: PropTypes.string,
    urlFAQId: PropTypes.string,
    urlFAQEn: PropTypes.string,
    navigation: PropTypes.object,
  }

  render () {
    const {currentLanguage = '', urlFAQId = '', urlFAQEn = '', navigation} = this.props;
    const urlDrawer = result(navigation, 'state.params.urlLink', '');
    const drawer = result(navigation, 'state.params.drawer', false);
    const urlFAQ = currentLanguage === 'id' ? urlFAQId : urlFAQEn;
    const urlTrue = drawer === true ? urlDrawer : urlFAQ;
    return (
      <FAQWebBiFastComponent urlFAQ={urlTrue}/>
    );
  }
}

export default connect(mapStateToProps)(FAQWebBiFastPage);