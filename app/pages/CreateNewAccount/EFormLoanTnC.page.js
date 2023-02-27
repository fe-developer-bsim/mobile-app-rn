import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TermConditionLoan from '../../components/CreateNewAccount/EFormLoanTnC.component';
import {result} from 'lodash';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  pgoTncUrlEn: result(state, 'config.attention.urlSimobiTnCPGOEn', ''),
  pgoTnCUrlId: result(state, 'config.attention.urlSimobiTnCPGOIn', ''),
  currentLanguage: result(state, 'currentLanguage.id', '')
});

class TermLoanPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    pgoTncUrlEn: PropTypes.string,
    pgoTnCUrlId: PropTypes.string,
    currentLanguage: PropTypes.string
  }
  render () {
    const {pgoTncUrlEn, pgoTnCUrlId, currentLanguage} = this.props;
    const url = currentLanguage === 'en' ? pgoTncUrlEn : pgoTnCUrlId;

    return (
      <TermConditionLoan
        url={url}
      />
    );
  }
}
const ConnectedForm = connect(mapStateToProps, null)(TermLoanPage);
export default ConnectedForm;