import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ClosingTncComponent from '../../components/ManageAtmCard/ClosingTnc.component';
import {result} from 'lodash';
import {connect} from 'react-redux';
import {commitClosingAccount} from '../../state/thunks/dashboard.thunks';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', ''),
  nav: result(state, 'nav', {}),
  urlTNCEN: result(state, 'closeAccountConfig.urlSimobiTnCClosingAccountEN', ''),
  urlTNCID: result(state, 'closeAccountConfig.urlSimobiTnCClosingAccountIN', ''),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (params) => dispatch(triggerAuthNavigate('closingAccount', 0, true, 'ClosingAccAuth', params)),
  commitClosing: () => {
    dispatch(commitClosingAccount());
  }
});


class ClosingTncPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    currentLanguage: PropTypes.string,
    goToNextPage: PropTypes.func,
    nav: PropTypes.object,
    urlTNCID: PropTypes.string,
    urlTNCEN: PropTypes.string,
    commitClosing: PropTypes.func,
    triggerAuth: PropTypes.func,
  }

  state = {
    checked: false,
    showed: false
  }

  checking = () => {
    this.setState({
      checked: !this.state.checked,
    });
  }
  endReached = () => {
    this.setState({
      showed: true
    });
  }
  
  sendClosing = () => {
    const {triggerAuth, commitClosing} = this.props;
    const params = {onSubmit: commitClosing, amount: 0, isOtp: false};
    triggerAuth(params);
  };

  render () {
    const {currentLanguage, goToNextPage, nav, urlTNCID, urlTNCEN} = this.props;
    const {checked, showed} = this.state;
    const urlID = urlTNCID;
    const urlEN = urlTNCEN;

    return (
      
      <ClosingTncComponent
        onFinalizeForm={this.onFinalizeForm}
        urlTNCID={urlID}
        urlTNCEN={urlEN}
        currentLanguage={currentLanguage}
        goToNextPage={goToNextPage}
        nav={nav}
        sendClosing = {this.sendClosing}
        checking={this.checking} 
        showed={showed}
        checked={checked}
        endReached={this.endReached} 
      />
    );
  }
}
const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(ClosingTncPage);
export default ConnectedForm;
