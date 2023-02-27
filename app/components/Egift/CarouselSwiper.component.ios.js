import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import styles from './CarouselSwiper.styles';

const {width, height} = Dimensions.get('window');


export default class extends Component {
  static propTypes = {
    horizontal: PropTypes.bool,
    children: PropTypes.node.isRequired,
    containerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    pagingEnabled: PropTypes.bool,
    showsHorizontalScrollIndicator: PropTypes.bool,
    showsVerticalScrollIndicator: PropTypes.bool,
    bounces: PropTypes.bool,
    scrollsToTop: PropTypes.bool,
    removeClippedSubviews: PropTypes.bool,
    automaticallyAdjustContentInsets: PropTypes.bool,
    showsPagination: PropTypes.bool,
    loadMinimal: PropTypes.bool,
    loadMinimalSize: PropTypes.number,
    loadMinimalLoader: PropTypes.element,
    loop: PropTypes.bool,
    autoplay: PropTypes.bool,
    autoplayTimeout: PropTypes.number,
    autoplayDirection: PropTypes.bool,
    index: PropTypes.number,
    renderPagination: PropTypes.func,
    onIndexChanged: PropTypes.func,
    buttonWrapperStyle: PropTypes.object,
    onScrollBeginDrag: PropTypes.func,
    onMomentumScrollEnd: PropTypes.func,
    nextButton: PropTypes.func,
    prevButton: PropTypes.func,
    paginationStyle: PropTypes.object,
    version: PropTypes.string,
    onButtonPress: PropTypes.func,
    isLockedDevice: PropTypes.bool,
    onRegistrationEmoney: PropTypes.func,
    onButtonProductPress: PropTypes.func,
  }

  static defaultProps = {
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bounces: false,
    scrollsToTop: false,
    removeClippedSubviews: true,
    automaticallyAdjustContentInsets: false,
    showsPagination: true,
    loop: true,
    loadMinimal: false,
    loadMinimalSize: 1,
    autoplay: true,
    autoplayTimeout: 2.5,
    autoplayDirection: true,
    index: 0,
    onIndexChanged: () => null
  }

  state = this.initState(this.props)

  autoplayTimer = 7
  loopJumpTimer = null

  componentWillReceiveProps (nextProps) {
    if (!nextProps.autoplay && this.autoplayTimer) clearTimeout(this.autoplayTimer);
    this.setState(this.initState(nextProps));
  }

  componentDidMount () {
    this.autoplay();
  }

