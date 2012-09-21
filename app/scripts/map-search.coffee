#When dragging and letting go the map sometimes still slides, need to queue the search events
#need to handle screen resize

class MapSearch
	constructor: (@options) ->
		throw 'Must Pass In Options' if !@options
		throw 'Must Specify Map Type' if !@options.mapType
		throw 'Must Pass In Map OR Map Element' if !@options.map and (!@options.el or !@options.mapOptions)
		throw 'Must Pass In Search Function' if !@options.search

		@createMap() if !@options.map

		@addEvents()

	@Types: {
		Google: "Google"
	}

	@EventThreshold: 100

	createMap: -> 
		@options.map = new google.maps.Map(@options.el,@options.mapOptions)

	map: -> @options.map

	addEvents: ->
		if(@options.mapType == MapSearch.Types.Google)
			eventNumber = 0

			callSearch = () => 
				bounds = @options.map.getBounds()
				@options.search(bounds.getNorthEast().lat(), bounds.getSouthWest().lat(), 
								bounds.getNorthEast().lng(), bounds.getSouthWest().lng())
			
			google.maps.event.addListener(@options.map, 'bounds_changed', () =>
				num = eventNumber = eventNumber+1

				callIfLast = () =>
					callSearch() if num == eventNumber

				setTimeout(callIfLast, MapSearch.EventThreshold))


