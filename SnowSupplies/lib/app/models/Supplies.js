"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Supplies = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

//import { construct, constructor } from "core-js/fn/reflect";
var Supplies = /*#__PURE__*/function () {
  function Supplies(id, Name, Description, Amount) {
    (0, _classCallCheck2.default)(this, Supplies);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "Name", "");
    (0, _defineProperty2.default)(this, "Description", "");
    (0, _defineProperty2.default)(this, "Amount", -1);
    this.id = id;
    this.Name = Name;
    this.Description = Description;
    this.Amount = Amount;
  }
  /**
   * Getter $id
   * @return {number }
   */


  (0, _createClass2.default)(Supplies, [{
    key: "$ID",
    get: function get() {
      return this.id;
    }
    /**
     * Getter $Name
     * @return {string }
     */
    ,
    set:
    /**
     * Setter $id
     * @param {number } value
     */
    function set(value) {
      this.id = value;
    }
    /**
     * Setter $Name
     * @param {string } value
     */

  }, {
    key: "$Name",
    get: function get() {
      return this.Name;
    }
    /**
     * Getter $Description
     * @return {string }
     */
    ,
    set: function set(value) {
      this.Name = value;
    }
    /**
     * Setter $Description
     * @param {string } value
     */

  }, {
    key: "$Description",
    get: function get() {
      return this.Description;
    }
    /**
     * Getter $amount
     * @return {number }
     */
    ,
    set: function set(value) {
      this.Description = value;
    }
    /**
     * Setter $amount
     * @param {number } value
     */

  }, {
    key: "$Amount",
    get: function get() {
      return this.Amount;
    },
    set: function set(value) {
      this.Amount = value;
    }
  }]);
  return Supplies;
}();

