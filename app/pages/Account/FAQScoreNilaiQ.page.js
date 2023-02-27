import React from 'react';
import PropTypes from 'prop-types';
import FAQScoreNilaiQ from '../../components/Account/FAQScoreNilaiQ.component';
import result from 'lodash/result';
import {connect} from 'react-redux';


const mapStateToProps = ({config, currentLanguage}) => ({
  config,
  currentLanguage
});

class FAQScoreNilaiQPage extends React.Component {
  static propTypes = {
    currentLanguage: PropTypes.object,
    config: PropTypes.object,
  }

  render () {
    const {config, currentLanguage} = this.props;
    const lang = result(currentLanguage, 'id', 'id');
    const url = lang === 'en' ? result(config, 'nilaiQ_FAQ.en', '') : result(config, 'nilaiQ_FAQ.id', '');
    return <FAQScoreNilaiQ urlFAQ={url}/>;
  }
}

export default connect(mapStateToProps, null)(FAQScoreNilaiQPage);
