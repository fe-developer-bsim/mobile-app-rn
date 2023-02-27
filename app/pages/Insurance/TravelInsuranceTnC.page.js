import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TravelInsuranceTnC from '../../components/Insurance/TravelInsuranceTnC.component';
import result from 'lodash/result';

class TravelInsuranceTnCPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  render () {
    const {navigation} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return (
      <TravelInsuranceTnC navParams={navParams}/>
    );
  }
}

export default TravelInsuranceTnCPage;