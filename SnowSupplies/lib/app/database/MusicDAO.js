"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MusicDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Artist = require("../models/Artist");

var _Album = require("../models/Album");

var _Track = require("../models/Track");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MusicDAO = /*#__PURE__*/function () {
  /**
   * Non-default constructor.
   * 
   * @param host Database Hostname
   * @param username Database Username
   * @param password Database Password
   */
  function MusicDAO(host, port, username, password) {
    (0, _classCallCheck2.default)(this, MusicDAO);
    (0, _defineProperty2.default)(this, "host", "");
    (0, _defineProperty2.default)(this, "port", 3306);
    (0, _defineProperty2.default)(this, "username", "");
    (0, _defineProperty2.default)(this, "password", "");
    (0, _defineProperty2.default)(this, "schema", "MUSIC");
    (0, _defineProperty2.default)(this, "pool", this.initDbConnection());
    // Set all class properties
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.pool = this.initDbConnection();
  }
  /**
    * CRUD method to return all Artists.
    * 
    * @param callback Callback function with an Array of type Artist.
    */


  (0, _createClass2.default)(MusicDAO, [{
    key: "findArtists",
    value: function findArtists(callback) {
      // List of Artist to return
      var artists = []; // Get a pooled connection to the database, run the query to get all the distinct Artists, and return the List of Artists

      this.pool.getConnection(function (err, connection) {
        // Throw error if an error
        if (err) throw err; // Run query    

        connection.query('SELECT distinct ARTIST FROM ALBUM', function (err, rows, fields) {
          // Release connection in the pool
          connection.release(); // Throw error if an error

          if (err) throw err; // Loop over result set and save the Artist Name in the List of Artists

          for (var x = 0; x < rows.length; ++x) {
            artists.push(new _Artist.Artist(x, rows[x].ARTIST));
          } // Do a callback to return the results


          callback(artists);
        });
      });
    }
    /**
    * CRUD method to return all Albums for an artist.
    * 
    * @param artist Name of the Artist to retrieve Albums for.
    * @param callback Callback function with an Array of type Album.
    */

  }, {
    key: "findAlbums",
    value: function findAlbums(artist, callback) {
      // List of Albums to return
      var albums = []; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(err, connection) {
          var result1, x, albumId, tracks, result2, y;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get all Albums for specific Artist
                  connection.query = util.promisify(connection.query);
                  _context.next = 6;
                  return connection.query('SELECT * FROM ALBUM WHERE ARTIST=? ORDER BY YEAR, TITLE', [artist]);

                case 6:
                  result1 = _context.sent;
                  x = 0;

                case 8:
                  if (!(x < result1.length)) {
                    _context.next = 19;
                    break;
                  }

                  // Use Promisfy Util to make an async function and run query to get all Tracks for this Album
                  albumId = result1[x].ID;
                  tracks = [];
                  _context.next = 13;
                  return connection.query('SELECT * FROM TRACK WHERE ALBUM_ID=?', [albumId]);

                case 13:
                  result2 = _context.sent;

                  for (y = 0; y < result2.length; ++y) {
                    tracks.push(new _Track.Track(result2[y].ID, result2[y].NUMBER, result2[y].TITLE, result2[y].LYRICS, result2[y].VIDEO_URL));
                  } // Add Album and its Tracks to the list


                  albums.push(new _Album.Album(result1[x].ID, result1[x].TITLE, result1[x].ARTIST, result1[x].DESCRIPTION, result1[x].YEAR, result1[x].IMAGE_NAME, tracks));

                case 16:
                  ++x;
                  _context.next = 8;
                  break;

                case 19:
                  // Do a callback to return the results
                  callback(albums);

                case 20:
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
     * CRUD method to return all Albums.
     * 
     * @param callback Callback function with an Array of type Album.
     */

  }, {
    key: "findAllAlbums",
    value: function findAllAlbums(callback) {
      // List of Albums to return
      var albums = []; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(err, connection) {
          var result1, x, albumId, tracks, result2, y;
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
                  // Use Promisfy Util to make an async function and run query to get all Albums
                  connection.query = util.promisify(connection.query);
                  _context2.next = 6;
                  return connection.query('SELECT * FROM ALBUM ORDER BY YEAR, TITLE');

                case 6:
                  result1 = _context2.sent;
                  x = 0;

                case 8:
                  if (!(x < result1.length)) {
                    _context2.next = 19;
                    break;
                  }

                  // Use Promisfy Util to make an async function and run query to get all Tracks for this Album
                  albumId = result1[x].ID;
                  tracks = [];
                  _context2.next = 13;
                  return connection.query('SELECT * FROM TRACK WHERE ALBUM_ID=?', [albumId]);

                case 13:
                  result2 = _context2.sent;

                  for (y = 0; y < result2.length; ++y) {
                    tracks.push(new _Track.Track(result2[y].ID, result2[y].NUMBER, result2[y].TITLE, result2[y].LYRICS, result2[y].VIDEO_URL));
                  } // Add Album and its Tracks to the list


                  albums.push(new _Album.Album(result1[x].ID, result1[x].TITLE, result1[x].ARTIST, result1[x].DESCRIPTION, result1[x].YEAR, result1[x].IMAGE_NAME, tracks));

                case 16:
                  ++x;
                  _context2.next = 8;
                  break;

                case 19:
                  // Do a callback to return the results
                  callback(albums);

                case 20:
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
     * CRUD method to searches for all Albums by a wildard search in Artist.
     * 
     * @param search wildcard Artist to search Albums for.
     * @param callback Callback function with an Array of type Album.
     */

  }, {
    key: "findAlbumsByArtist",
    value: function findAlbumsByArtist(search, callback) {
      // List of Albums to return
      var albums = []; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(err, connection) {
          var result1, x, albumId, tracks, result2, y;
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
                  // Use Promisfy Util to make an async function and run query to get all Albums for search partial Artist
                  connection.query = util.promisify(connection.query);
                  _context3.next = 6;
                  return connection.query("SELECT * FROM ALBUM WHERE ARTIST LIKE ? ORDER BY YEAR, TITLE", ['%' + search + '%']);

                case 6:
                  result1 = _context3.sent;
                  x = 0;

                case 8:
                  if (!(x < result1.length)) {
                    _context3.next = 19;
                    break;
                  }

                  // Use Promisfy Util to make an async function and run query to get all Tracks for this Album
                  albumId = result1[x].ID;
                  tracks = [];
                  _context3.next = 13;
                  return connection.query('SELECT * FROM TRACK WHERE ALBUM_ID=?', [albumId]);

                case 13:
                  result2 = _context3.sent;

                  for (y = 0; y < result2.length; ++y) {
                    tracks.push(new _Track.Track(result2[y].ID, result2[y].NUMBER, result2[y].TITLE, result2[y].LYRICS, result2[y].VIDEO_URL));
                  } // Add Album and its Tracks to the list


                  albums.push(new _Album.Album(result1[x].ID, result1[x].TITLE, result1[x].ARTIST, result1[x].DESCRIPTION, result1[x].YEAR, result1[x].IMAGE_NAME, tracks));

                case 16:
                  ++x;
                  _context3.next = 8;
                  break;

                case 19:
                  // Do a callback to return the results
                  callback(albums);

                case 20:
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
    * CRUD method to searches for all Albums by a wildcard serach in Description.
    * 
    * @param search wildcard Description to search Albums for.
    * @param callback Callback function with an Array of type Album.
    */

  }, {
    key: "findAlbumsByDescription",
    value: function findAlbumsByDescription(search, callback) {
      // List of Albums to return
      var albums = []; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
          var result1, x, albumId, tracks, result2, y;
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
                  // Use Promisfy Util to make an async function and run query to get all Albums for search partial Artist
                  connection.query = util.promisify(connection.query);
                  _context4.next = 6;
                  return connection.query("SELECT * FROM ALBUM WHERE DESCRIPTION LIKE ? ORDER BY YEAR, TITLE", ['%' + search + '%']);

                case 6:
                  result1 = _context4.sent;
                  x = 0;

                case 8:
                  if (!(x < result1.length)) {
                    _context4.next = 19;
                    break;
                  }

                  // Use Promisfy Util to make an async function and run query to get all Tracks for this Album
                  albumId = result1[x].ID;
                  tracks = [];
                  _context4.next = 13;
                  return connection.query('SELECT * FROM TRACK WHERE ALBUM_ID=?', [albumId]);

                case 13:
                  result2 = _context4.sent;

                  for (y = 0; y < result2.length; ++y) {
                    tracks.push(new _Track.Track(result2[y].ID, result2[y].NUMBER, result2[y].TITLE, result2[y].LYRICS, result2[y].VIDEO_URL));
                  } // Add Album and its Tracks to the list


                  albums.push(new _Album.Album(result1[x].ID, result1[x].TITLE, result1[x].ARTIST, result1[x].DESCRIPTION, result1[x].YEAR, result1[x].IMAGE_NAME, tracks));

                case 16:
                  ++x;
                  _context4.next = 8;
                  break;

                case 19:
                  // Do a callback to return the results
                  callback(albums);

                case 20:
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
    }
    /**
     * CRUD method to return an Album.
     * 
     * @param albumId Album ID to retrieve Album for.
     * @param callback Callback function with an Array of type Album.
     */

  }, {
    key: "findAlbum",
    value: function findAlbum(albumId, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(err, connection) {
          var result1, tracks, result2, y, album;
          return _regenerator.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context5.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get all Albums for specific Artist
                  connection.query = util.promisify(connection.query);
                  _context5.next = 6;
                  return connection.query('SELECT * FROM ALBUM WHERE ID=?', [albumId]);

                case 6:
                  result1 = _context5.sent;
                  if (result1.length != 1) callback(null); // Use Promisfy Util to make an async function and run query to get all Tracks for this Album

                  tracks = [];
                  _context5.next = 11;
                  return connection.query('SELECT * FROM TRACK WHERE ALBUM_ID=?', [albumId]);

                case 11:
                  result2 = _context5.sent;

                  for (y = 0; y < result2.length; ++y) {
                    tracks.push(new _Track.Track(result2[y].ID, result2[y].NUMBER, result2[y].TITLE, result2[y].LYRICS, result2[y].VIDEO_URL));
                  } // Create an Album and its Tracks for return


                  album = new _Album.Album(result1[0].ID, result1[0].TITLE, result1[0].ARTIST, result1[0].DESCRIPTION, result1[0].YEAR, result1[0].IMAGE_NAME, tracks); // Do a callback to return the results

                  callback(album);

                case 15:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
    /**
     * CRUD method to create an Album.
     * 
     * @param album Album to insert.
     * @param callback Callback function with -1 if an error else Album ID created.  
     */

  }, {
    key: "create",
    value: function create(album, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(err, connection) {
          var result1, albumId, y, result2;
          return _regenerator.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context6.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and insert Album
                  connection.query = util.promisify(connection.query);
                  _context6.next = 6;
                  return connection.query('INSERT INTO ALBUM (TITLE, ARTIST, DESCRIPTION, YEAR, IMAGE_NAME) VALUES(?,?,?,?,?)', [album.Title, album.Artist, album.Description, album.Year, album.Image]);

                case 6:
                  result1 = _context6.sent;
                  if (result1.affectedRows != 1) callback(-1); // Use Promisfy Util to make an async function and run query to insert all Tracks for this Album

                  albumId = result1.insertId;
                  y = 0;

                case 10:
                  if (!(y < album.Tracks.length)) {
                    _context6.next = 17;
                    break;
                  }

                  _context6.next = 13;
                  return connection.query('INSERT INTO TRACK (ALBUM_ID, TITLE, NUMBER, VIDEO_URL) VALUES(?,?,?,?)', [albumId, album.Tracks[y].Title, album.Tracks[y].Number, album.Tracks[y].Video]);

                case 13:
                  result2 = _context6.sent;

                case 14:
                  ++y;
                  _context6.next = 10;
                  break;

                case 17:
                  // Do a callback to return the results
                  callback(albumId);

                case 18:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
    /**
     * CRUD method to update an Album.
     * 
     * @param album Album to update.
     * @param callback Callback function with number of rows updated.  
     */

  }, {
    key: "update",
    value: function update(album, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(err, connection) {
          var changes, result1, y, result2;
          return _regenerator.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context7.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and update Album
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context7.next = 7;
                  return connection.query('UPDATE ALBUM SET TITLE=?, ARTIST=?, DESCRIPTION=?, YEAR=?, IMAGE_NAME=? WHERE ID=?', [album.Title, album.Artist, album.Description, album.Year, album.Image, album.Id]);

                case 7:
                  result1 = _context7.sent;
                  if (result1.changedRows != 0) ++changes; // Use Promisfy Util to make an async function and run query to update all Tracks for this Album

                  y = 0;

                case 10:
                  if (!(y < album.Tracks.length)) {
                    _context7.next = 18;
                    break;
                  }

                  _context7.next = 13;
                  return connection.query('UPDATE TRACK SET TITLE=?, NUMBER=?, VIDEO_URL=? WHERE ID=? AND ALBUM_ID=?', [album.Tracks[y].Title, album.Tracks[y].Number, album.Tracks[y].Video, album.Tracks[y].Id, album.Id]);

                case 13:
                  result2 = _context7.sent;
                  if (result2.changedRows != 0) ++changes;

                case 15:
                  ++y;
                  _context7.next = 10;
                  break;

                case 18:
                  // Do a callback to return the results
                  callback(changes);

                case 19:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        }));

        return function (_x13, _x14) {
          return _ref7.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to delete an Album.
    * 
    * @param album Album ID to delete.
    * @param callback Callback function with number of rows deleted.  
    * */

  }, {
    key: "delete",
    value: function _delete(albumId, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(err, connection) {
          var changes, result1, result2;
          return _regenerator.default.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context8.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to delete the tracks for an Album
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context8.next = 7;
                  return connection.query('DELETE FROM TRACK WHERE ALBUM_ID=?', [albumId]);

                case 7:
                  result1 = _context8.sent;
                  changes = changes + result1.affectedRows; // Use Promisfy Util to make an async function and run query to delete the Album

                  _context8.next = 11;
                  return connection.query('DELETE FROM ALBUM WHERE ID=?', [albumId]);

                case 11:
                  result2 = _context8.sent;
                  changes = changes + result2.affectedRows; // Do a callback to return the results

                  callback(changes);

                case 14:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8);
        }));

        return function (_x15, _x16) {
          return _ref8.apply(this, arguments);
        };
      }());
    } //* **************** Private Helper Methods **************** */

    /**
     * Private helper method to initialie a Database Connection
     */

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
  return MusicDAO;
}();

exports.MusicDAO = MusicDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9NdXNpY0RBTy50cyJdLCJuYW1lcyI6WyJNdXNpY0RBTyIsImhvc3QiLCJwb3J0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluaXREYkNvbm5lY3Rpb24iLCJwb29sIiwiY2FsbGJhY2siLCJhcnRpc3RzIiwiZ2V0Q29ubmVjdGlvbiIsImVyciIsImNvbm5lY3Rpb24iLCJxdWVyeSIsInJvd3MiLCJmaWVsZHMiLCJyZWxlYXNlIiwieCIsImxlbmd0aCIsInB1c2giLCJBcnRpc3QiLCJBUlRJU1QiLCJhcnRpc3QiLCJhbGJ1bXMiLCJ1dGlsIiwicHJvbWlzaWZ5IiwicmVzdWx0MSIsImFsYnVtSWQiLCJJRCIsInRyYWNrcyIsInJlc3VsdDIiLCJ5IiwiVHJhY2siLCJOVU1CRVIiLCJUSVRMRSIsIkxZUklDUyIsIlZJREVPX1VSTCIsIkFsYnVtIiwiREVTQ1JJUFRJT04iLCJZRUFSIiwiSU1BR0VfTkFNRSIsInNlYXJjaCIsImFsYnVtIiwiVGl0bGUiLCJEZXNjcmlwdGlvbiIsIlllYXIiLCJJbWFnZSIsImFmZmVjdGVkUm93cyIsImluc2VydElkIiwiVHJhY2tzIiwiTnVtYmVyIiwiVmlkZW8iLCJjaGFuZ2VzIiwiSWQiLCJjaGFuZ2VkUm93cyIsIm15c3FsIiwiY3JlYXRlUG9vbCIsInVzZXIiLCJkYXRhYmFzZSIsInNjaGVtYSIsImNvbm5lY3Rpb25MaW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztJQUVhQSxRO0FBU1Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSSxvQkFBWUMsSUFBWixFQUF5QkMsSUFBekIsRUFBc0NDLFFBQXRDLEVBQXVEQyxRQUF2RCxFQUNBO0FBQUE7QUFBQSxnREFmc0IsRUFldEI7QUFBQSxnREFkc0IsSUFjdEI7QUFBQSxvREFiMEIsRUFhMUI7QUFBQSxvREFaMEIsRUFZMUI7QUFBQSxr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QjtBQVlwQjBCLGtCQUFBQSxPQUFPLEdBQUdBLE9BQU8sR0FBRzFCLE9BQU8sQ0FBQ3FCLFlBQTVCLENBWm9CLENBY3BCOztBQWRvQjtBQUFBLHlCQWVBbkMsVUFBVSxDQUFDQyxLQUFYLENBQWlCLDhCQUFqQixFQUFpRCxDQUFDYyxPQUFELENBQWpELENBZkE7O0FBQUE7QUFlaEJHLGtCQUFBQSxPQWZnQjtBQWdCcEJzQixrQkFBQUEsT0FBTyxHQUFHQSxPQUFPLEdBQUd0QixPQUFPLENBQUNpQixZQUE1QixDQWhCb0IsQ0FrQnBCOztBQUNBdkMsa0JBQUFBLFFBQVEsQ0FBQzRDLE9BQUQsQ0FBUjs7QUFuQm9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBcUJILEssQ0FFRDs7QUFFQTtBQUNKO0FBQ0E7Ozs7V0FDSSw0QkFDQTtBQUNJLGFBQU9HLEtBQUssQ0FBQ0MsVUFBTixDQUFpQjtBQUFDdEQsUUFBQUEsSUFBSSxFQUFFLEtBQUtBLElBQVo7QUFBa0JDLFFBQUFBLElBQUksRUFBRSxLQUFLQSxJQUE3QjtBQUFtQ3NELFFBQUFBLElBQUksRUFBRSxLQUFLckQsUUFBOUM7QUFBd0RDLFFBQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUF2RTtBQUFpRnFELFFBQUFBLFFBQVEsRUFBRSxLQUFLQyxNQUFoRztBQUF3R0MsUUFBQUEsZUFBZSxFQUFFO0FBQXpILE9BQWpCLENBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFydGlzdCB9IGZyb20gXCIuLi9tb2RlbHMvQXJ0aXN0XCI7XG5pbXBvcnQgeyBBbGJ1bSB9IGZyb20gXCIuLi9tb2RlbHMvQWxidW1cIjtcbmltcG9ydCB7IFRyYWNrIH0gZnJvbSBcIi4uL21vZGVscy9UcmFja1wiO1xuaW1wb3J0ICogYXMgbXlzcWwgZnJvbSBcIm15c3FsXCI7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XG5cbmV4cG9ydCBjbGFzcyBNdXNpY0RBT1xue1xuICAgIHByaXZhdGUgaG9zdDpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgcG9ydDpudW1iZXIgPSAzMzA2O1xuICAgIHByaXZhdGUgdXNlcm5hbWU6c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHBhc3N3b3JkOnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBzY2hlbWE6c3RyaW5nID0gXCJNVVNJQ1wiO1xuICAgIHByaXZhdGUgcG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xuICAgIFxuICAgIC8qKlxuICAgICAqIE5vbi1kZWZhdWx0IGNvbnN0cnVjdG9yLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBob3N0IERhdGFiYXNlIEhvc3RuYW1lXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIERhdGFiYXNlIFVzZXJuYW1lXG4gICAgICogQHBhcmFtIHBhc3N3b3JkIERhdGFiYXNlIFBhc3N3b3JkXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaG9zdDpzdHJpbmcsIHBvcnQ6bnVtYmVyLCB1c2VybmFtZTpzdHJpbmcsIHBhc3N3b3JkOnN0cmluZylcbiAgICB7XG4gICAgICAgIC8vIFNldCBhbGwgY2xhc3MgcHJvcGVydGllc1xuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgICAgICB0aGlzLnBvcnQgPSBwb3J0O1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgICAgICAgdGhpcy5wb29sID0gdGhpcy5pbml0RGJDb25uZWN0aW9uKCk7XG4gICAgfVxuXG4gICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byByZXR1cm4gYWxsIEFydGlzdHMuXG4gICAgICogXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gQXJyYXkgb2YgdHlwZSBBcnRpc3QuXG4gICAgICovXG4gICAgcHVibGljIGZpbmRBcnRpc3RzKGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBMaXN0IG9mIEFydGlzdCB0byByZXR1cm5cbiAgICAgICAgbGV0IGFydGlzdHM6QXJ0aXN0W10gPSBbXTtcbiAgICAgICAgXG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZSwgcnVuIHRoZSBxdWVyeSB0byBnZXQgYWxsIHRoZSBkaXN0aW5jdCBBcnRpc3RzLCBhbmQgcmV0dXJuIHRoZSBMaXN0IG9mIEFydGlzdHNcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcblxuICAgICAgICAgICAgLy8gUnVuIHF1ZXJ5ICAgIFxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUIGRpc3RpbmN0IEFSVElTVCBGUk9NIEFMQlVNJywgZnVuY3Rpb24gKGVycjphbnksIHJvd3M6YW55LCBmaWVsZHM6YW55KSBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXG4gICAgXG4gICAgICAgICAgICAgICAgLy8gTG9vcCBvdmVyIHJlc3VsdCBzZXQgYW5kIHNhdmUgdGhlIEFydGlzdCBOYW1lIGluIHRoZSBMaXN0IG9mIEFydGlzdHNcbiAgICAgICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcm93cy5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYXJ0aXN0cy5wdXNoKG5ldyBBcnRpc3QoeCwgcm93c1t4XS5BUlRJU1QpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhhcnRpc3RzKTtcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHJldHVybiBhbGwgQWxidW1zIGZvciBhbiBhcnRpc3QuXG4gICAgICogXG4gICAgICogQHBhcmFtIGFydGlzdCBOYW1lIG9mIHRoZSBBcnRpc3QgdG8gcmV0cmlldmUgQWxidW1zIGZvci5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBBcnJheSBvZiB0eXBlIEFsYnVtLlxuICAgICAqL1xuICAgIHB1YmxpYyBmaW5kQWxidW1zKGFydGlzdDpzdHJpbmcsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAgLy8gTGlzdCBvZiBBbGJ1bXMgdG8gcmV0dXJuXG4gICAgICAgICBsZXQgYWxidW1zOkFsYnVtW10gPSBbXTtcblxuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBBbGJ1bXMgZm9yIHNwZWNpZmljIEFydGlzdFxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIEFMQlVNIFdIRVJFIEFSVElTVD0/IE9SREVSIEJZIFlFQVIsIFRJVExFJywgW2FydGlzdF0pO1xuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgVHJhY2tzIGZvciB0aGlzIEFsYnVtXG4gICAgICAgICAgICAgICAgbGV0IGFsYnVtSWQgPSByZXN1bHQxW3hdLklEO1xuICAgICAgICAgICAgICAgIGxldCB0cmFja3M6VHJhY2tbXSA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBUUkFDSyBXSEVSRSBBTEJVTV9JRD0/JywgW2FsYnVtSWRdKTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IHk9MDt5IDwgcmVzdWx0Mi5sZW5ndGg7Kyt5KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tzLnB1c2gobmV3IFRyYWNrKHJlc3VsdDJbeV0uSUQsIHJlc3VsdDJbeV0uTlVNQkVSLCByZXN1bHQyW3ldLlRJVExFLCByZXN1bHQyW3ldLkxZUklDUywgcmVzdWx0Mlt5XS5WSURFT19VUkwpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgQWxidW0gYW5kIGl0cyBUcmFja3MgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICBhbGJ1bXMucHVzaChuZXcgQWxidW0ocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5USVRMRSwgcmVzdWx0MVt4XS5BUlRJU1QsIHJlc3VsdDFbeF0uREVTQ1JJUFRJT04sIHJlc3VsdDFbeF0uWUVBUiwgcmVzdWx0MVt4XS5JTUFHRV9OQU1FLCB0cmFja3MpKTsgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhhbGJ1bXMpO1xuICAgICAgICAgfSk7XG4gICAgfSAgICAgICAgICAgIFxuXG4gICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gcmV0dXJuIGFsbCBBbGJ1bXMuXG4gICAgICogXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gQXJyYXkgb2YgdHlwZSBBbGJ1bS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZEFsbEFsYnVtcyhjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgIC8vIExpc3Qgb2YgQWxidW1zIHRvIHJldHVyblxuICAgICAgICAgbGV0IGFsYnVtczpBbGJ1bVtdID0gW107XG5cbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgQWxidW1zXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gQUxCVU0gT1JERVIgQlkgWUVBUiwgVElUTEUnKTtcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFRyYWNrcyBmb3IgdGhpcyBBbGJ1bVxuICAgICAgICAgICAgICAgIGxldCBhbGJ1bUlkID0gcmVzdWx0MVt4XS5JRDtcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2tzOlRyYWNrW10gPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gVFJBQ0sgV0hFUkUgQUxCVU1fSUQ9PycsIFthbGJ1bUlkXSk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCB5PTA7eSA8IHJlc3VsdDIubGVuZ3RoOysreSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNrcy5wdXNoKG5ldyBUcmFjayhyZXN1bHQyW3ldLklELCByZXN1bHQyW3ldLk5VTUJFUiwgcmVzdWx0Mlt5XS5USVRMRSwgcmVzdWx0Mlt5XS5MWVJJQ1MsIHJlc3VsdDJbeV0uVklERU9fVVJMKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQWRkIEFsYnVtIGFuZCBpdHMgVHJhY2tzIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgYWxidW1zLnB1c2gobmV3IEFsYnVtKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uVElUTEUsIHJlc3VsdDFbeF0uQVJUSVNULCByZXN1bHQxW3hdLkRFU0NSSVBUSU9OLCByZXN1bHQxW3hdLllFQVIsIHJlc3VsdDFbeF0uSU1BR0VfTkFNRSwgdHJhY2tzKSk7IFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soYWxidW1zKTtcbiAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHNlYXJjaGVzIGZvciBhbGwgQWxidW1zIGJ5IGEgd2lsZGFyZCBzZWFyY2ggaW4gQXJ0aXN0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBzZWFyY2ggd2lsZGNhcmQgQXJ0aXN0IHRvIHNlYXJjaCBBbGJ1bXMgZm9yLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgQWxidW0uXG4gICAgICovXG4gICAgcHVibGljIGZpbmRBbGJ1bXNCeUFydGlzdChzZWFyY2g6c3RyaW5nLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgIC8vIExpc3Qgb2YgQWxidW1zIHRvIHJldHVyblxuICAgICAgICAgbGV0IGFsYnVtczpBbGJ1bVtdID0gW107XG5cbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgQWxidW1zIGZvciBzZWFyY2ggcGFydGlhbCBBcnRpc3RcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gQUxCVU0gV0hFUkUgQVJUSVNUIExJS0UgPyBPUkRFUiBCWSBZRUFSLCBUSVRMRVwiLCBbJyUnICsgc2VhcmNoICsgJyUnXSk7XG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBUcmFja3MgZm9yIHRoaXMgQWxidW1cbiAgICAgICAgICAgICAgICBsZXQgYWxidW1JZCA9IHJlc3VsdDFbeF0uSUQ7XG4gICAgICAgICAgICAgICAgbGV0IHRyYWNrczpUcmFja1tdID0gW107XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDIgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIFRSQUNLIFdIRVJFIEFMQlVNX0lEPT8nLCBbYWxidW1JZF0pO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgeT0wO3kgPCByZXN1bHQyLmxlbmd0aDsrK3kpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0cmFja3MucHVzaChuZXcgVHJhY2socmVzdWx0Mlt5XS5JRCwgcmVzdWx0Mlt5XS5OVU1CRVIsIHJlc3VsdDJbeV0uVElUTEUsIHJlc3VsdDJbeV0uTFlSSUNTLCByZXN1bHQyW3ldLlZJREVPX1VSTCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEFkZCBBbGJ1bSBhbmQgaXRzIFRyYWNrcyB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgIGFsYnVtcy5wdXNoKG5ldyBBbGJ1bShyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLlRJVExFLCByZXN1bHQxW3hdLkFSVElTVCwgcmVzdWx0MVt4XS5ERVNDUklQVElPTiwgcmVzdWx0MVt4XS5ZRUFSLCByZXN1bHQxW3hdLklNQUdFX05BTUUsIHRyYWNrcykpOyBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGFsYnVtcyk7XG4gICAgICAgICB9KTtcbiAgICB9ICAgICAgICAgICAgXG5cbiAgICAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gc2VhcmNoZXMgZm9yIGFsbCBBbGJ1bXMgYnkgYSB3aWxkY2FyZCBzZXJhY2ggaW4gRGVzY3JpcHRpb24uXG4gICAgICogXG4gICAgICogQHBhcmFtIHNlYXJjaCB3aWxkY2FyZCBEZXNjcmlwdGlvbiB0byBzZWFyY2ggQWxidW1zIGZvci5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBBcnJheSBvZiB0eXBlIEFsYnVtLlxuICAgICAqL1xuICAgIHB1YmxpYyBmaW5kQWxidW1zQnlEZXNjcmlwdGlvbihzZWFyY2g6c3RyaW5nLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgIC8vIExpc3Qgb2YgQWxidW1zIHRvIHJldHVyblxuICAgICAgICAgbGV0IGFsYnVtczpBbGJ1bVtdID0gW107XG5cbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgQWxidW1zIGZvciBzZWFyY2ggcGFydGlhbCBBcnRpc3RcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gQUxCVU0gV0hFUkUgREVTQ1JJUFRJT04gTElLRSA/IE9SREVSIEJZIFlFQVIsIFRJVExFXCIsIFsnJScgKyBzZWFyY2ggKyAnJSddKTtcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFRyYWNrcyBmb3IgdGhpcyBBbGJ1bVxuICAgICAgICAgICAgICAgIGxldCBhbGJ1bUlkID0gcmVzdWx0MVt4XS5JRDtcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2tzOlRyYWNrW10gPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gVFJBQ0sgV0hFUkUgQUxCVU1fSUQ9PycsIFthbGJ1bUlkXSk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCB5PTA7eSA8IHJlc3VsdDIubGVuZ3RoOysreSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNrcy5wdXNoKG5ldyBUcmFjayhyZXN1bHQyW3ldLklELCByZXN1bHQyW3ldLk5VTUJFUiwgcmVzdWx0Mlt5XS5USVRMRSwgcmVzdWx0Mlt5XS5MWVJJQ1MsIHJlc3VsdDJbeV0uVklERU9fVVJMKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQWRkIEFsYnVtIGFuZCBpdHMgVHJhY2tzIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgYWxidW1zLnB1c2gobmV3IEFsYnVtKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uVElUTEUsIHJlc3VsdDFbeF0uQVJUSVNULCByZXN1bHQxW3hdLkRFU0NSSVBUSU9OLCByZXN1bHQxW3hdLllFQVIsIHJlc3VsdDFbeF0uSU1BR0VfTkFNRSwgdHJhY2tzKSk7IFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soYWxidW1zKTtcbiAgICAgICAgIH0pO1xuICAgIH0gICAgICAgICAgICBcblxuICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHJldHVybiBhbiBBbGJ1bS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gYWxidW1JZCBBbGJ1bSBJRCB0byByZXRyaWV2ZSBBbGJ1bSBmb3IuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gQXJyYXkgb2YgdHlwZSBBbGJ1bS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZEFsYnVtKGFsYnVtSWQ6bnVtYmVyLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgQWxidW1zIGZvciBzcGVjaWZpYyBBcnRpc3RcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBBTEJVTSBXSEVSRSBJRD0/JywgW2FsYnVtSWRdKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdDEubGVuZ3RoICE9IDEpXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFRyYWNrcyBmb3IgdGhpcyBBbGJ1bVxuICAgICAgICAgICAgbGV0IHRyYWNrczpUcmFja1tdID0gW107XG4gICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gVFJBQ0sgV0hFUkUgQUxCVU1fSUQ9PycsIFthbGJ1bUlkXSk7XG4gICAgICAgICAgICBmb3IobGV0IHk9MDt5IDwgcmVzdWx0Mi5sZW5ndGg7Kyt5KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRyYWNrcy5wdXNoKG5ldyBUcmFjayhyZXN1bHQyW3ldLklELCByZXN1bHQyW3ldLk5VTUJFUiwgcmVzdWx0Mlt5XS5USVRMRSwgcmVzdWx0Mlt5XS5MWVJJQ1MsIHJlc3VsdDJbeV0uVklERU9fVVJMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbiBBbGJ1bSBhbmQgaXRzIFRyYWNrcyBmb3IgcmV0dXJuXG4gICAgICAgICAgICBsZXQgYWxidW0gPSBuZXcgQWxidW0ocmVzdWx0MVswXS5JRCwgcmVzdWx0MVswXS5USVRMRSwgcmVzdWx0MVswXS5BUlRJU1QsIHJlc3VsdDFbMF0uREVTQ1JJUFRJT04sIHJlc3VsdDFbMF0uWUVBUiwgcmVzdWx0MVswXS5JTUFHRV9OQU1FLCB0cmFja3MpOyBcblxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGFsYnVtKTtcbiAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIGNyZWF0ZSBhbiBBbGJ1bS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gYWxidW0gQWxidW0gdG8gaW5zZXJ0LlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIC0xIGlmIGFuIGVycm9yIGVsc2UgQWxidW0gSUQgY3JlYXRlZC4gIFxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGUoYWxidW06QWxidW0sIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBpbnNlcnQgQWxidW1cbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnSU5TRVJUIElOVE8gQUxCVU0gKFRJVExFLCBBUlRJU1QsIERFU0NSSVBUSU9OLCBZRUFSLCBJTUFHRV9OQU1FKSBWQUxVRVMoPyw/LD8sPyw/KScsIFthbGJ1bS5UaXRsZSwgYWxidW0uQXJ0aXN0LCBhbGJ1bS5EZXNjcmlwdGlvbiwgYWxidW0uWWVhciwgYWxidW0uSW1hZ2VdKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuYWZmZWN0ZWRSb3dzICE9IDEpXG4gICAgICAgICAgICAgICBjYWxsYmFjaygtMSk7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBpbnNlcnQgYWxsIFRyYWNrcyBmb3IgdGhpcyBBbGJ1bVxuICAgICAgICAgICAgbGV0IGFsYnVtSWQgPSByZXN1bHQxLmluc2VydElkO1xuICAgICAgICAgICAgZm9yKGxldCB5PTA7eSA8IGFsYnVtLlRyYWNrcy5sZW5ndGg7Kyt5KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnSU5TRVJUIElOVE8gVFJBQ0sgKEFMQlVNX0lELCBUSVRMRSwgTlVNQkVSLCBWSURFT19VUkwpIFZBTFVFUyg/LD8sPyw/KScsIFthbGJ1bUlkLCBhbGJ1bS5UcmFja3NbeV0uVGl0bGUsIGFsYnVtLlRyYWNrc1t5XS5OdW1iZXIsIGFsYnVtLlRyYWNrc1t5XS5WaWRlb10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soYWxidW1JZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHVwZGF0ZSBhbiBBbGJ1bS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gYWxidW0gQWxidW0gdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIG51bWJlciBvZiByb3dzIHVwZGF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlKGFsYnVtOkFsYnVtLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAge1xuICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuIFxuICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gXG4gICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgdXBkYXRlIEFsYnVtXG4gICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xuICAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnVVBEQVRFIEFMQlVNIFNFVCBUSVRMRT0/LCBBUlRJU1Q9PywgREVTQ1JJUFRJT049PywgWUVBUj0/LCBJTUFHRV9OQU1FPT8gV0hFUkUgSUQ9PycsIFthbGJ1bS5UaXRsZSwgYWxidW0uQXJ0aXN0LCBhbGJ1bS5EZXNjcmlwdGlvbiwgYWxidW0uWWVhciwgYWxidW0uSW1hZ2UsIGFsYnVtLklkXSk7XG4gICAgICAgICAgICBpZihyZXN1bHQxLmNoYW5nZWRSb3dzICE9IDApXG4gICAgICAgICAgICAgICAgKytjaGFuZ2VzO1xuXG4gICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIHVwZGF0ZSBhbGwgVHJhY2tzIGZvciB0aGlzIEFsYnVtXG4gICAgICAgICAgICAgZm9yKGxldCB5PTA7eSA8IGFsYnVtLlRyYWNrcy5sZW5ndGg7Kyt5KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1VQREFURSBUUkFDSyBTRVQgVElUTEU9PywgTlVNQkVSPT8sIFZJREVPX1VSTD0/IFdIRVJFIElEPT8gQU5EIEFMQlVNX0lEPT8nLCBbYWxidW0uVHJhY2tzW3ldLlRpdGxlLCBhbGJ1bS5UcmFja3NbeV0uTnVtYmVyLCBhbGJ1bS5UcmFja3NbeV0uVmlkZW8sIGFsYnVtLlRyYWNrc1t5XS5JZCwgYWxidW0uSWRdKTtcbiAgICAgICAgICAgICAgICAgaWYocmVzdWx0Mi5jaGFuZ2VkUm93cyAhPSAwKVxuICAgICAgICAgICAgICAgICAgICArK2NoYW5nZXM7XG4gICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soY2hhbmdlcyk7XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIGRlbGV0ZSBhbiBBbGJ1bS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gYWxidW0gQWxidW0gSUQgdG8gZGVsZXRlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIG51bWJlciBvZiByb3dzIGRlbGV0ZWQuICBcbiAgICAgKiAqL1xuICAgIHB1YmxpYyBkZWxldGUoYWxidW1JZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBkZWxldGUgdGhlIHRyYWNrcyBmb3IgYW4gQWxidW1cbiAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnREVMRVRFIEZST00gVFJBQ0sgV0hFUkUgQUxCVU1fSUQ9PycsIFthbGJ1bUlkXSk7XG4gICAgICAgICAgICBjaGFuZ2VzID0gY2hhbmdlcyArIHJlc3VsdDEuYWZmZWN0ZWRSb3dzO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZGVsZXRlIHRoZSBBbGJ1bVxuICAgICAgICAgICAgbGV0IHJlc3VsdDIgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdERUxFVEUgRlJPTSBBTEJVTSBXSEVSRSBJRD0/JywgW2FsYnVtSWRdKTtcbiAgICAgICAgICAgIGNoYW5nZXMgPSBjaGFuZ2VzICsgcmVzdWx0Mi5hZmZlY3RlZFJvd3M7XG5cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8qICoqKioqKioqKioqKioqKiogUHJpdmF0ZSBIZWxwZXIgTWV0aG9kcyAqKioqKioqKioqKioqKioqICovXG5cbiAgICAvKipcbiAgICAgKiBQcml2YXRlIGhlbHBlciBtZXRob2QgdG8gaW5pdGlhbGllIGEgRGF0YWJhc2UgQ29ubmVjdGlvblxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdERiQ29ubmVjdGlvbigpOmFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG15c3FsLmNyZWF0ZVBvb2woe2hvc3Q6IHRoaXMuaG9zdCwgcG9ydDogdGhpcy5wb3J0LCB1c2VyOiB0aGlzLnVzZXJuYW1lLCBwYXNzd29yZDogdGhpcy5wYXNzd29yZCwgZGF0YWJhc2U6IHRoaXMuc2NoZW1hLCBjb25uZWN0aW9uTGltaXQ6IDEwfSk7XG4gICAgfVxufVxuIl19