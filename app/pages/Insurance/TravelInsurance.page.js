import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getTravelInsurance} from '../../state/thunks/Insurance.thunks';
import {connect} from 'react-redux';
import TravelInsuranceComponent from '../../components/Insurance/TravelInsurance.component';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';

const mapDispatchToProps = (dispatch) => ({
  getTravelInsurance: (planType) => dispatch(getTravelInsurance(planType)),
  goWeb: (url) => dispatch(NavigationActions.navigate({routeName: 'DetailPA', params: {url}})),
});

class TravelInsurancePage extends Component {
  static propTypes ={
    getTravelInsurance: PropTypes.func,
    navigation: PropTypes.object,
    goWeb: PropTypes.func,
  }

  render () {
    const {getTravelInsurance, navigation, goWeb} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return (
      <TravelInsuranceComponent getTravelInsurance={getTravelInsurance} navParams={navParams} goDetailTravel={goWeb}/>
    );
  }


}

const connectedTravelInsurance = connect(null, mapDispatchToProps)(TravelInsurancePage);

export default connectedTravelInsurance;