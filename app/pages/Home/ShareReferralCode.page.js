import React from 'react';
import PropTypes from 'prop-types';
import ReferralCodeComponent from '../../components/Home/ShareRefferalCode.component';
import {generateReferralCode} from '../../state/thunks/common.thunks';
import result from 'lodash/result';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  referralCode: result(state, 'user.referralCode'),
});

const mapDispatchToProps = (dispatch) => ({
  getReferralCode: () => {
    dispatch(generateReferralCode());
  }
});

class ReferralCodeform extends React.Component {
  static propTypes = {
    referralCode: PropTypes.string,
    getReferralCode: PropTypes.func,
  }

  componentWillMount () {
    const {referralCode} = this.props;
    if (referralCode === '' || referralCode === null || referralCode === undefined) {
      this.props.getReferralCode();
    }
  }

  render () {
    const {referralCode} = this.props;
    return (
      <ReferralCodeComponent referralCode={referralCode}/>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ReferralCodeform);
