import React from 'react';
import PropTypes from 'prop-types';
import {Animated, View} from 'react-native';
import {Svg, Path, G, Circle} from 'react-native-svg';
import {svgPathProperties} from 'svg-path-properties';
import Color from 'color';

export default class CircularProgress extends React.PureComponent {
  polarToCartesian (centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  circlePath (x, y, radius, startAngle, endAngle) {
    var start = this.polarToCartesian(x, y, radius, endAngle * 0.9999);
    var end = this.polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y];
    return d.join(' ');
  }

  clampFill = (fill) => Math.min(100, Math.max(0, fill));

  render () {
    const {
      size,
      width,
      backgroundWidth,
      tintTransparency,
      backgroundColor,
      style,
      rotation,
      lineCap,
      fillLineCap = lineCap,
      arcSweepAngle,
      fill,
      children,
      childrenContainerStyle,
      padding,
      renderCap,
      dashedBackground,
      selectedCollor
    } = this.props;

    const maxWidthCircle = backgroundWidth ? Math.max(width, backgroundWidth) : width;
    const sizeWithPadding = size / 2 + padding / 2;
    const radius = size / 2 - maxWidthCircle / 2 - padding / 2;

    const currentFillAngle = (arcSweepAngle * this.clampFill(fill)) / 100;
    const backgroundPath = this.circlePath(
      sizeWithPadding,
      sizeWithPadding,
      radius,
      tintTransparency ? 0 : currentFillAngle,
      arcSweepAngle
    );
    const circlePath = this.circlePath(
      sizeWithPadding,
      sizeWithPadding,
      radius,
      0,
      currentFillAngle
    );
    const coordinate = this.polarToCartesian(
      sizeWithPadding,
      sizeWithPadding,
      radius,
      currentFillAngle
    );
    const cap = renderCap ? renderCap({center: coordinate}) : null;

    const offset = size - maxWidthCircle * 2;

    const localChildrenContainerStyle = {
      ...{
        position: 'absolute',
        left: maxWidthCircle + padding / 2,
        top: maxWidthCircle + padding / 2,
        width: offset,
        height: offset,
        borderRadius: offset / 2,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      ...childrenContainerStyle,
    };

    const strokeDasharrayBackground = dashedBackground.gap > 0 ?
      Object.values(dashedBackground).
        map((value) => parseInt(value))
      : null;
    const collorArray = selectedCollor;
    const precision = 1;
    const percent = 1;
    const path = new svgPathProperties(circlePath);
    const pathList = quads(samples(path, precision));
    const percent_ = Math.max(0, Math.min(percent, 1));
    const croppedPathIndex = Math.round(pathList.length * percent_);
    const gradientArray = interpolateColors(collorArray, pathList.length);
    const roundedCorners = true;
    const PATH_START = path.getPointAtLength(0);
    const PATH_END = path.getPointAtLength(
      Math.round(path.getTotalLength() * percent_),
    );

    return (
      <View style={style}>
        <Svg width={size + padding} height={size + padding}>
          <G rotation={rotation} originX={(size + padding) / 2} originY={(size + padding) / 2}>
            {backgroundColor && (
              <Path
                d={backgroundPath}
                stroke={backgroundColor}
                strokeWidth={backgroundWidth || width}
                strokeLinecap={lineCap}
                strokeDasharray={strokeDasharrayBackground}
                fill='transparent'
              />
            )}
            {roundedCorners && (
              <G>
                <Circle
                  cx={PATH_START.x}
                  cy={PATH_START.y}
                  r={width / 2}
                  fill={gradientArray[0]}
                />
                <Circle
                  cx={PATH_END.x}
                  cy={PATH_END.y}
                  r={width / 2}
                  fill={gradientArray[croppedPathIndex - 1]}
                />
              </G>
            )}
            {fill > 0 && 
              pathList.map((pathSegment, i) => {
                if (i < croppedPathIndex) {
                  return (
                    <Path
                      key={`gradient-path-segment-${i}`}
                      d={lineJoin(
                        pathSegment[0],
                        pathSegment[1],
                        pathSegment[2],
                        pathSegment[3],
                        width,
                      )}
                      stroke={gradientArray[i]}
                      fill={gradientArray[i]}
                      strokeLinecap={fillLineCap}
                    />
                  );
                }
              })
            }
            {cap}
          </G>
        </Svg>
        {children && <View style={localChildrenContainerStyle}>{children(fill)}</View>}
      </View>
    );
  }
}

CircularProgress.propTypes = {
  style: PropTypes.object,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Animated.Value),
  ]).isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string,
  tintTransparency: PropTypes.bool,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  lineCap: PropTypes.string,
  arcSweepAngle: PropTypes.number,
  children: PropTypes.func,
  childrenContainerStyle: PropTypes.object,
  padding: PropTypes.number,
  renderCap: PropTypes.func,
  dashedBackground: PropTypes.object,
  dashedTint: PropTypes.object,
  selectedCollor: PropTypes.array,
  fillLineCap: PropTypes.string,
};

