import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearcheableList from '../../components/BillerTypeTenJourney/AddLocationBiller.component';
import {populateConfigData} from '../../state/thunks/common.thunks';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {change} from 'redux-form';
import {getPayeeName} from '../../state/thunks/fundTransfer.thunks';

class AddPayeeBankPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    populateAppConfig: PropTypes.func,
    goToAddArea: PropTypes.func,
    bankListData: PropTypes.array
  }
  componentDidMount () {
    this.props.populateAppConfig();
  }
  render () {
    const {goToAddArea, navigation} = this.props;
    const areaList = result(navigation, 'state.params.areaList', []);
    return <SearcheableList
      searchlist={areaList}
      goToAddArea = {goToAddArea}/>;
  }
}

const mapStateToProps = (state) => ({
  bankListData: result(state, 'valueBankList.bankList', [])
});

const mapDispatchToProps = (dispatch) => ({
  populateAppConfig: () => {
    dispatch(populateConfigData());
  },
  goToAddArea: (areaData) => () => {
    dispatch(change('BillerTypeTenFormForm', 'areaCode', areaData));
    dispatch(NavigationActions.back());
  },
  getPayeeDetails: () => dispatch(getPayeeName())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPayeeBankPage);
