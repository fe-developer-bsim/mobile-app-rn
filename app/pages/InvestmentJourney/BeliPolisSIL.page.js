import React from 'react';
import PropTypes from 'prop-types';
import BeliPolisSIL from '../../components/InvestmentJourney/BeliPolisSIL.component';
import {beliPolisSIL, beliPolisSILData} from '../../state/thunks/dashboard.thunks';
import result from 'lodash/result';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', 'id')  
});

const mapDispatchToProps = (dispatch) => ({
  goToNextPage: (item) => () => {
    if (item.code === 'beliPolisSIL') {
      dispatch(beliPolisSILData(item));
    } else {
      dispatch(beliPolisSIL(item));
    }
  }
});

class BeliPolisSILform extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToNextPage: PropTypes.func,
  }


  render () {
    const {navigation, goToNextPage} = this.props;
    const items = result(navigation, 'state.params.item');
    return (
      <BeliPolisSIL items={items} goToNextPage={goToNextPage}/>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BeliPolisSILform);