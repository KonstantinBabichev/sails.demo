fuzzyMap.controller('PlacesController', ['$scope', 'placesFactory', 'initialPlaces', '$resource',
  function ($scope, placesFactory, initialPlaces, $resource) {
    var self = this;
    self.places = initialPlaces;

    //var User = $resource('/api/place/:title', {title:'@id'});
    //User.get({title:14}, function(user) {
    //  //console.log('resource');
    //  console.log(user);
    //});
    //storeData(initialPlaces);

    function storeData(data) {
      data.forEach(function (item) {
        //console.log(item);

        var obj = {
          title: item.title,
          body: item.body,
          address: item.address,
          geo: item.geo,
          images: item.images,
          image: item.image
        };

        User.save(obj, function(user) {
          console.log('resource 123');
          console.log(user);
        });

      })
    }

    self.update = function () {
      places.query().then(function(places){
        self.places = places;
      });
    };





    //places.setList(initialPlaces);
  }]);
