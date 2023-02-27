import React from 'react';
import PropTypes from 'prop-types';
import BlockListComponent from '../../components/ManageAtmCard/BlockList.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {popUpBlocked} from '../../state/thunks/dashboard.thunks';

const mapStateToProps = (state) => {
  const simasPoinHistory = result(state, 'simasPoinHistory', []);
  return {
    simasPoinHistory
  };
};

const mapDispatchToProps = (dispatch) => ({
  goToPopUpBlocked: () => dispatch(popUpBlocked()),
});

class BlockList extends React.Component {

  static propTypes = {
    simasPoinHistory: PropTypes.object,
    goToPopUpBlocked: PropTypes.func,
    navigation: PropTypes.object,
  }

  render () {
    const {navigation, goToPopUpBlocked} = this.props;
    const cardInactive = result(navigation, 'state.params', {});
    const data = result(cardInactive, 'data', []);
    return <BlockListComponent navigation={navigation} cardInactive={cardInactive} data={data} goToPopUpBlocked={goToPopUpBlocked}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BlockList);
