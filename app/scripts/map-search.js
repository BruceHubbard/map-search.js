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
    Google: "Google"
  };

  MapSearch.EventThreshold = 100;

  MapSearch.prototype.createMap = function() {
    return this.options.map = new google.maps.Map(this.options.el, this.options.mapOptions);
  };

  MapSearch.prototype.map = function() {
    return this.options.map;
  };

  MapSearch.prototype.addEvents = function() {
    var callSearch, eventNumber,
      _this = this;
    if (this.options.mapType === MapSearch.Types.Google) {
      eventNumber = 0;
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
    }
  };

  return MapSearch;

})();
