fuzzyMap
  .factory('placesFactory', ['$http', '$q', function ($http, $q) {
    console.log('placesFactory');
    //var BASE_URL = 'http://localhost:1337/api/place';
    var BASE_URL = 'http://devx.izodev.com/maps';
    var self = this;
    self.items = [];

    var factory = {
      query: function (id) {
        var _deferred = $q.defer();
        var url = BASE_URL;

        if (id) {
          url = BASE_URL + '/' + id;
        }

        console.log(url);
        $http({method: 'GET', url: url}).then(function (result) {
          console.log(result);
          console.info(typeof result.data);
          console.info(result.data.length);

          if(!result.data.length) {
            result.data = [result.data];
          }

          self.items = result.data;
          _deferred.resolve(result.data);
        }, function (result) {
          alert("Error: No data returned");
        });

        return _deferred.promise;
      },
      currentList: function () {
        return self.items;
      },
      setList: function (list) {
        self.items = list;
      }
    };

    return factory;
  }]);
