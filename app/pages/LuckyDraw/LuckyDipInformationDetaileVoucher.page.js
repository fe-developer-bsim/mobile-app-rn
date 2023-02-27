import React from 'react';
import PropTypes from 'prop-types';
import LuckyDrawTnC from '../../components/LuckyDraw/LuckyDipInformationDetaileVoucher.component';
import result from 'lodash/result';
import {connect} from 'react-redux';

const mapDispatchToProps = () => ({
});

const mapStateToProps = () => ({
});

class LuckyDipInformationDetaileVoucherPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  render () {
    const {navigation} = this.props;
    const data = result(navigation, 'state.params.data', {});
    return <LuckyDrawTnC data={data}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LuckyDipInformationDetaileVoucherPage);