  componentWillUnmount () {
    this.autoplayTimer && clearTimeout(this.autoplayTimer);
    this.loopJumpTimer && clearTimeout(this.loopJumpTimer);
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.index !== nextState.index) this.props.onIndexChanged(nextState.index);
  }

  initState (props) {
    const state = this.state || {width: 0, height: 0, offset: {x: 0, y: 0}};

    const initState = {
      autoplayEnd: false,
      loopJump: false
    };

    initState.total = props.children ? props.children.length || 1 : 0;

    if (state.total === initState.total) {
      initState.index = state.index;
    } else {
      initState.index = initState.total > 1 ? Math.min(props.index, initState.total - 1) : 0;
    }

    initState.dir = props.horizontal === false ? 'y' : 'x';
    initState.width = props.width || width;
    initState.height = props.height || height;

    this.internals = {
      ...this.internals,
      isScrolling: false
    };
    return initState;
  }

  fullState () {
    return Object.assign({}, this.state, this.internals);
  }

  onLayout = (event) => {
    const {width, height} = event.nativeEvent.layout;
    const offset = this.internals.offset = {};
    const state = {width, height};

    if (this.state.total > 1) {
      let setup = this.state.index;
      if (this.props.loop) {
        setup++;
      }
      offset[this.state.dir] = this.state.dir === 'y'
        ? height * setup
        : width * setup;
    }

    if (width !== this.state.width || height !== this.state.height) {
      state.offset = offset;
    }
    this.setState(state);
  }

  loopJump = () => {
    if (!this.state.loopJump) return;
    const i = this.state.index + (this.props.loop ? 1 : 0);
    const scrollView = this.refs.scrollView;
    this.loopJumpTimer = setTimeout(() => scrollView.setPageWithoutAnimation &&
      scrollView.setPageWithoutAnimation(i), 50);
  }

  autoplay = () => {
    if (!Array.isArray(this.props.children) ||
      !this.props.autoplay ||
      this.internals.isScrolling ||
      this.state.autoplayEnd) return;

    this.autoplayTimer && clearTimeout(this.autoplayTimer);
    this.autoplayTimer = setTimeout(() => {
      if (!this.props.loop && (
        this.props.autoplayDirection
          ? this.state.index === this.state.total - 1
          : this.state.index === 0
      )
      ) return this.setState({autoplayEnd: true});

      this.scrollBy(this.props.autoplayDirection ? 1 : -1);
    }, this.props.autoplayTimeout * 1000);
  }

  onScrollBegin = (e) => {
    this.internals.isScrolling = true;
    this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e, this.fullState(), this);
  }

  onScrollEnd = (e) => {
    this.internals.isScrolling = false;
    if (!e.nativeEvent.contentOffset) {
      if (this.state.dir === 'x') {
        e.nativeEvent.contentOffset = {x: e.nativeEvent.position * this.state.width};
      } else {
        e.nativeEvent.contentOffset = {y: e.nativeEvent.position * this.state.height};
      }
    }

    this.updateIndex(e.nativeEvent.contentOffset, this.state.dir, () => {
      this.autoplay();
      this.loopJump();
      this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(e, this.fullState(), this);
    });
  }

  onScrollEndDrag = (e) => {
    const {contentOffset} = e.nativeEvent;
    const {horizontal, children} = this.props;
    const {index} = this.state;
    const {offset} = this.internals;
    const previousOffset = horizontal ? offset.x : offset.y;
    const newOffset = horizontal ? contentOffset.x : contentOffset.y;

    if (previousOffset === newOffset &&
      (index === 0 || index === children.length - 1)) {
      this.internals.isScrolling = false;
    }
  }

  updateIndex = (offset, dir, cb) => {
    const state = this.state;
    let index = state.index;
    const diff = offset[dir] - this.internals.offset[dir];
    const step = dir === 'x' ? state.width : state.height;
    let loopJump = false;

    if (!diff) return;

    index = parseInt(index + Math.round(diff / step));

    if (this.props.loop) {
      if (index <= -1) {
        index = state.total - 1;
        offset[dir] = step * state.total;
        loopJump = true;
      } else if (index >= state.total) {
        index = 0;
        offset[dir] = step;
        loopJump = true;
      }
    }

    const newState = {};
    newState.index = index;
    newState.loopJump = loopJump;

    this.internals.offset = offset;

    if (loopJump) {
      if (offset[dir] === this.internals.offset[dir]) {
        newState.offset = {x: 0, y: 0};
        newState.offset[dir] = offset[dir] + 1;
        this.setState(newState, () => {
          this.setState({offset: offset}, cb);
        });
      } else {
        newState.offset = offset;
        this.setState(newState, cb);
      }
    } else {
      this.setState(newState, cb);
    }
  }

  scrollBy = (index, animated = true) => {
    if (this.internals.isScrolling || this.state.total < 2) return;
    const state = this.state;
    const diff = (this.props.loop ? 1 : 0) + index + this.state.index;
    let x = 0;
    let y = 0;
    if (state.dir === 'x') x = diff * state.width;
    if (state.dir === 'y') y = diff * state.height;
    this.refs.scrollView && this.refs.scrollView.scrollTo({x, y, animated});
    this.internals.isScrolling = true;
    this.setState({
      autoplayEnd: false
    });
  }

  scrollViewPropOverrides = () => {
    const props = this.props;
    let overrides = {};

    for (let prop in props) {
      if (typeof props[prop] === 'function' &&
        prop !== 'onMomentumScrollEnd' &&
        prop !== 'renderPagination' &&
        prop !== 'onScrollBeginDrag'
      ) {
        let originResponder = props[prop];
        overrides[prop] = (e) => originResponder(e, this.fullState(), this);
      }
    }
    return overrides;
  }

  renderPagination = () => {
    if (this.state.total <= 1) return null;
    let dots = [];
    const ActiveDot = <View style={styles.activeDot} />;
    const Dot = <View style={styles.dot} />;
    for (let i = 0; i < this.state.total; i++) {
      dots.push(i === this.state.index
        ? React.cloneElement(ActiveDot, {key: i})
        : React.cloneElement(Dot, {key: i})
      );
    }

    return (
      <View pointerEvents='none' style={[styles['pagination_' + this.state.dir], this.props.paginationStyle]}>
        {dots}
      </View>
    );
  }

  renderScrollView = (pages) => (
    <ScrollView ref='scrollView'
      {...this.props}
      {...this.scrollViewPropOverrides()}
      contentContainerStyle={[styles.wrapperIOS, this.props.style]}
      contentOffset={this.state.offset}
      onScrollBeginDrag={this.onScrollBegin}
      onMomentumScrollEnd={this.onScrollEnd}
      onScrollEndDrag={this.onScrollEndDrag}>
      {pages}
    </ScrollView>
  )


  render () {
    const {
      index,
      total,
    } = this.state;
    const {
      children,
      loop,
      loadMinimal,
      loadMinimalSize,
      loadMinimalLoader,
      renderPagination,
      showsPagination,
    } = this.props;
    const loopVal = loop ? 1 : 0;
    let pages = [];

    const pageStyle = [styles.pageStyle, styles.slide];

    if (total > 1) {
      pages = Object.keys(children);
      if (loop) {
        pages.unshift(total - 1 + '');
        pages.push('0');
      }

      pages = pages.map((page, i) => {
        if (loadMinimal) {
          if (i >= (index + loopVal - loadMinimalSize) &&
            i <= (index + loopVal + loadMinimalSize)) {
            return <View style={pageStyle} key={i}>{children[page]}</View>;
          } else {
            return (
              <View style={styles.pageStyleLoading} key={i}>
                {loadMinimalLoader ? loadMinimalLoader : <ActivityIndicator />}
              </View>
            );
          }
        } else {
          return <View style={pageStyle} key={i}>{children[page]}</View>;
        }
      });
    } else {
      pages = <View style={pageStyle} key={0}>{children}</View>;
    }

    return (
      <View style={[styles.containerContent]} onLayout={this.onLayout}>
        {this.renderScrollView(pages)}
        {showsPagination && (renderPagination
          ? renderPagination(index, total, this)
          : this.renderPagination())}
      </View>
    );
  }
}
