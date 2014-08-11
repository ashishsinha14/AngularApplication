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

        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };

        $scope.totalServerItems = 0;

        $scope.pagingOptions = {
            pageSizes: [5, 10, 20],
            pageSize: 5,
            currentPage: 1
        };

        $scope.setPagingData = function(data, page, pageSize){
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.customers = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    $http.get('mock-data/data.json').success(function (largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data,page,pageSize);
                    });
                } else {
                    $http.get('mock-data/data.json').success(function (largeLoad) {
                        $scope.setPagingData(largeLoad,page,pageSize);
                    });
                }
            }, 100);
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.$watch('filterOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.gridOptions = {
            data: 'customers',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            enableColumnResize: true,
            enablePaging: true,
            showFooter:true,
            totalServerItems:'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            columnDefs: [{ field: "Company", width: 120 },
                        { field: "Contact", width: 120 },
                        { field: "Phone", width: 120 },
                        { field: "Extension", width: 120 },
                        { field: "Title", width: 120 },
                        { field: "Address1", width: 120 },
                        { field: "Address2", width: 120 },
                        { field: "City", width: 120 },
                        { field: "State", width: 120 },
                        { field: "ZipCode", width: 120 }]
        };

    }
]);