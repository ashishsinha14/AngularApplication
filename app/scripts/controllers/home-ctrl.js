GPAC.POC.Controllers.controller('HomeCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {
        $http.get('mock-data/data.json').success(function (response) {
            $scope.myData = response;
        });

        $scope.gridOptions = {
            data: 'myData',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            columnDefs: [{ field: "name", width: 120 },
                        { field: "age", width: 120 },
                        { field: "birthday", width: 120 },
                        { field: "salary", width: 120 }]
        };
}]);