import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPA, getTravelInsuranceCreate} from '../../state/thunks/Insurance.thunks';
import InsuranceComponent from '../../components/Insurance/Insurance.component';
import result from 'lodash/result';
import {getFlag} from '../../state/thunks/common.thunks';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import {NavigationActions} from 'react-navigation';

const mapStateToProps = (state) => ({
  url: result(state, 'config.attention', {}),
  flags: result(state, 'config.flag', {}),
});

const mapDispatchToProps = (dispatch) => ({
  getTravelInsuranceCreate: () => dispatch(getTravelInsuranceCreate()),
  getFlag: (flagName) => dispatch(getFlag(flagName)),
  getPACreate: () => dispatch(getPA()),
  goWeb: (url) => dispatch(NavigationActions.navigate({routeName: 'DetailPA', params: {url}})),
});

class InsurancePage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    getPACreate: PropTypes.func,
    goWeb: PropTypes.func,
    getTravelInsuranceCreate: PropTypes.func,
    getFlag: PropTypes.func,
    url: PropTypes.object,
  }

  render () {
    const {getPACreate, navigation, getTravelInsuranceCreate = noop, getFlag = noop, url, goWeb} = this.props;
    const urlPADetail = result(url, 'urlPersonalAccidentDetail', '');
    return (
      <InsuranceComponent
        getPACreate = {getPACreate} {...navigation}
        goOnDetailPA={wrapMethodInFunction(goWeb, urlPADetail)} getTravelInsuranceCreate={getTravelInsuranceCreate} 
        TravelInsuranceFlag={wrapMethodInFunction(getFlag, 'flagInsuranceTravel')} PAFlag={wrapMethodInFunction(getFlag, 'flagInsurancePA')}
      />
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(InsurancePage);
