import React from 'react';
import PropTypes from 'prop-types';
import AppVersionUpdator from '../../components/AppVersionUpdator/AppVersionUpdator.component';
import result from 'lodash/result';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  lang: result(state, 'currentLanguage.id', 'id'),
});

class AppVersionUpdatorPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    lang: PropTypes.string
  }

  closeHandler = () => this.props.navigation.goBack();

  render () {
    const isOptionalUpdate = result(this.props, 'navigation.state.params.isOptionalUpdate', true);
    const updateNote = result(this.props, 'navigation.state.params.updateNote', {});
    return <AppVersionUpdator closeHandler={this.closeHandler} isOptionalUpdate={isOptionalUpdate} lang={this.props.lang} updateNote={updateNote}/>;
  }
}

export default connect(mapStateToProps, null)(AppVersionUpdatorPage);
