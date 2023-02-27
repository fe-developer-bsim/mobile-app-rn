import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList} from 'react-native';
import styles from './CategoryAlfacart.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';
import {ScrollView} from 'react-native-gesture-handler';
import {result, chunk} from 'lodash';
import {getCategoryAlfacart, getBrandEgift} from '../../utils/transformer.util';
import LinearGradient from 'react-native-linear-gradient';

class CategoryAlfacart extends React.Component {
  static propTypes = {
    goToDetail: PropTypes.func,
    nav: PropTypes.object,
    navigateTo: PropTypes.func,
    goToDetailCategory: PropTypes.func,
    dataCategory: PropTypes.string,
    category: PropTypes.array,
    listAllProductData: PropTypes.array,
    categorySeeAll: PropTypes.func,
    categoryData: PropTypes.array
  }

  state = {
    catagory: '',
    disabled: false
  }

  renderData = (type = []) => {
    const brandList = result(type, 'item.listByType', []);
    const itemChunk = chunk(brandList, 2);
    return (
      <View>
        <View><Text style={styles.brand}>{type.brandType}</Text></View>
        {itemChunk.map(this.renderCategory)}
      </View>
    );
  }

  renderCategory = (data) => {
    const {categorySeeAll} = this.props;

    return (
      <View style={styles.textBillPayStyleBL}>
        <LinearGradient colors={['#FF7B7B', '#B31F1F']} style={styles.gradientColor} locations={[0.2, 1, 1]}
          start={{x: 0.0, y: -0.2}} end={{x: 1.0, y: 0.0}}>
          <Touchable onPress={categorySeeAll(data[0].categoryCode)}>
            <SimasIcon name={getCategoryAlfacart(data[0].shortname)} size={50} style={styles.iconCategory}/>
            <Text style={styles.nameCategory}>{data[0].name}</Text>
          </Touchable>
        </LinearGradient>
        {
          data.length > 1 ?
            <LinearGradient colors={['#FF7B7B', '#B31F1F']} style={styles.gradientColor} locations={[0.2, 1, 1]}
              start={{x: 0.0, y: -0.2}} end={{x: 1.0, y: 0.0}}>
              <Touchable onPress={categorySeeAll(data[1].categoryCode)}>
                <SimasIcon name={getCategoryAlfacart(data[1].shortname)} size={50} style={styles.iconCategory}/>
                <Text style={styles.nameCategory}>{data[1].name}</Text>
              </Touchable>
            </LinearGradient>
            :

            <View />
        }
      </View>
    );
  }


  render () {
    const {category} = this.props;
    const dataCategory = getBrandEgift(category);


    return (
      <ScrollView>
        <View style={styles.containerCategory}>
          <FlatList enableEmptySections data={dataCategory} renderItem={this.renderData}/>
        </View>
      </ScrollView>
    );
  }
}

export default CategoryAlfacart;
