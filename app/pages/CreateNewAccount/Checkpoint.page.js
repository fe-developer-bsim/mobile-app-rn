import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Checkpoint from '../../components/CreateNewAccount/Checkpoint.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {result, isEmpty} from 'lodash';

const mapStateToProps = (state) => ({
  ccCheckpointData: result(state, 'checkpoint', {}),
  CCForm1Data: result(state, 'form.CCForm1', {}),
  CCForm2Data: result(state, 'form.CCForm2', {}),
  CCForm3Data: result(state, 'form.CCForm3', {}),
  CCForm4Data: result(state, 'form.CCForm4', {}),
  CCForm5Data: result(state, 'form.CCForm5', {}),
  CCForm6Data: result(state, 'form.CCForm6', {}),
  CCForm7Data: result(state, 'form.CCForm7', {}),
  CCForm8Data: result(state, 'form.CCForm8', {}),
  CCForm9Data: result(state, 'form.CCForm9', {}),
  isLogin: !isEmpty(result(state, 'user', {})),
  ccCode: result(state, 'ccCode', ''),
  ccType: result(state, 'ccType', '')
});

const mapDispatchToProps = (dispatch) => ({
  goToPage: (pageName) => () => dispatch(NavigationActions.navigate({routeName: pageName, params: {checkpoint: true, pageName}})),
  continueToPage: (pageName, CCForm6Data, CCForm7Data, ccCode, ccType) => {
    const creditLimit = result(CCForm6Data, 'values.creditLimit', 0);
    const npwpNumber = result(CCForm7Data, 'values.npwpNumber', '');
    
    if (pageName === 'CreditCardFinalize') {
      if ((creditLimit === 0) && (ccCode !== 'CCT-SIMOBI-002')) {
        dispatch(NavigationActions.navigate({routeName: 'CreditCardForm6'}));
      } else {
        if (ccCode === 'CCT-SIMOBI-002') {
          if (npwpNumber === '') {
            dispatch(NavigationActions.navigate({routeName: 'CreditCardForm7'}));
          } else {
            dispatch(NavigationActions.navigate({routeName: 'CreditCardDelivery'}));
          }
        } else {
          if (ccType === 'Virtual') {
            dispatch(NavigationActions.navigate({routeName: 'CreditCardForm9'}));
          } else {
            dispatch(NavigationActions.navigate({routeName: 'CreditCardDelivery'}));
          }
        }
      }
    } else {
      if (ccCode !== 'CCT-SIMOBI-002') {
        if (pageName === 'CreditCardForm7' || pageName === 'CreditCardNPWPCamera' || 
            pageName === 'CreditCardForm8' || pageName === 'CreditCardForm9' || 
            pageName === 'CreditCardDelivery') {
          if (creditLimit === 0) {
            dispatch(NavigationActions.navigate({routeName: 'CreditCardForm6'}));
          } else {
            dispatch(NavigationActions.navigate({routeName: pageName}));            
          }
        } else {
          dispatch(NavigationActions.navigate({routeName: pageName}));
        }
      } else {
        if (npwpNumber === '') {
          dispatch(NavigationActions.navigate({routeName: 'CreditCardForm7'}));
        } else {
          dispatch(NavigationActions.navigate({routeName: pageName}));
        }
      }
    }
  }
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Checkpoint);

class CheckpointPage extends Component {

  static propTypes = {
    ccCheckpointData: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    getCheckpointCc: PropTypes.func,
    CCForm1Data: PropTypes.object,
    CCForm2Data: PropTypes.object,
    CCForm3Data: PropTypes.object,
    CCForm4Data: PropTypes.object,
    CCForm5Data: PropTypes.object,
    CCForm6Data: PropTypes.object,
    CCForm7Data: PropTypes.object,
    CCForm8Data: PropTypes.object,
    CCForm9Data: PropTypes.object,
    goToPage: PropTypes.func,
    continueToPage: PropTypes.func,
    isLogin: PropTypes.bool,
    ccCode: PropTypes.string,
    ccType: PropTypes.string
  }

  state = {
    pageName: ''
  }

  continueToPage = (pageName) => () => {
    const {continueToPage, CCForm6Data, CCForm7Data, ccCode, ccType} = this.props;
    continueToPage(pageName, CCForm6Data, CCForm7Data, ccCode, ccType);
  }

  render () {
    const {ccCheckpointData, CCForm1Data, CCForm2Data, CCForm3Data, CCForm4Data, CCForm5Data,
      CCForm6Data, CCForm7Data, CCForm8Data, CCForm9Data, goToPage, isLogin, ccType} = this.props;
    const pageName = result(ccCheckpointData, 'pageName', '');
    const usingKtpData = result(ccCheckpointData, 'statusAddress', 'CHECKED');
    const progress = result(ccCheckpointData, 'progress', 0);
    const remainingProgress = result(ccCheckpointData, 'remainingProgress', 0);

    return (
      <ConnectedForm
        ccCheckpointData={ccCheckpointData} CCForm1Data={CCForm1Data} CCForm2Data={CCForm2Data} CCForm3Data={CCForm3Data}
        CCForm4Data={CCForm4Data} CCForm5Data={CCForm5Data} CCForm6Data={CCForm6Data} CCForm7Data={CCForm7Data}
        CCForm8Data={CCForm8Data} CCForm9Data={CCForm9Data} goToPage={goToPage} continueTo={this.continueToPage}
        pageName={pageName} progress={progress} remainingProgress={remainingProgress} usingKtpData={usingKtpData}
        isLogin={isLogin} ccType={ccType}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(CheckpointPage);
export default ConnectedFormPage;
