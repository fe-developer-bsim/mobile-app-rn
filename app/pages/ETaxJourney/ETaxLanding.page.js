import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ETaxComponent from '../../components/ETaxJourney/ETaxLanding.component';
import {connect} from 'react-redux';
import {createIDBilling, gotoPayment, gotoHistory, getEtaxInfo} from '../../state/thunks/common.thunks';
import {result, isEmpty} from 'lodash';
import {checkHSMandNavigate} from '../../state/thunks/common.thunks';

const mapStateToProps = (state) => ({
  etaxInformation: result(state, 'etaxInformation', []),
  isLogin: !isEmpty(result(state, 'user', {})),
});

const mapDispatchToProps = (dispatch) => ({
  createIDBilling: (biller) => () => dispatch(createIDBilling(biller)),
  gotoPayment: (biller) => () => dispatch(gotoPayment(biller)),
  gotoHistory: (biller) => () => dispatch(gotoHistory(biller)),
  getEtaxInfo: () => dispatch(getEtaxInfo()),
  onButtonPress: (btnName, isProduct, data) => {
    dispatch(checkHSMandNavigate(btnName, isProduct, data));
  },
});

class ETaxLanding extends Component {
  static propTypes = {
    createIDBilling: PropTypes.func,
    gotoPayment: PropTypes.func,
    gotoHistory: PropTypes.func,
    navigation: PropTypes.object,
    getEtaxInfo: PropTypes.func,
    etaxInformation: PropTypes.array,
    isLogin: PropTypes.bool,
    onButtonPress: PropTypes.func,
  }
  
  componentDidMount () {
    const {getEtaxInfo, etaxInformation} = this.props;
    if (isEmpty(etaxInformation)) {
      getEtaxInfo();
    }
  }

  navgotoEasyPin = (biller) => () => {
    this.props.onButtonPress('LoginEtax', '', biller);
  }

  render () {
    const {createIDBilling, gotoPayment, gotoHistory, navigation, isLogin} = this.props;
    const biller = result(navigation, 'state.params.biller', []);
    return (
      <ETaxComponent
        createIDBilling={createIDBilling} gotoPayment={gotoPayment} gotoHistory={gotoHistory} biller={biller}
        isLogin={isLogin} gotoEasyPin={this.navgotoEasyPin}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ETaxLanding);