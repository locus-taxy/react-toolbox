'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _time = require('../time');

var _time2 = _interopRequireDefault(_time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe */
/* global it */
describe('time', function () {
  describe('toggleTimeMode', function () {
    it('changes from am to pm', function () {
      var date = new Date(107, 2, 2, 10, 30);
      (0, _expect2.default)(_time2.default.toggleTimeMode(date).getTime()).toEqual(new Date(107, 2, 2, 22, 30).getTime());
    });
    it('changes from pm to am', function () {
      var date = new Date(107, 2, 2, 22, 30);
      (0, _expect2.default)(_time2.default.toggleTimeMode(date).getTime()).toEqual(new Date(107, 2, 2, 10, 30).getTime());
    });
  });
});