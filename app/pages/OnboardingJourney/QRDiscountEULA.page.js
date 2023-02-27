import React from 'react';
import PropTypes from 'prop-types';
import QRDiscountEULA from '../../components/OnboardingJourney/QRDiscountEULA.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {goToDiscountQR} from '../../state/thunks/common.thunks';

const mapDispatchToProps = (dispatch) => ({
  goToDiscountQR: () => dispatch(goToDiscountQR()),
});

const mapStateToProps = ({config, currentLanguage}) => ({
  config,
  currentLanguage
});

class QRDiscountEULAPage extends React.Component {
  static propTypes = {
    goToDiscountQR: PropTypes.func,
    currentLanguage: PropTypes.object,
    config: PropTypes.object,
    navigation: PropTypes.object,
  }

  render () {
    const {goToDiscountQR, config, currentLanguage, navigation} = this.props;
    const lang = result(currentLanguage, 'id', 'id');
    const url = lang === 'en' ? result(config, 'attention.urlSimobiTnCQREn', '') : result(config, 'attention.urlSimobiTnCQRIn', '');
    return <QRDiscountEULA goToDiscountQR={goToDiscountQR} url={url} navigation={navigation}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRDiscountEULAPage);
