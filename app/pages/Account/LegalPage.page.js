import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LegalPageAccount from '../../components/Account/LegalPage.component';
import result from 'lodash/result';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  const currentLanguage = result(state, 'currentLanguage.id', '');
  return {
    currentLanguage,
  };
};

class LegalWebPage extends Component {
  static propTypes = {
    currentLanguage: PropTypes.string,
    navigation: PropTypes.object,
  }

  render () {
    const {currentLanguage = '', navigation} = this.props;
    const singleBilingual = result(navigation, 'state.params.singleBilingual', 'yes');
    const urlDrawer = singleBilingual === 'yes' ? result(navigation, 'state.params.urlLink', '') : currentLanguage === 'id' ? result(navigation, 'state.params.urlLink.url_id', '') : result(navigation, 'state.params.urlLink.url_en', '');
    return (
      <LegalPageAccount urlLegal={urlDrawer}/>
    );
  }
}

export default connect(mapStateToProps)(LegalWebPage);