"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuppliesDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Supplies = require("../models/Supplies");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SuppliesDAO = /*#__PURE__*/function () {
  /**
   * Non-default constructor.
   * 
   * @param host Database Hostname
   * @param username Database Username
   * @param password Database Password
   */
  function SuppliesDAO(host, port, username, password) {
    (0, _classCallCheck2.default)(this, SuppliesDAO);
    (0, _defineProperty2.default)(this, "host", "");
    (0, _defineProperty2.default)(this, "port", 3306);
    (0, _defineProperty2.default)(this, "username", "");
    (0, _defineProperty2.default)(this, "password", "");
    (0, _defineProperty2.default)(this, "schema", "SnowSportsJS");
    (0, _defineProperty2.default)(this, "pool", this.initDbConnection());
    // Set all class properties
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.pool = this.initDbConnection();
  }

  (0, _createClass2.default)(SuppliesDAO, [{
    key: "findSupplies",
    value: function findSupplies(callback) {
      // List of Artist to return
      var supplies = []; // Get a pooled connection to the database, run the query to get all the distinct Supplies, and return the List of Supplies

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(err, connection) {
          var result1, x;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!err) {
                    _context.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  // Run query    
                  connection.query = util.promisify(connection.query);
                  _context.next = 5;
                  return connection.query('SELECT * FROM Invintory ORDER BY AMOUNT');

                case 5:
                  result1 = _context.sent;
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context.next = 9;
                    break;
                  }

                  throw err;

                case 9:
                  // Loop over result set and save the Supplies Name in the List of Supplies
                  for (x = 0; x < result1.length; ++x) {
                    supplies.push(new _Supplies.Supplies(result1[x].ID, result1[x].Name, result1[x].Description, result1[x].Amount));
                  } // Do a callback to return the results


                  callback(supplies);
                  ;

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
    /**
     * CRUD method to create some supplies.
     * 
     * @param supplies Album to insert.
     * @param callback Callback function with -1 if an error else Album ID created.  
     */

  }, {
    key: "create",
    value: function create(supplies, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(err, connection) {
          var result1, suppliesID;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context2.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and insert Album
                  connection.query = util.promisify(connection.query);
                  _context2.next = 6;
                  return connection.query('INSERT INTO Invintory (ID, NAME, DESCRIPTION, AMOUNT) VALUES(?,?,?,?)', [supplies.$ID, supplies.$Name, supplies.$Description, supplies.$Amount]);

                case 6:
                  result1 = _context2.sent;
                  if (result1.affectedRows != 1) callback(-1); // Use Promisfy Util to make an async function and run query to insert all Tracks for this Album

                  suppliesID = result1.insertId; // Do a callback to return the results

                  callback(suppliesID);

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
    /**
     * CRUD method to update supplies.
     * 
     * @param supplies Album to update.
     * @param callback Callback function with number of rows updated.  
     */

  }, {
    key: "update",
    value: function update(supplies, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(err, connection) {
          var changes, result1;
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context3.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and update Album
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context3.next = 7;
                  return connection.query('UPDATE Invintory SET NAME=?, DESCRIPTION=?, AMOUNT=? WHERE ID=?', [supplies.$Name, supplies.$Description, supplies.$Amount, supplies.$ID]);

                case 7:
                  result1 = _context3.sent;
                  if (result1.changedRows != 0) ++changes; // Do a callback to return the results

                  callback(changes);

                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to delete an Album.
    * 
    * @param supplies Album ID to delete.
    * @param callback Callback function with number of rows deleted.  
    * */

  }, {
    key: "delete",
    value: function _delete(suppliesId, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
          var changes, result1;
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context4.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to delete the tracks for an Album
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context4.next = 7;
                  return connection.query('DELETE FROM Invintory WHERE ID=?', [suppliesId]);

                case 7:
                  result1 = _context4.sent;
                  changes = changes + result1.affectedRows; // Do a callback to return the results

                  callback(changes);

                case 10:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    } // //* **************** Private Helper Methods **************** */
    // /**
    //  * Private helper method to initialie a Database Connection
    //  */

  }, {
    key: "initDbConnection",
    value: function initDbConnection() {
      return mysql.createPool({
        host: this.host,
        port: this.port,
        user: this.username,
        password: this.password,
        database: this.schema,
        connectionLimit: 10
      });
    }
  }]);
  return SuppliesDAO;
}();

exports.SuppliesDAO = SuppliesDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9TdXBwbGllc0RBTy50cyJdLCJuYW1lcyI6WyJTdXBwbGllc0RBTyIsImhvc3QiLCJwb3J0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluaXREYkNvbm5lY3Rpb24iLCJwb29sIiwiY2FsbGJhY2siLCJzdXBwbGllcyIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicXVlcnkiLCJ1dGlsIiwicHJvbWlzaWZ5IiwicmVzdWx0MSIsInJlbGVhc2UiLCJ4IiwibGVuZ3RoIiwicHVzaCIsIlN1cHBsaWVzIiwiSUQiLCJOYW1lIiwiRGVzY3JpcHRpb24iLCJBbW91bnQiLCIkSUQiLCIkTmFtZSIsIiREZXNjcmlwdGlvbiIsIiRBbW91bnQiLCJhZmZlY3RlZFJvd3MiLCJzdXBwbGllc0lEIiwiaW5zZXJ0SWQiLCJjaGFuZ2VzIiwiY2hhbmdlZFJvd3MiLCJzdXBwbGllc0lkIiwibXlzcWwiLCJjcmVhdGVQb29sIiwidXNlciIsImRhdGFiYXNlIiwic2NoZW1hIiwiY29ubmVjdGlvbkxpbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7Ozs7O0lBRWFBLFc7QUFVVDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJLHVCQUFZQyxJQUFaLEVBQXlCQyxJQUF6QixFQUFzQ0MsUUFBdEMsRUFBdURDLFFBQXZELEVBQ0E7QUFBQTtBQUFBLGdEQWZzQixFQWV0QjtBQUFBLGdEQWRzQixJQWN0QjtBQUFBLG9EQWIwQixFQWExQjtBQUFBLG9EQVowQixFQVkxQjtBQUFBLGtEQVh3QixjQVd4QjtBQUFBLGdEQVZlLEtBQUtDLGdCQUFMLEVBVWY7QUFDSTtBQUNBLFNBQUtKLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7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QUNLLE9BQVgsR0FIb0IsQ0FLcEI7O0FBTG9CLHVCQU1qQk4sR0FOaUI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsd0JBTU5BLEdBTk07O0FBQUE7QUFRcEI7QUFDSXNCLGtCQUFBQSxPQVRnQixHQVNOLENBVE07QUFVcEJyQixrQkFBQUEsVUFBVSxDQUFDQyxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUgsVUFBVSxDQUFDQyxLQUExQixDQUFuQjtBQVZvQjtBQUFBLHlCQVdBRCxVQUFVLENBQUNDLEtBQVgsQ0FBaUIsa0NBQWpCLEVBQXFELENBQUNzQixVQUFELENBQXJELENBWEE7O0FBQUE7QUFXaEJuQixrQkFBQUEsT0FYZ0I7QUFZcEJpQixrQkFBQUEsT0FBTyxHQUFHQSxPQUFPLEdBQUdqQixPQUFPLENBQUNjLFlBQTVCLENBWm9CLENBZXBCOztBQUNBdEIsa0JBQUFBLFFBQVEsQ0FBQ3lCLE9BQUQsQ0FBUjs7QUFoQm9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBa0JILEssQ0FFRDtBQUVBO0FBQ0E7QUFDQTs7OztXQUNBLDRCQUNBO0FBQ0ksYUFBT0csS0FBSyxDQUFDQyxVQUFOLENBQWlCO0FBQUNuQyxRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBWjtBQUFrQkMsUUFBQUEsSUFBSSxFQUFFLEtBQUtBLElBQTdCO0FBQW1DbUMsUUFBQUEsSUFBSSxFQUFFLEtBQUtsQyxRQUE5QztBQUF3REMsUUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBQXZFO0FBQWlGa0MsUUFBQUEsUUFBUSxFQUFFLEtBQUtDLE1BQWhHO0FBQXdHQyxRQUFBQSxlQUFlLEVBQUU7QUFBekgsT0FBakIsQ0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3VwcGxpZXMgfSBmcm9tIFwiLi4vbW9kZWxzL1N1cHBsaWVzXCI7XG5cbmltcG9ydCAqIGFzIG15c3FsIGZyb20gXCJteXNxbFwiO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiO1xuXG5leHBvcnQgY2xhc3MgU3VwcGxpZXNEQU9cbntcbiAgIFxuICAgIHByaXZhdGUgaG9zdDpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgcG9ydDpudW1iZXIgPSAzMzA2O1xuICAgIHByaXZhdGUgdXNlcm5hbWU6c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHBhc3N3b3JkOnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBzY2hlbWE6c3RyaW5nID0gXCJTbm93U3BvcnRzSlNcIjtcbiAgICBwcml2YXRlIHBvb2wgPSB0aGlzLmluaXREYkNvbm5lY3Rpb24oKTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBOb24tZGVmYXVsdCBjb25zdHJ1Y3Rvci5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gaG9zdCBEYXRhYmFzZSBIb3N0bmFtZVxuICAgICAqIEBwYXJhbSB1c2VybmFtZSBEYXRhYmFzZSBVc2VybmFtZVxuICAgICAqIEBwYXJhbSBwYXNzd29yZCBEYXRhYmFzZSBQYXNzd29yZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGhvc3Q6c3RyaW5nLCBwb3J0Om51bWJlciwgdXNlcm5hbWU6c3RyaW5nLCBwYXNzd29yZDpzdHJpbmcpXG4gICAge1xuICAgICAgICAvLyBTZXQgYWxsIGNsYXNzIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgIHRoaXMucG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xuICAgIH1cblxuXG4gICAgcHVibGljIGZpbmRTdXBwbGllcyhjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gTGlzdCBvZiBBcnRpc3QgdG8gcmV0dXJuXG4gICAgICAgIGxldCBzdXBwbGllczpTdXBwbGllc1tdID0gW107XG4gICAgICAgIFxuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2UsIHJ1biB0aGUgcXVlcnkgdG8gZ2V0IGFsbCB0aGUgZGlzdGluY3QgU3VwcGxpZXMsIGFuZCByZXR1cm4gdGhlIExpc3Qgb2YgU3VwcGxpZXNcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcblxuICAgICAgICAgICAgLy8gUnVuIHF1ZXJ5ICAgIFxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIEludmludG9yeSBPUkRFUiBCWSBBTU9VTlQnKTtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXG4gICAgXG4gICAgICAgICAgICAgICAgLy8gTG9vcCBvdmVyIHJlc3VsdCBzZXQgYW5kIHNhdmUgdGhlIFN1cHBsaWVzIE5hbWUgaW4gdGhlIExpc3Qgb2YgU3VwcGxpZXNcbiAgICAgICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwcGxpZXMucHVzaChuZXcgU3VwcGxpZXMocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5OYW1lLCByZXN1bHQxW3hdLkRlc2NyaXB0aW9uLCByZXN1bHQxW3hdLkFtb3VudCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHN1cHBsaWVzKTtcbiAgICAgICAgICAgIH07XG4gICAgXG4gICAgICAgIH0pO1xuICAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIGNyZWF0ZSBzb21lIHN1cHBsaWVzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBzdXBwbGllcyBBbGJ1bSB0byBpbnNlcnQuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggLTEgaWYgYW4gZXJyb3IgZWxzZSBBbGJ1bSBJRCBjcmVhdGVkLiAgXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZShzdXBwbGllczpTdXBwbGllcywgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIGluc2VydCBBbGJ1bVxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdJTlNFUlQgSU5UTyBJbnZpbnRvcnkgKElELCBOQU1FLCBERVNDUklQVElPTiwgQU1PVU5UKSBWQUxVRVMoPyw/LD8sPyknLCBbc3VwcGxpZXMuJElELCBzdXBwbGllcy4kTmFtZSwgc3VwcGxpZXMuJERlc2NyaXB0aW9uLCBzdXBwbGllcy4kQW1vdW50XSk7XG4gICAgICAgICAgICBpZihyZXN1bHQxLmFmZmVjdGVkUm93cyAhPSAxKVxuICAgICAgICAgICAgICAgY2FsbGJhY2soLTEpO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gaW5zZXJ0IGFsbCBUcmFja3MgZm9yIHRoaXMgQWxidW1cbiAgICAgICAgICAgIGxldCBzdXBwbGllc0lEID0gcmVzdWx0MS5pbnNlcnRJZDtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soc3VwcGxpZXNJRCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHVwZGF0ZSBzdXBwbGllcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc3VwcGxpZXMgQWxidW0gdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIG51bWJlciBvZiByb3dzIHVwZGF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlKHN1cHBsaWVzOlN1cHBsaWVzLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAge1xuICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuIFxuICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gXG4gICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgdXBkYXRlIEFsYnVtXG4gICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xuICAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnVVBEQVRFIEludmludG9yeSBTRVQgTkFNRT0/LCBERVNDUklQVElPTj0/LCBBTU9VTlQ9PyBXSEVSRSBJRD0/JywgW3N1cHBsaWVzLiROYW1lLCBzdXBwbGllcy4kRGVzY3JpcHRpb24sIHN1cHBsaWVzLiRBbW91bnQsIHN1cHBsaWVzLiRJRF0pO1xuICAgICAgICAgICAgaWYocmVzdWx0MS5jaGFuZ2VkUm93cyAhPSAwKVxuICAgICAgICAgICAgICAgICsrY2hhbmdlczsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIFxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBkZWxldGUgYW4gQWxidW0uXG4gICAgICogXG4gICAgICogQHBhcmFtIHN1cHBsaWVzIEFsYnVtIElEIHRvIGRlbGV0ZS5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBudW1iZXIgb2Ygcm93cyBkZWxldGVkLiAgXG4gICAgICogKi9cbiAgICBwdWJsaWMgZGVsZXRlKHN1cHBsaWVzSWQ6bnVtYmVyLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZGVsZXRlIHRoZSB0cmFja3MgZm9yIGFuIEFsYnVtXG4gICAgICAgICAgICBsZXQgY2hhbmdlcyA9IDA7XG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0RFTEVURSBGUk9NIEludmludG9yeSBXSEVSRSBJRD0/JywgW3N1cHBsaWVzSWRdKTtcbiAgICAgICAgICAgIGNoYW5nZXMgPSBjaGFuZ2VzICsgcmVzdWx0MS5hZmZlY3RlZFJvd3M7XG5cblxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAvLyogKioqKioqKioqKioqKioqKiBQcml2YXRlIEhlbHBlciBNZXRob2RzICoqKioqKioqKioqKioqKiogKi9cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIFByaXZhdGUgaGVscGVyIG1ldGhvZCB0byBpbml0aWFsaWUgYSBEYXRhYmFzZSBDb25uZWN0aW9uXG4gICAgLy8gICovXG4gICAgcHJpdmF0ZSBpbml0RGJDb25uZWN0aW9uKCk6YW55XG4gICAge1xuICAgICAgICByZXR1cm4gbXlzcWwuY3JlYXRlUG9vbCh7aG9zdDogdGhpcy5ob3N0LCBwb3J0OiB0aGlzLnBvcnQsIHVzZXI6IHRoaXMudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLCBkYXRhYmFzZTogdGhpcy5zY2hlbWEsIGNvbm5lY3Rpb25MaW1pdDogMTB9KTtcbiAgICB9XG59XG4iXX0=