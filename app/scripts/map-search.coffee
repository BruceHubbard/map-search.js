#When dragging and letting go the map sometimes still slides, need to queue the search events

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

	createMap: -> 
		@options.map = new google.maps.Map(@options.el,@options.mapOptions)

	map: -> @options.map

	addEvents: ->
		if(@options.mapType == MapSearch.Types.Google)

			callSearch = () => 
				bounds = @options.map.getBounds()
				@options.search(bounds.getNorthEast().lat(), bounds.getSouthWest().lat(), 
								bounds.getNorthEast().lng(), bounds.getSouthWest().lng())

			dragging = false
			google.maps.event.addListener(@options.map, 'dragstart', () =>
    			dragging = true
    		)
			google.maps.event.addListener(@options.map, 'dragend', () =>
    			dragging = false
    			callSearch()
    		)
			google.maps.event.addListener(@options.map, 'bounds_changed', () =>
				if !dragging
				  callSearch()
    		)
			#need to handle screen resize


