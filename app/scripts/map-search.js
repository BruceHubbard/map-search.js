var BingMapSearch, GoogleMapSearch, MapSearch,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MapSearch = (function() {

  function MapSearch(options) {
    this.options = options;
    if (!this.options) {
      throw 'Must Pass In Options';
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

  MapSearch.prototype.createMap = function() {};

  MapSearch.prototype.map = function() {
    return this.options.map;
  };

  return MapSearch;

})();

GoogleMapSearch = (function(_super) {

  __extends(GoogleMapSearch, _super);

  function GoogleMapSearch() {
    return GoogleMapSearch.__super__.constructor.apply(this, arguments);
  }

  GoogleMapSearch.EventThreshold = 100;

  GoogleMapSearch.prototype.createMap = function() {
    return this.options.map = new google.maps.Map(this.options.el, this.options.mapOptions);
  };

  GoogleMapSearch.prototype.search = function() {
    var bounds;
    bounds = this.options.map.getBounds();
    return this.options.search(bounds.getNorthEast().lat(), bounds.getSouthWest().lat(), bounds.getNorthEast().lng(), bounds.getSouthWest().lng());
  };

  GoogleMapSearch.prototype.addEvents = function() {
    var eventNumber,
      _this = this;
    eventNumber = 0;
    return google.maps.event.addListener(this.options.map, 'bounds_changed', function() {
      var callIfLast, num;
      num = eventNumber = eventNumber + 1;
      callIfLast = function() {
        if (num === eventNumber) {
          return _this.search();
        }
      };
      return setTimeout(callIfLast, GoogleMapSearch.EventThreshold);
    });
  };

  return GoogleMapSearch;

})(MapSearch);

BingMapSearch = (function(_super) {

  __extends(BingMapSearch, _super);

  function BingMapSearch() {
    return BingMapSearch.__super__.constructor.apply(this, arguments);
  }

  BingMapSearch.prototype.createMap = function() {
    return this.options.map = new Microsoft.Maps.Map(this.options.el, this.options.mapOptions);
  };

  BingMapSearch.prototype.map = function() {
    return this.options.map;
  };

  BingMapSearch.prototype.search = function() {
    var bounds;
    bounds = this.options.map.getBounds();
    return this.options.search(bounds.center.latitude + (bounds.height / 2), bounds.center.latitude - (bounds.height / 2), bounds.center.longitude + (bounds.width / 2), bounds.center.longitude - (bounds.width / 2));
  };

  BingMapSearch.prototype.addEvents = function() {
    var _this = this;
    return Microsoft.Maps.Events.addHandler(this.options.map, 'viewchangeend', function() {
      return _this.search();
    });
  };

  return BingMapSearch;

})(MapSearch);
