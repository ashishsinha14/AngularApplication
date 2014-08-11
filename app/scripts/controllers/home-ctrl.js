GPAC.POC.Controllers.controller('HomeCtrl', [
    '$scope',
    '$http',
    'DSCacheFactory',
    function($scope, $http, DSCacheFactory) {
        var cacheKey = 'customers',
            cache = DSCacheFactory('gpac.POC', {
                storageMode: 'sessionStorage',
                storagePrefix: 'gpac.POC'
            });

        var loadCustomers = function () {
            if (cache) {
                var customers = cache.get(cacheKey);

                if (customers) {
                    $scope.customers = customers;
                } else {
                    $http.get('mock-data/data.json').success(function (response) {
                        $scope.customers = response;
                    });
                }
            }
        };
        loadCustomers();

        // Listen for updates in the grid and persists the data.
        $scope.$on('ngGridEventEndCellEdit', function (e, data) {
            if (cache) {
                cache.put(cacheKey, $scope.customers);
            }
        });


        $scope.gridOptions = {
            data: 'customers',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            columnDefs: [{ field: "name", width: 120 },
                        { field: "age", width: 120 },
                        { field: "birthday", width: 120 },
                        { field: "salary", width: 120 }]
        };

    }
]);