map-search.js
=============

Still a work in progress.  Needed a really simple wrapper around Google and Bing Maps that would call a function with the map boundaries whenever the map changed.  That way I could call a custom search API and add markers appropriately while keeping the core logic concise.

TODO
---------
- Fix Bing map east/west when getting close to the 180/-180 boundary


How To Install
=========
- Get an API key from either [Google Maps](https://developers.google.com/maps/documentation/javascript/tutorial#api_key) or [Bing Maps](http://msdn.microsoft.com/en-us/library/ff428642.aspx)
- Add script tag for your map provider


    <!-- Google Maps PLEASE REPLACE YOUR_KEY WITH YOUR ACTUAL API KEY -->
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&sensor=false"></script>

    <!-- Bing Maps -->
    <script charset="UTF-8" type="text/javascript" src="https://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0&s=1"></script>

Add script tag for map-search.js

**example here


How To Use
=========

For an existing Google Map object:

    var map = ...instantiate google map

    var mapSearch = new MapSearch({
      map: map,
      mapType: MapSearch.Types.Google,

      //this is called everytime the map changes and you'll hit your AJAX api
      //here and update pins, other parts of the screen, etc
      search: function(north, south, east, west) {
        //Instead of just outputting it do something with it here!
        console.log('N: ' + north + ", S: " + south + ", E: " + east + ", W: " + west);
      }
    });

Utility Methods
--------

map(): Returns the map object that was either passed in with the options or instantiated by map-search
