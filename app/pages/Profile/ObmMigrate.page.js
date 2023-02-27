import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ObmMigrate from '../../components/Profile/ObmMigrate.component';
import {clearAndResetPasswordBurgerMenu} from '../../state/thunks/onboarding.thunks';

const mapDispatchToProps = (dispatch) => ({
  registerSimobiPlus: () => {
    dispatch(clearAndResetPasswordBurgerMenu());
  },
});

const ConnectedForm = connect(null, mapDispatchToProps)(ObmMigrate);

class EasyPinUpdatePage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    registerSimobiPlus: PropTypes.func,
  }

  
  render () {
    const {registerSimobiPlus} = this.props;
    return <ConnectedForm registerSimobiPlus={registerSimobiPlus} />;
  }
}
const ConnectedMigrateScreen = connect(null, mapDispatchToProps)(EasyPinUpdatePage);
export default ConnectedMigrateScreen;
