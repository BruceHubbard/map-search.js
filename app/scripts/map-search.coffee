#need to handle screen resize

class MapSearch
	constructor: (@options) ->
		throw 'Must Pass In Options' if !@options
		throw 'Must Pass In Map OR Map Element' if !@options.map and (!@options.el or !@options.mapOptions)
		throw 'Must Pass In Search Function' if !@options.search

		@createMap() if !@options.map

		@addEvents()

	createMap: -> 

	map: -> @options.map

class GoogleMapSearch extends MapSearch
	@EventThreshold: 100

	createMap: -> 
		@options.map = new google.maps.Map(@options.el,@options.mapOptions)

	search: -> 
		bounds = @options.map.getBounds()
		@options.search(bounds.getNorthEast().lat(), bounds.getSouthWest().lat(), 
						bounds.getNorthEast().lng(), bounds.getSouthWest().lng())

	addEvents: ->
		eventNumber = 0
	
		google.maps.event.addListener(@options.map, 'bounds_changed', () =>
			num = eventNumber = eventNumber+1

			callIfLast = () =>
				@search() if num == eventNumber

			setTimeout(callIfLast, GoogleMapSearch.EventThreshold))

class BingMapSearch extends MapSearch
	createMap: -> 
		@options.map = new Microsoft.Maps.Map(@options.el,@options.mapOptions)

	map: -> @options.map

	search: -> 
		bounds = @options.map.getBounds()
		@options.search(bounds.center.latitude + (bounds.height/2), 
						bounds.center.latitude - (bounds.height/2), 
						bounds.center.longitude + (bounds.width/2),
						bounds.center.longitude - (bounds.width/2))

	addEvents: ->
		Microsoft.Maps.Events.addHandler(@options.map, 'viewchangeend', () => @search())