CircularProgress.defaultProps = {
  tintColor: 'black',
  tintTransparency: true,
  rotation: 90,
  lineCap: 'butt',
  arcSweepAngle: 360,
  padding: 10,
  dashedBackground: {width: 0, gap: 0},
  dashedTint: {width: 0, gap: 0},
};

function quads (points) {
  return [...Array(points.length - 1).keys()].map(function (i) {
    const a = [points[i - 1], points[i], points[i + 1], points[i + 2]];
    a.t = (points[i].t + points[i + 1].t) / 2;
    return a;
  });
}

function samples (path, precision) {
  const n = path.getTotalLength();
  const normalizedLengths = [0];
  const dt = precision;
  for (let i = dt; i < n; i += dt) {
    normalizedLengths.push(i);
  }
  normalizedLengths.push(n);
  return normalizedLengths.map((t) => {
    var p = path.getPointAtLength(t),
      a = [p.x, p.y];
    a.t = t / n;
    return a;
  });
}

function lineJoin (p0, p1, p2, p3, width) {
  const u12 = perp(p1, p2);
  const r = width / 2;
  let a = [p1[0] + u12[0] * r, p1[1] + u12[1] * r];
  let b = [p2[0] + u12[0] * r, p2[1] + u12[1] * r];
  let c = [p2[0] - u12[0] * r, p2[1] - u12[1] * r];
  let d = [p1[0] - u12[0] * r, p1[1] - u12[1] * r];

  if (p0) {
    // clip ad and dc using average of u01 and u12
    var u01 = perp(p0, p1),
      e1 = [p1[0] + u01[0] + u12[0], p1[1] + u01[1] + u12[1]];
    a = lineIntersect(p1, e1, a, b);
    d = lineIntersect(p1, e1, d, c);
  }

  if (p3) {
    // clip ab and dc using average of u12 and u23
    var u23 = perp(p2, p3),
      e = [p2[0] + u23[0] + u12[0], p2[1] + u23[1] + u12[1]];
    b = lineIntersect(p2, e, a, b);
    c = lineIntersect(p2, e, d, c);
  }

  return 'M' + a + 'L' + b + ' ' + c + ' ' + d + 'Z';
}

function perp (p0, p1) {
  const u01x = p0[1] - p1[1];
  const u01y = p1[0] - p0[0];
  const u01d = Math.sqrt(u01x * u01x + u01y * u01y);
  return [u01x / u01d, u01y / u01d];
}

function lineIntersect (a, b, c, d) {
  const x1 = c[0];
  const x3 = a[0];
  const x21 = d[0] - x1;
  const x43 = b[0] - x3;
  const y1 = c[1];
  const y3 = a[1];
  const y21 = d[1] - y1;
  const y43 = b[1] - y3;
  const ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
  return [x1 + ua * x21, y1 + ua * y21];
}

function interpolateColors (colors, colorCount) {
  if (colors.length === 0) {
    return Array(colorCount).fill('#000000');
  }
  if (colors.length === 1) {
    return Array(colorCount).fill(colors[0]);
  }
  const colorArray = [];

  for (let i = 0; i < colors.length - 1; i++) {
    const start = Color(colors[i]).object();
    const end = Color(colors[i + 1]).object();
    colorArray.push(Color(start).hex());
    const segmentLength =
      i === colors.length - 2
        ? colorCount - colorArray.length - 1
        : Math.round(colorCount / colors.length);

    const deltaBlend = 1.0 / (segmentLength + 1);
    for (
      let j = 0, blend = deltaBlend;
      j < segmentLength;
      j++, blend += deltaBlend
    ) {
      const r = end.r * blend + (1 - blend) * start.r;
      const g = end.g * blend + (1 - blend) * start.g;
      const b = end.b * blend + (1 - blend) * start.b;

      colorArray.push(Color.rgb(r, g, b).hex());
    }
  }

  colorArray.push(Color(colors[colors.length - 1]).hex());
  return colorArray;
}