exports.Supplies = Supplies;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvU3VwcGxpZXMudHMiXSwibmFtZXMiOlsiU3VwcGxpZXMiLCJpZCIsIk5hbWUiLCJEZXNjcmlwdGlvbiIsIkFtb3VudCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUVhQSxRO0FBUVQsb0JBQVlDLEVBQVosRUFBdUJDLElBQXZCLEVBQW9DQyxXQUFwQyxFQUF3REMsTUFBeEQsRUFDQTtBQUFBO0FBQUEsOENBUHFCLENBQUMsQ0FPdEI7QUFBQSxnREFOdUIsRUFNdkI7QUFBQSx1REFMOEIsRUFLOUI7QUFBQSxrREFKeUIsQ0FBQyxDQUkxQjtBQUNJLFNBQUtILEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBRUg7QUFHRDtBQUNKO0FBQ0E7QUFDQTs7Ozs7U0FDQyxlQUEwQjtBQUN6QixhQUFPLEtBQUtILEVBQVo7QUFDQTtBQUVFO0FBQ0o7QUFDQTtBQUNBOzs7QUFxQkk7QUFDSjtBQUNBO0FBQ0E7QUFDQyxpQkFBZUksS0FBZixFQUErQjtBQUM5QixXQUFLSixFQUFMLEdBQVVJLEtBQVY7QUFDQTtBQUVFO0FBQ0o7QUFDQTtBQUNBOzs7O1NBL0JDLGVBQTRCO0FBQzNCLGFBQU8sS0FBS0gsSUFBWjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7O1NBeUJDLGFBQWlCRyxLQUFqQixFQUFpQztBQUNoQyxXQUFLSCxJQUFMLEdBQVlHLEtBQVo7QUFDQTtBQUVFO0FBQ0o7QUFDQTtBQUNBOzs7O1NBL0JDLGVBQW1DO0FBQ2xDLGFBQU8sS0FBS0YsV0FBWjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7O1NBeUJDLGFBQXdCRSxLQUF4QixFQUF3QztBQUN2QyxXQUFLRixXQUFMLEdBQW1CRSxLQUFuQjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7Ozs7U0EvQkMsZUFBOEI7QUFDN0IsYUFBTyxLQUFLRCxNQUFaO0FBQ0EsSztTQThCRCxhQUFtQkMsS0FBbkIsRUFBbUM7QUFDbEMsV0FBS0QsTUFBTCxHQUFjQyxLQUFkO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbnVtYmVyIGZyb20gXCJjb3JlLWpzL2NvcmUvbnVtYmVyXCI7XG5pbXBvcnQgc3RyaW5nIGZyb20gXCJjb3JlLWpzL2NvcmUvc3RyaW5nXCI7XG4vL2ltcG9ydCB7IGNvbnN0cnVjdCwgY29uc3RydWN0b3IgfSBmcm9tIFwiY29yZS1qcy9mbi9yZWZsZWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBTdXBwbGllc1xue1xuICAgIHByaXZhdGUgaWQ6IG51bWJlciA9IC0xO1xuICAgIHByaXZhdGUgTmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIERlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgQW1vdW50OiBudW1iZXIgPSAtMTtcblxuXG4gICAgY29uc3RydWN0b3IoaWQ6bnVtYmVyLCBOYW1lOnN0cmluZywgRGVzY3JpcHRpb246c3RyaW5nLCBBbW91bnQ6bnVtYmVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLk5hbWUgPSBOYW1lO1xuICAgICAgICB0aGlzLkRlc2NyaXB0aW9uID0gRGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuQW1vdW50ID0gQW1vdW50O1xuICAgIFxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0dGVyICRpZFxuICAgICAqIEByZXR1cm4ge251bWJlciB9XG4gICAgICovXG5cdHB1YmxpYyBnZXQgJElEKCk6IG51bWJlciAge1xuXHRcdHJldHVybiB0aGlzLmlkO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBHZXR0ZXIgJE5hbWVcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmcgfVxuICAgICAqL1xuXHRwdWJsaWMgZ2V0ICROYW1lKCk6IHN0cmluZyAge1xuXHRcdHJldHVybiB0aGlzLk5hbWU7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEdldHRlciAkRGVzY3JpcHRpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmcgfVxuICAgICAqL1xuXHRwdWJsaWMgZ2V0ICREZXNjcmlwdGlvbigpOiBzdHJpbmcgIHtcblx0XHRyZXR1cm4gdGhpcy5EZXNjcmlwdGlvbjtcblx0fVxuXG4gICAgLyoqXG4gICAgICogR2V0dGVyICRhbW91bnRcbiAgICAgKiBAcmV0dXJuIHtudW1iZXIgfVxuICAgICAqL1xuXHRwdWJsaWMgZ2V0ICRBbW91bnQoKTogbnVtYmVyICB7XG5cdFx0cmV0dXJuIHRoaXMuQW1vdW50O1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBTZXR0ZXIgJGlkXG4gICAgICogQHBhcmFtIHtudW1iZXIgfSB2YWx1ZVxuICAgICAqL1xuXHRwdWJsaWMgc2V0ICRJRCh2YWx1ZTogbnVtYmVyICkge1xuXHRcdHRoaXMuaWQgPSB2YWx1ZTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogU2V0dGVyICROYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfSB2YWx1ZVxuICAgICAqL1xuXHRwdWJsaWMgc2V0ICROYW1lKHZhbHVlOiBzdHJpbmcgKSB7XG5cdFx0dGhpcy5OYW1lID0gdmFsdWU7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIFNldHRlciAkRGVzY3JpcHRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB9IHZhbHVlXG4gICAgICovXG5cdHB1YmxpYyBzZXQgJERlc2NyaXB0aW9uKHZhbHVlOiBzdHJpbmcgKSB7XG5cdFx0dGhpcy5EZXNjcmlwdGlvbiA9IHZhbHVlO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBTZXR0ZXIgJGFtb3VudFxuICAgICAqIEBwYXJhbSB7bnVtYmVyIH0gdmFsdWVcbiAgICAgKi9cblx0cHVibGljIHNldCAkQW1vdW50KHZhbHVlOiBudW1iZXIgKSB7XG5cdFx0dGhpcy5BbW91bnQgPSB2YWx1ZTtcblx0fVxuXG59Il19