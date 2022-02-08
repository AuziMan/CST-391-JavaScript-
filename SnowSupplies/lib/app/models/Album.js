"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Album = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Album = /*#__PURE__*/function () {
  function Album(id, title, artist, description, year, image, tracks) {
    (0, _classCallCheck2.default)(this, Album);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "title", "");
    (0, _defineProperty2.default)(this, "artist", "");
    (0, _defineProperty2.default)(this, "description", "");
    (0, _defineProperty2.default)(this, "year", 1900);
    (0, _defineProperty2.default)(this, "image", "");
    (0, _defineProperty2.default)(this, "tracks", []);
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.description = description;
    this.year = year;
    this.image = image;
    this.tracks = tracks;
  }

  (0, _createClass2.default)(Album, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
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
    key: "Artist",
    get: function get() {
      return this.artist;
    },
    set: function set(artist) {
      this.artist = artist;
    }
  }, {
    key: "Description",
    get: function get() {
      return this.description;
    },
    set: function set(description) {
      this.description = description;
    }
  }, {
    key: "Year",
    get: function get() {
      return this.year;
    },
    set: function set(year) {
      this.year = year;
    }
  }, {
    key: "Image",
    get: function get() {
      return this.image;
    },
    set: function set(value) {
      this.image = value;
    }
  }, {
    key: "Tracks",
    get: function get() {
      return this.tracks;
    },
    set: function set(tracks) {
      this.tracks = tracks;
    }
  }]);
  return Album;
}();

exports.Album = Album;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvQWxidW0udHMiXSwibmFtZXMiOlsiQWxidW0iLCJpZCIsInRpdGxlIiwiYXJ0aXN0IiwiZGVzY3JpcHRpb24iLCJ5ZWFyIiwiaW1hZ2UiLCJ0cmFja3MiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLEs7QUFVVCxpQkFBWUMsRUFBWixFQUF1QkMsS0FBdkIsRUFBcUNDLE1BQXJDLEVBQW9EQyxXQUFwRCxFQUF3RUMsSUFBeEUsRUFBcUZDLEtBQXJGLEVBQW9HQyxNQUFwRyxFQUNBO0FBQUE7QUFBQSw4Q0FUcUIsQ0FBQyxDQVN0QjtBQUFBLGlEQVJ3QixFQVF4QjtBQUFBLGtEQVB5QixFQU96QjtBQUFBLHVEQU44QixFQU05QjtBQUFBLGdEQUx1QixJQUt2QjtBQUFBLGlEQUp3QixFQUl4QjtBQUFBLGtEQUgwQixFQUcxQjtBQUNJLFNBQUtOLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7Ozs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLTixFQUFaO0FBQ0gsSztTQUNELGFBQU9BLEVBQVAsRUFDQTtBQUNJLFdBQUtBLEVBQUwsR0FBVUEsRUFBVjtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxLQUFaO0FBQ0gsSztTQUNELGFBQVVBLEtBQVYsRUFDQTtBQUNJLFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxNQUFaO0FBQ0gsSztTQUNELGFBQVdBLE1BQVgsRUFDQTtBQUNJLFdBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxXQUFaO0FBQ0gsSztTQUNELGFBQWdCQSxXQUFoQixFQUNBO0FBQ0ksV0FBS0EsV0FBTCxHQUFtQkEsV0FBbkI7QUFDSDs7O1NBRUQsZUFDQTtBQUNJLGFBQU8sS0FBS0MsSUFBWjtBQUNILEs7U0FDRCxhQUFTQSxJQUFULEVBQ0E7QUFDSSxXQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDSDs7O1NBRUQsZUFDQTtBQUNJLGFBQU8sS0FBS0MsS0FBWjtBQUNILEs7U0FDRCxhQUFpQkUsS0FBakIsRUFDQTtBQUNJLFdBQUtGLEtBQUwsR0FBYUUsS0FBYjtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLRCxNQUFaO0FBQ0gsSztTQUNELGFBQVdBLE1BQVgsRUFDQTtBQUNJLFdBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhY2sgfSBmcm9tIFwiLi9UcmFja1wiO1xuXG5leHBvcnQgY2xhc3MgQWxidW1cbntcbiAgICBwcml2YXRlIGlkOiBudW1iZXIgPSAtMTtcbiAgICBwcml2YXRlIHRpdGxlOiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgYXJ0aXN0OiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSB5ZWFyOiBudW1iZXIgPSAxOTAwO1xuICAgIHByaXZhdGUgaW1hZ2U6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSB0cmFja3M6IFRyYWNrW10gPSBbXTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihpZDpudW1iZXIsIHRpdGxlOnN0cmluZywgYXJ0aXN0OnN0cmluZywgZGVzY3JpcHRpb246c3RyaW5nLCB5ZWFyOm51bWJlciwgaW1hZ2U6IHN0cmluZywgdHJhY2tzOlRyYWNrW10pXG4gICAge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5hcnRpc3QgPSBhcnRpc3Q7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy55ZWFyID0geWVhcjtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgICAgICB0aGlzLnRyYWNrcyA9IHRyYWNrcztcbiAgICB9XG5cbiAgICBnZXQgSWQoKTpudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xuICAgIH1cbiAgICBzZXQgSWQoaWQ6bnVtYmVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgIH1cblxuICAgIGdldCBUaXRsZSgpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGl0bGU7XG4gICAgfVxuICAgIHNldCBUaXRsZSh0aXRsZTpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgfVxuXG4gICAgZ2V0IEFydGlzdCgpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJ0aXN0O1xuICAgIH1cbiAgICBzZXQgQXJ0aXN0KGFydGlzdDpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLmFydGlzdCA9IGFydGlzdDtcbiAgICB9XG5cbiAgICBnZXQgRGVzY3JpcHRpb24oKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xuICAgIH1cbiAgICBzZXQgRGVzY3JpcHRpb24oZGVzY3JpcHRpb246c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIH1cbiAgICBcbiAgICBnZXQgWWVhcigpOm51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueWVhcjtcbiAgICB9XG4gICAgc2V0IFllYXIoeWVhcjpudW1iZXIpXG4gICAge1xuICAgICAgICB0aGlzLnllYXIgPSB5ZWFyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgSW1hZ2UoKTogc3RyaW5nIFxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgSW1hZ2UodmFsdWU6IHN0cmluZykgXG4gICAge1xuICAgICAgICB0aGlzLmltYWdlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IFRyYWNrcygpOlRyYWNrW11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrcztcbiAgICB9XG4gICAgc2V0IFRyYWNrcyh0cmFja3M6VHJhY2tbXSlcbiAgICB7XG4gICAgICAgIHRoaXMudHJhY2tzID0gdHJhY2tzO1xuICAgIH1cbn0iXX0=