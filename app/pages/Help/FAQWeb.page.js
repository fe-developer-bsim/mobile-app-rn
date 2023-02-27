import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FAQWebComponent from '../../components/Help/FAQWeb.component';
import result from 'lodash/result';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  const currentLanguage = result(state, 'currentLanguage.id', '');
  const urlFAQId = result(state, 'config.attention.urlFAQ.url_id', '');
  const urlFAQEn = result(state, 'config.attention.urlFAQ.url_en', '');
  return {
    currentLanguage,
    urlFAQId,
    urlFAQEn
  };
};

class FAQWebPage extends Component {
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
      <FAQWebComponent urlFAQ={urlTrue}/>
    );
  }
}

export default connect(mapStateToProps)(FAQWebPage);