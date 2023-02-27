import React from 'react';
import PropTypes from 'prop-types';
import ActiveListComponent from '../../components/ManageAtmCard/ActiveList.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {popUpActivate} from '../../state/thunks/dashboard.thunks';

const mapStateToProps = (state) => {
  const simasPoinHistory = result(state, 'simasPoinHistory', []);
  return {
    simasPoinHistory
  };
};

const mapDispatchToProps = (dispatch) => ({
  goToPopUpActivate: () => dispatch(popUpActivate()),
});

class ActiveList extends React.Component {

  static propTypes = {
    simasPoinHistory: PropTypes.object,
    goToPopUpActivate: PropTypes.func,
    navigation: PropTypes.object,
  }

  render () {
    const {navigation, goToPopUpActivate} = this.props;
    const cardInactive = result(navigation, 'state.params', {});
    const data = result(cardInactive, 'data', []);
    return <ActiveListComponent navigation={navigation} cardInactive={cardInactive} data={data} goToPopUpActivate={goToPopUpActivate}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ActiveList);
