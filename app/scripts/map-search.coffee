#maybe take in a map object or an api key and create the map?

class MapSearch
	constructor: (@options) ->
		throw 'Must Pass In Options' if !@options
		throw 'Must Specify Map Type' if !@options.mapType
		throw 'Must Pass In Map' if !@options.map
		throw 'Must Pass In Search Function' if !@options.search
		@addEvents()

	@Types: {
		Google: "Google"
	}

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


