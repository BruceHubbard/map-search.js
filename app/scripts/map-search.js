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
    if (!this.options.map) {
      throw 'Must Pass In Map';
    }
    if (!this.options.search) {
      throw 'Must Pass In Search Function';
    }
    this.addEvents();
  }

  MapSearch.Types = {
    Google: "Google"
  };

  MapSearch.prototype.addEvents = function() {
    var callSearch, dragging,
      _this = this;
    if (this.options.mapType === MapSearch.Types.Google) {
      callSearch = function() {
        var bounds;
        bounds = _this.options.map.getBounds();
        return _this.options.search(bounds.getNorthEast().lat(), bounds.getSouthWest().lat(), bounds.getNorthEast().lng(), bounds.getSouthWest().lng());
      };
      dragging = false;
      google.maps.event.addListener(this.options.map, 'dragstart', function() {
        return dragging = true;
      });
      google.maps.event.addListener(this.options.map, 'dragend', function() {
        dragging = false;
        return callSearch();
      });
      return google.maps.event.addListener(this.options.map, 'bounds_changed', function() {
        if (!dragging) {
          return callSearch();
        }
      });
    }
  };

  return MapSearch;

})();
