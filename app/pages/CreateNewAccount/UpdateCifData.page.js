import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UpdateCifData from '../../components/CreateNewAccount/UpdateCifData.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {result} from 'lodash';

const mapStateToProps = (state) => ({
  ccCheckpointData: result(state, 'checkpoint', {}),
});

const mapDispatchToProps = (dispatch) => ({
  goToPage: (pageName) => () => dispatch(NavigationActions.navigate({routeName: pageName, params: {existing: true}})),
  continueToPage: () => {
    dispatch(NavigationActions.navigate({routeName: 'CreditCardForm6', params: {existing: true}}));
  }
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(UpdateCifData);

class UpdateCifDataPage extends Component {

  static propTypes = {
    ccCheckpointData: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    goToPage: PropTypes.func,
    continueToPage: PropTypes.func,
  }

  state = {
    pageName: ''
  }

  render () {
    const {ccCheckpointData, goToPage, continueToPage} = this.props;
    return (
      <ConnectedForm
        ccCheckpointData={ccCheckpointData} continueToPage={continueToPage}
        goToPage={goToPage}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(UpdateCifDataPage);
export default ConnectedFormPage;
