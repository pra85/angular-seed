'use strict';

var angular = require('angular');

angular.module('MyApp', [])
	.controller('View1Ctrl', ['$scope', require('./view1/view1.js')])
	.controller('View2Ctrl', ['$scope', require('./view2/view2.js')]);