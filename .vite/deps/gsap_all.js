import {
  Back,
  Bounce,
  CSSPlugin,
  Circ,
  Cubic,
  Elastic,
  Expo,
  Linear,
  Power0,
  Power1,
  Power2,
  Power3,
  Power4,
  Quad,
  Quart,
  Quint,
  Sine,
  SteppedEase,
  Strong,
  Timeline,
  Tween,
  clamp,
  distribute,
  getUnit,
  gsap,
  interpolate,
  mapRange,
  normalize,
  pipe,
  random,
  selector,
  shuffle,
  snap,
  splitColor,
  toArray,
  unitize,
  wrap,
  wrapYoyo
} from "./chunk-DN3JEOHO.js";
import "./chunk-5WRI5ZAA.js";

// node_modules/gsap/utils/paths.js
var _svgPathExp = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig;
var _numbersExp = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig;
var _scientific = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig;
var _selectorExp = /(^[#\.][a-z]|[a-y][a-z])/i;
var _DEG2RAD = Math.PI / 180;
var _RAD2DEG = 180 / Math.PI;
var _sin = Math.sin;
var _cos = Math.cos;
var _abs = Math.abs;
var _sqrt = Math.sqrt;
var _atan2 = Math.atan2;
var _largeNum = 1e8;
var _isString = function _isString2(value) {
  return typeof value === "string";
};
var _isNumber = function _isNumber2(value) {
  return typeof value === "number";
};
var _isUndefined = function _isUndefined2(value) {
  return typeof value === "undefined";
};
var _temp = {};
var _temp2 = {};
var _roundingNum = 1e5;
var _wrapProgress = function _wrapProgress2(progress) {
  return Math.round((progress + _largeNum) % 1 * _roundingNum) / _roundingNum || (progress < 0 ? 0 : 1);
};
var _round = function _round2(value) {
  return Math.round(value * _roundingNum) / _roundingNum || 0;
};
var _roundPrecise = function _roundPrecise2(value) {
  return Math.round(value * 1e10) / 1e10 || 0;
};
var _splitSegment = function _splitSegment2(rawPath, segIndex, i2, t) {
  var segment = rawPath[segIndex], shift = t === 1 ? 6 : subdivideSegment(segment, i2, t);
  if ((shift || !t) && shift + i2 + 2 < segment.length) {
    rawPath.splice(segIndex, 0, segment.slice(0, i2 + shift + 2));
    segment.splice(0, i2 + shift);
    return 1;
  }
};
var _getSampleIndex = function _getSampleIndex2(samples, length, progress) {
  var l = samples.length, i2 = ~~(progress * l);
  if (samples[i2] > length) {
    while (--i2 && samples[i2] > length) {
    }
    i2 < 0 && (i2 = 0);
  } else {
    while (samples[++i2] < length && i2 < l) {
    }
  }
  return i2 < l ? i2 : l - 1;
};
var _reverseRawPath = function _reverseRawPath2(rawPath, skipOuter) {
  var i2 = rawPath.length;
  skipOuter || rawPath.reverse();
  while (i2--) {
    rawPath[i2].reversed || reverseSegment(rawPath[i2]);
  }
};
var _copyMetaData = function _copyMetaData2(source, copy) {
  copy.totalLength = source.totalLength;
  if (source.samples) {
    copy.samples = source.samples.slice(0);
    copy.lookup = source.lookup.slice(0);
    copy.minLength = source.minLength;
    copy.resolution = source.resolution;
  } else if (source.totalPoints) {
    copy.totalPoints = source.totalPoints;
  }
  return copy;
};
var _appendOrMerge = function _appendOrMerge2(rawPath, segment) {
  var index = rawPath.length, prevSeg = rawPath[index - 1] || [], l = prevSeg.length;
  if (index && segment[0] === prevSeg[l - 2] && segment[1] === prevSeg[l - 1]) {
    segment = prevSeg.concat(segment.slice(2));
    index--;
  }
  rawPath[index] = segment;
};
var _bestDistance;
function getRawPath(value) {
  value = _isString(value) && _selectorExp.test(value) ? document.querySelector(value) || value : value;
  var e = value.getAttribute ? value : 0, rawPath;
  if (e && (value = value.getAttribute("d"))) {
    if (!e._gsPath) {
      e._gsPath = {};
    }
    rawPath = e._gsPath[value];
    return rawPath && !rawPath._dirty ? rawPath : e._gsPath[value] = stringToRawPath(value);
  }
  return !value ? console.warn("Expecting a <path> element or an SVG path data string") : _isString(value) ? stringToRawPath(value) : _isNumber(value[0]) ? [value] : value;
}
function copyRawPath(rawPath) {
  var a = [], i2 = 0;
  for (; i2 < rawPath.length; i2++) {
    a[i2] = _copyMetaData(rawPath[i2], rawPath[i2].slice(0));
  }
  return _copyMetaData(rawPath, a);
}
function reverseSegment(segment) {
  var i2 = 0, y;
  segment.reverse();
  for (; i2 < segment.length; i2 += 2) {
    y = segment[i2];
    segment[i2] = segment[i2 + 1];
    segment[i2 + 1] = y;
  }
  segment.reversed = !segment.reversed;
}
var _createPath = function _createPath2(e, ignore) {
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path"), attr = [].slice.call(e.attributes), i2 = attr.length, name;
  ignore = "," + ignore + ",";
  while (--i2 > -1) {
    name = attr[i2].nodeName.toLowerCase();
    if (ignore.indexOf("," + name + ",") < 0) {
      path.setAttributeNS(null, name, attr[i2].nodeValue);
    }
  }
  return path;
};
var _typeAttrs = {
  rect: "rx,ry,x,y,width,height",
  circle: "r,cx,cy",
  ellipse: "rx,ry,cx,cy",
  line: "x1,x2,y1,y2"
};
var _attrToObj = function _attrToObj2(e, attrs) {
  var props = attrs ? attrs.split(",") : [], obj = {}, i2 = props.length;
  while (--i2 > -1) {
    obj[props[i2]] = +e.getAttribute(props[i2]) || 0;
  }
  return obj;
};
function convertToPath(element, swap) {
  var type = element.tagName.toLowerCase(), circ = 0.552284749831, data, x, y, r, ry, path, rcirc, rycirc, points, w, h, x2, x3, x4, x5, x6, y2, y3, y4, y5, y6, attr;
  if (type === "path" || !element.getBBox) {
    return element;
  }
  path = _createPath(element, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points");
  attr = _attrToObj(element, _typeAttrs[type]);
  if (type === "rect") {
    r = attr.rx;
    ry = attr.ry || r;
    x = attr.x;
    y = attr.y;
    w = attr.width - r * 2;
    h = attr.height - ry * 2;
    if (r || ry) {
      x2 = x + r * (1 - circ);
      x3 = x + r;
      x4 = x3 + w;
      x5 = x4 + r * circ;
      x6 = x4 + r;
      y2 = y + ry * (1 - circ);
      y3 = y + ry;
      y4 = y3 + h;
      y5 = y4 + ry * circ;
      y6 = y4 + ry;
      data = "M" + x6 + "," + y3 + " V" + y4 + " C" + [x6, y5, x5, y6, x4, y6, x4 - (x4 - x3) / 3, y6, x3 + (x4 - x3) / 3, y6, x3, y6, x2, y6, x, y5, x, y4, x, y4 - (y4 - y3) / 3, x, y3 + (y4 - y3) / 3, x, y3, x, y2, x2, y, x3, y, x3 + (x4 - x3) / 3, y, x4 - (x4 - x3) / 3, y, x4, y, x5, y, x6, y2, x6, y3].join(",") + "z";
    } else {
      data = "M" + (x + w) + "," + y + " v" + h + " h" + -w + " v" + -h + " h" + w + "z";
    }
  } else if (type === "circle" || type === "ellipse") {
    if (type === "circle") {
      r = ry = attr.r;
      rycirc = r * circ;
    } else {
      r = attr.rx;
      ry = attr.ry;
      rycirc = ry * circ;
    }
    x = attr.cx;
    y = attr.cy;
    rcirc = r * circ;
    data = "M" + (x + r) + "," + y + " C" + [x + r, y + rycirc, x + rcirc, y + ry, x, y + ry, x - rcirc, y + ry, x - r, y + rycirc, x - r, y, x - r, y - rycirc, x - rcirc, y - ry, x, y - ry, x + rcirc, y - ry, x + r, y - rycirc, x + r, y].join(",") + "z";
  } else if (type === "line") {
    data = "M" + attr.x1 + "," + attr.y1 + " L" + attr.x2 + "," + attr.y2;
  } else if (type === "polyline" || type === "polygon") {
    points = (element.getAttribute("points") + "").match(_numbersExp) || [];
    x = points.shift();
    y = points.shift();
    data = "M" + x + "," + y + " L" + points.join(",");
    if (type === "polygon") {
      data += "," + x + "," + y + "z";
    }
  }
  path.setAttribute("d", rawPathToString(path._gsRawPath = stringToRawPath(data)));
  if (swap && element.parentNode) {
    element.parentNode.insertBefore(path, element);
    element.parentNode.removeChild(element);
  }
  return path;
}
function getRotationAtBezierT(segment, i2, t) {
  var a = segment[i2], b = segment[i2 + 2], c = segment[i2 + 4], x;
  a += (b - a) * t;
  b += (c - b) * t;
  a += (b - a) * t;
  x = b + (c + (segment[i2 + 6] - c) * t - b) * t - a;
  a = segment[i2 + 1];
  b = segment[i2 + 3];
  c = segment[i2 + 5];
  a += (b - a) * t;
  b += (c - b) * t;
  a += (b - a) * t;
  return _round(_atan2(b + (c + (segment[i2 + 7] - c) * t - b) * t - a, x) * _RAD2DEG);
}
function sliceRawPath(rawPath, start, end) {
  end = _isUndefined(end) ? 1 : _roundPrecise(end) || 0;
  start = _roundPrecise(start) || 0;
  var loops = Math.max(0, ~~(_abs(end - start) - 1e-8)), path = copyRawPath(rawPath);
  if (start > end) {
    start = 1 - start;
    end = 1 - end;
    _reverseRawPath(path);
    path.totalLength = 0;
  }
  if (start < 0 || end < 0) {
    var offset = Math.abs(~~Math.min(start, end)) + 1;
    start += offset;
    end += offset;
  }
  path.totalLength || cacheRawPathMeasurements(path);
  var wrap2 = end > 1, s = getProgressData(path, start, _temp, true), e = getProgressData(path, end, _temp2), eSeg = e.segment, sSeg = s.segment, eSegIndex = e.segIndex, sSegIndex = s.segIndex, ei = e.i, si = s.i, sameSegment = sSegIndex === eSegIndex, sameBezier = ei === si && sameSegment, wrapsBehind, sShift, eShift, i2, copy, totalSegments, l, j;
  if (wrap2 || loops) {
    wrapsBehind = eSegIndex < sSegIndex || sameSegment && ei < si || sameBezier && e.t < s.t;
    if (_splitSegment(path, sSegIndex, si, s.t)) {
      sSegIndex++;
      if (!wrapsBehind) {
        eSegIndex++;
        if (sameBezier) {
          e.t = (e.t - s.t) / (1 - s.t);
          ei = 0;
        } else if (sameSegment) {
          ei -= si;
        }
      }
    }
    if (Math.abs(1 - (end - start)) < 1e-5) {
      eSegIndex = sSegIndex - 1;
    } else if (!e.t && eSegIndex) {
      eSegIndex--;
    } else if (_splitSegment(path, eSegIndex, ei, e.t) && wrapsBehind) {
      sSegIndex++;
    }
    if (s.t === 1) {
      sSegIndex = (sSegIndex + 1) % path.length;
    }
    copy = [];
    totalSegments = path.length;
    l = 1 + totalSegments * loops;
    j = sSegIndex;
    l += (totalSegments - sSegIndex + eSegIndex) % totalSegments;
    for (i2 = 0; i2 < l; i2++) {
      _appendOrMerge(copy, path[j++ % totalSegments]);
    }
    path = copy;
  } else {
    eShift = e.t === 1 ? 6 : subdivideSegment(eSeg, ei, e.t);
    if (start !== end) {
      sShift = subdivideSegment(sSeg, si, sameBezier ? s.t / e.t : s.t);
      sameSegment && (eShift += sShift);
      eSeg.splice(ei + eShift + 2);
      (sShift || si) && sSeg.splice(0, si + sShift);
      i2 = path.length;
      while (i2--) {
        (i2 < sSegIndex || i2 > eSegIndex) && path.splice(i2, 1);
      }
    } else {
      eSeg.angle = getRotationAtBezierT(eSeg, ei + eShift, 0);
      ei += eShift;
      s = eSeg[ei];
      e = eSeg[ei + 1];
      eSeg.length = eSeg.totalLength = 0;
      eSeg.totalPoints = path.totalPoints = 8;
      eSeg.push(s, e, s, e, s, e, s, e);
    }
  }
  path.totalLength = 0;
  return path;
}
function measureSegment(segment, startIndex, bezierQty) {
  startIndex = startIndex || 0;
  if (!segment.samples) {
    segment.samples = [];
    segment.lookup = [];
  }
  var resolution = ~~segment.resolution || 12, inc = 1 / resolution, endIndex = bezierQty ? startIndex + bezierQty * 6 + 1 : segment.length, x1 = segment[startIndex], y1 = segment[startIndex + 1], samplesIndex = startIndex ? startIndex / 6 * resolution : 0, samples = segment.samples, lookup = segment.lookup, min = (startIndex ? segment.minLength : _largeNum) || _largeNum, prevLength = samples[samplesIndex + bezierQty * resolution - 1], length = startIndex ? samples[samplesIndex - 1] : 0, i2, j, x4, x3, x2, xd, xd1, y4, y3, y2, yd, yd1, inv, t, lengthIndex, l, segLength;
  samples.length = lookup.length = 0;
  for (j = startIndex + 2; j < endIndex; j += 6) {
    x4 = segment[j + 4] - x1;
    x3 = segment[j + 2] - x1;
    x2 = segment[j] - x1;
    y4 = segment[j + 5] - y1;
    y3 = segment[j + 3] - y1;
    y2 = segment[j + 1] - y1;
    xd = xd1 = yd = yd1 = 0;
    if (_abs(x4) < 0.01 && _abs(y4) < 0.01 && _abs(x2) + _abs(y2) < 0.01) {
      if (segment.length > 8) {
        segment.splice(j, 6);
        j -= 6;
        endIndex -= 6;
      }
    } else {
      for (i2 = 1; i2 <= resolution; i2++) {
        t = inc * i2;
        inv = 1 - t;
        xd = xd1 - (xd1 = (t * t * x4 + 3 * inv * (t * x3 + inv * x2)) * t);
        yd = yd1 - (yd1 = (t * t * y4 + 3 * inv * (t * y3 + inv * y2)) * t);
        l = _sqrt(yd * yd + xd * xd);
        if (l < min) {
          min = l;
        }
        length += l;
        samples[samplesIndex++] = length;
      }
    }
    x1 += x4;
    y1 += y4;
  }
  if (prevLength) {
    prevLength -= length;
    for (; samplesIndex < samples.length; samplesIndex++) {
      samples[samplesIndex] += prevLength;
    }
  }
  if (samples.length && min) {
    segment.totalLength = segLength = samples[samples.length - 1] || 0;
    segment.minLength = min;
    if (segLength / min < 9999) {
      l = lengthIndex = 0;
      for (i2 = 0; i2 < segLength; i2 += min) {
        lookup[l++] = samples[lengthIndex] < i2 ? ++lengthIndex : lengthIndex;
      }
    }
  } else {
    segment.totalLength = samples[0] = 0;
  }
  return startIndex ? length - samples[startIndex / 2 - 1] : length;
}
function cacheRawPathMeasurements(rawPath, resolution) {
  var pathLength, points, i2;
  for (i2 = pathLength = points = 0; i2 < rawPath.length; i2++) {
    rawPath[i2].resolution = ~~resolution || 12;
    points += rawPath[i2].length;
    pathLength += measureSegment(rawPath[i2]);
  }
  rawPath.totalPoints = points;
  rawPath.totalLength = pathLength;
  return rawPath;
}
function subdivideSegment(segment, i2, t) {
  if (t <= 0 || t >= 1) {
    return 0;
  }
  var ax = segment[i2], ay = segment[i2 + 1], cp1x = segment[i2 + 2], cp1y = segment[i2 + 3], cp2x = segment[i2 + 4], cp2y = segment[i2 + 5], bx = segment[i2 + 6], by = segment[i2 + 7], x1a = ax + (cp1x - ax) * t, x2 = cp1x + (cp2x - cp1x) * t, y1a = ay + (cp1y - ay) * t, y2 = cp1y + (cp2y - cp1y) * t, x1 = x1a + (x2 - x1a) * t, y1 = y1a + (y2 - y1a) * t, x2a = cp2x + (bx - cp2x) * t, y2a = cp2y + (by - cp2y) * t;
  x2 += (x2a - x2) * t;
  y2 += (y2a - y2) * t;
  segment.splice(
    i2 + 2,
    4,
    _round(x1a),
    //first control point
    _round(y1a),
    _round(x1),
    //second control point
    _round(y1),
    _round(x1 + (x2 - x1) * t),
    //new fabricated anchor on line
    _round(y1 + (y2 - y1) * t),
    _round(x2),
    //third control point
    _round(y2),
    _round(x2a),
    //fourth control point
    _round(y2a)
  );
  segment.samples && segment.samples.splice(i2 / 6 * segment.resolution | 0, 0, 0, 0, 0, 0, 0, 0);
  return 6;
}
function getProgressData(rawPath, progress, decoratee, pushToNextIfAtEnd) {
  decoratee = decoratee || {};
  rawPath.totalLength || cacheRawPathMeasurements(rawPath);
  if (progress < 0 || progress > 1) {
    progress = _wrapProgress(progress);
  }
  var segIndex = 0, segment = rawPath[0], samples, resolution, length, min, max, i2, t;
  if (!progress) {
    t = i2 = segIndex = 0;
    segment = rawPath[0];
  } else if (progress === 1) {
    t = 1;
    segIndex = rawPath.length - 1;
    segment = rawPath[segIndex];
    i2 = segment.length - 8;
  } else {
    if (rawPath.length > 1) {
      length = rawPath.totalLength * progress;
      max = i2 = 0;
      while ((max += rawPath[i2++].totalLength) < length) {
        segIndex = i2;
      }
      segment = rawPath[segIndex];
      min = max - segment.totalLength;
      progress = (length - min) / (max - min) || 0;
    }
    samples = segment.samples;
    resolution = segment.resolution;
    length = segment.totalLength * progress;
    i2 = segment.lookup.length ? segment.lookup[~~(length / segment.minLength)] || 0 : _getSampleIndex(samples, length, progress);
    min = i2 ? samples[i2 - 1] : 0;
    max = samples[i2];
    if (max < length) {
      min = max;
      max = samples[++i2];
    }
    t = 1 / resolution * ((length - min) / (max - min) + i2 % resolution);
    i2 = ~~(i2 / resolution) * 6;
    if (pushToNextIfAtEnd && t === 1) {
      if (i2 + 6 < segment.length) {
        i2 += 6;
        t = 0;
      } else if (segIndex + 1 < rawPath.length) {
        i2 = t = 0;
        segment = rawPath[++segIndex];
      }
    }
  }
  decoratee.t = t;
  decoratee.i = i2;
  decoratee.path = rawPath;
  decoratee.segment = segment;
  decoratee.segIndex = segIndex;
  return decoratee;
}
function getPositionOnPath(rawPath, progress, includeAngle, point) {
  var segment = rawPath[0], result = point || {}, samples, resolution, length, min, max, i2, t, a, inv;
  if (progress < 0 || progress > 1) {
    progress = _wrapProgress(progress);
  }
  segment.lookup || cacheRawPathMeasurements(rawPath);
  if (rawPath.length > 1) {
    length = rawPath.totalLength * progress;
    max = i2 = 0;
    while ((max += rawPath[i2++].totalLength) < length) {
      segment = rawPath[i2];
    }
    min = max - segment.totalLength;
    progress = (length - min) / (max - min) || 0;
  }
  samples = segment.samples;
  resolution = segment.resolution;
  length = segment.totalLength * progress;
  i2 = segment.lookup.length ? segment.lookup[progress < 1 ? ~~(length / segment.minLength) : segment.lookup.length - 1] || 0 : _getSampleIndex(samples, length, progress);
  min = i2 ? samples[i2 - 1] : 0;
  max = samples[i2];
  if (max < length) {
    min = max;
    max = samples[++i2];
  }
  t = 1 / resolution * ((length - min) / (max - min) + i2 % resolution) || 0;
  inv = 1 - t;
  i2 = ~~(i2 / resolution) * 6;
  a = segment[i2];
  result.x = _round((t * t * (segment[i2 + 6] - a) + 3 * inv * (t * (segment[i2 + 4] - a) + inv * (segment[i2 + 2] - a))) * t + a);
  result.y = _round((t * t * (segment[i2 + 7] - (a = segment[i2 + 1])) + 3 * inv * (t * (segment[i2 + 5] - a) + inv * (segment[i2 + 3] - a))) * t + a);
  if (includeAngle) {
    result.angle = segment.totalLength ? getRotationAtBezierT(segment, i2, t >= 1 ? 1 - 1e-9 : t ? t : 1e-9) : segment.angle || 0;
  }
  return result;
}
function transformRawPath(rawPath, a, b, c, d, tx, ty) {
  var j = rawPath.length, segment, l, i2, x, y;
  while (--j > -1) {
    segment = rawPath[j];
    l = segment.length;
    for (i2 = 0; i2 < l; i2 += 2) {
      x = segment[i2];
      y = segment[i2 + 1];
      segment[i2] = x * a + y * c + tx;
      segment[i2 + 1] = x * b + y * d + ty;
    }
  }
  rawPath._dirty = 1;
  return rawPath;
}
function arcToSegment(lastX, lastY, rx, ry, angle, largeArcFlag, sweepFlag, x, y) {
  if (lastX === x && lastY === y) {
    return;
  }
  rx = _abs(rx);
  ry = _abs(ry);
  var angleRad = angle % 360 * _DEG2RAD, cosAngle = _cos(angleRad), sinAngle = _sin(angleRad), PI = Math.PI, TWOPI = PI * 2, dx2 = (lastX - x) / 2, dy2 = (lastY - y) / 2, x1 = cosAngle * dx2 + sinAngle * dy2, y1 = -sinAngle * dx2 + cosAngle * dy2, x1_sq = x1 * x1, y1_sq = y1 * y1, radiiCheck = x1_sq / (rx * rx) + y1_sq / (ry * ry);
  if (radiiCheck > 1) {
    rx = _sqrt(radiiCheck) * rx;
    ry = _sqrt(radiiCheck) * ry;
  }
  var rx_sq = rx * rx, ry_sq = ry * ry, sq = (rx_sq * ry_sq - rx_sq * y1_sq - ry_sq * x1_sq) / (rx_sq * y1_sq + ry_sq * x1_sq);
  if (sq < 0) {
    sq = 0;
  }
  var coef = (largeArcFlag === sweepFlag ? -1 : 1) * _sqrt(sq), cx1 = coef * (rx * y1 / ry), cy1 = coef * -(ry * x1 / rx), sx2 = (lastX + x) / 2, sy2 = (lastY + y) / 2, cx = sx2 + (cosAngle * cx1 - sinAngle * cy1), cy = sy2 + (sinAngle * cx1 + cosAngle * cy1), ux = (x1 - cx1) / rx, uy = (y1 - cy1) / ry, vx = (-x1 - cx1) / rx, vy = (-y1 - cy1) / ry, temp = ux * ux + uy * uy, angleStart = (uy < 0 ? -1 : 1) * Math.acos(ux / _sqrt(temp)), angleExtent = (ux * vy - uy * vx < 0 ? -1 : 1) * Math.acos((ux * vx + uy * vy) / _sqrt(temp * (vx * vx + vy * vy)));
  isNaN(angleExtent) && (angleExtent = PI);
  if (!sweepFlag && angleExtent > 0) {
    angleExtent -= TWOPI;
  } else if (sweepFlag && angleExtent < 0) {
    angleExtent += TWOPI;
  }
  angleStart %= TWOPI;
  angleExtent %= TWOPI;
  var segments = Math.ceil(_abs(angleExtent) / (TWOPI / 4)), rawPath = [], angleIncrement = angleExtent / segments, controlLength = 4 / 3 * _sin(angleIncrement / 2) / (1 + _cos(angleIncrement / 2)), ma = cosAngle * rx, mb = sinAngle * rx, mc = sinAngle * -ry, md = cosAngle * ry, i2;
  for (i2 = 0; i2 < segments; i2++) {
    angle = angleStart + i2 * angleIncrement;
    x1 = _cos(angle);
    y1 = _sin(angle);
    ux = _cos(angle += angleIncrement);
    uy = _sin(angle);
    rawPath.push(x1 - controlLength * y1, y1 + controlLength * x1, ux + controlLength * uy, uy - controlLength * ux, ux, uy);
  }
  for (i2 = 0; i2 < rawPath.length; i2 += 2) {
    x1 = rawPath[i2];
    y1 = rawPath[i2 + 1];
    rawPath[i2] = x1 * ma + y1 * mc + cx;
    rawPath[i2 + 1] = x1 * mb + y1 * md + cy;
  }
  rawPath[i2 - 2] = x;
  rawPath[i2 - 1] = y;
  return rawPath;
}
function stringToRawPath(d) {
  var a = (d + "").replace(_scientific, function(m) {
    var n = +m;
    return n < 1e-4 && n > -1e-4 ? 0 : n;
  }).match(_svgPathExp) || [], path = [], relativeX = 0, relativeY = 0, twoThirds = 2 / 3, elements = a.length, points = 0, errorMessage = "ERROR: malformed path: " + d, i2, j, x, y, command, isRelative, segment, startX, startY, difX, difY, beziers, prevCommand, flag1, flag2, line = function line2(sx, sy, ex, ey) {
    difX = (ex - sx) / 3;
    difY = (ey - sy) / 3;
    segment.push(sx + difX, sy + difY, ex - difX, ey - difY, ex, ey);
  };
  if (!d || !isNaN(a[0]) || isNaN(a[1])) {
    console.log(errorMessage);
    return path;
  }
  for (i2 = 0; i2 < elements; i2++) {
    prevCommand = command;
    if (isNaN(a[i2])) {
      command = a[i2].toUpperCase();
      isRelative = command !== a[i2];
    } else {
      i2--;
    }
    x = +a[i2 + 1];
    y = +a[i2 + 2];
    if (isRelative) {
      x += relativeX;
      y += relativeY;
    }
    if (!i2) {
      startX = x;
      startY = y;
    }
    if (command === "M") {
      if (segment) {
        if (segment.length < 8) {
          path.length -= 1;
        } else {
          points += segment.length;
        }
      }
      relativeX = startX = x;
      relativeY = startY = y;
      segment = [x, y];
      path.push(segment);
      i2 += 2;
      command = "L";
    } else if (command === "C") {
      if (!segment) {
        segment = [0, 0];
      }
      if (!isRelative) {
        relativeX = relativeY = 0;
      }
      segment.push(x, y, relativeX + a[i2 + 3] * 1, relativeY + a[i2 + 4] * 1, relativeX += a[i2 + 5] * 1, relativeY += a[i2 + 6] * 1);
      i2 += 6;
    } else if (command === "S") {
      difX = relativeX;
      difY = relativeY;
      if (prevCommand === "C" || prevCommand === "S") {
        difX += relativeX - segment[segment.length - 4];
        difY += relativeY - segment[segment.length - 3];
      }
      if (!isRelative) {
        relativeX = relativeY = 0;
      }
      segment.push(difX, difY, x, y, relativeX += a[i2 + 3] * 1, relativeY += a[i2 + 4] * 1);
      i2 += 4;
    } else if (command === "Q") {
      difX = relativeX + (x - relativeX) * twoThirds;
      difY = relativeY + (y - relativeY) * twoThirds;
      if (!isRelative) {
        relativeX = relativeY = 0;
      }
      relativeX += a[i2 + 3] * 1;
      relativeY += a[i2 + 4] * 1;
      segment.push(difX, difY, relativeX + (x - relativeX) * twoThirds, relativeY + (y - relativeY) * twoThirds, relativeX, relativeY);
      i2 += 4;
    } else if (command === "T") {
      difX = relativeX - segment[segment.length - 4];
      difY = relativeY - segment[segment.length - 3];
      segment.push(relativeX + difX, relativeY + difY, x + (relativeX + difX * 1.5 - x) * twoThirds, y + (relativeY + difY * 1.5 - y) * twoThirds, relativeX = x, relativeY = y);
      i2 += 2;
    } else if (command === "H") {
      line(relativeX, relativeY, relativeX = x, relativeY);
      i2 += 1;
    } else if (command === "V") {
      line(relativeX, relativeY, relativeX, relativeY = x + (isRelative ? relativeY - relativeX : 0));
      i2 += 1;
    } else if (command === "L" || command === "Z") {
      if (command === "Z") {
        x = startX;
        y = startY;
        segment.closed = true;
      }
      if (command === "L" || _abs(relativeX - x) > 0.5 || _abs(relativeY - y) > 0.5) {
        line(relativeX, relativeY, x, y);
        if (command === "L") {
          i2 += 2;
        }
      }
      relativeX = x;
      relativeY = y;
    } else if (command === "A") {
      flag1 = a[i2 + 4];
      flag2 = a[i2 + 5];
      difX = a[i2 + 6];
      difY = a[i2 + 7];
      j = 7;
      if (flag1.length > 1) {
        if (flag1.length < 3) {
          difY = difX;
          difX = flag2;
          j--;
        } else {
          difY = flag2;
          difX = flag1.substr(2);
          j -= 2;
        }
        flag2 = flag1.charAt(1);
        flag1 = flag1.charAt(0);
      }
      beziers = arcToSegment(relativeX, relativeY, +a[i2 + 1], +a[i2 + 2], +a[i2 + 3], +flag1, +flag2, (isRelative ? relativeX : 0) + difX * 1, (isRelative ? relativeY : 0) + difY * 1);
      i2 += j;
      if (beziers) {
        for (j = 0; j < beziers.length; j++) {
          segment.push(beziers[j]);
        }
      }
      relativeX = segment[segment.length - 2];
      relativeY = segment[segment.length - 1];
    } else {
      console.log(errorMessage);
    }
  }
  i2 = segment.length;
  if (i2 < 6) {
    path.pop();
    i2 = 0;
  } else if (segment[0] === segment[i2 - 2] && segment[1] === segment[i2 - 1]) {
    segment.closed = true;
  }
  path.totalPoints = points + i2;
  return path;
}
function bezierToPoints(x1, y1, x2, y2, x3, y3, x4, y4, threshold, points, index) {
  var x12 = (x1 + x2) / 2, y12 = (y1 + y2) / 2, x23 = (x2 + x3) / 2, y23 = (y2 + y3) / 2, x34 = (x3 + x4) / 2, y34 = (y3 + y4) / 2, x123 = (x12 + x23) / 2, y123 = (y12 + y23) / 2, x234 = (x23 + x34) / 2, y234 = (y23 + y34) / 2, x1234 = (x123 + x234) / 2, y1234 = (y123 + y234) / 2, dx = x4 - x1, dy = y4 - y1, d2 = _abs((x2 - x4) * dy - (y2 - y4) * dx), d3 = _abs((x3 - x4) * dy - (y3 - y4) * dx), length;
  if (!points) {
    points = [x1, y1, x4, y4];
    index = 2;
  }
  points.splice(index || points.length - 2, 0, x1234, y1234);
  if ((d2 + d3) * (d2 + d3) > threshold * (dx * dx + dy * dy)) {
    length = points.length;
    bezierToPoints(x1, y1, x12, y12, x123, y123, x1234, y1234, threshold, points, index);
    bezierToPoints(x1234, y1234, x234, y234, x34, y34, x4, y4, threshold, points, index + 2 + (points.length - length));
  }
  return points;
}
function flatPointsToSegment(points, curviness) {
  if (curviness === void 0) {
    curviness = 1;
  }
  var x = points[0], y = 0, segment = [x, y], i2 = 2;
  for (; i2 < points.length; i2 += 2) {
    segment.push(x, y, points[i2], y = (points[i2] - x) * curviness / 2, x = points[i2], -y);
  }
  return segment;
}
function pointsToSegment(points, curviness) {
  _abs(points[0] - points[2]) < 1e-4 && _abs(points[1] - points[3]) < 1e-4 && (points = points.slice(2));
  var l = points.length - 2, x = +points[0], y = +points[1], nextX = +points[2], nextY = +points[3], segment = [x, y, x, y], dx2 = nextX - x, dy2 = nextY - y, closed = Math.abs(points[l] - x) < 1e-3 && Math.abs(points[l + 1] - y) < 1e-3, prevX, prevY, i2, dx1, dy1, r1, r2, r3, tl, mx1, mx2, mxm, my1, my2, mym;
  if (closed) {
    points.push(nextX, nextY);
    nextX = x;
    nextY = y;
    x = points[l - 2];
    y = points[l - 1];
    points.unshift(x, y);
    l += 4;
  }
  curviness = curviness || curviness === 0 ? +curviness : 1;
  for (i2 = 2; i2 < l; i2 += 2) {
    prevX = x;
    prevY = y;
    x = nextX;
    y = nextY;
    nextX = +points[i2 + 2];
    nextY = +points[i2 + 3];
    if (x === nextX && y === nextY) {
      continue;
    }
    dx1 = dx2;
    dy1 = dy2;
    dx2 = nextX - x;
    dy2 = nextY - y;
    r1 = _sqrt(dx1 * dx1 + dy1 * dy1);
    r2 = _sqrt(dx2 * dx2 + dy2 * dy2);
    r3 = _sqrt(Math.pow(dx2 / r2 + dx1 / r1, 2) + Math.pow(dy2 / r2 + dy1 / r1, 2));
    tl = (r1 + r2) * curviness * 0.25 / r3;
    mx1 = x - (x - prevX) * (r1 ? tl / r1 : 0);
    mx2 = x + (nextX - x) * (r2 ? tl / r2 : 0);
    mxm = x - (mx1 + ((mx2 - mx1) * (r1 * 3 / (r1 + r2) + 0.5) / 4 || 0));
    my1 = y - (y - prevY) * (r1 ? tl / r1 : 0);
    my2 = y + (nextY - y) * (r2 ? tl / r2 : 0);
    mym = y - (my1 + ((my2 - my1) * (r1 * 3 / (r1 + r2) + 0.5) / 4 || 0));
    if (x !== prevX || y !== prevY) {
      segment.push(
        _round(mx1 + mxm),
        // first control point
        _round(my1 + mym),
        _round(x),
        // anchor
        _round(y),
        _round(mx2 + mxm),
        // second control point
        _round(my2 + mym)
      );
    }
  }
  x !== nextX || y !== nextY || segment.length < 4 ? segment.push(_round(nextX), _round(nextY), _round(nextX), _round(nextY)) : segment.length -= 2;
  if (segment.length === 2) {
    segment.push(x, y, x, y, x, y);
  } else if (closed) {
    segment.splice(0, 6);
    segment.length = segment.length - 6;
  }
  return segment;
}
function pointToSegDist(x, y, x1, y1, x2, y2) {
  var dx = x2 - x1, dy = y2 - y1, t;
  if (dx || dy) {
    t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x1 = x2;
      y1 = y2;
    } else if (t > 0) {
      x1 += dx * t;
      y1 += dy * t;
    }
  }
  return Math.pow(x - x1, 2) + Math.pow(y - y1, 2);
}
function simplifyStep(points, first, last, tolerance, simplified) {
  var maxSqDist = tolerance, firstX = points[first], firstY = points[first + 1], lastX = points[last], lastY = points[last + 1], index, i2, d;
  for (i2 = first + 2; i2 < last; i2 += 2) {
    d = pointToSegDist(points[i2], points[i2 + 1], firstX, firstY, lastX, lastY);
    if (d > maxSqDist) {
      index = i2;
      maxSqDist = d;
    }
  }
  if (maxSqDist > tolerance) {
    index - first > 2 && simplifyStep(points, first, index, tolerance, simplified);
    simplified.push(points[index], points[index + 1]);
    last - index > 2 && simplifyStep(points, index, last, tolerance, simplified);
  }
}
function simplifyPoints(points, tolerance) {
  var prevX = parseFloat(points[0]), prevY = parseFloat(points[1]), temp = [prevX, prevY], l = points.length - 2, i2, x, y, dx, dy, result, last;
  tolerance = Math.pow(tolerance || 1, 2);
  for (i2 = 2; i2 < l; i2 += 2) {
    x = parseFloat(points[i2]);
    y = parseFloat(points[i2 + 1]);
    dx = prevX - x;
    dy = prevY - y;
    if (dx * dx + dy * dy > tolerance) {
      temp.push(x, y);
      prevX = x;
      prevY = y;
    }
  }
  temp.push(parseFloat(points[l]), parseFloat(points[l + 1]));
  last = temp.length - 2;
  result = [temp[0], temp[1]];
  simplifyStep(temp, 0, last, tolerance, result);
  result.push(temp[last], temp[last + 1]);
  return result;
}
function getClosestProgressOnBezier(iterations, px, py, start, end, slices, x0, y0, x1, y1, x2, y2, x3, y3) {
  var inc = (end - start) / slices, best = 0, t = start, x, y, d, dx, dy, inv;
  _bestDistance = _largeNum;
  while (t <= end) {
    inv = 1 - t;
    x = inv * inv * inv * x0 + 3 * inv * inv * t * x1 + 3 * inv * t * t * x2 + t * t * t * x3;
    y = inv * inv * inv * y0 + 3 * inv * inv * t * y1 + 3 * inv * t * t * y2 + t * t * t * y3;
    dx = x - px;
    dy = y - py;
    d = dx * dx + dy * dy;
    if (d < _bestDistance) {
      _bestDistance = d;
      best = t;
    }
    t += inc;
  }
  return iterations > 1 ? getClosestProgressOnBezier(iterations - 1, px, py, Math.max(best - inc, 0), Math.min(best + inc, 1), slices, x0, y0, x1, y1, x2, y2, x3, y3) : best;
}
function getClosestData(rawPath, x, y, slices) {
  var closest = {
    j: 0,
    i: 0,
    t: 0
  }, bestDistance = _largeNum, i2, j, t, segment;
  for (j = 0; j < rawPath.length; j++) {
    segment = rawPath[j];
    for (i2 = 0; i2 < segment.length; i2 += 6) {
      t = getClosestProgressOnBezier(1, x, y, 0, 1, slices || 20, segment[i2], segment[i2 + 1], segment[i2 + 2], segment[i2 + 3], segment[i2 + 4], segment[i2 + 5], segment[i2 + 6], segment[i2 + 7]);
      if (bestDistance > _bestDistance) {
        bestDistance = _bestDistance;
        closest.j = j;
        closest.i = i2;
        closest.t = t;
      }
    }
  }
  return closest;
}
function rawPathToString(rawPath) {
  if (_isNumber(rawPath[0])) {
    rawPath = [rawPath];
  }
  var result = "", l = rawPath.length, sl, s, i2, segment;
  for (s = 0; s < l; s++) {
    segment = rawPath[s];
    result += "M" + _round(segment[0]) + "," + _round(segment[1]) + " C";
    sl = segment.length;
    for (i2 = 2; i2 < sl; i2++) {
      result += _round(segment[i2++]) + "," + _round(segment[i2++]) + " " + _round(segment[i2++]) + "," + _round(segment[i2++]) + " " + _round(segment[i2++]) + "," + _round(segment[i2]) + " ";
    }
    if (segment.closed) {
      result += "z";
    }
  }
  return result;
}

// node_modules/gsap/CustomEase.js
var gsap2;
var _coreInitted;
var _getGSAP = function _getGSAP2() {
  return gsap2 || typeof window !== "undefined" && (gsap2 = window.gsap) && gsap2.registerPlugin && gsap2;
};
var _initCore = function _initCore2() {
  gsap2 = _getGSAP();
  if (gsap2) {
    gsap2.registerEase("_CE", CustomEase.create);
    _coreInitted = 1;
  } else {
    console.warn("Please gsap.registerPlugin(CustomEase)");
  }
};
var _bigNum = 1e20;
var _round3 = function _round4(value) {
  return ~~(value * 1e3 + (value < 0 ? -0.5 : 0.5)) / 1e3;
};
var _bonusValidated = 1;
var _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/gi;
var _needsParsingExp = /[cLlsSaAhHvVtTqQ]/g;
var _findMinimum = function _findMinimum2(values) {
  var l = values.length, min = _bigNum, i2;
  for (i2 = 1; i2 < l; i2 += 6) {
    +values[i2] < min && (min = +values[i2]);
  }
  return min;
};
var _normalize = function _normalize2(values, height, originY) {
  if (!originY && originY !== 0) {
    originY = Math.max(+values[values.length - 1], +values[1]);
  }
  var tx = +values[0] * -1, ty = -originY, l = values.length, sx = 1 / (+values[l - 2] + tx), sy = -height || (Math.abs(+values[l - 1] - +values[1]) < 0.01 * (+values[l - 2] - +values[0]) ? _findMinimum(values) + ty : +values[l - 1] + ty), i2;
  if (sy) {
    sy = 1 / sy;
  } else {
    sy = -sx;
  }
  for (i2 = 0; i2 < l; i2 += 2) {
    values[i2] = (+values[i2] + tx) * sx;
    values[i2 + 1] = (+values[i2 + 1] + ty) * sy;
  }
};
var _bezierToPoints = function _bezierToPoints2(x1, y1, x2, y2, x3, y3, x4, y4, threshold, points, index) {
  var x12 = (x1 + x2) / 2, y12 = (y1 + y2) / 2, x23 = (x2 + x3) / 2, y23 = (y2 + y3) / 2, x34 = (x3 + x4) / 2, y34 = (y3 + y4) / 2, x123 = (x12 + x23) / 2, y123 = (y12 + y23) / 2, x234 = (x23 + x34) / 2, y234 = (y23 + y34) / 2, x1234 = (x123 + x234) / 2, y1234 = (y123 + y234) / 2, dx = x4 - x1, dy = y4 - y1, d2 = Math.abs((x2 - x4) * dy - (y2 - y4) * dx), d3 = Math.abs((x3 - x4) * dy - (y3 - y4) * dx), length;
  if (!points) {
    points = [{
      x: x1,
      y: y1
    }, {
      x: x4,
      y: y4
    }];
    index = 1;
  }
  points.splice(index || points.length - 1, 0, {
    x: x1234,
    y: y1234
  });
  if ((d2 + d3) * (d2 + d3) > threshold * (dx * dx + dy * dy)) {
    length = points.length;
    _bezierToPoints2(x1, y1, x12, y12, x123, y123, x1234, y1234, threshold, points, index);
    _bezierToPoints2(x1234, y1234, x234, y234, x34, y34, x4, y4, threshold, points, index + 1 + (points.length - length));
  }
  return points;
};
var CustomEase = function() {
  function CustomEase2(id, data, config) {
    _coreInitted || _initCore();
    this.id = id;
    _bonusValidated && this.setData(data, config);
  }
  var _proto = CustomEase2.prototype;
  _proto.setData = function setData(data, config) {
    config = config || {};
    data = data || "0,0,1,1";
    var values = data.match(_numExp), closest = 1, points = [], lookup = [], precision = config.precision || 1, fast = precision <= 1, l, a1, a2, i2, inc, j, point, prevPoint, p2;
    this.data = data;
    if (_needsParsingExp.test(data) || ~data.indexOf("M") && data.indexOf("C") < 0) {
      values = stringToRawPath(data)[0];
    }
    l = values.length;
    if (l === 4) {
      values.unshift(0, 0);
      values.push(1, 1);
      l = 8;
    } else if ((l - 2) % 6) {
      throw "Invalid CustomEase";
    }
    if (+values[0] !== 0 || +values[l - 2] !== 1) {
      _normalize(values, config.height, config.originY);
    }
    this.segment = values;
    for (i2 = 2; i2 < l; i2 += 6) {
      a1 = {
        x: +values[i2 - 2],
        y: +values[i2 - 1]
      };
      a2 = {
        x: +values[i2 + 4],
        y: +values[i2 + 5]
      };
      points.push(a1, a2);
      _bezierToPoints(a1.x, a1.y, +values[i2], +values[i2 + 1], +values[i2 + 2], +values[i2 + 3], a2.x, a2.y, 1 / (precision * 2e5), points, points.length - 1);
    }
    l = points.length;
    for (i2 = 0; i2 < l; i2++) {
      point = points[i2];
      prevPoint = points[i2 - 1] || point;
      if ((point.x > prevPoint.x || prevPoint.y !== point.y && prevPoint.x === point.x || point === prevPoint) && point.x <= 1) {
        prevPoint.cx = point.x - prevPoint.x;
        prevPoint.cy = point.y - prevPoint.y;
        prevPoint.n = point;
        prevPoint.nx = point.x;
        if (fast && i2 > 1 && Math.abs(prevPoint.cy / prevPoint.cx - points[i2 - 2].cy / points[i2 - 2].cx) > 2) {
          fast = 0;
        }
        if (prevPoint.cx < closest) {
          if (!prevPoint.cx) {
            prevPoint.cx = 1e-3;
            if (i2 === l - 1) {
              prevPoint.x -= 1e-3;
              closest = Math.min(closest, 1e-3);
              fast = 0;
            }
          } else {
            closest = prevPoint.cx;
          }
        }
      } else {
        points.splice(i2--, 1);
        l--;
      }
    }
    l = 1 / closest + 1 | 0;
    inc = 1 / l;
    j = 0;
    point = points[0];
    if (fast) {
      for (i2 = 0; i2 < l; i2++) {
        p2 = i2 * inc;
        if (point.nx < p2) {
          point = points[++j];
        }
        a1 = point.y + (p2 - point.x) / point.cx * point.cy;
        lookup[i2] = {
          x: p2,
          cx: inc,
          y: a1,
          cy: 0,
          nx: 9
        };
        if (i2) {
          lookup[i2 - 1].cy = a1 - lookup[i2 - 1].y;
        }
      }
      j = points[points.length - 1];
      lookup[l - 1].cy = j.y - a1;
      lookup[l - 1].cx = j.x - lookup[lookup.length - 1].x;
    } else {
      for (i2 = 0; i2 < l; i2++) {
        if (point.nx < i2 * inc) {
          point = points[++j];
        }
        lookup[i2] = point;
      }
      if (j < points.length - 1) {
        lookup[i2 - 1] = points[points.length - 2];
      }
    }
    this.ease = function(p3) {
      var point2 = lookup[p3 * l | 0] || lookup[l - 1];
      if (point2.nx < p3) {
        point2 = point2.n;
      }
      return point2.y + (p3 - point2.x) / point2.cx * point2.cy;
    };
    this.ease.custom = this;
    this.id && gsap2 && gsap2.registerEase(this.id, this.ease);
    return this;
  };
  _proto.getSVGData = function getSVGData(config) {
    return CustomEase2.getSVGData(this, config);
  };
  CustomEase2.create = function create(id, data, config) {
    return new CustomEase2(id, data, config).ease;
  };
  CustomEase2.register = function register8(core) {
    gsap2 = core;
    _initCore();
  };
  CustomEase2.get = function get(id) {
    return gsap2.parseEase(id);
  };
  CustomEase2.getSVGData = function getSVGData(ease, config) {
    config = config || {};
    var width = config.width || 100, height = config.height || 100, x = config.x || 0, y = (config.y || 0) + height, e = gsap2.utils.toArray(config.path)[0], a, slope, i2, inc, tx, ty, precision, threshold, prevX, prevY;
    if (config.invert) {
      height = -height;
      y = 0;
    }
    if (typeof ease === "string") {
      ease = gsap2.parseEase(ease);
    }
    if (ease.custom) {
      ease = ease.custom;
    }
    if (ease instanceof CustomEase2) {
      a = rawPathToString(transformRawPath([ease.segment], width, 0, 0, -height, x, y));
    } else {
      a = [x, y];
      precision = Math.max(5, (config.precision || 1) * 200);
      inc = 1 / precision;
      precision += 2;
      threshold = 5 / precision;
      prevX = _round3(x + inc * width);
      prevY = _round3(y + ease(inc) * -height);
      slope = (prevY - y) / (prevX - x);
      for (i2 = 2; i2 < precision; i2++) {
        tx = _round3(x + i2 * inc * width);
        ty = _round3(y + ease(i2 * inc) * -height);
        if (Math.abs((ty - prevY) / (tx - prevX) - slope) > threshold || i2 === precision - 1) {
          a.push(prevX, prevY);
          slope = (ty - prevY) / (tx - prevX);
        }
        prevX = tx;
        prevY = ty;
      }
      a = "M" + a.join(",");
    }
    e && e.setAttribute("d", a);
    return a;
  };
  return CustomEase2;
}();
CustomEase.version = "3.13.0";
CustomEase.headless = true;
_getGSAP() && gsap2.registerPlugin(CustomEase);

// node_modules/gsap/utils/matrix.js
var _doc;
var _win;
var _docElement;
var _body;
var _divContainer;
var _svgContainer;
var _identityMatrix;
var _gEl;
var _transformProp = "transform";
var _transformOriginProp = _transformProp + "Origin";
var _hasOffsetBug;
var _setDoc = function _setDoc2(element) {
  var doc = element.ownerDocument || element;
  if (!(_transformProp in element.style) && "msTransform" in element.style) {
    _transformProp = "msTransform";
    _transformOriginProp = _transformProp + "Origin";
  }
  while (doc.parentNode && (doc = doc.parentNode)) {
  }
  _win = window;
  _identityMatrix = new Matrix2D();
  if (doc) {
    _doc = doc;
    _docElement = doc.documentElement;
    _body = doc.body;
    _gEl = _doc.createElementNS("http://www.w3.org/2000/svg", "g");
    _gEl.style.transform = "none";
    var d1 = doc.createElement("div"), d2 = doc.createElement("div"), root = doc && (doc.body || doc.firstElementChild);
    if (root && root.appendChild) {
      root.appendChild(d1);
      d1.appendChild(d2);
      d1.setAttribute("style", "position:static;transform:translate3d(0,0,1px)");
      _hasOffsetBug = d2.offsetParent !== d1;
      root.removeChild(d1);
    }
  }
  return doc;
};
var _forceNonZeroScale = function _forceNonZeroScale2(e) {
  var a, cache;
  while (e && e !== _body) {
    cache = e._gsap;
    cache && cache.uncache && cache.get(e, "x");
    if (cache && !cache.scaleX && !cache.scaleY && cache.renderTransform) {
      cache.scaleX = cache.scaleY = 1e-4;
      cache.renderTransform(1, cache);
      a ? a.push(cache) : a = [cache];
    }
    e = e.parentNode;
  }
  return a;
};
var _svgTemps = [];
var _divTemps = [];
var _getDocScrollTop = function _getDocScrollTop2() {
  return _win.pageYOffset || _doc.scrollTop || _docElement.scrollTop || _body.scrollTop || 0;
};
var _getDocScrollLeft = function _getDocScrollLeft2() {
  return _win.pageXOffset || _doc.scrollLeft || _docElement.scrollLeft || _body.scrollLeft || 0;
};
var _svgOwner = function _svgOwner2(element) {
  return element.ownerSVGElement || ((element.tagName + "").toLowerCase() === "svg" ? element : null);
};
var _isFixed = function _isFixed2(element) {
  if (_win.getComputedStyle(element).position === "fixed") {
    return true;
  }
  element = element.parentNode;
  if (element && element.nodeType === 1) {
    return _isFixed2(element);
  }
};
var _createSibling = function _createSibling2(element, i2) {
  if (element.parentNode && (_doc || _setDoc(element))) {
    var svg = _svgOwner(element), ns = svg ? svg.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", type = svg ? i2 ? "rect" : "g" : "div", x = i2 !== 2 ? 0 : 100, y = i2 === 3 ? 100 : 0, css = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", e = _doc.createElementNS ? _doc.createElementNS(ns.replace(/^https/, "http"), type) : _doc.createElement(type);
    if (i2) {
      if (!svg) {
        if (!_divContainer) {
          _divContainer = _createSibling2(element);
          _divContainer.style.cssText = css;
        }
        e.style.cssText = css + "width:0.1px;height:0.1px;top:" + y + "px;left:" + x + "px";
        _divContainer.appendChild(e);
      } else {
        _svgContainer || (_svgContainer = _createSibling2(element));
        e.setAttribute("width", 0.01);
        e.setAttribute("height", 0.01);
        e.setAttribute("transform", "translate(" + x + "," + y + ")");
        _svgContainer.appendChild(e);
      }
    }
    return e;
  }
  throw "Need document and parent.";
};
var _consolidate = function _consolidate2(m) {
  var c = new Matrix2D(), i2 = 0;
  for (; i2 < m.numberOfItems; i2++) {
    c.multiply(m.getItem(i2).matrix);
  }
  return c;
};
var _getCTM = function _getCTM2(svg) {
  var m = svg.getCTM(), transform;
  if (!m) {
    transform = svg.style[_transformProp];
    svg.style[_transformProp] = "none";
    svg.appendChild(_gEl);
    m = _gEl.getCTM();
    svg.removeChild(_gEl);
    transform ? svg.style[_transformProp] = transform : svg.style.removeProperty(_transformProp.replace(/([A-Z])/g, "-$1").toLowerCase());
  }
  return m || _identityMatrix.clone();
};
var _placeSiblings = function _placeSiblings2(element, adjustGOffset) {
  var svg = _svgOwner(element), isRootSVG = element === svg, siblings = svg ? _svgTemps : _divTemps, parent = element.parentNode, appendToEl = parent && !svg && parent.shadowRoot && parent.shadowRoot.appendChild ? parent.shadowRoot : parent, container, m, b, x, y, cs;
  if (element === _win) {
    return element;
  }
  siblings.length || siblings.push(_createSibling(element, 1), _createSibling(element, 2), _createSibling(element, 3));
  container = svg ? _svgContainer : _divContainer;
  if (svg) {
    if (isRootSVG) {
      b = _getCTM(element);
      x = -b.e / b.a;
      y = -b.f / b.d;
      m = _identityMatrix;
    } else if (element.getBBox) {
      b = element.getBBox();
      m = element.transform ? element.transform.baseVal : {};
      m = !m.numberOfItems ? _identityMatrix : m.numberOfItems > 1 ? _consolidate(m) : m.getItem(0).matrix;
      x = m.a * b.x + m.c * b.y;
      y = m.b * b.x + m.d * b.y;
    } else {
      m = new Matrix2D();
      x = y = 0;
    }
    if (adjustGOffset && element.tagName.toLowerCase() === "g") {
      x = y = 0;
    }
    (isRootSVG ? svg : parent).appendChild(container);
    container.setAttribute("transform", "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + (m.e + x) + "," + (m.f + y) + ")");
  } else {
    x = y = 0;
    if (_hasOffsetBug) {
      m = element.offsetParent;
      b = element;
      while (b && (b = b.parentNode) && b !== m && b.parentNode) {
        if ((_win.getComputedStyle(b)[_transformProp] + "").length > 4) {
          x = b.offsetLeft;
          y = b.offsetTop;
          b = 0;
        }
      }
    }
    cs = _win.getComputedStyle(element);
    if (cs.position !== "absolute" && cs.position !== "fixed") {
      m = element.offsetParent;
      while (parent && parent !== m) {
        x += parent.scrollLeft || 0;
        y += parent.scrollTop || 0;
        parent = parent.parentNode;
      }
    }
    b = container.style;
    b.top = element.offsetTop - y + "px";
    b.left = element.offsetLeft - x + "px";
    b[_transformProp] = cs[_transformProp];
    b[_transformOriginProp] = cs[_transformOriginProp];
    b.position = cs.position === "fixed" ? "fixed" : "absolute";
    appendToEl.appendChild(container);
  }
  return container;
};
var _setMatrix = function _setMatrix2(m, a, b, c, d, e, f) {
  m.a = a;
  m.b = b;
  m.c = c;
  m.d = d;
  m.e = e;
  m.f = f;
  return m;
};
var Matrix2D = function() {
  function Matrix2D2(a, b, c, d, e, f) {
    if (a === void 0) {
      a = 1;
    }
    if (b === void 0) {
      b = 0;
    }
    if (c === void 0) {
      c = 0;
    }
    if (d === void 0) {
      d = 1;
    }
    if (e === void 0) {
      e = 0;
    }
    if (f === void 0) {
      f = 0;
    }
    _setMatrix(this, a, b, c, d, e, f);
  }
  var _proto = Matrix2D2.prototype;
  _proto.inverse = function inverse() {
    var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f, determinant = a * d - b * c || 1e-10;
    return _setMatrix(this, d / determinant, -b / determinant, -c / determinant, a / determinant, (c * f - d * e) / determinant, -(a * f - b * e) / determinant);
  };
  _proto.multiply = function multiply(matrix) {
    var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f, a2 = matrix.a, b2 = matrix.c, c2 = matrix.b, d2 = matrix.d, e2 = matrix.e, f2 = matrix.f;
    return _setMatrix(this, a2 * a + c2 * c, a2 * b + c2 * d, b2 * a + d2 * c, b2 * b + d2 * d, e + e2 * a + f2 * c, f + e2 * b + f2 * d);
  };
  _proto.clone = function clone() {
    return new Matrix2D2(this.a, this.b, this.c, this.d, this.e, this.f);
  };
  _proto.equals = function equals(matrix) {
    var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f;
    return a === matrix.a && b === matrix.b && c === matrix.c && d === matrix.d && e === matrix.e && f === matrix.f;
  };
  _proto.apply = function apply(point, decoratee) {
    if (decoratee === void 0) {
      decoratee = {};
    }
    var x = point.x, y = point.y, a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f;
    decoratee.x = x * a + y * c + e || 0;
    decoratee.y = x * b + y * d + f || 0;
    return decoratee;
  };
  return Matrix2D2;
}();
function getGlobalMatrix(element, inverse, adjustGOffset, includeScrollInFixed) {
  if (!element || !element.parentNode || (_doc || _setDoc(element)).documentElement === element) {
    return new Matrix2D();
  }
  var zeroScales = _forceNonZeroScale(element), svg = _svgOwner(element), temps = svg ? _svgTemps : _divTemps, container = _placeSiblings(element, adjustGOffset), b1 = temps[0].getBoundingClientRect(), b2 = temps[1].getBoundingClientRect(), b3 = temps[2].getBoundingClientRect(), parent = container.parentNode, isFixed = !includeScrollInFixed && _isFixed(element), m = new Matrix2D((b2.left - b1.left) / 100, (b2.top - b1.top) / 100, (b3.left - b1.left) / 100, (b3.top - b1.top) / 100, b1.left + (isFixed ? 0 : _getDocScrollLeft()), b1.top + (isFixed ? 0 : _getDocScrollTop()));
  parent.removeChild(container);
  if (zeroScales) {
    b1 = zeroScales.length;
    while (b1--) {
      b2 = zeroScales[b1];
      b2.scaleX = b2.scaleY = 0;
      b2.renderTransform(1, b2);
    }
  }
  return inverse ? m.inverse() : m;
}

// node_modules/gsap/Draggable.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var gsap3;
var _win2;
var _doc2;
var _docElement2;
var _body2;
var _tempDiv;
var _placeholderDiv;
var _coreInitted2;
var _checkPrefix;
var _toArray;
var _supportsPassive;
var _isTouchDevice;
var _touchEventLookup;
var _isMultiTouching;
var _isAndroid;
var InertiaPlugin;
var _defaultCursor;
var _supportsPointer;
var _context;
var _getStyleSaver;
var _dragCount2 = 0;
var _windowExists = function _windowExists2() {
  return typeof window !== "undefined";
};
var _getGSAP3 = function _getGSAP4() {
  return gsap3 || _windowExists() && (gsap3 = window.gsap) && gsap3.registerPlugin && gsap3;
};
var _isFunction = function _isFunction2(value) {
  return typeof value === "function";
};
var _isObject = function _isObject2(value) {
  return typeof value === "object";
};
var _isUndefined3 = function _isUndefined4(value) {
  return typeof value === "undefined";
};
var _emptyFunc = function _emptyFunc2() {
  return false;
};
var _transformProp2 = "transform";
var _transformOriginProp2 = "transformOrigin";
var _round5 = function _round6(value) {
  return Math.round(value * 1e4) / 1e4;
};
var _isArray = Array.isArray;
var _createElement = function _createElement2(type, ns) {
  var e = _doc2.createElementNS ? _doc2.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc2.createElement(type);
  return e.style ? e : _doc2.createElement(type);
};
var _RAD2DEG2 = 180 / Math.PI;
var _bigNum2 = 1e20;
var _identityMatrix2 = new Matrix2D();
var _getTime = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
};
var _renderQueue = [];
var _lookup = {};
var _lookupCount = 0;
var _clickableTagExp = /^(?:a|input|textarea|button|select)$/i;
var _lastDragTime = 0;
var _temp1 = {};
var _windowProxy = {};
var _copy = function _copy2(obj, factor) {
  var copy = {}, p2;
  for (p2 in obj) {
    copy[p2] = factor ? obj[p2] * factor : obj[p2];
  }
  return copy;
};
var _extend = function _extend2(obj, defaults) {
  for (var p2 in defaults) {
    if (!(p2 in obj)) {
      obj[p2] = defaults[p2];
    }
  }
  return obj;
};
var _setTouchActionForAllDescendants = function _setTouchActionForAllDescendants2(elements, value) {
  var i2 = elements.length, children;
  while (i2--) {
    value ? elements[i2].style.touchAction = value : elements[i2].style.removeProperty("touch-action");
    children = elements[i2].children;
    children && children.length && _setTouchActionForAllDescendants2(children, value);
  }
};
var _renderQueueTick = function _renderQueueTick2() {
  return _renderQueue.forEach(function(func) {
    return func();
  });
};
var _addToRenderQueue = function _addToRenderQueue2(func) {
  _renderQueue.push(func);
  if (_renderQueue.length === 1) {
    gsap3.ticker.add(_renderQueueTick);
  }
};
var _renderQueueTimeout = function _renderQueueTimeout2() {
  return !_renderQueue.length && gsap3.ticker.remove(_renderQueueTick);
};
var _removeFromRenderQueue = function _removeFromRenderQueue2(func) {
  var i2 = _renderQueue.length;
  while (i2--) {
    if (_renderQueue[i2] === func) {
      _renderQueue.splice(i2, 1);
    }
  }
  gsap3.to(_renderQueueTimeout, {
    overwrite: true,
    delay: 15,
    duration: 0,
    onComplete: _renderQueueTimeout,
    data: "_draggable"
  });
};
var _setDefaults = function _setDefaults2(obj, defaults) {
  for (var p2 in defaults) {
    if (!(p2 in obj)) {
      obj[p2] = defaults[p2];
    }
  }
  return obj;
};
var _addListener = function _addListener2(element, type, func, capture) {
  if (element.addEventListener) {
    var touchType = _touchEventLookup[type];
    capture = capture || (_supportsPassive ? {
      passive: false
    } : null);
    element.addEventListener(touchType || type, func, capture);
    touchType && type !== touchType && element.addEventListener(type, func, capture);
  }
};
var _removeListener = function _removeListener2(element, type, func, capture) {
  if (element.removeEventListener) {
    var touchType = _touchEventLookup[type];
    element.removeEventListener(touchType || type, func, capture);
    touchType && type !== touchType && element.removeEventListener(type, func, capture);
  }
};
var _preventDefault = function _preventDefault2(event) {
  event.preventDefault && event.preventDefault();
  event.preventManipulation && event.preventManipulation();
};
var _hasTouchID = function _hasTouchID2(list, ID) {
  var i2 = list.length;
  while (i2--) {
    if (list[i2].identifier === ID) {
      return true;
    }
  }
};
var _onMultiTouchDocumentEnd = function _onMultiTouchDocumentEnd2(event) {
  _isMultiTouching = event.touches && _dragCount2 < event.touches.length;
  _removeListener(event.target, "touchend", _onMultiTouchDocumentEnd2);
};
var _onMultiTouchDocument = function _onMultiTouchDocument2(event) {
  _isMultiTouching = event.touches && _dragCount2 < event.touches.length;
  _addListener(event.target, "touchend", _onMultiTouchDocumentEnd);
};
var _getDocScrollTop3 = function _getDocScrollTop4(doc) {
  return _win2.pageYOffset || doc.scrollTop || doc.documentElement.scrollTop || doc.body.scrollTop || 0;
};
var _getDocScrollLeft3 = function _getDocScrollLeft4(doc) {
  return _win2.pageXOffset || doc.scrollLeft || doc.documentElement.scrollLeft || doc.body.scrollLeft || 0;
};
var _addScrollListener = function _addScrollListener2(e, callback) {
  _addListener(e, "scroll", callback);
  if (!_isRoot(e.parentNode)) {
    _addScrollListener2(e.parentNode, callback);
  }
};
var _removeScrollListener = function _removeScrollListener2(e, callback) {
  _removeListener(e, "scroll", callback);
  if (!_isRoot(e.parentNode)) {
    _removeScrollListener2(e.parentNode, callback);
  }
};
var _isRoot = function _isRoot2(e) {
  return !!(!e || e === _docElement2 || e.nodeType === 9 || e === _doc2.body || e === _win2 || !e.nodeType || !e.parentNode);
};
var _getMaxScroll = function _getMaxScroll2(element, axis) {
  var dim = axis === "x" ? "Width" : "Height", scroll = "scroll" + dim, client = "client" + dim;
  return Math.max(0, _isRoot(element) ? Math.max(_docElement2[scroll], _body2[scroll]) - (_win2["inner" + dim] || _docElement2[client] || _body2[client]) : element[scroll] - element[client]);
};
var _recordMaxScrolls = function _recordMaxScrolls2(e, skipCurrent) {
  var x = _getMaxScroll(e, "x"), y = _getMaxScroll(e, "y");
  if (_isRoot(e)) {
    e = _windowProxy;
  } else {
    _recordMaxScrolls2(e.parentNode, skipCurrent);
  }
  e._gsMaxScrollX = x;
  e._gsMaxScrollY = y;
  if (!skipCurrent) {
    e._gsScrollX = e.scrollLeft || 0;
    e._gsScrollY = e.scrollTop || 0;
  }
};
var _setStyle = function _setStyle2(element, property, value) {
  var style = element.style;
  if (!style) {
    return;
  }
  if (_isUndefined3(style[property])) {
    property = _checkPrefix(property, element) || property;
  }
  if (value == null) {
    style.removeProperty && style.removeProperty(property.replace(/([A-Z])/g, "-$1").toLowerCase());
  } else {
    style[property] = value;
  }
};
var _getComputedStyle = function _getComputedStyle2(element) {
  return _win2.getComputedStyle(element instanceof Element ? element : element.host || (element.parentNode || {}).host || element);
};
var _tempRect = {};
var _parseRect = function _parseRect2(e) {
  if (e === _win2) {
    _tempRect.left = _tempRect.top = 0;
    _tempRect.width = _tempRect.right = _docElement2.clientWidth || e.innerWidth || _body2.clientWidth || 0;
    _tempRect.height = _tempRect.bottom = (e.innerHeight || 0) - 20 < _docElement2.clientHeight ? _docElement2.clientHeight : e.innerHeight || _body2.clientHeight || 0;
    return _tempRect;
  }
  var doc = e.ownerDocument || _doc2, r = !_isUndefined3(e.pageX) ? {
    left: e.pageX - _getDocScrollLeft3(doc),
    top: e.pageY - _getDocScrollTop3(doc),
    right: e.pageX - _getDocScrollLeft3(doc) + 1,
    bottom: e.pageY - _getDocScrollTop3(doc) + 1
  } : !e.nodeType && !_isUndefined3(e.left) && !_isUndefined3(e.top) ? e : _toArray(e)[0].getBoundingClientRect();
  if (_isUndefined3(r.right) && !_isUndefined3(r.width)) {
    r.right = r.left + r.width;
    r.bottom = r.top + r.height;
  } else if (_isUndefined3(r.width)) {
    r = {
      width: r.right - r.left,
      height: r.bottom - r.top,
      right: r.right,
      left: r.left,
      bottom: r.bottom,
      top: r.top
    };
  }
  return r;
};
var _dispatchEvent = function _dispatchEvent2(target, type, callbackName) {
  var vars = target.vars, callback = vars[callbackName], listeners = target._listeners[type], result;
  if (_isFunction(callback)) {
    result = callback.apply(vars.callbackScope || target, vars[callbackName + "Params"] || [target.pointerEvent]);
  }
  if (listeners && target.dispatchEvent(type) === false) {
    result = false;
  }
  return result;
};
var _getBounds = function _getBounds2(target, context) {
  var e = _toArray(target)[0], top, left, offset;
  if (!e.nodeType && e !== _win2) {
    if (!_isUndefined3(target.left)) {
      offset = {
        x: 0,
        y: 0
      };
      return {
        left: target.left - offset.x,
        top: target.top - offset.y,
        width: target.width,
        height: target.height
      };
    }
    left = target.min || target.minX || target.minRotation || 0;
    top = target.min || target.minY || 0;
    return {
      left,
      top,
      width: (target.max || target.maxX || target.maxRotation || 0) - left,
      height: (target.max || target.maxY || 0) - top
    };
  }
  return _getElementBounds(e, context);
};
var _point1 = {};
var _getElementBounds = function _getElementBounds2(element, context) {
  context = _toArray(context)[0];
  var isSVG = element.getBBox && element.ownerSVGElement, doc = element.ownerDocument || _doc2, left, right, top, bottom, matrix, p1, p2, p3, p4, bbox, width, height, cs;
  if (element === _win2) {
    top = _getDocScrollTop3(doc);
    left = _getDocScrollLeft3(doc);
    right = left + (doc.documentElement.clientWidth || element.innerWidth || doc.body.clientWidth || 0);
    bottom = top + ((element.innerHeight || 0) - 20 < doc.documentElement.clientHeight ? doc.documentElement.clientHeight : element.innerHeight || doc.body.clientHeight || 0);
  } else if (context === _win2 || _isUndefined3(context)) {
    return element.getBoundingClientRect();
  } else {
    left = top = 0;
    if (isSVG) {
      bbox = element.getBBox();
      width = bbox.width;
      height = bbox.height;
    } else {
      if (element.viewBox && (bbox = element.viewBox.baseVal)) {
        left = bbox.x || 0;
        top = bbox.y || 0;
        width = bbox.width;
        height = bbox.height;
      }
      if (!width) {
        cs = _getComputedStyle(element);
        bbox = cs.boxSizing === "border-box";
        width = (parseFloat(cs.width) || element.clientWidth || 0) + (bbox ? 0 : parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth));
        height = (parseFloat(cs.height) || element.clientHeight || 0) + (bbox ? 0 : parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth));
      }
    }
    right = width;
    bottom = height;
  }
  if (element === context) {
    return {
      left,
      top,
      width: right - left,
      height: bottom - top
    };
  }
  matrix = getGlobalMatrix(context, true).multiply(getGlobalMatrix(element));
  p1 = matrix.apply({
    x: left,
    y: top
  });
  p2 = matrix.apply({
    x: right,
    y: top
  });
  p3 = matrix.apply({
    x: right,
    y: bottom
  });
  p4 = matrix.apply({
    x: left,
    y: bottom
  });
  left = Math.min(p1.x, p2.x, p3.x, p4.x);
  top = Math.min(p1.y, p2.y, p3.y, p4.y);
  return {
    left,
    top,
    width: Math.max(p1.x, p2.x, p3.x, p4.x) - left,
    height: Math.max(p1.y, p2.y, p3.y, p4.y) - top
  };
};
var _parseInertia = function _parseInertia2(draggable, snap2, max, min, factor, forceZeroVelocity) {
  var vars = {}, a, i2, l;
  if (snap2) {
    if (factor !== 1 && snap2 instanceof Array) {
      vars.end = a = [];
      l = snap2.length;
      if (_isObject(snap2[0])) {
        for (i2 = 0; i2 < l; i2++) {
          a[i2] = _copy(snap2[i2], factor);
        }
      } else {
        for (i2 = 0; i2 < l; i2++) {
          a[i2] = snap2[i2] * factor;
        }
      }
      max += 1.1;
      min -= 1.1;
    } else if (_isFunction(snap2)) {
      vars.end = function(value) {
        var result = snap2.call(draggable, value), copy, p2;
        if (factor !== 1) {
          if (_isObject(result)) {
            copy = {};
            for (p2 in result) {
              copy[p2] = result[p2] * factor;
            }
            result = copy;
          } else {
            result *= factor;
          }
        }
        return result;
      };
    } else {
      vars.end = snap2;
    }
  }
  if (max || max === 0) {
    vars.max = max;
  }
  if (min || min === 0) {
    vars.min = min;
  }
  if (forceZeroVelocity) {
    vars.velocity = 0;
  }
  return vars;
};
var _isClickable = function _isClickable2(element) {
  var data;
  return !element || !element.getAttribute || element === _body2 ? false : (data = element.getAttribute("data-clickable")) === "true" || data !== "false" && (_clickableTagExp.test(element.nodeName + "") || element.getAttribute("contentEditable") === "true") ? true : _isClickable2(element.parentNode);
};
var _setSelectable = function _setSelectable2(elements, selectable) {
  var i2 = elements.length, e;
  while (i2--) {
    e = elements[i2];
    e.ondragstart = e.onselectstart = selectable ? null : _emptyFunc;
    gsap3.set(e, {
      lazy: true,
      userSelect: selectable ? "text" : "none"
    });
  }
};
var _isFixed3 = function _isFixed4(element) {
  if (_getComputedStyle(element).position === "fixed") {
    return true;
  }
  element = element.parentNode;
  if (element && element.nodeType === 1) {
    return _isFixed4(element);
  }
};
var _supports3D;
var _addPaddingBR;
var ScrollProxy = function ScrollProxy2(element, vars) {
  element = gsap3.utils.toArray(element)[0];
  vars = vars || {};
  var content = document.createElement("div"), style = content.style, node = element.firstChild, offsetTop = 0, offsetLeft = 0, prevTop = element.scrollTop, prevLeft = element.scrollLeft, scrollWidth = element.scrollWidth, scrollHeight = element.scrollHeight, extraPadRight = 0, maxLeft = 0, maxTop = 0, elementWidth, elementHeight, contentHeight, nextNode, transformStart, transformEnd;
  if (_supports3D && vars.force3D !== false) {
    transformStart = "translate3d(";
    transformEnd = "px,0px)";
  } else if (_transformProp2) {
    transformStart = "translate(";
    transformEnd = "px)";
  }
  this.scrollTop = function(value, force) {
    if (!arguments.length) {
      return -this.top();
    }
    this.top(-value, force);
  };
  this.scrollLeft = function(value, force) {
    if (!arguments.length) {
      return -this.left();
    }
    this.left(-value, force);
  };
  this.left = function(value, force) {
    if (!arguments.length) {
      return -(element.scrollLeft + offsetLeft);
    }
    var dif = element.scrollLeft - prevLeft, oldOffset = offsetLeft;
    if ((dif > 2 || dif < -2) && !force) {
      prevLeft = element.scrollLeft;
      gsap3.killTweensOf(this, {
        left: 1,
        scrollLeft: 1
      });
      this.left(-prevLeft);
      if (vars.onKill) {
        vars.onKill();
      }
      return;
    }
    value = -value;
    if (value < 0) {
      offsetLeft = value - 0.5 | 0;
      value = 0;
    } else if (value > maxLeft) {
      offsetLeft = value - maxLeft | 0;
      value = maxLeft;
    } else {
      offsetLeft = 0;
    }
    if (offsetLeft || oldOffset) {
      if (!this._skip) {
        style[_transformProp2] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
      }
      if (offsetLeft + extraPadRight >= 0) {
        style.paddingRight = offsetLeft + extraPadRight + "px";
      }
    }
    element.scrollLeft = value | 0;
    prevLeft = element.scrollLeft;
  };
  this.top = function(value, force) {
    if (!arguments.length) {
      return -(element.scrollTop + offsetTop);
    }
    var dif = element.scrollTop - prevTop, oldOffset = offsetTop;
    if ((dif > 2 || dif < -2) && !force) {
      prevTop = element.scrollTop;
      gsap3.killTweensOf(this, {
        top: 1,
        scrollTop: 1
      });
      this.top(-prevTop);
      if (vars.onKill) {
        vars.onKill();
      }
      return;
    }
    value = -value;
    if (value < 0) {
      offsetTop = value - 0.5 | 0;
      value = 0;
    } else if (value > maxTop) {
      offsetTop = value - maxTop | 0;
      value = maxTop;
    } else {
      offsetTop = 0;
    }
    if (offsetTop || oldOffset) {
      if (!this._skip) {
        style[_transformProp2] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
      }
    }
    element.scrollTop = value | 0;
    prevTop = element.scrollTop;
  };
  this.maxScrollTop = function() {
    return maxTop;
  };
  this.maxScrollLeft = function() {
    return maxLeft;
  };
  this.disable = function() {
    node = content.firstChild;
    while (node) {
      nextNode = node.nextSibling;
      element.appendChild(node);
      node = nextNode;
    }
    if (element === content.parentNode) {
      element.removeChild(content);
    }
  };
  this.enable = function() {
    node = element.firstChild;
    if (node === content) {
      return;
    }
    while (node) {
      nextNode = node.nextSibling;
      content.appendChild(node);
      node = nextNode;
    }
    element.appendChild(content);
    this.calibrate();
  };
  this.calibrate = function(force) {
    var widthMatches = element.clientWidth === elementWidth, cs, x, y;
    prevTop = element.scrollTop;
    prevLeft = element.scrollLeft;
    if (widthMatches && element.clientHeight === elementHeight && content.offsetHeight === contentHeight && scrollWidth === element.scrollWidth && scrollHeight === element.scrollHeight && !force) {
      return;
    }
    if (offsetTop || offsetLeft) {
      x = this.left();
      y = this.top();
      this.left(-element.scrollLeft);
      this.top(-element.scrollTop);
    }
    cs = _getComputedStyle(element);
    if (!widthMatches || force) {
      style.display = "block";
      style.width = "auto";
      style.paddingRight = "0px";
      extraPadRight = Math.max(0, element.scrollWidth - element.clientWidth);
      if (extraPadRight) {
        extraPadRight += parseFloat(cs.paddingLeft) + (_addPaddingBR ? parseFloat(cs.paddingRight) : 0);
      }
    }
    style.display = "inline-block";
    style.position = "relative";
    style.overflow = "visible";
    style.verticalAlign = "top";
    style.boxSizing = "content-box";
    style.width = "100%";
    style.paddingRight = extraPadRight + "px";
    if (_addPaddingBR) {
      style.paddingBottom = cs.paddingBottom;
    }
    elementWidth = element.clientWidth;
    elementHeight = element.clientHeight;
    scrollWidth = element.scrollWidth;
    scrollHeight = element.scrollHeight;
    maxLeft = element.scrollWidth - elementWidth;
    maxTop = element.scrollHeight - elementHeight;
    contentHeight = content.offsetHeight;
    style.display = "block";
    if (x || y) {
      this.left(x);
      this.top(y);
    }
  };
  this.content = content;
  this.element = element;
  this._skip = false;
  this.enable();
};
var _initCore3 = function _initCore4(required) {
  if (_windowExists() && document.body) {
    var nav = window && window.navigator;
    _win2 = window;
    _doc2 = document;
    _docElement2 = _doc2.documentElement;
    _body2 = _doc2.body;
    _tempDiv = _createElement("div");
    _supportsPointer = !!window.PointerEvent;
    _placeholderDiv = _createElement("div");
    _placeholderDiv.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab";
    _defaultCursor = _placeholderDiv.style.cursor === "grab" ? "grab" : "move";
    _isAndroid = nav && nav.userAgent.toLowerCase().indexOf("android") !== -1;
    _isTouchDevice = "ontouchstart" in _docElement2 && "orientation" in _win2 || nav && (nav.MaxTouchPoints > 0 || nav.msMaxTouchPoints > 0);
    _addPaddingBR = function() {
      var div = _createElement("div"), child = _createElement("div"), childStyle = child.style, parent = _body2, val;
      childStyle.display = "inline-block";
      childStyle.position = "relative";
      div.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden";
      div.appendChild(child);
      parent.appendChild(div);
      val = child.offsetHeight + 18 > div.scrollHeight;
      parent.removeChild(div);
      return val;
    }();
    _touchEventLookup = function(types) {
      var standard = types.split(","), converted = ("onpointerdown" in _tempDiv ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in _tempDiv ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : types).split(","), obj = {}, i2 = 4;
      while (--i2 > -1) {
        obj[standard[i2]] = converted[i2];
        obj[converted[i2]] = standard[i2];
      }
      try {
        _docElement2.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function get() {
            _supportsPassive = 1;
          }
        }));
      } catch (e) {
      }
      return obj;
    }("touchstart,touchmove,touchend,touchcancel");
    _addListener(_doc2, "touchcancel", _emptyFunc);
    _addListener(_win2, "touchmove", _emptyFunc);
    _body2 && _body2.addEventListener("touchstart", _emptyFunc);
    _addListener(_doc2, "contextmenu", function() {
      for (var p2 in _lookup) {
        if (_lookup[p2].isPressed) {
          _lookup[p2].endDrag();
        }
      }
    });
    gsap3 = _coreInitted2 = _getGSAP3();
  }
  if (gsap3) {
    InertiaPlugin = gsap3.plugins.inertia;
    _context = gsap3.core.context || function() {
    };
    _checkPrefix = gsap3.utils.checkPrefix;
    _transformProp2 = _checkPrefix(_transformProp2);
    _transformOriginProp2 = _checkPrefix(_transformOriginProp2);
    _toArray = gsap3.utils.toArray;
    _getStyleSaver = gsap3.core.getStyleSaver;
    _supports3D = !!_checkPrefix("perspective");
  } else if (required) {
    console.warn("Please gsap.registerPlugin(Draggable)");
  }
};
var EventDispatcher = function() {
  function EventDispatcher2(target) {
    this._listeners = {};
    this.target = target || this;
  }
  var _proto = EventDispatcher2.prototype;
  _proto.addEventListener = function addEventListener(type, callback) {
    var list = this._listeners[type] || (this._listeners[type] = []);
    if (!~list.indexOf(callback)) {
      list.push(callback);
    }
  };
  _proto.removeEventListener = function removeEventListener(type, callback) {
    var list = this._listeners[type], i2 = list && list.indexOf(callback);
    i2 >= 0 && list.splice(i2, 1);
  };
  _proto.dispatchEvent = function dispatchEvent(type) {
    var _this = this;
    var result;
    (this._listeners[type] || []).forEach(function(callback) {
      return callback.call(_this, {
        type,
        target: _this.target
      }) === false && (result = false);
    });
    return result;
  };
  return EventDispatcher2;
}();
var Draggable = function(_EventDispatcher) {
  _inheritsLoose(Draggable2, _EventDispatcher);
  function Draggable2(target, vars) {
    var _this2;
    _this2 = _EventDispatcher.call(this) || this;
    _coreInitted2 || _initCore3(1);
    target = _toArray(target)[0];
    _this2.styles = _getStyleSaver && _getStyleSaver(target, "transform,left,top");
    if (!InertiaPlugin) {
      InertiaPlugin = gsap3.plugins.inertia;
    }
    _this2.vars = vars = _copy(vars || {});
    _this2.target = target;
    _this2.x = _this2.y = _this2.rotation = 0;
    _this2.dragResistance = parseFloat(vars.dragResistance) || 0;
    _this2.edgeResistance = isNaN(vars.edgeResistance) ? 1 : parseFloat(vars.edgeResistance) || 0;
    _this2.lockAxis = vars.lockAxis;
    _this2.autoScroll = vars.autoScroll || 0;
    _this2.lockedAxis = null;
    _this2.allowEventDefault = !!vars.allowEventDefault;
    gsap3.getProperty(target, "x");
    var type = (vars.type || "x,y").toLowerCase(), xyMode = ~type.indexOf("x") || ~type.indexOf("y"), rotationMode = type.indexOf("rotation") !== -1, xProp = rotationMode ? "rotation" : xyMode ? "x" : "left", yProp = xyMode ? "y" : "top", allowX = !!(~type.indexOf("x") || ~type.indexOf("left") || type === "scroll"), allowY = !!(~type.indexOf("y") || ~type.indexOf("top") || type === "scroll"), minimumMovement = vars.minimumMovement || 2, self = _assertThisInitialized(_this2), triggers = _toArray(vars.trigger || vars.handle || target), killProps = {}, dragEndTime = 0, checkAutoScrollBounds = false, autoScrollMarginTop = vars.autoScrollMarginTop || 40, autoScrollMarginRight = vars.autoScrollMarginRight || 40, autoScrollMarginBottom = vars.autoScrollMarginBottom || 40, autoScrollMarginLeft = vars.autoScrollMarginLeft || 40, isClickable = vars.clickableTest || _isClickable, clickTime = 0, gsCache = target._gsap || gsap3.core.getCache(target), isFixed = _isFixed3(target), getPropAsNum = function getPropAsNum2(property, unit) {
      return parseFloat(gsCache.get(target, property, unit));
    }, ownerDoc = target.ownerDocument || _doc2, enabled, scrollProxy, startPointerX, startPointerY, startElementX, startElementY, hasBounds, hasDragCallback, hasMoveCallback, maxX, minX, maxY, minY, touch, touchID, rotationOrigin, dirty, old, snapX, snapY, snapXY, isClicking, touchEventTarget, matrix, interrupted, allowNativeTouchScrolling, touchDragAxis, isDispatching, clickDispatch, trustedClickDispatch, isPreventingDefault, innerMatrix, dragged, onContextMenu = function onContextMenu2(e) {
      _preventDefault(e);
      e.stopImmediatePropagation && e.stopImmediatePropagation();
      return false;
    }, render12 = function render13(suppressEvents) {
      if (self.autoScroll && self.isDragging && (checkAutoScrollBounds || dirty)) {
        var e = target, autoScrollFactor = self.autoScroll * 15, parent, isRoot, rect, pointerX, pointerY, changeX, changeY, gap;
        checkAutoScrollBounds = false;
        _windowProxy.scrollTop = _win2.pageYOffset != null ? _win2.pageYOffset : ownerDoc.documentElement.scrollTop != null ? ownerDoc.documentElement.scrollTop : ownerDoc.body.scrollTop;
        _windowProxy.scrollLeft = _win2.pageXOffset != null ? _win2.pageXOffset : ownerDoc.documentElement.scrollLeft != null ? ownerDoc.documentElement.scrollLeft : ownerDoc.body.scrollLeft;
        pointerX = self.pointerX - _windowProxy.scrollLeft;
        pointerY = self.pointerY - _windowProxy.scrollTop;
        while (e && !isRoot) {
          isRoot = _isRoot(e.parentNode);
          parent = isRoot ? _windowProxy : e.parentNode;
          rect = isRoot ? {
            bottom: Math.max(_docElement2.clientHeight, _win2.innerHeight || 0),
            right: Math.max(_docElement2.clientWidth, _win2.innerWidth || 0),
            left: 0,
            top: 0
          } : parent.getBoundingClientRect();
          changeX = changeY = 0;
          if (allowY) {
            gap = parent._gsMaxScrollY - parent.scrollTop;
            if (gap < 0) {
              changeY = gap;
            } else if (pointerY > rect.bottom - autoScrollMarginBottom && gap) {
              checkAutoScrollBounds = true;
              changeY = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.bottom - pointerY) / autoScrollMarginBottom) | 0);
            } else if (pointerY < rect.top + autoScrollMarginTop && parent.scrollTop) {
              checkAutoScrollBounds = true;
              changeY = -Math.min(parent.scrollTop, autoScrollFactor * (1 - Math.max(0, pointerY - rect.top) / autoScrollMarginTop) | 0);
            }
            if (changeY) {
              parent.scrollTop += changeY;
            }
          }
          if (allowX) {
            gap = parent._gsMaxScrollX - parent.scrollLeft;
            if (gap < 0) {
              changeX = gap;
            } else if (pointerX > rect.right - autoScrollMarginRight && gap) {
              checkAutoScrollBounds = true;
              changeX = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.right - pointerX) / autoScrollMarginRight) | 0);
            } else if (pointerX < rect.left + autoScrollMarginLeft && parent.scrollLeft) {
              checkAutoScrollBounds = true;
              changeX = -Math.min(parent.scrollLeft, autoScrollFactor * (1 - Math.max(0, pointerX - rect.left) / autoScrollMarginLeft) | 0);
            }
            if (changeX) {
              parent.scrollLeft += changeX;
            }
          }
          if (isRoot && (changeX || changeY)) {
            _win2.scrollTo(parent.scrollLeft, parent.scrollTop);
            setPointerPosition(self.pointerX + changeX, self.pointerY + changeY);
          }
          e = parent;
        }
      }
      if (dirty) {
        var x = self.x, y = self.y;
        if (rotationMode) {
          self.deltaX = x - parseFloat(gsCache.rotation);
          self.rotation = x;
          gsCache.rotation = x + "deg";
          gsCache.renderTransform(1, gsCache);
        } else {
          if (scrollProxy) {
            if (allowY) {
              self.deltaY = y - scrollProxy.top();
              scrollProxy.top(y);
            }
            if (allowX) {
              self.deltaX = x - scrollProxy.left();
              scrollProxy.left(x);
            }
          } else if (xyMode) {
            if (allowY) {
              self.deltaY = y - parseFloat(gsCache.y);
              gsCache.y = y + "px";
            }
            if (allowX) {
              self.deltaX = x - parseFloat(gsCache.x);
              gsCache.x = x + "px";
            }
            gsCache.renderTransform(1, gsCache);
          } else {
            if (allowY) {
              self.deltaY = y - parseFloat(target.style.top || 0);
              target.style.top = y + "px";
            }
            if (allowX) {
              self.deltaX = x - parseFloat(target.style.left || 0);
              target.style.left = x + "px";
            }
          }
        }
        if (hasDragCallback && !suppressEvents && !isDispatching) {
          isDispatching = true;
          if (_dispatchEvent(self, "drag", "onDrag") === false) {
            if (allowX) {
              self.x -= self.deltaX;
            }
            if (allowY) {
              self.y -= self.deltaY;
            }
            render13(true);
          }
          isDispatching = false;
        }
      }
      dirty = false;
    }, syncXY = function syncXY2(skipOnUpdate, skipSnap) {
      var x = self.x, y = self.y, snappedValue, cs;
      if (!target._gsap) {
        gsCache = gsap3.core.getCache(target);
      }
      gsCache.uncache && gsap3.getProperty(target, "x");
      if (xyMode) {
        self.x = parseFloat(gsCache.x);
        self.y = parseFloat(gsCache.y);
      } else if (rotationMode) {
        self.x = self.rotation = parseFloat(gsCache.rotation);
      } else if (scrollProxy) {
        self.y = scrollProxy.top();
        self.x = scrollProxy.left();
      } else {
        self.y = parseFloat(target.style.top || (cs = _getComputedStyle(target)) && cs.top) || 0;
        self.x = parseFloat(target.style.left || (cs || {}).left) || 0;
      }
      if ((snapX || snapY || snapXY) && !skipSnap && (self.isDragging || self.isThrowing)) {
        if (snapXY) {
          _temp1.x = self.x;
          _temp1.y = self.y;
          snappedValue = snapXY(_temp1);
          if (snappedValue.x !== self.x) {
            self.x = snappedValue.x;
            dirty = true;
          }
          if (snappedValue.y !== self.y) {
            self.y = snappedValue.y;
            dirty = true;
          }
        }
        if (snapX) {
          snappedValue = snapX(self.x);
          if (snappedValue !== self.x) {
            self.x = snappedValue;
            if (rotationMode) {
              self.rotation = snappedValue;
            }
            dirty = true;
          }
        }
        if (snapY) {
          snappedValue = snapY(self.y);
          if (snappedValue !== self.y) {
            self.y = snappedValue;
          }
          dirty = true;
        }
      }
      dirty && render12(true);
      if (!skipOnUpdate) {
        self.deltaX = self.x - x;
        self.deltaY = self.y - y;
        _dispatchEvent(self, "throwupdate", "onThrowUpdate");
      }
    }, buildSnapFunc = function buildSnapFunc2(snap2, min, max, factor) {
      if (min == null) {
        min = -_bigNum2;
      }
      if (max == null) {
        max = _bigNum2;
      }
      if (_isFunction(snap2)) {
        return function(n) {
          var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance;
          return snap2.call(self, (n > max ? max + (n - max) * edgeTolerance : n < min ? min + (n - min) * edgeTolerance : n) * factor) * factor;
        };
      }
      if (_isArray(snap2)) {
        return function(n) {
          var i2 = snap2.length, closest = 0, absDif = _bigNum2, val, dif;
          while (--i2 > -1) {
            val = snap2[i2];
            dif = val - n;
            if (dif < 0) {
              dif = -dif;
            }
            if (dif < absDif && val >= min && val <= max) {
              closest = i2;
              absDif = dif;
            }
          }
          return snap2[closest];
        };
      }
      return isNaN(snap2) ? function(n) {
        return n;
      } : function() {
        return snap2 * factor;
      };
    }, buildPointSnapFunc = function buildPointSnapFunc2(snap2, minX2, maxX2, minY2, maxY2, radius, factor) {
      radius = radius && radius < _bigNum2 ? radius * radius : _bigNum2;
      if (_isFunction(snap2)) {
        return function(point) {
          var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance, x = point.x, y = point.y, result, dx, dy;
          point.x = x = x > maxX2 ? maxX2 + (x - maxX2) * edgeTolerance : x < minX2 ? minX2 + (x - minX2) * edgeTolerance : x;
          point.y = y = y > maxY2 ? maxY2 + (y - maxY2) * edgeTolerance : y < minY2 ? minY2 + (y - minY2) * edgeTolerance : y;
          result = snap2.call(self, point);
          if (result !== point) {
            point.x = result.x;
            point.y = result.y;
          }
          if (factor !== 1) {
            point.x *= factor;
            point.y *= factor;
          }
          if (radius < _bigNum2) {
            dx = point.x - x;
            dy = point.y - y;
            if (dx * dx + dy * dy > radius) {
              point.x = x;
              point.y = y;
            }
          }
          return point;
        };
      }
      if (_isArray(snap2)) {
        return function(p2) {
          var i2 = snap2.length, closest = 0, minDist = _bigNum2, x, y, point, dist;
          while (--i2 > -1) {
            point = snap2[i2];
            x = point.x - p2.x;
            y = point.y - p2.y;
            dist = x * x + y * y;
            if (dist < minDist) {
              closest = i2;
              minDist = dist;
            }
          }
          return minDist <= radius ? snap2[closest] : p2;
        };
      }
      return function(n) {
        return n;
      };
    }, calculateBounds = function calculateBounds2() {
      var bounds, targetBounds, snap2, snapIsRaw;
      hasBounds = false;
      if (scrollProxy) {
        scrollProxy.calibrate();
        self.minX = minX = -scrollProxy.maxScrollLeft();
        self.minY = minY = -scrollProxy.maxScrollTop();
        self.maxX = maxX = self.maxY = maxY = 0;
        hasBounds = true;
      } else if (!!vars.bounds) {
        bounds = _getBounds(vars.bounds, target.parentNode);
        if (rotationMode) {
          self.minX = minX = bounds.left;
          self.maxX = maxX = bounds.left + bounds.width;
          self.minY = minY = self.maxY = maxY = 0;
        } else if (!_isUndefined3(vars.bounds.maxX) || !_isUndefined3(vars.bounds.maxY)) {
          bounds = vars.bounds;
          self.minX = minX = bounds.minX;
          self.minY = minY = bounds.minY;
          self.maxX = maxX = bounds.maxX;
          self.maxY = maxY = bounds.maxY;
        } else {
          targetBounds = _getBounds(target, target.parentNode);
          self.minX = minX = Math.round(getPropAsNum(xProp, "px") + bounds.left - targetBounds.left);
          self.minY = minY = Math.round(getPropAsNum(yProp, "px") + bounds.top - targetBounds.top);
          self.maxX = maxX = Math.round(minX + (bounds.width - targetBounds.width));
          self.maxY = maxY = Math.round(minY + (bounds.height - targetBounds.height));
        }
        if (minX > maxX) {
          self.minX = maxX;
          self.maxX = maxX = minX;
          minX = self.minX;
        }
        if (minY > maxY) {
          self.minY = maxY;
          self.maxY = maxY = minY;
          minY = self.minY;
        }
        if (rotationMode) {
          self.minRotation = minX;
          self.maxRotation = maxX;
        }
        hasBounds = true;
      }
      if (vars.liveSnap) {
        snap2 = vars.liveSnap === true ? vars.snap || {} : vars.liveSnap;
        snapIsRaw = _isArray(snap2) || _isFunction(snap2);
        if (rotationMode) {
          snapX = buildSnapFunc(snapIsRaw ? snap2 : snap2.rotation, minX, maxX, 1);
          snapY = null;
        } else {
          if (snap2.points) {
            snapXY = buildPointSnapFunc(snapIsRaw ? snap2 : snap2.points, minX, maxX, minY, maxY, snap2.radius, scrollProxy ? -1 : 1);
          } else {
            if (allowX) {
              snapX = buildSnapFunc(snapIsRaw ? snap2 : snap2.x || snap2.left || snap2.scrollLeft, minX, maxX, scrollProxy ? -1 : 1);
            }
            if (allowY) {
              snapY = buildSnapFunc(snapIsRaw ? snap2 : snap2.y || snap2.top || snap2.scrollTop, minY, maxY, scrollProxy ? -1 : 1);
            }
          }
        }
      }
    }, onThrowComplete = function onThrowComplete2() {
      self.isThrowing = false;
      _dispatchEvent(self, "throwcomplete", "onThrowComplete");
    }, onThrowInterrupt = function onThrowInterrupt2() {
      self.isThrowing = false;
    }, animate = function animate2(inertia, forceZeroVelocity) {
      var snap2, snapIsRaw, tween, overshootTolerance;
      if (inertia && InertiaPlugin) {
        if (inertia === true) {
          snap2 = vars.snap || vars.liveSnap || {};
          snapIsRaw = _isArray(snap2) || _isFunction(snap2);
          inertia = {
            resistance: (vars.throwResistance || vars.resistance || 1e3) / (rotationMode ? 10 : 1)
          };
          if (rotationMode) {
            inertia.rotation = _parseInertia(self, snapIsRaw ? snap2 : snap2.rotation, maxX, minX, 1, forceZeroVelocity);
          } else {
            if (allowX) {
              inertia[xProp] = _parseInertia(self, snapIsRaw ? snap2 : snap2.points || snap2.x || snap2.left, maxX, minX, scrollProxy ? -1 : 1, forceZeroVelocity || self.lockedAxis === "x");
            }
            if (allowY) {
              inertia[yProp] = _parseInertia(self, snapIsRaw ? snap2 : snap2.points || snap2.y || snap2.top, maxY, minY, scrollProxy ? -1 : 1, forceZeroVelocity || self.lockedAxis === "y");
            }
            if (snap2.points || _isArray(snap2) && _isObject(snap2[0])) {
              inertia.linkedProps = xProp + "," + yProp;
              inertia.radius = snap2.radius;
            }
          }
        }
        self.isThrowing = true;
        overshootTolerance = !isNaN(vars.overshootTolerance) ? vars.overshootTolerance : vars.edgeResistance === 1 ? 0 : 1 - self.edgeResistance + 0.2;
        if (!inertia.duration) {
          inertia.duration = {
            max: Math.max(vars.minDuration || 0, "maxDuration" in vars ? vars.maxDuration : 2),
            min: !isNaN(vars.minDuration) ? vars.minDuration : overshootTolerance === 0 || _isObject(inertia) && inertia.resistance > 1e3 ? 0 : 0.5,
            overshoot: overshootTolerance
          };
        }
        self.tween = tween = gsap3.to(scrollProxy || target, {
          inertia,
          data: "_draggable",
          inherit: false,
          onComplete: onThrowComplete,
          onInterrupt: onThrowInterrupt,
          onUpdate: vars.fastMode ? _dispatchEvent : syncXY,
          onUpdateParams: vars.fastMode ? [self, "onthrowupdate", "onThrowUpdate"] : snap2 && snap2.radius ? [false, true] : []
        });
        if (!vars.fastMode) {
          if (scrollProxy) {
            scrollProxy._skip = true;
          }
          tween.render(1e9, true, true);
          syncXY(true, true);
          self.endX = self.x;
          self.endY = self.y;
          if (rotationMode) {
            self.endRotation = self.x;
          }
          tween.play(0);
          syncXY(true, true);
          if (scrollProxy) {
            scrollProxy._skip = false;
          }
        }
      } else if (hasBounds) {
        self.applyBounds();
      }
    }, updateMatrix = function updateMatrix2(shiftStart) {
      var start = matrix, p2;
      matrix = getGlobalMatrix(target.parentNode, true);
      if (shiftStart && self.isPressed && !matrix.equals(start || new Matrix2D())) {
        p2 = start.inverse().apply({
          x: startPointerX,
          y: startPointerY
        });
        matrix.apply(p2, p2);
        startPointerX = p2.x;
        startPointerY = p2.y;
      }
      if (matrix.equals(_identityMatrix2)) {
        matrix = null;
      }
    }, recordStartPositions = function recordStartPositions2() {
      var edgeTolerance = 1 - self.edgeResistance, offsetX = isFixed ? _getDocScrollLeft3(ownerDoc) : 0, offsetY = isFixed ? _getDocScrollTop3(ownerDoc) : 0, parsedOrigin, x, y;
      if (xyMode) {
        gsCache.x = getPropAsNum(xProp, "px") + "px";
        gsCache.y = getPropAsNum(yProp, "px") + "px";
        gsCache.renderTransform();
      }
      updateMatrix(false);
      _point1.x = self.pointerX - offsetX;
      _point1.y = self.pointerY - offsetY;
      matrix && matrix.apply(_point1, _point1);
      startPointerX = _point1.x;
      startPointerY = _point1.y;
      if (dirty) {
        setPointerPosition(self.pointerX, self.pointerY);
        render12(true);
      }
      innerMatrix = getGlobalMatrix(target);
      if (scrollProxy) {
        calculateBounds();
        startElementY = scrollProxy.top();
        startElementX = scrollProxy.left();
      } else {
        if (isTweening()) {
          syncXY(true, true);
          calculateBounds();
        } else {
          self.applyBounds();
        }
        if (rotationMode) {
          parsedOrigin = target.ownerSVGElement ? [gsCache.xOrigin - target.getBBox().x, gsCache.yOrigin - target.getBBox().y] : (_getComputedStyle(target)[_transformOriginProp2] || "0 0").split(" ");
          rotationOrigin = self.rotationOrigin = getGlobalMatrix(target).apply({
            x: parseFloat(parsedOrigin[0]) || 0,
            y: parseFloat(parsedOrigin[1]) || 0
          });
          syncXY(true, true);
          x = self.pointerX - rotationOrigin.x - offsetX;
          y = rotationOrigin.y - self.pointerY + offsetY;
          startElementX = self.x;
          startElementY = self.y = Math.atan2(y, x) * _RAD2DEG2;
        } else {
          startElementY = getPropAsNum(yProp, "px");
          startElementX = getPropAsNum(xProp, "px");
        }
      }
      if (hasBounds && edgeTolerance) {
        if (startElementX > maxX) {
          startElementX = maxX + (startElementX - maxX) / edgeTolerance;
        } else if (startElementX < minX) {
          startElementX = minX - (minX - startElementX) / edgeTolerance;
        }
        if (!rotationMode) {
          if (startElementY > maxY) {
            startElementY = maxY + (startElementY - maxY) / edgeTolerance;
          } else if (startElementY < minY) {
            startElementY = minY - (minY - startElementY) / edgeTolerance;
          }
        }
      }
      self.startX = startElementX = _round5(startElementX);
      self.startY = startElementY = _round5(startElementY);
    }, isTweening = function isTweening2() {
      return self.tween && self.tween.isActive();
    }, removePlaceholder = function removePlaceholder2() {
      if (_placeholderDiv.parentNode && !isTweening() && !self.isDragging) {
        _placeholderDiv.parentNode.removeChild(_placeholderDiv);
      }
    }, onPress = function onPress2(e, force) {
      var i2;
      if (!enabled || self.isPressed || !e || (e.type === "mousedown" || e.type === "pointerdown") && !force && _getTime() - clickTime < 30 && _touchEventLookup[self.pointerEvent.type]) {
        isPreventingDefault && e && enabled && _preventDefault(e);
        return;
      }
      interrupted = isTweening();
      dragged = false;
      self.pointerEvent = e;
      if (_touchEventLookup[e.type]) {
        touchEventTarget = ~e.type.indexOf("touch") ? e.currentTarget || e.target : ownerDoc;
        _addListener(touchEventTarget, "touchend", onRelease);
        _addListener(touchEventTarget, "touchmove", onMove);
        _addListener(touchEventTarget, "touchcancel", onRelease);
        _addListener(ownerDoc, "touchstart", _onMultiTouchDocument);
      } else {
        touchEventTarget = null;
        _addListener(ownerDoc, "mousemove", onMove);
      }
      touchDragAxis = null;
      if (!_supportsPointer || !touchEventTarget) {
        _addListener(ownerDoc, "mouseup", onRelease);
        e && e.target && _addListener(e.target, "mouseup", onRelease);
      }
      isClicking = isClickable.call(self, e.target) && vars.dragClickables === false && !force;
      if (isClicking) {
        _addListener(e.target, "change", onRelease);
        _dispatchEvent(self, "pressInit", "onPressInit");
        _dispatchEvent(self, "press", "onPress");
        _setSelectable(triggers, true);
        isPreventingDefault = false;
        return;
      }
      allowNativeTouchScrolling = !touchEventTarget || allowX === allowY || self.vars.allowNativeTouchScrolling === false || self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2) ? false : allowX ? "y" : "x";
      isPreventingDefault = !allowNativeTouchScrolling && !self.allowEventDefault;
      if (isPreventingDefault) {
        _preventDefault(e);
        _addListener(_win2, "touchforcechange", _preventDefault);
      }
      if (e.changedTouches) {
        e = touch = e.changedTouches[0];
        touchID = e.identifier;
      } else if (e.pointerId) {
        touchID = e.pointerId;
      } else {
        touch = touchID = null;
      }
      _dragCount2++;
      _addToRenderQueue(render12);
      startPointerY = self.pointerY = e.pageY;
      startPointerX = self.pointerX = e.pageX;
      _dispatchEvent(self, "pressInit", "onPressInit");
      if (allowNativeTouchScrolling || self.autoScroll) {
        _recordMaxScrolls(target.parentNode);
      }
      if (target.parentNode && self.autoScroll && !scrollProxy && !rotationMode && target.parentNode._gsMaxScrollX && !_placeholderDiv.parentNode && !target.getBBox) {
        _placeholderDiv.style.width = target.parentNode.scrollWidth + "px";
        target.parentNode.appendChild(_placeholderDiv);
      }
      recordStartPositions();
      self.tween && self.tween.kill();
      self.isThrowing = false;
      gsap3.killTweensOf(scrollProxy || target, killProps, true);
      scrollProxy && gsap3.killTweensOf(target, {
        scrollTo: 1
      }, true);
      self.tween = self.lockedAxis = null;
      if (vars.zIndexBoost || !rotationMode && !scrollProxy && vars.zIndexBoost !== false) {
        target.style.zIndex = Draggable2.zIndex++;
      }
      self.isPressed = true;
      hasDragCallback = !!(vars.onDrag || self._listeners.drag);
      hasMoveCallback = !!(vars.onMove || self._listeners.move);
      if (vars.cursor !== false || vars.activeCursor) {
        i2 = triggers.length;
        while (--i2 > -1) {
          gsap3.set(triggers[i2], {
            cursor: vars.activeCursor || vars.cursor || (_defaultCursor === "grab" ? "grabbing" : _defaultCursor)
          });
        }
      }
      _dispatchEvent(self, "press", "onPress");
    }, onMove = function onMove2(e) {
      var originalEvent = e, touches, pointerX, pointerY, i2, dx, dy;
      if (!enabled || _isMultiTouching || !self.isPressed || !e) {
        isPreventingDefault && e && enabled && _preventDefault(e);
        return;
      }
      self.pointerEvent = e;
      touches = e.changedTouches;
      if (touches) {
        e = touches[0];
        if (e !== touch && e.identifier !== touchID) {
          i2 = touches.length;
          while (--i2 > -1 && (e = touches[i2]).identifier !== touchID && e.target !== target) {
          }
          if (i2 < 0) {
            return;
          }
        }
      } else if (e.pointerId && touchID && e.pointerId !== touchID) {
        return;
      }
      if (touchEventTarget && allowNativeTouchScrolling && !touchDragAxis) {
        _point1.x = e.pageX - (isFixed ? _getDocScrollLeft3(ownerDoc) : 0);
        _point1.y = e.pageY - (isFixed ? _getDocScrollTop3(ownerDoc) : 0);
        matrix && matrix.apply(_point1, _point1);
        pointerX = _point1.x;
        pointerY = _point1.y;
        dx = Math.abs(pointerX - startPointerX);
        dy = Math.abs(pointerY - startPointerY);
        if (dx !== dy && (dx > minimumMovement || dy > minimumMovement) || _isAndroid && allowNativeTouchScrolling === touchDragAxis) {
          touchDragAxis = dx > dy && allowX ? "x" : "y";
          if (allowNativeTouchScrolling && touchDragAxis !== allowNativeTouchScrolling) {
            _addListener(_win2, "touchforcechange", _preventDefault);
          }
          if (self.vars.lockAxisOnTouchScroll !== false && allowX && allowY) {
            self.lockedAxis = touchDragAxis === "x" ? "y" : "x";
            _isFunction(self.vars.onLockAxis) && self.vars.onLockAxis.call(self, originalEvent);
          }
          if (_isAndroid && allowNativeTouchScrolling === touchDragAxis) {
            onRelease(originalEvent);
            return;
          }
        }
      }
      if (!self.allowEventDefault && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling !== touchDragAxis) && originalEvent.cancelable !== false) {
        _preventDefault(originalEvent);
        isPreventingDefault = true;
      } else if (isPreventingDefault) {
        isPreventingDefault = false;
      }
      if (self.autoScroll) {
        checkAutoScrollBounds = true;
      }
      setPointerPosition(e.pageX, e.pageY, hasMoveCallback);
    }, setPointerPosition = function setPointerPosition2(pointerX, pointerY, invokeOnMove) {
      var dragTolerance = 1 - self.dragResistance, edgeTolerance = 1 - self.edgeResistance, prevPointerX = self.pointerX, prevPointerY = self.pointerY, prevStartElementY = startElementY, prevX = self.x, prevY = self.y, prevEndX = self.endX, prevEndY = self.endY, prevEndRotation = self.endRotation, prevDirty = dirty, xChange, yChange, x, y, dif, temp;
      self.pointerX = pointerX;
      self.pointerY = pointerY;
      if (isFixed) {
        pointerX -= _getDocScrollLeft3(ownerDoc);
        pointerY -= _getDocScrollTop3(ownerDoc);
      }
      if (rotationMode) {
        y = Math.atan2(rotationOrigin.y - pointerY, pointerX - rotationOrigin.x) * _RAD2DEG2;
        dif = self.y - y;
        if (dif > 180) {
          startElementY -= 360;
          self.y = y;
        } else if (dif < -180) {
          startElementY += 360;
          self.y = y;
        }
        if (self.x !== startElementX || Math.max(Math.abs(startPointerX - pointerX), Math.abs(startPointerY - pointerY)) > minimumMovement) {
          self.y = y;
          x = startElementX + (startElementY - y) * dragTolerance;
        } else {
          x = startElementX;
        }
      } else {
        if (matrix) {
          temp = pointerX * matrix.a + pointerY * matrix.c + matrix.e;
          pointerY = pointerX * matrix.b + pointerY * matrix.d + matrix.f;
          pointerX = temp;
        }
        yChange = pointerY - startPointerY;
        xChange = pointerX - startPointerX;
        if (yChange < minimumMovement && yChange > -minimumMovement) {
          yChange = 0;
        }
        if (xChange < minimumMovement && xChange > -minimumMovement) {
          xChange = 0;
        }
        if ((self.lockAxis || self.lockedAxis) && (xChange || yChange)) {
          temp = self.lockedAxis;
          if (!temp) {
            self.lockedAxis = temp = allowX && Math.abs(xChange) > Math.abs(yChange) ? "y" : allowY ? "x" : null;
            if (temp && _isFunction(self.vars.onLockAxis)) {
              self.vars.onLockAxis.call(self, self.pointerEvent);
            }
          }
          if (temp === "y") {
            yChange = 0;
          } else if (temp === "x") {
            xChange = 0;
          }
        }
        x = _round5(startElementX + xChange * dragTolerance);
        y = _round5(startElementY + yChange * dragTolerance);
      }
      if ((snapX || snapY || snapXY) && (self.x !== x || self.y !== y && !rotationMode)) {
        if (snapXY) {
          _temp1.x = x;
          _temp1.y = y;
          temp = snapXY(_temp1);
          x = _round5(temp.x);
          y = _round5(temp.y);
        }
        if (snapX) {
          x = _round5(snapX(x));
        }
        if (snapY) {
          y = _round5(snapY(y));
        }
      }
      if (hasBounds) {
        if (x > maxX) {
          x = maxX + Math.round((x - maxX) * edgeTolerance);
        } else if (x < minX) {
          x = minX + Math.round((x - minX) * edgeTolerance);
        }
        if (!rotationMode) {
          if (y > maxY) {
            y = Math.round(maxY + (y - maxY) * edgeTolerance);
          } else if (y < minY) {
            y = Math.round(minY + (y - minY) * edgeTolerance);
          }
        }
      }
      if (self.x !== x || self.y !== y && !rotationMode) {
        if (rotationMode) {
          self.endRotation = self.x = self.endX = x;
          dirty = true;
        } else {
          if (allowY) {
            self.y = self.endY = y;
            dirty = true;
          }
          if (allowX) {
            self.x = self.endX = x;
            dirty = true;
          }
        }
        if (!invokeOnMove || _dispatchEvent(self, "move", "onMove") !== false) {
          if (!self.isDragging && self.isPressed) {
            self.isDragging = dragged = true;
            _dispatchEvent(self, "dragstart", "onDragStart");
          }
        } else {
          self.pointerX = prevPointerX;
          self.pointerY = prevPointerY;
          startElementY = prevStartElementY;
          self.x = prevX;
          self.y = prevY;
          self.endX = prevEndX;
          self.endY = prevEndY;
          self.endRotation = prevEndRotation;
          dirty = prevDirty;
        }
      }
    }, onRelease = function onRelease2(e, force) {
      if (!enabled || !self.isPressed || e && touchID != null && !force && (e.pointerId && e.pointerId !== touchID && e.target !== target || e.changedTouches && !_hasTouchID(e.changedTouches, touchID))) {
        isPreventingDefault && e && enabled && _preventDefault(e);
        return;
      }
      self.isPressed = false;
      var originalEvent = e, wasDragging = self.isDragging, isContextMenuRelease = self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2), placeholderDelayedCall = gsap3.delayedCall(1e-3, removePlaceholder), touches, i2, syntheticEvent, eventTarget, syntheticClick;
      if (touchEventTarget) {
        _removeListener(touchEventTarget, "touchend", onRelease2);
        _removeListener(touchEventTarget, "touchmove", onMove);
        _removeListener(touchEventTarget, "touchcancel", onRelease2);
        _removeListener(ownerDoc, "touchstart", _onMultiTouchDocument);
      } else {
        _removeListener(ownerDoc, "mousemove", onMove);
      }
      _removeListener(_win2, "touchforcechange", _preventDefault);
      if (!_supportsPointer || !touchEventTarget) {
        _removeListener(ownerDoc, "mouseup", onRelease2);
        e && e.target && _removeListener(e.target, "mouseup", onRelease2);
      }
      dirty = false;
      if (wasDragging) {
        dragEndTime = _lastDragTime = _getTime();
        self.isDragging = false;
      }
      _removeFromRenderQueue(render12);
      if (isClicking && !isContextMenuRelease) {
        if (e) {
          _removeListener(e.target, "change", onRelease2);
          self.pointerEvent = originalEvent;
        }
        _setSelectable(triggers, false);
        _dispatchEvent(self, "release", "onRelease");
        _dispatchEvent(self, "click", "onClick");
        isClicking = false;
        return;
      }
      i2 = triggers.length;
      while (--i2 > -1) {
        _setStyle(triggers[i2], "cursor", vars.cursor || (vars.cursor !== false ? _defaultCursor : null));
      }
      _dragCount2--;
      if (e) {
        touches = e.changedTouches;
        if (touches) {
          e = touches[0];
          if (e !== touch && e.identifier !== touchID) {
            i2 = touches.length;
            while (--i2 > -1 && (e = touches[i2]).identifier !== touchID && e.target !== target) {
            }
            if (i2 < 0 && !force) {
              return;
            }
          }
        }
        self.pointerEvent = originalEvent;
        self.pointerX = e.pageX;
        self.pointerY = e.pageY;
      }
      if (isContextMenuRelease && originalEvent) {
        _preventDefault(originalEvent);
        isPreventingDefault = true;
        _dispatchEvent(self, "release", "onRelease");
      } else if (originalEvent && !wasDragging) {
        isPreventingDefault = false;
        if (interrupted && (vars.snap || vars.bounds)) {
          animate(vars.inertia || vars.throwProps);
        }
        _dispatchEvent(self, "release", "onRelease");
        if ((!_isAndroid || originalEvent.type !== "touchmove") && originalEvent.type.indexOf("cancel") === -1) {
          _dispatchEvent(self, "click", "onClick");
          if (_getTime() - clickTime < 300) {
            _dispatchEvent(self, "doubleclick", "onDoubleClick");
          }
          eventTarget = originalEvent.target || target;
          clickTime = _getTime();
          syntheticClick = function syntheticClick2() {
            if (clickTime !== clickDispatch && self.enabled() && !self.isPressed && !originalEvent.defaultPrevented) {
              if (eventTarget.click) {
                eventTarget.click();
              } else if (ownerDoc.createEvent) {
                syntheticEvent = ownerDoc.createEvent("MouseEvents");
                syntheticEvent.initMouseEvent("click", true, true, _win2, 1, self.pointerEvent.screenX, self.pointerEvent.screenY, self.pointerX, self.pointerY, false, false, false, false, 0, null);
                eventTarget.dispatchEvent(syntheticEvent);
              }
            }
          };
          if (!_isAndroid && !originalEvent.defaultPrevented) {
            gsap3.delayedCall(0.05, syntheticClick);
          }
        }
      } else {
        animate(vars.inertia || vars.throwProps);
        if (!self.allowEventDefault && originalEvent && (vars.dragClickables !== false || !isClickable.call(self, originalEvent.target)) && wasDragging && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling === touchDragAxis) && originalEvent.cancelable !== false) {
          isPreventingDefault = true;
          _preventDefault(originalEvent);
        } else {
          isPreventingDefault = false;
        }
        _dispatchEvent(self, "release", "onRelease");
      }
      isTweening() && placeholderDelayedCall.duration(self.tween.duration());
      wasDragging && _dispatchEvent(self, "dragend", "onDragEnd");
      return true;
    }, updateScroll = function updateScroll2(e) {
      if (e && self.isDragging && !scrollProxy) {
        var parent = e.target || target.parentNode, deltaX = parent.scrollLeft - parent._gsScrollX, deltaY = parent.scrollTop - parent._gsScrollY;
        if (deltaX || deltaY) {
          if (matrix) {
            startPointerX -= deltaX * matrix.a + deltaY * matrix.c;
            startPointerY -= deltaY * matrix.d + deltaX * matrix.b;
          } else {
            startPointerX -= deltaX;
            startPointerY -= deltaY;
          }
          parent._gsScrollX += deltaX;
          parent._gsScrollY += deltaY;
          setPointerPosition(self.pointerX, self.pointerY);
        }
      }
    }, onClick = function onClick2(e) {
      var time = _getTime(), recentlyClicked = time - clickTime < 100, recentlyDragged = time - dragEndTime < 50, alreadyDispatched = recentlyClicked && clickDispatch === clickTime, defaultPrevented = self.pointerEvent && self.pointerEvent.defaultPrevented, alreadyDispatchedTrusted = recentlyClicked && trustedClickDispatch === clickTime, trusted = e.isTrusted || e.isTrusted == null && recentlyClicked && alreadyDispatched;
      if ((alreadyDispatched || recentlyDragged && self.vars.suppressClickOnDrag !== false) && e.stopImmediatePropagation) {
        e.stopImmediatePropagation();
      }
      if (recentlyClicked && !(self.pointerEvent && self.pointerEvent.defaultPrevented) && (!alreadyDispatched || trusted && !alreadyDispatchedTrusted)) {
        if (trusted && alreadyDispatched) {
          trustedClickDispatch = clickTime;
        }
        clickDispatch = clickTime;
        return;
      }
      if (self.isPressed || recentlyDragged || recentlyClicked) {
        if (!trusted || !e.detail || !recentlyClicked || defaultPrevented) {
          _preventDefault(e);
        }
      }
      if (!recentlyClicked && !recentlyDragged && !dragged) {
        e && e.target && (self.pointerEvent = e);
        _dispatchEvent(self, "click", "onClick");
      }
    }, localizePoint = function localizePoint2(p2) {
      return matrix ? {
        x: p2.x * matrix.a + p2.y * matrix.c + matrix.e,
        y: p2.x * matrix.b + p2.y * matrix.d + matrix.f
      } : {
        x: p2.x,
        y: p2.y
      };
    };
    old = Draggable2.get(target);
    old && old.kill();
    _this2.startDrag = function(event, align) {
      var r1, r2, p1, p2;
      onPress(event || self.pointerEvent, true);
      if (align && !self.hitTest(event || self.pointerEvent)) {
        r1 = _parseRect(event || self.pointerEvent);
        r2 = _parseRect(target);
        p1 = localizePoint({
          x: r1.left + r1.width / 2,
          y: r1.top + r1.height / 2
        });
        p2 = localizePoint({
          x: r2.left + r2.width / 2,
          y: r2.top + r2.height / 2
        });
        startPointerX -= p1.x - p2.x;
        startPointerY -= p1.y - p2.y;
      }
      if (!self.isDragging) {
        self.isDragging = dragged = true;
        _dispatchEvent(self, "dragstart", "onDragStart");
      }
    };
    _this2.drag = onMove;
    _this2.endDrag = function(e) {
      return onRelease(e || self.pointerEvent, true);
    };
    _this2.timeSinceDrag = function() {
      return self.isDragging ? 0 : (_getTime() - dragEndTime) / 1e3;
    };
    _this2.timeSinceClick = function() {
      return (_getTime() - clickTime) / 1e3;
    };
    _this2.hitTest = function(target2, threshold) {
      return Draggable2.hitTest(self.target, target2, threshold);
    };
    _this2.getDirection = function(from, diagonalThreshold) {
      var mode = from === "velocity" && InertiaPlugin ? from : _isObject(from) && !rotationMode ? "element" : "start", xChange, yChange, ratio, direction, r1, r2;
      if (mode === "element") {
        r1 = _parseRect(self.target);
        r2 = _parseRect(from);
      }
      xChange = mode === "start" ? self.x - startElementX : mode === "velocity" ? InertiaPlugin.getVelocity(target, xProp) : r1.left + r1.width / 2 - (r2.left + r2.width / 2);
      if (rotationMode) {
        return xChange < 0 ? "counter-clockwise" : "clockwise";
      } else {
        diagonalThreshold = diagonalThreshold || 2;
        yChange = mode === "start" ? self.y - startElementY : mode === "velocity" ? InertiaPlugin.getVelocity(target, yProp) : r1.top + r1.height / 2 - (r2.top + r2.height / 2);
        ratio = Math.abs(xChange / yChange);
        direction = ratio < 1 / diagonalThreshold ? "" : xChange < 0 ? "left" : "right";
        if (ratio < diagonalThreshold) {
          if (direction !== "") {
            direction += "-";
          }
          direction += yChange < 0 ? "up" : "down";
        }
      }
      return direction;
    };
    _this2.applyBounds = function(newBounds, sticky) {
      var x, y, forceZeroVelocity, e, parent, isRoot;
      if (newBounds && vars.bounds !== newBounds) {
        vars.bounds = newBounds;
        return self.update(true, sticky);
      }
      syncXY(true);
      calculateBounds();
      if (hasBounds && !isTweening()) {
        x = self.x;
        y = self.y;
        if (x > maxX) {
          x = maxX;
        } else if (x < minX) {
          x = minX;
        }
        if (y > maxY) {
          y = maxY;
        } else if (y < minY) {
          y = minY;
        }
        if (self.x !== x || self.y !== y) {
          forceZeroVelocity = true;
          self.x = self.endX = x;
          if (rotationMode) {
            self.endRotation = x;
          } else {
            self.y = self.endY = y;
          }
          dirty = true;
          render12(true);
          if (self.autoScroll && !self.isDragging) {
            _recordMaxScrolls(target.parentNode);
            e = target;
            _windowProxy.scrollTop = _win2.pageYOffset != null ? _win2.pageYOffset : ownerDoc.documentElement.scrollTop != null ? ownerDoc.documentElement.scrollTop : ownerDoc.body.scrollTop;
            _windowProxy.scrollLeft = _win2.pageXOffset != null ? _win2.pageXOffset : ownerDoc.documentElement.scrollLeft != null ? ownerDoc.documentElement.scrollLeft : ownerDoc.body.scrollLeft;
            while (e && !isRoot) {
              isRoot = _isRoot(e.parentNode);
              parent = isRoot ? _windowProxy : e.parentNode;
              if (allowY && parent.scrollTop > parent._gsMaxScrollY) {
                parent.scrollTop = parent._gsMaxScrollY;
              }
              if (allowX && parent.scrollLeft > parent._gsMaxScrollX) {
                parent.scrollLeft = parent._gsMaxScrollX;
              }
              e = parent;
            }
          }
        }
        if (self.isThrowing && (forceZeroVelocity || self.endX > maxX || self.endX < minX || self.endY > maxY || self.endY < minY)) {
          animate(vars.inertia || vars.throwProps, forceZeroVelocity);
        }
      }
      return self;
    };
    _this2.update = function(applyBounds, sticky, ignoreExternalChanges) {
      if (sticky && self.isPressed) {
        var m = getGlobalMatrix(target), p2 = innerMatrix.apply({
          x: self.x - startElementX,
          y: self.y - startElementY
        }), m2 = getGlobalMatrix(target.parentNode, true);
        m2.apply({
          x: m.e - p2.x,
          y: m.f - p2.y
        }, p2);
        self.x -= p2.x - m2.e;
        self.y -= p2.y - m2.f;
        render12(true);
        recordStartPositions();
      }
      var x = self.x, y = self.y;
      updateMatrix(!sticky);
      if (applyBounds) {
        self.applyBounds();
      } else {
        dirty && ignoreExternalChanges && render12(true);
        syncXY(true);
      }
      if (sticky) {
        setPointerPosition(self.pointerX, self.pointerY);
        dirty && render12(true);
      }
      if (self.isPressed && !sticky && (allowX && Math.abs(x - self.x) > 0.01 || allowY && Math.abs(y - self.y) > 0.01 && !rotationMode)) {
        recordStartPositions();
      }
      if (self.autoScroll) {
        _recordMaxScrolls(target.parentNode, self.isDragging);
        checkAutoScrollBounds = self.isDragging;
        render12(true);
        _removeScrollListener(target, updateScroll);
        _addScrollListener(target, updateScroll);
      }
      return self;
    };
    _this2.enable = function(type2) {
      var setVars = {
        lazy: true
      }, id, i2, trigger;
      if (vars.cursor !== false) {
        setVars.cursor = vars.cursor || _defaultCursor;
      }
      if (gsap3.utils.checkPrefix("touchCallout")) {
        setVars.touchCallout = "none";
      }
      if (type2 !== "soft") {
        _setTouchActionForAllDescendants(triggers, allowX === allowY ? "none" : vars.allowNativeTouchScrolling && target.scrollHeight === target.clientHeight === (target.scrollWidth === target.clientHeight) || vars.allowEventDefault ? "manipulation" : allowX ? "pan-y" : "pan-x");
        i2 = triggers.length;
        while (--i2 > -1) {
          trigger = triggers[i2];
          _supportsPointer || _addListener(trigger, "mousedown", onPress);
          _addListener(trigger, "touchstart", onPress);
          _addListener(trigger, "click", onClick, true);
          gsap3.set(trigger, setVars);
          if (trigger.getBBox && trigger.ownerSVGElement && allowX !== allowY) {
            gsap3.set(trigger.ownerSVGElement, {
              touchAction: vars.allowNativeTouchScrolling || vars.allowEventDefault ? "manipulation" : allowX ? "pan-y" : "pan-x"
            });
          }
          vars.allowContextMenu || _addListener(trigger, "contextmenu", onContextMenu);
        }
        _setSelectable(triggers, false);
      }
      _addScrollListener(target, updateScroll);
      enabled = true;
      if (InertiaPlugin && type2 !== "soft") {
        InertiaPlugin.track(scrollProxy || target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
      }
      target._gsDragID = id = target._gsDragID || "d" + _lookupCount++;
      _lookup[id] = self;
      if (scrollProxy) {
        scrollProxy.enable();
        scrollProxy.element._gsDragID = id;
      }
      (vars.bounds || rotationMode) && recordStartPositions();
      vars.bounds && self.applyBounds();
      return self;
    };
    _this2.disable = function(type2) {
      var dragging = self.isDragging, i2 = triggers.length, trigger;
      while (--i2 > -1) {
        _setStyle(triggers[i2], "cursor", null);
      }
      if (type2 !== "soft") {
        _setTouchActionForAllDescendants(triggers, null);
        i2 = triggers.length;
        while (--i2 > -1) {
          trigger = triggers[i2];
          _setStyle(trigger, "touchCallout", null);
          _removeListener(trigger, "mousedown", onPress);
          _removeListener(trigger, "touchstart", onPress);
          _removeListener(trigger, "click", onClick, true);
          _removeListener(trigger, "contextmenu", onContextMenu);
        }
        _setSelectable(triggers, true);
        if (touchEventTarget) {
          _removeListener(touchEventTarget, "touchcancel", onRelease);
          _removeListener(touchEventTarget, "touchend", onRelease);
          _removeListener(touchEventTarget, "touchmove", onMove);
        }
        _removeListener(ownerDoc, "mouseup", onRelease);
        _removeListener(ownerDoc, "mousemove", onMove);
      }
      _removeScrollListener(target, updateScroll);
      enabled = false;
      if (InertiaPlugin && type2 !== "soft") {
        InertiaPlugin.untrack(scrollProxy || target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
        self.tween && self.tween.kill();
      }
      scrollProxy && scrollProxy.disable();
      _removeFromRenderQueue(render12);
      self.isDragging = self.isPressed = isClicking = false;
      dragging && _dispatchEvent(self, "dragend", "onDragEnd");
      return self;
    };
    _this2.enabled = function(value, type2) {
      return arguments.length ? value ? self.enable(type2) : self.disable(type2) : enabled;
    };
    _this2.kill = function() {
      self.isThrowing = false;
      self.tween && self.tween.kill();
      self.disable();
      gsap3.set(triggers, {
        clearProps: "userSelect"
      });
      delete _lookup[target._gsDragID];
      return self;
    };
    _this2.revert = function() {
      this.kill();
      this.styles && this.styles.revert();
    };
    if (~type.indexOf("scroll")) {
      scrollProxy = _this2.scrollProxy = new ScrollProxy(target, _extend({
        onKill: function onKill() {
          self.isPressed && onRelease(null);
        }
      }, vars));
      target.style.overflowY = allowY && !_isTouchDevice ? "auto" : "hidden";
      target.style.overflowX = allowX && !_isTouchDevice ? "auto" : "hidden";
      target = scrollProxy.content;
    }
    if (rotationMode) {
      killProps.rotation = 1;
    } else {
      if (allowX) {
        killProps[xProp] = 1;
      }
      if (allowY) {
        killProps[yProp] = 1;
      }
    }
    gsCache.force3D = "force3D" in vars ? vars.force3D : true;
    _context(_assertThisInitialized(_this2));
    _this2.enable();
    return _this2;
  }
  Draggable2.register = function register8(core) {
    gsap3 = core;
    _initCore3();
  };
  Draggable2.create = function create(targets, vars) {
    _coreInitted2 || _initCore3(true);
    return _toArray(targets).map(function(target) {
      return new Draggable2(target, vars);
    });
  };
  Draggable2.get = function get(target) {
    return _lookup[(_toArray(target)[0] || {})._gsDragID];
  };
  Draggable2.timeSinceDrag = function timeSinceDrag() {
    return (_getTime() - _lastDragTime) / 1e3;
  };
  Draggable2.hitTest = function hitTest(obj1, obj2, threshold) {
    if (obj1 === obj2) {
      return false;
    }
    var r1 = _parseRect(obj1), r2 = _parseRect(obj2), top = r1.top, left = r1.left, right = r1.right, bottom = r1.bottom, width = r1.width, height = r1.height, isOutside = r2.left > right || r2.right < left || r2.top > bottom || r2.bottom < top, overlap, area, isRatio;
    if (isOutside || !threshold) {
      return !isOutside;
    }
    isRatio = (threshold + "").indexOf("%") !== -1;
    threshold = parseFloat(threshold) || 0;
    overlap = {
      left: Math.max(left, r2.left),
      top: Math.max(top, r2.top)
    };
    overlap.width = Math.min(right, r2.right) - overlap.left;
    overlap.height = Math.min(bottom, r2.bottom) - overlap.top;
    if (overlap.width < 0 || overlap.height < 0) {
      return false;
    }
    if (isRatio) {
      threshold *= 0.01;
      area = overlap.width * overlap.height;
      return area >= width * height * threshold || area >= r2.width * r2.height * threshold;
    }
    return overlap.width > threshold && overlap.height > threshold;
  };
  return Draggable2;
}(EventDispatcher);
_setDefaults(Draggable.prototype, {
  pointerX: 0,
  pointerY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isDragging: false,
  isPressed: false
});
Draggable.zIndex = 1e3;
Draggable.version = "3.13.0";
_getGSAP3() && gsap3.registerPlugin(Draggable);

// node_modules/gsap/CSSRulePlugin.js
var gsap4;
var _coreInitted3;
var _win3;
var _doc3;
var CSSPlugin2;
var _windowExists3 = function _windowExists4() {
  return typeof window !== "undefined";
};
var _getGSAP5 = function _getGSAP6() {
  return gsap4 || _windowExists3() && (gsap4 = window.gsap) && gsap4.registerPlugin && gsap4;
};
var _checkRegister = function _checkRegister2() {
  if (!_coreInitted3) {
    _initCore5();
    if (!CSSPlugin2) {
      console.warn("Please gsap.registerPlugin(CSSPlugin, CSSRulePlugin)");
    }
  }
  return _coreInitted3;
};
var _initCore5 = function _initCore6(core) {
  gsap4 = core || _getGSAP5();
  if (_windowExists3()) {
    _win3 = window;
    _doc3 = document;
  }
  if (gsap4) {
    CSSPlugin2 = gsap4.plugins.css;
    if (CSSPlugin2) {
      _coreInitted3 = 1;
    }
  }
};
var CSSRulePlugin = {
  version: "3.13.0",
  name: "cssRule",
  init: function init(target, value, tween, index, targets) {
    if (!_checkRegister() || typeof target.cssText === "undefined") {
      return false;
    }
    var div = target._gsProxy = target._gsProxy || _doc3.createElement("div");
    this.ss = target;
    this.style = div.style;
    div.style.cssText = target.cssText;
    CSSPlugin2.prototype.init.call(this, div, value, tween, index, targets);
  },
  render: function render(ratio, data) {
    var pt = data._pt, style = data.style, ss2 = data.ss, i2;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
    i2 = style.length;
    while (--i2 > -1) {
      ss2[style[i2]] = style[style[i2]];
    }
  },
  getRule: function getRule(selector2) {
    _checkRegister();
    var ruleProp = _doc3.all ? "rules" : "cssRules", styleSheets = _doc3.styleSheets, i2 = styleSheets.length, pseudo = selector2.charAt(0) === ":", j, curSS, cs, a;
    selector2 = (pseudo ? "" : ",") + selector2.split("::").join(":").toLowerCase() + ",";
    if (pseudo) {
      a = [];
    }
    while (i2--) {
      try {
        curSS = styleSheets[i2][ruleProp];
        if (!curSS) {
          continue;
        }
        j = curSS.length;
      } catch (e) {
        console.warn(e);
        continue;
      }
      while (--j > -1) {
        cs = curSS[j];
        if (cs.selectorText && ("," + cs.selectorText.split("::").join(":").toLowerCase() + ",").indexOf(selector2) !== -1) {
          if (pseudo) {
            a.push(cs.style);
          } else {
            return cs.style;
          }
        }
      }
    }
    return a;
  },
  register: _initCore5
};
_getGSAP5() && gsap4.registerPlugin(CSSRulePlugin);

// node_modules/gsap/EaselPlugin.js
var gsap5;
var _coreInitted4;
var _win4;
var _createJS;
var _ColorFilter;
var _ColorMatrixFilter;
var _colorProps = "redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier,redOffset,greenOffset,blueOffset,alphaOffset".split(",");
var _windowExists5 = function _windowExists6() {
  return typeof window !== "undefined";
};
var _getGSAP7 = function _getGSAP8() {
  return gsap5 || _windowExists5() && (gsap5 = window.gsap) && gsap5.registerPlugin && gsap5;
};
var _getCreateJS = function _getCreateJS2() {
  return _createJS || _win4 && _win4.createjs || _win4 || {};
};
var _warn = function _warn2(message) {
  return console.warn(message);
};
var _cache = function _cache2(target) {
  var b = target.getBounds && target.getBounds();
  if (!b) {
    b = target.nominalBounds || {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    };
    target.setBounds && target.setBounds(b.x, b.y, b.width, b.height);
  }
  target.cache && target.cache(b.x, b.y, b.width, b.height);
  _warn("EaselPlugin: for filters to display in EaselJS, you must call the object's cache() method first. GSAP attempted to use the target's getBounds() for the cache but that may not be completely accurate. " + target);
};
var _parseColorFilter = function _parseColorFilter2(target, v, plugin) {
  if (!_ColorFilter) {
    _ColorFilter = _getCreateJS().ColorFilter;
    if (!_ColorFilter) {
      _warn("EaselPlugin error: The EaselJS ColorFilter JavaScript file wasn't loaded.");
    }
  }
  var filters = target.filters || [], i2 = filters.length, c, s, e, a, p2, pt;
  while (i2--) {
    if (filters[i2] instanceof _ColorFilter) {
      s = filters[i2];
      break;
    }
  }
  if (!s) {
    s = new _ColorFilter();
    filters.push(s);
    target.filters = filters;
  }
  e = s.clone();
  if (v.tint != null) {
    c = gsap5.utils.splitColor(v.tint);
    a = v.tintAmount != null ? +v.tintAmount : 1;
    e.redOffset = +c[0] * a;
    e.greenOffset = +c[1] * a;
    e.blueOffset = +c[2] * a;
    e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1 - a;
  } else {
    for (p2 in v) {
      if (p2 !== "exposure") {
        if (p2 !== "brightness") {
          e[p2] = +v[p2];
        }
      }
    }
  }
  if (v.exposure != null) {
    e.redOffset = e.greenOffset = e.blueOffset = 255 * (+v.exposure - 1);
    e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1;
  } else if (v.brightness != null) {
    a = +v.brightness - 1;
    e.redOffset = e.greenOffset = e.blueOffset = a > 0 ? a * 255 : 0;
    e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1 - Math.abs(a);
  }
  i2 = 8;
  while (i2--) {
    p2 = _colorProps[i2];
    if (s[p2] !== e[p2]) {
      pt = plugin.add(s, p2, s[p2], e[p2], 0, 0, 0, 0, 0, 1);
      if (pt) {
        pt.op = "easel_colorFilter";
      }
    }
  }
  plugin._props.push("easel_colorFilter");
  if (!target.cacheID) {
    _cache(target);
  }
};
var _idMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
var _lumR = 0.212671;
var _lumG = 0.71516;
var _lumB = 0.072169;
var _applyMatrix = function _applyMatrix2(m, m2) {
  if (!(m instanceof Array) || !(m2 instanceof Array)) {
    return m2;
  }
  var temp = [], i2 = 0, z = 0, y, x;
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 5; x++) {
      z = x === 4 ? m[i2 + 4] : 0;
      temp[i2 + x] = m[i2] * m2[x] + m[i2 + 1] * m2[x + 5] + m[i2 + 2] * m2[x + 10] + m[i2 + 3] * m2[x + 15] + z;
    }
    i2 += 5;
  }
  return temp;
};
var _setSaturation = function _setSaturation2(m, n) {
  if (isNaN(n)) {
    return m;
  }
  var inv = 1 - n, r = inv * _lumR, g = inv * _lumG, b = inv * _lumB;
  return _applyMatrix([r + n, g, b, 0, 0, r, g + n, b, 0, 0, r, g, b + n, 0, 0, 0, 0, 0, 1, 0], m);
};
var _colorize = function _colorize2(m, color, amount) {
  if (isNaN(amount)) {
    amount = 1;
  }
  var c = gsap5.utils.splitColor(color), r = c[0] / 255, g = c[1] / 255, b = c[2] / 255, inv = 1 - amount;
  return _applyMatrix([inv + amount * r * _lumR, amount * r * _lumG, amount * r * _lumB, 0, 0, amount * g * _lumR, inv + amount * g * _lumG, amount * g * _lumB, 0, 0, amount * b * _lumR, amount * b * _lumG, inv + amount * b * _lumB, 0, 0, 0, 0, 0, 1, 0], m);
};
var _setHue = function _setHue2(m, n) {
  if (isNaN(n)) {
    return m;
  }
  n *= Math.PI / 180;
  var c = Math.cos(n), s = Math.sin(n);
  return _applyMatrix([_lumR + c * (1 - _lumR) + s * -_lumR, _lumG + c * -_lumG + s * -_lumG, _lumB + c * -_lumB + s * (1 - _lumB), 0, 0, _lumR + c * -_lumR + s * 0.143, _lumG + c * (1 - _lumG) + s * 0.14, _lumB + c * -_lumB + s * -0.283, 0, 0, _lumR + c * -_lumR + s * -(1 - _lumR), _lumG + c * -_lumG + s * _lumG, _lumB + c * (1 - _lumB) + s * _lumB, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], m);
};
var _setContrast = function _setContrast2(m, n) {
  if (isNaN(n)) {
    return m;
  }
  n += 0.01;
  return _applyMatrix([n, 0, 0, 0, 128 * (1 - n), 0, n, 0, 0, 128 * (1 - n), 0, 0, n, 0, 128 * (1 - n), 0, 0, 0, 1, 0], m);
};
var _parseColorMatrixFilter = function _parseColorMatrixFilter2(target, v, plugin) {
  if (!_ColorMatrixFilter) {
    _ColorMatrixFilter = _getCreateJS().ColorMatrixFilter;
    if (!_ColorMatrixFilter) {
      _warn("EaselPlugin: The EaselJS ColorMatrixFilter JavaScript file wasn't loaded.");
    }
  }
  var filters = target.filters || [], i2 = filters.length, matrix, startMatrix, s, pg;
  while (--i2 > -1) {
    if (filters[i2] instanceof _ColorMatrixFilter) {
      s = filters[i2];
      break;
    }
  }
  if (!s) {
    s = new _ColorMatrixFilter(_idMatrix.slice());
    filters.push(s);
    target.filters = filters;
  }
  startMatrix = s.matrix;
  matrix = _idMatrix.slice();
  if (v.colorize != null) {
    matrix = _colorize(matrix, v.colorize, Number(v.colorizeAmount));
  }
  if (v.contrast != null) {
    matrix = _setContrast(matrix, Number(v.contrast));
  }
  if (v.hue != null) {
    matrix = _setHue(matrix, Number(v.hue));
  }
  if (v.saturation != null) {
    matrix = _setSaturation(matrix, Number(v.saturation));
  }
  i2 = matrix.length;
  while (--i2 > -1) {
    if (matrix[i2] !== startMatrix[i2]) {
      pg = plugin.add(startMatrix, i2, startMatrix[i2], matrix[i2], 0, 0, 0, 0, 0, 1);
      if (pg) {
        pg.op = "easel_colorMatrixFilter";
      }
    }
  }
  plugin._props.push("easel_colorMatrixFilter");
  if (!target.cacheID) {
    _cache();
  }
  plugin._matrix = startMatrix;
};
var _initCore7 = function _initCore8(core) {
  gsap5 = core || _getGSAP7();
  if (_windowExists5()) {
    _win4 = window;
  }
  if (gsap5) {
    _coreInitted4 = 1;
  }
};
var EaselPlugin = {
  version: "3.13.0",
  name: "easel",
  init: function init2(target, value, tween, index, targets) {
    if (!_coreInitted4) {
      _initCore7();
      if (!gsap5) {
        _warn("Please gsap.registerPlugin(EaselPlugin)");
      }
    }
    this.target = target;
    var p2, pt, tint, colorMatrix, end, labels, i2;
    for (p2 in value) {
      end = value[p2];
      if (p2 === "colorFilter" || p2 === "tint" || p2 === "tintAmount" || p2 === "exposure" || p2 === "brightness") {
        if (!tint) {
          _parseColorFilter(target, value.colorFilter || value, this);
          tint = true;
        }
      } else if (p2 === "saturation" || p2 === "contrast" || p2 === "hue" || p2 === "colorize" || p2 === "colorizeAmount") {
        if (!colorMatrix) {
          _parseColorMatrixFilter(target, value.colorMatrixFilter || value, this);
          colorMatrix = true;
        }
      } else if (p2 === "frame") {
        if (typeof end === "string" && end.charAt(1) !== "=" && (labels = target.labels)) {
          for (i2 = 0; i2 < labels.length; i2++) {
            if (labels[i2].label === end) {
              end = labels[i2].position;
            }
          }
        }
        pt = this.add(target, "gotoAndStop", target.currentFrame, end, index, targets, Math.round, 0, 0, 1);
        if (pt) {
          pt.op = p2;
        }
      } else if (target[p2] != null) {
        this.add(target, p2, "get", end);
      }
    }
  },
  render: function render2(ratio, data) {
    var pt = data._pt;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
    if (data.target.cacheID) {
      data.target.updateCache();
    }
  },
  register: _initCore7
};
EaselPlugin.registerCreateJS = function(createjs) {
  _createJS = createjs;
};
_getGSAP7() && gsap5.registerPlugin(EaselPlugin);

// node_modules/gsap/EasePack.js
var gsap6;
var _coreInitted5;
var _registerEase;
var _getGSAP9 = function _getGSAP10() {
  return gsap6 || typeof window !== "undefined" && (gsap6 = window.gsap) && gsap6.registerPlugin && gsap6;
};
var _boolean = function _boolean2(value, defaultValue) {
  return !!(typeof value === "undefined" ? defaultValue : value && !~(value + "").indexOf("false"));
};
var _initCore9 = function _initCore10(core) {
  gsap6 = core || _getGSAP9();
  if (gsap6) {
    _registerEase = gsap6.registerEase;
    var eases = gsap6.parseEase(), createConfig = function createConfig2(ease) {
      return function(ratio) {
        var y = 0.5 + ratio / 2;
        ease.config = function(p3) {
          return ease(2 * (1 - p3) * p3 * y + p3 * p3);
        };
      };
    }, p2;
    for (p2 in eases) {
      if (!eases[p2].config) {
        createConfig(eases[p2]);
      }
    }
    _registerEase("slow", SlowMo);
    _registerEase("expoScale", ExpoScaleEase);
    _registerEase("rough", RoughEase);
    for (p2 in EasePack) {
      p2 !== "version" && gsap6.core.globals(p2, EasePack[p2]);
    }
    _coreInitted5 = 1;
  }
};
var _createSlowMo = function _createSlowMo2(linearRatio, power, yoyoMode) {
  linearRatio = Math.min(1, linearRatio || 0.7);
  var pow = linearRatio < 1 ? power || power === 0 ? power : 0.7 : 0, p1 = (1 - linearRatio) / 2, p3 = p1 + linearRatio, calcEnd = _boolean(yoyoMode);
  return function(p2) {
    var r = p2 + (0.5 - p2) * pow;
    return p2 < p1 ? calcEnd ? 1 - (p2 = 1 - p2 / p1) * p2 : r - (p2 = 1 - p2 / p1) * p2 * p2 * p2 * r : p2 > p3 ? calcEnd ? p2 === 1 ? 0 : 1 - (p2 = (p2 - p3) / p1) * p2 : r + (p2 - r) * (p2 = (p2 - p3) / p1) * p2 * p2 * p2 : calcEnd ? 1 : r;
  };
};
var _createExpoScale = function _createExpoScale2(start, end, ease) {
  var p1 = Math.log(end / start), p2 = end - start;
  ease && (ease = gsap6.parseEase(ease));
  return function(p3) {
    return (start * Math.exp(p1 * (ease ? ease(p3) : p3)) - start) / p2;
  };
};
var EasePoint = function EasePoint2(time, value, next) {
  this.t = time;
  this.v = value;
  if (next) {
    this.next = next;
    next.prev = this;
    this.c = next.v - value;
    this.gap = next.t - time;
  }
};
var _createRoughEase = function _createRoughEase2(vars) {
  if (typeof vars !== "object") {
    vars = {
      points: +vars || 20
    };
  }
  var taper = vars.taper || "none", a = [], cnt = 0, points = (+vars.points || 20) | 0, i2 = points, randomize = _boolean(vars.randomize, true), clamp2 = _boolean(vars.clamp), template = gsap6 ? gsap6.parseEase(vars.template) : 0, strength = (+vars.strength || 1) * 0.4, x, y, bump, invX, obj, pnt, recent;
  while (--i2 > -1) {
    x = randomize ? Math.random() : 1 / points * i2;
    y = template ? template(x) : x;
    if (taper === "none") {
      bump = strength;
    } else if (taper === "out") {
      invX = 1 - x;
      bump = invX * invX * strength;
    } else if (taper === "in") {
      bump = x * x * strength;
    } else if (x < 0.5) {
      invX = x * 2;
      bump = invX * invX * 0.5 * strength;
    } else {
      invX = (1 - x) * 2;
      bump = invX * invX * 0.5 * strength;
    }
    if (randomize) {
      y += Math.random() * bump - bump * 0.5;
    } else if (i2 % 2) {
      y += bump * 0.5;
    } else {
      y -= bump * 0.5;
    }
    if (clamp2) {
      if (y > 1) {
        y = 1;
      } else if (y < 0) {
        y = 0;
      }
    }
    a[cnt++] = {
      x,
      y
    };
  }
  a.sort(function(a2, b) {
    return a2.x - b.x;
  });
  pnt = new EasePoint(1, 1, null);
  i2 = points;
  while (i2--) {
    obj = a[i2];
    pnt = new EasePoint(obj.x, obj.y, pnt);
  }
  recent = new EasePoint(0, 0, pnt.t ? pnt : pnt.next);
  return function(p2) {
    var pnt2 = recent;
    if (p2 > pnt2.t) {
      while (pnt2.next && p2 >= pnt2.t) {
        pnt2 = pnt2.next;
      }
      pnt2 = pnt2.prev;
    } else {
      while (pnt2.prev && p2 <= pnt2.t) {
        pnt2 = pnt2.prev;
      }
    }
    recent = pnt2;
    return pnt2.v + (p2 - pnt2.t) / pnt2.gap * pnt2.c;
  };
};
var SlowMo = _createSlowMo(0.7);
SlowMo.ease = SlowMo;
SlowMo.config = _createSlowMo;
var ExpoScaleEase = _createExpoScale(1, 2);
ExpoScaleEase.config = _createExpoScale;
var RoughEase = _createRoughEase();
RoughEase.ease = RoughEase;
RoughEase.config = _createRoughEase;
var EasePack = {
  SlowMo,
  RoughEase,
  ExpoScaleEase
};
for (p2 in EasePack) {
  EasePack[p2].register = _initCore9;
  EasePack[p2].version = "3.13.0";
}
var p2;
_getGSAP9() && gsap6.registerPlugin(SlowMo);

// node_modules/gsap/Flip.js
var _id = 1;
var _toArray2;
var gsap7;
var _batch;
var _batchAction;
var _body3;
var _closestTenth;
var _getStyleSaver2;
var _forEachBatch = function _forEachBatch2(batch, name) {
  return batch.actions.forEach(function(a) {
    return a.vars[name] && a.vars[name](a);
  });
};
var _batchLookup = {};
var _RAD2DEG3 = 180 / Math.PI;
var _DEG2RAD2 = Math.PI / 180;
var _emptyObj = {};
var _dashedNameLookup = {};
var _memoizedRemoveProps = {};
var _listToArray = function _listToArray2(list) {
  return typeof list === "string" ? list.split(" ").join("").split(",") : list;
};
var _callbacks = _listToArray("onStart,onUpdate,onComplete,onReverseComplete,onInterrupt");
var _removeProps = _listToArray("transform,transformOrigin,width,height,position,top,left,opacity,zIndex,maxWidth,maxHeight,minWidth,minHeight");
var _getEl = function _getEl2(target) {
  return _toArray2(target)[0] || console.warn("Element not found:", target);
};
var _round7 = function _round8(value) {
  return Math.round(value * 1e4) / 1e4 || 0;
};
var _toggleClass = function _toggleClass2(targets, className, action) {
  return targets.forEach(function(el) {
    return el.classList[action](className);
  });
};
var _reserved = {
  zIndex: 1,
  kill: 1,
  simple: 1,
  spin: 1,
  clearProps: 1,
  targets: 1,
  toggleClass: 1,
  onComplete: 1,
  onUpdate: 1,
  onInterrupt: 1,
  onStart: 1,
  delay: 1,
  repeat: 1,
  repeatDelay: 1,
  yoyo: 1,
  scale: 1,
  fade: 1,
  absolute: 1,
  props: 1,
  onEnter: 1,
  onLeave: 1,
  custom: 1,
  paused: 1,
  nested: 1,
  prune: 1,
  absoluteOnLeave: 1
};
var _fitReserved = {
  zIndex: 1,
  simple: 1,
  clearProps: 1,
  scale: 1,
  absolute: 1,
  fitChild: 1,
  getVars: 1,
  props: 1
};
var _camelToDashed = function _camelToDashed2(p2) {
  return p2.replace(/([A-Z])/g, "-$1").toLowerCase();
};
var _copy3 = function _copy4(obj, exclude) {
  var result = {}, p2;
  for (p2 in obj) {
    exclude[p2] || (result[p2] = obj[p2]);
  }
  return result;
};
var _memoizedProps = {};
var _memoizeProps = function _memoizeProps2(props) {
  var p2 = _memoizedProps[props] = _listToArray(props);
  _memoizedRemoveProps[props] = p2.concat(_removeProps);
  return p2;
};
var _getInverseGlobalMatrix = function _getInverseGlobalMatrix2(el) {
  var cache = el._gsap || gsap7.core.getCache(el);
  if (cache.gmCache === gsap7.ticker.frame) {
    return cache.gMatrix;
  }
  cache.gmCache = gsap7.ticker.frame;
  return cache.gMatrix = getGlobalMatrix(el, true, false, true);
};
var _getDOMDepth = function _getDOMDepth2(el, invert, level) {
  if (level === void 0) {
    level = 0;
  }
  var parent = el.parentNode, inc = 1e3 * Math.pow(10, level) * (invert ? -1 : 1), l = invert ? -inc * 900 : 0;
  while (el) {
    l += inc;
    el = el.previousSibling;
  }
  return parent ? l + _getDOMDepth2(parent, invert, level + 1) : l;
};
var _orderByDOMDepth = function _orderByDOMDepth2(comps, invert, isElStates) {
  comps.forEach(function(comp) {
    return comp.d = _getDOMDepth(isElStates ? comp.element : comp.t, invert);
  });
  comps.sort(function(c1, c2) {
    return c1.d - c2.d;
  });
  return comps;
};
var _recordInlineStyles = function _recordInlineStyles2(elState, props) {
  var style = elState.element.style, a = elState.css = elState.css || [], i2 = props.length, p2, v;
  while (i2--) {
    p2 = props[i2];
    v = style[p2] || style.getPropertyValue(p2);
    a.push(v ? p2 : _dashedNameLookup[p2] || (_dashedNameLookup[p2] = _camelToDashed(p2)), v);
  }
  return style;
};
var _applyInlineStyles = function _applyInlineStyles2(state) {
  var css = state.css, style = state.element.style, i2 = 0;
  state.cache.uncache = 1;
  for (; i2 < css.length; i2 += 2) {
    css[i2 + 1] ? style[css[i2]] = css[i2 + 1] : style.removeProperty(css[i2]);
  }
  if (!css[css.indexOf("transform") + 1] && style.translate) {
    style.removeProperty("translate");
    style.removeProperty("scale");
    style.removeProperty("rotate");
  }
};
var _setFinalStates = function _setFinalStates2(comps, onlyTransforms) {
  comps.forEach(function(c) {
    return c.a.cache.uncache = 1;
  });
  onlyTransforms || comps.finalStates.forEach(_applyInlineStyles);
};
var _absoluteProps = "paddingTop,paddingRight,paddingBottom,paddingLeft,gridArea,transition".split(",");
var _makeAbsolute = function _makeAbsolute2(elState, fallbackNode, ignoreBatch) {
  var element = elState.element, width = elState.width, height = elState.height, uncache = elState.uncache, getProp = elState.getProp, style = element.style, i2 = 4, result, displayIsNone, cs;
  typeof fallbackNode !== "object" && (fallbackNode = elState);
  if (_batch && ignoreBatch !== 1) {
    _batch._abs.push({
      t: element,
      b: elState,
      a: elState,
      sd: 0
    });
    _batch._final.push(function() {
      return (elState.cache.uncache = 1) && _applyInlineStyles(elState);
    });
    return element;
  }
  displayIsNone = getProp("display") === "none";
  if (!elState.isVisible || displayIsNone) {
    displayIsNone && (_recordInlineStyles(elState, ["display"]).display = fallbackNode.display);
    elState.matrix = fallbackNode.matrix;
    elState.width = width = elState.width || fallbackNode.width;
    elState.height = height = elState.height || fallbackNode.height;
  }
  _recordInlineStyles(elState, _absoluteProps);
  cs = window.getComputedStyle(element);
  while (i2--) {
    style[_absoluteProps[i2]] = cs[_absoluteProps[i2]];
  }
  style.gridArea = "1 / 1 / 1 / 1";
  style.transition = "none";
  style.position = "absolute";
  style.width = width + "px";
  style.height = height + "px";
  style.top || (style.top = "0px");
  style.left || (style.left = "0px");
  if (uncache) {
    result = new ElementState(element);
  } else {
    result = _copy3(elState, _emptyObj);
    result.position = "absolute";
    if (elState.simple) {
      var bounds = element.getBoundingClientRect();
      result.matrix = new Matrix2D(1, 0, 0, 1, bounds.left + _getDocScrollLeft(), bounds.top + _getDocScrollTop());
    } else {
      result.matrix = getGlobalMatrix(element, false, false, true);
    }
  }
  result = _fit(result, elState, true);
  elState.x = _closestTenth(result.x, 0.01);
  elState.y = _closestTenth(result.y, 0.01);
  return element;
};
var _filterComps = function _filterComps2(comps, targets) {
  if (targets !== true) {
    targets = _toArray2(targets);
    comps = comps.filter(function(c) {
      if (targets.indexOf((c.sd < 0 ? c.b : c.a).element) !== -1) {
        return true;
      } else {
        c.t._gsap.renderTransform(1);
        if (c.b.isVisible) {
          c.t.style.width = c.b.width + "px";
          c.t.style.height = c.b.height + "px";
        }
      }
    });
  }
  return comps;
};
var _makeCompsAbsolute = function _makeCompsAbsolute2(comps) {
  return _orderByDOMDepth(comps, true).forEach(function(c) {
    return (c.a.isVisible || c.b.isVisible) && _makeAbsolute(c.sd < 0 ? c.b : c.a, c.b, 1);
  });
};
var _findElStateInState = function _findElStateInState2(state, other) {
  return other && state.idLookup[_parseElementState(other).id] || state.elementStates[0];
};
var _parseElementState = function _parseElementState2(elOrNode, props, simple, other) {
  return elOrNode instanceof ElementState ? elOrNode : elOrNode instanceof FlipState ? _findElStateInState(elOrNode, other) : new ElementState(typeof elOrNode === "string" ? _getEl(elOrNode) || console.warn(elOrNode + " not found") : elOrNode, props, simple);
};
var _recordProps = function _recordProps2(elState, props) {
  var getProp = gsap7.getProperty(elState.element, null, "native"), obj = elState.props = {}, i2 = props.length;
  while (i2--) {
    obj[props[i2]] = (getProp(props[i2]) + "").trim();
  }
  obj.zIndex && (obj.zIndex = parseFloat(obj.zIndex) || 0);
  return elState;
};
var _applyProps = function _applyProps2(element, props) {
  var style = element.style || element, p2;
  for (p2 in props) {
    style[p2] = props[p2];
  }
};
var _getID = function _getID2(el) {
  var id = el.getAttribute("data-flip-id");
  id || el.setAttribute("data-flip-id", id = "auto-" + _id++);
  return id;
};
var _elementsFromElementStates = function _elementsFromElementStates2(elStates) {
  return elStates.map(function(elState) {
    return elState.element;
  });
};
var _handleCallback = function _handleCallback2(callback, elStates, tl) {
  return callback && elStates.length && tl.add(callback(_elementsFromElementStates(elStates), tl, new FlipState(elStates, 0, true)), 0);
};
var _fit = function _fit2(fromState, toState, scale, applyProps, fitChild, vars) {
  var element = fromState.element, cache = fromState.cache, parent = fromState.parent, x = fromState.x, y = fromState.y, width = toState.width, height = toState.height, scaleX = toState.scaleX, scaleY = toState.scaleY, rotation = toState.rotation, bounds = toState.bounds, styles = vars && _getStyleSaver2 && _getStyleSaver2(element, "transform,width,height"), dimensionState = fromState, _toState$matrix = toState.matrix, e = _toState$matrix.e, f = _toState$matrix.f, deep = fromState.bounds.width !== bounds.width || fromState.bounds.height !== bounds.height || fromState.scaleX !== scaleX || fromState.scaleY !== scaleY || fromState.rotation !== rotation, simple = !deep && fromState.simple && toState.simple && !fitChild, skewX, fromPoint, toPoint, getProp, parentMatrix, matrix, bbox;
  if (simple || !parent) {
    scaleX = scaleY = 1;
    rotation = skewX = 0;
  } else {
    parentMatrix = _getInverseGlobalMatrix(parent);
    matrix = parentMatrix.clone().multiply(toState.ctm ? toState.matrix.clone().multiply(toState.ctm) : toState.matrix);
    rotation = _round7(Math.atan2(matrix.b, matrix.a) * _RAD2DEG3);
    skewX = _round7(Math.atan2(matrix.c, matrix.d) * _RAD2DEG3 + rotation) % 360;
    scaleX = Math.sqrt(Math.pow(matrix.a, 2) + Math.pow(matrix.b, 2));
    scaleY = Math.sqrt(Math.pow(matrix.c, 2) + Math.pow(matrix.d, 2)) * Math.cos(skewX * _DEG2RAD2);
    if (fitChild) {
      fitChild = _toArray2(fitChild)[0];
      getProp = gsap7.getProperty(fitChild);
      bbox = fitChild.getBBox && typeof fitChild.getBBox === "function" && fitChild.getBBox();
      dimensionState = {
        scaleX: getProp("scaleX"),
        scaleY: getProp("scaleY"),
        width: bbox ? bbox.width : Math.ceil(parseFloat(getProp("width", "px"))),
        height: bbox ? bbox.height : parseFloat(getProp("height", "px"))
      };
    }
    cache.rotation = rotation + "deg";
    cache.skewX = skewX + "deg";
  }
  if (scale) {
    scaleX *= width === dimensionState.width || !dimensionState.width ? 1 : width / dimensionState.width;
    scaleY *= height === dimensionState.height || !dimensionState.height ? 1 : height / dimensionState.height;
    cache.scaleX = scaleX;
    cache.scaleY = scaleY;
  } else {
    width = _closestTenth(width * scaleX / dimensionState.scaleX, 0);
    height = _closestTenth(height * scaleY / dimensionState.scaleY, 0);
    element.style.width = width + "px";
    element.style.height = height + "px";
  }
  applyProps && _applyProps(element, toState.props);
  if (simple || !parent) {
    x += e - fromState.matrix.e;
    y += f - fromState.matrix.f;
  } else if (deep || parent !== toState.parent) {
    cache.renderTransform(1, cache);
    matrix = getGlobalMatrix(fitChild || element, false, false, true);
    fromPoint = parentMatrix.apply({
      x: matrix.e,
      y: matrix.f
    });
    toPoint = parentMatrix.apply({
      x: e,
      y: f
    });
    x += toPoint.x - fromPoint.x;
    y += toPoint.y - fromPoint.y;
  } else {
    parentMatrix.e = parentMatrix.f = 0;
    toPoint = parentMatrix.apply({
      x: e - fromState.matrix.e,
      y: f - fromState.matrix.f
    });
    x += toPoint.x;
    y += toPoint.y;
  }
  x = _closestTenth(x, 0.02);
  y = _closestTenth(y, 0.02);
  if (vars && !(vars instanceof ElementState)) {
    styles && styles.revert();
  } else {
    cache.x = x + "px";
    cache.y = y + "px";
    cache.renderTransform(1, cache);
  }
  if (vars) {
    vars.x = x;
    vars.y = y;
    vars.rotation = rotation;
    vars.skewX = skewX;
    if (scale) {
      vars.scaleX = scaleX;
      vars.scaleY = scaleY;
    } else {
      vars.width = width;
      vars.height = height;
    }
  }
  return vars || cache;
};
var _parseState = function _parseState2(targetsOrState, vars) {
  return targetsOrState instanceof FlipState ? targetsOrState : new FlipState(targetsOrState, vars);
};
var _getChangingElState = function _getChangingElState2(toState, fromState, id) {
  var to1 = toState.idLookup[id], to2 = toState.alt[id];
  return to2.isVisible && (!(fromState.getElementState(to2.element) || to2).isVisible || !to1.isVisible) ? to2 : to1;
};
var _bodyMetrics = [];
var _bodyProps = "width,height,overflowX,overflowY".split(",");
var _bodyLocked;
var _lockBodyScroll = function _lockBodyScroll2(lock) {
  if (lock !== _bodyLocked) {
    var s = _body3.style, w = _body3.clientWidth === window.outerWidth, h = _body3.clientHeight === window.outerHeight, i2 = 4;
    if (lock && (w || h)) {
      while (i2--) {
        _bodyMetrics[i2] = s[_bodyProps[i2]];
      }
      if (w) {
        s.width = _body3.clientWidth + "px";
        s.overflowY = "hidden";
      }
      if (h) {
        s.height = _body3.clientHeight + "px";
        s.overflowX = "hidden";
      }
      _bodyLocked = lock;
    } else if (_bodyLocked) {
      while (i2--) {
        _bodyMetrics[i2] ? s[_bodyProps[i2]] = _bodyMetrics[i2] : s.removeProperty(_camelToDashed(_bodyProps[i2]));
      }
      _bodyLocked = lock;
    }
  }
};
var _fromTo = function _fromTo2(fromState, toState, vars, relative) {
  fromState instanceof FlipState && toState instanceof FlipState || console.warn("Not a valid state object.");
  vars = vars || {};
  var _vars = vars, clearProps = _vars.clearProps, onEnter = _vars.onEnter, onLeave = _vars.onLeave, absolute = _vars.absolute, absoluteOnLeave = _vars.absoluteOnLeave, custom = _vars.custom, delay = _vars.delay, paused = _vars.paused, repeat = _vars.repeat, repeatDelay = _vars.repeatDelay, yoyo = _vars.yoyo, toggleClass = _vars.toggleClass, nested = _vars.nested, _zIndex = _vars.zIndex, scale = _vars.scale, fade = _vars.fade, stagger = _vars.stagger, spin = _vars.spin, prune = _vars.prune, props = ("props" in vars ? vars : fromState).props, tweenVars = _copy3(vars, _reserved), animation = gsap7.timeline({
    delay,
    paused,
    repeat,
    repeatDelay,
    yoyo,
    data: "isFlip"
  }), remainingProps = tweenVars, entering = [], leaving = [], comps = [], swapOutTargets = [], spinNum = spin === true ? 1 : spin || 0, spinFunc = typeof spin === "function" ? spin : function() {
    return spinNum;
  }, interrupted = fromState.interrupted || toState.interrupted, addFunc = animation[relative !== 1 ? "to" : "from"], v, p2, endTime, i2, el, comp, state, targets, finalStates, fromNode, toNode, run, a, b;
  for (p2 in toState.idLookup) {
    toNode = !toState.alt[p2] ? toState.idLookup[p2] : _getChangingElState(toState, fromState, p2);
    el = toNode.element;
    fromNode = fromState.idLookup[p2];
    fromState.alt[p2] && el === fromNode.element && (fromState.alt[p2].isVisible || !toNode.isVisible) && (fromNode = fromState.alt[p2]);
    if (fromNode) {
      comp = {
        t: el,
        b: fromNode,
        a: toNode,
        sd: fromNode.element === el ? 0 : toNode.isVisible ? 1 : -1
      };
      comps.push(comp);
      if (comp.sd) {
        if (comp.sd < 0) {
          comp.b = toNode;
          comp.a = fromNode;
        }
        interrupted && _recordInlineStyles(comp.b, props ? _memoizedRemoveProps[props] : _removeProps);
        fade && comps.push(comp.swap = {
          t: fromNode.element,
          b: comp.b,
          a: comp.a,
          sd: -comp.sd,
          swap: comp
        });
      }
      el._flip = fromNode.element._flip = _batch ? _batch.timeline : animation;
    } else if (toNode.isVisible) {
      comps.push({
        t: el,
        b: _copy3(toNode, {
          isVisible: 1
        }),
        a: toNode,
        sd: 0,
        entering: 1
      });
      el._flip = _batch ? _batch.timeline : animation;
    }
  }
  props && (_memoizedProps[props] || _memoizeProps(props)).forEach(function(p3) {
    return tweenVars[p3] = function(i3) {
      return comps[i3].a.props[p3];
    };
  });
  comps.finalStates = finalStates = [];
  run = function run2() {
    _orderByDOMDepth(comps);
    _lockBodyScroll(true);
    for (i2 = 0; i2 < comps.length; i2++) {
      comp = comps[i2];
      a = comp.a;
      b = comp.b;
      if (prune && !a.isDifferent(b) && !comp.entering) {
        comps.splice(i2--, 1);
      } else {
        el = comp.t;
        nested && !(comp.sd < 0) && i2 && (a.matrix = getGlobalMatrix(el, false, false, true));
        if (b.isVisible && a.isVisible) {
          if (comp.sd < 0) {
            state = new ElementState(el, props, fromState.simple);
            _fit(state, a, scale, 0, 0, state);
            state.matrix = getGlobalMatrix(el, false, false, true);
            state.css = comp.b.css;
            comp.a = a = state;
            fade && (el.style.opacity = interrupted ? b.opacity : a.opacity);
            stagger && swapOutTargets.push(el);
          } else if (comp.sd > 0 && fade) {
            el.style.opacity = interrupted ? a.opacity - b.opacity : "0";
          }
          _fit(a, b, scale, props);
        } else if (b.isVisible !== a.isVisible) {
          if (!b.isVisible) {
            a.isVisible && entering.push(a);
            comps.splice(i2--, 1);
          } else if (!a.isVisible) {
            b.css = a.css;
            leaving.push(b);
            comps.splice(i2--, 1);
            absolute && nested && _fit(a, b, scale, props);
          }
        }
        if (!scale) {
          el.style.maxWidth = Math.max(a.width, b.width) + "px";
          el.style.maxHeight = Math.max(a.height, b.height) + "px";
          el.style.minWidth = Math.min(a.width, b.width) + "px";
          el.style.minHeight = Math.min(a.height, b.height) + "px";
        }
        nested && toggleClass && el.classList.add(toggleClass);
      }
      finalStates.push(a);
    }
    var classTargets;
    if (toggleClass) {
      classTargets = finalStates.map(function(s) {
        return s.element;
      });
      nested && classTargets.forEach(function(e) {
        return e.classList.remove(toggleClass);
      });
    }
    _lockBodyScroll(false);
    if (scale) {
      tweenVars.scaleX = function(i3) {
        return comps[i3].a.scaleX;
      };
      tweenVars.scaleY = function(i3) {
        return comps[i3].a.scaleY;
      };
    } else {
      tweenVars.width = function(i3) {
        return comps[i3].a.width + "px";
      };
      tweenVars.height = function(i3) {
        return comps[i3].a.height + "px";
      };
      tweenVars.autoRound = vars.autoRound || false;
    }
    tweenVars.x = function(i3) {
      return comps[i3].a.x + "px";
    };
    tweenVars.y = function(i3) {
      return comps[i3].a.y + "px";
    };
    tweenVars.rotation = function(i3) {
      return comps[i3].a.rotation + (spin ? spinFunc(i3, targets[i3], targets) * 360 : 0);
    };
    tweenVars.skewX = function(i3) {
      return comps[i3].a.skewX;
    };
    targets = comps.map(function(c) {
      return c.t;
    });
    if (_zIndex || _zIndex === 0) {
      tweenVars.modifiers = {
        zIndex: function zIndex() {
          return _zIndex;
        }
      };
      tweenVars.zIndex = _zIndex;
      tweenVars.immediateRender = vars.immediateRender !== false;
    }
    fade && (tweenVars.opacity = function(i3) {
      return comps[i3].sd < 0 ? 0 : comps[i3].sd > 0 ? comps[i3].a.opacity : "+=0";
    });
    if (swapOutTargets.length) {
      stagger = gsap7.utils.distribute(stagger);
      var dummyArray = targets.slice(swapOutTargets.length);
      tweenVars.stagger = function(i3, el2) {
        return stagger(~swapOutTargets.indexOf(el2) ? targets.indexOf(comps[i3].swap.t) : i3, el2, dummyArray);
      };
    }
    _callbacks.forEach(function(name) {
      return vars[name] && animation.eventCallback(name, vars[name], vars[name + "Params"]);
    });
    if (custom && targets.length) {
      remainingProps = _copy3(tweenVars, _reserved);
      if ("scale" in custom) {
        custom.scaleX = custom.scaleY = custom.scale;
        delete custom.scale;
      }
      for (p2 in custom) {
        v = _copy3(custom[p2], _fitReserved);
        v[p2] = tweenVars[p2];
        !("duration" in v) && "duration" in tweenVars && (v.duration = tweenVars.duration);
        v.stagger = tweenVars.stagger;
        addFunc.call(animation, targets, v, 0);
        delete remainingProps[p2];
      }
    }
    if (targets.length || leaving.length || entering.length) {
      toggleClass && animation.add(function() {
        return _toggleClass(classTargets, toggleClass, animation._zTime < 0 ? "remove" : "add");
      }, 0) && !paused && _toggleClass(classTargets, toggleClass, "add");
      targets.length && addFunc.call(animation, targets, remainingProps, 0);
    }
    _handleCallback(onEnter, entering, animation);
    _handleCallback(onLeave, leaving, animation);
    var batchTl = _batch && _batch.timeline;
    if (batchTl) {
      batchTl.add(animation, 0);
      _batch._final.push(function() {
        return _setFinalStates(comps, !clearProps);
      });
    }
    endTime = animation.duration();
    animation.call(function() {
      var forward = animation.time() >= endTime;
      forward && !batchTl && _setFinalStates(comps, !clearProps);
      toggleClass && _toggleClass(classTargets, toggleClass, forward ? "remove" : "add");
    });
  };
  absoluteOnLeave && (absolute = comps.filter(function(comp2) {
    return !comp2.sd && !comp2.a.isVisible && comp2.b.isVisible;
  }).map(function(comp2) {
    return comp2.a.element;
  }));
  if (_batch) {
    var _batch$_abs;
    absolute && (_batch$_abs = _batch._abs).push.apply(_batch$_abs, _filterComps(comps, absolute));
    _batch._run.push(run);
  } else {
    absolute && _makeCompsAbsolute(_filterComps(comps, absolute));
    run();
  }
  var anim = _batch ? _batch.timeline : animation;
  anim.revert = function() {
    return _killFlip(anim, 1, 1);
  };
  return anim;
};
var _interrupt = function _interrupt2(tl) {
  tl.vars.onInterrupt && tl.vars.onInterrupt.apply(tl, tl.vars.onInterruptParams || []);
  tl.getChildren(true, false, true).forEach(_interrupt2);
};
var _killFlip = function _killFlip2(tl, action, force) {
  if (tl && tl.progress() < 1 && (!tl.paused() || force)) {
    if (action) {
      _interrupt(tl);
      action < 2 && tl.progress(1);
      tl.kill();
    }
    return true;
  }
};
var _createLookup = function _createLookup2(state) {
  var lookup = state.idLookup = {}, alt = state.alt = {}, elStates = state.elementStates, i2 = elStates.length, elState;
  while (i2--) {
    elState = elStates[i2];
    lookup[elState.id] ? alt[elState.id] = elState : lookup[elState.id] = elState;
  }
};
var FlipState = function() {
  function FlipState2(targets, vars, targetsAreElementStates) {
    this.props = vars && vars.props;
    this.simple = !!(vars && vars.simple);
    if (targetsAreElementStates) {
      this.targets = _elementsFromElementStates(targets);
      this.elementStates = targets;
      _createLookup(this);
    } else {
      this.targets = _toArray2(targets);
      var soft = vars && (vars.kill === false || vars.batch && !vars.kill);
      _batch && !soft && _batch._kill.push(this);
      this.update(soft || !!_batch);
    }
  }
  var _proto = FlipState2.prototype;
  _proto.update = function update(soft) {
    var _this = this;
    this.elementStates = this.targets.map(function(el) {
      return new ElementState(el, _this.props, _this.simple);
    });
    _createLookup(this);
    this.interrupt(soft);
    this.recordInlineStyles();
    return this;
  };
  _proto.clear = function clear() {
    this.targets.length = this.elementStates.length = 0;
    _createLookup(this);
    return this;
  };
  _proto.fit = function fit(state, scale, nested) {
    var elStatesInOrder = _orderByDOMDepth(this.elementStates.slice(0), false, true), toElStates = (state || this).idLookup, i2 = 0, fromNode, toNode;
    for (; i2 < elStatesInOrder.length; i2++) {
      fromNode = elStatesInOrder[i2];
      nested && (fromNode.matrix = getGlobalMatrix(fromNode.element, false, false, true));
      toNode = toElStates[fromNode.id];
      toNode && _fit(fromNode, toNode, scale, true, 0, fromNode);
      fromNode.matrix = getGlobalMatrix(fromNode.element, false, false, true);
    }
    return this;
  };
  _proto.getProperty = function getProperty(element, property) {
    var es = this.getElementState(element) || _emptyObj;
    return (property in es ? es : es.props || _emptyObj)[property];
  };
  _proto.add = function add(state) {
    var i2 = state.targets.length, lookup = this.idLookup, alt = this.alt, index, es, es2;
    while (i2--) {
      es = state.elementStates[i2];
      es2 = lookup[es.id];
      if (es2 && (es.element === es2.element || alt[es.id] && alt[es.id].element === es.element)) {
        index = this.elementStates.indexOf(es.element === es2.element ? es2 : alt[es.id]);
        this.targets.splice(index, 1, state.targets[i2]);
        this.elementStates.splice(index, 1, es);
      } else {
        this.targets.push(state.targets[i2]);
        this.elementStates.push(es);
      }
    }
    state.interrupted && (this.interrupted = true);
    state.simple || (this.simple = false);
    _createLookup(this);
    return this;
  };
  _proto.compare = function compare(state) {
    var l1 = state.idLookup, l2 = this.idLookup, unchanged = [], changed = [], enter = [], leave = [], targets = [], a1 = state.alt, a2 = this.alt, place = function place2(s12, s22, el2) {
      return (s12.isVisible !== s22.isVisible ? s12.isVisible ? enter : leave : s12.isVisible ? changed : unchanged).push(el2) && targets.push(el2);
    }, placeIfDoesNotExist = function placeIfDoesNotExist2(s12, s22, el2) {
      return targets.indexOf(el2) < 0 && place(s12, s22, el2);
    }, s1, s2, p2, el, s1Alt, s2Alt, c1, c2;
    for (p2 in l1) {
      s1Alt = a1[p2];
      s2Alt = a2[p2];
      s1 = !s1Alt ? l1[p2] : _getChangingElState(state, this, p2);
      el = s1.element;
      s2 = l2[p2];
      if (s2Alt) {
        c2 = s2.isVisible || !s2Alt.isVisible && el === s2.element ? s2 : s2Alt;
        c1 = s1Alt && !s1.isVisible && !s1Alt.isVisible && c2.element === s1Alt.element ? s1Alt : s1;
        if (c1.isVisible && c2.isVisible && c1.element !== c2.element) {
          (c1.isDifferent(c2) ? changed : unchanged).push(c1.element, c2.element);
          targets.push(c1.element, c2.element);
        } else {
          place(c1, c2, c1.element);
        }
        s1Alt && c1.element === s1Alt.element && (s1Alt = l1[p2]);
        placeIfDoesNotExist(c1.element !== s2.element && s1Alt ? s1Alt : c1, s2, s2.element);
        placeIfDoesNotExist(s1Alt && s1Alt.element === s2Alt.element ? s1Alt : c1, s2Alt, s2Alt.element);
        s1Alt && placeIfDoesNotExist(s1Alt, s2Alt.element === s1Alt.element ? s2Alt : s2, s1Alt.element);
      } else {
        !s2 ? enter.push(el) : !s2.isDifferent(s1) ? unchanged.push(el) : place(s1, s2, el);
        s1Alt && placeIfDoesNotExist(s1Alt, s2, s1Alt.element);
      }
    }
    for (p2 in l2) {
      if (!l1[p2]) {
        leave.push(l2[p2].element);
        a2[p2] && leave.push(a2[p2].element);
      }
    }
    return {
      changed,
      unchanged,
      enter,
      leave
    };
  };
  _proto.recordInlineStyles = function recordInlineStyles() {
    var props = _memoizedRemoveProps[this.props] || _removeProps, i2 = this.elementStates.length;
    while (i2--) {
      _recordInlineStyles(this.elementStates[i2], props);
    }
  };
  _proto.interrupt = function interrupt(soft) {
    var _this2 = this;
    var timelines = [];
    this.targets.forEach(function(t) {
      var tl = t._flip, foundInProgress = _killFlip(tl, soft ? 0 : 1);
      soft && foundInProgress && timelines.indexOf(tl) < 0 && tl.add(function() {
        return _this2.updateVisibility();
      });
      foundInProgress && timelines.push(tl);
    });
    !soft && timelines.length && this.updateVisibility();
    this.interrupted || (this.interrupted = !!timelines.length);
  };
  _proto.updateVisibility = function updateVisibility() {
    this.elementStates.forEach(function(es) {
      var b = es.element.getBoundingClientRect();
      es.isVisible = !!(b.width || b.height || b.top || b.left);
      es.uncache = 1;
    });
  };
  _proto.getElementState = function getElementState(element) {
    return this.elementStates[this.targets.indexOf(_getEl(element))];
  };
  _proto.makeAbsolute = function makeAbsolute() {
    return _orderByDOMDepth(this.elementStates.slice(0), true, true).map(_makeAbsolute);
  };
  return FlipState2;
}();
var ElementState = function() {
  function ElementState2(element, props, simple) {
    this.element = element;
    this.update(props, simple);
  }
  var _proto2 = ElementState2.prototype;
  _proto2.isDifferent = function isDifferent(state) {
    var b1 = this.bounds, b2 = state.bounds;
    return b1.top !== b2.top || b1.left !== b2.left || b1.width !== b2.width || b1.height !== b2.height || !this.matrix.equals(state.matrix) || this.opacity !== state.opacity || this.props && state.props && JSON.stringify(this.props) !== JSON.stringify(state.props);
  };
  _proto2.update = function update(props, simple) {
    var self = this, element = self.element, getProp = gsap7.getProperty(element), cache = gsap7.core.getCache(element), bounds = element.getBoundingClientRect(), bbox = element.getBBox && typeof element.getBBox === "function" && element.nodeName.toLowerCase() !== "svg" && element.getBBox(), m = simple ? new Matrix2D(1, 0, 0, 1, bounds.left + _getDocScrollLeft(), bounds.top + _getDocScrollTop()) : getGlobalMatrix(element, false, false, true);
    cache.uncache = 1;
    self.getProp = getProp;
    self.element = element;
    self.id = _getID(element);
    self.matrix = m;
    self.cache = cache;
    self.bounds = bounds;
    self.isVisible = !!(bounds.width || bounds.height || bounds.left || bounds.top);
    self.display = getProp("display");
    self.position = getProp("position");
    self.parent = element.parentNode;
    self.x = getProp("x");
    self.y = getProp("y");
    self.scaleX = cache.scaleX;
    self.scaleY = cache.scaleY;
    self.rotation = getProp("rotation");
    self.skewX = getProp("skewX");
    self.opacity = getProp("opacity");
    self.width = bbox ? bbox.width : _closestTenth(getProp("width", "px"), 0.04);
    self.height = bbox ? bbox.height : _closestTenth(getProp("height", "px"), 0.04);
    props && _recordProps(self, _memoizedProps[props] || _memoizeProps(props));
    self.ctm = element.getCTM && element.nodeName.toLowerCase() === "svg" && _getCTM(element).inverse();
    self.simple = simple || _round7(m.a) === 1 && !_round7(m.b) && !_round7(m.c) && _round7(m.d) === 1;
    self.uncache = 0;
  };
  return ElementState2;
}();
var FlipAction = function() {
  function FlipAction2(vars, batch) {
    this.vars = vars;
    this.batch = batch;
    this.states = [];
    this.timeline = batch.timeline;
  }
  var _proto3 = FlipAction2.prototype;
  _proto3.getStateById = function getStateById(id) {
    var i2 = this.states.length;
    while (i2--) {
      if (this.states[i2].idLookup[id]) {
        return this.states[i2];
      }
    }
  };
  _proto3.kill = function kill5() {
    this.batch.remove(this);
  };
  return FlipAction2;
}();
var FlipBatch = function() {
  function FlipBatch2(id) {
    this.id = id;
    this.actions = [];
    this._kill = [];
    this._final = [];
    this._abs = [];
    this._run = [];
    this.data = {};
    this.state = new FlipState();
    this.timeline = gsap7.timeline();
  }
  var _proto4 = FlipBatch2.prototype;
  _proto4.add = function add(config) {
    var result = this.actions.filter(function(action) {
      return action.vars === config;
    });
    if (result.length) {
      return result[0];
    }
    result = new FlipAction(typeof config === "function" ? {
      animate: config
    } : config, this);
    this.actions.push(result);
    return result;
  };
  _proto4.remove = function remove(action) {
    var i2 = this.actions.indexOf(action);
    i2 >= 0 && this.actions.splice(i2, 1);
    return this;
  };
  _proto4.getState = function getState(merge) {
    var _this3 = this;
    var prevBatch = _batch, prevAction = _batchAction;
    _batch = this;
    this.state.clear();
    this._kill.length = 0;
    this.actions.forEach(function(action) {
      if (action.vars.getState) {
        action.states.length = 0;
        _batchAction = action;
        action.state = action.vars.getState(action);
      }
      merge && action.states.forEach(function(s) {
        return _this3.state.add(s);
      });
    });
    _batchAction = prevAction;
    _batch = prevBatch;
    this.killConflicts();
    return this;
  };
  _proto4.animate = function animate() {
    var _this4 = this;
    var prevBatch = _batch, tl = this.timeline, i2 = this.actions.length, finalStates, endTime;
    _batch = this;
    tl.clear();
    this._abs.length = this._final.length = this._run.length = 0;
    this.actions.forEach(function(a) {
      a.vars.animate && a.vars.animate(a);
      var onEnter = a.vars.onEnter, onLeave = a.vars.onLeave, targets = a.targets, s, result;
      if (targets && targets.length && (onEnter || onLeave)) {
        s = new FlipState();
        a.states.forEach(function(state) {
          return s.add(state);
        });
        result = s.compare(Flip.getState(targets));
        result.enter.length && onEnter && onEnter(result.enter);
        result.leave.length && onLeave && onLeave(result.leave);
      }
    });
    _makeCompsAbsolute(this._abs);
    this._run.forEach(function(f) {
      return f();
    });
    endTime = tl.duration();
    finalStates = this._final.slice(0);
    tl.add(function() {
      if (endTime <= tl.time()) {
        finalStates.forEach(function(f) {
          return f();
        });
        _forEachBatch(_this4, "onComplete");
      }
    });
    _batch = prevBatch;
    while (i2--) {
      this.actions[i2].vars.once && this.actions[i2].kill();
    }
    _forEachBatch(this, "onStart");
    tl.restart();
    return this;
  };
  _proto4.loadState = function loadState(done) {
    done || (done = function done2() {
      return 0;
    });
    var queue = [];
    this.actions.forEach(function(c) {
      if (c.vars.loadState) {
        var i2, f = function f2(targets) {
          targets && (c.targets = targets);
          i2 = queue.indexOf(f2);
          if (~i2) {
            queue.splice(i2, 1);
            queue.length || done();
          }
        };
        queue.push(f);
        c.vars.loadState(f);
      }
    });
    queue.length || done();
    return this;
  };
  _proto4.setState = function setState() {
    this.actions.forEach(function(c) {
      return c.targets = c.vars.setState && c.vars.setState(c);
    });
    return this;
  };
  _proto4.killConflicts = function killConflicts(soft) {
    this.state.interrupt(soft);
    this._kill.forEach(function(state) {
      return state.interrupt(soft);
    });
    return this;
  };
  _proto4.run = function run(skipGetState, merge) {
    var _this5 = this;
    if (this !== _batch) {
      skipGetState || this.getState(merge);
      this.loadState(function() {
        if (!_this5._killed) {
          _this5.setState();
          _this5.animate();
        }
      });
    }
    return this;
  };
  _proto4.clear = function clear(stateOnly) {
    this.state.clear();
    stateOnly || (this.actions.length = 0);
  };
  _proto4.getStateById = function getStateById(id) {
    var i2 = this.actions.length, s;
    while (i2--) {
      s = this.actions[i2].getStateById(id);
      if (s) {
        return s;
      }
    }
    return this.state.idLookup[id] && this.state;
  };
  _proto4.kill = function kill5() {
    this._killed = 1;
    this.clear();
    delete _batchLookup[this.id];
  };
  return FlipBatch2;
}();
var Flip = function() {
  function Flip2() {
  }
  Flip2.getState = function getState(targets, vars) {
    var state = _parseState(targets, vars);
    _batchAction && _batchAction.states.push(state);
    vars && vars.batch && Flip2.batch(vars.batch).state.add(state);
    return state;
  };
  Flip2.from = function from(state, vars) {
    vars = vars || {};
    "clearProps" in vars || (vars.clearProps = true);
    return _fromTo(state, _parseState(vars.targets || state.targets, {
      props: vars.props || state.props,
      simple: vars.simple,
      kill: !!vars.kill
    }), vars, -1);
  };
  Flip2.to = function to(state, vars) {
    return _fromTo(state, _parseState(vars.targets || state.targets, {
      props: vars.props || state.props,
      simple: vars.simple,
      kill: !!vars.kill
    }), vars, 1);
  };
  Flip2.fromTo = function fromTo(fromState, toState, vars) {
    return _fromTo(fromState, toState, vars);
  };
  Flip2.fit = function fit(fromEl, toEl, vars) {
    var v = vars ? _copy3(vars, _fitReserved) : {}, _ref = vars || v, absolute = _ref.absolute, scale = _ref.scale, getVars = _ref.getVars, props = _ref.props, runBackwards = _ref.runBackwards, onComplete = _ref.onComplete, simple = _ref.simple, fitChild = vars && vars.fitChild && _getEl(vars.fitChild), before = _parseElementState(toEl, props, simple, fromEl), after = _parseElementState(fromEl, 0, simple, before), inlineProps = props ? _memoizedRemoveProps[props] : _removeProps, ctx = gsap7.context();
    props && _applyProps(v, before.props);
    _recordInlineStyles(after, inlineProps);
    if (runBackwards) {
      "immediateRender" in v || (v.immediateRender = true);
      v.onComplete = function() {
        _applyInlineStyles(after);
        onComplete && onComplete.apply(this, arguments);
      };
    }
    absolute && _makeAbsolute(after, before);
    v = _fit(after, before, scale || fitChild, !v.duration && props, fitChild, v.duration || getVars ? v : 0);
    typeof vars === "object" && "zIndex" in vars && (v.zIndex = vars.zIndex);
    ctx && !getVars && ctx.add(function() {
      return function() {
        return _applyInlineStyles(after);
      };
    });
    return getVars ? v : v.duration ? gsap7.to(after.element, v) : null;
  };
  Flip2.makeAbsolute = function makeAbsolute(targetsOrStates, vars) {
    return (targetsOrStates instanceof FlipState ? targetsOrStates : new FlipState(targetsOrStates, vars)).makeAbsolute();
  };
  Flip2.batch = function batch(id) {
    id || (id = "default");
    return _batchLookup[id] || (_batchLookup[id] = new FlipBatch(id));
  };
  Flip2.killFlipsOf = function killFlipsOf(targets, complete) {
    (targets instanceof FlipState ? targets.targets : _toArray2(targets)).forEach(function(t) {
      return t && _killFlip(t._flip, complete !== false ? 1 : 2);
    });
  };
  Flip2.isFlipping = function isFlipping(target) {
    var f = Flip2.getByTarget(target);
    return !!f && f.isActive();
  };
  Flip2.getByTarget = function getByTarget(target) {
    return (_getEl(target) || _emptyObj)._flip;
  };
  Flip2.getElementState = function getElementState(target, props) {
    return new ElementState(_getEl(target), props);
  };
  Flip2.convertCoordinates = function convertCoordinates2(fromElement, toElement, point) {
    var m = getGlobalMatrix(toElement, true, true).multiply(getGlobalMatrix(fromElement));
    return point ? m.apply(point) : m;
  };
  Flip2.register = function register8(core) {
    _body3 = typeof document !== "undefined" && document.body;
    if (_body3) {
      gsap7 = core;
      _setDoc(_body3);
      _toArray2 = gsap7.utils.toArray;
      _getStyleSaver2 = gsap7.core.getStyleSaver;
      var snap2 = gsap7.utils.snap(0.1);
      _closestTenth = function _closestTenth2(value, add) {
        return snap2(parseFloat(value) + add);
      };
    }
  };
  return Flip2;
}();
Flip.version = "3.13.0";
typeof window !== "undefined" && window.gsap && window.gsap.registerPlugin(Flip);

// node_modules/gsap/MotionPathPlugin.js
var _xProps = "x,translateX,left,marginLeft,xPercent".split(",");
var _yProps = "y,translateY,top,marginTop,yPercent".split(",");
var _DEG2RAD3 = Math.PI / 180;
var gsap8;
var PropTween;
var _getUnit;
var _toArray3;
var _getStyleSaver3;
var _reverting;
var _getGSAP11 = function _getGSAP12() {
  return gsap8 || typeof window !== "undefined" && (gsap8 = window.gsap) && gsap8.registerPlugin && gsap8;
};
var _populateSegmentFromArray = function _populateSegmentFromArray2(segment, values, property, mode) {
  var l = values.length, si = mode === 2 ? 0 : mode, i2 = 0, v;
  for (; i2 < l; i2++) {
    segment[si] = v = parseFloat(values[i2][property]);
    mode === 2 && (segment[si + 1] = 0);
    si += 2;
  }
  return segment;
};
var _getPropNum = function _getPropNum2(target, prop, unit) {
  return parseFloat(target._gsap.get(target, prop, unit || "px")) || 0;
};
var _relativize = function _relativize2(segment) {
  var x = segment[0], y = segment[1], i2;
  for (i2 = 2; i2 < segment.length; i2 += 2) {
    x = segment[i2] += x;
    y = segment[i2 + 1] += y;
  }
};
var _segmentToRawPath = function _segmentToRawPath2(plugin, segment, target, x, y, slicer, vars, unitX, unitY) {
  if (vars.type === "cubic") {
    segment = [segment];
  } else {
    vars.fromCurrent !== false && segment.unshift(_getPropNum(target, x, unitX), y ? _getPropNum(target, y, unitY) : 0);
    vars.relative && _relativize(segment);
    var pointFunc = y ? pointsToSegment : flatPointsToSegment;
    segment = [pointFunc(segment, vars.curviness)];
  }
  segment = slicer(_align(segment, target, vars));
  _addDimensionalPropTween(plugin, target, x, segment, "x", unitX);
  y && _addDimensionalPropTween(plugin, target, y, segment, "y", unitY);
  return cacheRawPathMeasurements(segment, vars.resolution || (vars.curviness === 0 ? 20 : 12));
};
var _emptyFunc3 = function _emptyFunc4(v) {
  return v;
};
var _numExp2 = /[-+\.]*\d+\.?(?:e-|e\+)?\d*/g;
var _originToPoint = function _originToPoint2(element, origin, parentMatrix) {
  var m = getGlobalMatrix(element), x = 0, y = 0, svg;
  if ((element.tagName + "").toLowerCase() === "svg") {
    svg = element.viewBox.baseVal;
    svg.width || (svg = {
      width: +element.getAttribute("width"),
      height: +element.getAttribute("height")
    });
  } else {
    svg = origin && element.getBBox && element.getBBox();
  }
  if (origin && origin !== "auto") {
    x = origin.push ? origin[0] * (svg ? svg.width : element.offsetWidth || 0) : origin.x;
    y = origin.push ? origin[1] * (svg ? svg.height : element.offsetHeight || 0) : origin.y;
  }
  return parentMatrix.apply(x || y ? m.apply({
    x,
    y
  }) : {
    x: m.e,
    y: m.f
  });
};
var _getAlignMatrix = function _getAlignMatrix2(fromElement, toElement, fromOrigin, toOrigin) {
  var parentMatrix = getGlobalMatrix(fromElement.parentNode, true, true), m = parentMatrix.clone().multiply(getGlobalMatrix(toElement)), fromPoint = _originToPoint(fromElement, fromOrigin, parentMatrix), _originToPoint22 = _originToPoint(toElement, toOrigin, parentMatrix), x = _originToPoint22.x, y = _originToPoint22.y, p2;
  m.e = m.f = 0;
  if (toOrigin === "auto" && toElement.getTotalLength && toElement.tagName.toLowerCase() === "path") {
    p2 = toElement.getAttribute("d").match(_numExp2) || [];
    p2 = m.apply({
      x: +p2[0],
      y: +p2[1]
    });
    x += p2.x;
    y += p2.y;
  }
  if (p2) {
    p2 = m.apply(toElement.getBBox());
    x -= p2.x;
    y -= p2.y;
  }
  m.e = x - fromPoint.x;
  m.f = y - fromPoint.y;
  return m;
};
var _align = function _align2(rawPath, target, _ref) {
  var align = _ref.align, matrix = _ref.matrix, offsetX = _ref.offsetX, offsetY = _ref.offsetY, alignOrigin = _ref.alignOrigin;
  var x = rawPath[0][0], y = rawPath[0][1], curX = _getPropNum(target, "x"), curY = _getPropNum(target, "y"), alignTarget, m, p2;
  if (!rawPath || !rawPath.length) {
    return getRawPath("M0,0L0,0");
  }
  if (align) {
    if (align === "self" || (alignTarget = _toArray3(align)[0] || target) === target) {
      transformRawPath(rawPath, 1, 0, 0, 1, curX - x, curY - y);
    } else {
      if (alignOrigin && alignOrigin[2] !== false) {
        gsap8.set(target, {
          transformOrigin: alignOrigin[0] * 100 + "% " + alignOrigin[1] * 100 + "%"
        });
      } else {
        alignOrigin = [_getPropNum(target, "xPercent") / -100, _getPropNum(target, "yPercent") / -100];
      }
      m = _getAlignMatrix(target, alignTarget, alignOrigin, "auto");
      p2 = m.apply({
        x,
        y
      });
      transformRawPath(rawPath, m.a, m.b, m.c, m.d, curX + m.e - (p2.x - m.e), curY + m.f - (p2.y - m.f));
    }
  }
  if (matrix) {
    transformRawPath(rawPath, matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
  } else if (offsetX || offsetY) {
    transformRawPath(rawPath, 1, 0, 0, 1, offsetX || 0, offsetY || 0);
  }
  return rawPath;
};
var _addDimensionalPropTween = function _addDimensionalPropTween2(plugin, target, property, rawPath, pathProperty, forceUnit) {
  var cache = target._gsap, harness = cache.harness, alias = harness && harness.aliases && harness.aliases[property], prop = alias && alias.indexOf(",") < 0 ? alias : property, pt = plugin._pt = new PropTween(plugin._pt, target, prop, 0, 0, _emptyFunc3, 0, cache.set(target, prop, plugin));
  pt.u = _getUnit(cache.get(target, prop, forceUnit)) || 0;
  pt.path = rawPath;
  pt.pp = pathProperty;
  plugin._props.push(prop);
};
var _sliceModifier = function _sliceModifier2(start, end) {
  return function(rawPath) {
    return start || end !== 1 ? sliceRawPath(rawPath, start, end) : rawPath;
  };
};
var MotionPathPlugin = {
  version: "3.13.0",
  name: "motionPath",
  register: function register(core, Plugin, propTween) {
    gsap8 = core;
    _getUnit = gsap8.utils.getUnit;
    _toArray3 = gsap8.utils.toArray;
    _getStyleSaver3 = gsap8.core.getStyleSaver;
    _reverting = gsap8.core.reverting || function() {
    };
    PropTween = propTween;
  },
  init: function init3(target, vars, tween) {
    if (!gsap8) {
      console.warn("Please gsap.registerPlugin(MotionPathPlugin)");
      return false;
    }
    if (!(typeof vars === "object" && !vars.style) || !vars.path) {
      vars = {
        path: vars
      };
    }
    var rawPaths = [], _vars = vars, path = _vars.path, autoRotate = _vars.autoRotate, unitX = _vars.unitX, unitY = _vars.unitY, x = _vars.x, y = _vars.y, firstObj = path[0], slicer = _sliceModifier(vars.start, "end" in vars ? vars.end : 1), rawPath, p2;
    this.rawPaths = rawPaths;
    this.target = target;
    this.tween = tween;
    this.styles = _getStyleSaver3 && _getStyleSaver3(target, "transform");
    if (this.rotate = autoRotate || autoRotate === 0) {
      this.rOffset = parseFloat(autoRotate) || 0;
      this.radians = !!vars.useRadians;
      this.rProp = vars.rotation || "rotation";
      this.rSet = target._gsap.set(target, this.rProp, this);
      this.ru = _getUnit(target._gsap.get(target, this.rProp)) || 0;
    }
    if (Array.isArray(path) && !("closed" in path) && typeof firstObj !== "number") {
      for (p2 in firstObj) {
        if (!x && ~_xProps.indexOf(p2)) {
          x = p2;
        } else if (!y && ~_yProps.indexOf(p2)) {
          y = p2;
        }
      }
      if (x && y) {
        rawPaths.push(_segmentToRawPath(this, _populateSegmentFromArray(_populateSegmentFromArray([], path, x, 0), path, y, 1), target, x, y, slicer, vars, unitX || _getUnit(path[0][x]), unitY || _getUnit(path[0][y])));
      } else {
        x = y = 0;
      }
      for (p2 in firstObj) {
        p2 !== x && p2 !== y && rawPaths.push(_segmentToRawPath(this, _populateSegmentFromArray([], path, p2, 2), target, p2, 0, slicer, vars, _getUnit(path[0][p2])));
      }
    } else {
      rawPath = slicer(_align(getRawPath(vars.path), target, vars));
      cacheRawPathMeasurements(rawPath, vars.resolution);
      rawPaths.push(rawPath);
      _addDimensionalPropTween(this, target, vars.x || "x", rawPath, "x", vars.unitX || "px");
      _addDimensionalPropTween(this, target, vars.y || "y", rawPath, "y", vars.unitY || "px");
    }
    tween.vars.immediateRender && this.render(tween.progress(), this);
  },
  render: function render3(ratio, data) {
    var rawPaths = data.rawPaths, i2 = rawPaths.length, pt = data._pt;
    if (data.tween._time || !_reverting()) {
      if (ratio > 1) {
        ratio = 1;
      } else if (ratio < 0) {
        ratio = 0;
      }
      while (i2--) {
        getPositionOnPath(rawPaths[i2], ratio, !i2 && data.rotate, rawPaths[i2]);
      }
      while (pt) {
        pt.set(pt.t, pt.p, pt.path[pt.pp] + pt.u, pt.d, ratio);
        pt = pt._next;
      }
      data.rotate && data.rSet(data.target, data.rProp, rawPaths[0].angle * (data.radians ? _DEG2RAD3 : 1) + data.rOffset + data.ru, data, ratio);
    } else {
      data.styles.revert();
    }
  },
  getLength: function getLength(path) {
    return cacheRawPathMeasurements(getRawPath(path)).totalLength;
  },
  sliceRawPath,
  getRawPath,
  pointsToSegment,
  stringToRawPath,
  rawPathToString,
  transformRawPath,
  getGlobalMatrix,
  getPositionOnPath,
  cacheRawPathMeasurements,
  convertToPath: function convertToPath2(targets, swap) {
    return _toArray3(targets).map(function(target) {
      return convertToPath(target, swap !== false);
    });
  },
  convertCoordinates: function convertCoordinates(fromElement, toElement, point) {
    var m = getGlobalMatrix(toElement, true, true).multiply(getGlobalMatrix(fromElement));
    return point ? m.apply(point) : m;
  },
  getAlignMatrix: _getAlignMatrix,
  getRelativePosition: function getRelativePosition(fromElement, toElement, fromOrigin, toOrigin) {
    var m = _getAlignMatrix(fromElement, toElement, fromOrigin, toOrigin);
    return {
      x: m.e,
      y: m.f
    };
  },
  arrayToRawPath: function arrayToRawPath(value, vars) {
    vars = vars || {};
    var segment = _populateSegmentFromArray(_populateSegmentFromArray([], value, vars.x || "x", 0), value, vars.y || "y", 1);
    vars.relative && _relativize(segment);
    return [vars.type === "cubic" ? segment : pointsToSegment(segment, vars.curviness)];
  }
};
_getGSAP11() && gsap8.registerPlugin(MotionPathPlugin);

// node_modules/gsap/Observer.js
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
var gsap9;
var _coreInitted6;
var _clamp;
var _win5;
var _doc4;
var _docEl;
var _body4;
var _isTouch;
var _pointerType;
var ScrollTrigger;
var _root;
var _normalizer;
var _eventTypes;
var _context2;
var _getGSAP13 = function _getGSAP14() {
  return gsap9 || typeof window !== "undefined" && (gsap9 = window.gsap) && gsap9.registerPlugin && gsap9;
};
var _startup = 1;
var _observers = [];
var _scrollers = [];
var _proxies = [];
var _getTime2 = Date.now;
var _bridge = function _bridge2(name, value) {
  return value;
};
var _integrate = function _integrate2() {
  var core = ScrollTrigger.core, data = core.bridge || {}, scrollers = core._scrollers, proxies = core._proxies;
  scrollers.push.apply(scrollers, _scrollers);
  proxies.push.apply(proxies, _proxies);
  _scrollers = scrollers;
  _proxies = proxies;
  _bridge = function _bridge3(name, value) {
    return data[name](value);
  };
};
var _getProxyProp = function _getProxyProp2(element, property) {
  return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
};
var _isViewport = function _isViewport2(el) {
  return !!~_root.indexOf(el);
};
var _addListener3 = function _addListener4(element, type, func, passive, capture) {
  return element.addEventListener(type, func, {
    passive: passive !== false,
    capture: !!capture
  });
};
var _removeListener3 = function _removeListener4(element, type, func, capture) {
  return element.removeEventListener(type, func, !!capture);
};
var _scrollLeft = "scrollLeft";
var _scrollTop = "scrollTop";
var _onScroll = function _onScroll2() {
  return _normalizer && _normalizer.isPressed || _scrollers.cache++;
};
var _scrollCacheFunc = function _scrollCacheFunc2(f, doNotCache) {
  var cachingFunc = function cachingFunc2(value) {
    if (value || value === 0) {
      _startup && (_win5.history.scrollRestoration = "manual");
      var isNormalizing = _normalizer && _normalizer.isPressed;
      value = cachingFunc2.v = Math.round(value) || (_normalizer && _normalizer.iOS ? 1 : 0);
      f(value);
      cachingFunc2.cacheID = _scrollers.cache;
      isNormalizing && _bridge("ss", value);
    } else if (doNotCache || _scrollers.cache !== cachingFunc2.cacheID || _bridge("ref")) {
      cachingFunc2.cacheID = _scrollers.cache;
      cachingFunc2.v = f();
    }
    return cachingFunc2.v + cachingFunc2.offset;
  };
  cachingFunc.offset = 0;
  return f && cachingFunc;
};
var _horizontal = {
  s: _scrollLeft,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: _scrollCacheFunc(function(value) {
    return arguments.length ? _win5.scrollTo(value, _vertical.sc()) : _win5.pageXOffset || _doc4[_scrollLeft] || _docEl[_scrollLeft] || _body4[_scrollLeft] || 0;
  })
};
var _vertical = {
  s: _scrollTop,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: _horizontal,
  sc: _scrollCacheFunc(function(value) {
    return arguments.length ? _win5.scrollTo(_horizontal.sc(), value) : _win5.pageYOffset || _doc4[_scrollTop] || _docEl[_scrollTop] || _body4[_scrollTop] || 0;
  })
};
var _getTarget = function _getTarget2(t, self) {
  return (self && self._ctx && self._ctx.selector || gsap9.utils.toArray)(t)[0] || (typeof t === "string" && gsap9.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
};
var _isWithin = function _isWithin2(element, list) {
  var i2 = list.length;
  while (i2--) {
    if (list[i2] === element || list[i2].contains(element)) {
      return true;
    }
  }
  return false;
};
var _getScrollFunc = function _getScrollFunc2(element, _ref) {
  var s = _ref.s, sc = _ref.sc;
  _isViewport(element) && (element = _doc4.scrollingElement || _docEl);
  var i2 = _scrollers.indexOf(element), offset = sc === _vertical.sc ? 1 : 2;
  !~i2 && (i2 = _scrollers.push(element) - 1);
  _scrollers[i2 + offset] || _addListener3(element, "scroll", _onScroll);
  var prev = _scrollers[i2 + offset], func = prev || (_scrollers[i2 + offset] = _scrollCacheFunc(_getProxyProp(element, s), true) || (_isViewport(element) ? sc : _scrollCacheFunc(function(value) {
    return arguments.length ? element[s] = value : element[s];
  })));
  func.target = element;
  prev || (func.smooth = gsap9.getProperty(element, "scrollBehavior") === "smooth");
  return func;
};
var _getVelocityProp = function _getVelocityProp2(value, minTimeRefresh, useDelta) {
  var v1 = value, v2 = value, t1 = _getTime2(), t2 = t1, min = minTimeRefresh || 50, dropToZeroTime = Math.max(500, min * 3), update = function update2(value2, force) {
    var t = _getTime2();
    if (force || t - t1 > min) {
      v2 = v1;
      v1 = value2;
      t2 = t1;
      t1 = t;
    } else if (useDelta) {
      v1 += value2;
    } else {
      v1 = v2 + (value2 - v2) / (t - t2) * (t1 - t2);
    }
  }, reset = function reset2() {
    v2 = v1 = useDelta ? 0 : v1;
    t2 = t1 = 0;
  }, getVelocity = function getVelocity2(latestValue) {
    var tOld = t2, vOld = v2, t = _getTime2();
    (latestValue || latestValue === 0) && latestValue !== v1 && update(latestValue);
    return t1 === t2 || t - t2 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld) * 1e3;
  };
  return {
    update,
    reset,
    getVelocity
  };
};
var _getEvent = function _getEvent2(e, preventDefault) {
  preventDefault && !e._gsapAllow && e.preventDefault();
  return e.changedTouches ? e.changedTouches[0] : e;
};
var _getAbsoluteMax = function _getAbsoluteMax2(a) {
  var max = Math.max.apply(Math, a), min = Math.min.apply(Math, a);
  return Math.abs(max) >= Math.abs(min) ? max : min;
};
var _setScrollTrigger = function _setScrollTrigger2() {
  ScrollTrigger = gsap9.core.globals().ScrollTrigger;
  ScrollTrigger && ScrollTrigger.core && _integrate();
};
var _initCore11 = function _initCore12(core) {
  gsap9 = core || _getGSAP13();
  if (!_coreInitted6 && gsap9 && typeof document !== "undefined" && document.body) {
    _win5 = window;
    _doc4 = document;
    _docEl = _doc4.documentElement;
    _body4 = _doc4.body;
    _root = [_win5, _doc4, _docEl, _body4];
    _clamp = gsap9.utils.clamp;
    _context2 = gsap9.core.context || function() {
    };
    _pointerType = "onpointerenter" in _body4 ? "pointer" : "mouse";
    _isTouch = Observer.isTouch = _win5.matchMedia && _win5.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win5 || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
    _eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
    setTimeout(function() {
      return _startup = 0;
    }, 500);
    _setScrollTrigger();
    _coreInitted6 = 1;
  }
  return _coreInitted6;
};
_horizontal.op = _vertical;
_scrollers.cache = 0;
var Observer = function() {
  function Observer2(vars) {
    this.init(vars);
  }
  var _proto = Observer2.prototype;
  _proto.init = function init13(vars) {
    _coreInitted6 || _initCore11(gsap9) || console.warn("Please gsap.registerPlugin(Observer)");
    ScrollTrigger || _setScrollTrigger();
    var tolerance = vars.tolerance, dragMinimum = vars.dragMinimum, type = vars.type, target = vars.target, lineHeight = vars.lineHeight, debounce = vars.debounce, preventDefault = vars.preventDefault, onStop = vars.onStop, onStopDelay = vars.onStopDelay, ignore = vars.ignore, wheelSpeed = vars.wheelSpeed, event = vars.event, onDragStart = vars.onDragStart, onDragEnd = vars.onDragEnd, onDrag = vars.onDrag, onPress = vars.onPress, onRelease = vars.onRelease, onRight = vars.onRight, onLeft = vars.onLeft, onUp = vars.onUp, onDown = vars.onDown, onChangeX = vars.onChangeX, onChangeY = vars.onChangeY, onChange = vars.onChange, onToggleX = vars.onToggleX, onToggleY = vars.onToggleY, onHover = vars.onHover, onHoverEnd = vars.onHoverEnd, onMove = vars.onMove, ignoreCheck = vars.ignoreCheck, isNormalizer = vars.isNormalizer, onGestureStart = vars.onGestureStart, onGestureEnd = vars.onGestureEnd, onWheel = vars.onWheel, onEnable = vars.onEnable, onDisable = vars.onDisable, onClick = vars.onClick, scrollSpeed = vars.scrollSpeed, capture = vars.capture, allowClicks = vars.allowClicks, lockAxis = vars.lockAxis, onLockAxis = vars.onLockAxis;
    this.target = target = _getTarget(target) || _docEl;
    this.vars = vars;
    ignore && (ignore = gsap9.utils.toArray(ignore));
    tolerance = tolerance || 1e-9;
    dragMinimum = dragMinimum || 0;
    wheelSpeed = wheelSpeed || 1;
    scrollSpeed = scrollSpeed || 1;
    type = type || "wheel,touch,pointer";
    debounce = debounce !== false;
    lineHeight || (lineHeight = parseFloat(_win5.getComputedStyle(_body4).lineHeight) || 22);
    var id, onStopDelayedCall, dragged, moved, wheeled, locked, axis, self = this, prevDeltaX = 0, prevDeltaY = 0, passive = vars.passive || !preventDefault && vars.passive !== false, scrollFuncX = _getScrollFunc(target, _horizontal), scrollFuncY = _getScrollFunc(target, _vertical), scrollX = scrollFuncX(), scrollY = scrollFuncY(), limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown", isViewport = _isViewport(target), ownerDoc = target.ownerDocument || _doc4, deltaX = [0, 0, 0], deltaY = [0, 0, 0], onClickTime = 0, clickCapture = function clickCapture2() {
      return onClickTime = _getTime2();
    }, _ignoreCheck = function _ignoreCheck2(e, isPointerOrTouch) {
      return (self.event = e) && ignore && _isWithin(e.target, ignore) || isPointerOrTouch && limitToTouch && e.pointerType !== "touch" || ignoreCheck && ignoreCheck(e, isPointerOrTouch);
    }, onStopFunc = function onStopFunc2() {
      self._vx.reset();
      self._vy.reset();
      onStopDelayedCall.pause();
      onStop && onStop(self);
    }, update = function update2() {
      var dx = self.deltaX = _getAbsoluteMax(deltaX), dy = self.deltaY = _getAbsoluteMax(deltaY), changedX = Math.abs(dx) >= tolerance, changedY = Math.abs(dy) >= tolerance;
      onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY);
      if (changedX) {
        onRight && self.deltaX > 0 && onRight(self);
        onLeft && self.deltaX < 0 && onLeft(self);
        onChangeX && onChangeX(self);
        onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
        prevDeltaX = self.deltaX;
        deltaX[0] = deltaX[1] = deltaX[2] = 0;
      }
      if (changedY) {
        onDown && self.deltaY > 0 && onDown(self);
        onUp && self.deltaY < 0 && onUp(self);
        onChangeY && onChangeY(self);
        onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
        prevDeltaY = self.deltaY;
        deltaY[0] = deltaY[1] = deltaY[2] = 0;
      }
      if (moved || dragged) {
        onMove && onMove(self);
        if (dragged) {
          onDragStart && dragged === 1 && onDragStart(self);
          onDrag && onDrag(self);
          dragged = 0;
        }
        moved = false;
      }
      locked && !(locked = false) && onLockAxis && onLockAxis(self);
      if (wheeled) {
        onWheel(self);
        wheeled = false;
      }
      id = 0;
    }, onDelta = function onDelta2(x, y, index) {
      deltaX[index] += x;
      deltaY[index] += y;
      self._vx.update(x);
      self._vy.update(y);
      debounce ? id || (id = requestAnimationFrame(update)) : update();
    }, onTouchOrPointerDelta = function onTouchOrPointerDelta2(x, y) {
      if (lockAxis && !axis) {
        self.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
        locked = true;
      }
      if (axis !== "y") {
        deltaX[2] += x;
        self._vx.update(x, true);
      }
      if (axis !== "x") {
        deltaY[2] += y;
        self._vy.update(y, true);
      }
      debounce ? id || (id = requestAnimationFrame(update)) : update();
    }, _onDrag = function _onDrag2(e) {
      if (_ignoreCheck(e, 1)) {
        return;
      }
      e = _getEvent(e, preventDefault);
      var x = e.clientX, y = e.clientY, dx = x - self.x, dy = y - self.y, isDragging = self.isDragging;
      self.x = x;
      self.y = y;
      if (isDragging || (dx || dy) && (Math.abs(self.startX - x) >= dragMinimum || Math.abs(self.startY - y) >= dragMinimum)) {
        dragged = isDragging ? 2 : 1;
        isDragging || (self.isDragging = true);
        onTouchOrPointerDelta(dx, dy);
      }
    }, _onPress3 = self.onPress = function(e) {
      if (_ignoreCheck(e, 1) || e && e.button) {
        return;
      }
      self.axis = axis = null;
      onStopDelayedCall.pause();
      self.isPressed = true;
      e = _getEvent(e);
      prevDeltaX = prevDeltaY = 0;
      self.startX = self.x = e.clientX;
      self.startY = self.y = e.clientY;
      self._vx.reset();
      self._vy.reset();
      _addListener3(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, passive, true);
      self.deltaX = self.deltaY = 0;
      onPress && onPress(self);
    }, _onRelease3 = self.onRelease = function(e) {
      if (_ignoreCheck(e, 1)) {
        return;
      }
      _removeListener3(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
      var isTrackingDrag = !isNaN(self.y - self.startY), wasDragging = self.isDragging, isDragNotClick = wasDragging && (Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3), eventData = _getEvent(e);
      if (!isDragNotClick && isTrackingDrag) {
        self._vx.reset();
        self._vy.reset();
        if (preventDefault && allowClicks) {
          gsap9.delayedCall(0.08, function() {
            if (_getTime2() - onClickTime > 300 && !e.defaultPrevented) {
              if (e.target.click) {
                e.target.click();
              } else if (ownerDoc.createEvent) {
                var syntheticEvent = ownerDoc.createEvent("MouseEvents");
                syntheticEvent.initMouseEvent("click", true, true, _win5, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
                e.target.dispatchEvent(syntheticEvent);
              }
            }
          });
        }
      }
      self.isDragging = self.isGesturing = self.isPressed = false;
      onStop && wasDragging && !isNormalizer && onStopDelayedCall.restart(true);
      dragged && update();
      onDragEnd && wasDragging && onDragEnd(self);
      onRelease && onRelease(self, isDragNotClick);
    }, _onGestureStart = function _onGestureStart2(e) {
      return e.touches && e.touches.length > 1 && (self.isGesturing = true) && onGestureStart(e, self.isDragging);
    }, _onGestureEnd = function _onGestureEnd2() {
      return (self.isGesturing = false) || onGestureEnd(self);
    }, onScroll = function onScroll2(e) {
      if (_ignoreCheck(e)) {
        return;
      }
      var x = scrollFuncX(), y = scrollFuncY();
      onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
      scrollX = x;
      scrollY = y;
      onStop && onStopDelayedCall.restart(true);
    }, _onWheel = function _onWheel2(e) {
      if (_ignoreCheck(e)) {
        return;
      }
      e = _getEvent(e, preventDefault);
      onWheel && (wheeled = true);
      var multiplier = (e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? _win5.innerHeight : 1) * wheelSpeed;
      onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
      onStop && !isNormalizer && onStopDelayedCall.restart(true);
    }, _onMove3 = function _onMove4(e) {
      if (_ignoreCheck(e)) {
        return;
      }
      var x = e.clientX, y = e.clientY, dx = x - self.x, dy = y - self.y;
      self.x = x;
      self.y = y;
      moved = true;
      onStop && onStopDelayedCall.restart(true);
      (dx || dy) && onTouchOrPointerDelta(dx, dy);
    }, _onHover = function _onHover2(e) {
      self.event = e;
      onHover(self);
    }, _onHoverEnd = function _onHoverEnd2(e) {
      self.event = e;
      onHoverEnd(self);
    }, _onClick = function _onClick2(e) {
      return _ignoreCheck(e) || _getEvent(e, preventDefault) && onClick(self);
    };
    onStopDelayedCall = self._dc = gsap9.delayedCall(onStopDelay || 0.25, onStopFunc).pause();
    self.deltaX = self.deltaY = 0;
    self._vx = _getVelocityProp(0, 50, true);
    self._vy = _getVelocityProp(0, 50, true);
    self.scrollX = scrollFuncX;
    self.scrollY = scrollFuncY;
    self.isDragging = self.isGesturing = self.isPressed = false;
    _context2(this);
    self.enable = function(e) {
      if (!self.isEnabled) {
        _addListener3(isViewport ? ownerDoc : target, "scroll", _onScroll);
        type.indexOf("scroll") >= 0 && _addListener3(isViewport ? ownerDoc : target, "scroll", onScroll, passive, capture);
        type.indexOf("wheel") >= 0 && _addListener3(target, "wheel", _onWheel, passive, capture);
        if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
          _addListener3(target, _eventTypes[0], _onPress3, passive, capture);
          _addListener3(ownerDoc, _eventTypes[2], _onRelease3);
          _addListener3(ownerDoc, _eventTypes[3], _onRelease3);
          allowClicks && _addListener3(target, "click", clickCapture, true, true);
          onClick && _addListener3(target, "click", _onClick);
          onGestureStart && _addListener3(ownerDoc, "gesturestart", _onGestureStart);
          onGestureEnd && _addListener3(ownerDoc, "gestureend", _onGestureEnd);
          onHover && _addListener3(target, _pointerType + "enter", _onHover);
          onHoverEnd && _addListener3(target, _pointerType + "leave", _onHoverEnd);
          onMove && _addListener3(target, _pointerType + "move", _onMove3);
        }
        self.isEnabled = true;
        self.isDragging = self.isGesturing = self.isPressed = moved = dragged = false;
        self._vx.reset();
        self._vy.reset();
        scrollX = scrollFuncX();
        scrollY = scrollFuncY();
        e && e.type && _onPress3(e);
        onEnable && onEnable(self);
      }
      return self;
    };
    self.disable = function() {
      if (self.isEnabled) {
        _observers.filter(function(o) {
          return o !== self && _isViewport(o.target);
        }).length || _removeListener3(isViewport ? ownerDoc : target, "scroll", _onScroll);
        if (self.isPressed) {
          self._vx.reset();
          self._vy.reset();
          _removeListener3(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
        }
        _removeListener3(isViewport ? ownerDoc : target, "scroll", onScroll, capture);
        _removeListener3(target, "wheel", _onWheel, capture);
        _removeListener3(target, _eventTypes[0], _onPress3, capture);
        _removeListener3(ownerDoc, _eventTypes[2], _onRelease3);
        _removeListener3(ownerDoc, _eventTypes[3], _onRelease3);
        _removeListener3(target, "click", clickCapture, true);
        _removeListener3(target, "click", _onClick);
        _removeListener3(ownerDoc, "gesturestart", _onGestureStart);
        _removeListener3(ownerDoc, "gestureend", _onGestureEnd);
        _removeListener3(target, _pointerType + "enter", _onHover);
        _removeListener3(target, _pointerType + "leave", _onHoverEnd);
        _removeListener3(target, _pointerType + "move", _onMove3);
        self.isEnabled = self.isPressed = self.isDragging = false;
        onDisable && onDisable(self);
      }
    };
    self.kill = self.revert = function() {
      self.disable();
      var i2 = _observers.indexOf(self);
      i2 >= 0 && _observers.splice(i2, 1);
      _normalizer === self && (_normalizer = 0);
    };
    _observers.push(self);
    isNormalizer && _isViewport(target) && (_normalizer = self);
    self.enable(event);
  };
  _createClass(Observer2, [{
    key: "velocityX",
    get: function get() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function get() {
      return this._vy.getVelocity();
    }
  }]);
  return Observer2;
}();
Observer.version = "3.13.0";
Observer.create = function(vars) {
  return new Observer(vars);
};
Observer.register = _initCore11;
Observer.getAll = function() {
  return _observers.slice();
};
Observer.getById = function(id) {
  return _observers.filter(function(o) {
    return o.vars.id === id;
  })[0];
};
_getGSAP13() && gsap9.registerPlugin(Observer);

// node_modules/gsap/PixiPlugin.js
var gsap10;
var _splitColor;
var _coreInitted7;
var _PIXI;
var PropTween2;
var _getSetter;
var _isV4;
var _isV8Plus;
var _windowExists7 = function _windowExists8() {
  return typeof window !== "undefined";
};
var _getGSAP15 = function _getGSAP16() {
  return gsap10 || _windowExists7() && (gsap10 = window.gsap) && gsap10.registerPlugin && gsap10;
};
var _isFunction3 = function _isFunction4(value) {
  return typeof value === "function";
};
var _warn3 = function _warn4(message) {
  return console.warn(message);
};
var _idMatrix2 = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
var _lumR2 = 0.212671;
var _lumG2 = 0.71516;
var _lumB2 = 0.072169;
var _filterClass = function _filterClass2(name) {
  return _isFunction3(_PIXI[name]) ? _PIXI[name] : _PIXI.filters[name];
};
var _applyMatrix3 = function _applyMatrix4(m, m2) {
  var temp = [], i2 = 0, z = 0, y, x;
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 5; x++) {
      z = x === 4 ? m[i2 + 4] : 0;
      temp[i2 + x] = m[i2] * m2[x] + m[i2 + 1] * m2[x + 5] + m[i2 + 2] * m2[x + 10] + m[i2 + 3] * m2[x + 15] + z;
    }
    i2 += 5;
  }
  return temp;
};
var _setSaturation3 = function _setSaturation4(m, n) {
  var inv = 1 - n, r = inv * _lumR2, g = inv * _lumG2, b = inv * _lumB2;
  return _applyMatrix3([r + n, g, b, 0, 0, r, g + n, b, 0, 0, r, g, b + n, 0, 0, 0, 0, 0, 1, 0], m);
};
var _colorize3 = function _colorize4(m, color, amount) {
  var c = _splitColor(color), r = c[0] / 255, g = c[1] / 255, b = c[2] / 255, inv = 1 - amount;
  return _applyMatrix3([inv + amount * r * _lumR2, amount * r * _lumG2, amount * r * _lumB2, 0, 0, amount * g * _lumR2, inv + amount * g * _lumG2, amount * g * _lumB2, 0, 0, amount * b * _lumR2, amount * b * _lumG2, inv + amount * b * _lumB2, 0, 0, 0, 0, 0, 1, 0], m);
};
var _setHue3 = function _setHue4(m, n) {
  n *= Math.PI / 180;
  var c = Math.cos(n), s = Math.sin(n);
  return _applyMatrix3([_lumR2 + c * (1 - _lumR2) + s * -_lumR2, _lumG2 + c * -_lumG2 + s * -_lumG2, _lumB2 + c * -_lumB2 + s * (1 - _lumB2), 0, 0, _lumR2 + c * -_lumR2 + s * 0.143, _lumG2 + c * (1 - _lumG2) + s * 0.14, _lumB2 + c * -_lumB2 + s * -0.283, 0, 0, _lumR2 + c * -_lumR2 + s * -(1 - _lumR2), _lumG2 + c * -_lumG2 + s * _lumG2, _lumB2 + c * (1 - _lumB2) + s * _lumB2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], m);
};
var _setContrast3 = function _setContrast4(m, n) {
  return _applyMatrix3([n, 0, 0, 0, 0.5 * (1 - n), 0, n, 0, 0, 0.5 * (1 - n), 0, 0, n, 0, 0.5 * (1 - n), 0, 0, 0, 1, 0], m);
};
var _getFilter = function _getFilter2(target, type) {
  var filterClass = _filterClass(type), filters = target.filters || [], i2 = filters.length, filter;
  filterClass || _warn3(type + " not found. PixiPlugin.registerPIXI(PIXI)");
  while (--i2 > -1) {
    if (filters[i2] instanceof filterClass) {
      return filters[i2];
    }
  }
  filter = new filterClass();
  if (type === "BlurFilter") {
    if (_isV8Plus) {
      filter.strength = 0;
    } else {
      filter.blur = 0;
    }
  }
  target.filters = [].concat(filters, [filter]);
  return filter;
};
var _addColorMatrixFilterCacheTween = function _addColorMatrixFilterCacheTween2(p2, plugin, cache, vars) {
  plugin.add(cache, p2, cache[p2], vars[p2]);
  plugin._props.push(p2);
};
var _applyBrightnessToMatrix = function _applyBrightnessToMatrix2(brightness, matrix) {
  var filterClass = _filterClass("ColorMatrixFilter"), temp = new filterClass();
  temp.matrix = matrix;
  temp.brightness(brightness, true);
  return temp.matrix;
};
var _copy5 = function _copy6(obj) {
  var copy = {}, p2;
  for (p2 in obj) {
    copy[p2] = obj[p2];
  }
  return copy;
};
var _CMFdefaults = {
  contrast: 1,
  saturation: 1,
  colorizeAmount: 0,
  colorize: "rgb(255,255,255)",
  hue: 0,
  brightness: 1
};
var _parseColorMatrixFilter3 = function _parseColorMatrixFilter4(target, v, pg) {
  var filter = _getFilter(target, "ColorMatrixFilter"), cache = target._gsColorMatrixFilter = target._gsColorMatrixFilter || _copy5(_CMFdefaults), combine = v.combineCMF && !("colorMatrixFilter" in v && !v.colorMatrixFilter), i2, matrix, startMatrix;
  startMatrix = filter.matrix;
  if (v.resolution) {
    filter.resolution = v.resolution;
  }
  if (v.matrix && v.matrix.length === startMatrix.length) {
    matrix = v.matrix;
    if (cache.contrast !== 1) {
      _addColorMatrixFilterCacheTween("contrast", pg, cache, _CMFdefaults);
    }
    if (cache.hue) {
      _addColorMatrixFilterCacheTween("hue", pg, cache, _CMFdefaults);
    }
    if (cache.brightness !== 1) {
      _addColorMatrixFilterCacheTween("brightness", pg, cache, _CMFdefaults);
    }
    if (cache.colorizeAmount) {
      _addColorMatrixFilterCacheTween("colorize", pg, cache, _CMFdefaults);
      _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, _CMFdefaults);
    }
    if (cache.saturation !== 1) {
      _addColorMatrixFilterCacheTween("saturation", pg, cache, _CMFdefaults);
    }
  } else {
    matrix = _idMatrix2.slice();
    if (v.contrast != null) {
      matrix = _setContrast3(matrix, +v.contrast);
      _addColorMatrixFilterCacheTween("contrast", pg, cache, v);
    } else if (cache.contrast !== 1) {
      if (combine) {
        matrix = _setContrast3(matrix, cache.contrast);
      } else {
        _addColorMatrixFilterCacheTween("contrast", pg, cache, _CMFdefaults);
      }
    }
    if (v.hue != null) {
      matrix = _setHue3(matrix, +v.hue);
      _addColorMatrixFilterCacheTween("hue", pg, cache, v);
    } else if (cache.hue) {
      if (combine) {
        matrix = _setHue3(matrix, cache.hue);
      } else {
        _addColorMatrixFilterCacheTween("hue", pg, cache, _CMFdefaults);
      }
    }
    if (v.brightness != null) {
      matrix = _applyBrightnessToMatrix(+v.brightness, matrix);
      _addColorMatrixFilterCacheTween("brightness", pg, cache, v);
    } else if (cache.brightness !== 1) {
      if (combine) {
        matrix = _applyBrightnessToMatrix(cache.brightness, matrix);
      } else {
        _addColorMatrixFilterCacheTween("brightness", pg, cache, _CMFdefaults);
      }
    }
    if (v.colorize != null) {
      v.colorizeAmount = "colorizeAmount" in v ? +v.colorizeAmount : 1;
      matrix = _colorize3(matrix, v.colorize, v.colorizeAmount);
      _addColorMatrixFilterCacheTween("colorize", pg, cache, v);
      _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, v);
    } else if (cache.colorizeAmount) {
      if (combine) {
        matrix = _colorize3(matrix, cache.colorize, cache.colorizeAmount);
      } else {
        _addColorMatrixFilterCacheTween("colorize", pg, cache, _CMFdefaults);
        _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, _CMFdefaults);
      }
    }
    if (v.saturation != null) {
      matrix = _setSaturation3(matrix, +v.saturation);
      _addColorMatrixFilterCacheTween("saturation", pg, cache, v);
    } else if (cache.saturation !== 1) {
      if (combine) {
        matrix = _setSaturation3(matrix, cache.saturation);
      } else {
        _addColorMatrixFilterCacheTween("saturation", pg, cache, _CMFdefaults);
      }
    }
  }
  i2 = matrix.length;
  while (--i2 > -1) {
    if (matrix[i2] !== startMatrix[i2]) {
      pg.add(startMatrix, i2, startMatrix[i2], matrix[i2], "colorMatrixFilter");
    }
  }
  pg._props.push("colorMatrixFilter");
};
var _renderColor = function _renderColor2(ratio, _ref) {
  var t = _ref.t, p2 = _ref.p, color = _ref.color, set = _ref.set;
  set(t, p2, color[0] << 16 | color[1] << 8 | color[2]);
};
var _renderDirtyCache = function _renderDirtyCache2(ratio, _ref2) {
  var g = _ref2.g;
  if (_isV8Plus) {
    g.fill();
    g.stroke();
  } else if (g) {
    g.dirty++;
    g.clearDirty++;
  }
};
var _renderAutoAlpha = function _renderAutoAlpha2(ratio, data) {
  data.t.visible = !!data.t.alpha;
};
var _addColorTween = function _addColorTween2(target, p2, value, plugin) {
  var currentValue = target[p2], startColor = _splitColor(_isFunction3(currentValue) ? target[p2.indexOf("set") || !_isFunction3(target["get" + p2.substr(3)]) ? p2 : "get" + p2.substr(3)]() : currentValue), endColor = _splitColor(value);
  plugin._pt = new PropTween2(plugin._pt, target, p2, 0, 0, _renderColor, {
    t: target,
    p: p2,
    color: startColor,
    set: _getSetter(target, p2)
  });
  plugin.add(startColor, 0, startColor[0], endColor[0]);
  plugin.add(startColor, 1, startColor[1], endColor[1]);
  plugin.add(startColor, 2, startColor[2], endColor[2]);
};
var _colorProps2 = {
  tint: 1,
  lineColor: 1,
  fillColor: 1,
  strokeColor: 1
};
var _xyContexts = "position,scale,skew,pivot,anchor,tilePosition,tileScale".split(",");
var _contexts = {
  x: "position",
  y: "position",
  tileX: "tilePosition",
  tileY: "tilePosition"
};
var _colorMatrixFilterProps = {
  colorMatrixFilter: 1,
  saturation: 1,
  contrast: 1,
  hue: 1,
  colorize: 1,
  colorizeAmount: 1,
  brightness: 1,
  combineCMF: 1
};
var _DEG2RAD4 = Math.PI / 180;
var _isString3 = function _isString4(value) {
  return typeof value === "string";
};
var _degreesToRadians = function _degreesToRadians2(value) {
  return _isString3(value) && value.charAt(1) === "=" ? value.substr(0, 2) + parseFloat(value.substr(2)) * _DEG2RAD4 : value * _DEG2RAD4;
};
var _renderPropWithEnd = function _renderPropWithEnd2(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 1e5) / 1e5, data);
};
var _addRotationalPropTween = function _addRotationalPropTween2(plugin, target, property, startNum, endValue, radians) {
  var cap = 360 * (radians ? _DEG2RAD4 : 1), isString = _isString3(endValue), relative = isString && endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0, endNum = parseFloat(relative ? endValue.substr(2) : endValue) * (radians ? _DEG2RAD4 : 1), change = relative ? endNum * relative : endNum - startNum, finalValue = startNum + change, direction, pt;
  if (isString) {
    direction = endValue.split("_")[1];
    if (direction === "short") {
      change %= cap;
      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }
    if (direction === "cw" && change < 0) {
      change = (change + cap * 1e10) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * 1e10) % cap - ~~(change / cap) * cap;
    }
  }
  plugin._pt = pt = new PropTween2(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  return pt;
};
var _initCore13 = function _initCore14() {
  if (!_coreInitted7) {
    gsap10 = _getGSAP15();
    _PIXI = _coreInitted7 = _PIXI || _windowExists7() && window.PIXI;
    var version = _PIXI && _PIXI.VERSION && parseFloat(_PIXI.VERSION.split(".")[0]) || 0;
    _isV4 = version === 4;
    _isV8Plus = version >= 8;
    _splitColor = function _splitColor2(color) {
      return gsap10.utils.splitColor((color + "").substr(0, 2) === "0x" ? "#" + color.substr(2) : color);
    };
  }
};
var i;
var p;
for (i = 0; i < _xyContexts.length; i++) {
  p = _xyContexts[i];
  _contexts[p + "X"] = p;
  _contexts[p + "Y"] = p;
}
var PixiPlugin = {
  version: "3.13.0",
  name: "pixi",
  register: function register2(core, Plugin, propTween) {
    gsap10 = core;
    PropTween2 = propTween;
    _getSetter = Plugin.getSetter;
    _initCore13();
  },
  headless: true,
  // doesn't need window
  registerPIXI: function registerPIXI(pixi) {
    _PIXI = pixi;
  },
  init: function init4(target, values, tween, index, targets) {
    _PIXI || _initCore13();
    if (!_PIXI) {
      _warn3("PIXI was not found. PixiPlugin.registerPIXI(PIXI);");
      return false;
    }
    var context, axis, value, colorMatrix, filter, p2, padding, i2, data, subProp;
    for (p2 in values) {
      context = _contexts[p2];
      value = values[p2];
      if (context) {
        axis = ~p2.charAt(p2.length - 1).toLowerCase().indexOf("x") ? "x" : "y";
        this.add(target[context], axis, target[context][axis], context === "skew" ? _degreesToRadians(value) : value, 0, 0, 0, 0, 0, 1);
      } else if (p2 === "scale" || p2 === "anchor" || p2 === "pivot" || p2 === "tileScale") {
        this.add(target[p2], "x", target[p2].x, value);
        this.add(target[p2], "y", target[p2].y, value);
      } else if (p2 === "rotation" || p2 === "angle") {
        _addRotationalPropTween(this, target, p2, target[p2], value, p2 === "rotation");
      } else if (_colorMatrixFilterProps[p2]) {
        if (!colorMatrix) {
          _parseColorMatrixFilter3(target, values.colorMatrixFilter || values, this);
          colorMatrix = true;
        }
      } else if (p2 === "blur" || p2 === "blurX" || p2 === "blurY" || p2 === "blurPadding") {
        filter = _getFilter(target, "BlurFilter");
        this.add(filter, p2, filter[p2], value);
        if (values.blurPadding !== 0) {
          padding = values.blurPadding || Math.max(filter[p2], value) * 2;
          i2 = target.filters.length;
          while (--i2 > -1) {
            target.filters[i2].padding = Math.max(target.filters[i2].padding, padding);
          }
        }
      } else if (_colorProps2[p2]) {
        if ((p2 === "lineColor" || p2 === "fillColor" || p2 === "strokeColor") && target instanceof _PIXI.Graphics) {
          data = "fillStyle" in target ? [target] : (target.geometry || target).graphicsData;
          subProp = p2.substr(0, p2.length - 5);
          _isV8Plus && subProp === "line" && (subProp = "stroke");
          this._pt = new PropTween2(this._pt, target, p2, 0, 0, _renderDirtyCache, {
            g: target.geometry || target
          });
          i2 = data.length;
          while (--i2 > -1) {
            _addColorTween(_isV4 ? data[i2] : data[i2][subProp + "Style"], _isV4 ? p2 : "color", value, this);
          }
        } else {
          _addColorTween(target, p2, value, this);
        }
      } else if (p2 === "autoAlpha") {
        this._pt = new PropTween2(this._pt, target, "visible", 0, 0, _renderAutoAlpha);
        this.add(target, "alpha", target.alpha, value);
        this._props.push("alpha", "visible");
      } else if (p2 !== "resolution") {
        this.add(target, p2, "get", value);
      }
      this._props.push(p2);
    }
  }
};
_getGSAP15() && gsap10.registerPlugin(PixiPlugin);

// node_modules/gsap/ScrollToPlugin.js
var gsap11;
var _coreInitted8;
var _window;
var _docEl2;
var _body5;
var _toArray4;
var _config;
var ScrollTrigger2;
var _windowExists9 = function _windowExists10() {
  return typeof window !== "undefined";
};
var _getGSAP17 = function _getGSAP18() {
  return gsap11 || _windowExists9() && (gsap11 = window.gsap) && gsap11.registerPlugin && gsap11;
};
var _isString5 = function _isString6(value) {
  return typeof value === "string";
};
var _isFunction5 = function _isFunction6(value) {
  return typeof value === "function";
};
var _max = function _max2(element, axis) {
  var dim = axis === "x" ? "Width" : "Height", scroll = "scroll" + dim, client = "client" + dim;
  return element === _window || element === _docEl2 || element === _body5 ? Math.max(_docEl2[scroll], _body5[scroll]) - (_window["inner" + dim] || _docEl2[client] || _body5[client]) : element[scroll] - element["offset" + dim];
};
var _buildGetter = function _buildGetter2(e, axis) {
  var p2 = "scroll" + (axis === "x" ? "Left" : "Top");
  if (e === _window) {
    if (e.pageXOffset != null) {
      p2 = "page" + axis.toUpperCase() + "Offset";
    } else {
      e = _docEl2[p2] != null ? _docEl2 : _body5;
    }
  }
  return function() {
    return e[p2];
  };
};
var _clean = function _clean2(value, index, target, targets) {
  _isFunction5(value) && (value = value(index, target, targets));
  if (typeof value !== "object") {
    return _isString5(value) && value !== "max" && value.charAt(1) !== "=" ? {
      x: value,
      y: value
    } : {
      y: value
    };
  } else if (value.nodeType) {
    return {
      y: value,
      x: value
    };
  } else {
    var result = {}, p2;
    for (p2 in value) {
      result[p2] = p2 !== "onAutoKill" && _isFunction5(value[p2]) ? value[p2](index, target, targets) : value[p2];
    }
    return result;
  }
};
var _getOffset = function _getOffset2(element, container) {
  element = _toArray4(element)[0];
  if (!element || !element.getBoundingClientRect) {
    return console.warn("scrollTo target doesn't exist. Using 0") || {
      x: 0,
      y: 0
    };
  }
  var rect = element.getBoundingClientRect(), isRoot = !container || container === _window || container === _body5, cRect = isRoot ? {
    top: _docEl2.clientTop - (_window.pageYOffset || _docEl2.scrollTop || _body5.scrollTop || 0),
    left: _docEl2.clientLeft - (_window.pageXOffset || _docEl2.scrollLeft || _body5.scrollLeft || 0)
  } : container.getBoundingClientRect(), offsets = {
    x: rect.left - cRect.left,
    y: rect.top - cRect.top
  };
  if (!isRoot && container) {
    offsets.x += _buildGetter(container, "x")();
    offsets.y += _buildGetter(container, "y")();
  }
  return offsets;
};
var _parseVal = function _parseVal2(value, target, axis, currentVal, offset) {
  return !isNaN(value) && typeof value !== "object" ? parseFloat(value) - offset : _isString5(value) && value.charAt(1) === "=" ? parseFloat(value.substr(2)) * (value.charAt(0) === "-" ? -1 : 1) + currentVal - offset : value === "max" ? _max(target, axis) - offset : Math.min(_max(target, axis), _getOffset(value, target)[axis] - offset);
};
var _initCore15 = function _initCore16() {
  gsap11 = _getGSAP17();
  if (_windowExists9() && gsap11 && typeof document !== "undefined" && document.body) {
    _window = window;
    _body5 = document.body;
    _docEl2 = document.documentElement;
    _toArray4 = gsap11.utils.toArray;
    gsap11.config({
      autoKillThreshold: 7
    });
    _config = gsap11.config();
    _coreInitted8 = 1;
  }
};
var ScrollToPlugin = {
  version: "3.13.0",
  name: "scrollTo",
  rawVars: 1,
  register: function register3(core) {
    gsap11 = core;
    _initCore15();
  },
  init: function init5(target, value, tween, index, targets) {
    _coreInitted8 || _initCore15();
    var data = this, snapType = gsap11.getProperty(target, "scrollSnapType");
    data.isWin = target === _window;
    data.target = target;
    data.tween = tween;
    value = _clean(value, index, target, targets);
    data.vars = value;
    data.autoKill = !!("autoKill" in value ? value : _config).autoKill;
    data.getX = _buildGetter(target, "x");
    data.getY = _buildGetter(target, "y");
    data.x = data.xPrev = data.getX();
    data.y = data.yPrev = data.getY();
    ScrollTrigger2 || (ScrollTrigger2 = gsap11.core.globals().ScrollTrigger);
    gsap11.getProperty(target, "scrollBehavior") === "smooth" && gsap11.set(target, {
      scrollBehavior: "auto"
    });
    if (snapType && snapType !== "none") {
      data.snap = 1;
      data.snapInline = target.style.scrollSnapType;
      target.style.scrollSnapType = "none";
    }
    if (value.x != null) {
      data.add(data, "x", data.x, _parseVal(value.x, target, "x", data.x, value.offsetX || 0), index, targets);
      data._props.push("scrollTo_x");
    } else {
      data.skipX = 1;
    }
    if (value.y != null) {
      data.add(data, "y", data.y, _parseVal(value.y, target, "y", data.y, value.offsetY || 0), index, targets);
      data._props.push("scrollTo_y");
    } else {
      data.skipY = 1;
    }
  },
  render: function render4(ratio, data) {
    var pt = data._pt, target = data.target, tween = data.tween, autoKill = data.autoKill, xPrev = data.xPrev, yPrev = data.yPrev, isWin = data.isWin, snap2 = data.snap, snapInline = data.snapInline, x, y, yDif, xDif, threshold;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
    x = isWin || !data.skipX ? data.getX() : xPrev;
    y = isWin || !data.skipY ? data.getY() : yPrev;
    yDif = y - yPrev;
    xDif = x - xPrev;
    threshold = _config.autoKillThreshold;
    if (data.x < 0) {
      data.x = 0;
    }
    if (data.y < 0) {
      data.y = 0;
    }
    if (autoKill) {
      if (!data.skipX && (xDif > threshold || xDif < -threshold) && x < _max(target, "x")) {
        data.skipX = 1;
      }
      if (!data.skipY && (yDif > threshold || yDif < -threshold) && y < _max(target, "y")) {
        data.skipY = 1;
      }
      if (data.skipX && data.skipY) {
        tween.kill();
        data.vars.onAutoKill && data.vars.onAutoKill.apply(tween, data.vars.onAutoKillParams || []);
      }
    }
    if (isWin) {
      _window.scrollTo(!data.skipX ? data.x : x, !data.skipY ? data.y : y);
    } else {
      data.skipY || (target.scrollTop = data.y);
      data.skipX || (target.scrollLeft = data.x);
    }
    if (snap2 && (ratio === 1 || ratio === 0)) {
      y = target.scrollTop;
      x = target.scrollLeft;
      snapInline ? target.style.scrollSnapType = snapInline : target.style.removeProperty("scroll-snap-type");
      target.scrollTop = y + 1;
      target.scrollLeft = x + 1;
      target.scrollTop = y;
      target.scrollLeft = x;
    }
    data.xPrev = data.x;
    data.yPrev = data.y;
    ScrollTrigger2 && ScrollTrigger2.update();
  },
  kill: function kill(property) {
    var both = property === "scrollTo", i2 = this._props.indexOf(property);
    if (both || property === "scrollTo_x") {
      this.skipX = 1;
    }
    if (both || property === "scrollTo_y") {
      this.skipY = 1;
    }
    i2 > -1 && this._props.splice(i2, 1);
    return !this._props.length;
  }
};
ScrollToPlugin.max = _max;
ScrollToPlugin.getOffset = _getOffset;
ScrollToPlugin.buildGetter = _buildGetter;
ScrollToPlugin.config = function(vars) {
  _config || _initCore15() || (_config = gsap11.config());
  for (var p2 in vars) {
    _config[p2] = vars[p2];
  }
};
_getGSAP17() && gsap11.registerPlugin(ScrollToPlugin);

// node_modules/gsap/ScrollTrigger.js
var gsap12;
var _coreInitted9;
var _win6;
var _doc5;
var _docEl3;
var _body6;
var _root2;
var _resizeDelay;
var _toArray5;
var _clamp2;
var _time2;
var _syncInterval;
var _refreshing;
var _pointerIsDown;
var _transformProp3;
var _i;
var _prevWidth;
var _prevHeight;
var _autoRefresh;
var _sort;
var _suppressOverwrites;
var _ignoreResize;
var _normalizer2;
var _ignoreMobileResize;
var _baseScreenHeight;
var _baseScreenWidth;
var _fixIOSBug;
var _context3;
var _scrollRestoration;
var _div100vh;
var _100vh;
var _isReverted;
var _clampingMax;
var _limitCallbacks;
var _startup2 = 1;
var _getTime3 = Date.now;
var _time1 = _getTime3();
var _lastScrollTime = 0;
var _enabled = 0;
var _parseClamp = function _parseClamp2(value, type, self) {
  var clamp2 = _isString7(value) && (value.substr(0, 6) === "clamp(" || value.indexOf("max") > -1);
  self["_" + type + "Clamp"] = clamp2;
  return clamp2 ? value.substr(6, value.length - 7) : value;
};
var _keepClamp = function _keepClamp2(value, clamp2) {
  return clamp2 && (!_isString7(value) || value.substr(0, 6) !== "clamp(") ? "clamp(" + value + ")" : value;
};
var _rafBugFix = function _rafBugFix2() {
  return _enabled && requestAnimationFrame(_rafBugFix2);
};
var _pointerDownHandler = function _pointerDownHandler2() {
  return _pointerIsDown = 1;
};
var _pointerUpHandler = function _pointerUpHandler2() {
  return _pointerIsDown = 0;
};
var _passThrough = function _passThrough2(v) {
  return v;
};
var _round9 = function _round10(value) {
  return Math.round(value * 1e5) / 1e5 || 0;
};
var _windowExists11 = function _windowExists12() {
  return typeof window !== "undefined";
};
var _getGSAP19 = function _getGSAP20() {
  return gsap12 || _windowExists11() && (gsap12 = window.gsap) && gsap12.registerPlugin && gsap12;
};
var _isViewport3 = function _isViewport4(e) {
  return !!~_root2.indexOf(e);
};
var _getViewportDimension = function _getViewportDimension2(dimensionProperty) {
  return (dimensionProperty === "Height" ? _100vh : _win6["inner" + dimensionProperty]) || _docEl3["client" + dimensionProperty] || _body6["client" + dimensionProperty];
};
var _getBoundsFunc = function _getBoundsFunc2(element) {
  return _getProxyProp(element, "getBoundingClientRect") || (_isViewport3(element) ? function() {
    _winOffsets.width = _win6.innerWidth;
    _winOffsets.height = _100vh;
    return _winOffsets;
  } : function() {
    return _getBounds3(element);
  });
};
var _getSizeFunc = function _getSizeFunc2(scroller, isViewport, _ref) {
  var d = _ref.d, d2 = _ref.d2, a = _ref.a;
  return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function() {
    return a()[d];
  } : function() {
    return (isViewport ? _getViewportDimension(d2) : scroller["client" + d2]) || 0;
  };
};
var _getOffsetsFunc = function _getOffsetsFunc2(element, isViewport) {
  return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function() {
    return _winOffsets;
  };
};
var _maxScroll = function _maxScroll2(element, _ref2) {
  var s = _ref2.s, d2 = _ref2.d2, d = _ref2.d, a = _ref2.a;
  return Math.max(0, (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport3(element) ? (_docEl3[s] || _body6[s]) - _getViewportDimension(d2) : element[s] - element["offset" + d2]);
};
var _iterateAutoRefresh = function _iterateAutoRefresh2(func, events) {
  for (var i2 = 0; i2 < _autoRefresh.length; i2 += 3) {
    (!events || ~events.indexOf(_autoRefresh[i2 + 1])) && func(_autoRefresh[i2], _autoRefresh[i2 + 1], _autoRefresh[i2 + 2]);
  }
};
var _isString7 = function _isString8(value) {
  return typeof value === "string";
};
var _isFunction7 = function _isFunction8(value) {
  return typeof value === "function";
};
var _isNumber3 = function _isNumber4(value) {
  return typeof value === "number";
};
var _isObject3 = function _isObject4(value) {
  return typeof value === "object";
};
var _endAnimation = function _endAnimation2(animation, reversed, pause) {
  return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
};
var _callback = function _callback2(self, func) {
  if (self.enabled) {
    var result = self._ctx ? self._ctx.add(function() {
      return func(self);
    }) : func(self);
    result && result.totalTime && (self.callbackAnimation = result);
  }
};
var _abs2 = Math.abs;
var _left = "left";
var _top = "top";
var _right = "right";
var _bottom = "bottom";
var _width = "width";
var _height = "height";
var _Right = "Right";
var _Left = "Left";
var _Top = "Top";
var _Bottom = "Bottom";
var _padding = "padding";
var _margin = "margin";
var _Width = "Width";
var _Height = "Height";
var _px = "px";
var _getComputedStyle3 = function _getComputedStyle4(element) {
  return _win6.getComputedStyle(element);
};
var _makePositionable = function _makePositionable2(element) {
  var position = _getComputedStyle3(element).position;
  element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
};
var _setDefaults3 = function _setDefaults4(obj, defaults) {
  for (var p2 in defaults) {
    p2 in obj || (obj[p2] = defaults[p2]);
  }
  return obj;
};
var _getBounds3 = function _getBounds4(element, withoutTransforms) {
  var tween = withoutTransforms && _getComputedStyle3(element)[_transformProp3] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap12.to(element, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), bounds = element.getBoundingClientRect();
  tween && tween.progress(0).kill();
  return bounds;
};
var _getSize = function _getSize2(element, _ref3) {
  var d2 = _ref3.d2;
  return element["offset" + d2] || element["client" + d2] || 0;
};
var _getLabelRatioArray = function _getLabelRatioArray2(timeline) {
  var a = [], labels = timeline.labels, duration = timeline.duration(), p2;
  for (p2 in labels) {
    a.push(labels[p2] / duration);
  }
  return a;
};
var _getClosestLabel = function _getClosestLabel2(animation) {
  return function(value) {
    return gsap12.utils.snap(_getLabelRatioArray(animation), value);
  };
};
var _snapDirectional = function _snapDirectional2(snapIncrementOrArray) {
  var snap2 = gsap12.utils.snap(snapIncrementOrArray), a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function(a2, b) {
    return a2 - b;
  });
  return a ? function(value, direction, threshold) {
    if (threshold === void 0) {
      threshold = 1e-3;
    }
    var i2;
    if (!direction) {
      return snap2(value);
    }
    if (direction > 0) {
      value -= threshold;
      for (i2 = 0; i2 < a.length; i2++) {
        if (a[i2] >= value) {
          return a[i2];
        }
      }
      return a[i2 - 1];
    } else {
      i2 = a.length;
      value += threshold;
      while (i2--) {
        if (a[i2] <= value) {
          return a[i2];
        }
      }
    }
    return a[0];
  } : function(value, direction, threshold) {
    if (threshold === void 0) {
      threshold = 1e-3;
    }
    var snapped = snap2(value);
    return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap2(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
  };
};
var _getLabelAtDirection = function _getLabelAtDirection2(timeline) {
  return function(value, st) {
    return _snapDirectional(_getLabelRatioArray(timeline))(value, st.direction);
  };
};
var _multiListener = function _multiListener2(func, element, types, callback) {
  return types.split(",").forEach(function(type) {
    return func(element, type, callback);
  });
};
var _addListener5 = function _addListener6(element, type, func, nonPassive, capture) {
  return element.addEventListener(type, func, {
    passive: !nonPassive,
    capture: !!capture
  });
};
var _removeListener5 = function _removeListener6(element, type, func, capture) {
  return element.removeEventListener(type, func, !!capture);
};
var _wheelListener = function _wheelListener2(func, el, scrollFunc) {
  scrollFunc = scrollFunc && scrollFunc.wheelHandler;
  if (scrollFunc) {
    func(el, "wheel", scrollFunc);
    func(el, "touchmove", scrollFunc);
  }
};
var _markerDefaults = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
};
var _defaults = {
  toggleActions: "play",
  anticipatePin: 0
};
var _keywords = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
};
var _offsetToPx = function _offsetToPx2(value, size) {
  if (_isString7(value)) {
    var eqIndex = value.indexOf("="), relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;
    if (~eqIndex) {
      value.indexOf("%") > eqIndex && (relative *= size / 100);
      value = value.substr(0, eqIndex - 1);
    }
    value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
  }
  return value;
};
var _createMarker = function _createMarker2(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
  var startColor = _ref4.startColor, endColor = _ref4.endColor, fontSize = _ref4.fontSize, indent = _ref4.indent, fontWeight = _ref4.fontWeight;
  var e = _doc5.createElement("div"), useFixedPosition = _isViewport3(container) || _getProxyProp(container, "pinType") === "fixed", isScroller = type.indexOf("scroller") !== -1, parent = useFixedPosition ? _body6 : container, isStart = type.indexOf("start") !== -1, color = isStart ? startColor : endColor, css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
  (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
  matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
  e._isStart = isStart;
  e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
  e.style.cssText = css;
  e.innerText = name || name === 0 ? type + "-" + name : type;
  parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
  e._offset = e["offset" + direction.op.d2];
  _positionMarker(e, 0, direction, isStart);
  return e;
};
var _positionMarker = function _positionMarker2(marker, start, direction, flipped) {
  var vars = {
    display: "block"
  }, side = direction[flipped ? "os2" : "p2"], oppositeSide = direction[flipped ? "p2" : "os2"];
  marker._isFlipped = flipped;
  vars[direction.a + "Percent"] = flipped ? -100 : 0;
  vars[direction.a] = flipped ? "1px" : 0;
  vars["border" + side + _Width] = 1;
  vars["border" + oppositeSide + _Width] = 0;
  vars[direction.p] = start + "px";
  gsap12.set(marker, vars);
};
var _triggers = [];
var _ids = {};
var _rafID;
var _sync = function _sync2() {
  return _getTime3() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)));
};
var _onScroll3 = function _onScroll4() {
  if (!_normalizer2 || !_normalizer2.isPressed || _normalizer2.startX > _body6.clientWidth) {
    _scrollers.cache++;
    if (_normalizer2) {
      _rafID || (_rafID = requestAnimationFrame(_updateAll));
    } else {
      _updateAll();
    }
    _lastScrollTime || _dispatch("scrollStart");
    _lastScrollTime = _getTime3();
  }
};
var _setBaseDimensions = function _setBaseDimensions2() {
  _baseScreenWidth = _win6.innerWidth;
  _baseScreenHeight = _win6.innerHeight;
};
var _onResize = function _onResize2(force) {
  _scrollers.cache++;
  (force === true || !_refreshing && !_ignoreResize && !_doc5.fullscreenElement && !_doc5.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win6.innerWidth || Math.abs(_win6.innerHeight - _baseScreenHeight) > _win6.innerHeight * 0.25)) && _resizeDelay.restart(true);
};
var _listeners = {};
var _emptyArray = [];
var _softRefresh = function _softRefresh2() {
  return _removeListener5(ScrollTrigger3, "scrollEnd", _softRefresh2) || _refreshAll(true);
};
var _dispatch = function _dispatch2(type) {
  return _listeners[type] && _listeners[type].map(function(f) {
    return f();
  }) || _emptyArray;
};
var _savedStyles = [];
var _revertRecorded = function _revertRecorded2(media) {
  for (var i2 = 0; i2 < _savedStyles.length; i2 += 5) {
    if (!media || _savedStyles[i2 + 4] && _savedStyles[i2 + 4].query === media) {
      _savedStyles[i2].style.cssText = _savedStyles[i2 + 1];
      _savedStyles[i2].getBBox && _savedStyles[i2].setAttribute("transform", _savedStyles[i2 + 2] || "");
      _savedStyles[i2 + 3].uncache = 1;
    }
  }
};
var _revertAll = function _revertAll2(kill5, media) {
  var trigger;
  for (_i = 0; _i < _triggers.length; _i++) {
    trigger = _triggers[_i];
    if (trigger && (!media || trigger._ctx === media)) {
      if (kill5) {
        trigger.kill(1);
      } else {
        trigger.revert(true, true);
      }
    }
  }
  _isReverted = true;
  media && _revertRecorded(media);
  media || _dispatch("revert");
};
var _clearScrollMemory = function _clearScrollMemory2(scrollRestoration, force) {
  _scrollers.cache++;
  (force || !_refreshingAll) && _scrollers.forEach(function(obj) {
    return _isFunction7(obj) && obj.cacheID++ && (obj.rec = 0);
  });
  _isString7(scrollRestoration) && (_win6.history.scrollRestoration = _scrollRestoration = scrollRestoration);
};
var _refreshingAll;
var _refreshID = 0;
var _queueRefreshID;
var _queueRefreshAll = function _queueRefreshAll2() {
  if (_queueRefreshID !== _refreshID) {
    var id = _queueRefreshID = _refreshID;
    requestAnimationFrame(function() {
      return id === _refreshID && _refreshAll(true);
    });
  }
};
var _refresh100vh = function _refresh100vh2() {
  _body6.appendChild(_div100vh);
  _100vh = !_normalizer2 && _div100vh.offsetHeight || _win6.innerHeight;
  _body6.removeChild(_div100vh);
};
var _hideAllMarkers = function _hideAllMarkers2(hide) {
  return _toArray5(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(el) {
    return el.style.display = hide ? "none" : "block";
  });
};
var _refreshAll = function _refreshAll2(force, skipRevert) {
  _docEl3 = _doc5.documentElement;
  _body6 = _doc5.body;
  _root2 = [_win6, _doc5, _docEl3, _body6];
  if (_lastScrollTime && !force && !_isReverted) {
    _addListener5(ScrollTrigger3, "scrollEnd", _softRefresh);
    return;
  }
  _refresh100vh();
  _refreshingAll = ScrollTrigger3.isRefreshing = true;
  _scrollers.forEach(function(obj) {
    return _isFunction7(obj) && ++obj.cacheID && (obj.rec = obj());
  });
  var refreshInits = _dispatch("refreshInit");
  _sort && ScrollTrigger3.sort();
  skipRevert || _revertAll();
  _scrollers.forEach(function(obj) {
    if (_isFunction7(obj)) {
      obj.smooth && (obj.target.style.scrollBehavior = "auto");
      obj(0);
    }
  });
  _triggers.slice(0).forEach(function(t) {
    return t.refresh();
  });
  _isReverted = false;
  _triggers.forEach(function(t) {
    if (t._subPinOffset && t.pin) {
      var prop = t.vars.horizontal ? "offsetWidth" : "offsetHeight", original = t.pin[prop];
      t.revert(true, 1);
      t.adjustPinSpacing(t.pin[prop] - original);
      t.refresh();
    }
  });
  _clampingMax = 1;
  _hideAllMarkers(true);
  _triggers.forEach(function(t) {
    var max = _maxScroll(t.scroller, t._dir), endClamp = t.vars.end === "max" || t._endClamp && t.end > max, startClamp = t._startClamp && t.start >= max;
    (endClamp || startClamp) && t.setPositions(startClamp ? max - 1 : t.start, endClamp ? Math.max(startClamp ? max : t.start + 1, max) : t.end, true);
  });
  _hideAllMarkers(false);
  _clampingMax = 0;
  refreshInits.forEach(function(result) {
    return result && result.render && result.render(-1);
  });
  _scrollers.forEach(function(obj) {
    if (_isFunction7(obj)) {
      obj.smooth && requestAnimationFrame(function() {
        return obj.target.style.scrollBehavior = "smooth";
      });
      obj.rec && obj(obj.rec);
    }
  });
  _clearScrollMemory(_scrollRestoration, 1);
  _resizeDelay.pause();
  _refreshID++;
  _refreshingAll = 2;
  _updateAll(2);
  _triggers.forEach(function(t) {
    return _isFunction7(t.vars.onRefresh) && t.vars.onRefresh(t);
  });
  _refreshingAll = ScrollTrigger3.isRefreshing = false;
  _dispatch("refresh");
};
var _lastScroll = 0;
var _direction = 1;
var _primary;
var _updateAll = function _updateAll2(force) {
  if (force === 2 || !_refreshingAll && !_isReverted) {
    ScrollTrigger3.isUpdating = true;
    _primary && _primary.update(0);
    var l = _triggers.length, time = _getTime3(), recordVelocity = time - _time1 >= 50, scroll = l && _triggers[0].scroll();
    _direction = _lastScroll > scroll ? -1 : 1;
    _refreshingAll || (_lastScroll = scroll);
    if (recordVelocity) {
      if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
        _lastScrollTime = 0;
        _dispatch("scrollEnd");
      }
      _time2 = _time1;
      _time1 = time;
    }
    if (_direction < 0) {
      _i = l;
      while (_i-- > 0) {
        _triggers[_i] && _triggers[_i].update(0, recordVelocity);
      }
      _direction = 1;
    } else {
      for (_i = 0; _i < l; _i++) {
        _triggers[_i] && _triggers[_i].update(0, recordVelocity);
      }
    }
    ScrollTrigger3.isUpdating = false;
  }
  _rafID = 0;
};
var _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"];
var _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]);
var _swapPinOut = function _swapPinOut2(pin, spacer, state) {
  _setState(state);
  var cache = pin._gsap;
  if (cache.spacerIsNative) {
    _setState(cache.spacerState);
  } else if (pin._gsap.swappedIn) {
    var parent = spacer.parentNode;
    if (parent) {
      parent.insertBefore(pin, spacer);
      parent.removeChild(spacer);
    }
  }
  pin._gsap.swappedIn = false;
};
var _swapPinIn = function _swapPinIn2(pin, spacer, cs, spacerState) {
  if (!pin._gsap.swappedIn) {
    var i2 = _propNamesToCopy.length, spacerStyle = spacer.style, pinStyle = pin.style, p2;
    while (i2--) {
      p2 = _propNamesToCopy[i2];
      spacerStyle[p2] = cs[p2];
    }
    spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
    cs.display === "inline" && (spacerStyle.display = "inline-block");
    pinStyle[_bottom] = pinStyle[_right] = "auto";
    spacerStyle.flexBasis = cs.flexBasis || "auto";
    spacerStyle.overflow = "visible";
    spacerStyle.boxSizing = "border-box";
    spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
    spacerStyle[_height] = _getSize(pin, _vertical) + _px;
    spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";
    _setState(spacerState);
    pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
    pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
    pinStyle[_padding] = cs[_padding];
    if (pin.parentNode !== spacer) {
      pin.parentNode.insertBefore(spacer, pin);
      spacer.appendChild(pin);
    }
    pin._gsap.swappedIn = true;
  }
};
var _capsExp = /([A-Z])/g;
var _setState = function _setState2(state) {
  if (state) {
    var style = state.t.style, l = state.length, i2 = 0, p2, value;
    (state.t._gsap || gsap12.core.getCache(state.t)).uncache = 1;
    for (; i2 < l; i2 += 2) {
      value = state[i2 + 1];
      p2 = state[i2];
      if (value) {
        style[p2] = value;
      } else if (style[p2]) {
        style.removeProperty(p2.replace(_capsExp, "-$1").toLowerCase());
      }
    }
  }
};
var _getState = function _getState2(element) {
  var l = _stateProps.length, style = element.style, state = [], i2 = 0;
  for (; i2 < l; i2++) {
    state.push(_stateProps[i2], style[_stateProps[i2]]);
  }
  state.t = element;
  return state;
};
var _copyState = function _copyState2(state, override, omitOffsets) {
  var result = [], l = state.length, i2 = omitOffsets ? 8 : 0, p2;
  for (; i2 < l; i2 += 2) {
    p2 = state[i2];
    result.push(p2, p2 in override ? override[p2] : state[i2 + 1]);
  }
  result.t = state.t;
  return result;
};
var _winOffsets = {
  left: 0,
  top: 0
};
var _parsePosition = function _parsePosition2(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation, clampZeroProp) {
  _isFunction7(value) && (value = value(self));
  if (_isString7(value) && value.substr(0, 3) === "max") {
    value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
  }
  var time = containerAnimation ? containerAnimation.time() : 0, p1, p2, element;
  containerAnimation && containerAnimation.seek(0);
  isNaN(value) || (value = +value);
  if (!_isNumber3(value)) {
    _isFunction7(trigger) && (trigger = trigger(self));
    var offsets = (value || "0").split(" "), bounds, localOffset, globalOffset, display;
    element = _getTarget(trigger, self) || _body6;
    bounds = _getBounds3(element) || {};
    if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle3(element).display === "none") {
      display = element.style.display;
      element.style.display = "block";
      bounds = _getBounds3(element);
      display ? element.style.display = display : element.style.removeProperty("display");
    }
    localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
    globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
    value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
    markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
    scrollerSize -= scrollerSize - globalOffset;
  } else {
    containerAnimation && (value = gsap12.utils.mapRange(containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, 0, scrollerMax, value));
    markerScroller && _positionMarker(markerScroller, scrollerSize, direction, true);
  }
  if (clampZeroProp) {
    self[clampZeroProp] = value || -1e-3;
    value < 0 && (value = 0);
  }
  if (marker) {
    var position = value + scrollerSize, isStart = marker._isStart;
    p1 = "scroll" + direction.d2;
    _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body6[p1], _docEl3[p1]) : marker.parentNode[p1]) <= position + 1);
    if (useFixedPosition) {
      scrollerBounds = _getBounds3(markerScroller);
      useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
    }
  }
  if (containerAnimation && element) {
    p1 = _getBounds3(element);
    containerAnimation.seek(scrollerMax);
    p2 = _getBounds3(element);
    containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
    value = value / containerAnimation._caScrollDist * scrollerMax;
  }
  containerAnimation && containerAnimation.seek(time);
  return containerAnimation ? value : Math.round(value);
};
var _prefixExp = /(webkit|moz|length|cssText|inset)/i;
var _reparent = function _reparent2(element, parent, top, left) {
  if (element.parentNode !== parent) {
    var style = element.style, p2, cs;
    if (parent === _body6) {
      element._stOrig = style.cssText;
      cs = _getComputedStyle3(element);
      for (p2 in cs) {
        if (!+p2 && !_prefixExp.test(p2) && cs[p2] && typeof style[p2] === "string" && p2 !== "0") {
          style[p2] = cs[p2];
        }
      }
      style.top = top;
      style.left = left;
    } else {
      style.cssText = element._stOrig;
    }
    gsap12.core.getCache(element).uncache = 1;
    parent.appendChild(element);
  }
};
var _interruptionTracker = function _interruptionTracker2(getValueFunc, initialValue, onInterrupt) {
  var last1 = initialValue, last2 = last1;
  return function(value) {
    var current = Math.round(getValueFunc());
    if (current !== last1 && current !== last2 && Math.abs(current - last1) > 3 && Math.abs(current - last2) > 3) {
      value = current;
      onInterrupt && onInterrupt();
    }
    last2 = last1;
    last1 = Math.round(value);
    return last1;
  };
};
var _shiftMarker = function _shiftMarker2(marker, direction, value) {
  var vars = {};
  vars[direction.p] = "+=" + value;
  gsap12.set(marker, vars);
};
var _getTweenCreator = function _getTweenCreator2(scroller, direction) {
  var getScroll = _getScrollFunc(scroller, direction), prop = "_scroll" + direction.p2, getTween = function getTween2(scrollTo, vars, initialValue, change1, change2) {
    var tween = getTween2.tween, onComplete = vars.onComplete, modifiers = {};
    initialValue = initialValue || getScroll();
    var checkForInterruption = _interruptionTracker(getScroll, initialValue, function() {
      tween.kill();
      getTween2.tween = 0;
    });
    change2 = change1 && change2 || 0;
    change1 = change1 || scrollTo - initialValue;
    tween && tween.kill();
    vars[prop] = scrollTo;
    vars.inherit = false;
    vars.modifiers = modifiers;
    modifiers[prop] = function() {
      return checkForInterruption(initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio);
    };
    vars.onUpdate = function() {
      _scrollers.cache++;
      getTween2.tween && _updateAll();
    };
    vars.onComplete = function() {
      getTween2.tween = 0;
      onComplete && onComplete.call(tween);
    };
    tween = getTween2.tween = gsap12.to(scroller, vars);
    return tween;
  };
  scroller[prop] = getScroll;
  getScroll.wheelHandler = function() {
    return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
  };
  _addListener5(scroller, "wheel", getScroll.wheelHandler);
  ScrollTrigger3.isTouch && _addListener5(scroller, "touchmove", getScroll.wheelHandler);
  return getTween;
};
var ScrollTrigger3 = function() {
  function ScrollTrigger5(vars, animation) {
    _coreInitted9 || ScrollTrigger5.register(gsap12) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
    _context3(this);
    this.init(vars, animation);
  }
  var _proto = ScrollTrigger5.prototype;
  _proto.init = function init13(vars, animation) {
    this.progress = this.start = 0;
    this.vars && this.kill(true, true);
    if (!_enabled) {
      this.update = this.refresh = this.kill = _passThrough;
      return;
    }
    vars = _setDefaults3(_isString7(vars) || _isNumber3(vars) || vars.nodeType ? {
      trigger: vars
    } : vars, _defaults);
    var _vars = vars, onUpdate = _vars.onUpdate, toggleClass = _vars.toggleClass, id = _vars.id, onToggle = _vars.onToggle, onRefresh = _vars.onRefresh, scrub = _vars.scrub, trigger = _vars.trigger, pin = _vars.pin, pinSpacing = _vars.pinSpacing, invalidateOnRefresh = _vars.invalidateOnRefresh, anticipatePin = _vars.anticipatePin, onScrubComplete = _vars.onScrubComplete, onSnapComplete = _vars.onSnapComplete, once = _vars.once, snap2 = _vars.snap, pinReparent = _vars.pinReparent, pinSpacer = _vars.pinSpacer, containerAnimation = _vars.containerAnimation, fastScrollEnd = _vars.fastScrollEnd, preventOverlaps = _vars.preventOverlaps, direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical, isToggle = !scrub && scrub !== 0, scroller = _getTarget(vars.scroller || _win6), scrollerCache = gsap12.core.getCache(scroller), isViewport = _isViewport3(scroller), useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed", callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack], toggleActions = isToggle && vars.toggleActions.split(" "), markers = "markers" in vars ? vars.markers : _defaults.markers, borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle3(scroller)["border" + direction.p2 + _Width]) || 0, self = this, onRefreshInit = vars.onRefreshInit && function() {
      return vars.onRefreshInit(self);
    }, getScrollerSize = _getSizeFunc(scroller, isViewport, direction), getScrollerOffsets = _getOffsetsFunc(scroller, isViewport), lastSnap = 0, lastRefresh = 0, prevProgress = 0, scrollFunc = _getScrollFunc(scroller, direction), tweenTo, pinCache, snapFunc, scroll1, scroll2, start, end, markerStart, markerEnd, markerStartTrigger, markerEndTrigger, markerVars, executingOnRefresh, change, pinOriginalState, pinActiveState, pinState, spacer, offset, pinGetter, pinSetter, pinStart, pinChange, spacingStart, spacerState, markerStartSetter, pinMoves, markerEndSetter, cs, snap1, snap22, scrubTween, scrubSmooth, snapDurClamp, snapDelayedCall, prevScroll, prevAnimProgress, caMarkerSetter, customRevertReturn;
    self._startClamp = self._endClamp = false;
    self._dir = direction;
    anticipatePin *= 45;
    self.scroller = scroller;
    self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
    scroll1 = scrollFunc();
    self.vars = vars;
    animation = animation || vars.animation;
    if ("refreshPriority" in vars) {
      _sort = 1;
      vars.refreshPriority === -9999 && (_primary = self);
    }
    scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
      top: _getTweenCreator(scroller, _vertical),
      left: _getTweenCreator(scroller, _horizontal)
    };
    self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];
    self.scrubDuration = function(value) {
      scrubSmooth = _isNumber3(value) && value;
      if (!scrubSmooth) {
        scrubTween && scrubTween.progress(1).kill();
        scrubTween = 0;
      } else {
        scrubTween ? scrubTween.duration(value) : scrubTween = gsap12.to(animation, {
          ease: "expo",
          totalProgress: "+=0",
          inherit: false,
          duration: scrubSmooth,
          paused: true,
          onComplete: function onComplete() {
            return onScrubComplete && onScrubComplete(self);
          }
        });
      }
    };
    if (animation) {
      animation.vars.lazy = false;
      animation._initted && !self.isReverted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.duration() && animation.render(0, true, true);
      self.animation = animation.pause();
      animation.scrollTrigger = self;
      self.scrubDuration(scrub);
      snap1 = 0;
      id || (id = animation.vars.id);
    }
    if (snap2) {
      if (!_isObject3(snap2) || snap2.push) {
        snap2 = {
          snapTo: snap2
        };
      }
      "scrollBehavior" in _body6.style && gsap12.set(isViewport ? [_body6, _docEl3] : scroller, {
        scrollBehavior: "auto"
      });
      _scrollers.forEach(function(o) {
        return _isFunction7(o) && o.target === (isViewport ? _doc5.scrollingElement || _docEl3 : scroller) && (o.smooth = false);
      });
      snapFunc = _isFunction7(snap2.snapTo) ? snap2.snapTo : snap2.snapTo === "labels" ? _getClosestLabel(animation) : snap2.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap2.directional !== false ? function(value, st) {
        return _snapDirectional(snap2.snapTo)(value, _getTime3() - lastRefresh < 500 ? 0 : st.direction);
      } : gsap12.utils.snap(snap2.snapTo);
      snapDurClamp = snap2.duration || {
        min: 0.1,
        max: 2
      };
      snapDurClamp = _isObject3(snapDurClamp) ? _clamp2(snapDurClamp.min, snapDurClamp.max) : _clamp2(snapDurClamp, snapDurClamp);
      snapDelayedCall = gsap12.delayedCall(snap2.delay || scrubSmooth / 2 || 0.1, function() {
        var scroll = scrollFunc(), refreshedRecently = _getTime3() - lastRefresh < 500, tween = tweenTo.tween;
        if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
          var progress = (scroll - start) / change, totalProgress = animation && !isToggle ? animation.totalProgress() : progress, velocity = refreshedRecently ? 0 : (totalProgress - snap22) / (_getTime3() - _time2) * 1e3 || 0, change1 = gsap12.utils.clamp(-progress, 1 - progress, _abs2(velocity / 2) * velocity / 0.185), naturalEnd = progress + (snap2.inertia === false ? 0 : change1), endValue, endScroll, _snap = snap2, onStart = _snap.onStart, _onInterrupt = _snap.onInterrupt, _onComplete = _snap.onComplete;
          endValue = snapFunc(naturalEnd, self);
          _isNumber3(endValue) || (endValue = naturalEnd);
          endScroll = Math.max(0, Math.round(start + endValue * change));
          if (scroll <= end && scroll >= start && endScroll !== scroll) {
            if (tween && !tween._initted && tween.data <= _abs2(endScroll - scroll)) {
              return;
            }
            if (snap2.inertia === false) {
              change1 = endValue - progress;
            }
            tweenTo(endScroll, {
              duration: snapDurClamp(_abs2(Math.max(_abs2(naturalEnd - totalProgress), _abs2(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
              ease: snap2.ease || "power3",
              data: _abs2(endScroll - scroll),
              // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
              onInterrupt: function onInterrupt() {
                return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
              },
              onComplete: function onComplete() {
                self.update();
                lastSnap = scrollFunc();
                if (animation && !isToggle) {
                  scrubTween ? scrubTween.resetTo("totalProgress", endValue, animation._tTime / animation._tDur) : animation.progress(endValue);
                }
                snap1 = snap22 = animation && !isToggle ? animation.totalProgress() : self.progress;
                onSnapComplete && onSnapComplete(self);
                _onComplete && _onComplete(self);
              }
            }, scroll, change1 * change, endScroll - scroll - change1 * change);
            onStart && onStart(self, tweenTo.tween);
          }
        } else if (self.isActive && lastSnap !== scroll) {
          snapDelayedCall.restart(true);
        }
      }).pause();
    }
    id && (_ids[id] = self);
    trigger = self.trigger = _getTarget(trigger || pin !== true && pin);
    customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
    customRevertReturn && (customRevertReturn = customRevertReturn(self));
    pin = pin === true ? trigger : _getTarget(pin);
    _isString7(toggleClass) && (toggleClass = {
      targets: trigger,
      className: toggleClass
    });
    if (pin) {
      pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && pin.parentNode && pin.parentNode.style && _getComputedStyle3(pin.parentNode).display === "flex" ? false : _padding);
      self.pin = pin;
      pinCache = gsap12.core.getCache(pin);
      if (!pinCache.spacer) {
        if (pinSpacer) {
          pinSpacer = _getTarget(pinSpacer);
          pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement);
          pinCache.spacerIsNative = !!pinSpacer;
          pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
        }
        pinCache.spacer = spacer = pinSpacer || _doc5.createElement("div");
        spacer.classList.add("pin-spacer");
        id && spacer.classList.add("pin-spacer-" + id);
        pinCache.pinState = pinOriginalState = _getState(pin);
      } else {
        pinOriginalState = pinCache.pinState;
      }
      vars.force3D !== false && gsap12.set(pin, {
        force3D: true
      });
      self.spacer = spacer = pinCache.spacer;
      cs = _getComputedStyle3(pin);
      spacingStart = cs[pinSpacing + direction.os2];
      pinGetter = gsap12.getProperty(pin);
      pinSetter = gsap12.quickSetter(pin, direction.a, _px);
      _swapPinIn(pin, spacer, cs);
      pinState = _getState(pin);
    }
    if (markers) {
      markerVars = _isObject3(markers) ? _setDefaults3(markers, _markerDefaults) : _markerDefaults;
      markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
      markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
      offset = markerStartTrigger["offset" + direction.op.d2];
      var content = _getTarget(_getProxyProp(scroller, "content") || scroller);
      markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
      markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
      containerAnimation && (caMarkerSetter = gsap12.quickSetter([markerStart, markerEnd], direction.a, _px));
      if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
        _makePositionable(isViewport ? _body6 : scroller);
        gsap12.set([markerStartTrigger, markerEndTrigger], {
          force3D: true
        });
        markerStartSetter = gsap12.quickSetter(markerStartTrigger, direction.a, _px);
        markerEndSetter = gsap12.quickSetter(markerEndTrigger, direction.a, _px);
      }
    }
    if (containerAnimation) {
      var oldOnUpdate = containerAnimation.vars.onUpdate, oldParams = containerAnimation.vars.onUpdateParams;
      containerAnimation.eventCallback("onUpdate", function() {
        self.update(0, 0, 1);
        oldOnUpdate && oldOnUpdate.apply(containerAnimation, oldParams || []);
      });
    }
    self.previous = function() {
      return _triggers[_triggers.indexOf(self) - 1];
    };
    self.next = function() {
      return _triggers[_triggers.indexOf(self) + 1];
    };
    self.revert = function(revert, temp) {
      if (!temp) {
        return self.kill(true);
      }
      var r = revert !== false || !self.enabled, prevRefreshing = _refreshing;
      if (r !== self.isReverted) {
        if (r) {
          prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0);
          prevProgress = self.progress;
          prevAnimProgress = animation && animation.progress();
        }
        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m) {
          return m.style.display = r ? "none" : "block";
        });
        if (r) {
          _refreshing = self;
          self.update(r);
        }
        if (pin && (!pinReparent || !self.isActive)) {
          if (r) {
            _swapPinOut(pin, spacer, pinOriginalState);
          } else {
            _swapPinIn(pin, spacer, _getComputedStyle3(pin), spacerState);
          }
        }
        r || self.update(r);
        _refreshing = prevRefreshing;
        self.isReverted = r;
      }
    };
    self.refresh = function(soft, force, position, pinOffset) {
      if ((_refreshing || !self.enabled) && !force) {
        return;
      }
      if (pin && soft && _lastScrollTime) {
        _addListener5(ScrollTrigger5, "scrollEnd", _softRefresh);
        return;
      }
      !_refreshingAll && onRefreshInit && onRefreshInit(self);
      _refreshing = self;
      if (tweenTo.tween && !position) {
        tweenTo.tween.kill();
        tweenTo.tween = 0;
      }
      scrubTween && scrubTween.pause();
      if (invalidateOnRefresh && animation) {
        animation.revert({
          kill: false
        }).invalidate();
        animation.getChildren && animation.getChildren(true, true, false).forEach(function(t) {
          return t.vars.immediateRender && t.render(0, true, true);
        });
      }
      self.isReverted || self.revert(true, true);
      self._subPinOffset = false;
      var size = getScrollerSize(), scrollerBounds = getScrollerOffsets(), max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction), isFirstRefresh = change <= 0.01 || !change, offset2 = 0, otherPinOffset = pinOffset || 0, parsedEnd = _isObject3(position) ? position.end : vars.end, parsedEndTrigger = vars.endTrigger || trigger, parsedStart = _isObject3(position) ? position.start : vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"), pinnedContainer = self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer, self), triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0, i2 = triggerIndex, cs2, bounds, scroll, isVertical, override, curTrigger, curPin, oppositeScroll, initted, revertedPins, forcedOverflow, markerStartOffset, markerEndOffset;
      if (markers && _isObject3(position)) {
        markerStartOffset = gsap12.getProperty(markerStartTrigger, direction.p);
        markerEndOffset = gsap12.getProperty(markerEndTrigger, direction.p);
      }
      while (i2-- > 0) {
        curTrigger = _triggers[i2];
        curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = self);
        curPin = curTrigger.pin;
        if (curPin && (curPin === trigger || curPin === pin || curPin === pinnedContainer) && !curTrigger.isReverted) {
          revertedPins || (revertedPins = []);
          revertedPins.unshift(curTrigger);
          curTrigger.revert(true, true);
        }
        if (curTrigger !== _triggers[i2]) {
          triggerIndex--;
          i2--;
        }
      }
      _isFunction7(parsedStart) && (parsedStart = parsedStart(self));
      parsedStart = _parseClamp(parsedStart, "start", self);
      start = _parsePosition(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._startClamp && "_startClamp") || (pin ? -1e-3 : 0);
      _isFunction7(parsedEnd) && (parsedEnd = parsedEnd(self));
      if (_isString7(parsedEnd) && !parsedEnd.indexOf("+=")) {
        if (~parsedEnd.indexOf(" ")) {
          parsedEnd = (_isString7(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
        } else {
          offset2 = _offsetToPx(parsedEnd.substr(2), size);
          parsedEnd = _isString7(parsedStart) ? parsedStart : (containerAnimation ? gsap12.utils.mapRange(0, containerAnimation.duration(), containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, start) : start) + offset2;
          parsedEndTrigger = trigger;
        }
      }
      parsedEnd = _parseClamp(parsedEnd, "end", self);
      end = Math.max(start, _parsePosition(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset2, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._endClamp && "_endClamp")) || -1e-3;
      offset2 = 0;
      i2 = triggerIndex;
      while (i2--) {
        curTrigger = _triggers[i2];
        curPin = curTrigger.pin;
        if (curPin && curTrigger.start - curTrigger._pinPush <= start && !containerAnimation && curTrigger.end > 0) {
          cs2 = curTrigger.end - (self._startClamp ? Math.max(0, curTrigger.start) : curTrigger.start);
          if ((curPin === trigger && curTrigger.start - curTrigger._pinPush < start || curPin === pinnedContainer) && isNaN(parsedStart)) {
            offset2 += cs2 * (1 - curTrigger.progress);
          }
          curPin === pin && (otherPinOffset += cs2);
        }
      }
      start += offset2;
      end += offset2;
      self._startClamp && (self._startClamp += offset2);
      if (self._endClamp && !_refreshingAll) {
        self._endClamp = end || -1e-3;
        end = Math.min(end, _maxScroll(scroller, direction));
      }
      change = end - start || (start -= 0.01) && 1e-3;
      if (isFirstRefresh) {
        prevProgress = gsap12.utils.clamp(0, 1, gsap12.utils.normalize(start, end, prevScroll));
      }
      self._pinPush = otherPinOffset;
      if (markerStart && offset2) {
        cs2 = {};
        cs2[direction.a] = "+=" + offset2;
        pinnedContainer && (cs2[direction.p] = "-=" + scrollFunc());
        gsap12.set([markerStart, markerEnd], cs2);
      }
      if (pin && !(_clampingMax && self.end >= _maxScroll(scroller, direction))) {
        cs2 = _getComputedStyle3(pin);
        isVertical = direction === _vertical;
        scroll = scrollFunc();
        pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
        if (!max && end > 1) {
          forcedOverflow = (isViewport ? _doc5.scrollingElement || _docEl3 : scroller).style;
          forcedOverflow = {
            style: forcedOverflow,
            value: forcedOverflow["overflow" + direction.a.toUpperCase()]
          };
          if (isViewport && _getComputedStyle3(_body6)["overflow" + direction.a.toUpperCase()] !== "scroll") {
            forcedOverflow.style["overflow" + direction.a.toUpperCase()] = "scroll";
          }
        }
        _swapPinIn(pin, spacer, cs2);
        pinState = _getState(pin);
        bounds = _getBounds3(pin, true);
        oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();
        if (pinSpacing) {
          spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
          spacerState.t = spacer;
          i2 = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
          if (i2) {
            spacerState.push(direction.d, i2 + _px);
            spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i2 + _px);
          }
          _setState(spacerState);
          if (pinnedContainer) {
            _triggers.forEach(function(t) {
              if (t.pin === pinnedContainer && t.vars.pinSpacing !== false) {
                t._subPinOffset = true;
              }
            });
          }
          useFixedPosition && scrollFunc(prevScroll);
        } else {
          i2 = _getSize(pin, direction);
          i2 && spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i2 + _px);
        }
        if (useFixedPosition) {
          override = {
            top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
            left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
            boxSizing: "border-box",
            position: "fixed"
          };
          override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
          override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
          override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
          override[_padding] = cs2[_padding];
          override[_padding + _Top] = cs2[_padding + _Top];
          override[_padding + _Right] = cs2[_padding + _Right];
          override[_padding + _Bottom] = cs2[_padding + _Bottom];
          override[_padding + _Left] = cs2[_padding + _Left];
          pinActiveState = _copyState(pinOriginalState, override, pinReparent);
          _refreshingAll && scrollFunc(0);
        }
        if (animation) {
          initted = animation._initted;
          _suppressOverwrites(1);
          animation.render(animation.duration(), true, true);
          pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
          pinMoves = Math.abs(change - pinChange) > 1;
          useFixedPosition && pinMoves && pinActiveState.splice(pinActiveState.length - 2, 2);
          animation.render(0, true, true);
          initted || animation.invalidate(true);
          animation.parent || animation.totalTime(animation.totalTime());
          _suppressOverwrites(0);
        } else {
          pinChange = change;
        }
        forcedOverflow && (forcedOverflow.value ? forcedOverflow.style["overflow" + direction.a.toUpperCase()] = forcedOverflow.value : forcedOverflow.style.removeProperty("overflow-" + direction.a));
      } else if (trigger && scrollFunc() && !containerAnimation) {
        bounds = trigger.parentNode;
        while (bounds && bounds !== _body6) {
          if (bounds._pinOffset) {
            start -= bounds._pinOffset;
            end -= bounds._pinOffset;
          }
          bounds = bounds.parentNode;
        }
      }
      revertedPins && revertedPins.forEach(function(t) {
        return t.revert(false, true);
      });
      self.start = start;
      self.end = end;
      scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc();
      if (!containerAnimation && !_refreshingAll) {
        scroll1 < prevScroll && scrollFunc(prevScroll);
        self.scroll.rec = 0;
      }
      self.revert(false, true);
      lastRefresh = _getTime3();
      if (snapDelayedCall) {
        lastSnap = -1;
        snapDelayedCall.restart(true);
      }
      _refreshing = 0;
      animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress || 0, true).render(animation.time(), true, true);
      if (isFirstRefresh || prevProgress !== self.progress || containerAnimation || invalidateOnRefresh || animation && !animation._initted) {
        animation && !isToggle && (animation._initted || prevProgress || animation.vars.immediateRender !== false) && animation.totalProgress(containerAnimation && start < -1e-3 && !prevProgress ? gsap12.utils.normalize(start, end, 0) : prevProgress, true);
        self.progress = isFirstRefresh || (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
      }
      pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
      scrubTween && scrubTween.invalidate();
      if (!isNaN(markerStartOffset)) {
        markerStartOffset -= gsap12.getProperty(markerStartTrigger, direction.p);
        markerEndOffset -= gsap12.getProperty(markerEndTrigger, direction.p);
        _shiftMarker(markerStartTrigger, direction, markerStartOffset);
        _shiftMarker(markerStart, direction, markerStartOffset - (pinOffset || 0));
        _shiftMarker(markerEndTrigger, direction, markerEndOffset);
        _shiftMarker(markerEnd, direction, markerEndOffset - (pinOffset || 0));
      }
      isFirstRefresh && !_refreshingAll && self.update();
      if (onRefresh && !_refreshingAll && !executingOnRefresh) {
        executingOnRefresh = true;
        onRefresh(self);
        executingOnRefresh = false;
      }
    };
    self.getVelocity = function() {
      return (scrollFunc() - scroll2) / (_getTime3() - _time2) * 1e3 || 0;
    };
    self.endAnimation = function() {
      _endAnimation(self.callbackAnimation);
      if (animation) {
        scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
      }
    };
    self.labelToScroll = function(label) {
      return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
    };
    self.getTrailing = function(name) {
      var i2 = _triggers.indexOf(self), a = self.direction > 0 ? _triggers.slice(0, i2).reverse() : _triggers.slice(i2 + 1);
      return (_isString7(name) ? a.filter(function(t) {
        return t.vars.preventOverlaps === name;
      }) : a).filter(function(t) {
        return self.direction > 0 ? t.end <= start : t.start >= end;
      });
    };
    self.update = function(reset, recordVelocity, forceFake) {
      if (containerAnimation && !forceFake && !reset) {
        return;
      }
      var scroll = _refreshingAll === true ? prevScroll : self.scroll(), p2 = reset ? 0 : (scroll - start) / change, clipped = p2 < 0 ? 0 : p2 > 1 ? 1 : p2 || 0, prevProgress2 = self.progress, isActive, wasActive, toggleState, action, stateChanged, toggled, isAtMax, isTakingAction;
      if (recordVelocity) {
        scroll2 = scroll1;
        scroll1 = containerAnimation ? scrollFunc() : scroll;
        if (snap2) {
          snap22 = snap1;
          snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
        }
      }
      if (anticipatePin && pin && !_refreshing && !_startup2 && _lastScrollTime) {
        if (!clipped && start < scroll + (scroll - scroll2) / (_getTime3() - _time2) * anticipatePin) {
          clipped = 1e-4;
        } else if (clipped === 1 && end > scroll + (scroll - scroll2) / (_getTime3() - _time2) * anticipatePin) {
          clipped = 0.9999;
        }
      }
      if (clipped !== prevProgress2 && self.enabled) {
        isActive = self.isActive = !!clipped && clipped < 1;
        wasActive = !!prevProgress2 && prevProgress2 < 1;
        toggled = isActive !== wasActive;
        stateChanged = toggled || !!clipped !== !!prevProgress2;
        self.direction = clipped > prevProgress2 ? 1 : -1;
        self.progress = clipped;
        if (stateChanged && !_refreshing) {
          toggleState = clipped && !prevProgress2 ? 0 : clipped === 1 ? 1 : prevProgress2 === 1 ? 2 : 3;
          if (isToggle) {
            action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState];
            isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
          }
        }
        preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction7(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function(t) {
          return t.endAnimation();
        }));
        if (!isToggle) {
          if (scrubTween && !_refreshing && !_startup2) {
            scrubTween._dp._time - scrubTween._start !== scrubTween._time && scrubTween.render(scrubTween._dp._time - scrubTween._start);
            if (scrubTween.resetTo) {
              scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
            } else {
              scrubTween.vars.totalProgress = clipped;
              scrubTween.invalidate().restart();
            }
          } else if (animation) {
            animation.totalProgress(clipped, !!(_refreshing && (lastRefresh || reset)));
          }
        }
        if (pin) {
          reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);
          if (!useFixedPosition) {
            pinSetter(_round9(pinStart + pinChange * clipped));
          } else if (stateChanged) {
            isAtMax = !reset && clipped > prevProgress2 && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction);
            if (pinReparent) {
              if (!reset && (isActive || isAtMax)) {
                var bounds = _getBounds3(pin, true), _offset = scroll - start;
                _reparent(pin, _body6, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
              } else {
                _reparent(pin, spacer);
              }
            }
            _setState(isActive || isAtMax ? pinActiveState : pinState);
            pinMoves && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
          }
        }
        snap2 && !tweenTo.tween && !_refreshing && !_startup2 && snapDelayedCall.restart(true);
        toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray5(toggleClass.targets).forEach(function(el) {
          return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
        });
        onUpdate && !isToggle && !reset && onUpdate(self);
        if (stateChanged && !_refreshing) {
          if (isToggle) {
            if (isTakingAction) {
              if (action === "complete") {
                animation.pause().totalProgress(1);
              } else if (action === "reset") {
                animation.restart(true).pause();
              } else if (action === "restart") {
                animation.restart(true);
              } else {
                animation[action]();
              }
            }
            onUpdate && onUpdate(self);
          }
          if (toggled || !_limitCallbacks) {
            onToggle && toggled && _callback(self, onToggle);
            callbacks[toggleState] && _callback(self, callbacks[toggleState]);
            once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0);
            if (!toggled) {
              toggleState = clipped === 1 ? 1 : 3;
              callbacks[toggleState] && _callback(self, callbacks[toggleState]);
            }
          }
          if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber3(fastScrollEnd) ? fastScrollEnd : 2500)) {
            _endAnimation(self.callbackAnimation);
            scrubTween ? scrubTween.progress(1) : _endAnimation(animation, action === "reverse" ? 1 : !clipped, 1);
          }
        } else if (isToggle && onUpdate && !_refreshing) {
          onUpdate(self);
        }
      }
      if (markerEndSetter) {
        var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
        markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
        markerEndSetter(n);
      }
      caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
    };
    self.enable = function(reset, refresh) {
      if (!self.enabled) {
        self.enabled = true;
        _addListener5(scroller, "resize", _onResize);
        isViewport || _addListener5(scroller, "scroll", _onScroll3);
        onRefreshInit && _addListener5(ScrollTrigger5, "refreshInit", onRefreshInit);
        if (reset !== false) {
          self.progress = prevProgress = 0;
          scroll1 = scroll2 = lastSnap = scrollFunc();
        }
        refresh !== false && self.refresh();
      }
    };
    self.getTween = function(snap3) {
      return snap3 && tweenTo ? tweenTo.tween : scrubTween;
    };
    self.setPositions = function(newStart, newEnd, keepClamp, pinOffset) {
      if (containerAnimation) {
        var st = containerAnimation.scrollTrigger, duration = containerAnimation.duration(), _change = st.end - st.start;
        newStart = st.start + _change * newStart / duration;
        newEnd = st.start + _change * newEnd / duration;
      }
      self.refresh(false, false, {
        start: _keepClamp(newStart, keepClamp && !!self._startClamp),
        end: _keepClamp(newEnd, keepClamp && !!self._endClamp)
      }, pinOffset);
      self.update();
    };
    self.adjustPinSpacing = function(amount) {
      if (spacerState && amount) {
        var i2 = spacerState.indexOf(direction.d) + 1;
        spacerState[i2] = parseFloat(spacerState[i2]) + amount + _px;
        spacerState[1] = parseFloat(spacerState[1]) + amount + _px;
        _setState(spacerState);
      }
    };
    self.disable = function(reset, allowAnimation) {
      if (self.enabled) {
        reset !== false && self.revert(true, true);
        self.enabled = self.isActive = false;
        allowAnimation || scrubTween && scrubTween.pause();
        prevScroll = 0;
        pinCache && (pinCache.uncache = 1);
        onRefreshInit && _removeListener5(ScrollTrigger5, "refreshInit", onRefreshInit);
        if (snapDelayedCall) {
          snapDelayedCall.pause();
          tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
        }
        if (!isViewport) {
          var i2 = _triggers.length;
          while (i2--) {
            if (_triggers[i2].scroller === scroller && _triggers[i2] !== self) {
              return;
            }
          }
          _removeListener5(scroller, "resize", _onResize);
          isViewport || _removeListener5(scroller, "scroll", _onScroll3);
        }
      }
    };
    self.kill = function(revert, allowAnimation) {
      self.disable(revert, allowAnimation);
      scrubTween && !allowAnimation && scrubTween.kill();
      id && delete _ids[id];
      var i2 = _triggers.indexOf(self);
      i2 >= 0 && _triggers.splice(i2, 1);
      i2 === _i && _direction > 0 && _i--;
      i2 = 0;
      _triggers.forEach(function(t) {
        return t.scroller === self.scroller && (i2 = 1);
      });
      i2 || _refreshingAll || (self.scroll.rec = 0);
      if (animation) {
        animation.scrollTrigger = null;
        revert && animation.revert({
          kill: false
        });
        allowAnimation || animation.kill();
      }
      markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m) {
        return m.parentNode && m.parentNode.removeChild(m);
      });
      _primary === self && (_primary = 0);
      if (pin) {
        pinCache && (pinCache.uncache = 1);
        i2 = 0;
        _triggers.forEach(function(t) {
          return t.pin === pin && i2++;
        });
        i2 || (pinCache.spacer = 0);
      }
      vars.onKill && vars.onKill(self);
    };
    _triggers.push(self);
    self.enable(false, false);
    customRevertReturn && customRevertReturn(self);
    if (animation && animation.add && !change) {
      var updateFunc = self.update;
      self.update = function() {
        self.update = updateFunc;
        _scrollers.cache++;
        start || end || self.refresh();
      };
      gsap12.delayedCall(0.01, self.update);
      change = 0.01;
      start = end = 0;
    } else {
      self.refresh();
    }
    pin && _queueRefreshAll();
  };
  ScrollTrigger5.register = function register8(core) {
    if (!_coreInitted9) {
      gsap12 = core || _getGSAP19();
      _windowExists11() && window.document && ScrollTrigger5.enable();
      _coreInitted9 = _enabled;
    }
    return _coreInitted9;
  };
  ScrollTrigger5.defaults = function defaults(config) {
    if (config) {
      for (var p2 in config) {
        _defaults[p2] = config[p2];
      }
    }
    return _defaults;
  };
  ScrollTrigger5.disable = function disable(reset, kill5) {
    _enabled = 0;
    _triggers.forEach(function(trigger) {
      return trigger[kill5 ? "kill" : "disable"](reset);
    });
    _removeListener5(_win6, "wheel", _onScroll3);
    _removeListener5(_doc5, "scroll", _onScroll3);
    clearInterval(_syncInterval);
    _removeListener5(_doc5, "touchcancel", _passThrough);
    _removeListener5(_body6, "touchstart", _passThrough);
    _multiListener(_removeListener5, _doc5, "pointerdown,touchstart,mousedown", _pointerDownHandler);
    _multiListener(_removeListener5, _doc5, "pointerup,touchend,mouseup", _pointerUpHandler);
    _resizeDelay.kill();
    _iterateAutoRefresh(_removeListener5);
    for (var i2 = 0; i2 < _scrollers.length; i2 += 3) {
      _wheelListener(_removeListener5, _scrollers[i2], _scrollers[i2 + 1]);
      _wheelListener(_removeListener5, _scrollers[i2], _scrollers[i2 + 2]);
    }
  };
  ScrollTrigger5.enable = function enable() {
    _win6 = window;
    _doc5 = document;
    _docEl3 = _doc5.documentElement;
    _body6 = _doc5.body;
    if (gsap12) {
      _toArray5 = gsap12.utils.toArray;
      _clamp2 = gsap12.utils.clamp;
      _context3 = gsap12.core.context || _passThrough;
      _suppressOverwrites = gsap12.core.suppressOverwrites || _passThrough;
      _scrollRestoration = _win6.history.scrollRestoration || "auto";
      _lastScroll = _win6.pageYOffset || 0;
      gsap12.core.globals("ScrollTrigger", ScrollTrigger5);
      if (_body6) {
        _enabled = 1;
        _div100vh = document.createElement("div");
        _div100vh.style.height = "100vh";
        _div100vh.style.position = "absolute";
        _refresh100vh();
        _rafBugFix();
        Observer.register(gsap12);
        ScrollTrigger5.isTouch = Observer.isTouch;
        _fixIOSBug = Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent);
        _ignoreMobileResize = Observer.isTouch === 1;
        _addListener5(_win6, "wheel", _onScroll3);
        _root2 = [_win6, _doc5, _docEl3, _body6];
        if (gsap12.matchMedia) {
          ScrollTrigger5.matchMedia = function(vars) {
            var mm = gsap12.matchMedia(), p2;
            for (p2 in vars) {
              mm.add(p2, vars[p2]);
            }
            return mm;
          };
          gsap12.addEventListener("matchMediaInit", function() {
            return _revertAll();
          });
          gsap12.addEventListener("matchMediaRevert", function() {
            return _revertRecorded();
          });
          gsap12.addEventListener("matchMedia", function() {
            _refreshAll(0, 1);
            _dispatch("matchMedia");
          });
          gsap12.matchMedia().add("(orientation: portrait)", function() {
            _setBaseDimensions();
            return _setBaseDimensions;
          });
        } else {
          console.warn("Requires GSAP 3.11.0 or later");
        }
        _setBaseDimensions();
        _addListener5(_doc5, "scroll", _onScroll3);
        var bodyHasStyle = _body6.hasAttribute("style"), bodyStyle = _body6.style, border = bodyStyle.borderTopStyle, AnimationProto = gsap12.core.Animation.prototype, bounds, i2;
        AnimationProto.revert || Object.defineProperty(AnimationProto, "revert", {
          value: function value() {
            return this.time(-0.01, true);
          }
        });
        bodyStyle.borderTopStyle = "solid";
        bounds = _getBounds3(_body6);
        _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0;
        _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
        border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style");
        if (!bodyHasStyle) {
          _body6.setAttribute("style", "");
          _body6.removeAttribute("style");
        }
        _syncInterval = setInterval(_sync, 250);
        gsap12.delayedCall(0.5, function() {
          return _startup2 = 0;
        });
        _addListener5(_doc5, "touchcancel", _passThrough);
        _addListener5(_body6, "touchstart", _passThrough);
        _multiListener(_addListener5, _doc5, "pointerdown,touchstart,mousedown", _pointerDownHandler);
        _multiListener(_addListener5, _doc5, "pointerup,touchend,mouseup", _pointerUpHandler);
        _transformProp3 = gsap12.utils.checkPrefix("transform");
        _stateProps.push(_transformProp3);
        _coreInitted9 = _getTime3();
        _resizeDelay = gsap12.delayedCall(0.2, _refreshAll).pause();
        _autoRefresh = [_doc5, "visibilitychange", function() {
          var w = _win6.innerWidth, h = _win6.innerHeight;
          if (_doc5.hidden) {
            _prevWidth = w;
            _prevHeight = h;
          } else if (_prevWidth !== w || _prevHeight !== h) {
            _onResize();
          }
        }, _doc5, "DOMContentLoaded", _refreshAll, _win6, "load", _refreshAll, _win6, "resize", _onResize];
        _iterateAutoRefresh(_addListener5);
        _triggers.forEach(function(trigger) {
          return trigger.enable(0, 1);
        });
        for (i2 = 0; i2 < _scrollers.length; i2 += 3) {
          _wheelListener(_removeListener5, _scrollers[i2], _scrollers[i2 + 1]);
          _wheelListener(_removeListener5, _scrollers[i2], _scrollers[i2 + 2]);
        }
      }
    }
  };
  ScrollTrigger5.config = function config(vars) {
    "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
    var ms = vars.syncInterval;
    ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
    "ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger5.isTouch === 1 && vars.ignoreMobileResize);
    if ("autoRefreshEvents" in vars) {
      _iterateAutoRefresh(_removeListener5) || _iterateAutoRefresh(_addListener5, vars.autoRefreshEvents || "none");
      _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
    }
  };
  ScrollTrigger5.scrollerProxy = function scrollerProxy(target, vars) {
    var t = _getTarget(target), i2 = _scrollers.indexOf(t), isViewport = _isViewport3(t);
    if (~i2) {
      _scrollers.splice(i2, isViewport ? 6 : 2);
    }
    if (vars) {
      isViewport ? _proxies.unshift(_win6, vars, _body6, vars, _docEl3, vars) : _proxies.unshift(t, vars);
    }
  };
  ScrollTrigger5.clearMatchMedia = function clearMatchMedia(query) {
    _triggers.forEach(function(t) {
      return t._ctx && t._ctx.query === query && t._ctx.kill(true, true);
    });
  };
  ScrollTrigger5.isInViewport = function isInViewport(element, ratio, horizontal) {
    var bounds = (_isString7(element) ? _getTarget(element) : element).getBoundingClientRect(), offset = bounds[horizontal ? _width : _height] * ratio || 0;
    return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win6.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win6.innerHeight;
  };
  ScrollTrigger5.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
    _isString7(element) && (element = _getTarget(element));
    var bounds = element.getBoundingClientRect(), size = bounds[horizontal ? _width : _height], offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
    return horizontal ? (bounds.left + offset) / _win6.innerWidth : (bounds.top + offset) / _win6.innerHeight;
  };
  ScrollTrigger5.killAll = function killAll(allowListeners) {
    _triggers.slice(0).forEach(function(t) {
      return t.vars.id !== "ScrollSmoother" && t.kill();
    });
    if (allowListeners !== true) {
      var listeners = _listeners.killAll || [];
      _listeners = {};
      listeners.forEach(function(f) {
        return f();
      });
    }
  };
  return ScrollTrigger5;
}();
ScrollTrigger3.version = "3.13.0";
ScrollTrigger3.saveStyles = function(targets) {
  return targets ? _toArray5(targets).forEach(function(target) {
    if (target && target.style) {
      var i2 = _savedStyles.indexOf(target);
      i2 >= 0 && _savedStyles.splice(i2, 5);
      _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap12.core.getCache(target), _context3());
    }
  }) : _savedStyles;
};
ScrollTrigger3.revert = function(soft, media) {
  return _revertAll(!soft, media);
};
ScrollTrigger3.create = function(vars, animation) {
  return new ScrollTrigger3(vars, animation);
};
ScrollTrigger3.refresh = function(safe) {
  return safe ? _onResize(true) : (_coreInitted9 || ScrollTrigger3.register()) && _refreshAll(true);
};
ScrollTrigger3.update = function(force) {
  return ++_scrollers.cache && _updateAll(force === true ? 2 : 0);
};
ScrollTrigger3.clearScrollMemory = _clearScrollMemory;
ScrollTrigger3.maxScroll = function(element, horizontal) {
  return _maxScroll(element, horizontal ? _horizontal : _vertical);
};
ScrollTrigger3.getScrollFunc = function(element, horizontal) {
  return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
};
ScrollTrigger3.getById = function(id) {
  return _ids[id];
};
ScrollTrigger3.getAll = function() {
  return _triggers.filter(function(t) {
    return t.vars.id !== "ScrollSmoother";
  });
};
ScrollTrigger3.isScrolling = function() {
  return !!_lastScrollTime;
};
ScrollTrigger3.snapDirectional = _snapDirectional;
ScrollTrigger3.addEventListener = function(type, callback) {
  var a = _listeners[type] || (_listeners[type] = []);
  ~a.indexOf(callback) || a.push(callback);
};
ScrollTrigger3.removeEventListener = function(type, callback) {
  var a = _listeners[type], i2 = a && a.indexOf(callback);
  i2 >= 0 && a.splice(i2, 1);
};
ScrollTrigger3.batch = function(targets, vars) {
  var result = [], varsCopy = {}, interval = vars.interval || 0.016, batchMax = vars.batchMax || 1e9, proxyCallback = function proxyCallback2(type, callback) {
    var elements = [], triggers = [], delay = gsap12.delayedCall(interval, function() {
      callback(elements, triggers);
      elements = [];
      triggers = [];
    }).pause();
    return function(self) {
      elements.length || delay.restart(true);
      elements.push(self.trigger);
      triggers.push(self);
      batchMax <= elements.length && delay.progress(1);
    };
  }, p2;
  for (p2 in vars) {
    varsCopy[p2] = p2.substr(0, 2) === "on" && _isFunction7(vars[p2]) && p2 !== "onRefreshInit" ? proxyCallback(p2, vars[p2]) : vars[p2];
  }
  if (_isFunction7(batchMax)) {
    batchMax = batchMax();
    _addListener5(ScrollTrigger3, "refresh", function() {
      return batchMax = vars.batchMax();
    });
  }
  _toArray5(targets).forEach(function(target) {
    var config = {};
    for (p2 in varsCopy) {
      config[p2] = varsCopy[p2];
    }
    config.trigger = target;
    result.push(ScrollTrigger3.create(config));
  });
  return result;
};
var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier2(scrollFunc, current, end, max) {
  current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
  return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
};
var _allowNativePanning = function _allowNativePanning2(target, direction) {
  if (direction === true) {
    target.style.removeProperty("touch-action");
  } else {
    target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (Observer.isTouch ? " pinch-zoom" : "") : "none";
  }
  target === _docEl3 && _allowNativePanning2(_body6, direction);
};
var _overflow = {
  auto: 1,
  scroll: 1
};
var _nestedScroll = function _nestedScroll2(_ref5) {
  var event = _ref5.event, target = _ref5.target, axis = _ref5.axis;
  var node = (event.changedTouches ? event.changedTouches[0] : event).target, cache = node._gsap || gsap12.core.getCache(node), time = _getTime3(), cs;
  if (!cache._isScrollT || time - cache._isScrollT > 2e3) {
    while (node && node !== _body6 && (node.scrollHeight <= node.clientHeight && node.scrollWidth <= node.clientWidth || !(_overflow[(cs = _getComputedStyle3(node)).overflowY] || _overflow[cs.overflowX]))) {
      node = node.parentNode;
    }
    cache._isScroll = node && node !== target && !_isViewport3(node) && (_overflow[(cs = _getComputedStyle3(node)).overflowY] || _overflow[cs.overflowX]);
    cache._isScrollT = time;
  }
  if (cache._isScroll || axis === "x") {
    event.stopPropagation();
    event._gsapAllow = true;
  }
};
var _inputObserver = function _inputObserver2(target, type, inputs, nested) {
  return Observer.create({
    target,
    capture: true,
    debounce: false,
    lockAxis: true,
    type,
    onWheel: nested = nested && _nestedScroll,
    onPress: nested,
    onDrag: nested,
    onScroll: nested,
    onEnable: function onEnable() {
      return inputs && _addListener5(_doc5, Observer.eventTypes[0], _captureInputs, false, true);
    },
    onDisable: function onDisable() {
      return _removeListener5(_doc5, Observer.eventTypes[0], _captureInputs, true);
    }
  });
};
var _inputExp = /(input|label|select|textarea)/i;
var _inputIsFocused;
var _captureInputs = function _captureInputs2(e) {
  var isInput = _inputExp.test(e.target.tagName);
  if (isInput || _inputIsFocused) {
    e._gsapAllow = true;
    _inputIsFocused = isInput;
  }
};
var _getScrollNormalizer = function _getScrollNormalizer2(vars) {
  _isObject3(vars) || (vars = {});
  vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
  vars.type || (vars.type = "wheel,touch");
  vars.debounce = !!vars.debounce;
  vars.id = vars.id || "normalizer";
  var _vars2 = vars, normalizeScrollX = _vars2.normalizeScrollX, momentum = _vars2.momentum, allowNestedScroll = _vars2.allowNestedScroll, onRelease = _vars2.onRelease, self, maxY, target = _getTarget(vars.target) || _docEl3, smoother = gsap12.core.globals().ScrollSmoother, smootherInstance = smoother && smoother.get(), content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smootherInstance && vars.content !== false && !smootherInstance.smooth() && smootherInstance.content()), scrollFuncY = _getScrollFunc(target, _vertical), scrollFuncX = _getScrollFunc(target, _horizontal), scale = 1, initialScale = (Observer.isTouch && _win6.visualViewport ? _win6.visualViewport.scale * _win6.visualViewport.width : _win6.outerWidth) / _win6.innerWidth, wheelRefresh = 0, resolveMomentumDuration = _isFunction7(momentum) ? function() {
    return momentum(self);
  } : function() {
    return momentum || 2.8;
  }, lastRefreshID, skipTouchMove, inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll), resumeTouchMove = function resumeTouchMove2() {
    return skipTouchMove = false;
  }, scrollClampX = _passThrough, scrollClampY = _passThrough, updateClamps = function updateClamps2() {
    maxY = _maxScroll(target, _vertical);
    scrollClampY = _clamp2(_fixIOSBug ? 1 : 0, maxY);
    normalizeScrollX && (scrollClampX = _clamp2(0, _maxScroll(target, _horizontal)));
    lastRefreshID = _refreshID;
  }, removeContentOffset = function removeContentOffset2() {
    content._gsap.y = _round9(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
    content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
    scrollFuncY.offset = scrollFuncY.cacheID = 0;
  }, ignoreDrag = function ignoreDrag2() {
    if (skipTouchMove) {
      requestAnimationFrame(resumeTouchMove);
      var offset = _round9(self.deltaY / 2), scroll = scrollClampY(scrollFuncY.v - offset);
      if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
        scrollFuncY.offset = scroll - scrollFuncY.v;
        var y = _round9((parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset);
        content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
        content._gsap.y = y + "px";
        scrollFuncY.cacheID = _scrollers.cache;
        _updateAll();
      }
      return true;
    }
    scrollFuncY.offset && removeContentOffset();
    skipTouchMove = true;
  }, tween, startScrollX, startScrollY, onStopDelayedCall, onResize = function onResize2() {
    updateClamps();
    if (tween.isActive() && tween.vars.scrollY > maxY) {
      scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
    }
  };
  content && gsap12.set(content, {
    y: "+=0"
  });
  vars.ignoreCheck = function(e) {
    return _fixIOSBug && e.type === "touchmove" && ignoreDrag(e) || scale > 1.05 && e.type !== "touchstart" || self.isGesturing || e.touches && e.touches.length > 1;
  };
  vars.onPress = function() {
    skipTouchMove = false;
    var prevScale = scale;
    scale = _round9((_win6.visualViewport && _win6.visualViewport.scale || 1) / initialScale);
    tween.pause();
    prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
    startScrollX = scrollFuncX();
    startScrollY = scrollFuncY();
    updateClamps();
    lastRefreshID = _refreshID;
  };
  vars.onRelease = vars.onGestureStart = function(self2, wasDragging) {
    scrollFuncY.offset && removeContentOffset();
    if (!wasDragging) {
      onStopDelayedCall.restart(true);
    } else {
      _scrollers.cache++;
      var dur = resolveMomentumDuration(), currentScroll, endScroll;
      if (normalizeScrollX) {
        currentScroll = scrollFuncX();
        endScroll = currentScroll + dur * 0.05 * -self2.velocityX / 0.227;
        dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
        tween.vars.scrollX = scrollClampX(endScroll);
      }
      currentScroll = scrollFuncY();
      endScroll = currentScroll + dur * 0.05 * -self2.velocityY / 0.227;
      dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
      tween.vars.scrollY = scrollClampY(endScroll);
      tween.invalidate().duration(dur).play(0.01);
      if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) {
        gsap12.to({}, {
          onUpdate: onResize,
          duration: dur
        });
      }
    }
    onRelease && onRelease(self2);
  };
  vars.onWheel = function() {
    tween._ts && tween.pause();
    if (_getTime3() - wheelRefresh > 1e3) {
      lastRefreshID = 0;
      wheelRefresh = _getTime3();
    }
  };
  vars.onChange = function(self2, dx, dy, xArray, yArray) {
    _refreshID !== lastRefreshID && updateClamps();
    dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self2.startX - self2.x) : scrollFuncX() + dx - xArray[1]));
    if (dy) {
      scrollFuncY.offset && removeContentOffset();
      var isTouch = yArray[2] === dy, y = isTouch ? startScrollY + self2.startY - self2.y : scrollFuncY() + dy - yArray[1], yClamped = scrollClampY(y);
      isTouch && y !== yClamped && (startScrollY += yClamped - y);
      scrollFuncY(yClamped);
    }
    (dy || dx) && _updateAll();
  };
  vars.onEnable = function() {
    _allowNativePanning(target, normalizeScrollX ? false : "x");
    ScrollTrigger3.addEventListener("refresh", onResize);
    _addListener5(_win6, "resize", onResize);
    if (scrollFuncY.smooth) {
      scrollFuncY.target.style.scrollBehavior = "auto";
      scrollFuncY.smooth = scrollFuncX.smooth = false;
    }
    inputObserver.enable();
  };
  vars.onDisable = function() {
    _allowNativePanning(target, true);
    _removeListener5(_win6, "resize", onResize);
    ScrollTrigger3.removeEventListener("refresh", onResize);
    inputObserver.kill();
  };
  vars.lockAxis = vars.lockAxis !== false;
  self = new Observer(vars);
  self.iOS = _fixIOSBug;
  _fixIOSBug && !scrollFuncY() && scrollFuncY(1);
  _fixIOSBug && gsap12.ticker.add(_passThrough);
  onStopDelayedCall = self._dc;
  tween = gsap12.to(self, {
    ease: "power4",
    paused: true,
    inherit: false,
    scrollX: normalizeScrollX ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: _interruptionTracker(scrollFuncY, scrollFuncY(), function() {
        return tween.pause();
      })
    },
    onUpdate: _updateAll,
    onComplete: onStopDelayedCall.vars.onComplete
  });
  return self;
};
ScrollTrigger3.sort = function(func) {
  if (_isFunction7(func)) {
    return _triggers.sort(func);
  }
  var scroll = _win6.pageYOffset || 0;
  ScrollTrigger3.getAll().forEach(function(t) {
    return t._sortY = t.trigger ? scroll + t.trigger.getBoundingClientRect().top : t.start + _win6.innerHeight;
  });
  return _triggers.sort(func || function(a, b) {
    return (a.vars.refreshPriority || 0) * -1e6 + (a.vars.containerAnimation ? 1e6 : a._sortY) - ((b.vars.containerAnimation ? 1e6 : b._sortY) + (b.vars.refreshPriority || 0) * -1e6);
  });
};
ScrollTrigger3.observe = function(vars) {
  return new Observer(vars);
};
ScrollTrigger3.normalizeScroll = function(vars) {
  if (typeof vars === "undefined") {
    return _normalizer2;
  }
  if (vars === true && _normalizer2) {
    return _normalizer2.enable();
  }
  if (vars === false) {
    _normalizer2 && _normalizer2.kill();
    _normalizer2 = vars;
    return;
  }
  var normalizer = vars instanceof Observer ? vars : _getScrollNormalizer(vars);
  _normalizer2 && _normalizer2.target === normalizer.target && _normalizer2.kill();
  _isViewport3(normalizer.target) && (_normalizer2 = normalizer);
  return normalizer;
};
ScrollTrigger3.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp,
  _inputObserver,
  _scrollers,
  _proxies,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function ss() {
      _lastScrollTime || _dispatch("scrollStart");
      _lastScrollTime = _getTime3();
    },
    // a way to get the _refreshing value in Observer
    ref: function ref() {
      return _refreshing;
    }
  }
};
_getGSAP19() && gsap12.registerPlugin(ScrollTrigger3);

// node_modules/gsap/utils/strings.js
var _trimExp = /(?:^\s+|\s+$)/g;
var emojiExp = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2642\u2640]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDD27\uDCBC\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCC\uDFCB]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;
function getText(e) {
  var type = e.nodeType, result = "";
  if (type === 1 || type === 9 || type === 11) {
    if (typeof e.textContent === "string") {
      return e.textContent;
    } else {
      for (e = e.firstChild; e; e = e.nextSibling) {
        result += getText(e);
      }
    }
  } else if (type === 3 || type === 4) {
    return e.nodeValue;
  }
  return result;
}
function splitInnerHTML(element, delimiter, trim, preserveSpaces, unescapedCharCodes) {
  var node = element.firstChild, result = [], s;
  while (node) {
    if (node.nodeType === 3) {
      s = (node.nodeValue + "").replace(/^\n+/g, "");
      if (!preserveSpaces) {
        s = s.replace(/\s+/g, " ");
      }
      result.push.apply(result, emojiSafeSplit(s, delimiter, trim, preserveSpaces, unescapedCharCodes));
    } else if ((node.nodeName + "").toLowerCase() === "br") {
      result[result.length - 1] += "<br>";
    } else {
      result.push(node.outerHTML);
    }
    node = node.nextSibling;
  }
  if (!unescapedCharCodes) {
    s = result.length;
    while (s--) {
      result[s] === "&" && result.splice(s, 1, "&amp;");
    }
  }
  return result;
}
function emojiSafeSplit(text, delimiter, trim, preserveSpaces, unescapedCharCodes) {
  text += "";
  trim && (text = text.trim ? text.trim() : text.replace(_trimExp, ""));
  if (delimiter && delimiter !== "") {
    return text.replace(/>/g, "&gt;").replace(/</g, "&lt;").split(delimiter);
  }
  var result = [], l = text.length, i2 = 0, j, character;
  for (; i2 < l; i2++) {
    character = text.charAt(i2);
    if (character.charCodeAt(0) >= 55296 && character.charCodeAt(0) <= 56319 || text.charCodeAt(i2 + 1) >= 65024 && text.charCodeAt(i2 + 1) <= 65039) {
      j = ((text.substr(i2, 12).split(emojiExp) || [])[1] || "").length || 2;
      character = text.substr(i2, j);
      result.emoji = 1;
      i2 += j - 1;
    }
    result.push(unescapedCharCodes ? character : character === ">" ? "&gt;" : character === "<" ? "&lt;" : preserveSpaces && character === " " && (text.charAt(i2 - 1) === " " || text.charAt(i2 + 1) === " ") ? "&nbsp;" : character);
  }
  return result;
}

// node_modules/gsap/TextPlugin.js
var gsap13;
var _tempDiv2;
var _getGSAP21 = function _getGSAP22() {
  return gsap13 || typeof window !== "undefined" && (gsap13 = window.gsap) && gsap13.registerPlugin && gsap13;
};
var TextPlugin = {
  version: "3.13.0",
  name: "text",
  init: function init6(target, value, tween) {
    typeof value !== "object" && (value = {
      value
    });
    var i2 = target.nodeName.toUpperCase(), data = this, _value = value, newClass = _value.newClass, oldClass = _value.oldClass, preserveSpaces = _value.preserveSpaces, rtl = _value.rtl, delimiter = data.delimiter = value.delimiter || "", fillChar = data.fillChar = value.fillChar || (value.padSpace ? "&nbsp;" : ""), _short, text, original, j, condensedText, condensedOriginal, aggregate, s;
    data.svg = target.getBBox && (i2 === "TEXT" || i2 === "TSPAN");
    if (!("innerHTML" in target) && !data.svg) {
      return false;
    }
    data.target = target;
    if (!("value" in value)) {
      data.text = data.original = [""];
      return;
    }
    original = splitInnerHTML(target, delimiter, false, preserveSpaces, data.svg);
    _tempDiv2 || (_tempDiv2 = document.createElement("div"));
    _tempDiv2.innerHTML = value.value;
    text = splitInnerHTML(_tempDiv2, delimiter, false, preserveSpaces, data.svg);
    data.from = tween._from;
    if ((data.from || rtl) && !(rtl && data.from)) {
      i2 = original;
      original = text;
      text = i2;
    }
    data.hasClass = !!(newClass || oldClass);
    data.newClass = rtl ? oldClass : newClass;
    data.oldClass = rtl ? newClass : oldClass;
    i2 = original.length - text.length;
    _short = i2 < 0 ? original : text;
    if (i2 < 0) {
      i2 = -i2;
    }
    while (--i2 > -1) {
      _short.push(fillChar);
    }
    if (value.type === "diff") {
      j = 0;
      condensedText = [];
      condensedOriginal = [];
      aggregate = "";
      for (i2 = 0; i2 < text.length; i2++) {
        s = text[i2];
        if (s === original[i2]) {
          aggregate += s;
        } else {
          condensedText[j] = aggregate + s;
          condensedOriginal[j++] = aggregate + original[i2];
          aggregate = "";
        }
      }
      text = condensedText;
      original = condensedOriginal;
      if (aggregate) {
        text.push(aggregate);
        original.push(aggregate);
      }
    }
    value.speed && tween.duration(Math.min(0.05 / value.speed * _short.length, value.maxDuration || 9999));
    data.rtl = rtl;
    data.original = original;
    data.text = text;
    data._props.push("text");
  },
  render: function render5(ratio, data) {
    if (ratio > 1) {
      ratio = 1;
    } else if (ratio < 0) {
      ratio = 0;
    }
    if (data.from) {
      ratio = 1 - ratio;
    }
    var text = data.text, hasClass = data.hasClass, newClass = data.newClass, oldClass = data.oldClass, delimiter = data.delimiter, target = data.target, fillChar = data.fillChar, original = data.original, rtl = data.rtl, l = text.length, i2 = (rtl ? 1 - ratio : ratio) * l + 0.5 | 0, applyNew, applyOld, str;
    if (hasClass && ratio) {
      applyNew = newClass && i2;
      applyOld = oldClass && i2 !== l;
      str = (applyNew ? "<span class='" + newClass + "'>" : "") + text.slice(0, i2).join(delimiter) + (applyNew ? "</span>" : "") + (applyOld ? "<span class='" + oldClass + "'>" : "") + delimiter + original.slice(i2).join(delimiter) + (applyOld ? "</span>" : "");
    } else {
      str = text.slice(0, i2).join(delimiter) + delimiter + original.slice(i2).join(delimiter);
    }
    if (data.svg) {
      target.textContent = str;
    } else {
      target.innerHTML = fillChar === "&nbsp;" && ~str.indexOf("  ") ? str.split("  ").join("&nbsp;&nbsp;") : str;
    }
  }
};
TextPlugin.splitInnerHTML = splitInnerHTML;
TextPlugin.emojiSafeSplit = emojiSafeSplit;
TextPlugin.getText = getText;
_getGSAP21() && gsap13.registerPlugin(TextPlugin);

// node_modules/gsap/DrawSVGPlugin.js
var gsap14;
var _toArray6;
var _doc6;
var _win7;
var _isEdge;
var _coreInitted10;
var _warned;
var _getStyleSaver4;
var _reverting2;
var _windowExists13 = function _windowExists14() {
  return typeof window !== "undefined";
};
var _getGSAP23 = function _getGSAP24() {
  return gsap14 || _windowExists13() && (gsap14 = window.gsap) && gsap14.registerPlugin && gsap14;
};
var _numExp3 = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi;
var _types = {
  rect: ["width", "height"],
  circle: ["r", "r"],
  ellipse: ["rx", "ry"],
  line: ["x2", "y2"]
};
var _round11 = function _round12(value) {
  return Math.round(value * 1e4) / 1e4;
};
var _parseNum = function _parseNum2(value) {
  return parseFloat(value) || 0;
};
var _parseSingleVal = function _parseSingleVal2(value, length) {
  var num = _parseNum(value);
  return ~value.indexOf("%") ? num / 100 * length : num;
};
var _getAttributeAsNumber = function _getAttributeAsNumber2(target, attr) {
  return _parseNum(target.getAttribute(attr));
};
var _sqrt2 = Math.sqrt;
var _getDistance = function _getDistance2(x1, y1, x2, y2, scaleX, scaleY) {
  return _sqrt2(Math.pow((_parseNum(x2) - _parseNum(x1)) * scaleX, 2) + Math.pow((_parseNum(y2) - _parseNum(y1)) * scaleY, 2));
};
var _warn5 = function _warn6(message) {
  return console.warn(message);
};
var _hasNonScalingStroke = function _hasNonScalingStroke2(target) {
  return target.getAttribute("vector-effect") === "non-scaling-stroke";
};
var _bonusValidated2 = 1;
var _parse = function _parse2(value, length, defaultStart) {
  var i2 = value.indexOf(" "), s, e;
  if (i2 < 0) {
    s = defaultStart !== void 0 ? defaultStart + "" : value;
    e = value;
  } else {
    s = value.substr(0, i2);
    e = value.substr(i2 + 1);
  }
  s = _parseSingleVal(s, length);
  e = _parseSingleVal(e, length);
  return s > e ? [e, s] : [s, e];
};
var _getLength = function _getLength2(target) {
  target = _toArray6(target)[0];
  if (!target) {
    return 0;
  }
  var type = target.tagName.toLowerCase(), style = target.style, scaleX = 1, scaleY = 1, length, bbox, points, prevPoint, i2, rx, ry;
  if (_hasNonScalingStroke(target)) {
    scaleY = target.getScreenCTM();
    scaleX = _sqrt2(scaleY.a * scaleY.a + scaleY.b * scaleY.b);
    scaleY = _sqrt2(scaleY.d * scaleY.d + scaleY.c * scaleY.c);
  }
  try {
    bbox = target.getBBox();
  } catch (e) {
    _warn5("Some browsers won't measure invisible elements (like display:none or masks inside defs).");
  }
  var _ref = bbox || {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }, x = _ref.x, y = _ref.y, width = _ref.width, height = _ref.height;
  if ((!bbox || !width && !height) && _types[type]) {
    width = _getAttributeAsNumber(target, _types[type][0]);
    height = _getAttributeAsNumber(target, _types[type][1]);
    if (type !== "rect" && type !== "line") {
      width *= 2;
      height *= 2;
    }
    if (type === "line") {
      x = _getAttributeAsNumber(target, "x1");
      y = _getAttributeAsNumber(target, "y1");
      width = Math.abs(width - x);
      height = Math.abs(height - y);
    }
  }
  if (type === "path") {
    prevPoint = style.strokeDasharray;
    style.strokeDasharray = "none";
    length = target.getTotalLength() || 0;
    _round11(scaleX) !== _round11(scaleY) && !_warned && (_warned = 1) && _warn5("Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled.");
    length *= (scaleX + scaleY) / 2;
    style.strokeDasharray = prevPoint;
  } else if (type === "rect") {
    length = width * 2 * scaleX + height * 2 * scaleY;
  } else if (type === "line") {
    length = _getDistance(x, y, x + width, y + height, scaleX, scaleY);
  } else if (type === "polyline" || type === "polygon") {
    points = target.getAttribute("points").match(_numExp3) || [];
    type === "polygon" && points.push(points[0], points[1]);
    length = 0;
    for (i2 = 2; i2 < points.length; i2 += 2) {
      length += _getDistance(points[i2 - 2], points[i2 - 1], points[i2], points[i2 + 1], scaleX, scaleY) || 0;
    }
  } else if (type === "circle" || type === "ellipse") {
    rx = width / 2 * scaleX;
    ry = height / 2 * scaleY;
    length = Math.PI * (3 * (rx + ry) - _sqrt2((3 * rx + ry) * (rx + 3 * ry)));
  }
  return length || 0;
};
var _getPosition = function _getPosition2(target, length) {
  target = _toArray6(target)[0];
  if (!target) {
    return [0, 0];
  }
  length || (length = _getLength(target) + 1);
  var cs = _win7.getComputedStyle(target), dash = cs.strokeDasharray || "", offset = _parseNum(cs.strokeDashoffset), i2 = dash.indexOf(",");
  i2 < 0 && (i2 = dash.indexOf(" "));
  dash = i2 < 0 ? length : _parseNum(dash.substr(0, i2));
  dash > length && (dash = length);
  return [-offset || 0, dash - offset || 0];
};
var _initCore17 = function _initCore18() {
  if (_windowExists13()) {
    _doc6 = document;
    _win7 = window;
    _coreInitted10 = gsap14 = _getGSAP23();
    _toArray6 = gsap14.utils.toArray;
    _getStyleSaver4 = gsap14.core.getStyleSaver;
    _reverting2 = gsap14.core.reverting || function() {
    };
    _isEdge = ((_win7.navigator || {}).userAgent || "").indexOf("Edge") !== -1;
  }
};
var DrawSVGPlugin = {
  version: "3.13.0",
  name: "drawSVG",
  register: function register4(core) {
    gsap14 = core;
    _initCore17();
  },
  init: function init7(target, value, tween, index, targets) {
    if (!target.getBBox) {
      return false;
    }
    _coreInitted10 || _initCore17();
    var length = _getLength(target), start, end, cs;
    this.styles = _getStyleSaver4 && _getStyleSaver4(target, "strokeDashoffset,strokeDasharray,strokeMiterlimit");
    this.tween = tween;
    this._style = target.style;
    this._target = target;
    if (value + "" === "true") {
      value = "0 100%";
    } else if (!value) {
      value = "0 0";
    } else if ((value + "").indexOf(" ") === -1) {
      value = "0 " + value;
    }
    start = _getPosition(target, length);
    end = _parse(value, length, start[0]);
    this._length = _round11(length);
    this._dash = _round11(start[1] - start[0]);
    this._offset = _round11(-start[0]);
    this._dashPT = this.add(this, "_dash", this._dash, _round11(end[1] - end[0]), 0, 0, 0, 0, 0, 1);
    this._offsetPT = this.add(this, "_offset", this._offset, _round11(-end[0]), 0, 0, 0, 0, 0, 1);
    if (_isEdge) {
      cs = _win7.getComputedStyle(target);
      if (cs.strokeLinecap !== cs.strokeLinejoin) {
        end = _parseNum(cs.strokeMiterlimit);
        this.add(target.style, "strokeMiterlimit", end, end + 0.01);
      }
    }
    this._live = _hasNonScalingStroke(target) || ~(value + "").indexOf("live");
    this._nowrap = ~(value + "").indexOf("nowrap");
    this._props.push("drawSVG");
    return _bonusValidated2;
  },
  render: function render6(ratio, data) {
    if (data.tween._time || !_reverting2()) {
      var pt = data._pt, style = data._style, length, lengthRatio, dash, offset;
      if (pt) {
        if (data._live) {
          length = _getLength(data._target);
          if (length !== data._length) {
            lengthRatio = length / data._length;
            data._length = length;
            if (data._offsetPT) {
              data._offsetPT.s *= lengthRatio;
              data._offsetPT.c *= lengthRatio;
            }
            if (data._dashPT) {
              data._dashPT.s *= lengthRatio;
              data._dashPT.c *= lengthRatio;
            } else {
              data._dash *= lengthRatio;
            }
          }
        }
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
        dash = data._dash || ratio && ratio !== 1 && 1e-4 || 0;
        length = data._length - dash + 0.1;
        offset = data._offset;
        dash && offset && dash + Math.abs(offset % data._length) > data._length - 0.05 && (offset += offset < 0 ? 5e-3 : -5e-3) && (length += 5e-3);
        style.strokeDashoffset = dash ? offset : offset + 1e-3;
        style.strokeDasharray = length < 0.1 ? "none" : dash ? dash + "px," + (data._nowrap ? 999999 : length) + "px" : "0px, 999999px";
      }
    } else {
      data.styles.revert();
    }
  },
  getLength: _getLength,
  getPosition: _getPosition
};
_getGSAP23() && gsap14.registerPlugin(DrawSVGPlugin);

// node_modules/gsap/Physics2DPlugin.js
var gsap15;
var _coreInitted11;
var _getUnit2;
var _getStyleSaver5;
var _reverting3;
var _DEG2RAD5 = Math.PI / 180;
var _getGSAP25 = function _getGSAP26() {
  return gsap15 || typeof window !== "undefined" && (gsap15 = window.gsap) && gsap15.registerPlugin && gsap15;
};
var _round13 = function _round14(value) {
  return Math.round(value * 1e4) / 1e4;
};
var _initCore19 = function _initCore20(core) {
  gsap15 = core || _getGSAP25();
  if (!_coreInitted11) {
    _getUnit2 = gsap15.utils.getUnit;
    _getStyleSaver5 = gsap15.core.getStyleSaver;
    _reverting3 = gsap15.core.reverting || function() {
    };
    _coreInitted11 = 1;
  }
};
var PhysicsProp = function PhysicsProp2(target, p2, velocity, acceleration, stepsPerTimeUnit) {
  var cache = target._gsap, curVal = cache.get(target, p2);
  this.p = p2;
  this.set = cache.set(target, p2);
  this.s = this.val = parseFloat(curVal);
  this.u = _getUnit2(curVal) || 0;
  this.vel = velocity || 0;
  this.v = this.vel / stepsPerTimeUnit;
  if (acceleration || acceleration === 0) {
    this.acc = acceleration;
    this.a = this.acc / (stepsPerTimeUnit * stepsPerTimeUnit);
  } else {
    this.acc = this.a = 0;
  }
};
var Physics2DPlugin = {
  version: "3.13.0",
  name: "physics2D",
  register: _initCore19,
  init: function init8(target, value, tween) {
    _coreInitted11 || _initCore19();
    var data = this, angle = +value.angle || 0, velocity = +value.velocity || 0, acceleration = +value.acceleration || 0, xProp = value.xProp || "x", yProp = value.yProp || "y", aAngle = value.accelerationAngle || value.accelerationAngle === 0 ? +value.accelerationAngle : angle;
    data.styles = _getStyleSaver5 && _getStyleSaver5(target, value.xProp && value.xProp !== "x" ? value.xProp + "," + value.yProp : "transform");
    data.target = target;
    data.tween = tween;
    data.step = 0;
    data.sps = 30;
    if (value.gravity) {
      acceleration = +value.gravity;
      aAngle = 90;
    }
    angle *= _DEG2RAD5;
    aAngle *= _DEG2RAD5;
    data.fr = 1 - (+value.friction || 0);
    data._props.push(xProp, yProp);
    data.xp = new PhysicsProp(target, xProp, Math.cos(angle) * velocity, Math.cos(aAngle) * acceleration, data.sps);
    data.yp = new PhysicsProp(target, yProp, Math.sin(angle) * velocity, Math.sin(aAngle) * acceleration, data.sps);
    data.skipX = data.skipY = 0;
  },
  render: function render7(ratio, data) {
    var xp = data.xp, yp = data.yp, tween = data.tween, target = data.target, step = data.step, sps = data.sps, fr = data.fr, skipX = data.skipX, skipY = data.skipY, time = tween._from ? tween._dur - tween._time : tween._time, x, y, tt, steps, remainder, i2;
    if (tween._time || !_reverting3()) {
      if (fr === 1) {
        tt = time * time * 0.5;
        x = xp.s + xp.vel * time + xp.acc * tt;
        y = yp.s + yp.vel * time + yp.acc * tt;
      } else {
        time *= sps;
        steps = i2 = (time | 0) - step;
        if (i2 < 0) {
          xp.v = xp.vel / sps;
          yp.v = yp.vel / sps;
          xp.val = xp.s;
          yp.val = yp.s;
          data.step = 0;
          steps = i2 = time | 0;
        }
        remainder = time % 1 * fr;
        while (i2--) {
          xp.v += xp.a;
          yp.v += yp.a;
          xp.v *= fr;
          yp.v *= fr;
          xp.val += xp.v;
          yp.val += yp.v;
        }
        x = xp.val + xp.v * remainder;
        y = yp.val + yp.v * remainder;
        data.step += steps;
      }
      skipX || xp.set(target, xp.p, _round13(x) + xp.u);
      skipY || yp.set(target, yp.p, _round13(y) + yp.u);
    } else {
      data.styles.revert();
    }
  },
  kill: function kill2(property) {
    if (this.xp.p === property) {
      this.skipX = 1;
    }
    if (this.yp.p === property) {
      this.skipY = 1;
    }
  }
};
_getGSAP25() && gsap15.registerPlugin(Physics2DPlugin);

// node_modules/gsap/PhysicsPropsPlugin.js
var gsap16;
var _coreInitted12;
var _getUnit3;
var _getStyleSaver6;
var _reverting4;
var _getGSAP27 = function _getGSAP28() {
  return gsap16 || typeof window !== "undefined" && (gsap16 = window.gsap) && gsap16.registerPlugin && gsap16;
};
var _round15 = function _round16(value) {
  return Math.round(value * 1e4) / 1e4;
};
var _initCore21 = function _initCore22(core) {
  gsap16 = core || _getGSAP27();
  if (!_coreInitted12) {
    _getUnit3 = gsap16.utils.getUnit;
    _getStyleSaver6 = gsap16.core.getStyleSaver;
    _reverting4 = gsap16.core.reverting || function() {
    };
    _coreInitted12 = 1;
  }
};
var PhysicsProp3 = function PhysicsProp4(target, p2, velocity, acceleration, friction, stepsPerTimeUnit) {
  var cache = target._gsap, curVal = cache.get(target, p2);
  this.p = p2;
  this.set = cache.set(target, p2);
  this.s = this.val = parseFloat(curVal);
  this.u = _getUnit3(curVal) || 0;
  this.vel = velocity || 0;
  this.v = this.vel / stepsPerTimeUnit;
  if (acceleration || acceleration === 0) {
    this.acc = acceleration;
    this.a = this.acc / (stepsPerTimeUnit * stepsPerTimeUnit);
  } else {
    this.acc = this.a = 0;
  }
  this.fr = 1 - (friction || 0);
};
var PhysicsPropsPlugin = {
  version: "3.13.0",
  name: "physicsProps",
  register: _initCore21,
  init: function init9(target, value, tween) {
    _coreInitted12 || _initCore21();
    var data = this, p2;
    data.styles = _getStyleSaver6 && _getStyleSaver6(target);
    data.target = target;
    data.tween = tween;
    data.step = 0;
    data.sps = 30;
    data.vProps = [];
    for (p2 in value) {
      var _value$p = value[p2], velocity = _value$p.velocity, acceleration = _value$p.acceleration, friction = _value$p.friction;
      if (velocity || acceleration) {
        data.vProps.push(new PhysicsProp3(target, p2, velocity, acceleration, friction, data.sps));
        data._props.push(p2);
        _getStyleSaver6 && data.styles.save(p2);
        friction && (data.hasFr = 1);
      }
    }
  },
  render: function render8(ratio, data) {
    var vProps = data.vProps, tween = data.tween, target = data.target, step = data.step, hasFr = data.hasFr, sps = data.sps, i2 = vProps.length, time = tween._from ? tween._dur - tween._time : tween._time, curProp, steps, remainder, j, tt;
    if (tween._time || !_reverting4()) {
      if (hasFr) {
        time *= sps;
        steps = (time | 0) - step;
        if (steps < 0) {
          while (i2--) {
            curProp = vProps[i2];
            curProp.v = curProp.vel / sps;
            curProp.val = curProp.s;
          }
          i2 = vProps.length;
          data.step = step = 0;
          steps = time | 0;
        }
        remainder = time % 1;
        while (i2--) {
          curProp = vProps[i2];
          j = steps;
          while (j--) {
            curProp.v += curProp.a;
            curProp.v *= curProp.fr;
            curProp.val += curProp.v;
          }
          curProp.set(target, curProp.p, _round15(curProp.val + curProp.v * remainder * curProp.fr) + curProp.u);
        }
        data.step += steps;
      } else {
        tt = time * time * 0.5;
        while (i2--) {
          curProp = vProps[i2];
          curProp.set(target, curProp.p, _round15(curProp.s + curProp.vel * time + curProp.acc * tt) + curProp.u);
        }
      }
    } else {
      data.styles.revert();
    }
  },
  kill: function kill3(property) {
    var vProps = this.vProps, i2 = vProps.length;
    while (i2--) {
      vProps[i2].p === property && vProps.splice(i2, 1);
    }
  }
};
_getGSAP27() && gsap16.registerPlugin(PhysicsPropsPlugin);

// node_modules/gsap/ScrambleTextPlugin.js
var CharSet = function() {
  function CharSet2(chars) {
    this.chars = emojiSafeSplit(chars);
    this.sets = [];
    this.length = 50;
    for (var i2 = 0; i2 < 20; i2++) {
      this.sets[i2] = _scrambleText(80, this.chars);
    }
  }
  var _proto = CharSet2.prototype;
  _proto.grow = function grow(newLength) {
    for (var i2 = 0; i2 < 20; i2++) {
      this.sets[i2] += _scrambleText(newLength - this.length, this.chars);
    }
    this.length = newLength;
  };
  return CharSet2;
}();
var gsap17;
var _coreInitted13;
var _getGSAP29 = function _getGSAP30() {
  return gsap17 || typeof window !== "undefined" && (gsap17 = window.gsap) && gsap17.registerPlugin && gsap17;
};
var _bonusValidated3 = 1;
var _spacesExp = /\s+/g;
var _scrambleText = function _scrambleText2(length, chars) {
  var l = chars.length, s = "";
  while (--length > -1) {
    s += chars[~~(Math.random() * l)];
  }
  return s;
};
var _upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var _lower = _upper.toLowerCase();
var _charsLookup = {
  upperCase: new CharSet(_upper),
  lowerCase: new CharSet(_lower),
  upperAndLowerCase: new CharSet(_upper + _lower)
};
var _initCore23 = function _initCore24() {
  _coreInitted13 = gsap17 = _getGSAP29();
};
var ScrambleTextPlugin = {
  version: "3.13.0",
  name: "scrambleText",
  register: function register5(core, Plugin, propTween) {
    gsap17 = core;
    _initCore23();
  },
  init: function init10(target, value, tween, index, targets) {
    _coreInitted13 || _initCore23();
    this.prop = "innerHTML" in target ? "innerHTML" : "textContent" in target ? "textContent" : 0;
    if (!this.prop) {
      return;
    }
    this.target = target;
    if (typeof value !== "object") {
      value = {
        text: value
      };
    }
    var text = value.text || value.value || "", trim = value.trim !== false, data = this, delim, maxLength, charset, splitByChars;
    data.delimiter = delim = value.delimiter || "";
    data.original = emojiSafeSplit(getText(target).replace(_spacesExp, " ").split("&nbsp;").join(""), delim, trim);
    if (text === "{original}" || text === true || text == null) {
      text = data.original.join(delim);
    }
    data.text = emojiSafeSplit((text || "").replace(_spacesExp, " "), delim, trim);
    data.hasClass = !!(value.newClass || value.oldClass);
    data.newClass = value.newClass;
    data.oldClass = value.oldClass;
    splitByChars = delim === "";
    data.textHasEmoji = splitByChars && !!data.text.emoji;
    data.charsHaveEmoji = !!value.chars && !!emojiSafeSplit(value.chars).emoji;
    data.length = splitByChars ? data.original.length : data.original.join(delim).length;
    data.lengthDif = (splitByChars ? data.text.length : data.text.join(delim).length) - data.length;
    data.fillChar = value.fillChar || value.chars && ~value.chars.indexOf(" ") ? "&nbsp;" : "";
    data.charSet = charset = _charsLookup[value.chars || "upperCase"] || new CharSet(value.chars);
    data.speed = 0.05 / (value.speed || 1);
    data.prevScrambleTime = 0;
    data.setIndex = Math.random() * 20 | 0;
    maxLength = data.length + Math.max(data.lengthDif, 0);
    if (maxLength > charset.length) {
      charset.grow(maxLength);
    }
    data.chars = charset.sets[data.setIndex];
    data.revealDelay = value.revealDelay || 0;
    data.tweenLength = value.tweenLength !== false;
    data.tween = tween;
    data.rightToLeft = !!value.rightToLeft;
    data._props.push("scrambleText", "text");
    return _bonusValidated3;
  },
  render: function render9(ratio, data) {
    var target = data.target, prop = data.prop, text = data.text, delimiter = data.delimiter, tween = data.tween, prevScrambleTime = data.prevScrambleTime, revealDelay = data.revealDelay, setIndex = data.setIndex, chars = data.chars, charSet = data.charSet, length = data.length, textHasEmoji = data.textHasEmoji, charsHaveEmoji = data.charsHaveEmoji, lengthDif = data.lengthDif, tweenLength = data.tweenLength, oldClass = data.oldClass, newClass = data.newClass, rightToLeft = data.rightToLeft, fillChar = data.fillChar, speed = data.speed, original = data.original, hasClass = data.hasClass, l = text.length, time = tween._time, timeDif = time - prevScrambleTime, i2, i22, startText, endText, applyNew, applyOld, str, startClass, endClass, position, r;
    if (revealDelay) {
      if (tween._from) {
        time = tween._dur - time;
      }
      ratio = time === 0 ? 0 : time < revealDelay ? 1e-6 : time === tween._dur ? 1 : tween._ease((time - revealDelay) / (tween._dur - revealDelay));
    }
    if (ratio < 0) {
      ratio = 0;
    } else if (ratio > 1) {
      ratio = 1;
    }
    if (rightToLeft) {
      ratio = 1 - ratio;
    }
    i2 = ~~(ratio * l + 0.5);
    if (ratio) {
      if (timeDif > speed || timeDif < -speed) {
        data.setIndex = setIndex = (setIndex + (Math.random() * 19 | 0)) % 20;
        data.chars = charSet.sets[setIndex];
        data.prevScrambleTime += timeDif;
      }
      endText = chars;
    } else {
      endText = original.join(delimiter);
    }
    r = tween._from ? ratio : 1 - ratio;
    position = length + (tweenLength ? tween._from ? r * r * r : 1 - r * r * r : 1) * lengthDif;
    if (rightToLeft) {
      if (ratio === 1 && (tween._from || tween.data === "isFromStart")) {
        startText = "";
        endText = original.join(delimiter);
      } else {
        str = text.slice(i2).join(delimiter);
        if (charsHaveEmoji) {
          startText = emojiSafeSplit(endText).slice(0, position - (textHasEmoji ? emojiSafeSplit(str) : str).length + 0.5 | 0).join("");
        } else {
          startText = endText.substr(0, position - (textHasEmoji ? emojiSafeSplit(str) : str).length + 0.5 | 0);
        }
        endText = str;
      }
    } else {
      startText = text.slice(0, i2).join(delimiter);
      i22 = (textHasEmoji ? emojiSafeSplit(startText) : startText).length;
      if (charsHaveEmoji) {
        endText = emojiSafeSplit(endText).slice(i22, position + 0.5 | 0).join("");
      } else {
        endText = endText.substr(i22, position - i22 + 0.5 | 0);
      }
    }
    if (hasClass) {
      startClass = rightToLeft ? oldClass : newClass;
      endClass = rightToLeft ? newClass : oldClass;
      applyNew = startClass && i2 !== 0;
      applyOld = endClass && i2 !== l;
      str = (applyNew ? "<span class='" + startClass + "'>" : "") + startText + (applyNew ? "</span>" : "") + (applyOld ? "<span class='" + endClass + "'>" : "") + delimiter + endText + (applyOld ? "</span>" : "");
    } else {
      str = startText + delimiter + endText;
    }
    target[prop] = fillChar === "&nbsp;" && ~str.indexOf("  ") ? str.split("  ").join("&nbsp;&nbsp;") : str;
  }
};
ScrambleTextPlugin.emojiSafeSplit = emojiSafeSplit;
ScrambleTextPlugin.getText = getText;
_getGSAP29() && gsap17.registerPlugin(ScrambleTextPlugin);

// node_modules/gsap/CustomBounce.js
var gsap18;
var _coreInitted14;
var createCustomEase;
var _getGSAP31 = function _getGSAP32() {
  return gsap18 || typeof window !== "undefined" && (gsap18 = window.gsap) && gsap18.registerPlugin && gsap18;
};
var _initCore25 = function _initCore26(required) {
  gsap18 = _getGSAP31();
  createCustomEase = gsap18 && gsap18.parseEase("_CE");
  if (createCustomEase) {
    _coreInitted14 = 1;
    gsap18.parseEase("bounce").config = function(vars) {
      return typeof vars === "object" ? _create("", vars) : _create("bounce(" + vars + ")", {
        strength: +vars
      });
    };
  } else {
    required && console.warn("Please gsap.registerPlugin(CustomEase, CustomBounce)");
  }
};
var _normalizeX = function _normalizeX2(a) {
  var l = a.length, s = 1 / a[l - 2], rnd = 1e3, i2;
  for (i2 = 2; i2 < l; i2 += 2) {
    a[i2] = ~~(a[i2] * s * rnd) / rnd;
  }
  a[l - 2] = 1;
};
var _bonusValidated4 = 1;
var _create = function _create2(id, vars) {
  if (!_coreInitted14) {
    _initCore25(1);
  }
  vars = vars || {};
  if (_bonusValidated4) {
    var max = 0.999, decay = Math.min(max, vars.strength || 0.7), decayX = decay, gap = (vars.squash || 0) / 100, originalGap = gap, slope = 1 / 0.03, w = 0.2, h = 1, prevX = 0.1, path = [0, 0, 0.07, 0, 0.1, 1, 0.1, 1], squashPath = [0, 0, 0, 0, 0.1, 0, 0.1, 0], cp1, cp2, x, y, i2, nextX, squishMagnitude;
    for (i2 = 0; i2 < 200; i2++) {
      w *= decayX * ((decayX + 1) / 2);
      h *= decay * decay;
      nextX = prevX + w;
      x = prevX + w * 0.49;
      y = 1 - h;
      cp1 = prevX + h / slope;
      cp2 = x + (x - cp1) * 0.8;
      if (gap) {
        prevX += gap;
        cp1 += gap;
        x += gap;
        cp2 += gap;
        nextX += gap;
        squishMagnitude = gap / originalGap;
        squashPath.push(
          prevX - gap,
          0,
          prevX - gap,
          squishMagnitude,
          prevX - gap / 2,
          squishMagnitude,
          //center peak anchor
          prevX,
          squishMagnitude,
          prevX,
          0,
          prevX,
          0,
          //base anchor
          prevX,
          squishMagnitude * -0.6,
          prevX + (nextX - prevX) / 6,
          0,
          nextX,
          0
        );
        path.push(prevX - gap, 1, prevX, 1, prevX, 1);
        gap *= decay * decay;
      }
      path.push(prevX, 1, cp1, y, x, y, cp2, y, nextX, 1, nextX, 1);
      decay *= 0.95;
      slope = h / (nextX - cp2);
      prevX = nextX;
      if (y > max) {
        break;
      }
    }
    if (vars.endAtStart && vars.endAtStart !== "false") {
      x = -0.1;
      path.unshift(x, 1, x, 1, -0.07, 0);
      if (originalGap) {
        gap = originalGap * 2.5;
        x -= gap;
        path.unshift(x, 1, x, 1, x, 1);
        squashPath.splice(0, 6);
        squashPath.unshift(x, 0, x, 0, x, 1, x + gap / 2, 1, x + gap, 1, x + gap, 0, x + gap, 0, x + gap, -0.6, x + gap + 0.033, 0);
        for (i2 = 0; i2 < squashPath.length; i2 += 2) {
          squashPath[i2] -= x;
        }
      }
      for (i2 = 0; i2 < path.length; i2 += 2) {
        path[i2] -= x;
        path[i2 + 1] = 1 - path[i2 + 1];
      }
    }
    if (gap) {
      _normalizeX(squashPath);
      squashPath[2] = "C" + squashPath[2];
      createCustomEase(vars.squashID || id + "-squash", "M" + squashPath.join(","));
    }
    _normalizeX(path);
    path[2] = "C" + path[2];
    return createCustomEase(id, "M" + path.join(","));
  }
};
var CustomBounce = function() {
  function CustomBounce2(id, vars) {
    this.ease = _create(id, vars);
  }
  CustomBounce2.create = function create(id, vars) {
    return _create(id, vars);
  };
  CustomBounce2.register = function register8(core) {
    gsap18 = core;
    _initCore25();
  };
  return CustomBounce2;
}();
_getGSAP31() && gsap18.registerPlugin(CustomBounce);
CustomBounce.version = "3.13.0";

// node_modules/gsap/CustomWiggle.js
var gsap19;
var _coreInitted15;
var createCustomEase2;
var _getGSAP33 = function _getGSAP34() {
  return gsap19 || typeof window !== "undefined" && (gsap19 = window.gsap) && gsap19.registerPlugin && gsap19;
};
var _eases = {
  easeOut: "M0,1,C0.7,1,0.6,0,1,0",
  easeInOut: "M0,0,C0.1,0,0.24,1,0.444,1,0.644,1,0.6,0,1,0",
  anticipate: "M0,0,C0,0.222,0.024,0.386,0,0.4,0.18,0.455,0.65,0.646,0.7,0.67,0.9,0.76,1,0.846,1,1",
  uniform: "M0,0,C0,0.95,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0"
};
var _linearEase = function _linearEase2(p2) {
  return p2;
};
var _initCore27 = function _initCore28(required) {
  if (!_coreInitted15) {
    gsap19 = _getGSAP33();
    createCustomEase2 = gsap19 && gsap19.parseEase("_CE");
    if (createCustomEase2) {
      for (var p2 in _eases) {
        _eases[p2] = createCustomEase2("", _eases[p2]);
      }
      _coreInitted15 = 1;
      _create3("wiggle").config = function(vars) {
        return typeof vars === "object" ? _create3("", vars) : _create3("wiggle(" + vars + ")", {
          wiggles: +vars
        });
      };
    } else {
      required && console.warn("Please gsap.registerPlugin(CustomEase, CustomWiggle)");
    }
  }
};
var _parseEase = function _parseEase2(ease, invertNonCustomEases) {
  if (typeof ease !== "function") {
    ease = gsap19.parseEase(ease) || createCustomEase2("", ease);
  }
  return ease.custom || !invertNonCustomEases ? ease : function(p2) {
    return 1 - ease(p2);
  };
};
var _bonusValidated5 = 1;
var _create3 = function _create4(id, vars) {
  if (!_coreInitted15) {
    _initCore27(1);
  }
  vars = vars || {};
  var wiggles = (vars.wiggles || 10) | 0, inc = 1 / wiggles, x = inc / 2, anticipate = vars.type === "anticipate", yEase = _eases[vars.type] || _eases.easeOut, xEase = _linearEase, rnd = 1e3, nextX, nextY, angle, handleX, handleY, easedX, y, path, i2;
  if (_bonusValidated5) {
    if (anticipate) {
      xEase = yEase;
      yEase = _eases.easeOut;
    }
    if (vars.timingEase) {
      xEase = _parseEase(vars.timingEase);
    }
    if (vars.amplitudeEase) {
      yEase = _parseEase(vars.amplitudeEase, true);
    }
    easedX = xEase(x);
    y = anticipate ? -yEase(x) : yEase(x);
    path = [0, 0, easedX / 4, 0, easedX / 2, y, easedX, y];
    if (vars.type === "random") {
      path.length = 4;
      nextX = xEase(inc);
      nextY = Math.random() * 2 - 1;
      for (i2 = 2; i2 < wiggles; i2++) {
        x = nextX;
        y = nextY;
        nextX = xEase(inc * i2);
        nextY = Math.random() * 2 - 1;
        angle = Math.atan2(nextY - path[path.length - 3], nextX - path[path.length - 4]);
        handleX = Math.cos(angle) * inc;
        handleY = Math.sin(angle) * inc;
        path.push(x - handleX, y - handleY, x, y, x + handleX, y + handleY);
      }
      path.push(nextX, 0, 1, 0);
    } else {
      for (i2 = 1; i2 < wiggles; i2++) {
        path.push(xEase(x + inc / 2), y);
        x += inc;
        y = (y > 0 ? -1 : 1) * yEase(i2 * inc);
        easedX = xEase(x);
        path.push(xEase(x - inc / 2), y, easedX, y);
      }
      path.push(xEase(x + inc / 4), y, xEase(x + inc / 4), 0, 1, 0);
    }
    i2 = path.length;
    while (--i2 > -1) {
      path[i2] = ~~(path[i2] * rnd) / rnd;
    }
    path[2] = "C" + path[2];
    return createCustomEase2(id, "M" + path.join(","));
  }
};
var CustomWiggle = function() {
  function CustomWiggle2(id, vars) {
    this.ease = _create3(id, vars);
  }
  CustomWiggle2.create = function create(id, vars) {
    return _create3(id, vars);
  };
  CustomWiggle2.register = function register8(core) {
    gsap19 = core;
    _initCore27();
  };
  return CustomWiggle2;
}();
_getGSAP33() && gsap19.registerPlugin(CustomWiggle);
CustomWiggle.version = "3.13.0";

// node_modules/gsap/GSDevTools.js
var gsap20;
var _coreInitted16;
var _doc7;
var _docEl4;
var _win8;
var _recordedRoot;
var Animation;
var _rootTween;
var _rootInstance;
var _keyboardInstance;
var _globalTimeline;
var _independentRoot;
var _delayedCall;
var _context4;
var _recording = true;
var _startupPhase = true;
var _globalStartTime = 0;
var _windowExists15 = function _windowExists16() {
  return typeof window !== "undefined";
};
var _getGSAP35 = function _getGSAP36() {
  return gsap20 || _windowExists15() && (gsap20 = window.gsap) && gsap20.registerPlugin && gsap20;
};
var _isString9 = function _isString10(value) {
  return typeof value === "string";
};
var _isFunction9 = function _isFunction10(value) {
  return typeof value === "function";
};
var _isObject5 = function _isObject6(value) {
  return typeof value === "object";
};
var _isUndefined5 = function _isUndefined6(value) {
  return typeof value === "undefined";
};
var _svgNS = "http://www.w3.org/2000/svg";
var _domNS = "http://www.w3.org/1999/xhtml";
var _idSeed = 0;
var _lookup2 = {};
var _supportsStorage = function() {
  try {
    sessionStorage.setItem("gsTest", "1");
    sessionStorage.removeItem("gsTest");
    return true;
  } catch (e) {
    return false;
  }
}();
var _parseAnimation = function _parseAnimation2(animationOrId) {
  return animationOrId instanceof Animation ? animationOrId : animationOrId ? gsap20.getById(animationOrId) : null;
};
var _createElement3 = function _createElement4(type, container, cssText) {
  var element = _doc7.createElementNS ? _doc7.createElementNS(type === "svg" ? _svgNS : _domNS, type) : _doc7.createElement(type);
  if (container) {
    if (_isString9(container)) {
      container = _doc7.querySelector(container);
    }
    container.appendChild(element);
  }
  if (type === "svg") {
    element.setAttribute("xmlns", _svgNS);
    element.setAttribute("xmlns:xlink", _domNS);
  }
  cssText && (element.style.cssText = cssText);
  return element;
};
var _clearSelection = function _clearSelection2() {
  if (_doc7.selection) {
    _doc7.selection.empty();
  } else if (_win8.getSelection) {
    _win8.getSelection().removeAllRanges();
  }
};
var _getChildrenOf = function _getChildrenOf2(timeline, includeTimelines) {
  var a = [], cnt = 0, Tween2 = gsap20.core.Tween, tween = timeline._first;
  while (tween) {
    if (tween instanceof Tween2) {
      if (tween.vars.id) {
        a[cnt++] = tween;
      }
    } else {
      if (includeTimelines && tween.vars.id) {
        a[cnt++] = tween;
      }
      a = a.concat(_getChildrenOf2(tween, includeTimelines));
      cnt = a.length;
    }
    tween = tween._next;
  }
  return a;
};
var _getClippedDuration = function _getClippedDuration2(animation, excludeRootRepeats) {
  var max = 0, repeat = Math.max(0, animation._repeat), t = animation._first;
  if (!t) {
    max = animation.duration();
  }
  while (t) {
    max = Math.max(max, t.totalDuration() > 999 ? t.endTime(false) : t._start + t._tDur / t._ts);
    t = t._next;
  }
  return !excludeRootRepeats && repeat ? max * (repeat + 1) + animation._rDelay * repeat : max;
};
var _globalizeTime = function _globalizeTime2(animation, rawTime) {
  var a = animation, time = arguments.length > 1 ? +rawTime : a.rawTime();
  while (a) {
    time = a._start + time / (a._ts || 1);
    a = a.parent;
  }
  return time;
};
var _timeToProgress = function _timeToProgress2(time, animation, defaultValue, relativeProgress) {
  var add, i2, a;
  if (_isString9(time)) {
    if (time.charAt(1) === "=") {
      add = parseInt(time.charAt(0) + "1", 10) * parseFloat(time.substr(2));
      if (add < 0 && relativeProgress === 0) {
        relativeProgress = 100;
      }
      time = relativeProgress / 100 * animation.duration() + add;
    } else if (isNaN(time) && animation.labels && animation.labels[time] !== -1) {
      time = animation.labels[time];
    } else if (animation === _recordedRoot) {
      i2 = time.indexOf("=");
      if (i2 > 0) {
        add = parseInt(time.charAt(i2 - 1) + "1", 10) * parseFloat(time.substr(i2 + 1));
        time = time.substr(0, i2 - 1);
      } else {
        add = 0;
      }
      a = gsap20.getById(time);
      if (a) {
        time = _globalizeTime(a, defaultValue / 100 * a.duration()) + add;
      }
    }
  }
  time = isNaN(time) ? defaultValue : parseFloat(time);
  return Math.min(100, Math.max(0, time / animation.duration() * 100));
};
var _addedCSS;
var _createRootElement = function _createRootElement2(element, minimal, css) {
  if (!_addedCSS) {
    _createElement3("style", _docEl4).innerHTML = ".gs-dev-tools{height:51px;bottom:0;left:0;right:0;display:block;position:fixed;overflow:visible;padding:0;font-size:15px;font-family:-apple-system,BlinkMacSystemFont,avenir next,sans-serif;color:#bbbaa6}.gs-dev-tools *{box-sizing:content-box;visibility:visible}.gs-dev-tools .gs-top{position:relative;z-index:499}.gs-dev-tools .gs-bottom{display:flex;align-items:center;justify-content:space-between;gap:1rem;background-color:#0e100f;height:42px;position:relative}.gs-dev-tools .timeline{position:relative;height:8px;margin-left:15px;margin-right:15px;overflow:visible}.gs-dev-tools .progress-bar,.gs-dev-tools .timeline-track{height:8px;position:absolute;top:0;left:-15px;right:-15px}.gs-dev-tools .timeline-track{background-color:#222}.gs-dev-tools .progress-bar{background:linear-gradient(114.41deg,#0ae448 20.74%,#abff84 65.5%);height:8px;top:0;width:0;pointer-events:none}.gs-dev-tools .seek-bar{width:100%;position:absolute;height:24px;top:-12px;left:0;background-color:transparent}.gs-dev-tools .in-point,.gs-dev-tools .out-point{width:15px;height:26px;position:absolute;top:-18px}.gs-dev-tools .in-point-shape{fill:#0ae448;transform:translateX(1px)}.gs-dev-tools .out-point-shape{fill:#ff8709}.gs-dev-tools .in-point{transform:translateX(-100%)}.gs-dev-tools .out-point{left:100%}.gs-dev-tools .playhead{position:absolute;top:-5px;transform:translate(-50%,0);left:0;border-radius:50%;width:16px;height:16px;background:linear-gradient(114.41deg,#0ae448 20.74%,#abff84 65.5%)}.gs-dev-tools .gs-btn-white{fill:#fffce1}.gs-dev-tools .pause{opacity:0}.gs-dev-tools .select-animation{vertical-align:middle;position:relative;padding:6px 10px}.gs-dev-tools .select-animation-container{flex-grow:4;width:40%}.gs-dev-tools .select-arrow{display:inline-block;width:12px;height:7px;margin:0 7px;transform:translate(0,-2px)}.gs-dev-tools .select-arrow-shape{stroke:currentcolor;stroke-width:2px;fill:none}.gs-dev-tools .rewind{height:14px}.gs-dev-tools .ease-border,.gs-dev-tools .rewind-path{fill:currentColor}.gs-dev-tools .play-pause{width:18px;height:18px}.gs-dev-tools .ease{width:20px;height:20px;min-width:30px;display:none}.gs-dev-tools .ease-path{fill:none;stroke:#abff84;stroke-width:2px}.gs-dev-tools .time-scale{text-align:center;min-width:30px}.gs-dev-tools .loop{width:15px}.gs-dev-tools label span{text-decoration:none}.gs-dev-tools button:focus,.gs-dev-tools select:focus{outline:0}.gs-dev-tools label{position:relative;cursor:pointer}.gs-dev-tools label.locked{text-decoration:none;cursor:auto}.gs-dev-tools label input,.gs-dev-tools label select{position:absolute;left:0;top:0;z-index:1;font:inherit;font-size:inherit;line-height:inherit;height:100%;width:100%;color:#000!important;opacity:0;background:0 0;border:none;padding:0;margin:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer}.gs-dev-tools label input+.display{position:relative;z-index:2}.gs-dev-tools .gs-bottom-right{vertical-align:middle;display:flex;align-items:center;flex-grow:4;width:40%;justify-content:flex-end}.gs-dev-tools .time-container{margin:0 5px}.gs-dev-tools .logo{width:32px;height:32px;position:relative;top:2px;margin:0 12px}.gs-dev-tools .gs-hit-area{background-color:transparent;width:100%;height:100%;top:0;position:absolute}.gs-dev-tools.minimal{height:auto;display:flex;align-items:stretch}.gs-dev-tools.minimal .gs-top{order:2;flex-grow:4;background-color:#000}.gs-dev-tools.minimal .gs-bottom{background-color:#0e100f;border-top:none}.gs-dev-tools.minimal .timeline{top:50%;transform:translate(0,-50%)}.gs-dev-tools.minimal .gs-bottom-right,.gs-dev-tools.minimal .in-point,.gs-dev-tools.minimal .out-point,.gs-dev-tools.minimal .rewind,.gs-dev-tools.minimal .select-animation-container{display:none}.gs-dev-tools.minimal .play-pause{width:20px;height:20px;padding:4px 6px;margin-left:14px}.gs-dev-tools.minimal .time-scale{min-width:26px}.gs-dev-tools.minimal .loop{width:18px;min-width:18px;display:none}@media only screen and (max-width:600px){.gs-dev-tools{height:auto;display:flex;align-items:stretch}.gs-dev-tools .gs-top{order:2;flex-grow:4;background-color:#000;height:42px}.gs-dev-tools .gs-bottom{background-color:#000;border-top:none}.gs-dev-tools .timeline{top:50%;transform:translate(0,-50%)}.gs-dev-tools .gs-bottom-right,.gs-dev-tools .in-point,.gs-dev-tools .out-point,.gs-dev-tools .rewind,.gs-dev-tools .select-animation-container{display:none}.gs-dev-tools .play-pause{width:18px;height:18px;padding:4px 6px;margin-left:14px}.gs-dev-tools .time-scale{min-width:26px}.gs-dev-tools .loop{width:18px;min-width:18px;display:none}.gs-dev-tools .progress-bar,.gs-dev-tools .timeline-track{right:0}}";
    _addedCSS = true;
  }
  if (_isString9(element)) {
    element = _doc7.querySelector(element);
  }
  var root = _createElement3("div", element || _docEl4.getElementsByTagName("body")[0] || _docEl4);
  root.setAttribute("class", "gs-dev-tools" + (minimal ? " minimal" : ""));
  root.innerHTML = '<div class=gs-hit-area></div><div class=gs-top><div class=timeline><div class=timeline-track></div><div class=progress-bar></div><div class=seek-bar></div><svg class=in-point viewBox="0 0 15 26" xmlns=http://www.w3.org/2000/svg><path class=in-point-shape d="M0.5,2.283c0,-0.985 0.798,-1.783 1.783,-1.783c2.679,0 7.717,0 10.41,0c0.48,-0 0.939,0.19 1.278,0.529c0.339,0.339 0.529,0.798 0.529,1.277c-0,4.821 -0,17.897 0,21.968c0,0.253 -0.135,0.488 -0.354,0.615c-0.22,0.128 -0.49,0.128 -0.711,0.003c-2.653,-1.517 -9.526,-5.444 -12.016,-6.867c-0.568,-0.325 -0.919,-0.929 -0.919,-1.583c-0,-2.835 -0,-10.627 -0,-14.159Z" style="fill:#00ff52;fill-rule:nonzero;"/></svg><svg class=out-point viewBox="0 0 15 26" xmlns=http://www.w3.org/2000/svg><path class=out-point-shape d="M0.5,2.251c0,-0.465 0.184,-0.91 0.513,-1.238c0.328,-0.329 0.773,-0.513 1.238,-0.513c2.669,0 7.733,0 10.439,0c0.48,-0 0.94,0.191 1.28,0.53c0.339,0.34 0.53,0.8 0.53,1.28l0,14.17c-0,0.631 -0.338,1.213 -0.886,1.526c-2.44,1.395 -9.262,5.293 -11.977,6.845c-0.236,0.134 -0.524,0.133 -0.759,-0.003c-0.234,-0.136 -0.378,-0.386 -0.378,-0.657c0,-4.178 0,-17.198 0,-21.94Z" style="fill-rule:nonzero;"/></svg><div class=playhead></div></div></div><div class=gs-bottom><div class=select-animation-container><label class=select-animation><select class=animation-list><option>Global Timeline<option>myTimeline</select><nobr><span class="display animation-label">Global Timeline</span><svg class=select-arrow viewBox="0 0 12.05 6.73" xmlns=http://www.w3.org/2000/svg><polyline class=select-arrow-shape points="0.35 0.35 6.03 6.03 11.7 0.35"/></svg></nobr></label></div><svg class=rewind viewBox="0 0 12 15.38" xmlns=http://www.w3.org/2000/svg><path d=M0,.38H2v15H0Zm2,7,10,7.36V0Z class="gs-btn-white rewind-path"/></svg><svg class=play-pause viewBox="0 0 20.97 25.67" xmlns=http://www.w3.org/2000/svg><g class=play><path d="M8,4.88 C8,10.18 8,15.48 8,20.79 5.33,22.41 2.66,24.04 0,25.67 0,17.11 0,8.55 0,0 2.66,1.62 5.33,3.25 8,4.88" class="gs-btn-white play-1" style=stroke:#fffce1;stroke-width:.6px /><path d="M14.485,8.855 C16.64,10.18 18.8,11.5 20.97,12.83 16.64,15.48 12.32,18.13 8,20.79 8,15.48 8,10.18 8,4.88 10.16,6.2 12.32,7.53 14.48,8.85" class="gs-btn-white play-2" style=stroke:#fffce1;stroke-width:.6px /></g></svg> <svg class=loop viewBox="0 0 29 25.38" xmlns=http://www.w3.org/2000/svg fill="currentcolor"><path d=M27.44,5.44,20.19,0V3.06H9.06A9.31,9.31,0,0,0,0,12.41,9.74,9.74,0,0,0,.69,16l3.06-2.23a6,6,0,0,1-.12-1.22,5.49,5.49,0,0,1,5.43-5.5H20.19v3.81Z class=loop-path /><path d=M25.25,11.54a5.18,5.18,0,0,1,.12,1.12,5.41,5.41,0,0,1-5.43,5.41H9.19V14.5L1.94,19.94l7.25,5.44V22.06H19.94A9.2,9.2,0,0,0,29,12.84a9.42,9.42,0,0,0-.68-3.53Z class=loop-path /></svg> <svg class=ease viewBox="0 0 25.67 25.67" xmlns=http://www.w3.org/2000/svg><path d=M.48,25.12c1.74-3.57,4.28-12.6,8.8-10.7s4.75,1.43,6.5-1.11S19.89,1.19,25.2.55 class=ease-path /><path d=M24.67,1V24.67H1V1H24.67m1-1H0V25.67H25.67V0Z class=ease-border /></svg><label class=time-scale><select><option value=10>10x<option value=5>5x<option value=2>2x<option value=1 selected>1x<option value=0.5>0.5x<option value=0.25>0.25x<option value=0.1>0.1x</select><span class="display time-scale-label">1x</span></label><div class=gs-bottom-right><div class=time-container><span class=time>0.00</span> / <span class=duration>0.00</span></div><a href="https://gsap.com/docs/v3/Plugins/GSDevTools?source=GSDevTools" target=_blank title=Docs><svg class="logo" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M793 518.654C793 518.654 793 518.829 793 518.934L770.197 618.386C768.967 624.012 763.38 628.135 756.915 628.135H729.404C727.366 628.135 725.539 629.498 724.977 631.455C699.573 718.082 665.175 777.628 619.745 813.376C581.095 843.813 533.451 858 469.819 858C412.618 858 374.074 839.514 341.362 803.032C298.145 754.809 280.261 675.869 291.083 580.75C310.618 402.184 402.745 222.01 580.217 222.01C634.185 221.521 676.559 238.26 706.039 271.667C737.204 306.995 753.05 360.216 753.121 429.86C753.015 436.185 747.78 441.287 741.491 441.287H611.488C606.885 441.287 602.774 437.129 602.844 432.551C601.79 384.397 587.56 360.915 559.311 360.915C509.488 360.915 480.079 428.917 464.479 466.622C442.694 519.283 431.627 576.452 433.805 633.412C434.824 659.935 439.075 697.22 464.127 712.666C486.333 726.364 518.026 717.279 537.21 702.113C556.394 686.947 571.819 660.703 578.319 636.766C579.233 633.447 579.303 630.861 578.425 629.708C577.511 628.52 574.981 628.24 573.049 628.24H539.67C536.086 628.24 532.537 626.598 530.394 623.942C528.602 621.705 527.899 618.945 528.532 616.219L551.37 516.592C552.494 511.49 557.097 507.647 562.754 506.948V506.703H781.827C782.354 506.703 782.881 506.703 783.373 506.808C789.065 507.542 793.07 512.853 792.965 518.654H793Z" fill="#0AE448"/></svg></a></div></div>';
  if (element) {
    root.style.position = "absolute";
    root.style.top = minimal ? "calc(100% - 42px)" : "calc(100% - 51px)";
  }
  if (css) {
    if (_isString9(css)) {
      root.style.cssText = css;
    } else if (_isObject5(css)) {
      css.data = "root";
      gsap20.set(root, css).kill();
    }
    if (root.style.top) {
      root.style.bottom = "auto";
    }
    if (root.style.width) {
      gsap20.set(root, {
        xPercent: -50,
        left: "50%",
        right: "auto",
        data: "root"
      }).kill();
    }
  }
  if (!minimal && root.offsetWidth < 600) {
    root.setAttribute("class", "gs-dev-tools minimal");
    if (element) {
      root.style.top = "calc(100% - 42px)";
    }
  }
  return root;
};
var _clickedOnce = true;
var _addListener7 = function _addListener8(e, type, callback, capture) {
  var handler, altType;
  if (type === "mousedown" || type === "mouseup") {
    e.style.cursor = "pointer";
  }
  if (type === "mousedown") {
    altType = !_isUndefined5(e.onpointerdown) ? "pointerdown" : !_isUndefined5(e.ontouchstart) ? "touchstart" : null;
    if (altType) {
      handler = function handler2(event) {
        if (event.target.nodeName.toLowerCase() !== "select" && event.type === altType) {
          event.stopPropagation();
          if (_clickedOnce) {
            event.preventDefault();
            callback.call(e, event);
          }
        } else if (event.type !== altType) {
          callback.call(e, event);
        }
        _clickedOnce = true;
      };
      e.addEventListener(altType, handler, capture);
      if (altType !== "pointerdown") {
        e.addEventListener(type, handler, capture);
      }
      return;
    }
  }
  e.addEventListener(type, callback, capture);
};
var _removeListener7 = function _removeListener8(e, type, callback) {
  e.removeEventListener(type, callback);
  type = type !== "mousedown" ? null : !_isUndefined5(e.onpointerdown) ? "pointerdown" : !_isUndefined5(e.ontouchstart) ? "touchstart" : null;
  if (type) {
    e.removeEventListener(type, callback);
  }
};
var _selectValue = function _selectValue2(element, value, label, insertIfAbsent) {
  var options = element.options, i2 = options.length, option;
  value += "";
  while (--i2 > -1) {
    if (options[i2].innerHTML === value || options[i2].value === value) {
      element.selectedIndex = i2;
      label.innerHTML = options[i2].innerHTML;
      return options[i2];
    }
  }
  if (insertIfAbsent) {
    option = _createElement3("option", element);
    option.setAttribute("value", value);
    option.innerHTML = label.innerHTML = _isString9(insertIfAbsent) ? insertIfAbsent : value;
    element.selectedIndex = options.length - 1;
  }
};
var _shiftSelectedValue = function _shiftSelectedValue2(element, amount, label) {
  var options = element.options, i2 = Math.min(options.length - 1, Math.max(0, element.selectedIndex + amount));
  element.selectedIndex = i2;
  if (label) {
    label.innerHTML = options[i2].innerHTML;
  }
  return options[i2].value;
};
var _merge = function _merge2() {
  var t = _globalTimeline._first, duration, next, target;
  if (_rootInstance) {
    duration = _recordedRoot._dur;
    while (t) {
      next = t._next;
      target = t._targets && t._targets[0];
      if (!(_isFunction9(target) && target === t.vars.onComplete && !t._dur) && !(target && target._gsIgnore)) {
        _recordedRoot.add(t, t._start - t._delay);
      }
      t = next;
    }
    return duration !== _recordedRoot.duration();
  }
};
var _buildPlayPauseMorph = function _buildPlayPauseMorph2(svg) {
  var tl = gsap20.timeline({
    data: "root",
    parent: _independentRoot,
    onComplete: function onComplete() {
      return tl.kill();
    }
  }, _independentRoot._time);
  tl.to(svg.querySelector(".play-1"), {
    duration: 0.4,
    attr: {
      d: "M5.75,3.13 C5.75,9.79 5.75,16.46 5.75,23.13 4.08,23.13 2.41,23.13 0.75,23.13 0.75,16.46 0.75,9.79 0.75,3.12 2.41,3.12 4.08,3.12 5.75,3.12"
    },
    ease: "power2.inOut",
    rotation: 360,
    transformOrigin: "50% 50%"
  }).to(svg.querySelector(".play-2"), {
    duration: 0.4,
    attr: {
      d: "M16.38,3.13 C16.38,9.79 16.38,16.46 16.38,23.13 14.71,23.13 13.04,23.13 11.38,23.13 11.38,16.46 11.38,9.79 11.38,3.12 13.04,3.12 14.71,3.12 16.38,3.12"
    },
    ease: "power2.inOut",
    rotation: 360,
    transformOrigin: "50% 50%"
  }, 0.05);
  return tl;
};
var _buildLoopAnimation = function _buildLoopAnimation2(svg) {
  var tl = gsap20.timeline({
    data: "root",
    id: "loop",
    parent: _independentRoot,
    paused: true,
    onComplete: function onComplete() {
      return tl.kill();
    }
  }, _independentRoot._time);
  tl.to(svg, {
    duration: 0.5,
    rotation: 360,
    ease: "power3.inOut",
    transformOrigin: "50% 50%"
  }).to(svg.querySelectorAll(".loop-path"), {
    duration: 0.5,
    fill: "#91e600",
    ease: "none"
  }, 0);
  return tl;
};
var _getAnimationById = function _getAnimationById2(id) {
  return gsap20.getById(id) || _independentRoot.getById(id) || id === _recordedRoot.vars.id && _recordedRoot;
};
var _initCore29 = function _initCore30(core) {
  gsap20 = core || _getGSAP35();
  if (!_coreInitted16) {
    if (gsap20 && _windowExists15()) {
      _doc7 = document;
      _docEl4 = _doc7.documentElement;
      _win8 = window;
      _context4 = gsap20.core.context || function() {
      };
      gsap20.registerPlugin(Draggable);
      _globalTimeline = gsap20.globalTimeline;
      _globalTimeline._sort = true;
      _globalTimeline.autoRemoveChildren = false;
      Animation = gsap20.core.Animation;
      _independentRoot = gsap20.timeline({
        data: "indy",
        autoRemoveChildren: true,
        smoothChildTiming: true
      });
      _independentRoot.kill();
      _independentRoot._dp = 0;
      _independentRoot.to({}, {
        duration: 1e12
      });
      _recordedRoot = gsap20.timeline({
        data: "root",
        id: "Global Timeline",
        autoRemoveChildren: false,
        smoothChildTiming: true,
        parent: _independentRoot
      }, 0);
      _rootTween = gsap20.to(_recordedRoot, {
        duration: 1,
        time: 1,
        ease: "none",
        data: "root",
        id: "_rootTween",
        paused: true,
        immediateRender: false,
        parent: _independentRoot
      }, 0);
      _globalTimeline.killTweensOf = function(targets, props, onlyActive) {
        _recordedRoot.killTweensOf(targets, props, onlyActive);
        _recordedRoot.killTweensOf.call(_globalTimeline, targets, props, onlyActive);
      };
      _independentRoot._start = gsap20.ticker.time;
      gsap20.ticker.add(function(time) {
        return _independentRoot.render(time - _independentRoot._start);
      });
      _globalTimeline._start += _globalTimeline._time;
      _recordedRoot._start = _globalTimeline._time = _globalTimeline._tTime = 0;
      _delayedCall = function _delayedCall2(delay, callback, params, scope) {
        return gsap20.to(callback, {
          delay,
          duration: 0,
          onComplete: callback,
          onReverseComplete: callback,
          onCompleteParams: params,
          onReverseCompleteParams: params,
          callbackScope: scope,
          parent: _independentRoot
        }, _independentRoot._time);
      };
      _delayedCall(0.01, function() {
        return _rootInstance ? _rootInstance.update() : _merge();
      });
      _delayedCall(2, function() {
        var t, next, offset;
        if (!_rootInstance) {
          _merge();
          t = _recordedRoot._first;
          offset = _recordedRoot._start;
          while (t) {
            next = t._next;
            if (t._tDur !== t._tTime || !t._dur && t.progress() !== 1) {
              _globalTimeline.add(t, t._start - t._delay + offset);
            } else {
              t.kill();
            }
            t = next;
          }
        }
        if (GSDevTools.globalRecordingTime > 2) {
          _delayedCall(GSDevTools.globalRecordingTime - 2, function() {
            _rootInstance && _rootInstance.update();
            _recording = false;
            _globalTimeline.autoRemoveChildren = true;
          });
        } else {
          _recording = false;
          _globalTimeline.autoRemoveChildren = true;
        }
        _startupPhase = false;
      });
      _coreInitted16 = 1;
    }
  }
};
var _checkIndependence = function _checkIndependence2(animation, vars) {
  if (!vars.globalSync && animation.parent !== _globalTimeline) {
    _globalTimeline.add(animation, _globalTimeline.time());
  }
};
var GSDevTools = function GSDevTools2(vars) {
  if (!_coreInitted16) {
    _initCore29();
    gsap20 || console.warn("Please gsap.registerPlugin(GSDevTools)");
  }
  this.vars = vars = vars || {};
  if (vars.animation) {
    (GSDevTools2.getByAnimation(vars.animation) || {
      kill: function kill5() {
        return 0;
      }
    }).kill();
  }
  vars.id = vars.id || (_isString9(vars.animation) ? vars.animation : _idSeed++);
  _lookup2[vars.id + ""] = this;
  "globalSync" in vars || (vars.globalSync = !vars.animation);
  var _self = this, root = _createRootElement(vars.container, vars.minimal, vars.css), find = function find2(s) {
    return root.querySelector(s);
  }, record = function record2(key, value) {
    if (vars.persist !== false && _supportsStorage) {
      sessionStorage.setItem("gs-dev-" + key + vars.id, value);
    }
    return value;
  }, recall = function recall2(key) {
    var value;
    if (vars.persist !== false && _supportsStorage) {
      value = sessionStorage.getItem("gs-dev-" + key + vars.id);
      return key === "animation" ? value : key === "loop" ? value === "true" : parseFloat(value);
    }
  }, playhead = find(".playhead"), timelineTrack = find(".timeline-track"), progressBar = find(".progress-bar"), timeLabel = find(".time"), durationLabel = find(".duration"), pixelToTimeRatio, timeAtDragStart, dragged, skipDragUpdates, progress = 0, inPoint = find(".in-point"), outPoint = find(".out-point"), inProgress = 0, outProgress = 100, pausedWhenDragStarted, list = find(".animation-list"), animationLabel = find(".animation-label"), selectedAnimation, linkedAnimation, declaredAnimation, startTime, endTime, _fullyInitialized, keyboardHandler, playPauseButton = find(".play-pause"), playPauseMorph = _buildPlayPauseMorph(playPauseButton), paused = false, loopButton = find(".loop"), loopAnimation = _buildLoopAnimation(loopButton), loopEnabled, timeScale = find(".time-scale select"), timeScaleLabel = find(".time-scale-label"), onPressTimeline = function onPressTimeline2(element, originRatio, limitToInOut) {
    return function(e) {
      var trackBounds = timelineTrack.getBoundingClientRect(), elementBounds = element.getBoundingClientRect(), left = elementBounds.width * originRatio, x = gsap20.getProperty(element, "x"), minX = trackBounds.left - elementBounds.left - left + x, maxX = trackBounds.right - elementBounds.right + (elementBounds.width - left) + x, unlimitedMinX = minX, limitBounds;
      if (limitToInOut) {
        if (element !== inPoint) {
          limitBounds = inPoint.getBoundingClientRect();
          if (limitBounds.left) {
            minX += limitBounds.left + limitBounds.width - trackBounds.left;
          }
        }
        if (element !== outPoint) {
          limitBounds = outPoint.getBoundingClientRect();
          if (limitBounds.left) {
            maxX -= trackBounds.left + trackBounds.width - limitBounds.left;
          }
        }
      }
      pausedWhenDragStarted = paused;
      this.applyBounds({
        minX,
        maxX
      });
      pixelToTimeRatio = linkedAnimation.duration() / trackBounds.width;
      timeAtDragStart = -unlimitedMinX * pixelToTimeRatio;
      if (!skipDragUpdates) {
        linkedAnimation.pause(timeAtDragStart + pixelToTimeRatio * this.x);
      } else {
        linkedAnimation.pause();
      }
      if (this.target === playhead) {
        if (this.activated) {
          this.allowEventDefault = false;
        }
        this.activated = true;
      }
      dragged = true;
    };
  }, progressDrag = Draggable.create(playhead, {
    type: "x",
    cursor: "ew-resize",
    allowNativeTouchScrolling: false,
    allowEventDefault: true,
    //otherwise, when dragged outside an iframe, the mouseup doesn't bubble up so it could seem "stuck" to the mouse.
    onPress: onPressTimeline(playhead, 0.5, true),
    onDrag: function onDrag() {
      var time = timeAtDragStart + pixelToTimeRatio * this.x;
      if (time < 0) {
        time = 0;
      } else if (time > linkedAnimation._dur) {
        time = linkedAnimation._dur;
      }
      if (!skipDragUpdates) {
        linkedAnimation.time(time);
      }
      progressBar.style.width = Math.min(outProgress - inProgress, Math.max(0, time / linkedAnimation._dur * 100 - inProgress)) + "%";
      timeLabel.innerHTML = time.toFixed(2);
    },
    onRelease: function onRelease() {
      paused || linkedAnimation.resume();
    }
  })[0], resetInOut = function resetInOut2() {
    inProgress = 0;
    outProgress = 100;
    inPoint.style.left = "0%";
    outPoint.style.left = "100%";
    record("in", inProgress);
    record("out", outProgress);
    updateProgress(true);
  }, inDrag = Draggable.create(inPoint, {
    type: "x",
    cursor: "ew-resize",
    zIndexBoost: false,
    allowNativeTouchScrolling: false,
    allowEventDefault: true,
    //otherwise, when dragged outside an iframe, the mouseup doesn't bubble up so it could seem "stuck" to the mouse.
    onPress: onPressTimeline(inPoint, 1, true),
    onDoubleClick: resetInOut,
    onDrag: function onDrag() {
      inProgress = (timeAtDragStart + pixelToTimeRatio * this.x) / linkedAnimation.duration() * 100;
      linkedAnimation.progress(inProgress / 100);
      updateProgress(true);
    },
    onRelease: function onRelease() {
      if (inProgress < 0) {
        inProgress = 0;
      }
      _clearSelection();
      inPoint.style.left = inProgress + "%";
      record("in", inProgress);
      gsap20.set(inPoint, {
        x: 0,
        data: "root",
        display: "block"
      });
      if (!paused) {
        linkedAnimation.resume();
      }
    }
  })[0], outDrag = Draggable.create(outPoint, {
    type: "x",
    cursor: "ew-resize",
    allowNativeTouchScrolling: false,
    allowEventDefault: true,
    //otherwise, when dragged outside an iframe, the mouseup doesn't bubble up so it could seem "stuck" to the mouse.
    zIndexBoost: false,
    onPress: onPressTimeline(outPoint, 0, true),
    onDoubleClick: resetInOut,
    onDrag: function onDrag() {
      outProgress = (timeAtDragStart + pixelToTimeRatio * this.x) / linkedAnimation.duration() * 100;
      linkedAnimation.progress(outProgress / 100);
      updateProgress(true);
    },
    onRelease: function onRelease() {
      if (outProgress > 100) {
        outProgress = 100;
      }
      _clearSelection();
      outPoint.style.left = outProgress + "%";
      record("out", outProgress);
      gsap20.set(outPoint, {
        x: 0,
        data: "root",
        display: "block"
      });
      if (!pausedWhenDragStarted) {
        play();
        linkedAnimation.resume();
      }
    }
  })[0], updateProgress = function updateProgress2(force) {
    if (progressDrag.isPressed && force !== true) {
      return;
    }
    var p2 = !loopEnabled && selectedAnimation._repeat === -1 ? selectedAnimation.totalTime() / selectedAnimation.duration() * 100 : linkedAnimation.progress() * 100 || 0, repeatDelayPhase = selectedAnimation._repeat && selectedAnimation._rDelay && selectedAnimation.totalTime() % (selectedAnimation.duration() + selectedAnimation._rDelay) > selectedAnimation.duration(), target;
    if (p2 > 100) {
      p2 = 100;
    }
    if (p2 >= outProgress) {
      if (loopEnabled && !linkedAnimation.paused() && !progressDrag.isDragging) {
        if (!repeatDelayPhase) {
          p2 = inProgress;
          target = linkedAnimation._targets && linkedAnimation._targets[0];
          if (target === selectedAnimation) {
            target.seek(startTime + (endTime - startTime) * inProgress / 100);
          }
          if (selectedAnimation._repeat > 0 && !inProgress && outProgress === 100) {
            if (selectedAnimation.totalProgress() === 1) {
              linkedAnimation.totalProgress(0, true).resume();
            }
          } else {
            linkedAnimation.progress(p2 / 100, true).resume();
          }
        }
      } else {
        if (p2 !== outProgress || selectedAnimation._repeat === -1) {
          p2 = outProgress;
          linkedAnimation.progress(p2 / 100);
        }
        if (!paused && (outProgress < 100 || selectedAnimation.totalProgress() === 1 || selectedAnimation._repeat === -1)) {
          pause();
        }
      }
    } else if (p2 < inProgress) {
      p2 = inProgress;
      linkedAnimation.progress(p2 / 100, true);
    }
    if (p2 !== progress || force === true) {
      progressBar.style.left = inProgress + "%";
      progressBar.style.width = Math.max(0, p2 - inProgress) + "%";
      playhead.style.left = p2 + "%";
      timeLabel.innerHTML = linkedAnimation._time.toFixed(2);
      durationLabel.innerHTML = linkedAnimation._dur.toFixed(2);
      if (dragged) {
        playhead.style.transform = "translate(-50%,0)";
        playhead._gsap.x = "0px";
        playhead._gsap.xPercent = -50;
        dragged = false;
      }
      progress = p2;
    }
    linkedAnimation.paused() !== paused && togglePlayPause();
  }, onPressSeekBar = function onPressSeekBar2(e) {
    if (progressDrag.isPressed) {
      return;
    }
    var bounds = e.target.getBoundingClientRect(), x = (e.changedTouches ? e.changedTouches[0] : e).clientX, p2 = (x - bounds.left) / bounds.width * 100;
    if (p2 < inProgress) {
      inProgress = p2 = Math.max(0, p2);
      inPoint.style.left = inProgress + "%";
      inDrag.startDrag(e);
      return;
    } else if (p2 > outProgress) {
      outProgress = p2 = Math.min(100, p2);
      outPoint.style.left = outProgress + "%";
      outDrag.startDrag(e);
      return;
    }
    linkedAnimation.progress(p2 / 100).pause();
    updateProgress(true);
    progressDrag.startDrag(e);
  }, play = function play2() {
    if (linkedAnimation.progress() >= outProgress / 100) {
      _checkIndependence(linkedAnimation, vars);
      var target = linkedAnimation._targets && linkedAnimation._targets[0];
      if (target === selectedAnimation) {
        target.seek(startTime + (endTime - startTime) * inProgress / 100);
      }
      if (linkedAnimation._repeat && !inProgress) {
        linkedAnimation.totalProgress(0, true);
      } else if (!linkedAnimation.reversed()) {
        linkedAnimation.progress(inProgress / 100, true);
      }
    }
    playPauseMorph.play();
    linkedAnimation.resume();
    if (paused) {
      _self.update();
    }
    paused = false;
  }, pause = function pause2() {
    playPauseMorph.reverse();
    if (linkedAnimation) {
      linkedAnimation.pause();
    }
    paused = true;
  }, togglePlayPause = function togglePlayPause2() {
    if (paused) {
      play();
    } else {
      pause();
    }
  }, onPressRewind = function onPressRewind2(e) {
    if (progressDrag.isPressed) {
      return;
    }
    _checkIndependence(linkedAnimation, vars);
    var target = linkedAnimation._targets && linkedAnimation._targets[0];
    if (target === selectedAnimation) {
      target.seek(startTime + (endTime - startTime) * inProgress / 100);
    }
    linkedAnimation.progress(inProgress / 100, true);
    if (!paused) {
      linkedAnimation.resume();
    }
  }, loop = function loop2(value) {
    loopEnabled = value;
    record("loop", loopEnabled);
    if (loopEnabled) {
      loopAnimation.play();
      if (linkedAnimation.progress() >= outProgress / 100) {
        var target = linkedAnimation._targets && linkedAnimation._targets[0];
        if (target === selectedAnimation) {
          target.seek(startTime + (endTime - startTime) * inProgress / 100);
        }
        if (selectedAnimation._repeat && !inProgress && outProgress === 100) {
          linkedAnimation.totalProgress(0, true);
        } else {
          linkedAnimation.progress(inProgress / 100, true);
        }
        play();
      }
    } else {
      loopAnimation.reverse();
    }
  }, toggleLoop = function toggleLoop2() {
    return loop(!loopEnabled);
  }, updateList = function updateList2() {
    var animations = _getChildrenOf(declaredAnimation && !vars.globalSync ? declaredAnimation : _recordedRoot, true), options = list.children, matches = 0, option, i2;
    if (declaredAnimation && !vars.globalSync) {
      animations.unshift(declaredAnimation);
    } else if (!vars.hideGlobalTimeline) {
      animations.unshift(_recordedRoot);
    }
    for (i2 = 0; i2 < animations.length; i2++) {
      option = options[i2] || _createElement3("option", list);
      option.animation = animations[i2];
      matches = i2 && animations[i2].vars.id === animations[i2 - 1].vars.id ? matches + 1 : 0;
      option.setAttribute("value", option.innerHTML = animations[i2].vars.id + (matches ? " [" + matches + "]" : animations[i2 + 1] && animations[i2 + 1].vars.id === animations[i2].vars.id ? " [0]" : ""));
    }
    for (; i2 < options.length; i2++) {
      list.removeChild(options[i2]);
    }
  }, animation = function animation2(anim) {
    var ts = parseFloat(timeScale.options[timeScale.selectedIndex].value) || 1, tl, maxDuration;
    if (!arguments.length) {
      return selectedAnimation;
    }
    if (_isString9(anim)) {
      anim = _getAnimationById(anim);
    }
    if (!(anim instanceof Animation)) {
      console.warn("GSDevTools error: invalid animation.");
    }
    if (anim.scrollTrigger) {
      console.warn("GSDevTools can't work with ScrollTrigger-based animations; either the scrollbar -OR- the GSDevTools scrubber can control the animation.");
    }
    if (anim === selectedAnimation) {
      return;
    }
    if (selectedAnimation) {
      selectedAnimation._inProgress = inProgress;
      selectedAnimation._outProgress = outProgress;
    }
    selectedAnimation = anim;
    if (linkedAnimation) {
      ts = linkedAnimation.timeScale();
      if (linkedAnimation._targets && linkedAnimation._targets[0] === declaredAnimation) {
        declaredAnimation.resume();
        linkedAnimation.kill();
      }
    }
    inProgress = selectedAnimation._inProgress || 0;
    outProgress = selectedAnimation._outProgress || 100;
    inPoint.style.left = inProgress + "%";
    outPoint.style.left = outProgress + "%";
    if (_fullyInitialized) {
      record("animation", selectedAnimation.vars.id);
      record("in", inProgress);
      record("out", outProgress);
    }
    startTime = 0;
    maxDuration = vars.maxDuration || Math.min(1e3, _getClippedDuration(selectedAnimation));
    if (selectedAnimation === _recordedRoot || vars.globalSync) {
      _merge();
      linkedAnimation = _rootTween;
      _rootInstance && _rootInstance !== _self && console.warn("Error: GSDevTools can only have one instance that's globally synchronized.");
      _rootInstance = _self;
      if (selectedAnimation !== _recordedRoot) {
        tl = selectedAnimation;
        endTime = tl.totalDuration();
        if (endTime > 99999999) {
          endTime = tl.duration();
        }
        while (tl.parent) {
          startTime = startTime / tl._ts + tl._start;
          endTime = endTime / tl._ts + tl._start;
          tl = tl.parent;
        }
      } else {
        endTime = _recordedRoot.duration();
      }
      if (endTime - startTime > maxDuration) {
        endTime = startTime + maxDuration;
      }
      _recordedRoot.pause(startTime);
      _rootTween.vars.time = endTime;
      _rootTween.invalidate();
      _rootTween.duration(endTime - startTime).timeScale(ts);
      if (paused) {
        _rootTween.progress(1, true).pause(0, true);
      } else {
        _delayedCall(0.01, function() {
          _rootTween.resume().progress(inProgress / 100);
          paused && play();
        });
      }
    } else {
      if (_rootInstance === _self) {
        _rootInstance = null;
      }
      startTime = Math.min(inProgress * selectedAnimation.duration(), selectedAnimation.time());
      if (selectedAnimation === declaredAnimation || !declaredAnimation) {
        linkedAnimation = selectedAnimation;
        if (!loopEnabled && linkedAnimation._repeat) {
          loop(true);
        }
      } else {
        tl = selectedAnimation;
        endTime = tl.totalDuration();
        if (endTime > 99999999) {
          endTime = tl.duration();
        }
        while (tl.parent.parent && tl !== declaredAnimation) {
          startTime = startTime / (tl._ts || tl._pauseTS) + tl._start;
          endTime = endTime / (tl._ts || tl._pauseTS) + tl._start;
          tl = tl.parent;
        }
        if (endTime - startTime > maxDuration) {
          endTime = startTime + maxDuration;
        }
        declaredAnimation.pause(startTime);
        linkedAnimation = gsap20.to(declaredAnimation, {
          duration: endTime - startTime,
          time: endTime,
          ease: "none",
          data: "root",
          parent: _independentRoot
        }, _independentRoot._time);
      }
      linkedAnimation.timeScale(ts);
      _rootTween.pause();
      _recordedRoot.resume();
      linkedAnimation.seek(0);
    }
    durationLabel.innerHTML = linkedAnimation.duration().toFixed(2);
    _selectValue(list, selectedAnimation.vars.id, animationLabel);
  }, updateRootDuration = function updateRootDuration2() {
    var time, ratio, duration;
    if (selectedAnimation === _recordedRoot) {
      time = _recordedRoot._time;
      _recordedRoot.progress(1, true).time(time, true);
      time = (_rootTween._dp._time - _rootTween._start) * _rootTween._ts;
      duration = Math.min(1e3, _recordedRoot.duration());
      if (duration === 1e3) {
        duration = Math.min(1e3, _getClippedDuration(_recordedRoot));
      }
      ratio = _rootTween.duration() / duration;
      if (ratio !== 1 && duration) {
        inProgress *= ratio;
        if (outProgress < 100) {
          outProgress *= ratio;
        }
        _rootTween.seek(0);
        _rootTween.vars.time = duration;
        _rootTween.invalidate();
        _rootTween.duration(duration);
        _rootTween.time(time);
        durationLabel.innerHTML = duration.toFixed(2);
        inPoint.style.left = inProgress + "%";
        outPoint.style.left = outProgress + "%";
        updateProgress(true);
      }
    }
  }, onChangeAnimation = function onChangeAnimation2(e) {
    animation(list.options[list.selectedIndex].animation);
    if (e.target && e.target.blur) {
      e.target.blur();
    }
    paused && play();
  }, onChangeTimeScale = function onChangeTimeScale2(e) {
    var ts = parseFloat(timeScale.options[timeScale.selectedIndex].value) || 1, target;
    linkedAnimation.timeScale(ts);
    record("timeScale", ts);
    if (!paused) {
      if (linkedAnimation.progress() >= outProgress / 100) {
        target = linkedAnimation._targets && linkedAnimation._targets[0];
        if (target === selectedAnimation) {
          target.seek(startTime + (endTime - startTime) * inProgress / 100);
        }
        linkedAnimation.progress(inProgress / 100, true).pause();
      } else {
        linkedAnimation.pause();
      }
      _delayedCall(0.01, function() {
        return linkedAnimation.resume();
      });
    }
    timeScaleLabel.innerHTML = ts + "x";
    if (timeScale.blur) {
      timeScale.blur();
    }
  }, autoHideTween = gsap20.to([find(".gs-bottom"), find(".gs-top")], {
    duration: 0.3,
    autoAlpha: 0,
    y: 50,
    ease: "power2.in",
    data: "root",
    paused: true,
    parent: _independentRoot
  }, _independentRoot._time), hidden = false, onMouseOut = function onMouseOut2(e) {
    if (!Draggable.hitTest(e, root) && !progressDrag.isDragging && !inDrag.isDragging && !outDrag.isDragging) {
      autoHideDelayedCall.restart(true);
    }
  }, hide = function hide2() {
    if (!hidden) {
      autoHideTween.play();
      autoHideDelayedCall.pause();
      hidden = true;
    }
  }, show = function show2() {
    autoHideDelayedCall.pause();
    if (hidden) {
      autoHideTween.reverse();
      hidden = false;
    }
  }, toggleHide = function toggleHide2() {
    if (hidden) {
      show();
    } else {
      hide();
    }
  }, autoHideDelayedCall = _delayedCall(1.3, hide).pause(), initialize = function initialize2(preliminary) {
    if (_startupPhase && !_globalStartTime) {
      _globalStartTime = _recordedRoot._start;
    }
    _fullyInitialized = !preliminary;
    declaredAnimation = _parseAnimation(vars.animation);
    if (declaredAnimation && !declaredAnimation.vars.id) {
      declaredAnimation.vars.id = "[no id]";
    }
    _merge();
    updateList();
    var savedAnimation = _getAnimationById(recall("animation"));
    if (savedAnimation) {
      savedAnimation._inProgress = recall("in") || 0;
      savedAnimation._outProgress = recall("out") || 100;
    }
    vars.paused && pause();
    selectedAnimation = null;
    animation(declaredAnimation || savedAnimation || _recordedRoot);
    var ts = vars.timeScale || recall("timeScale"), savedInOut = savedAnimation === selectedAnimation;
    if (ts) {
      _selectValue(timeScale, ts, timeScaleLabel, ts + "x");
      linkedAnimation.timeScale(ts);
    }
    inProgress = ("inTime" in vars ? _timeToProgress(vars.inTime, selectedAnimation, 0, 0) : savedInOut ? savedAnimation._inProgress : 0) || 0;
    if (inProgress === 100 && !vars.animation && savedAnimation) {
      animation(_recordedRoot);
      inProgress = _timeToProgress(vars.inTime, selectedAnimation, 0, 0) || 0;
    }
    if (inProgress) {
      inPoint.style.left = inProgress + "%";
      inPoint.style.display = outPoint.style.display = "block";
    }
    outProgress = ("outTime" in vars ? _timeToProgress(vars.outTime, selectedAnimation, 100, inProgress) : savedInOut ? savedAnimation._outProgress : 0) || 100;
    if (outProgress < inProgress) {
      outProgress = 100;
    }
    if (outProgress !== 100) {
      outPoint.style.left = outProgress + "%";
      inPoint.style.display = outPoint.style.display = "block";
    }
    loopEnabled = "loop" in vars ? vars.loop : recall("loop");
    loopEnabled && loop(true);
    vars.paused && linkedAnimation.progress(inProgress / 100, true).pause();
    if (_startupPhase && selectedAnimation === _recordedRoot && _globalStartTime && vars.globalSync && !paused) {
      linkedAnimation.time(-_globalStartTime, true);
    }
    updateProgress(true);
  };
  _addListener7(list, "change", onChangeAnimation);
  _addListener7(list, "mousedown", updateList);
  _addListener7(playPauseButton, "mousedown", togglePlayPause);
  _addListener7(find(".seek-bar"), "mousedown", onPressSeekBar);
  _addListener7(find(".rewind"), "mousedown", onPressRewind);
  _addListener7(loopButton, "mousedown", toggleLoop);
  _addListener7(timeScale, "change", onChangeTimeScale);
  if (vars.visibility === "auto") {
    _addListener7(root, "mouseout", onMouseOut);
    _addListener7(root, "mouseover", show);
  } else if (vars.visibility === "hidden") {
    hidden = true;
    autoHideTween.progress(1);
  }
  if (vars.keyboard !== false) {
    if (_keyboardInstance && vars.keyboard) {
      console.warn("[GSDevTools warning] only one instance can be affected by keyboard shortcuts. There is already one active.");
    } else {
      _keyboardInstance = _self;
      keyboardHandler = function keyboardHandler2(e) {
        var key = e.keyCode ? e.keyCode : e.which, ts;
        if (key === 32) {
          togglePlayPause();
        } else if (key === 38) {
          ts = parseFloat(_shiftSelectedValue(timeScale, -1, timeScaleLabel));
          linkedAnimation.timeScale(ts);
          record("timeScale", ts);
        } else if (key === 40) {
          ts = parseFloat(_shiftSelectedValue(timeScale, 1, timeScaleLabel));
          linkedAnimation.timeScale(ts);
          record("timeScale", ts);
        } else if (key === 37) {
          onPressRewind(e);
        } else if (key === 39) {
          linkedAnimation.progress(outProgress / 100);
        } else if (key === 76) {
          toggleLoop();
        } else if (key === 72) {
          toggleHide();
        } else if (key === 73) {
          inProgress = linkedAnimation.progress() * 100;
          record("in", inProgress);
          inPoint.style.left = inProgress + "%";
          updateProgress(true);
        } else if (key === 79) {
          outProgress = linkedAnimation.progress() * 100;
          record("out", outProgress);
          outPoint.style.left = outProgress + "%";
          updateProgress(true);
        }
      };
      _addListener7(_docEl4, "keydown", keyboardHandler);
    }
  }
  gsap20.set(playhead, {
    xPercent: -50,
    x: 0,
    data: "root"
  });
  gsap20.set(inPoint, {
    xPercent: -100,
    x: 0,
    data: "root"
  });
  inPoint._gsIgnore = outPoint._gsIgnore = playhead._gsIgnore = playPauseButton._gsIgnore = loopButton._gsIgnore = true;
  gsap20.killTweensOf([inPoint, outPoint, playhead]);
  initialize(_startupPhase);
  if (_startupPhase) {
    _delayedCall(1e-4, initialize, [false], this);
  }
  gsap20.ticker.add(updateProgress);
  this.update = function(forceMerge) {
    if (_rootInstance === _self) {
      if (!_rootTween.paused() || forceMerge) {
        _merge();
      }
      updateRootDuration();
    }
  };
  this.kill = this.revert = function() {
    _removeListener7(list, "change", onChangeAnimation);
    _removeListener7(list, "mousedown", updateList);
    _removeListener7(playPauseButton, "mousedown", togglePlayPause);
    _removeListener7(find(".seek-bar"), "mousedown", onPressSeekBar);
    _removeListener7(find(".rewind"), "mousedown", onPressRewind);
    _removeListener7(loopButton, "mousedown", toggleLoop);
    _removeListener7(timeScale, "change", onChangeTimeScale);
    progressDrag.disable();
    inDrag.disable();
    outDrag.disable();
    gsap20.ticker.remove(updateProgress);
    _removeListener7(root, "mouseout", onMouseOut);
    _removeListener7(root, "mouseover", show);
    root.parentNode.removeChild(root);
    if (_rootInstance === _self) {
      _rootInstance = null;
    }
    if (_keyboardInstance === _self) {
      _keyboardInstance = null;
      _removeListener7(_docEl4, "keydown", keyboardHandler);
    }
    delete _lookup2[vars.id + ""];
  };
  this.minimal = function(value) {
    var isMinimal = root.classList.contains("minimal"), p2;
    if (!arguments.length || isMinimal === value) {
      return isMinimal;
    }
    if (value) {
      root.classList.add("minimal");
    } else {
      root.classList.remove("minimal");
    }
    if (vars.container) {
      root.style.top = value ? "calc(100% - 42px)" : "calc(100% - 51px)";
    }
    if (progressDrag.isPressed) {
      skipDragUpdates = true;
      progressDrag.endDrag(progressDrag.pointerEvent);
      skipDragUpdates = false;
      p2 = linkedAnimation.progress() * 100;
      progressBar.style.width = Math.max(0, p2 - inProgress) + "%";
      playhead.style.left = p2 + "%";
      playhead.style.transform = "translate(-50%,0)";
      playhead._gsap.x = "0px";
      playhead._gsap.xPercent = -50;
      progressDrag.startDrag(progressDrag.pointerEvent, true);
    }
  };
  this.animation = animation;
  this.updateList = updateList;
  _context4(this);
};
GSDevTools.version = "3.13.0";
GSDevTools.globalRecordingTime = 2;
GSDevTools.getById = function(id) {
  return id ? _lookup2[id] : _rootInstance;
};
GSDevTools.getByAnimation = function(animation) {
  if (_isString9(animation)) {
    animation = gsap20.getById(animation);
  }
  for (var p2 in _lookup2) {
    if (_lookup2[p2].animation() === animation) {
      return _lookup2[p2];
    }
  }
};
GSDevTools.create = function(vars) {
  return new GSDevTools(vars);
};
GSDevTools.register = _initCore29;
_getGSAP35() && gsap20.registerPlugin(GSDevTools);

// node_modules/gsap/utils/VelocityTracker.js
var gsap21;
var _coreInitted17;
var _toArray7;
var _getUnit4;
var _first;
var _ticker;
var _time12;
var _time22;
var _getCache;
var _getGSAP37 = function _getGSAP38() {
  return gsap21 || typeof window !== "undefined" && (gsap21 = window.gsap);
};
var _lookup3 = {};
var _round17 = function _round18(value) {
  return Math.round(value * 1e4) / 1e4;
};
var _getID3 = function _getID4(target) {
  return _getCache(target).id;
};
var _getByTarget = function _getByTarget2(target) {
  return _lookup3[_getID3(typeof target === "string" ? _toArray7(target)[0] : target)];
};
var _onTick = function _onTick2(time) {
  var pt = _first, val;
  if (time - _time12 >= 0.05) {
    _time22 = _time12;
    _time12 = time;
    while (pt) {
      val = pt.g(pt.t, pt.p);
      if (val !== pt.v1 || time - pt.t1 > 0.2) {
        pt.v2 = pt.v1;
        pt.v1 = val;
        pt.t2 = pt.t1;
        pt.t1 = time;
      }
      pt = pt._next;
    }
  }
};
var _types2 = {
  deg: 360,
  rad: Math.PI * 2
};
var _initCore31 = function _initCore32() {
  gsap21 = _getGSAP37();
  if (gsap21) {
    _toArray7 = gsap21.utils.toArray;
    _getUnit4 = gsap21.utils.getUnit;
    _getCache = gsap21.core.getCache;
    _ticker = gsap21.ticker;
    _coreInitted17 = 1;
  }
};
var PropTracker = function PropTracker2(target, property, type, next) {
  this.t = target;
  this.p = property;
  this.g = target._gsap.get;
  this.rCap = _types2[type || _getUnit4(this.g(target, property))];
  this.v1 = this.v2 = 0;
  this.t1 = this.t2 = _ticker.time;
  if (next) {
    this._next = next;
    next._prev = this;
  }
};
var VelocityTracker = function() {
  function VelocityTracker2(target, property) {
    if (!_coreInitted17) {
      _initCore31();
    }
    this.target = _toArray7(target)[0];
    _lookup3[_getID3(this.target)] = this;
    this._props = {};
    property && this.add(property);
  }
  VelocityTracker2.register = function register8(core) {
    gsap21 = core;
    _initCore31();
  };
  var _proto = VelocityTracker2.prototype;
  _proto.get = function get(property, skipRecentTick) {
    var pt = this._props[property] || console.warn("Not tracking " + property + " velocity."), val, dif, rotationCap;
    val = parseFloat(skipRecentTick ? pt.v1 : pt.g(pt.t, pt.p));
    dif = val - parseFloat(pt.v2);
    rotationCap = pt.rCap;
    if (rotationCap) {
      dif = dif % rotationCap;
      if (dif !== dif % (rotationCap / 2)) {
        dif = dif < 0 ? dif + rotationCap : dif - rotationCap;
      }
    }
    return _round17(dif / ((skipRecentTick ? pt.t1 : _ticker.time) - pt.t2));
  };
  _proto.getAll = function getAll() {
    var result = {}, props = this._props, p2;
    for (p2 in props) {
      result[p2] = this.get(p2);
    }
    return result;
  };
  _proto.isTracking = function isTracking(property) {
    return property in this._props;
  };
  _proto.add = function add(property, type) {
    if (!(property in this._props)) {
      if (!_first) {
        _ticker.add(_onTick);
        _time12 = _time22 = _ticker.time;
      }
      _first = this._props[property] = new PropTracker(this.target, property, type, _first);
    }
  };
  _proto.remove = function remove(property) {
    var pt = this._props[property], prev, next;
    if (pt) {
      prev = pt._prev;
      next = pt._next;
      if (prev) {
        prev._next = next;
      }
      if (next) {
        next._prev = prev;
      } else if (_first === pt) {
        _ticker.remove(_onTick);
        _first = 0;
      }
      delete this._props[property];
    }
  };
  _proto.kill = function kill5(shallow) {
    for (var p2 in this._props) {
      this.remove(p2);
    }
    if (!shallow) {
      delete _lookup3[_getID3(this.target)];
    }
  };
  VelocityTracker2.track = function track(targets, properties, types) {
    if (!_coreInitted17) {
      _initCore31();
    }
    var result = [], targs = _toArray7(targets), a = properties.split(","), t = (types || "").split(","), i2 = targs.length, tracker, j;
    while (i2--) {
      tracker = _getByTarget(targs[i2]) || new VelocityTracker2(targs[i2]);
      j = a.length;
      while (j--) {
        tracker.add(a[j], t[j] || t[0]);
      }
      result.push(tracker);
    }
    return result;
  };
  VelocityTracker2.untrack = function untrack(targets, properties) {
    var props = (properties || "").split(",");
    _toArray7(targets).forEach(function(target) {
      var tracker = _getByTarget(target);
      if (tracker) {
        if (!props.length) {
          tracker.kill(1);
        } else {
          props.forEach(function(p2) {
            return tracker.remove(p2);
          });
        }
      }
    });
  };
  VelocityTracker2.isTracking = function isTracking(target, property) {
    var tracker = _getByTarget(target);
    return tracker && tracker.isTracking(property);
  };
  VelocityTracker2.getVelocity = function getVelocity(target, property) {
    var tracker = _getByTarget(target);
    return !tracker || !tracker.isTracking(property) ? console.warn("Not tracking velocity of " + property) : tracker.get(property);
  };
  return VelocityTracker2;
}();
VelocityTracker.getByTarget = _getByTarget;
_getGSAP37() && gsap21.registerPlugin(VelocityTracker);

// node_modules/gsap/InertiaPlugin.js
var gsap22;
var _coreInitted18;
var _parseEase3;
var _toArray8;
var _power3;
var _config2;
var _getUnit5;
var PropTween3;
var _getCache2;
var _checkPointRatio;
var _clamp3;
var _processingVars;
var _getStyleSaver7;
var _reverting5;
var _getTracker = VelocityTracker.getByTarget;
var _getGSAP39 = function _getGSAP40() {
  return gsap22 || typeof window !== "undefined" && (gsap22 = window.gsap) && gsap22.registerPlugin && gsap22;
};
var _isString11 = function _isString12(value) {
  return typeof value === "string";
};
var _isNumber5 = function _isNumber6(value) {
  return typeof value === "number";
};
var _isObject7 = function _isObject8(value) {
  return typeof value === "object";
};
var _isFunction11 = function _isFunction12(value) {
  return typeof value === "function";
};
var _bonusValidated6 = 1;
var _isArray2 = Array.isArray;
var _emptyFunc5 = function _emptyFunc6(p2) {
  return p2;
};
var _bigNum3 = 1e10;
var _tinyNum = 1 / _bigNum3;
var _checkPoint = 0.05;
var _round19 = function _round20(value) {
  return Math.round(value * 1e4) / 1e4;
};
var _extend3 = function _extend4(obj, defaults, exclude) {
  for (var p2 in defaults) {
    if (!(p2 in obj) && p2 !== exclude) {
      obj[p2] = defaults[p2];
    }
  }
  return obj;
};
var _deepClone = function _deepClone2(obj) {
  var copy = {}, p2, v;
  for (p2 in obj) {
    copy[p2] = _isObject7(v = obj[p2]) && !_isArray2(v) ? _deepClone2(v) : v;
  }
  return copy;
};
var _getClosest = function _getClosest2(n, values, max, min, radius) {
  var i2 = values.length, closest = 0, absDif = _bigNum3, val, dif, p2, dist;
  if (_isObject7(n)) {
    while (i2--) {
      val = values[i2];
      dif = 0;
      for (p2 in n) {
        dist = val[p2] - n[p2];
        dif += dist * dist;
      }
      if (dif < absDif) {
        closest = i2;
        absDif = dif;
      }
    }
    if ((radius || _bigNum3) < _bigNum3 && radius < Math.sqrt(absDif)) {
      return n;
    }
  } else {
    while (i2--) {
      val = values[i2];
      dif = val - n;
      if (dif < 0) {
        dif = -dif;
      }
      if (dif < absDif && val >= min && val <= max) {
        closest = i2;
        absDif = dif;
      }
    }
  }
  return values[closest];
};
var _parseEnd = function _parseEnd2(curProp, end, max, min, name, radius, velocity) {
  if (curProp.end === "auto") {
    return curProp;
  }
  var endVar = curProp.end, adjustedEnd, p2;
  max = isNaN(max) ? _bigNum3 : max;
  min = isNaN(min) ? -_bigNum3 : min;
  if (_isObject7(end)) {
    adjustedEnd = end.calculated ? end : (_isFunction11(endVar) ? endVar(end, velocity) : _getClosest(end, endVar, max, min, radius)) || end;
    if (!end.calculated) {
      for (p2 in adjustedEnd) {
        end[p2] = adjustedEnd[p2];
      }
      end.calculated = true;
    }
    adjustedEnd = adjustedEnd[name];
  } else {
    adjustedEnd = _isFunction11(endVar) ? endVar(end, velocity) : _isArray2(endVar) ? _getClosest(end, endVar, max, min, radius) : parseFloat(endVar);
  }
  if (adjustedEnd > max) {
    adjustedEnd = max;
  } else if (adjustedEnd < min) {
    adjustedEnd = min;
  }
  return {
    max: adjustedEnd,
    min: adjustedEnd,
    unitFactor: curProp.unitFactor
  };
};
var _getNumOrDefault = function _getNumOrDefault2(vars, property, defaultValue) {
  return isNaN(vars[property]) ? defaultValue : +vars[property];
};
var _calculateChange = function _calculateChange2(velocity, duration) {
  return duration * _checkPoint * velocity / _checkPointRatio;
};
var _calculateDuration = function _calculateDuration2(start, end, velocity) {
  return Math.abs((end - start) * _checkPointRatio / velocity / _checkPoint);
};
var _reservedProps = {
  resistance: 1,
  checkpoint: 1,
  preventOvershoot: 1,
  linkedProps: 1,
  radius: 1,
  duration: 1
};
var _processLinkedProps = function _processLinkedProps2(target, vars, getVal, resistance) {
  if (vars.linkedProps) {
    var linkedPropNames = vars.linkedProps.split(","), linkedProps = {}, i2, p2, curProp, curVelocity, tracker, curDuration;
    for (i2 = 0; i2 < linkedPropNames.length; i2++) {
      p2 = linkedPropNames[i2];
      curProp = vars[p2];
      if (curProp) {
        if (_isNumber5(curProp.velocity)) {
          curVelocity = curProp.velocity;
        } else {
          tracker = tracker || _getTracker(target);
          curVelocity = tracker && tracker.isTracking(p2) ? tracker.get(p2) : 0;
        }
        curDuration = Math.abs(curVelocity / _getNumOrDefault(curProp, "resistance", resistance));
        linkedProps[p2] = parseFloat(getVal(target, p2)) + _calculateChange(curVelocity, curDuration);
      }
    }
    return linkedProps;
  }
};
var _calculateTweenDuration = function _calculateTweenDuration2(target, vars, maxDuration, minDuration, overshootTolerance, recordEnd) {
  if (maxDuration === void 0) {
    maxDuration = 10;
  }
  if (minDuration === void 0) {
    minDuration = 0.2;
  }
  if (overshootTolerance === void 0) {
    overshootTolerance = 1;
  }
  if (recordEnd === void 0) {
    recordEnd = 0;
  }
  _isString11(target) && (target = _toArray8(target)[0]);
  if (!target) {
    return 0;
  }
  var duration = 0, clippedDuration = _bigNum3, inertiaVars = vars.inertia || vars, getVal = _getCache2(target).get, resistance = _getNumOrDefault(inertiaVars, "resistance", _config2.resistance), p2, curProp, curDuration, curVelocity, curVal, end, curClippedDuration, tracker, unitFactor, linkedProps;
  linkedProps = _processLinkedProps(target, inertiaVars, getVal, resistance);
  for (p2 in inertiaVars) {
    if (!_reservedProps[p2]) {
      curProp = inertiaVars[p2];
      if (!_isObject7(curProp)) {
        tracker = tracker || _getTracker(target);
        if (tracker && tracker.isTracking(p2)) {
          curProp = _isNumber5(curProp) ? {
            velocity: curProp
          } : {
            velocity: tracker.get(p2)
          };
        } else {
          curVelocity = +curProp || 0;
          curDuration = Math.abs(curVelocity / resistance);
        }
      }
      if (_isObject7(curProp)) {
        if (_isNumber5(curProp.velocity)) {
          curVelocity = curProp.velocity;
        } else {
          tracker = tracker || _getTracker(target);
          curVelocity = tracker && tracker.isTracking(p2) ? tracker.get(p2) : 0;
        }
        curDuration = _clamp3(minDuration, maxDuration, Math.abs(curVelocity / _getNumOrDefault(curProp, "resistance", resistance)));
        curVal = parseFloat(getVal(target, p2)) || 0;
        end = curVal + _calculateChange(curVelocity, curDuration);
        if ("end" in curProp) {
          curProp = _parseEnd(curProp, linkedProps && p2 in linkedProps ? linkedProps : end, curProp.max, curProp.min, p2, inertiaVars.radius, curVelocity);
          if (recordEnd) {
            _processingVars === vars && (_processingVars = inertiaVars = _deepClone(vars));
            inertiaVars[p2] = _extend3(curProp, inertiaVars[p2], "end");
          }
        }
        if ("max" in curProp && end > +curProp.max + _tinyNum) {
          unitFactor = curProp.unitFactor || _config2.unitFactors[p2] || 1;
          curClippedDuration = curVal > curProp.max && curProp.min !== curProp.max || curVelocity * unitFactor > -15 && curVelocity * unitFactor < 45 ? minDuration + (maxDuration - minDuration) * 0.1 : _calculateDuration(curVal, curProp.max, curVelocity);
          if (curClippedDuration + overshootTolerance < clippedDuration) {
            clippedDuration = curClippedDuration + overshootTolerance;
          }
        } else if ("min" in curProp && end < +curProp.min - _tinyNum) {
          unitFactor = curProp.unitFactor || _config2.unitFactors[p2] || 1;
          curClippedDuration = curVal < curProp.min && curProp.min !== curProp.max || curVelocity * unitFactor > -45 && curVelocity * unitFactor < 15 ? minDuration + (maxDuration - minDuration) * 0.1 : _calculateDuration(curVal, curProp.min, curVelocity);
          if (curClippedDuration + overshootTolerance < clippedDuration) {
            clippedDuration = curClippedDuration + overshootTolerance;
          }
        }
        curClippedDuration > duration && (duration = curClippedDuration);
      }
      curDuration > duration && (duration = curDuration);
    }
  }
  duration > clippedDuration && (duration = clippedDuration);
  return duration > maxDuration ? maxDuration : duration < minDuration ? minDuration : duration;
};
var _initCore33 = function _initCore34() {
  gsap22 = _getGSAP39();
  if (gsap22) {
    _parseEase3 = gsap22.parseEase;
    _toArray8 = gsap22.utils.toArray;
    _getUnit5 = gsap22.utils.getUnit;
    _getCache2 = gsap22.core.getCache;
    _clamp3 = gsap22.utils.clamp;
    _getStyleSaver7 = gsap22.core.getStyleSaver;
    _reverting5 = gsap22.core.reverting || function() {
    };
    _power3 = _parseEase3("power3");
    _checkPointRatio = _power3(0.05);
    PropTween3 = gsap22.core.PropTween;
    gsap22.config({
      resistance: 100,
      unitFactors: {
        time: 1e3,
        totalTime: 1e3,
        progress: 1e3,
        totalProgress: 1e3
      }
    });
    _config2 = gsap22.config();
    gsap22.registerPlugin(VelocityTracker);
    _coreInitted18 = 1;
  }
};
var InertiaPlugin2 = {
  version: "3.13.0",
  name: "inertia",
  register: function register6(core) {
    gsap22 = core;
    _initCore33();
  },
  init: function init11(target, vars, tween, index, targets) {
    _coreInitted18 || _initCore33();
    var tracker = _getTracker(target);
    if (vars === "auto") {
      if (!tracker) {
        console.warn("No inertia tracking on " + target + ". InertiaPlugin.track(target) first.");
        return;
      }
      vars = tracker.getAll();
    }
    this.styles = _getStyleSaver7 && typeof target.style === "object" && _getStyleSaver7(target);
    this.target = target;
    this.tween = tween;
    _processingVars = vars;
    var cache = target._gsap, getVal = cache.get, dur = vars.duration, durIsObj = _isObject7(dur), preventOvershoot = vars.preventOvershoot || durIsObj && dur.overshoot === 0, resistance = _getNumOrDefault(vars, "resistance", _config2.resistance), duration = _isNumber5(dur) ? dur : _calculateTweenDuration(target, vars, durIsObj && dur.max || 10, durIsObj && dur.min || 0.2, durIsObj && "overshoot" in dur ? +dur.overshoot : preventOvershoot ? 0 : 1, true), p2, curProp, curVal, unit, velocity, change1, end, change2, linkedProps;
    vars = _processingVars;
    _processingVars = 0;
    linkedProps = _processLinkedProps(target, vars, getVal, resistance);
    for (p2 in vars) {
      if (!_reservedProps[p2]) {
        curProp = vars[p2];
        _isFunction11(curProp) && (curProp = curProp(index, target, targets));
        if (_isNumber5(curProp)) {
          velocity = curProp;
        } else if (_isObject7(curProp) && !isNaN(curProp.velocity)) {
          velocity = +curProp.velocity;
        } else {
          if (tracker && tracker.isTracking(p2)) {
            velocity = tracker.get(p2);
          } else {
            console.warn("ERROR: No velocity was defined for " + target + " property: " + p2);
          }
        }
        change1 = _calculateChange(velocity, duration);
        change2 = 0;
        curVal = getVal(target, p2);
        unit = _getUnit5(curVal);
        curVal = parseFloat(curVal);
        if (_isObject7(curProp)) {
          end = curVal + change1;
          if ("end" in curProp) {
            curProp = _parseEnd(curProp, linkedProps && p2 in linkedProps ? linkedProps : end, curProp.max, curProp.min, p2, vars.radius, velocity);
          }
          if ("max" in curProp && +curProp.max < end) {
            if (preventOvershoot || curProp.preventOvershoot) {
              change1 = curProp.max - curVal;
            } else {
              change2 = curProp.max - curVal - change1;
            }
          } else if ("min" in curProp && +curProp.min > end) {
            if (preventOvershoot || curProp.preventOvershoot) {
              change1 = curProp.min - curVal;
            } else {
              change2 = curProp.min - curVal - change1;
            }
          }
        }
        this._props.push(p2);
        this.styles && this.styles.save(p2);
        this._pt = new PropTween3(this._pt, target, p2, curVal, 0, _emptyFunc5, 0, cache.set(target, p2, this));
        this._pt.u = unit || 0;
        this._pt.c1 = change1;
        this._pt.c2 = change2;
      }
    }
    tween.duration(duration);
    return _bonusValidated6;
  },
  render: function render10(ratio, data) {
    var pt = data._pt;
    ratio = _power3(data.tween._time / data.tween._dur);
    if (ratio || !_reverting5()) {
      while (pt) {
        pt.set(pt.t, pt.p, _round19(pt.s + pt.c1 * ratio + pt.c2 * ratio * ratio) + pt.u, pt.d, ratio);
        pt = pt._next;
      }
    } else {
      data.styles.revert();
    }
  }
};
"track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(name) {
  return InertiaPlugin2[name] = VelocityTracker[name];
});
_getGSAP39() && gsap22.registerPlugin(InertiaPlugin2);

// node_modules/gsap/MorphSVGPlugin.js
var gsap23;
var _toArray9;
var _lastLinkedAnchor;
var _doc8;
var _coreInitted19;
var PluginClass;
var _getGSAP41 = function _getGSAP42() {
  return gsap23 || typeof window !== "undefined" && (gsap23 = window.gsap) && gsap23.registerPlugin && gsap23;
};
var _isFunction13 = function _isFunction14(value) {
  return typeof value === "function";
};
var _atan22 = Math.atan2;
var _cos2 = Math.cos;
var _sin2 = Math.sin;
var _sqrt3 = Math.sqrt;
var _PI = Math.PI;
var _2PI = _PI * 2;
var _angleMin = _PI * 0.3;
var _angleMax = _PI * 0.7;
var _bigNum4 = 1e20;
var _numExp4 = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi;
var _selectorExp2 = /(^[#\.][a-z]|[a-y][a-z])/i;
var _commands = /[achlmqstvz]/i;
var _log = function _log2(message) {
  return console && console.warn(message);
};
var _bonusValidated7 = 1;
var _getAverageXY = function _getAverageXY2(segment) {
  var l = segment.length, x = 0, y = 0, i2;
  for (i2 = 0; i2 < l; i2++) {
    x += segment[i2++];
    y += segment[i2];
  }
  return [x / (l / 2), y / (l / 2)];
};
var _getSize3 = function _getSize4(segment) {
  var l = segment.length, xMax = segment[0], xMin = xMax, yMax = segment[1], yMin = yMax, x, y, i2;
  for (i2 = 6; i2 < l; i2 += 6) {
    x = segment[i2];
    y = segment[i2 + 1];
    if (x > xMax) {
      xMax = x;
    } else if (x < xMin) {
      xMin = x;
    }
    if (y > yMax) {
      yMax = y;
    } else if (y < yMin) {
      yMin = y;
    }
  }
  segment.centerX = (xMax + xMin) / 2;
  segment.centerY = (yMax + yMin) / 2;
  return segment.size = (xMax - xMin) * (yMax - yMin);
};
var _getTotalSize = function _getTotalSize2(rawPath, samplesPerBezier) {
  if (samplesPerBezier === void 0) {
    samplesPerBezier = 3;
  }
  var j = rawPath.length, xMax = rawPath[0][0], xMin = xMax, yMax = rawPath[0][1], yMin = yMax, inc = 1 / samplesPerBezier, l, x, y, i2, segment, k, t, inv, x1, y1, x2, x3, x4, y2, y3, y4;
  while (--j > -1) {
    segment = rawPath[j];
    l = segment.length;
    for (i2 = 6; i2 < l; i2 += 6) {
      x1 = segment[i2];
      y1 = segment[i2 + 1];
      x2 = segment[i2 + 2] - x1;
      y2 = segment[i2 + 3] - y1;
      x3 = segment[i2 + 4] - x1;
      y3 = segment[i2 + 5] - y1;
      x4 = segment[i2 + 6] - x1;
      y4 = segment[i2 + 7] - y1;
      k = samplesPerBezier;
      while (--k > -1) {
        t = inc * k;
        inv = 1 - t;
        x = (t * t * x4 + 3 * inv * (t * x3 + inv * x2)) * t + x1;
        y = (t * t * y4 + 3 * inv * (t * y3 + inv * y2)) * t + y1;
        if (x > xMax) {
          xMax = x;
        } else if (x < xMin) {
          xMin = x;
        }
        if (y > yMax) {
          yMax = y;
        } else if (y < yMin) {
          yMin = y;
        }
      }
    }
  }
  rawPath.centerX = (xMax + xMin) / 2;
  rawPath.centerY = (yMax + yMin) / 2;
  rawPath.left = xMin;
  rawPath.width = xMax - xMin;
  rawPath.top = yMin;
  rawPath.height = yMax - yMin;
  return rawPath.size = (xMax - xMin) * (yMax - yMin);
};
var _sortByComplexity = function _sortByComplexity2(a, b) {
  return b.length - a.length;
};
var _sortBySize = function _sortBySize2(a, b) {
  var sizeA = a.size || _getSize3(a), sizeB = b.size || _getSize3(b);
  return Math.abs(sizeB - sizeA) < (sizeA + sizeB) / 20 ? b.centerX - a.centerX || b.centerY - a.centerY : sizeB - sizeA;
};
var _offsetSegment = function _offsetSegment2(segment, shapeIndex) {
  var a = segment.slice(0), l = segment.length, wrap2 = l - 2, i2, index;
  shapeIndex = shapeIndex | 0;
  for (i2 = 0; i2 < l; i2++) {
    index = (i2 + shapeIndex) % wrap2;
    segment[i2++] = a[index];
    segment[i2] = a[index + 1];
  }
};
var _getTotalMovement = function _getTotalMovement2(sb, eb, shapeIndex, offsetX, offsetY) {
  var l = sb.length, d = 0, wrap2 = l - 2, index, i2, x, y;
  shapeIndex *= 6;
  for (i2 = 0; i2 < l; i2 += 6) {
    index = (i2 + shapeIndex) % wrap2;
    y = sb[index] - (eb[i2] - offsetX);
    x = sb[index + 1] - (eb[i2 + 1] - offsetY);
    d += _sqrt3(x * x + y * y);
  }
  return d;
};
var _getClosestShapeIndex = function _getClosestShapeIndex2(sb, eb, checkReverse) {
  var l = sb.length, sCenter = _getAverageXY(sb), eCenter = _getAverageXY(eb), offsetX = eCenter[0] - sCenter[0], offsetY = eCenter[1] - sCenter[1], min = _getTotalMovement(sb, eb, 0, offsetX, offsetY), minIndex = 0, copy, d, i2;
  for (i2 = 6; i2 < l; i2 += 6) {
    d = _getTotalMovement(sb, eb, i2 / 6, offsetX, offsetY);
    if (d < min) {
      min = d;
      minIndex = i2;
    }
  }
  if (checkReverse) {
    copy = sb.slice(0);
    reverseSegment(copy);
    for (i2 = 6; i2 < l; i2 += 6) {
      d = _getTotalMovement(copy, eb, i2 / 6, offsetX, offsetY);
      if (d < min) {
        min = d;
        minIndex = -i2;
      }
    }
  }
  return minIndex / 6;
};
var _getClosestAnchor = function _getClosestAnchor2(rawPath, x, y) {
  var j = rawPath.length, closestDistance = _bigNum4, closestX = 0, closestY = 0, segment, dx, dy, d, i2, l;
  while (--j > -1) {
    segment = rawPath[j];
    l = segment.length;
    for (i2 = 0; i2 < l; i2 += 6) {
      dx = segment[i2] - x;
      dy = segment[i2 + 1] - y;
      d = _sqrt3(dx * dx + dy * dy);
      if (d < closestDistance) {
        closestDistance = d;
        closestX = segment[i2];
        closestY = segment[i2 + 1];
      }
    }
  }
  return [closestX, closestY];
};
var _getClosestSegment = function _getClosestSegment2(bezier, pool, startIndex, sortRatio, offsetX, offsetY) {
  var l = pool.length, index = 0, minSize = Math.min(bezier.size || _getSize3(bezier), pool[startIndex].size || _getSize3(pool[startIndex])) * sortRatio, min = _bigNum4, cx = bezier.centerX + offsetX, cy = bezier.centerY + offsetY, size, i2, dx, dy, d;
  for (i2 = startIndex; i2 < l; i2++) {
    size = pool[i2].size || _getSize3(pool[i2]);
    if (size < minSize) {
      break;
    }
    dx = pool[i2].centerX - cx;
    dy = pool[i2].centerY - cy;
    d = _sqrt3(dx * dx + dy * dy);
    if (d < min) {
      index = i2;
      min = d;
    }
  }
  d = pool[index];
  pool.splice(index, 1);
  return d;
};
var _subdivideSegmentQty = function _subdivideSegmentQty2(segment, quantity) {
  var tally = 0, max = 0.999999, l = segment.length, newPointsPerSegment = quantity / ((l - 2) / 6), ax, ay, cp1x, cp1y, cp2x, cp2y, bx, by, x1, y1, x2, y2, i2, t;
  for (i2 = 2; i2 < l; i2 += 6) {
    tally += newPointsPerSegment;
    while (tally > max) {
      ax = segment[i2 - 2];
      ay = segment[i2 - 1];
      cp1x = segment[i2];
      cp1y = segment[i2 + 1];
      cp2x = segment[i2 + 2];
      cp2y = segment[i2 + 3];
      bx = segment[i2 + 4];
      by = segment[i2 + 5];
      t = 1 / ((Math.floor(tally) || 1) + 1);
      x1 = ax + (cp1x - ax) * t;
      x2 = cp1x + (cp2x - cp1x) * t;
      x1 += (x2 - x1) * t;
      x2 += (cp2x + (bx - cp2x) * t - x2) * t;
      y1 = ay + (cp1y - ay) * t;
      y2 = cp1y + (cp2y - cp1y) * t;
      y1 += (y2 - y1) * t;
      y2 += (cp2y + (by - cp2y) * t - y2) * t;
      segment.splice(
        i2,
        4,
        ax + (cp1x - ax) * t,
        //first control point
        ay + (cp1y - ay) * t,
        x1,
        //second control point
        y1,
        x1 + (x2 - x1) * t,
        //new fabricated anchor on line
        y1 + (y2 - y1) * t,
        x2,
        //third control point
        y2,
        cp2x + (bx - cp2x) * t,
        //fourth control point
        cp2y + (by - cp2y) * t
      );
      i2 += 6;
      l += 6;
      tally--;
    }
  }
  return segment;
};
var _equalizeSegmentQuantity = function _equalizeSegmentQuantity2(start, end, shapeIndex, map, fillSafe) {
  var dif = end.length - start.length, longer = dif > 0 ? end : start, shorter = dif > 0 ? start : end, added = 0, sortMethod = map === "complexity" ? _sortByComplexity : _sortBySize, sortRatio = map === "position" ? 0 : typeof map === "number" ? map : 0.8, i2 = shorter.length, shapeIndices = typeof shapeIndex === "object" && shapeIndex.push ? shapeIndex.slice(0) : [shapeIndex], reverse = shapeIndices[0] === "reverse" || shapeIndices[0] < 0, log = shapeIndex === "log", eb, sb, b, x, y, offsetX, offsetY;
  if (!shorter[0]) {
    return;
  }
  if (longer.length > 1) {
    start.sort(sortMethod);
    end.sort(sortMethod);
    offsetX = longer.size || _getTotalSize(longer);
    offsetX = shorter.size || _getTotalSize(shorter);
    offsetX = longer.centerX - shorter.centerX;
    offsetY = longer.centerY - shorter.centerY;
    if (sortMethod === _sortBySize) {
      for (i2 = 0; i2 < shorter.length; i2++) {
        longer.splice(i2, 0, _getClosestSegment(shorter[i2], longer, i2, sortRatio, offsetX, offsetY));
      }
    }
  }
  if (dif) {
    if (dif < 0) {
      dif = -dif;
    }
    if (longer[0].length > shorter[0].length) {
      _subdivideSegmentQty(shorter[0], (longer[0].length - shorter[0].length) / 6 | 0);
    }
    i2 = shorter.length;
    while (added < dif) {
      x = longer[i2].size || _getSize3(longer[i2]);
      b = _getClosestAnchor(shorter, longer[i2].centerX, longer[i2].centerY);
      x = b[0];
      y = b[1];
      shorter[i2++] = [x, y, x, y, x, y, x, y];
      shorter.totalPoints += 8;
      added++;
    }
  }
  for (i2 = 0; i2 < start.length; i2++) {
    eb = end[i2];
    sb = start[i2];
    dif = eb.length - sb.length;
    if (dif < 0) {
      _subdivideSegmentQty(eb, -dif / 6 | 0);
    } else if (dif > 0) {
      _subdivideSegmentQty(sb, dif / 6 | 0);
    }
    if (reverse && fillSafe !== false && !sb.reversed) {
      reverseSegment(sb);
    }
    shapeIndex = shapeIndices[i2] || shapeIndices[i2] === 0 ? shapeIndices[i2] : "auto";
    if (shapeIndex) {
      if (sb.closed || Math.abs(sb[0] - sb[sb.length - 2]) < 0.5 && Math.abs(sb[1] - sb[sb.length - 1]) < 0.5) {
        if (shapeIndex === "auto" || shapeIndex === "log") {
          shapeIndices[i2] = shapeIndex = _getClosestShapeIndex(sb, eb, !i2 || fillSafe === false);
          if (shapeIndex < 0) {
            reverse = true;
            reverseSegment(sb);
            shapeIndex = -shapeIndex;
          }
          _offsetSegment(sb, shapeIndex * 6);
        } else if (shapeIndex !== "reverse") {
          if (i2 && shapeIndex < 0) {
            reverseSegment(sb);
          }
          _offsetSegment(sb, (shapeIndex < 0 ? -shapeIndex : shapeIndex) * 6);
        }
      } else if (!reverse && (shapeIndex === "auto" && Math.abs(eb[0] - sb[0]) + Math.abs(eb[1] - sb[1]) + Math.abs(eb[eb.length - 2] - sb[sb.length - 2]) + Math.abs(eb[eb.length - 1] - sb[sb.length - 1]) > Math.abs(eb[0] - sb[sb.length - 2]) + Math.abs(eb[1] - sb[sb.length - 1]) + Math.abs(eb[eb.length - 2] - sb[0]) + Math.abs(eb[eb.length - 1] - sb[1]) || shapeIndex % 2)) {
        reverseSegment(sb);
        shapeIndices[i2] = -1;
        reverse = true;
      } else if (shapeIndex === "auto") {
        shapeIndices[i2] = 0;
      } else if (shapeIndex === "reverse") {
        shapeIndices[i2] = -1;
      }
      if (sb.closed !== eb.closed) {
        sb.closed = eb.closed = false;
      }
    }
  }
  log && _log("shapeIndex:[" + shapeIndices.join(",") + "]");
  start.shapeIndex = shapeIndices;
  return shapeIndices;
};
var _pathFilter = function _pathFilter2(a, shapeIndex, map, precompile, fillSafe) {
  var start = stringToRawPath(a[0]), end = stringToRawPath(a[1]);
  if (!_equalizeSegmentQuantity(start, end, shapeIndex || shapeIndex === 0 ? shapeIndex : "auto", map, fillSafe)) {
    return;
  }
  a[0] = rawPathToString(start);
  a[1] = rawPathToString(end);
  if (precompile === "log" || precompile === true) {
    _log('precompile:["' + a[0] + '","' + a[1] + '"]');
  }
};
var _offsetPoints = function _offsetPoints2(text, offset) {
  if (!offset) {
    return text;
  }
  var a = text.match(_numExp4) || [], l = a.length, s = "", inc, i2, j;
  if (offset === "reverse") {
    i2 = l - 1;
    inc = -2;
  } else {
    i2 = ((parseInt(offset, 10) || 0) * 2 + 1 + l * 100) % l;
    inc = 2;
  }
  for (j = 0; j < l; j += 2) {
    s += a[i2 - 1] + "," + a[i2] + " ";
    i2 = (i2 + inc) % l;
  }
  return s;
};
var _equalizePointQuantity = function _equalizePointQuantity2(a, quantity) {
  var tally = 0, x = parseFloat(a[0]), y = parseFloat(a[1]), s = x + "," + y + " ", max = 0.999999, newPointsPerSegment, i2, l, j, factor, nextX, nextY;
  l = a.length;
  newPointsPerSegment = quantity * 0.5 / (l * 0.5 - 1);
  for (i2 = 0; i2 < l - 2; i2 += 2) {
    tally += newPointsPerSegment;
    nextX = parseFloat(a[i2 + 2]);
    nextY = parseFloat(a[i2 + 3]);
    if (tally > max) {
      factor = 1 / (Math.floor(tally) + 1);
      j = 1;
      while (tally > max) {
        s += (x + (nextX - x) * factor * j).toFixed(2) + "," + (y + (nextY - y) * factor * j).toFixed(2) + " ";
        tally--;
        j++;
      }
    }
    s += nextX + "," + nextY + " ";
    x = nextX;
    y = nextY;
  }
  return s;
};
var _pointsFilter = function _pointsFilter2(a) {
  var startNums = a[0].match(_numExp4) || [], endNums = a[1].match(_numExp4) || [], dif = endNums.length - startNums.length;
  if (dif > 0) {
    a[0] = _equalizePointQuantity(startNums, dif);
  } else {
    a[1] = _equalizePointQuantity(endNums, -dif);
  }
};
var _buildPointsFilter = function _buildPointsFilter2(shapeIndex) {
  return !isNaN(shapeIndex) ? function(a) {
    _pointsFilter(a);
    a[1] = _offsetPoints(a[1], parseInt(shapeIndex, 10));
  } : _pointsFilter;
};
var _parseShape = function _parseShape2(shape, forcePath, target) {
  var isString = typeof shape === "string", e, type;
  if (!isString || _selectorExp2.test(shape) || (shape.match(_numExp4) || []).length < 3) {
    e = _toArray9(shape)[0];
    if (e) {
      type = (e.nodeName + "").toUpperCase();
      if (forcePath && type !== "PATH") {
        e = convertToPath(e, false);
        type = "PATH";
      }
      shape = e.getAttribute(type === "PATH" ? "d" : "points") || "";
      if (e === target) {
        shape = e.getAttributeNS(null, "data-original") || shape;
      }
    } else {
      _log("WARNING: invalid morph to: " + shape);
      shape = false;
    }
  }
  return shape;
};
var _populateSmoothData = function _populateSmoothData2(rawPath, tolerance) {
  var j = rawPath.length, limit = 0.2 * (tolerance || 1), smooth, segment, x, y, x2, y2, i2, l, a, a2, isSmooth, smoothData;
  while (--j > -1) {
    segment = rawPath[j];
    isSmooth = segment.isSmooth = segment.isSmooth || [0, 0, 0, 0];
    smoothData = segment.smoothData = segment.smoothData || [0, 0, 0, 0];
    isSmooth.length = 4;
    l = segment.length - 2;
    for (i2 = 6; i2 < l; i2 += 6) {
      x = segment[i2] - segment[i2 - 2];
      y = segment[i2 + 1] - segment[i2 - 1];
      x2 = segment[i2 + 2] - segment[i2];
      y2 = segment[i2 + 3] - segment[i2 + 1];
      a = _atan22(y, x);
      a2 = _atan22(y2, x2);
      smooth = Math.abs(a - a2) < limit;
      if (smooth) {
        smoothData[i2 - 2] = a;
        smoothData[i2 + 2] = a2;
        smoothData[i2 - 1] = _sqrt3(x * x + y * y);
        smoothData[i2 + 3] = _sqrt3(x2 * x2 + y2 * y2);
      }
      isSmooth.push(smooth, smooth, 0, 0, smooth, smooth);
    }
    if (segment[l] === segment[0] && segment[l + 1] === segment[1]) {
      x = segment[0] - segment[l - 2];
      y = segment[1] - segment[l - 1];
      x2 = segment[2] - segment[0];
      y2 = segment[3] - segment[1];
      a = _atan22(y, x);
      a2 = _atan22(y2, x2);
      if (Math.abs(a - a2) < limit) {
        smoothData[l - 2] = a;
        smoothData[2] = a2;
        smoothData[l - 1] = _sqrt3(x * x + y * y);
        smoothData[3] = _sqrt3(x2 * x2 + y2 * y2);
        isSmooth[l - 2] = isSmooth[l - 1] = true;
      }
    }
  }
  return rawPath;
};
var _parseOriginFactors = function _parseOriginFactors2(v) {
  var a = v.trim().split(" "), x = ~v.indexOf("left") ? 0 : ~v.indexOf("right") ? 100 : isNaN(parseFloat(a[0])) ? 50 : parseFloat(a[0]), y = ~v.indexOf("top") ? 0 : ~v.indexOf("bottom") ? 100 : isNaN(parseFloat(a[1])) ? 50 : parseFloat(a[1]);
  return {
    x: x / 100,
    y: y / 100
  };
};
var _shortAngle = function _shortAngle2(dif) {
  return dif !== dif % _PI ? dif + (dif < 0 ? _2PI : -_2PI) : dif;
};
var _morphMessage = "Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.";
var _tweenRotation = function _tweenRotation2(start, end, i2, linkedPT) {
  var so = this._origin, eo = this._eOrigin, dx = start[i2] - so.x, dy = start[i2 + 1] - so.y, d = _sqrt3(dx * dx + dy * dy), sa = _atan22(dy, dx), angleDif, _short;
  dx = end[i2] - eo.x;
  dy = end[i2 + 1] - eo.y;
  angleDif = _atan22(dy, dx) - sa;
  _short = _shortAngle(angleDif);
  if (!linkedPT && _lastLinkedAnchor && Math.abs(_short + _lastLinkedAnchor.ca) < _angleMin) {
    linkedPT = _lastLinkedAnchor;
  }
  return this._anchorPT = _lastLinkedAnchor = {
    _next: this._anchorPT,
    t: start,
    sa,
    //starting angle
    ca: linkedPT && _short * linkedPT.ca < 0 && Math.abs(_short) > _angleMax ? angleDif : _short,
    //change in angle
    sl: d,
    //starting length
    cl: _sqrt3(dx * dx + dy * dy) - d,
    //change in length
    i: i2
  };
};
var _initCore35 = function _initCore36(required) {
  gsap23 = _getGSAP41();
  PluginClass = PluginClass || gsap23 && gsap23.plugins.morphSVG;
  if (gsap23 && PluginClass) {
    _toArray9 = gsap23.utils.toArray;
    _doc8 = document;
    PluginClass.prototype._tweenRotation = _tweenRotation;
    _coreInitted19 = 1;
  } else if (required) {
    _log("Please gsap.registerPlugin(MorphSVGPlugin)");
  }
};
var MorphSVGPlugin = {
  version: "3.13.0",
  name: "morphSVG",
  rawVars: 1,
  // otherwise "render" would be interpreted as a function-based value.
  register: function register7(core, Plugin) {
    gsap23 = core;
    PluginClass = Plugin;
    _initCore35();
  },
  init: function init12(target, value, tween, index, targets) {
    _coreInitted19 || _initCore35(1);
    if (!value) {
      _log("invalid shape");
      return false;
    }
    _isFunction13(value) && (value = value.call(tween, index, target, targets));
    var type, p2, pt, shape, isPoly, shapeIndex, map, startSmooth, endSmooth, start, end, i2, j, l, startSeg, endSeg, precompiled, sData, eData, originFactors, useRotation, offset;
    if (typeof value === "string" || value.getBBox || value[0]) {
      value = {
        shape: value
      };
    } else if (typeof value === "object") {
      type = {};
      for (p2 in value) {
        type[p2] = _isFunction13(value[p2]) && p2 !== "render" ? value[p2].call(tween, index, target, targets) : value[p2];
      }
      value = type;
    }
    var cs = target.nodeType ? window.getComputedStyle(target) : {}, fill = cs.fill + "", fillSafe = !(fill === "none" || (fill.match(_numExp4) || [])[3] === "0" || cs.fillRule === "evenodd"), origins = (value.origin || "50 50").split(",");
    type = (target.nodeName + "").toUpperCase();
    isPoly = type === "POLYLINE" || type === "POLYGON";
    if (type !== "PATH" && !isPoly && !value.prop) {
      _log("Cannot morph a <" + type + "> element. " + _morphMessage);
      return false;
    }
    p2 = type === "PATH" ? "d" : "points";
    if (!value.prop && !_isFunction13(target.setAttribute)) {
      return false;
    }
    shape = _parseShape(value.shape || value.d || value.points || "", p2 === "d", target);
    if (isPoly && _commands.test(shape)) {
      _log("A <" + type + "> cannot accept path data. " + _morphMessage);
      return false;
    }
    shapeIndex = value.shapeIndex || value.shapeIndex === 0 ? value.shapeIndex : "auto";
    map = value.map || MorphSVGPlugin.defaultMap;
    this._prop = value.prop;
    this._render = value.render || MorphSVGPlugin.defaultRender;
    this._apply = "updateTarget" in value ? value.updateTarget : MorphSVGPlugin.defaultUpdateTarget;
    this._rnd = Math.pow(10, isNaN(value.precision) ? 2 : +value.precision);
    this._tween = tween;
    if (shape) {
      this._target = target;
      precompiled = typeof value.precompile === "object";
      start = this._prop ? target[this._prop] : target.getAttribute(p2);
      if (!this._prop && !target.getAttributeNS(null, "data-original")) {
        target.setAttributeNS(null, "data-original", start);
      }
      if (p2 === "d" || this._prop) {
        start = stringToRawPath(precompiled ? value.precompile[0] : start);
        end = stringToRawPath(precompiled ? value.precompile[1] : shape);
        if (!precompiled && !_equalizeSegmentQuantity(start, end, shapeIndex, map, fillSafe)) {
          return false;
        }
        if (value.precompile === "log" || value.precompile === true) {
          _log('precompile:["' + rawPathToString(start) + '","' + rawPathToString(end) + '"]');
        }
        useRotation = (value.type || MorphSVGPlugin.defaultType) !== "linear";
        if (useRotation) {
          start = _populateSmoothData(start, value.smoothTolerance);
          end = _populateSmoothData(end, value.smoothTolerance);
          if (!start.size) {
            _getTotalSize(start);
          }
          if (!end.size) {
            _getTotalSize(end);
          }
          originFactors = _parseOriginFactors(origins[0]);
          this._origin = start.origin = {
            x: start.left + originFactors.x * start.width,
            y: start.top + originFactors.y * start.height
          };
          if (origins[1]) {
            originFactors = _parseOriginFactors(origins[1]);
          }
          this._eOrigin = {
            x: end.left + originFactors.x * end.width,
            y: end.top + originFactors.y * end.height
          };
        }
        this._rawPath = target._gsRawPath = start;
        j = start.length;
        while (--j > -1) {
          startSeg = start[j];
          endSeg = end[j];
          startSmooth = startSeg.isSmooth || [];
          endSmooth = endSeg.isSmooth || [];
          l = startSeg.length;
          _lastLinkedAnchor = 0;
          for (i2 = 0; i2 < l; i2 += 2) {
            if (endSeg[i2] !== startSeg[i2] || endSeg[i2 + 1] !== startSeg[i2 + 1]) {
              if (useRotation) {
                if (startSmooth[i2] && endSmooth[i2]) {
                  sData = startSeg.smoothData;
                  eData = endSeg.smoothData;
                  offset = i2 + (i2 === l - 4 ? 7 - l : 5);
                  this._controlPT = {
                    _next: this._controlPT,
                    i: i2,
                    j,
                    l1s: sData[i2 + 1],
                    l1c: eData[i2 + 1] - sData[i2 + 1],
                    l2s: sData[offset],
                    l2c: eData[offset] - sData[offset]
                  };
                  pt = this._tweenRotation(startSeg, endSeg, i2 + 2);
                  this._tweenRotation(startSeg, endSeg, i2, pt);
                  this._tweenRotation(startSeg, endSeg, offset - 1, pt);
                  i2 += 4;
                } else {
                  this._tweenRotation(startSeg, endSeg, i2);
                }
              } else {
                pt = this.add(startSeg, i2, startSeg[i2], endSeg[i2], 0, 0, 0, 0, 0, 1);
                pt = this.add(startSeg, i2 + 1, startSeg[i2 + 1], endSeg[i2 + 1], 0, 0, 0, 0, 0, 1) || pt;
              }
            }
          }
        }
      } else {
        pt = this.add(target, "setAttribute", target.getAttribute(p2) + "", shape + "", index, targets, 0, _buildPointsFilter(shapeIndex), p2);
      }
      if (useRotation) {
        this.add(this._origin, "x", this._origin.x, this._eOrigin.x, 0, 0, 0, 0, 0, 1);
        pt = this.add(this._origin, "y", this._origin.y, this._eOrigin.y, 0, 0, 0, 0, 0, 1);
      }
      if (pt) {
        this._props.push("morphSVG");
        pt.end = shape;
        pt.endProp = p2;
      }
    }
    return _bonusValidated7;
  },
  render: function render11(ratio, data) {
    var rawPath = data._rawPath, controlPT = data._controlPT, anchorPT = data._anchorPT, rnd = data._rnd, target = data._target, pt = data._pt, s, space, easeInOut, segment, l, angle, i2, j, x, y, sin, cos, offset;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
    if (ratio === 1 && data._apply) {
      pt = data._pt;
      while (pt) {
        if (pt.end) {
          if (data._prop) {
            target[data._prop] = pt.end;
          } else {
            target.setAttribute(pt.endProp, pt.end);
          }
        }
        pt = pt._next;
      }
    } else if (rawPath) {
      while (anchorPT) {
        angle = anchorPT.sa + ratio * anchorPT.ca;
        l = anchorPT.sl + ratio * anchorPT.cl;
        anchorPT.t[anchorPT.i] = data._origin.x + _cos2(angle) * l;
        anchorPT.t[anchorPT.i + 1] = data._origin.y + _sin2(angle) * l;
        anchorPT = anchorPT._next;
      }
      easeInOut = ratio < 0.5 ? 2 * ratio * ratio : (4 - 2 * ratio) * ratio - 1;
      while (controlPT) {
        i2 = controlPT.i;
        segment = rawPath[controlPT.j];
        offset = i2 + (i2 === segment.length - 4 ? 7 - segment.length : 5);
        angle = _atan22(segment[offset] - segment[i2 + 1], segment[offset - 1] - segment[i2]);
        sin = _sin2(angle);
        cos = _cos2(angle);
        x = segment[i2 + 2];
        y = segment[i2 + 3];
        l = controlPT.l1s + easeInOut * controlPT.l1c;
        segment[i2] = x - cos * l;
        segment[i2 + 1] = y - sin * l;
        l = controlPT.l2s + easeInOut * controlPT.l2c;
        segment[offset - 1] = x + cos * l;
        segment[offset] = y + sin * l;
        controlPT = controlPT._next;
      }
      target._gsRawPath = rawPath;
      if (data._apply) {
        s = "";
        space = " ";
        for (j = 0; j < rawPath.length; j++) {
          segment = rawPath[j];
          l = segment.length;
          s += "M" + (segment[0] * rnd | 0) / rnd + space + (segment[1] * rnd | 0) / rnd + " C";
          for (i2 = 2; i2 < l; i2++) {
            s += (segment[i2] * rnd | 0) / rnd + space;
          }
        }
        if (data._prop) {
          target[data._prop] = s;
        } else {
          target.setAttribute("d", s);
        }
      }
    }
    data._render && rawPath && data._render.call(data._tween, rawPath, target);
  },
  kill: function kill4(property) {
    this._pt = this._rawPath = 0;
  },
  getRawPath,
  stringToRawPath,
  rawPathToString,
  normalizeStrings: function normalizeStrings(shape1, shape2, _ref) {
    var shapeIndex = _ref.shapeIndex, map = _ref.map;
    var result = [shape1, shape2];
    _pathFilter(result, shapeIndex, map);
    return result;
  },
  pathFilter: _pathFilter,
  pointsFilter: _pointsFilter,
  getTotalSize: _getTotalSize,
  equalizeSegmentQuantity: _equalizeSegmentQuantity,
  convertToPath: function convertToPath3(targets, swap) {
    return _toArray9(targets).map(function(target) {
      return convertToPath(target, swap !== false);
    });
  },
  defaultType: "linear",
  defaultUpdateTarget: true,
  defaultMap: "size"
};
_getGSAP41() && gsap23.registerPlugin(MorphSVGPlugin);

// node_modules/gsap/utils/PathEditor.js
var _numbersExp2 = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig;
var _doc9;
var _supportsPointer2;
var _win9;
var _body7;
var gsap24;
var _context5;
var _selectionColor = "#4e7fff";
var _minimumMovement = 1;
var _DEG2RAD6 = Math.PI / 180;
var _getTime4 = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
};
var _lastInteraction = 0;
var _isPressed = 0;
var _emptyFunc7 = function _emptyFunc8() {
  return false;
};
var _interacted = function _interacted2() {
  return _lastInteraction = _getTime4();
};
var _CTRL;
var _ALT;
var _SHIFT;
var _CMD;
var _recentlyAddedAnchor;
var _editingAxis = {};
var _history = [];
var _point = {};
var _temp3 = [];
var _comma = ",";
var _selectedPaths = [];
var _preventDefault3 = function _preventDefault4(event) {
  if (event.preventDefault) {
    event.preventDefault();
    if (event.preventManipulation) {
      event.preventManipulation();
    }
  }
};
var _createElement5 = function _createElement6(type) {
  return _doc9.createElementNS ? _doc9.createElementNS("http://www.w3.org/1999/xhtml", type) : _doc9.createElement(type);
};
var _createSVG = function _createSVG2(type, container, attributes) {
  var element = _doc9.createElementNS("http://www.w3.org/2000/svg", type), reg = /([a-z])([A-Z])/g, p2;
  attributes = attributes || {};
  attributes["class"] = attributes["class"] || "path-editor";
  for (p2 in attributes) {
    if (element.style[p2] !== void 0) {
      element.style[p2] = attributes[p2];
    } else {
      element.setAttributeNS(null, p2.replace(reg, "$1-$2").toLowerCase(), attributes[p2]);
    }
  }
  container.appendChild(element);
  return element;
};
var _identityMatrixObject = {
  matrix: new Matrix2D()
};
var _getConsolidatedMatrix = function _getConsolidatedMatrix2(target) {
  return (target.transform && target.transform.baseVal.consolidate() || _identityMatrixObject).matrix;
};
var _getConcatenatedTransforms = function _getConcatenatedTransforms2(target) {
  var m = _getConsolidatedMatrix(target), owner = target.ownerSVGElement;
  while ((target = target.parentNode) && target.ownerSVGElement === owner) {
    m.multiply(_getConsolidatedMatrix(target));
  }
  return "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.e + "," + m.f + ")";
};
var _addHistory = function _addHistory2(pathEditor) {
  var selectedIndexes = [], a = pathEditor._selectedAnchors, i2;
  for (i2 = 0; i2 < a.length; i2++) {
    selectedIndexes[i2] = a[i2].i;
  }
  _history.unshift({
    path: pathEditor,
    d: pathEditor.path.getAttribute("d"),
    transform: pathEditor.path.getAttribute("transform") || "",
    selectedIndexes
  });
  if (_history.length > 30) {
    _history.length = 30;
  }
};
var _round21 = function _round22(value) {
  return ~~(value * 1e3 + (value < 0 ? -0.5 : 0.5)) / 1e3;
};
var _getSquarePathData = function _getSquarePathData2(size) {
  size = _round21(size);
  return ["M-" + size, -size, size, -size, size, size, -size, size + "z"].join(_comma);
};
var _getCirclePathData = function _getCirclePathData2(size) {
  var circ = 0.552284749831, rcirc = _round21(size * circ);
  size = _round21(size);
  return "M" + size + ",0C" + [size, rcirc, rcirc, size, 0, size, -rcirc, size, -size, rcirc, -size, 0, -size, -rcirc, -rcirc, -size, 0, -size, rcirc, -size, size, -rcirc, size, 0].join(_comma) + "z";
};
var _checkDeselect = function _checkDeselect2(e) {
  if (!e.target._gsSelection && !_isPressed && _getTime4() - _lastInteraction > 100) {
    var i2 = _selectedPaths.length;
    while (--i2 > -1) {
      _selectedPaths[i2].deselect();
    }
    _selectedPaths.length = 0;
  }
};
var _tempDiv3;
var _touchEventLookup2;
var _isMultiTouching2 = 0;
var _addListener9 = function _addListener10(element, type, func, capture) {
  if (element.addEventListener) {
    var touchType = _touchEventLookup2[type];
    capture = capture || {
      passive: false
    };
    element.addEventListener(touchType || type, func, capture);
    if (touchType && type !== touchType && touchType.substr(0, 7) !== "pointer") {
      element.addEventListener(type, func, capture);
    }
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, func);
  }
};
var _removeListener9 = function _removeListener10(element, type, func) {
  if (element.removeEventListener) {
    var touchType = _touchEventLookup2[type];
    element.removeEventListener(touchType || type, func);
    if (touchType && type !== touchType && touchType.substr(0, 7) !== "pointer") {
      element.removeEventListener(type, func);
    }
  } else if (element.detachEvent) {
    element.detachEvent("on" + type, func);
  }
};
var _hasTouchID3 = function _hasTouchID4(list, ID) {
  var i2 = list.length;
  while (--i2 > -1) {
    if (list[i2].identifier === ID) {
      return true;
    }
  }
  return false;
};
var _onMultiTouchDocumentEnd3 = function _onMultiTouchDocumentEnd4(e) {
  _isMultiTouching2 = e.touches && _dragCount < e.touches.length;
  _removeListener9(e.target, "touchend", _onMultiTouchDocumentEnd4);
};
var _onMultiTouchDocument3 = function _onMultiTouchDocument4(e) {
  _isMultiTouching2 = e.touches && _dragCount < e.touches.length;
  _addListener9(e.target, "touchend", _onMultiTouchDocumentEnd3);
};
var _bind = function _bind2(func, scope) {
  return function(e) {
    return func.call(scope, e);
  };
};
var _callback3 = function _callback4(type, self, param) {
  var callback = self.vars[type];
  if (callback) {
    callback.call(self.vars.callbackScope || self, param || self);
  }
  return self;
};
var _copyElement;
var _resetSelection = function _resetSelection2() {
  _copyElement.style.display = "block";
  _copyElement.select();
  _copyElement.style.display = "none";
};
var _coreInitted20;
var _initCore37 = function _initCore38(core) {
  _doc9 = document;
  _win9 = window;
  _body7 = _doc9.body;
  gsap24 = gsap24 || core || _win9.gsap || console.warn("Please gsap.registerPlugin(PathEditor)");
  _context5 = gsap24 && gsap24.core.context || function() {
  };
  _tempDiv3 = _createElement5("div");
  _copyElement = _createElement5("textarea");
  _copyElement.style.display = "none";
  _body7 && _body7.appendChild(_copyElement);
  _touchEventLookup2 = function(types) {
    var standard = types.split(","), converted = (_tempDiv3.onpointerdown !== void 0 ? "pointerdown,pointermove,pointerup,pointercancel" : _tempDiv3.onmspointerdown !== void 0 ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : types).split(","), obj = {}, i2 = 4;
    while (--i2 > -1) {
      obj[standard[i2]] = converted[i2];
      obj[converted[i2]] = standard[i2];
    }
    return obj;
  }("touchstart,touchmove,touchend,touchcancel");
  SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(e) {
    return e.getScreenCTM().inverse().multiply(this.getScreenCTM());
  };
  _doc9.addEventListener("keydown", function(e) {
    var key = e.keyCode || e.which, keyString = e.key || key, i2, state, a, path;
    if (keyString === "Shift" || key === 16) {
      _SHIFT = true;
    } else if (keyString === "Control" || key === 17) {
      _CTRL = true;
    } else if (keyString === "Meta" || key === 91) {
      _CMD = true;
    } else if (keyString === "Alt" || key === 18) {
      _ALT = true;
      i2 = _selectedPaths.length;
      while (--i2 > -1) {
        _selectedPaths[i2]._onPressAlt();
      }
    } else if ((keyString === "z" || key === 90) && (_CTRL || _CMD) && _history.length > 1) {
      _history.shift();
      state = _history[0];
      if (state) {
        path = state.path;
        path.path.setAttribute("d", state.d);
        path.path.setAttribute("transform", state.transform);
        path.init();
        a = path._anchors;
        for (i2 = 0; i2 < a.length; i2++) {
          if (state.selectedIndexes.indexOf(a[i2].i) !== -1) {
            path._selectedAnchors.push(a[i2]);
          }
        }
        path._updateAnchors();
        path.update();
        if (path.vars.onUndo) {
          path.vars.onUndo.call(path);
        }
      }
    } else if (keyString === "Delete" || keyString === "Backspace" || key === 8 || key === 46 || key === 63272 || key === "d" && (_CTRL || _CMD)) {
      i2 = _selectedPaths.length;
      while (--i2 > -1) {
        _selectedPaths[i2]._deleteSelectedAnchors();
      }
    } else if ((keyString === "a" || key === 65) && (_CMD || _CTRL)) {
      i2 = _selectedPaths.length;
      while (--i2 > -1) {
        _selectedPaths[i2].select(true);
      }
    }
  }, true);
  _doc9.addEventListener("keyup", function(e) {
    var key = e.key || e.keyCode || e.which;
    if (key === "Shift" || key === 16) {
      _SHIFT = false;
    } else if (key === "Control" || key === 17) {
      _CTRL = false;
    } else if (key === "Meta" || key === 91) {
      _CMD = false;
    } else if (key === "Alt" || key === 18) {
      _ALT = false;
      var i2 = _selectedPaths.length;
      while (--i2 > -1) {
        _selectedPaths[i2]._onReleaseAlt();
      }
    }
  }, true);
  _supportsPointer2 = !!_win9.PointerEvent;
  _addListener9(_doc9, "mouseup", _checkDeselect);
  _addListener9(_doc9, "touchend", _checkDeselect);
  _addListener9(_doc9, "touchcancel", _emptyFunc7);
  _addListener9(_win9, "touchmove", _emptyFunc7);
  _body7 && _body7.addEventListener("touchstart", _emptyFunc7);
  _coreInitted20 = 1;
};
var _onPress = function _onPress2(e) {
  var self = this, ctm = getGlobalMatrix(self.target.parentNode, true), touchEventTarget, temp;
  this._matrix = this.target.transform.baseVal.getItem(0).matrix;
  this._ctm = ctm;
  if (_touchEventLookup2[e.type]) {
    touchEventTarget = e.type.indexOf("touch") !== -1 ? e.currentTarget || e.target : _doc9;
    _addListener9(touchEventTarget, "touchend", self._onRelease);
    _addListener9(touchEventTarget, "touchmove", self._onMove);
    _addListener9(touchEventTarget, "touchcancel", self._onRelease);
    _addListener9(_doc9, "touchstart", _onMultiTouchDocument3);
    _addListener9(_win9, "touchforcechange", _preventDefault3);
  } else {
    touchEventTarget = null;
    _addListener9(_doc9, "mousemove", self._onMove);
  }
  if (!_supportsPointer2) {
    _addListener9(_doc9, "mouseup", self._onRelease);
  }
  _preventDefault3(e);
  _resetSelection();
  if (e.changedTouches) {
    e = self.touch = e.changedTouches[0];
    self.touchID = e.identifier;
  } else if (e.pointerId) {
    self.touchID = e.pointerId;
  } else {
    self.touch = self.touchID = null;
  }
  self._startPointerY = self.pointerY = e.pageY;
  self._startPointerX = self.pointerX = e.pageX;
  self._startElementX = self._matrix.e;
  self._startElementY = self._matrix.f;
  if (this._ctm.a === 1 && this._ctm.b === 0 && this._ctm.c === 0 && this._ctm.d === 1) {
    this._ctm = null;
  } else {
    temp = self._startPointerX * this._ctm.a + self._startPointerY * this._ctm.c + this._ctm.e;
    self._startPointerY = self._startPointerX * this._ctm.b + self._startPointerY * this._ctm.d + this._ctm.f;
    self._startPointerX = temp;
  }
  self.isPressed = _isPressed = true;
  self.touchEventTarget = touchEventTarget;
  if (self.vars.onPress) {
    self.vars.onPress.call(self.vars.callbackScope || self, self.pointerEvent);
  }
};
var _onMove = function _onMove2(e) {
  var self = this, originalEvent = e, touches, i2;
  if (!self._enabled || _isMultiTouching2 || !self.isPressed || !e) {
    return;
  }
  self.pointerEvent = e;
  touches = e.changedTouches;
  if (touches) {
    e = touches[0];
    if (e !== self.touch && e.identifier !== self.touchID) {
      i2 = touches.length;
      while (--i2 > -1 && (e = touches[i2]).identifier !== self.touchID) {
      }
      if (i2 < 0) {
        return;
      }
    }
  } else if (e.pointerId && self.touchID && e.pointerId !== self.touchID) {
    return;
  }
  _preventDefault3(originalEvent);
  self.setPointerPosition(e.pageX, e.pageY);
  if (self.vars.onDrag) {
    self.vars.onDrag.call(self.vars.callbackScope || self, self.pointerEvent);
  }
};
var _onRelease = function _onRelease2(e, force) {
  var self = this;
  if (!self._enabled || !self.isPressed || e && self.touchID != null && !force && (e.pointerId && e.pointerId !== self.touchID || e.changedTouches && !_hasTouchID3(e.changedTouches, self.touchID))) {
    return;
  }
  _interacted();
  self.isPressed = _isPressed = false;
  var originalEvent = e, wasDragging = self.isDragging, touchEventTarget = self.touchEventTarget, touches, i2;
  if (touchEventTarget) {
    _removeListener9(touchEventTarget, "touchend", self._onRelease);
    _removeListener9(touchEventTarget, "touchmove", self._onMove);
    _removeListener9(touchEventTarget, "touchcancel", self._onRelease);
    _removeListener9(_doc9, "touchstart", _onMultiTouchDocument3);
  } else {
    _removeListener9(_doc9, "mousemove", self._onMove);
  }
  if (!_supportsPointer2) {
    _removeListener9(_doc9, "mouseup", self._onRelease);
    if (e && e.target) {
      _removeListener9(e.target, "mouseup", self._onRelease);
    }
  }
  if (wasDragging) {
    self.isDragging = false;
  } else if (self.vars.onClick) {
    self.vars.onClick.call(self.vars.callbackScope || self, originalEvent);
  }
  if (e) {
    touches = e.changedTouches;
    if (touches) {
      e = touches[0];
      if (e !== self.touch && e.identifier !== self.touchID) {
        i2 = touches.length;
        while (--i2 > -1 && (e = touches[i2]).identifier !== self.touchID) {
        }
        if (i2 < 0) {
          return;
        }
      }
    }
    self.pointerEvent = originalEvent;
    self.pointerX = e.pageX;
    self.pointerY = e.pageY;
  }
  if (originalEvent && !wasDragging && self.vars.onDragRelease) {
    self.vars.onDragRelease.call(self, self.pointerEvent);
  } else {
    if (originalEvent) {
      _preventDefault3(originalEvent);
    }
    if (self.vars.onRelease) {
      self.vars.onRelease.call(self.vars.callbackScope || self, self.pointerEvent);
    }
  }
  if (wasDragging && self.vars.onDragEnd) {
    self.vars.onDragEnd.call(self.vars.callbackScope || self, self.pointerEvent);
  }
  return true;
};
var _createSegmentAnchors = function _createSegmentAnchors2(rawPath, j, editor, vars) {
  var segment = rawPath[j], l = segment.length - (segment.closed ? 6 : 0), a = [], i2;
  for (i2 = 0; i2 < l; i2 += 6) {
    a.push(new Anchor(editor, rawPath, j, i2, vars));
  }
  segment.closed && (a[0].isClosedStart = true);
  return a;
};
var _getLength3 = function _getLength4(segment, i2, i22) {
  var x = segment[i22] - segment[i2], y = segment[i22 + 1] - segment[i2 + 1];
  return Math.sqrt(x * x + y * y);
};
var DraggableSVG = function() {
  function DraggableSVG2(target, vars) {
    this.target = typeof target === "string" ? _doc9.querySelectorAll(target)[0] : target;
    this.vars = vars || {};
    this._onPress = _bind(_onPress, this);
    this._onMove = _bind(_onMove, this);
    this._onRelease = _bind(_onRelease, this);
    this.target.setAttribute("transform", (this.target.getAttribute("transform") || "") + " translate(0,0)");
    this._matrix = _getConsolidatedMatrix(this.target);
    this.x = this._matrix.e;
    this.y = this._matrix.f;
    this.snap = vars.snap;
    if (!isNaN(vars.maxX) || !isNaN(vars.minX)) {
      this._bounds = 1;
      this.maxX = +vars.maxX;
      this.minX = +vars.minX;
    } else {
      this._bounds = 0;
    }
    this.enabled(true);
  }
  var _proto = DraggableSVG2.prototype;
  _proto.setPointerPosition = function setPointerPosition(pointerX, pointerY) {
    var rnd = 1e3, xChange, yChange, x, y, temp;
    this.pointerX = pointerX;
    this.pointerY = pointerY;
    if (this._ctm) {
      temp = pointerX * this._ctm.a + pointerY * this._ctm.c + this._ctm.e;
      pointerY = pointerX * this._ctm.b + pointerY * this._ctm.d + this._ctm.f;
      pointerX = temp;
    }
    yChange = pointerY - this._startPointerY;
    xChange = pointerX - this._startPointerX;
    if (yChange < _minimumMovement && yChange > -_minimumMovement) {
      yChange = 0;
    }
    if (xChange < _minimumMovement && xChange > -_minimumMovement) {
      xChange = 0;
    }
    x = ((this._startElementX + xChange) * rnd | 0) / rnd;
    y = ((this._startElementY + yChange) * rnd | 0) / rnd;
    if (this.snap && !_SHIFT) {
      _point.x = x;
      _point.y = y;
      this.snap.call(this, _point);
      x = _point.x;
      y = _point.y;
    }
    if (this.x !== x || this.y !== y) {
      this._matrix.f = this.y = y;
      this._matrix.e = this.x = x;
      if (!this.isDragging && this.isPressed) {
        this.isDragging = true;
        _callback3("onDragStart", this, this.pointerEvent);
      }
    }
  };
  _proto.enabled = function enabled(_enabled2) {
    if (!arguments.length) {
      return this._enabled;
    }
    var dragging;
    this._enabled = _enabled2;
    if (_enabled2) {
      if (!_supportsPointer2) {
        _addListener9(this.target, "mousedown", this._onPress);
      }
      _addListener9(this.target, "touchstart", this._onPress);
      _addListener9(this.target, "click", this._onClick, true);
    } else {
      dragging = this.isDragging;
      _removeListener9(this.target, "mousedown", this._onPress);
      _removeListener9(this.target, "touchstart", this._onPress);
      _removeListener9(_win9, "touchforcechange", _preventDefault3);
      _removeListener9(this.target, "click", this._onClick);
      if (this.touchEventTarget) {
        _removeListener9(this.touchEventTarget, "touchcancel", this._onRelease);
        _removeListener9(this.touchEventTarget, "touchend", this._onRelease);
        _removeListener9(this.touchEventTarget, "touchmove", this._onMove);
      }
      _removeListener9(_doc9, "mouseup", this._onRelease);
      _removeListener9(_doc9, "mousemove", this._onMove);
      this.isDragging = this.isPressed = false;
      if (dragging) {
        _callback3("onDragEnd", this, this.pointerEvent);
      }
    }
    return this;
  };
  _proto.endDrag = function endDrag(e) {
    this._onRelease(e);
  };
  return DraggableSVG2;
}();
var Anchor = function() {
  function Anchor2(editor, rawPath, j, i2, vars) {
    this.editor = editor;
    this.element = _createSVG("path", editor._selection, {
      fill: _selectionColor,
      stroke: _selectionColor,
      strokeWidth: 2,
      vectorEffect: "non-scaling-stroke"
    });
    this.update(rawPath, j, i2);
    this.element._gsSelection = true;
    this.vars = vars || {};
    this._draggable = new DraggableSVG(this.element, {
      callbackScope: this,
      onDrag: this.onDrag,
      snap: this.vars.snap,
      onPress: this.onPress,
      onRelease: this.onRelease,
      onClick: this.onClick,
      onDragEnd: this.onDragEnd
    });
  }
  var _proto2 = Anchor2.prototype;
  _proto2.onPress = function onPress() {
    _callback3("onPress", this);
  };
  _proto2.onClick = function onClick() {
    _callback3("onClick", this);
  };
  _proto2.onDrag = function onDrag() {
    var s = this.segment;
    this.vars.onDrag.call(this.vars.callbackScope || this, this, this._draggable.x - s[this.i], this._draggable.y - s[this.i + 1]);
  };
  _proto2.onDragEnd = function onDragEnd() {
    _callback3("onDragEnd", this);
  };
  _proto2.onRelease = function onRelease() {
    _callback3("onRelease", this);
  };
  _proto2.update = function update(rawPath, j, i2) {
    if (rawPath) {
      this.rawPath = rawPath;
    }
    if (arguments.length <= 1) {
      j = this.j;
      i2 = this.i;
    } else {
      this.j = j;
      this.i = i2;
    }
    var prevSmooth = this.smooth, segment = this.rawPath[j], pi = i2 === 0 && segment.closed ? segment.length - 4 : i2 - 2;
    this.segment = segment;
    this.smooth = i2 > 0 && i2 < segment.length - 2 && Math.abs(Math.atan2(segment[i2 + 1] - segment[pi + 1], segment[i2] - segment[pi]) - Math.atan2(segment[i2 + 3] - segment[i2 + 1], segment[i2 + 2] - segment[i2])) < 0.09 ? 2 : 0;
    if (this.smooth !== prevSmooth) {
      this.element.setAttribute("d", this.smooth ? this.editor._circleHandle : this.editor._squareHandle);
    }
    this.element.setAttribute("transform", "translate(" + segment[i2] + "," + segment[i2 + 1] + ")");
  };
  return Anchor2;
}();
var PathEditor = function() {
  function PathEditor2(target, vars) {
    vars = vars || {};
    _coreInitted20 || _initCore37();
    this.vars = vars;
    this.path = typeof target === "string" ? _doc9.querySelectorAll(target)[0] : target;
    this._g = _createSVG("g", this.path.ownerSVGElement, {
      "class": "path-editor-g path-editor"
    });
    this._selectionHittest = _createSVG("path", this._g, {
      stroke: "transparent",
      strokeWidth: 16,
      fill: "none",
      vectorEffect: "non-scaling-stroke"
    });
    this._selection = vars._selection || _createSVG("g", this._g, {
      "class": "path-editor-selection path-editor"
    });
    this._selectionPath = _createSVG("path", this._selection, {
      stroke: _selectionColor,
      strokeWidth: 2,
      fill: "none",
      vectorEffect: "non-scaling-stroke"
    });
    this._selectedAnchors = [];
    this._line1 = _createSVG("polyline", this._selection, {
      stroke: _selectionColor,
      strokeWidth: 2,
      vectorEffect: "non-scaling-stroke"
    });
    this._line2 = _createSVG("polyline", this._selection, {
      stroke: _selectionColor,
      strokeWidth: 2,
      vectorEffect: "non-scaling-stroke"
    });
    this._line1.style.pointerEvents = this._line2.style.pointerEvents = this._selectionPath.style.pointerEvents = "none";
    this._enabled = true;
    var ctm = this.path.parentNode.getScreenCTM().inverse(), size = (ctm.a + ctm.d) / 2 * (vars.handleSize || 5);
    this._squareHandle = _getSquarePathData(size);
    this._circleHandle = _getCirclePathData(size * 1.15);
    this._handle1 = _createSVG("path", this._selection, {
      d: this._squareHandle,
      fill: _selectionColor,
      stroke: "transparent",
      strokeWidth: 6
    });
    this._handle2 = _createSVG("path", this._selection, {
      d: this._squareHandle,
      fill: _selectionColor,
      stroke: "transparent",
      strokeWidth: 6
    });
    this._handle1._draggable = new DraggableSVG(this._handle1, {
      onDrag: this._onDragHandle1,
      callbackScope: this,
      onPress: this._onPressHandle1,
      onRelease: this._onReleaseHandle,
      onClick: this._onClickHandle1,
      snap: vars.handleSnap
    });
    this._handle2._draggable = new DraggableSVG(this._handle2, {
      onDrag: this._onDragHandle2,
      callbackScope: this,
      onPress: this._onPressHandle2,
      onRelease: this._onReleaseHandle,
      onClick: this._onClickHandle2,
      snap: vars.handleSnap
    });
    this._handle1.style.visibility = this._handle2.style.visibility = "hidden";
    var selectionItems = [this._handle1, this._handle2, this._line1, this._line2, this._selection, this._selectionPath, this._selectionHittest], i2 = selectionItems.length;
    while (--i2 > -1) {
      selectionItems[i2]._gsSelection = true;
    }
    if (vars.draggable !== false) {
      this._draggable = new DraggableSVG(this._selectionHittest, {
        callbackScope: this,
        onPress: this.select,
        onRelease: this._onRelease,
        onDrag: this._onDragPath,
        onDragEnd: this._saveState,
        maxX: this.vars.maxX,
        minX: this.vars.minX
      });
    }
    this.init();
    this._selection.style.visibility = vars.selected === false ? "hidden" : "visible";
    if (vars.selected !== false) {
      this.path._gsSelection = true;
      _selectedPaths.push(this);
    }
    this._saveState();
    if (!_supportsPointer2) {
      _addListener9(this._selectionHittest, "mousedown", _bind(this._onClickSelectionPath, this));
      _addListener9(this._selectionHittest, "mouseup", _bind(this._onRelease, this));
    }
    _addListener9(this._selectionHittest, "touchstart", _bind(this._onClickSelectionPath, this));
    _addListener9(this._selectionHittest, "touchend", _bind(this._onRelease, this));
    _context5(this);
  }
  var _proto3 = PathEditor2.prototype;
  _proto3._onRelease = function _onRelease3(e) {
    var anchor = this._editingAnchor;
    if (anchor) {
      _editingAxis.x = anchor.segment[anchor.i];
      _editingAxis.y = anchor.segment[anchor.i + 1];
    }
    _removeListener9(_win9, "touchforcechange", _preventDefault3);
    _callback3("onRelease", this, e);
  };
  _proto3.init = function init13() {
    var pathData = this.path.getAttribute("d"), rawPath = stringToRawPath(pathData), transform = this.path.getAttribute("transform") || "translate(0,0)", createAnchors = !this._rawPath || rawPath.totalPoints !== this._rawPath.totalPoints || rawPath.length !== this._rawPath.length, anchorVars = {
      callbackScope: this,
      snap: this.vars.anchorSnap,
      onDrag: this._onDragAnchor,
      onPress: this._onPressAnchor,
      onRelease: this._onRelease,
      onClick: this._onClickAnchor,
      onDragEnd: this._onDragEndAnchor,
      maxX: this.vars.maxX,
      minX: this.vars.minX
    }, l, i2;
    if (createAnchors && this._anchors && this._anchors.length) {
      for (i2 = 0; i2 < this._anchors.length; i2++) {
        this._anchors[i2].element.parentNode.removeChild(this._anchors[i2].element);
        this._anchors[i2]._draggable.enabled(false);
      }
      this._selectedAnchors.length = 0;
    }
    this._rawPath = rawPath;
    if (createAnchors) {
      this._anchors = _createSegmentAnchors(rawPath, 0, this, anchorVars);
      l = rawPath.length;
      if (l > 1) {
        for (i2 = 1; i2 < l; i2++) {
          this._anchors = this._anchors.concat(_createSegmentAnchors(rawPath, i2, this, anchorVars));
        }
      }
    } else {
      i2 = this._anchors.length;
      while (--i2 > -1) {
        this._anchors[i2].update(rawPath);
      }
    }
    this._selection.appendChild(this._handle1);
    this._selection.appendChild(this._handle2);
    this._selectionPath.setAttribute("d", pathData);
    this._selectionHittest.setAttribute("d", pathData);
    this._g.setAttribute("transform", _getConcatenatedTransforms(this.path.parentNode) || "translate(0,0)");
    this._selection.setAttribute("transform", transform);
    this._selectionHittest.setAttribute("transform", transform);
    this._updateAnchors();
    return this;
  };
  _proto3._saveState = function _saveState() {
    _addHistory(this);
  };
  _proto3._onClickSelectionPath = function _onClickSelectionPath(e) {
    if (this._selection.style.visibility === "hidden") {
      this.select();
    } else if (_ALT || e && e.altKey) {
      var anchorVars = {
        callbackScope: this,
        snap: this.vars.anchorSnap,
        onDrag: this._onDragAnchor,
        onPress: this._onPressAnchor,
        onRelease: this._onRelease,
        onClick: this._onClickAnchor,
        onDragEnd: this._onDragEndAnchor,
        maxX: this.vars.maxX,
        minX: this.vars.minX
      }, ctm = this._selection.getScreenCTM().inverse(), newIndex, _i2, anchor, x, y, closestData;
      if (this._draggable) {
        this._draggable._onRelease(e);
      }
      if (ctm) {
        x = e.clientX * ctm.a + e.clientY * ctm.c + ctm.e;
        y = e.clientX * ctm.b + e.clientY * ctm.d + ctm.f;
      }
      closestData = getClosestData(this._rawPath, x, y);
      subdivideSegment(this._rawPath[closestData.j], closestData.i, closestData.t);
      newIndex = closestData.i + 6;
      for (_i2 = 0; _i2 < this._anchors.length; _i2++) {
        if (this._anchors[_i2].i >= newIndex && this._anchors[_i2].j === closestData.j) {
          this._anchors[_i2].i += 6;
        }
      }
      anchor = new Anchor(this, this._rawPath, closestData.j, newIndex, anchorVars);
      this._selection.appendChild(this._handle1);
      this._selection.appendChild(this._handle2);
      anchor._draggable._onPress(e);
      _recentlyAddedAnchor = anchor;
      this._anchors.push(anchor);
      this._selectedAnchors.length = 0;
      this._selectedAnchors.push(anchor);
      this._updateAnchors();
      this.update();
      this._saveState();
    }
    _resetSelection();
    _addListener9(_win9, "touchforcechange", _preventDefault3);
    _callback3("onPress", this);
  };
  _proto3._onClickHandle1 = function _onClickHandle1() {
    var anchor = this._editingAnchor, i2 = anchor.i, s = anchor.segment, pi = anchor.isClosedStart ? s.length - 4 : i2 - 2;
    if (_ALT && Math.abs(s[i2] - s[pi]) < 5 && Math.abs(s[i2 + 1] - s[pi + 1]) < 5) {
      this._onClickAnchor(anchor);
    }
  };
  _proto3._onClickHandle2 = function _onClickHandle2() {
    var anchor = this._editingAnchor, i2 = anchor.i, s = anchor.segment;
    if (_ALT && Math.abs(s[i2] - s[i2 + 2]) < 5 && Math.abs(s[i2 + 1] - s[i2 + 3]) < 5) {
      this._onClickAnchor(anchor);
    }
  };
  _proto3._onDragEndAnchor = function _onDragEndAnchor(e) {
    _recentlyAddedAnchor = null;
    this._saveState();
  };
  _proto3.isSelected = function isSelected() {
    return this._selectedAnchors.length > 0 || this._selection.style.visibility === "visible";
  };
  _proto3.select = function select(allAnchors) {
    this._selection.style.visibility = "visible";
    this._editingAnchor = null;
    this.path._gsSelection = true;
    if (allAnchors === true) {
      var _i2 = this._anchors.length;
      while (--_i2 > -1) {
        this._selectedAnchors[_i2] = this._anchors[_i2];
      }
    }
    if (_selectedPaths.indexOf(this) === -1) {
      _selectedPaths.push(this);
    }
    this._updateAnchors();
    return this;
  };
  _proto3.deselect = function deselect() {
    this._selection.style.visibility = "hidden";
    this._selectedAnchors.length = 0;
    this._editingAnchor = null;
    this.path._gsSelection = false;
    _selectedPaths.splice(_selectedPaths.indexOf(this), 1);
    this._updateAnchors();
    return this;
  };
  _proto3._onDragPath = function _onDragPath(e) {
    var transform = this._selectionHittest.getAttribute("transform") || "translate(0,0)";
    this._selection.setAttribute("transform", transform);
    this.path.setAttribute("transform", transform);
  };
  _proto3._onPressAnchor = function _onPressAnchor(anchor) {
    if (this._selectedAnchors.indexOf(anchor) === -1) {
      if (!_SHIFT) {
        this._selectedAnchors.length = 0;
      }
      this._selectedAnchors.push(anchor);
    } else if (_SHIFT) {
      this._selectedAnchors.splice(this._selectedAnchors.indexOf(anchor), 1);
      anchor._draggable.endDrag();
    }
    _editingAxis.x = anchor.segment[anchor.i];
    _editingAxis.y = anchor.segment[anchor.i + 1];
    this._updateAnchors();
    _callback3("onPress", this);
  };
  _proto3._deleteSelectedAnchors = function _deleteSelectedAnchors() {
    var anchors = this._selectedAnchors, i2 = anchors.length, anchor, index, j, jIndex;
    while (--i2 > -1) {
      anchor = anchors[i2];
      anchor.element.parentNode.removeChild(anchor.element);
      anchor._draggable.enabled(false);
      index = anchor.i;
      jIndex = anchor.j;
      if (!index) {
        anchor.segment.splice(index, 6);
      } else if (index < anchor.segment.length - 2) {
        anchor.segment.splice(index - 2, 6);
      } else {
        anchor.segment.splice(index - 4, 6);
      }
      anchors.splice(i2, 1);
      this._anchors.splice(this._anchors.indexOf(anchor), 1);
      for (j = 0; j < this._anchors.length; j++) {
        if (this._anchors[j].i >= index && this._anchors[j].j === jIndex) {
          this._anchors[j].i -= 6;
        }
      }
    }
    this._updateAnchors();
    this.update();
    this._saveState();
    if (this.vars.onDeleteAnchor) {
      this.vars.onDeleteAnchor.call(this.vars.callbackScope || this);
    }
  };
  _proto3._onClickAnchor = function _onClickAnchor(anchor) {
    var i2 = anchor.i, segment = anchor.segment, pi = anchor.isClosedStart ? segment.length - 4 : i2 - 2, rnd = 1e3, isEnd = !i2 || i2 >= segment.length - 2, angle1, angle2, length1, length2, sin, cos;
    if (_ALT && _recentlyAddedAnchor !== anchor && this._editingAnchor) {
      anchor.smooth = !anchor.smooth;
      if (isEnd && !anchor.isClosedStart) {
        anchor.smooth = false;
      }
      anchor.element.setAttribute("d", anchor.smooth ? this._circleHandle : this._squareHandle);
      if (anchor.smooth && (!isEnd || anchor.isClosedStart)) {
        angle1 = Math.atan2(segment[i2 + 1] - segment[pi + 1], segment[i2] - segment[pi]);
        angle2 = Math.atan2(segment[i2 + 3] - segment[i2 + 1], segment[i2 + 2] - segment[i2]);
        angle1 = (angle1 + angle2) / 2;
        length1 = _getLength3(segment, pi, i2);
        length2 = _getLength3(segment, i2, i2 + 2);
        if (length1 < 0.2) {
          length1 = _getLength3(segment, i2, pi - 4) / 4;
          angle1 = angle2 || Math.atan2(segment[i2 + 7] - segment[pi - 3], segment[i2 + 6] - segment[pi - 4]);
        }
        if (length2 < 0.2) {
          length2 = _getLength3(segment, i2, i2 + 6) / 4;
          angle2 = angle1 || Math.atan2(segment[i2 + 7] - segment[pi - 3], segment[i2 + 6] - segment[pi - 4]);
        }
        sin = Math.sin(angle1);
        cos = Math.cos(angle1);
        if (Math.abs(angle2 - angle1) < Math.PI / 2) {
          sin = -sin;
          cos = -cos;
        }
        segment[pi] = ((segment[i2] + cos * length1) * rnd | 0) / rnd;
        segment[pi + 1] = ((segment[i2 + 1] + sin * length1) * rnd | 0) / rnd;
        segment[i2 + 2] = ((segment[i2] - cos * length2) * rnd | 0) / rnd;
        segment[i2 + 3] = ((segment[i2 + 1] - sin * length2) * rnd | 0) / rnd;
        this._updateAnchors();
        this.update();
        this._saveState();
      } else if (!anchor.smooth && (!isEnd || anchor.isClosedStart)) {
        if (i2 || anchor.isClosedStart) {
          segment[pi] = segment[i2];
          segment[pi + 1] = segment[i2 + 1];
        }
        if (i2 < segment.length - 2) {
          segment[i2 + 2] = segment[i2];
          segment[i2 + 3] = segment[i2 + 1];
        }
        this._updateAnchors();
        this.update();
        this._saveState();
      }
    } else if (!_SHIFT) {
      this._selectedAnchors.length = 0;
      this._selectedAnchors.push(anchor);
    }
    _recentlyAddedAnchor = null;
    this._updateAnchors();
  };
  _proto3._updateAnchors = function _updateAnchors() {
    var anchor = this._selectedAnchors.length === 1 ? this._selectedAnchors[0] : null, segment = anchor ? anchor.segment : null, i2, x, y;
    this._editingAnchor = anchor;
    for (i2 = 0; i2 < this._anchors.length; i2++) {
      this._anchors[i2].element.style.fill = this._selectedAnchors.indexOf(this._anchors[i2]) !== -1 ? _selectionColor : "white";
    }
    if (anchor) {
      this._handle1.setAttribute("d", anchor.smooth ? this._circleHandle : this._squareHandle);
      this._handle2.setAttribute("d", anchor.smooth ? this._circleHandle : this._squareHandle);
    }
    i2 = anchor ? anchor.i : 0;
    if (anchor && (i2 || anchor.isClosedStart)) {
      x = anchor.isClosedStart ? segment[segment.length - 4] : segment[i2 - 2];
      y = anchor.isClosedStart ? segment[segment.length - 3] : segment[i2 - 1];
      this._handle1.style.visibility = this._line1.style.visibility = !_ALT && x === segment[i2] && y === segment[i2 + 1] ? "hidden" : "visible";
      this._handle1.setAttribute("transform", "translate(" + x + _comma + y + ")");
      this._line1.setAttribute("points", x + _comma + y + _comma + segment[i2] + _comma + segment[i2 + 1]);
    } else {
      this._handle1.style.visibility = this._line1.style.visibility = "hidden";
    }
    if (anchor && i2 < segment.length - 2) {
      x = segment[i2 + 2];
      y = segment[i2 + 3];
      this._handle2.style.visibility = this._line2.style.visibility = !_ALT && x === segment[i2] && y === segment[i2 + 1] ? "hidden" : "visible";
      this._handle2.setAttribute("transform", "translate(" + x + _comma + y + ")");
      this._line2.setAttribute("points", segment[i2] + _comma + segment[i2 + 1] + _comma + x + _comma + y);
    } else {
      this._handle2.style.visibility = this._line2.style.visibility = "hidden";
    }
  };
  _proto3._onPressAlt = function _onPressAlt() {
    var anchor = this._editingAnchor;
    if (anchor) {
      if (anchor.i || anchor.isClosedStart) {
        this._handle1.style.visibility = this._line1.style.visibility = "visible";
      }
      if (anchor.i < anchor.segment.length - 2) {
        this._handle2.style.visibility = this._line2.style.visibility = "visible";
      }
    }
  };
  _proto3._onReleaseAlt = function _onReleaseAlt() {
    var anchor = this._editingAnchor, s, i2, pi;
    if (anchor) {
      s = anchor.segment;
      i2 = anchor.i;
      pi = anchor.isClosedStart ? s.length - 4 : i2 - 2;
      if (s[i2] === s[pi] && s[i2 + 1] === s[pi + 1]) {
        this._handle1.style.visibility = this._line1.style.visibility = "hidden";
      }
      if (s[i2] === s[i2 + 2] && s[i2 + 1] === s[i2 + 3]) {
        this._handle2.style.visibility = this._line2.style.visibility = "hidden";
      }
    }
  };
  _proto3._onPressHandle1 = function _onPressHandle1() {
    if (this._editingAnchor.smooth) {
      this._oppositeHandleLength = _getLength3(this._editingAnchor.segment, this._editingAnchor.i, this._editingAnchor.i + 2);
    }
    _callback3("onPress", this);
  };
  _proto3._onPressHandle2 = function _onPressHandle2() {
    if (this._editingAnchor.smooth) {
      this._oppositeHandleLength = _getLength3(this._editingAnchor.segment, this._editingAnchor.isClosedStart ? this._editingAnchor.segment.length - 4 : this._editingAnchor.i - 2, this._editingAnchor.i);
    }
    _callback3("onPress", this);
  };
  _proto3._onReleaseHandle = function _onReleaseHandle(e) {
    this._onRelease(e);
    this._saveState();
  };
  _proto3._onDragHandle1 = function _onDragHandle1() {
    var anchor = this._editingAnchor, s = anchor.segment, i2 = anchor.i, pi = anchor.isClosedStart ? s.length - 4 : i2 - 2, rnd = 1e3, x = this._handle1._draggable.x, y = this._handle1._draggable.y, angle;
    s[pi] = x = (x * rnd | 0) / rnd;
    s[pi + 1] = y = (y * rnd | 0) / rnd;
    if (anchor.smooth) {
      if (_ALT) {
        anchor.smooth = false;
        anchor.element.setAttribute("d", this._squareHandle);
        this._handle1.setAttribute("d", this._squareHandle);
        this._handle2.setAttribute("d", this._squareHandle);
      } else {
        angle = Math.atan2(s[i2 + 1] - y, s[i2] - x);
        x = this._oppositeHandleLength * Math.cos(angle);
        y = this._oppositeHandleLength * Math.sin(angle);
        s[i2 + 2] = ((s[i2] + x) * rnd | 0) / rnd;
        s[i2 + 3] = ((s[i2 + 1] + y) * rnd | 0) / rnd;
      }
    }
    this.update();
  };
  _proto3._onDragHandle2 = function _onDragHandle2() {
    var anchor = this._editingAnchor, s = anchor.segment, i2 = anchor.i, pi = anchor.isClosedStart ? s.length - 4 : i2 - 2, rnd = 1e3, x = this._handle2._draggable.x, y = this._handle2._draggable.y, angle;
    s[i2 + 2] = x = (x * rnd | 0) / rnd;
    s[i2 + 3] = y = (y * rnd | 0) / rnd;
    if (anchor.smooth) {
      if (_ALT) {
        anchor.smooth = false;
        anchor.element.setAttribute("d", this._squareHandle);
        this._handle1.setAttribute("d", this._squareHandle);
        this._handle2.setAttribute("d", this._squareHandle);
      } else {
        angle = Math.atan2(s[i2 + 1] - y, s[i2] - x);
        x = this._oppositeHandleLength * Math.cos(angle);
        y = this._oppositeHandleLength * Math.sin(angle);
        s[pi] = ((s[i2] + x) * rnd | 0) / rnd;
        s[pi + 1] = ((s[i2 + 1] + y) * rnd | 0) / rnd;
      }
    }
    this.update();
  };
  _proto3._onDragAnchor = function _onDragAnchor(anchor, changeX, changeY) {
    var anchors = this._selectedAnchors, l = anchors.length, rnd = 1e3, i2, j, s, a, pi;
    for (j = 0; j < l; j++) {
      a = anchors[j];
      i2 = a.i;
      s = a.segment;
      if (i2) {
        s[i2 - 2] = ((s[i2 - 2] + changeX) * rnd | 0) / rnd;
        s[i2 - 1] = ((s[i2 - 1] + changeY) * rnd | 0) / rnd;
      } else if (a.isClosedStart) {
        pi = s.length - 2;
        s[pi] = _round21(s[pi] + changeX);
        s[pi + 1] = _round21(s[pi + 1] + changeY);
        s[pi - 2] = _round21(s[pi - 2] + changeX);
        s[pi - 1] = _round21(s[pi - 1] + changeY);
      }
      s[i2] = ((s[i2] + changeX) * rnd | 0) / rnd;
      s[i2 + 1] = ((s[i2 + 1] + changeY) * rnd | 0) / rnd;
      if (i2 < s.length - 2) {
        s[i2 + 2] = ((s[i2 + 2] + changeX) * rnd | 0) / rnd;
        s[i2 + 3] = ((s[i2 + 3] + changeY) * rnd | 0) / rnd;
      }
      if (a !== anchor) {
        a.element.setAttribute("transform", "translate(" + s[i2] + _comma + s[i2 + 1] + ")");
      }
    }
    this.update();
  };
  _proto3.enabled = function enabled(_enabled2) {
    if (!arguments.length) {
      return this._enabled;
    }
    var i2 = this._anchors.length;
    while (--i2 > -1) {
      this._anchors[i2]._draggable.enabled(_enabled2);
    }
    this._enabled = _enabled2;
    this._handle1._draggable.enabled(_enabled2);
    this._handle2._draggable.enabled(_enabled2);
    if (this._draggable) {
      this._draggable.enabled(_enabled2);
    }
    if (!_enabled2) {
      this.deselect();
      this._selectionHittest.parentNode && this._selectionHittest.parentNode.removeChild(this._selectionHittest);
      this._selection.parentNode && this._selection.parentNode.removeChild(this._selection);
    } else if (!this._selection.parentNode) {
      this.path.ownerSVGElement.appendChild(this._selectionHittest);
      this.path.ownerSVGElement.appendChild(this._selection);
      this.init();
      this._saveState();
    }
    this._updateAnchors();
    return this.update();
  };
  _proto3.update = function update(readPath) {
    var d = "", anchor = this._editingAnchor, i2, s, x, y, pi;
    if (readPath) {
      this.init();
    }
    if (anchor) {
      i2 = anchor.i;
      s = anchor.segment;
      if (i2 || anchor.isClosedStart) {
        pi = anchor.isClosedStart ? s.length - 4 : i2 - 2;
        x = s[pi];
        y = s[pi + 1];
        this._handle1.setAttribute("transform", "translate(" + x + _comma + y + ")");
        this._line1.setAttribute("points", x + _comma + y + _comma + s[i2] + _comma + s[i2 + 1]);
      }
      if (i2 < s.length - 2) {
        x = s[i2 + 2];
        y = s[i2 + 3];
        this._handle2.setAttribute("transform", "translate(" + x + _comma + y + ")");
        this._line2.setAttribute("points", s[i2] + _comma + s[i2 + 1] + _comma + x + _comma + y);
      }
    }
    if (readPath) {
      d = this.path.getAttribute("d");
    } else {
      for (i2 = 0; i2 < this._rawPath.length; i2++) {
        s = this._rawPath[i2];
        if (s.length > 7) {
          d += "M" + s[0] + _comma + s[1] + "C" + s.slice(2).join(_comma);
        }
      }
      this.path.setAttribute("d", d);
      this._selectionPath.setAttribute("d", d);
      this._selectionHittest.setAttribute("d", d);
    }
    if (this.vars.onUpdate && this._enabled) {
      _callback3("onUpdate", this, d);
    }
    return this;
  };
  _proto3.getRawPath = function getRawPath2(applyTransforms, offsetX, offsetY) {
    if (applyTransforms) {
      var m = _getConsolidatedMatrix(this.path);
      return transformRawPath(copyRawPath(this._rawPath), 1, 0, 0, 1, m.e + (offsetX || 0), m.f + (offsetY || 0));
    }
    return this._rawPath;
  };
  _proto3.getString = function getString(applyTransforms, offsetX, offsetY) {
    if (applyTransforms) {
      var m = _getConsolidatedMatrix(this.path);
      return rawPathToString(transformRawPath(copyRawPath(this._rawPath), 1, 0, 0, 1, m.e + (offsetX || 0), m.f + (offsetY || 0)));
    }
    return this.path.getAttribute("d");
  };
  _proto3.getNormalizedSVG = function getNormalizedSVG(height, originY, shorten, onEaseError) {
    var s = this._rawPath[0], tx = s[0] * -1, ty = originY === 0 ? 0 : -(originY || s[1]), l = s.length, sx = 1 / (s[l - 2] + tx), sy = -height || s[l - 1] + ty, rnd = 1e3, points, i2, x1, y1, x2, y2;
    _temp3.length = 0;
    if (sy) {
      sy = 1 / sy;
    } else {
      sy = -sx;
    }
    sx *= rnd;
    sy *= rnd;
    for (i2 = 0; i2 < l; i2 += 2) {
      _temp3[i2] = ((s[i2] + tx) * sx | 0) / rnd;
      _temp3[i2 + 1] = ((s[i2 + 1] + ty) * sy | 0) / rnd;
    }
    if (onEaseError) {
      points = [];
      l = _temp3.length;
      for (i2 = 2; i2 < l; i2 += 6) {
        x1 = _temp3[i2 - 2];
        y1 = _temp3[i2 - 1];
        x2 = _temp3[i2 + 4];
        y2 = _temp3[i2 + 5];
        points.push(x1, y1, x2, y2);
        bezierToPoints(x1, y1, _temp3[i2], _temp3[i2 + 1], _temp3[i2 + 2], _temp3[i2 + 3], x2, y2, 1e-3, points, points.length - 2);
      }
      x1 = points[0];
      l = points.length;
      for (i2 = 2; i2 < l; i2 += 2) {
        x2 = points[i2];
        if (x2 < x1 || x2 > 1 || x2 < 0) {
          onEaseError();
          break;
        }
        x1 = x2;
      }
    }
    if (shorten && l === 8 && _temp3[0] === 0 && _temp3[1] === 0 && _temp3[l - 2] === 1 && _temp3[l - 1] === 1) {
      return _temp3.slice(2, 6).join(",");
    }
    _temp3[2] = "C" + _temp3[2];
    return "M" + _temp3.join(",");
  };
  _proto3.kill = function kill5() {
    this.enabled(false);
    this._g.parentNode && this._g.parentNode.removeChild(this._g);
  };
  _proto3.revert = function revert() {
    this.kill();
  };
  return PathEditor2;
}();
PathEditor.simplifyPoints = simplifyPoints;
PathEditor.pointsToSegment = pointsToSegment;
PathEditor.simplifySVG = function(data, vars) {
  var element, points, i2, x1, x2, y1, y2, bezier, precision, tolerance, l, cornerThreshold;
  vars = vars || {};
  tolerance = vars.tolerance || 1;
  precision = vars.precision || 1 / tolerance;
  cornerThreshold = (vars.cornerThreshold === void 0 ? 18 : +vars.cornerThreshold) * _DEG2RAD6;
  if (typeof data !== "string") {
    element = data;
    data = element.getAttribute("d");
  }
  if (data.charAt(0) === "#" || data.charAt(0) === ".") {
    element = _doc9.querySelector(data);
    if (element) {
      data = element.getAttribute("d");
    }
  }
  points = vars.curved === false && !/[achqstvz]/ig.test(data) ? data.match(_numbersExp2) : stringToRawPath(data)[0];
  if (vars.curved !== false) {
    bezier = points;
    points = [];
    l = bezier.length;
    for (i2 = 2; i2 < l; i2 += 6) {
      x1 = +bezier[i2 - 2];
      y1 = +bezier[i2 - 1];
      x2 = +bezier[i2 + 4];
      y2 = +bezier[i2 + 5];
      points.push(_round21(x1), _round21(y1), _round21(x2), _round21(y2));
      bezierToPoints(x1, y1, +bezier[i2], +bezier[i2 + 1], +bezier[i2 + 2], +bezier[i2 + 3], x2, y2, 1 / (precision * 2e5), points, points.length - 2);
    }
    points = pointsToSegment(simplifyPoints(points, tolerance), vars.curviness, cornerThreshold);
    points[2] = "C" + points[2];
  } else {
    points = simplifyPoints(points, tolerance);
  }
  data = "M" + points.join(",");
  if (element) {
    element.setAttribute("d", data);
  }
  return data;
};
PathEditor.create = function(target, vars) {
  return new PathEditor(target, vars);
};
PathEditor.editingAxis = _editingAxis;
PathEditor.getSnapFunction = function(vars) {
  var r = vars.radius || 2, big = 1e20, minX = vars.x || vars.x === 0 ? vars.x : vars.width ? 0 : -big, minY = vars.y || vars.y === 0 ? vars.y : vars.height ? 0 : -big, maxX = minX + (vars.width || big * big), maxY = minY + (vars.height || big * big), containX = vars.containX !== false, containY = vars.containY !== false, axis = vars.axis, grid = vars.gridSize;
  r *= r;
  return function(p2) {
    var x = p2.x, y = p2.y, gridX, gridY, dx, dy;
    if (containX && x < minX || (dx = x - minX) * dx < r) {
      x = minX;
    } else if (containX && x > maxX || (dx = maxX - x) * dx < r) {
      x = maxX;
    }
    if (containY && y < minY || (dy = y - minY) * dy < r) {
      y = minY;
    } else if (containY && y > maxY || (dy = maxY - y) * dy < r) {
      y = maxY;
    }
    if (axis) {
      dx = x - axis.x;
      dy = y - axis.y;
      if (dx * dx < r) {
        x = axis.x;
      }
      if (dy * dy < r) {
        y = axis.y;
      }
    }
    if (grid) {
      gridX = minX + Math.round((x - minX) / grid) * grid;
      dx = gridX - x;
      gridY = minY + Math.round((y - minY) / grid) * grid;
      dy = gridY - y;
      if (dx * dx + dy * dy < r) {
        x = gridX;
        y = gridY;
      }
    }
    p2.x = x;
    p2.y = y;
  };
};
PathEditor.version = "3.13.0";
PathEditor.register = _initCore37;

// node_modules/gsap/MotionPathHelper.js
var gsap25;
var _win10;
var _doc10;
var _docEl5;
var _body8;
var MotionPathPlugin2;
var _arrayToRawPath;
var _rawPathToString;
var _context6;
var _selectorExp3 = /(^[#\.][a-z]|[a-y][a-z])/i;
var _isString13 = function _isString14(value) {
  return typeof value === "string";
};
var _createElement7 = function _createElement8(type, ns) {
  var e = _doc10.createElementNS ? _doc10.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc10.createElement(type);
  return e.style ? e : _doc10.createElement(type);
};
var _getPositionOnPage = function _getPositionOnPage2(target) {
  var bounds = target.getBoundingClientRect(), windowOffsetY = _docEl5.clientTop - (_win10.pageYOffset || _docEl5.scrollTop || _body8.scrollTop || 0), windowOffsetX = _docEl5.clientLeft - (_win10.pageXOffset || _docEl5.scrollLeft || _body8.scrollLeft || 0);
  return {
    left: bounds.left + windowOffsetX,
    top: bounds.top + windowOffsetY,
    right: bounds.right + windowOffsetX,
    bottom: bounds.bottom + windowOffsetY
  };
};
var _getInitialPath = function _getInitialPath2(x, y) {
  var coordinates = [0, 31, 8, 58, 24, 75, 40, 90, 69, 100, 100, 100], i2;
  for (i2 = 0; i2 < coordinates.length; i2 += 2) {
    coordinates[i2] += x;
    coordinates[i2 + 1] += y;
  }
  return "M" + x + "," + y + "C" + coordinates.join(",");
};
var _getGlobalTime = function _getGlobalTime2(animation) {
  var time = animation.totalTime();
  while (animation) {
    time = animation.startTime() + time / (animation.timeScale() || 1);
    animation = animation.parent;
  }
  return time;
};
var _copyElement2;
var _initCopyToClipboard = function _initCopyToClipboard2() {
  _copyElement2 = _createElement7("textarea");
  _copyElement2.style.display = "none";
  _body8.appendChild(_copyElement2);
};
var _parsePath = function _parsePath2(path, target, vars) {
  return _isString13(path) && _selectorExp3.test(path) ? _doc10.querySelector(path) : Array.isArray(path) ? _rawPathToString(_arrayToRawPath([{
    x: gsap25.getProperty(target, "x"),
    y: gsap25.getProperty(target, "y")
  }].concat(path), vars)) : _isString13(path) || path && (path.tagName + "").toLowerCase() === "path" ? path : 0;
};
var _addCopyToClipboard = function _addCopyToClipboard2(target, getter, onComplete) {
  target.addEventListener("click", function(e) {
    if (e.target._gsHelper) {
      var c = getter(e.target);
      _copyElement2.value = c;
      if (c && _copyElement2.select) {
        console.log(c);
        _copyElement2.style.display = "block";
        _copyElement2.select();
        try {
          _doc10.execCommand("copy");
          _copyElement2.blur();
          onComplete && onComplete(target);
        } catch (err) {
          console.warn("Copy didn't work; this browser doesn't permit that.");
        }
        _copyElement2.style.display = "none";
      }
    }
  });
};
var _identityMatrixObject2 = {
  matrix: {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  }
};
var _getConsolidatedMatrix3 = function _getConsolidatedMatrix4(target) {
  return (target.transform.baseVal.consolidate() || _identityMatrixObject2).matrix;
};
var _findMotionPathTween = function _findMotionPathTween2(target) {
  var tweens = gsap25.getTweensOf(target), i2 = 0;
  for (; i2 < tweens.length; i2++) {
    if (tweens[i2].vars.motionPath) {
      return tweens[i2];
    } else if (tweens[i2].timeline) {
      tweens.push.apply(tweens, tweens[i2].timeline.getChildren());
    }
  }
};
var _initCore39 = function _initCore40(core, required) {
  var message = "Please gsap.registerPlugin(MotionPathPlugin)";
  _win10 = window;
  gsap25 = gsap25 || core || _win10.gsap || console.warn(message);
  gsap25 && PathEditor.register(gsap25);
  _doc10 = document;
  _body8 = _doc10.body;
  _docEl5 = _doc10.documentElement;
  if (gsap25) {
    MotionPathPlugin2 = gsap25.plugins.motionPath;
    MotionPathHelper.PathEditor = PathEditor;
    _context6 = gsap25.core.context || function() {
    };
  }
  if (!MotionPathPlugin2) {
    required === true && console.warn(message);
  } else {
    _initCopyToClipboard();
    _arrayToRawPath = MotionPathPlugin2.arrayToRawPath;
    _rawPathToString = MotionPathPlugin2.rawPathToString;
  }
};
var MotionPathHelper = function() {
  function MotionPathHelper2(targetOrTween, vars) {
    var _this = this;
    if (vars === void 0) {
      vars = {};
    }
    if (!MotionPathPlugin2) {
      _initCore39(vars.gsap, 1);
    }
    var copyButton = _createElement7("div"), self = this, offset = {
      x: 0,
      y: 0
    }, target, path, isSVG, startX, startY, position, svg, animation, svgNamespace, temp, matrix, refreshPath, animationToScrub, createdSVG;
    if (targetOrTween instanceof gsap25.core.Tween) {
      animation = targetOrTween;
      target = animation.targets()[0];
    } else {
      target = gsap25.utils.toArray(targetOrTween)[0];
      animation = _findMotionPathTween(target);
    }
    path = _parsePath(vars.path, target, vars);
    this.offset = offset;
    position = _getPositionOnPage(target);
    startX = parseFloat(gsap25.getProperty(target, "x", "px"));
    startY = parseFloat(gsap25.getProperty(target, "y", "px"));
    isSVG = target.getCTM && target.tagName.toLowerCase() !== "svg";
    if (animation && !path) {
      path = _parsePath(animation.vars.motionPath.path || animation.vars.motionPath, target, animation.vars.motionPath);
    }
    copyButton.setAttribute("class", "copy-motion-path");
    copyButton.style.cssText = "border-radius:8px; background-color:rgba(85, 85, 85, 0.7); color:#fff; cursor:pointer; padding:6px 12px; font-family:Signika Negative, Arial, sans-serif; position:fixed; left:50%; transform:translate(-50%, 0); font-size:19px; bottom:10px";
    copyButton.innerText = "COPY MOTION PATH";
    copyButton._gsHelper = self;
    (gsap25.utils.toArray(vars.container)[0] || _body8).appendChild(copyButton);
    _addCopyToClipboard(copyButton, function() {
      return self.getString();
    }, function() {
      return gsap25.fromTo(copyButton, {
        backgroundColor: "white"
      }, {
        duration: 0.5,
        backgroundColor: "rgba(85, 85, 85, 0.6)"
      });
    });
    svg = path && path.ownerSVGElement;
    if (!svg) {
      svgNamespace = isSVG && target.ownerSVGElement && target.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg";
      if (isSVG) {
        svg = target.ownerSVGElement;
        temp = target.getBBox();
        matrix = _getConsolidatedMatrix3(target);
        startX = matrix.e;
        startY = matrix.f;
        offset.x = temp.x;
        offset.y = temp.y;
      } else {
        svg = _createElement7("svg", svgNamespace);
        createdSVG = true;
        _body8.appendChild(svg);
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("class", "motion-path-helper");
        svg.style.cssText = "overflow:visible; background-color: transparent; position:absolute; z-index:5000; width:100px; height:100px; top:" + (position.top - startY) + "px; left:" + (position.left - startX) + "px;";
      }
      temp = _isString13(path) && !_selectorExp3.test(path) ? path : _getInitialPath(startX, startY);
      path = _createElement7("path", svgNamespace);
      path.setAttribute("d", temp);
      path.setAttribute("vector-effect", "non-scaling-stroke");
      path.style.cssText = "fill:transparent; stroke-width:" + (vars.pathWidth || 3) + "; stroke:" + (vars.pathColor || "#555") + "; opacity:" + (vars.pathOpacity || 0.6);
      svg.appendChild(path);
    } else {
      vars.pathColor && gsap25.set(path, {
        stroke: vars.pathColor
      });
      vars.pathWidth && gsap25.set(path, {
        strokeWidth: vars.pathWidth
      });
      vars.pathOpacity && gsap25.set(path, {
        opacity: vars.pathOpacity
      });
    }
    if (offset.x || offset.y) {
      gsap25.set(path, {
        x: offset.x,
        y: offset.y
      });
    }
    if (!("selected" in vars)) {
      vars.selected = true;
    }
    if (!("anchorSnap" in vars)) {
      vars.anchorSnap = function(p2) {
        if (p2.x * p2.x + p2.y * p2.y < 16) {
          p2.x = p2.y = 0;
        }
      };
    }
    animationToScrub = animation && animation.parent && animation.parent.data === "nested" ? animation.parent.parent : animation;
    vars.onPress = function() {
      animationToScrub.pause(0);
    };
    refreshPath = function refreshPath2() {
      animation.invalidate();
      animationToScrub.restart();
    };
    vars.onRelease = vars.onDeleteAnchor = refreshPath;
    this.editor = PathEditor.create(path, vars);
    if (vars.center) {
      gsap25.set(target, {
        transformOrigin: "50% 50%",
        xPercent: -50,
        yPercent: -50
      });
    }
    if (animation) {
      if (animation.vars.motionPath.path) {
        animation.vars.motionPath.path = path;
      } else {
        animation.vars.motionPath = {
          path
        };
      }
      if (animationToScrub.parent !== gsap25.globalTimeline) {
        gsap25.globalTimeline.add(animationToScrub, _getGlobalTime(animationToScrub) - animationToScrub.delay());
      }
      animationToScrub.repeat(-1).repeatDelay(1);
    } else {
      animation = animationToScrub = gsap25.to(target, {
        motionPath: {
          path,
          start: vars.start || 0,
          end: "end" in vars ? vars.end : 1,
          autoRotate: "autoRotate" in vars ? vars.autoRotate : false,
          align: path,
          alignOrigin: vars.alignOrigin
        },
        duration: vars.duration || 5,
        ease: vars.ease || "power1.inOut",
        repeat: -1,
        repeatDelay: 1,
        paused: !vars.path
      });
    }
    this.animation = animation;
    _context6(this);
    this.kill = this.revert = function() {
      _this.editor.kill();
      copyButton.parentNode && copyButton.parentNode.removeChild(copyButton);
      createdSVG && svg.parentNode && svg.parentNode.removeChild(svg);
      animationToScrub && animationToScrub.revert();
    };
  }
  var _proto = MotionPathHelper2.prototype;
  _proto.getString = function getString() {
    return this.editor.getString(true, -this.offset.x, -this.offset.y);
  };
  return MotionPathHelper2;
}();
MotionPathHelper.register = _initCore39;
MotionPathHelper.create = function(target, vars) {
  return new MotionPathHelper(target, vars);
};
MotionPathHelper.editPath = function(path, vars) {
  return PathEditor.create(path, vars);
};
MotionPathHelper.version = "3.13.0";

// node_modules/gsap/ScrollSmoother.js
function _defineProperties2(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties2(Constructor, staticProps);
  return Constructor;
}
var gsap26;
var _coreInitted21;
var _win11;
var _doc11;
var _docEl6;
var _body9;
var _root3;
var _toArray10;
var _clamp4;
var ScrollTrigger4;
var _mainInstance;
var _expo;
var _getVelocityProp3;
var _inputObserver3;
var _context7;
var _onResizeDelayedCall;
var _windowExists17 = function _windowExists18() {
  return typeof window !== "undefined";
};
var _getGSAP43 = function _getGSAP44() {
  return gsap26 || _windowExists17() && (gsap26 = window.gsap) && gsap26.registerPlugin && gsap26;
};
var _round23 = function _round24(value) {
  return Math.round(value * 1e5) / 1e5 || 0;
};
var _maxScroll3 = function _maxScroll4(scroller) {
  return ScrollTrigger4.maxScroll(scroller || _win11);
};
var _autoDistance = function _autoDistance2(el, progress) {
  var parent = el.parentNode || _docEl6, b1 = el.getBoundingClientRect(), b2 = parent.getBoundingClientRect(), gapTop = b2.top - b1.top, gapBottom = b2.bottom - b1.bottom, change = (Math.abs(gapTop) > Math.abs(gapBottom) ? gapTop : gapBottom) / (1 - progress), offset = -change * progress, ratio, extraChange;
  if (change > 0) {
    ratio = b2.height / (_win11.innerHeight + b2.height);
    extraChange = ratio === 0.5 ? b2.height * 2 : Math.min(b2.height, Math.abs(-change * ratio / (2 * ratio - 1))) * 2 * (progress || 1);
    offset += progress ? -extraChange * progress : -extraChange / 2;
    change += extraChange;
  }
  return {
    change,
    offset
  };
};
var _wrap = function _wrap2(el) {
  var wrapper = _doc11.querySelector(".ScrollSmoother-wrapper");
  if (!wrapper) {
    wrapper = _doc11.createElement("div");
    wrapper.classList.add("ScrollSmoother-wrapper");
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
  return wrapper;
};
var ScrollSmoother = function() {
  function ScrollSmoother2(vars) {
    var _this = this;
    _coreInitted21 || ScrollSmoother2.register(gsap26) || console.warn("Please gsap.registerPlugin(ScrollSmoother)");
    vars = this.vars = vars || {};
    _mainInstance && _mainInstance.kill();
    _mainInstance = this;
    _context7(this);
    var _vars = vars, smoothTouch = _vars.smoothTouch, _onUpdate = _vars.onUpdate, onStop = _vars.onStop, smooth = _vars.smooth, onFocusIn = _vars.onFocusIn, normalizeScroll = _vars.normalizeScroll, wholePixels = _vars.wholePixels, content, wrapper, height, mainST, effects, sections, intervalID, wrapperCSS, contentCSS, paused, pausedNormalizer, recordedRefreshScroll, recordedRefreshScrub, allowUpdates, self = this, effectsPrefix = vars.effectsPrefix || "", scrollFunc = ScrollTrigger4.getScrollFunc(_win11), smoothDuration = ScrollTrigger4.isTouch === 1 ? smoothTouch === true ? 0.8 : parseFloat(smoothTouch) || 0 : smooth === 0 || smooth === false ? 0 : parseFloat(smooth) || 0.8, speed = smoothDuration && +vars.speed || 1, currentY = 0, delta = 0, startupPhase = 1, tracker = _getVelocityProp3(0), updateVelocity = function updateVelocity2() {
      return tracker.update(-currentY);
    }, scroll = {
      y: 0
    }, removeScroll = function removeScroll2() {
      return content.style.overflow = "visible";
    }, isProxyScrolling, killScrub = function killScrub2(trigger) {
      trigger.update();
      var scrub = trigger.getTween();
      if (scrub) {
        scrub.pause();
        scrub._time = scrub._dur;
        scrub._tTime = scrub._tDur;
      }
      isProxyScrolling = false;
      trigger.animation.progress(trigger.progress, true);
    }, render12 = function render13(y, force) {
      if (y !== currentY && !paused || force) {
        wholePixels && (y = Math.round(y));
        if (smoothDuration) {
          content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
          content._gsap.y = y + "px";
        }
        delta = y - currentY;
        currentY = y;
        ScrollTrigger4.isUpdating || ScrollSmoother2.isRefreshing || ScrollTrigger4.update();
      }
    }, scrollTop = function scrollTop2(value) {
      if (arguments.length) {
        value < 0 && (value = 0);
        scroll.y = -value;
        isProxyScrolling = true;
        paused ? currentY = -value : render12(-value);
        ScrollTrigger4.isRefreshing ? mainST.update() : scrollFunc(value / speed);
        return this;
      }
      return -currentY;
    }, resizeObserver = typeof ResizeObserver !== "undefined" && vars.autoResize !== false && new ResizeObserver(function() {
      if (!ScrollTrigger4.isRefreshing) {
        var max = _maxScroll3(wrapper) * speed;
        max < -currentY && scrollTop(max);
        _onResizeDelayedCall.restart(true);
      }
    }), lastFocusElement, _onFocusIn = function _onFocusIn2(e) {
      wrapper.scrollTop = 0;
      if (e.target.contains && e.target.contains(wrapper) || onFocusIn && onFocusIn(_this, e) === false) {
        return;
      }
      ScrollTrigger4.isInViewport(e.target) || e.target === lastFocusElement || _this.scrollTo(e.target, false, "center center");
      lastFocusElement = e.target;
    }, _transformPosition = function _transformPosition2(position, st) {
      if (position < st.start) {
        return position;
      }
      var ratio = isNaN(st.ratio) ? 1 : st.ratio, change = st.end - st.start, distance = position - st.start, offset = st.offset || 0, pins = st.pins || [], pinOffset = pins.offset || 0, progressOffset = st._startClamp && st.start <= 0 || st.pins && st.pins.offset ? 0 : st._endClamp && st.end === _maxScroll3() ? 1 : 0.5;
      pins.forEach(function(p2) {
        change -= p2.distance;
        if (p2.nativeStart <= position) {
          distance -= p2.distance;
        }
      });
      if (pinOffset) {
        distance *= (change - pinOffset / ratio) / change;
      }
      return position + (distance - offset * progressOffset) / ratio - distance;
    }, adjustEffectRelatedTriggers = function adjustEffectRelatedTriggers2(st, triggers, partial) {
      partial || (st.pins.length = st.pins.offset = 0);
      var pins = st.pins, markers = st.markers, dif, isClamped, start, end, nativeStart, nativeEnd, i2, trig;
      for (i2 = 0; i2 < triggers.length; i2++) {
        trig = triggers[i2];
        if (st.trigger && trig.trigger && st !== trig && (trig.trigger === st.trigger || trig.pinnedContainer === st.trigger || st.trigger.contains(trig.trigger))) {
          nativeStart = trig._startNative || trig._startClamp || trig.start;
          nativeEnd = trig._endNative || trig._endClamp || trig.end;
          start = _transformPosition(nativeStart, st);
          end = trig.pin && nativeEnd > 0 ? start + (nativeEnd - nativeStart) : _transformPosition(nativeEnd, st);
          trig.setPositions(start, end, true, (trig._startClamp ? Math.max(0, start) : start) - nativeStart);
          trig.markerStart && markers.push(gsap26.quickSetter([trig.markerStart, trig.markerEnd], "y", "px"));
          if (trig.pin && trig.end > 0 && !partial) {
            dif = trig.end - trig.start;
            isClamped = st._startClamp && trig.start < 0;
            if (isClamped) {
              if (st.start > 0) {
                st.setPositions(0, st.end + (st._startNative - st.start), true);
                adjustEffectRelatedTriggers2(st, triggers);
                return;
              }
              dif += trig.start;
              pins.offset = -trig.start;
            }
            pins.push({
              start: trig.start,
              nativeStart,
              end: trig.end,
              distance: dif,
              trig
            });
            st.setPositions(st.start, st.end + (isClamped ? -trig.start : dif), true);
          }
        }
      }
    }, adjustParallaxPosition = function adjustParallaxPosition2(triggers, createdAfterEffectWasApplied) {
      effects.forEach(function(st) {
        return adjustEffectRelatedTriggers(st, triggers, createdAfterEffectWasApplied);
      });
    }, onRefresh = function onRefresh2() {
      _docEl6 = _doc11.documentElement;
      _body9 = _doc11.body;
      removeScroll();
      requestAnimationFrame(removeScroll);
      if (effects) {
        ScrollTrigger4.getAll().forEach(function(st) {
          st._startNative = st.start;
          st._endNative = st.end;
        });
        effects.forEach(function(st) {
          var start = st._startClamp || st.start, end = st.autoSpeed ? Math.min(_maxScroll3(), st.end) : start + Math.abs((st.end - start) / st.ratio), offset = end - st.end;
          start -= offset / 2;
          end -= offset / 2;
          if (start > end) {
            var s = start;
            start = end;
            end = s;
          }
          if (st._startClamp && start < 0) {
            end = st.ratio < 0 ? _maxScroll3() : st.end / st.ratio;
            offset = end - st.end;
            start = 0;
          } else if (st.ratio < 0 || st._endClamp && end >= _maxScroll3()) {
            end = _maxScroll3();
            start = st.ratio < 0 ? 0 : st.ratio > 1 ? 0 : end - (end - st.start) / st.ratio;
            offset = (end - start) * st.ratio - (st.end - st.start);
          }
          st.offset = offset || 1e-4;
          st.pins.length = st.pins.offset = 0;
          st.setPositions(start, end, true);
        });
        adjustParallaxPosition(ScrollTrigger4.sort());
      }
      tracker.reset();
    }, addOnRefresh = function addOnRefresh2() {
      return ScrollTrigger4.addEventListener("refresh", onRefresh);
    }, restoreEffects = function restoreEffects2() {
      return effects && effects.forEach(function(st) {
        return st.vars.onRefresh(st);
      });
    }, revertEffects = function revertEffects2() {
      effects && effects.forEach(function(st) {
        return st.vars.onRefreshInit(st);
      });
      return restoreEffects;
    }, effectValueGetter = function effectValueGetter2(name, value, index, el) {
      return function() {
        var v = typeof value === "function" ? value(index, el) : value;
        v || v === 0 || (v = el.getAttribute("data-" + effectsPrefix + name) || (name === "speed" ? 1 : 0));
        el.setAttribute("data-" + effectsPrefix + name, v);
        var clamp2 = (v + "").substr(0, 6) === "clamp(";
        return {
          clamp: clamp2,
          value: clamp2 ? v.substr(6, v.length - 7) : v
        };
      };
    }, createEffect = function createEffect2(el, speed2, lag, index, effectsPadding) {
      effectsPadding = (typeof effectsPadding === "function" ? effectsPadding(index, el) : effectsPadding) || 0;
      var getSpeed = effectValueGetter("speed", speed2, index, el), getLag = effectValueGetter("lag", lag, index, el), startY = gsap26.getProperty(el, "y"), cache = el._gsap, ratio, st, autoSpeed, scrub, progressOffset, yOffset, pins = [], initDynamicValues = function initDynamicValues2() {
        speed2 = getSpeed();
        lag = parseFloat(getLag().value);
        ratio = parseFloat(speed2.value) || 1;
        autoSpeed = speed2.value === "auto";
        progressOffset = autoSpeed || st && st._startClamp && st.start <= 0 || pins.offset ? 0 : st && st._endClamp && st.end === _maxScroll3() ? 1 : 0.5;
        scrub && scrub.kill();
        scrub = lag && gsap26.to(el, {
          ease: _expo,
          overwrite: false,
          y: "+=0",
          duration: lag
        });
        if (st) {
          st.ratio = ratio;
          st.autoSpeed = autoSpeed;
        }
      }, revert = function revert2() {
        cache.y = startY + "px";
        cache.renderTransform(1);
        initDynamicValues();
      }, markers = [], change = 0, updateChange = function updateChange2(self2) {
        if (autoSpeed) {
          revert();
          var auto = _autoDistance(el, _clamp4(0, 1, -self2.start / (self2.end - self2.start)));
          change = auto.change;
          yOffset = auto.offset;
        } else {
          yOffset = pins.offset || 0;
          change = (self2.end - self2.start - yOffset) * (1 - ratio);
        }
        pins.forEach(function(p2) {
          return change -= p2.distance * (1 - ratio);
        });
        self2.offset = change || 1e-3;
        self2.vars.onUpdate(self2);
        scrub && scrub.progress(1);
      };
      initDynamicValues();
      if (ratio !== 1 || autoSpeed || scrub) {
        st = ScrollTrigger4.create({
          trigger: autoSpeed ? el.parentNode : el,
          start: function start() {
            return speed2.clamp ? "clamp(top bottom+=" + effectsPadding + ")" : "top bottom+=" + effectsPadding;
          },
          end: function end() {
            return speed2.value < 0 ? "max" : speed2.clamp ? "clamp(bottom top-=" + effectsPadding + ")" : "bottom top-=" + effectsPadding;
          },
          scroller: wrapper,
          scrub: true,
          refreshPriority: -999,
          // must update AFTER any other ScrollTrigger pins
          onRefreshInit: revert,
          onRefresh: updateChange,
          onKill: function onKill(self2) {
            var i2 = effects.indexOf(self2);
            i2 >= 0 && effects.splice(i2, 1);
            revert();
          },
          onUpdate: function onUpdate(self2) {
            var y = startY + change * (self2.progress - progressOffset), i2 = pins.length, extraY = 0, pin, scrollY, end;
            if (self2.offset) {
              if (i2) {
                scrollY = -currentY;
                end = self2.end;
                while (i2--) {
                  pin = pins[i2];
                  if (pin.trig.isActive || scrollY >= pin.start && scrollY <= pin.end) {
                    if (scrub) {
                      pin.trig.progress += pin.trig.direction < 0 ? 1e-3 : -1e-3;
                      pin.trig.update(0, 0, 1);
                      scrub.resetTo("y", parseFloat(cache.y), -delta, true);
                      startupPhase && scrub.progress(1);
                    }
                    return;
                  }
                  scrollY > pin.end && (extraY += pin.distance);
                  end -= pin.distance;
                }
                y = startY + extraY + change * ((gsap26.utils.clamp(self2.start, self2.end, scrollY) - self2.start - extraY) / (end - self2.start) - progressOffset);
              }
              markers.length && !autoSpeed && markers.forEach(function(setter) {
                return setter(y - extraY);
              });
              y = _round23(y + yOffset);
              if (scrub) {
                scrub.resetTo("y", y, -delta, true);
                startupPhase && scrub.progress(1);
              } else {
                cache.y = y + "px";
                cache.renderTransform(1);
              }
            }
          }
        });
        updateChange(st);
        gsap26.core.getCache(st.trigger).stRevert = revertEffects;
        st.startY = startY;
        st.pins = pins;
        st.markers = markers;
        st.ratio = ratio;
        st.autoSpeed = autoSpeed;
        el.style.willChange = "transform";
      }
      return st;
    };
    addOnRefresh();
    ScrollTrigger4.addEventListener("killAll", addOnRefresh);
    gsap26.delayedCall(0.5, function() {
      return startupPhase = 0;
    });
    this.scrollTop = scrollTop;
    this.scrollTo = function(target, smooth2, position) {
      var p2 = gsap26.utils.clamp(0, _maxScroll3(), isNaN(target) ? _this.offset(target, position, !!smooth2 && !paused) : +target);
      !smooth2 ? scrollTop(p2) : paused ? gsap26.to(_this, {
        duration: smoothDuration,
        scrollTop: p2,
        overwrite: "auto",
        ease: _expo
      }) : scrollFunc(p2);
    };
    this.offset = function(target, position, ignoreSpeed) {
      target = _toArray10(target)[0];
      var cssText = target.style.cssText, st = ScrollTrigger4.create({
        trigger: target,
        start: position || "top top"
      }), y;
      if (effects) {
        startupPhase ? ScrollTrigger4.refresh() : adjustParallaxPosition([st], true);
      }
      y = st.start / (ignoreSpeed ? speed : 1);
      st.kill(false);
      target.style.cssText = cssText;
      gsap26.core.getCache(target).uncache = 1;
      return y;
    };
    function refreshHeight() {
      height = content.clientHeight;
      content.style.overflow = "visible";
      _body9.style.height = _win11.innerHeight + (height - _win11.innerHeight) / speed + "px";
      return height - _win11.innerHeight;
    }
    this.content = function(element) {
      if (arguments.length) {
        var newContent = _toArray10(element || "#smooth-content")[0] || console.warn("ScrollSmoother needs a valid content element.") || _body9.children[0];
        if (newContent !== content) {
          content = newContent;
          contentCSS = content.getAttribute("style") || "";
          resizeObserver && resizeObserver.observe(content);
          gsap26.set(content, {
            overflow: "visible",
            width: "100%",
            boxSizing: "border-box",
            y: "+=0"
          });
          smoothDuration || gsap26.set(content, {
            clearProps: "transform"
          });
        }
        return this;
      }
      return content;
    };
    this.wrapper = function(element) {
      if (arguments.length) {
        wrapper = _toArray10(element || "#smooth-wrapper")[0] || _wrap(content);
        wrapperCSS = wrapper.getAttribute("style") || "";
        refreshHeight();
        gsap26.set(wrapper, smoothDuration ? {
          overflow: "hidden",
          position: "fixed",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        } : {
          overflow: "visible",
          position: "relative",
          width: "100%",
          height: "auto",
          top: "auto",
          bottom: "auto",
          left: "auto",
          right: "auto"
        });
        return this;
      }
      return wrapper;
    };
    this.effects = function(targets, config) {
      var _effects;
      effects || (effects = []);
      if (!targets) {
        return effects.slice(0);
      }
      targets = _toArray10(targets);
      targets.forEach(function(target) {
        var i3 = effects.length;
        while (i3--) {
          effects[i3].trigger === target && effects[i3].kill();
        }
      });
      config = config || {};
      var _config3 = config, speed2 = _config3.speed, lag = _config3.lag, effectsPadding = _config3.effectsPadding, effectsToAdd = [], i2, st;
      for (i2 = 0; i2 < targets.length; i2++) {
        st = createEffect(targets[i2], speed2, lag, i2, effectsPadding);
        st && effectsToAdd.push(st);
      }
      (_effects = effects).push.apply(_effects, effectsToAdd);
      config.refresh !== false && ScrollTrigger4.refresh();
      return effectsToAdd;
    };
    this.sections = function(targets, config) {
      var _sections;
      sections || (sections = []);
      if (!targets) {
        return sections.slice(0);
      }
      var newSections = _toArray10(targets).map(function(el) {
        return ScrollTrigger4.create({
          trigger: el,
          start: "top 120%",
          end: "bottom -20%",
          onToggle: function onToggle(self2) {
            el.style.opacity = self2.isActive ? "1" : "0";
            el.style.pointerEvents = self2.isActive ? "all" : "none";
          }
        });
      });
      config && config.add ? (_sections = sections).push.apply(_sections, newSections) : sections = newSections.slice(0);
      return newSections;
    };
    this.content(vars.content);
    this.wrapper(vars.wrapper);
    this.render = function(y) {
      return render12(y || y === 0 ? y : currentY);
    };
    this.getVelocity = function() {
      return tracker.getVelocity(-currentY);
    };
    ScrollTrigger4.scrollerProxy(wrapper, {
      scrollTop,
      scrollHeight: function scrollHeight() {
        return refreshHeight() && _body9.scrollHeight;
      },
      fixedMarkers: vars.fixedMarkers !== false && !!smoothDuration,
      content,
      getBoundingClientRect: function getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: _win11.innerWidth,
          height: _win11.innerHeight
        };
      }
    });
    ScrollTrigger4.defaults({
      scroller: wrapper
    });
    var existingScrollTriggers = ScrollTrigger4.getAll().filter(function(st) {
      return st.scroller === _win11 || st.scroller === wrapper;
    });
    existingScrollTriggers.forEach(function(st) {
      return st.revert(true, true);
    });
    mainST = ScrollTrigger4.create({
      animation: gsap26.fromTo(scroll, {
        y: function y() {
          allowUpdates = 0;
          return 0;
        }
      }, {
        y: function y() {
          allowUpdates = 1;
          return -refreshHeight();
        },
        immediateRender: false,
        ease: "none",
        data: "ScrollSmoother",
        duration: 100,
        // for added precision
        onUpdate: function onUpdate() {
          if (allowUpdates) {
            var force = isProxyScrolling;
            if (force) {
              killScrub(mainST);
              scroll.y = currentY;
            }
            render12(scroll.y, force);
            updateVelocity();
            _onUpdate && !paused && _onUpdate(self);
          }
        }
      }),
      onRefreshInit: function onRefreshInit(self2) {
        if (ScrollSmoother2.isRefreshing) {
          return;
        }
        ScrollSmoother2.isRefreshing = true;
        if (effects) {
          var _pins = ScrollTrigger4.getAll().filter(function(st) {
            return !!st.pin;
          });
          effects.forEach(function(st) {
            if (!st.vars.pinnedContainer) {
              _pins.forEach(function(pinST) {
                if (pinST.pin.contains(st.trigger)) {
                  var v = st.vars;
                  v.pinnedContainer = pinST.pin;
                  st.vars = null;
                  st.init(v, st.animation);
                }
              });
            }
          });
        }
        var scrub = self2.getTween();
        recordedRefreshScrub = scrub && scrub._end > scrub._dp._time;
        recordedRefreshScroll = currentY;
        scroll.y = 0;
        if (smoothDuration) {
          ScrollTrigger4.isTouch === 1 && (wrapper.style.position = "absolute");
          wrapper.scrollTop = 0;
          ScrollTrigger4.isTouch === 1 && (wrapper.style.position = "fixed");
        }
      },
      onRefresh: function onRefresh2(self2) {
        self2.animation.invalidate();
        self2.setPositions(self2.start, refreshHeight() / speed);
        recordedRefreshScrub || killScrub(self2);
        scroll.y = -scrollFunc() * speed;
        render12(scroll.y);
        if (!startupPhase) {
          recordedRefreshScrub && (isProxyScrolling = false);
          self2.animation.progress(gsap26.utils.clamp(0, 1, recordedRefreshScroll / speed / -self2.end));
        }
        if (recordedRefreshScrub) {
          self2.progress -= 1e-3;
          self2.update();
        }
        ScrollSmoother2.isRefreshing = false;
      },
      id: "ScrollSmoother",
      scroller: _win11,
      invalidateOnRefresh: true,
      start: 0,
      refreshPriority: -9999,
      // because all other pins, etc. should be calculated first before this figures out the height of the body. BUT this should also update FIRST so that the scroll position on the proxy is up-to-date when all the ScrollTriggers calculate their progress! -9999 is a special number that ScrollTrigger looks for to handle in this way.
      end: function end() {
        return refreshHeight() / speed;
      },
      onScrubComplete: function onScrubComplete() {
        tracker.reset();
        onStop && onStop(_this);
      },
      scrub: smoothDuration || true
    });
    this.smooth = function(value) {
      if (arguments.length) {
        smoothDuration = value || 0;
        speed = smoothDuration && +vars.speed || 1;
        mainST.scrubDuration(value);
      }
      return mainST.getTween() ? mainST.getTween().duration() : 0;
    };
    mainST.getTween() && (mainST.getTween().vars.ease = vars.ease || _expo);
    this.scrollTrigger = mainST;
    vars.effects && this.effects(vars.effects === true ? "[data-" + effectsPrefix + "speed], [data-" + effectsPrefix + "lag]" : vars.effects, {
      effectsPadding: vars.effectsPadding,
      refresh: false
    });
    vars.sections && this.sections(vars.sections === true ? "[data-section]" : vars.sections);
    existingScrollTriggers.forEach(function(st) {
      st.vars.scroller = wrapper;
      st.revert(false, true);
      st.init(st.vars, st.animation);
    });
    this.paused = function(value, allowNestedScroll) {
      if (arguments.length) {
        if (!!paused !== value) {
          if (value) {
            mainST.getTween() && mainST.getTween().pause();
            scrollFunc(-currentY / speed);
            tracker.reset();
            pausedNormalizer = ScrollTrigger4.normalizeScroll();
            pausedNormalizer && pausedNormalizer.disable();
            paused = ScrollTrigger4.observe({
              preventDefault: true,
              type: "wheel,touch,scroll",
              debounce: false,
              allowClicks: true,
              onChangeY: function onChangeY() {
                return scrollTop(-currentY);
              }
              // refuse to scroll
            });
            paused.nested = _inputObserver3(_docEl6, "wheel,touch,scroll", true, allowNestedScroll !== false);
          } else {
            paused.nested.kill();
            paused.kill();
            paused = 0;
            pausedNormalizer && pausedNormalizer.enable();
            mainST.progress = (-currentY / speed - mainST.start) / (mainST.end - mainST.start);
            killScrub(mainST);
          }
        }
        return this;
      }
      return !!paused;
    };
    this.kill = this.revert = function() {
      _this.paused(false);
      killScrub(mainST);
      mainST.kill();
      var triggers = (effects || []).concat(sections || []), i2 = triggers.length;
      while (i2--) {
        triggers[i2].kill();
      }
      ScrollTrigger4.scrollerProxy(wrapper);
      ScrollTrigger4.removeEventListener("killAll", addOnRefresh);
      ScrollTrigger4.removeEventListener("refresh", onRefresh);
      wrapper.style.cssText = wrapperCSS;
      content.style.cssText = contentCSS;
      var defaults = ScrollTrigger4.defaults({});
      defaults && defaults.scroller === wrapper && ScrollTrigger4.defaults({
        scroller: _win11
      });
      _this.normalizer && ScrollTrigger4.normalizeScroll(false);
      clearInterval(intervalID);
      _mainInstance = null;
      resizeObserver && resizeObserver.disconnect();
      _body9.style.removeProperty("height");
      _win11.removeEventListener("focusin", _onFocusIn);
    };
    this.refresh = function(soft, force) {
      return mainST.refresh(soft, force);
    };
    if (normalizeScroll) {
      this.normalizer = ScrollTrigger4.normalizeScroll(normalizeScroll === true ? {
        debounce: true,
        content: !smoothDuration && content
      } : normalizeScroll);
    }
    ScrollTrigger4.config(vars);
    "scrollBehavior" in _win11.getComputedStyle(_body9) && gsap26.set([_body9, _docEl6], {
      scrollBehavior: "auto"
    });
    _win11.addEventListener("focusin", _onFocusIn);
    intervalID = setInterval(updateVelocity, 250);
    _doc11.readyState === "loading" || requestAnimationFrame(function() {
      return ScrollTrigger4.refresh();
    });
  }
  ScrollSmoother2.register = function register8(core) {
    if (!_coreInitted21) {
      gsap26 = core || _getGSAP43();
      if (_windowExists17() && window.document) {
        _win11 = window;
        _doc11 = document;
        _docEl6 = _doc11.documentElement;
        _body9 = _doc11.body;
      }
      if (gsap26) {
        _toArray10 = gsap26.utils.toArray;
        _clamp4 = gsap26.utils.clamp;
        _expo = gsap26.parseEase("expo");
        _context7 = gsap26.core.context || function() {
        };
        ScrollTrigger4 = gsap26.core.globals().ScrollTrigger;
        gsap26.core.globals("ScrollSmoother", ScrollSmoother2);
        if (_body9 && ScrollTrigger4) {
          _onResizeDelayedCall = gsap26.delayedCall(0.2, function() {
            return ScrollTrigger4.isRefreshing || _mainInstance && _mainInstance.refresh();
          }).pause();
          _root3 = [_win11, _doc11, _docEl6, _body9];
          _getVelocityProp3 = ScrollTrigger4.core._getVelocityProp;
          _inputObserver3 = ScrollTrigger4.core._inputObserver;
          ScrollSmoother2.refresh = ScrollTrigger4.refresh;
          _coreInitted21 = 1;
        }
      }
    }
    return _coreInitted21;
  };
  _createClass2(ScrollSmoother2, [{
    key: "progress",
    get: function get() {
      return this.scrollTrigger ? this.scrollTrigger.animation._time / 100 : 0;
    }
  }]);
  return ScrollSmoother2;
}();
ScrollSmoother.version = "3.13.0";
ScrollSmoother.create = function(vars) {
  return _mainInstance && vars && _mainInstance.content() === _toArray10(vars.content)[0] ? _mainInstance : new ScrollSmoother(vars);
};
ScrollSmoother.get = function() {
  return _mainInstance;
};
_getGSAP43() && gsap26.registerPlugin(ScrollSmoother);

// node_modules/gsap/SplitText.js
var gsap27;
var _fonts;
var _coreInitted22;
var _initIfNecessary = () => _coreInitted22 || SplitText.register(window.gsap);
var _charSegmenter = typeof Intl !== "undefined" ? new Intl.Segmenter() : 0;
var _toArray11 = (r) => typeof r === "string" ? _toArray11(document.querySelectorAll(r)) : "length" in r ? Array.from(r) : [r];
var _elements = (targets) => _toArray11(targets).filter((e) => e instanceof HTMLElement);
var _emptyArray2 = [];
var _context8 = function() {
};
var _spacesRegEx = /\s+/g;
var _emojiSafeRegEx = new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu");
var _emptyBounds = { left: 0, top: 0, width: 0, height: 0 };
var _stretchToFitSpecialChars = (collection, specialCharsRegEx) => {
  if (specialCharsRegEx) {
    let charsFound = new Set(collection.join("").match(specialCharsRegEx) || _emptyArray2), i2 = collection.length, slots, word, char, combined;
    if (charsFound.size) {
      while (--i2 > -1) {
        word = collection[i2];
        for (char of charsFound) {
          if (char.startsWith(word) && char.length > word.length) {
            slots = 0;
            combined = word;
            while (char.startsWith(combined += collection[i2 + ++slots]) && combined.length < char.length) {
            }
            if (slots && combined.length === char.length) {
              collection[i2] = char;
              collection.splice(i2 + 1, slots);
              break;
            }
          }
        }
      }
    }
  }
  return collection;
};
var _disallowInline = (element) => window.getComputedStyle(element).display === "inline" && (element.style.display = "inline-block");
var _insertNodeBefore = (newChild, parent, existingChild) => parent.insertBefore(typeof newChild === "string" ? document.createTextNode(newChild) : newChild, existingChild);
var _getWrapper = (type, config, collection) => {
  let className = config[type + "sClass"] || "", { tag = "div", aria = "auto", propIndex = false } = config, display = type === "line" ? "block" : "inline-block", incrementClass = className.indexOf("++") > -1, wrapper = (text) => {
    let el = document.createElement(tag), i2 = collection.length + 1;
    className && (el.className = className + (incrementClass ? " " + className + i2 : ""));
    propIndex && el.style.setProperty("--" + type, i2 + "");
    aria !== "none" && el.setAttribute("aria-hidden", "true");
    if (tag !== "span") {
      el.style.position = "relative";
      el.style.display = display;
    }
    el.textContent = text;
    collection.push(el);
    return el;
  };
  incrementClass && (className = className.replace("++", ""));
  wrapper.collection = collection;
  return wrapper;
};
var _getLineWrapper = (element, nodes, config, collection) => {
  let lineWrapper = _getWrapper("line", config, collection), textAlign = window.getComputedStyle(element).textAlign || "left";
  return (startIndex, endIndex) => {
    let newLine = lineWrapper("");
    newLine.style.textAlign = textAlign;
    element.insertBefore(newLine, nodes[startIndex]);
    for (; startIndex < endIndex; startIndex++) {
      newLine.appendChild(nodes[startIndex]);
    }
    newLine.normalize();
  };
};
var _splitWordsAndCharsRecursively = (element, config, wordWrapper, charWrapper, prepForCharsOnly, deepSlice, ignore, charSplitRegEx, specialCharsRegEx, isNested) => {
  var _a;
  let nodes = Array.from(element.childNodes), i2 = 0, { wordDelimiter, reduceWhiteSpace = true, prepareText } = config, elementBounds = element.getBoundingClientRect(), lastBounds = elementBounds, isPreformatted = !reduceWhiteSpace && window.getComputedStyle(element).whiteSpace.substring(0, 3) === "pre", ignoredPreviousSibling = 0, wordsCollection = wordWrapper.collection, wordDelimIsNotSpace, wordDelimString, wordDelimSplitter, curNode, words, curWordEl, startsWithSpace, endsWithSpace, j, bounds, curWordChars, clonedNode, curSubNode, tempSubNode, curTextContent, wordText, lastWordText, k;
  if (typeof wordDelimiter === "object") {
    wordDelimSplitter = wordDelimiter.delimiter || wordDelimiter;
    wordDelimString = wordDelimiter.replaceWith || "";
  } else {
    wordDelimString = wordDelimiter === "" ? "" : wordDelimiter || " ";
  }
  wordDelimIsNotSpace = wordDelimString !== " ";
  for (; i2 < nodes.length; i2++) {
    curNode = nodes[i2];
    if (curNode.nodeType === 3) {
      curTextContent = curNode.textContent || "";
      if (reduceWhiteSpace) {
        curTextContent = curTextContent.replace(_spacesRegEx, " ");
      } else if (isPreformatted) {
        curTextContent = curTextContent.replace(/\n/g, wordDelimString + "\n");
      }
      prepareText && (curTextContent = prepareText(curTextContent, element));
      curNode.textContent = curTextContent;
      words = wordDelimString || wordDelimSplitter ? curTextContent.split(wordDelimSplitter || wordDelimString) : curTextContent.match(charSplitRegEx) || _emptyArray2;
      lastWordText = words[words.length - 1];
      endsWithSpace = wordDelimIsNotSpace ? lastWordText.slice(-1) === " " : !lastWordText;
      lastWordText || words.pop();
      lastBounds = elementBounds;
      startsWithSpace = wordDelimIsNotSpace ? words[0].charAt(0) === " " : !words[0];
      startsWithSpace && _insertNodeBefore(" ", element, curNode);
      words[0] || words.shift();
      _stretchToFitSpecialChars(words, specialCharsRegEx);
      deepSlice && isNested || (curNode.textContent = "");
      for (j = 1; j <= words.length; j++) {
        wordText = words[j - 1];
        if (!reduceWhiteSpace && isPreformatted && wordText.charAt(0) === "\n") {
          (_a = curNode.previousSibling) == null ? void 0 : _a.remove();
          _insertNodeBefore(document.createElement("br"), element, curNode);
          wordText = wordText.slice(1);
        }
        if (!reduceWhiteSpace && wordText === "") {
          _insertNodeBefore(wordDelimString, element, curNode);
        } else if (wordText === " ") {
          element.insertBefore(document.createTextNode(" "), curNode);
        } else {
          wordDelimIsNotSpace && wordText.charAt(0) === " " && _insertNodeBefore(" ", element, curNode);
          if (ignoredPreviousSibling && j === 1 && !startsWithSpace && wordsCollection.indexOf(ignoredPreviousSibling.parentNode) > -1) {
            curWordEl = wordsCollection[wordsCollection.length - 1];
            curWordEl.appendChild(document.createTextNode(charWrapper ? "" : wordText));
          } else {
            curWordEl = wordWrapper(charWrapper ? "" : wordText);
            _insertNodeBefore(curWordEl, element, curNode);
            ignoredPreviousSibling && j === 1 && !startsWithSpace && curWordEl.insertBefore(ignoredPreviousSibling, curWordEl.firstChild);
          }
          if (charWrapper) {
            curWordChars = _charSegmenter ? _stretchToFitSpecialChars([..._charSegmenter.segment(wordText)].map((s) => s.segment), specialCharsRegEx) : wordText.match(charSplitRegEx) || _emptyArray2;
            for (k = 0; k < curWordChars.length; k++) {
              curWordEl.appendChild(curWordChars[k] === " " ? document.createTextNode(" ") : charWrapper(curWordChars[k]));
            }
          }
          if (deepSlice && isNested) {
            curTextContent = curNode.textContent = curTextContent.substring(wordText.length + 1, curTextContent.length);
            bounds = curWordEl.getBoundingClientRect();
            if (bounds.top > lastBounds.top && bounds.left <= lastBounds.left) {
              clonedNode = element.cloneNode();
              curSubNode = element.childNodes[0];
              while (curSubNode && curSubNode !== curWordEl) {
                tempSubNode = curSubNode;
                curSubNode = curSubNode.nextSibling;
                clonedNode.appendChild(tempSubNode);
              }
              element.parentNode.insertBefore(clonedNode, element);
              prepForCharsOnly && _disallowInline(clonedNode);
            }
            lastBounds = bounds;
          }
          if (j < words.length || endsWithSpace) {
            _insertNodeBefore(j >= words.length ? " " : wordDelimIsNotSpace && wordText.slice(-1) === " " ? " " + wordDelimString : wordDelimString, element, curNode);
          }
        }
      }
      element.removeChild(curNode);
      ignoredPreviousSibling = 0;
    } else if (curNode.nodeType === 1) {
      if (ignore && ignore.indexOf(curNode) > -1) {
        wordsCollection.indexOf(curNode.previousSibling) > -1 && wordsCollection[wordsCollection.length - 1].appendChild(curNode);
        ignoredPreviousSibling = curNode;
      } else {
        _splitWordsAndCharsRecursively(curNode, config, wordWrapper, charWrapper, prepForCharsOnly, deepSlice, ignore, charSplitRegEx, specialCharsRegEx, true);
        ignoredPreviousSibling = 0;
      }
      prepForCharsOnly && _disallowInline(curNode);
    }
  }
};
var _SplitText = class _SplitText2 {
  constructor(elements, config) {
    this.isSplit = false;
    _initIfNecessary();
    this.elements = _elements(elements);
    this.chars = [];
    this.words = [];
    this.lines = [];
    this.masks = [];
    this.vars = config;
    this._split = () => this.isSplit && this.split(this.vars);
    let orig = [], timerId, checkWidths = () => {
      let i2 = orig.length, o;
      while (i2--) {
        o = orig[i2];
        let w = o.element.offsetWidth;
        if (w !== o.width) {
          o.width = w;
          this._split();
          return;
        }
      }
    };
    this._data = { orig, obs: typeof ResizeObserver !== "undefined" && new ResizeObserver(() => {
      clearTimeout(timerId);
      timerId = setTimeout(checkWidths, 200);
    }) };
    _context8(this);
    this.split(config);
  }
  split(config) {
    this.isSplit && this.revert();
    this.vars = config = config || this.vars || {};
    let { type = "chars,words,lines", aria = "auto", deepSlice = true, smartWrap, onSplit, autoSplit = false, specialChars, mask } = this.vars, splitLines = type.indexOf("lines") > -1, splitCharacters = type.indexOf("chars") > -1, splitWords = type.indexOf("words") > -1, onlySplitCharacters = splitCharacters && !splitWords && !splitLines, specialCharsRegEx = specialChars && ("push" in specialChars ? new RegExp("(?:" + specialChars.join("|") + ")", "gu") : specialChars), finalCharSplitRegEx = specialCharsRegEx ? new RegExp(specialCharsRegEx.source + "|" + _emojiSafeRegEx.source, "gu") : _emojiSafeRegEx, ignore = !!config.ignore && _elements(config.ignore), { orig, animTime, obs } = this._data, onSplitResult;
    if (splitCharacters || splitWords || splitLines) {
      this.elements.forEach((element, index) => {
        orig[index] = {
          element,
          html: element.innerHTML,
          ariaL: element.getAttribute("aria-label"),
          ariaH: element.getAttribute("aria-hidden")
        };
        aria === "auto" ? element.setAttribute("aria-label", (element.textContent || "").trim()) : aria === "hidden" && element.setAttribute("aria-hidden", "true");
        let chars = [], words = [], lines = [], charWrapper = splitCharacters ? _getWrapper("char", config, chars) : null, wordWrapper = _getWrapper("word", config, words), i2, curWord, smartWrapSpan, nextSibling;
        _splitWordsAndCharsRecursively(element, config, wordWrapper, charWrapper, onlySplitCharacters, deepSlice && (splitLines || onlySplitCharacters), ignore, finalCharSplitRegEx, specialCharsRegEx, false);
        if (splitLines) {
          let nodes = _toArray11(element.childNodes), wrapLine = _getLineWrapper(element, nodes, config, lines), curNode, toRemove = [], lineStartIndex = 0, allBounds = nodes.map((n) => n.nodeType === 1 ? n.getBoundingClientRect() : _emptyBounds), lastBounds = _emptyBounds;
          for (i2 = 0; i2 < nodes.length; i2++) {
            curNode = nodes[i2];
            if (curNode.nodeType === 1) {
              if (curNode.nodeName === "BR") {
                toRemove.push(curNode);
                wrapLine(lineStartIndex, i2 + 1);
                lineStartIndex = i2 + 1;
                lastBounds = allBounds[lineStartIndex];
              } else {
                if (i2 && allBounds[i2].top > lastBounds.top && allBounds[i2].left <= lastBounds.left) {
                  wrapLine(lineStartIndex, i2);
                  lineStartIndex = i2;
                }
                lastBounds = allBounds[i2];
              }
            }
          }
          lineStartIndex < i2 && wrapLine(lineStartIndex, i2);
          toRemove.forEach((el) => {
            var _a;
            return (_a = el.parentNode) == null ? void 0 : _a.removeChild(el);
          });
        }
        if (!splitWords) {
          for (i2 = 0; i2 < words.length; i2++) {
            curWord = words[i2];
            if (splitCharacters || !curWord.nextSibling || curWord.nextSibling.nodeType !== 3) {
              if (smartWrap && !splitLines) {
                smartWrapSpan = document.createElement("span");
                smartWrapSpan.style.whiteSpace = "nowrap";
                while (curWord.firstChild) {
                  smartWrapSpan.appendChild(curWord.firstChild);
                }
                curWord.replaceWith(smartWrapSpan);
              } else {
                curWord.replaceWith(...curWord.childNodes);
              }
            } else {
              nextSibling = curWord.nextSibling;
              if (nextSibling && nextSibling.nodeType === 3) {
                nextSibling.textContent = (curWord.textContent || "") + (nextSibling.textContent || "");
                curWord.remove();
              }
            }
          }
          words.length = 0;
          element.normalize();
        }
        this.lines.push(...lines);
        this.words.push(...words);
        this.chars.push(...chars);
      });
      mask && this[mask] && this.masks.push(...this[mask].map((el) => {
        let maskEl = el.cloneNode();
        el.replaceWith(maskEl);
        maskEl.appendChild(el);
        el.className && (maskEl.className = el.className.replace(/(\b\w+\b)/g, "$1-mask"));
        maskEl.style.overflow = "clip";
        return maskEl;
      }));
    }
    this.isSplit = true;
    _fonts && (autoSplit ? _fonts.addEventListener("loadingdone", this._split) : _fonts.status === "loading" && console.warn("SplitText called before fonts loaded"));
    if ((onSplitResult = onSplit && onSplit(this)) && onSplitResult.totalTime) {
      this._data.anim = animTime ? onSplitResult.totalTime(animTime) : onSplitResult;
    }
    splitLines && autoSplit && this.elements.forEach((element, index) => {
      orig[index].width = element.offsetWidth;
      obs && obs.observe(element);
    });
    return this;
  }
  revert() {
    var _a, _b;
    let { orig, anim, obs } = this._data;
    obs && obs.disconnect();
    orig.forEach(({ element, html, ariaL, ariaH }) => {
      element.innerHTML = html;
      ariaL ? element.setAttribute("aria-label", ariaL) : element.removeAttribute("aria-label");
      ariaH ? element.setAttribute("aria-hidden", ariaH) : element.removeAttribute("aria-hidden");
    });
    this.chars.length = this.words.length = this.lines.length = orig.length = this.masks.length = 0;
    this.isSplit = false;
    _fonts == null ? void 0 : _fonts.removeEventListener("loadingdone", this._split);
    if (anim) {
      this._data.animTime = anim.totalTime();
      anim.revert();
    }
    (_b = (_a = this.vars).onRevert) == null ? void 0 : _b.call(_a, this);
    return this;
  }
  static create(elements, config) {
    return new _SplitText2(elements, config);
  }
  static register(core) {
    gsap27 = gsap27 || core || window.gsap;
    if (gsap27) {
      _toArray11 = gsap27.utils.toArray;
      _context8 = gsap27.core.context || _context8;
    }
    if (!_coreInitted22 && window.innerWidth > 0) {
      _fonts = document.fonts;
      _coreInitted22 = true;
    }
  }
};
_SplitText.version = "3.13.0";
var SplitText = _SplitText;

// node_modules/gsap/all.js
var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
var TweenMaxWithCSS = gsapWithCSS.core.Tween;
export {
  Back,
  Bounce,
  CSSPlugin,
  CSSRulePlugin,
  Circ,
  Cubic,
  CustomBounce,
  CustomEase,
  CustomWiggle,
  Draggable,
  DrawSVGPlugin,
  EasePack,
  EaselPlugin,
  Elastic,
  Expo,
  ExpoScaleEase,
  Flip,
  GSDevTools,
  InertiaPlugin2 as InertiaPlugin,
  Linear,
  MorphSVGPlugin,
  MotionPathHelper,
  MotionPathPlugin,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  Power0,
  Power1,
  Power2,
  Power3,
  Power4,
  Quad,
  Quart,
  Quint,
  RoughEase,
  ScrambleTextPlugin,
  ScrollSmoother,
  ScrollToPlugin,
  ScrollTrigger3 as ScrollTrigger,
  Sine,
  SlowMo,
  SplitText,
  SteppedEase,
  Strong,
  TextPlugin,
  Timeline as TimelineLite,
  Timeline as TimelineMax,
  Tween as TweenLite,
  TweenMaxWithCSS as TweenMax,
  VelocityTracker,
  _getProxyProp,
  _getScrollFunc,
  _getTarget,
  _getVelocityProp,
  _horizontal,
  _isViewport,
  _proxies,
  _scrollers,
  _vertical,
  clamp,
  gsapWithCSS as default,
  distribute,
  getUnit,
  gsapWithCSS as gsap,
  interpolate,
  mapRange,
  normalize,
  pipe,
  random,
  selector,
  shuffle,
  snap,
  splitColor,
  toArray,
  unitize,
  wrap,
  wrapYoyo
};
/*! Bundled license information:

gsap/utils/paths.js:
  (*!
   * paths 3.13.0
   * https://gsap.com
   *
   * Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CustomEase.js:
  (*!
   * CustomEase 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/utils/matrix.js:
  (*!
   * matrix 3.13.0
   * https://gsap.com
   *
   * Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Draggable.js:
  (*!
   * Draggable 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
   *)

gsap/CSSRulePlugin.js:
  (*!
   * CSSRulePlugin 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/EaselPlugin.js:
  (*!
   * EaselPlugin 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/EasePack.js:
  (*!
   * EasePack 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Flip.js:
  (*!
   * Flip 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/MotionPathPlugin.js:
  (*!
   * MotionPathPlugin 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Observer.js:
  (*!
   * Observer 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/PixiPlugin.js:
  (*!
   * PixiPlugin 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollToPlugin.js:
  (*!
   * ScrollToPlugin 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollTrigger.js:
  (*!
   * ScrollTrigger 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/utils/strings.js:
  (*!
   * strings: 3.13.0
   * https://gsap.com
   *
   * Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/TextPlugin.js:
  (*!
   * TextPlugin 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/DrawSVGPlugin.js:
  (*!
   * DrawSVGPlugin 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Physics2DPlugin.js:
  (*!
   * Physics2DPlugin 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/PhysicsPropsPlugin.js:
  (*!
   * PhysicsPropsPlugin 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrambleTextPlugin.js:
  (*!
   * ScrambleTextPlugin 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CustomBounce.js:
  (*!
   * CustomBounce 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CustomWiggle.js:
  (*!
   * CustomWiggle 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/GSDevTools.js:
  (*!
   * GSDevTools 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/utils/VelocityTracker.js:
  (*!
   * VelocityTracker: 3.13.0
   * https://gsap.com
   *
   * Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/InertiaPlugin.js:
  (*!
   * InertiaPlugin 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/MorphSVGPlugin.js:
  (*!
   * MorphSVGPlugin 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/utils/PathEditor.js:
  (*!
   * PathEditor 3.13.0
   * https://gsap.com
   *
   * Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/MotionPathHelper.js:
  (*!
   * MotionPathHelper 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollSmoother.js:
  (*!
   * ScrollSmoother 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/SplitText.js:
  (*!
   * SplitText 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
   * @author: Jack Doyle
   *)
*/
//# sourceMappingURL=gsap_all.js.map
