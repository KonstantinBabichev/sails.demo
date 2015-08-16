fuzzyMap.controller('MapController', ['$scope', '$resource', '$location', 'placesFactory',
  function ($scope, $resource, $location, places) {
    console.log('MapController');
    var self = this;
    self.markers = [];
    // Google map init
    self.mapInit = function () {
      var featureOpts = [{
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{"saturation": 36}, {"color": "#000000"}, {"lightness": 40}]
      }, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{"visibility": "on"}, {"color": "#000000"}, {"lightness": 16}]
      }, {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#000000"}, {"lightness": 20}]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#000000"}, {"lightness": 17}, {"weight": 1.2}]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{"color": "#000000"}, {"lightness": 20}]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{"color": "#000000"}, {"lightness": 21}]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#000000"}, {"lightness": 17}]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#000000"}, {"lightness": 29}, {"weight": 0.2}]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{"color": "#000000"}, {"lightness": 18}]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{"color": "#000000"}, {"lightness": 16}]
      }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{"color": "#000000"}, {"lightness": 19}]
      }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{"color": "#0f252e"}, {"lightness": 17}]
      }];
      var MY_MAPTYPE_ID = 'custom_style',
        customMapType = new google.maps.StyledMapType(featureOpts, {
          name: 'Custom Style'
        });

      self.map = new google.maps.Map(document.getElementById("googleMap"), {
        center: new google.maps.LatLng(53.930088, 27.577498),
        zoom: 11,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
        },
        mapTypeId: MY_MAPTYPE_ID
      });

      self.map.mapTypes.set('custom_style', customMapType);
    };

    self.renderMarker = function (id, coordinates) {
      angular.forEach(self.markers, function (marker, key) {
        if (marker.marker_id == value.id) return null;
      });

      var marker = new google.maps.Marker({
        marker_id : id,
        marker_url: '/place/' + id,
        map: self.map,
        position: coordinates
      });

      marker.addListener('click', function() {
        //self.map.setZoom(12);
        self.map.setCenter(marker.getPosition());
        $location.path(marker.marker_url);
        $scope.$apply();
      });

      self.markers.push(marker);
      return marker;
    };

    self.addMarker = function (value, key) {
      value.coordinates = value.geo ? JSON.parse(value.geo) : null;

      if (value.coordinates) {
        self.renderMarker(value.id, {lat: value.coordinates[0], lng: value.coordinates[1]});
      } else {
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({'address': value.address}, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            //console.log(results[0]);
            //map.setCenter(results[0].geometry.location);
            self.renderMarker(value.id, results[0].geometry.location);
          } else {
            console.log('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
    };

    self.addMarkers = function (placesList) {
      angular.forEach(self.places, function (value, key) {
        self.addMarker(value, key);
      });
    };

    self.removeMarkers = function (placesList) {
      angular.forEach(self.markers, function (marker, key) {
        marker.setMap(null);
      });

      self.markers = [];
    };


    $scope.$watch(places.currentList, function (placesList, oldList, scope) {
      //self.removeMarkers();
      console.warn('placesList changed');
      //console.log(placesList);
      self.places = placesList;
      self.addMarkers(placesList);
      console.log("self.markers");
      console.log(self.markers);
    });

    self.mapInit();
  }]);
