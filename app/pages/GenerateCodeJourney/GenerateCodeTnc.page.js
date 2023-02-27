import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import GenerateCodeTnc from '../../components/GenerateCodeJourney/GenerateCodeTnc.component';
import {goToGenerateMain} from '../../state/thunks/generateCode.thunks';
import {result} from 'lodash';

const formConfig = {
  form: 'GenerateCodeTnc',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation}) => {
    const type = result(navigation, 'state.params.param', '');
    dispatch(goToGenerateMain(type, true));
  }
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  toGenerateMain: (tipe, update) => () => {
    dispatch(goToGenerateMain(tipe, update, true));
  }
});

const DecoratedForm = reduxForm(formConfig)(GenerateCodeTnc);

class GenerateCodePage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    toGenerateMain: PropTypes.func,
  };

  render () {
    const {navigation = {}, toGenerateMain} = this.props;
    return <DecoratedForm
      navigation = {navigation}
      goToGenerateMain= {toGenerateMain}
    />;
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateCodePage);
