import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Linking} from 'react-native';
import Image from 'react-native-image-progress';
import styles from './CgvMovieDetail.styles';
import {SinarmasButton} from '../FormComponents';
import result from 'lodash/result';
import {theme} from '../../styles/core.styles';
import Bar from 'react-native-progress/Bar';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
import noop from 'lodash/noop';

class CgvMovie extends React.Component {
  static propTypes = {
    offer: PropTypes.object,
    onOfferClick: PropTypes.func,
    param: PropTypes.object,
    onMovieClick: PropTypes.func,
    tipe: PropTypes.string,
  }

  state = {
    synopsisShow: false,
  }

  showingSynopsis = () => {
    this.setState({synopsisShow: !this.synopsisShow});
  }


  openLink = (termsLink) => () => {
    Linking.canOpenURL(termsLink).then((supported) => {
      if (supported) {
        Linking.openURL(termsLink);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
      }
    });
  };

  render () {
    const {param, onMovieClick = noop, tipe} = this.props;
    const synopsis = result(param, 'synopsis', '');
    const synopsisFalse = synopsis.substring(0, 200);

    return (
      <View style={styles.container}>
        <ScrollView>

          <View style={styles.containerImg}>
            <Image source={{uri: result(param, 'movieImageUrl', '-')}} resizeMode={'stretch'} indicator={Bar} indicatorProps={{
              showsText: true,
              color: theme.brand,
              size: 50,
              thickness: 2
            }} style={styles.offerImage}
            />
          </View>

          <View style={styles.containerDetailCinemaTrailer}>
            <View style={styles.containerDetailRowTrailer}>
              <View style={styles.rowLeft}>
                <Text style={styles.showingSynopsisTittle}>{language.CGV_MOVIE_DETAIL_SEE_TRAILER}</Text>
              </View>
              <View style={styles.rowRight}>
                <SimasIcon style={styles.playButton} onPress={this.openLink(result(param, 'trailerLinkUrl', '-'))} name={'play-trailer'} size={25} />
              </View>
            </View>
          </View>

          <View style={styles.line} />
          <View style={styles.containerDetailCinema}>
            <View style={styles.containerDetailRow}>
              <Text>{result(param, 'movieName', '-')}</Text>
            </View>
            {this.state.synopsisShow ?
              <Text>{result(param, 'synopsis', '-')}</Text>
              :
              <View>
                <Text>{synopsisFalse}</Text>
                <Touchable onPress={this.showingSynopsis}><Text style={styles.showingSynopsis}>{language.CGV_MOVIE_DETAIL_BTN_NEXT}</Text></Touchable>
              </View>
            }
          </View>

          <View style={styles.line} />
          <View style={styles.containerDetail}>
            <Text style={styles.detailTextTittle}>{language.CGV_MOVIE_DETAIL_TEXT_TITTLE}</Text>
            <View style={styles.containerDetailRow}>
              <Text>{language.CGV_MOVIE_DETAIL_DIRECTOR}</Text>
              <Text>{result(param, 'Director', '-')}</Text>
            </View>
            <View style={styles.containerDetailRow}>
              <Text>{language.CGV_MOVIE_DETAIL_DURATION}</Text>
              <Text>{result(param, 'duration', '-')} Min</Text>
            </View>
            <View style={styles.containerDetailRow}>
              <Text>{language.CGV_MOVIE_DETAIL_LANG}</Text>
              <Text>{result(param, 'language', '-')}</Text>
            </View>
            <View style={styles.containerDetailRow}>
              <Text>{language.CGV_MOVIE_DETAIL_SUBTITLE}</Text>
              <Text>{result(param, 'subtitle', '-')}</Text>
            </View>
            <View style={styles.containerDetailRow}>
              <Text>{language.CGV_MOVIE_DETAIL_GENRE}</Text>
              <Text>{result(param, 'genre', '-')}</Text>
            </View>
            <View style={styles.containerDetailRow}>
              <Text>{language.CGV_MOVIE_DETAIL_RATING}</Text>
              <Text>{result(param, 'grade', '-')}</Text>
            </View>
          </View>

          {tipe !== 'comingSoon' ?
            <View style={styles.lineGrey} />
            :
            null}
        </ScrollView>

        {tipe !== 'comingSoon' ?
          <View style={styles.containerDetailCinemaButton}>
            <View style={styles.lineGreyButton} />
            <View style={styles.containerDetailCinema}>
              <SinarmasButton onPress={onMovieClick(param)}>
                <Text style={styles.buttonLargeTextStyle}>{language.CGV_MOVIE_DETAIL_BTN_BUY_TICKET}</Text>
              </SinarmasButton>
            </View>
          </View>
          :
          null
        }
      </View>
    );
  }
}

export default CgvMovie;
