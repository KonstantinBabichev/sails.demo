fuzzyMap.controller('PlaceController', ['$scope', 'placesFactory', 'initialPlaces', '$resource',
  function ($scope, placesFactory, initialPlaces, $resource) {
    var self = this;
    console.log('one');
    self.places = initialPlaces;

    console.log(self.places);

  }]);
