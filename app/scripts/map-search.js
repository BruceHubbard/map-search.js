var MapSearch;

MapSearch = (function() {

  function MapSearch(options) {
    this.options = options;
    if (!this.options) {
      throw 'Must Pass In Options';
    }
    if (!this.options.mapType) {
      throw 'Must Specify Map Type';
    }
    if (!this.options.map && (!this.options.el || !this.options.mapOptions)) {
      throw 'Must Pass In Map OR Map Element';
    }
    if (!this.options.search) {
      throw 'Must Pass In Search Function';
    }
    if (!this.options.map) {
      this.createMap();
    }
    this.addEvents();
  }

  MapSearch.Types = {
    Google: "Google",
    Bing: "Bing"
  };

  MapSearch.EventThreshold = 100;

  MapSearch.prototype.createMap = function() {
    if (this.options.mapType === MapSearch.Types.Google) {
      return this.options.map = new google.maps.Map(this.options.el, this.options.mapOptions);
    } else if (this.options.mapType === MapSearch.Types.Bing) {
      return this.options.map = new Microsoft.Maps.Map(this.options.el, this.options.mapOptions);
    }
  };

  MapSearch.prototype.map = function() {
    return this.options.map;
  };

  MapSearch.prototype.addEvents = function() {
    var callSearch, eventNumber,
      _this = this;
    eventNumber = 0;
    if (this.options.mapType === MapSearch.Types.Google) {
      callSearch = function() {
        var bounds;
        bounds = _this.options.map.getBounds();
        return _this.options.search(bounds.getNorthEast().lat(), bounds.getSouthWest().lat(), bounds.getNorthEast().lng(), bounds.getSouthWest().lng());
      };
      return google.maps.event.addListener(this.options.map, 'bounds_changed', function() {
        var callIfLast, num;
        num = eventNumber = eventNumber + 1;
        callIfLast = function() {
          if (num === eventNumber) {
            return callSearch();
          }
        };
        return setTimeout(callIfLast, MapSearch.EventThreshold);
      });
    } else if (this.options.mapType === MapSearch.Types.Bing) {
      callSearch = function() {
        var bounds;
        console.log("HERE");
        bounds = _this.options.map.getBounds();
        return _this.options.search(bounds.center.latitude + (bounds.height / 2), bounds.center.latitude - (bounds.height / 2), bounds.center.longitude + (bounds.width / 2), bounds.center.longitude - (bounds.width / 2));
      };
      return Microsoft.Maps.Events.addHandler(this.options.map, 'viewchangeend', function() {
        return callSearch();
      });
    }
  };

  return MapSearch;

})();
