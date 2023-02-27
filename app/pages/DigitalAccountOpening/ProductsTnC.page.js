import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProductsTnCComp from '../../components/DigitalAccountOpening/ProductsTnC.component';
import {result} from 'lodash';
import {connect} from 'react-redux';
import {goToNextPage} from '../../state/thunks/digitalAccountOpening.thunks';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
// let Analytics = firebase.analytics();

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', ''),
  nav: result(state, 'nav', {}),
  urlTNCID: result(state, 'productData.productTnCID', ''),
  urlTNCEN: result(state, 'productData.productTnCEN', ''),
});

const mapDispatchToProps = (dispatch) => ({
  goToNextPage: (nav) => () => dispatch(goToNextPage(nav)),
});

class ProductsTnc extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    currentLanguage: PropTypes.string,
    goToNextPage: PropTypes.func,
    nav: PropTypes.object,
    urlTNCID: PropTypes.string,
    urlTNCEN: PropTypes.string,
  }

  componentDidMount = () => {
    // const {navigation} = this.props;
    // const firebaseEmoney = result(navigation, 'state.params.firebaseEmoney', false);
    // if (firebaseEmoney === true) {
    //   Analytics.logEvent('REGIST_EMONEY', {device: Platform.OS, step_route: '2-3'});
    // }
  }

  state = {
    checked: false,
    showed: false
  }

  checking = () => {
    this.setState({
      checked: !this.state.checked,
    });
  }
  endReached = () => {
    this.setState({
      showed: true
    });
  }

  render () {
    const {currentLanguage, goToNextPage, nav, urlTNCID, urlTNCEN} = this.props;
    const {checked, showed} = this.state;
    return (
      <ProductsTnCComp
        onFinalizeForm={this.onFinalizeForm}
        urlTNCID={urlTNCID}
        urlTNCEN={urlTNCEN}
        currentLanguage={currentLanguage}
        goToNextPage={goToNextPage}
        nav={nav}
        checking={this.checking} 
        endReached={this.endReached} 
        showed={showed} checked={checked}
      />
    );
  }
}
const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(ProductsTnc);
export default ConnectedForm;