'use strict';

module.exports = function ($scope, ngDialog) {
	$scope.name = 'ccjmne';
    $scope.dialog = function(){
        ngDialog.open({
            template: '<p>my template</p>',
            plain: true
        });
    };
};
