import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {checkingActivation} from '../../state/thunks/openingAccount.thunks';
import WebCreateSignComponent from '../../components/OpeningAccountJourney/WebViewCreateSign.component';
import result from 'lodash/result';
import startsWith from 'lodash/startsWith';

const mapDispatchToProps = (dispatch) => ({
  goCheckSign: (dataActivation) => dispatch(checkingActivation(dataActivation)),
});

const mapStateToProps = () => ({
});

class WebCreateSignPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goCheckSign: PropTypes.func
  }
  state = {
    isDisabled: true
  }

  goCheckStatusActivation= () => {
    const {navigation = {}, goCheckSign} = this.props;
    const dataActivation = result(navigation, 'state.params.dataActivation', '');
    goCheckSign(dataActivation);
  }
  render () {
    const {navigation = []} = this.props;
    const urlCreate = result(navigation, 'state.params.htmlCode', '');
    const checkUrl = startsWith(urlCreate, 'http') ? {uri: urlCreate} : {html: urlCreate};
    return (
      <WebCreateSignComponent goCheckSign = {this.goCheckStatusActivation} urlCreate={checkUrl}/>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(WebCreateSignPage);
