import React from 'react';
import PropTypes from 'prop-types';
import FaceRecogEULA from '../../components/Profile/FaceRecogEULA.component';
import {connect} from 'react-redux';
import {changeFaceRecognition} from '../../state/thunks/profile.thunks';
import result from 'lodash/result';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', ''),
  disclaimerFaceRecog: result(state, 'config.disclaimer.faceRecogMessage', {}),
});

const mapDispatchToProps = (dispatch) => ({
  usingFaceRecogUpdate: (usingFaceRecog, isSearch) => dispatch(changeFaceRecognition(usingFaceRecog, isSearch)),
});
class FaceRecogEULAPage extends React.Component {
  static propTypes = {
    usingFaceRecogUpdate: PropTypes.func,
    navigation: PropTypes.object,
    disclaimerFaceRecog: PropTypes.object,
    currentLanguage: PropTypes.string,
  }

  updateFaceSetting = () => {
    const {usingFaceRecogUpdate, navigation} = this.props;
    const usingFaceRecog = result(navigation, 'state.params', '');
    const isSearch = result(navigation, 'state.params.isSearch', false);
    usingFaceRecogUpdate(usingFaceRecog, isSearch);
  }

  render () {
    const {disclaimerFaceRecog, currentLanguage} = this.props;
    return <FaceRecogEULA
      updateFaceSetting={this.updateFaceSetting}
      restartApp={this.restartApp}
      disclaimerFaceRecog={disclaimerFaceRecog}
      currentLanguage={currentLanguage}
      {...this.props}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceRecogEULAPage);
