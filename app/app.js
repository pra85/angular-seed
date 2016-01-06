'use strict';

var angular = require('angular');

angular.module('MyApp', [require('ng-dialog')])
    .config(['ngDialogProvider', function (ngDialogProvider) {
        ngDialogProvider.setDefaults({
            className: 'ngdialog-theme-default',
            plain: false,
            showClose: true,
            closeByDocument: true,
            closeByEscape: true,
            appendTo: false,
            preCloseCallback: function () {
                console.log('default pre-close callback');
            }
        });
    }])
	.controller('View1Ctrl', ['$scope', 'ngDialog', require('./view1/view1.js')])
	.controller('View2Ctrl', ['$scope', require('./view2/view2.js')]);
