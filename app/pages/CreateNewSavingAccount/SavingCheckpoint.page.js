import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Checkpoint from '../../components/CreateNewSavingAccount/SavingCheckpoint.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {result} from 'lodash';
import isEmpty from 'lodash/isEmpty';
import {createCreditCardForm} from '../../state/thunks/savingAccount.thunks';

const mapStateToProps = (state) => ({
  ccCheckpointData: result(state, 'checkpoint', {}),
  SavingForm1Data: result(state, 'form.SavingForm1', {}),
  SavingForm2Data: result(state, 'form.SavingForm2', {}),
  SavingForm3Data: result(state, 'form.SavingForm3', {}),
  SavingForm4Data: result(state, 'form.SavingForm4', {}),
  SavingForm5Data: result(state, 'form.SavingForm5', {}),
  SavingForm7Data: result(state, 'form.SavingForm7', {}),
  isLogin: !isEmpty(result(state, 'user', {}))
});

const mapDispatchToProps = (dispatch, props) => ({
  goToPage: (pageName) => () => dispatch(NavigationActions.navigate({routeName: pageName, params: {checkpoint: true, pageName}})),
  continueToPage: (pageName) => {
    if (pageName === 'SavingAccountFinalize') {
      const statusForm = 'SUBMIT';
      const checkpoint = result(props.navigation, 'state.params.checkpoint', false);
      dispatch(createCreditCardForm(statusForm, pageName, checkpoint));
    } else {
      dispatch(NavigationActions.navigate({routeName: pageName}));
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
    SavingForm1Data: PropTypes.object,
    SavingForm2Data: PropTypes.object,
    SavingForm3Data: PropTypes.object,
    SavingForm4Data: PropTypes.object,
    SavingForm5Data: PropTypes.object,
    SavingForm7Data: PropTypes.object,
    goToPage: PropTypes.func,
    continueToPage: PropTypes.func,
    isLogin: PropTypes.bool,
    navigation: PropTypes.object
  }

  state = {
    pageName: ''
  }

  continueToPage = (pageName) => () => {
    const {continueToPage, SavingForm7Data} = this.props;
    if (pageName === 'SavingAccountFinalize') {
      if (isEmpty(SavingForm7Data)) {
        continueToPage('SavingAccountForm7');
      } else {
        continueToPage(pageName);
      }
    } else {
      continueToPage(pageName);
    }
  }

  render () {
    const {ccCheckpointData, SavingForm1Data, SavingForm2Data, SavingForm3Data, SavingForm4Data, SavingForm5Data,
      SavingForm7Data, goToPage, isLogin, navigation} = this.props;
    const pageName = result(ccCheckpointData, 'pageName', '');
    const usingKtpData = result(ccCheckpointData, 'statusAddress', 'CHECKED');
    const progress = result(ccCheckpointData, 'progress', 0);
    const remainingProgress = result(ccCheckpointData, 'remainingProgress', 0);

    return (
      <ConnectedForm
        ccCheckpointData={ccCheckpointData} SavingForm1Data={SavingForm1Data} SavingForm2Data={SavingForm2Data} SavingForm3Data={SavingForm3Data}
        SavingForm4Data={SavingForm4Data} SavingForm5Data={SavingForm5Data} SavingForm7Data={SavingForm7Data} goToPage={goToPage} continueTo={this.continueToPage}
        pageName={pageName} progress={progress} remainingProgress={remainingProgress} usingKtpData={usingKtpData}
        isLogin={isLogin} navigation={navigation}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(CheckpointPage);
export default ConnectedFormPage;
