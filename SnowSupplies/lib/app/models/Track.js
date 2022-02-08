"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Track = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Track = /*#__PURE__*/function () {
  function Track(id, number, title, lyrics, video) {
    (0, _classCallCheck2.default)(this, Track);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "number", 0);
    (0, _defineProperty2.default)(this, "title", "");
    (0, _defineProperty2.default)(this, "lyrics", "");
    (0, _defineProperty2.default)(this, "video", "");
    this.id = id;
    this.number = number;
    this.title = title;
    this.lyrics = lyrics;
    this.video = video;
  }

  (0, _createClass2.default)(Track, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
    }
  }, {
    key: "Number",
    get: function get() {
      return this.number;
    },
    set: function set(number) {
      this.number = number;
    }
  }, {
    key: "Title",
    get: function get() {
      return this.title;
    },
    set: function set(title) {
      this.title = title;
    }
  }, {
    key: "Lyrics",
    get: function get() {
      return this.lyrics;
    },
    set: function set(lyrics) {
      this.lyrics = lyrics;
    }
  }, {
    key: "Video",
    get: function get() {
      return this.video;
    },
    set: function set(value) {
      this.video = value;
    }
  }]);
  return Track;
}();

exports.Track = Track;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvVHJhY2sudHMiXSwibmFtZXMiOlsiVHJhY2siLCJpZCIsIm51bWJlciIsInRpdGxlIiwibHlyaWNzIiwidmlkZW8iLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBQWFBLEs7QUFRVCxpQkFBWUMsRUFBWixFQUF1QkMsTUFBdkIsRUFBc0NDLEtBQXRDLEVBQW9EQyxNQUFwRCxFQUFtRUMsS0FBbkUsRUFDQTtBQUFBO0FBQUEsOENBUHFCLENBQUMsQ0FPdEI7QUFBQSxrREFOeUIsQ0FNekI7QUFBQSxpREFMd0IsRUFLeEI7QUFBQSxrREFKeUIsRUFJekI7QUFBQSxpREFId0IsRUFHeEI7QUFDSSxTQUFLSixFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDSDs7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtKLEVBQVo7QUFDSCxLO1NBQ0QsYUFBT0EsRUFBUCxFQUNBO0FBQ0ksV0FBS0EsRUFBTCxHQUFVQSxFQUFWO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLE1BQVo7QUFDSCxLO1NBQ0QsYUFBV0EsTUFBWCxFQUNBO0FBQ0ksV0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLEtBQVo7QUFDSCxLO1NBQ0QsYUFBVUEsS0FBVixFQUNBO0FBQ0ksV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLE1BQVo7QUFDSCxLO1NBQ0QsYUFBV0EsTUFBWCxFQUNBO0FBQ0ksV0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLEtBQVo7QUFDSCxLO1NBRUQsYUFBaUJDLEtBQWpCLEVBQ0E7QUFDSSxXQUFLRCxLQUFMLEdBQWFDLEtBQWI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBUcmFja1xue1xuICAgIHByaXZhdGUgaWQ6IG51bWJlciA9IC0xO1xuICAgIHByaXZhdGUgbnVtYmVyOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgdGl0bGU6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBseXJpY3M6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSB2aWRlbzogc3RyaW5nID0gXCJcIjtcbiBcbiAgICBjb25zdHJ1Y3RvcihpZDpudW1iZXIsIG51bWJlcjpudW1iZXIsIHRpdGxlOnN0cmluZywgbHlyaWNzOnN0cmluZywgdmlkZW86c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm51bWJlciA9IG51bWJlcjtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmx5cmljcyA9IGx5cmljcztcbiAgICAgICAgdGhpcy52aWRlbyA9IHZpZGVvO1xuICAgIH1cblxuICAgIGdldCBJZCgpOm51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxuICAgIHNldCBJZChpZDpudW1iZXIpXG4gICAge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgfVxuXG4gICAgZ2V0IE51bWJlcigpOm51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtYmVyO1xuICAgIH1cbiAgICBzZXQgTnVtYmVyKG51bWJlcjpudW1iZXIpXG4gICAge1xuICAgICAgICB0aGlzLm51bWJlciA9IG51bWJlcjtcbiAgICB9XG5cbiAgICBnZXQgVGl0bGUoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpdGxlO1xuICAgIH1cbiAgICBzZXQgVGl0bGUodGl0bGU6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIH1cblxuICAgIGdldCBMeXJpY3MoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmx5cmljcztcbiAgICB9XG4gICAgc2V0IEx5cmljcyhseXJpY3M6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5seXJpY3MgPSBseXJpY3M7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBWaWRlbygpOiBzdHJpbmcgXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy52aWRlbztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IFZpZGVvKHZhbHVlOiBzdHJpbmcpIFxuICAgIHtcbiAgICAgICAgdGhpcy52aWRlbyA9IHZhbHVlO1xuICAgIH1cbn0iXX0=