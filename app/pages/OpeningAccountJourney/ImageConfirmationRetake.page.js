import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImageConfirmation from '../../components/OpeningAccountJourney/ImageConfirmationRetake.component';
import {result} from 'lodash';
import {reduxForm} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import {RetakeSelfieCamera} from '../../state/thunks/openingAccount.thunks';

const formConfig = {
  form: 'ImageConfirmation',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {base64Image, RetakeSelfieCamera, allData}) => {
    RetakeSelfieCamera(base64Image, allData);
  }
};

const mapDispatchToProps = (dispatch) => ({
  goToCamera: () => {
    dispatch(NavigationActions.back());
    dispatch(NavigationActions.navigate({routeName: 'RetakeSelfiePage'}));
  },
  RetakeSelfieCamera: (data, allData) => {
    dispatch(RetakeSelfieCamera(data, allData));
  }

});

const CreditCardForm = reduxForm(formConfig)(ImageConfirmation);

class ImageConfirmationPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToCamera: PropTypes.func,
    imageRotate: PropTypes.string,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
    RetakeSelfieCamera: PropTypes.func
  }
  
  backToCamera = () => {
    const {goToCamera, navigation} = this.props;
    const goBackToRoute = result(navigation, 'state.params.route', '');
    goToCamera(goBackToRoute);
  }

  render () {
    const {navigation, RetakeSelfieCamera} = this.props;
    const base64Image = result(navigation, 'state.params.data', '');
    const allData = result(navigation, 'state.params.allData', '');
    const imageRotate = '0deg';
    return (
      <CreditCardForm base64Image={base64Image} navigation={navigation} allData={allData} RetakeSelfieCamera={RetakeSelfieCamera} backToCamera={this.backToCamera} imageRotate={imageRotate}/>
    );
  }
}

export default connect(null, mapDispatchToProps)(ImageConfirmationPage);
