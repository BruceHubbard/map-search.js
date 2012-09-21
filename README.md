map-search.js
=============

Still a work in progress.  Needed a really simple wrapper around Google Maps that would call a function with the map boundaries whenever the map changed.  That way I could call a custom search API and add markers appropriately while keeping the core logic concise.

TODO
---------
- Add Bing map capability
- Add ability to create the map (right now you have to pass in the map object)

How To Use
------

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
