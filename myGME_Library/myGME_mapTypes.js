/**************************************************
 * Custom map layers:
 * Adapted from Jef Poskanzer's Acme Mapper
 * (http://mapper.acme.com/)
 **************************************************/
   //var USGS_TOPO_TILES = WMSCreateMap('Topo','Topo maps by USGS via terraserver-usa.com','Topo maps unavailable',5,17,400,'http://terraservice.net/ogcmap6.ashx?version=1.1.1&request=GetMap&styles=&srs=EPSG:4326&format=image/jpeg&bgcolor=0xCCCCCC&exceptions=INIMAGE&layers=DRG');
   var ESRI_TOPO_TILES = ArcGISCreateMap('Topo','Esri / ArcGIS','http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/',1.0,0,19,[],'t');
   var USATOPO_MAP_TILES = ArcGISCreateMap('Topo','ArcGIS','http://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/',1.0,0,15,[],'t');
   var USGS_AERIAL_TILES = WMSCreateMap('Aerial','Imagery by USGS via terraserver-usa.com','USGS aerial imagery unavailable',7,18,400,'http://terraservice.net/ogcmap6.ashx?version=1.1.1&request=GetMap&styles=&srs=EPSG:4326&format=image/jpeg&bgcolor=0xCCCCCC&exceptions=INIMAGE&layers=DOQ');
   var NRCAN_TOPO_TILES = WMSCreateMap('NRCan','Maps by NRCan.gc.ca','NRCan maps unavailable',6,18,600,'http://wms.cits.rncan.gc.ca/cgi-bin/cubeserv.cgi?version=1.1.3&request=GetMap&format=image/png&bgcolor=0xFFFFFF&exceptions=application/vnd.ogc.se_inimage&srs=EPSG:4326&layers=PUB_50K:CARTES_MATRICIELLES/RASTER_MAPS');
//   var BLUEMARBLE_TILES = WMSCreateMap('BlueMarble','Map by NASA','OnEarth server unavailable',3,8,128,'http://onearth.jpl.nasa.gov/wms.cgi?request=GetMap&styles=&srs=EPSG:4326&format=image/jpeg&layers=modis');
//   var DAILY_TERRA_TILES = WMSCreateMap('"Terra"','Map by NASA','OnEarth server unavailable',3,10,256,'http://onearth.jpl.nasa.gov/wms.cgi?request=GetMap&styles=&srs=EPSG:4326&format=image/jpeg&layers=daily_terra');
//   var DAILY_AQUA_TILES = WMSCreateMap('"Aqua"','Map by NASA','OnEarth server unavailable',3,10,256,'http://onearth.jpl.nasa.gov/wms.cgi?request=GetMap&styles=&srs=EPSG:4326&format=image/jpeg&layers=daily_aqua');

	var MapnikServers = ['otile1.mqcdn.com','otile2.mqcdn.com','otile3.mqcdn.com','otile4.mqcdn.com'];
	var MapnikServer = MapnikServers[Math.floor(Math.random()*MapnikServers.length)];
	
	var MAPNIK_MAP = TMSCreateMap('Mapnik','Data, imagery and map information provided by <a href="http://www.mapquest.com/">MapQuest</a>, <a href="http://www.openstreetmap.org/">Open Street Map</a> and contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>','http://'+MapnikServer+'/tiles/1.0.0/osm/',1.0,0,18,[],'k');


function Add_Custom_Layers(map) {
   map.addMapType(ESRI_TOPO_TILES);
   map.addMapType(USATOPO_MAP_TILES);
   map.addMapType(MAPNIK_MAP);
   map.addMapType(NRCAN_TOPO_TILES);
//   map.addMapType(BLUEMARBLE_TILES);
//   map.addMapType(DAILY_TERRA_TILES);
//   map.addMapType(DAILY_AQUA_TILES);
}

function TMSCreateMap(name,copyright,baseUrl,opacity,minResolution,maxResolution,extraTileLayers,urlArg){
	var tileLayer=new GTileLayer(new GCopyrightCollection(copyright),minResolution,maxResolution);
	tileLayer.baseUrl=baseUrl;
	tileLayer.getTileUrl=TMSGetTileUrl;
	tileLayer.getOpacity=function(){return opacity;};
	tileLayer.getCopyright=function(){return{prefix:'',copyrightTexts:[copyright]};};
	var tileLayers=[];for(var i in extraTileLayers) tileLayers.push(extraTileLayers[i]);
	tileLayers.push(tileLayer);
	return new GMapType(tileLayers,G_SATELLITE_MAP.getProjection(),name,{urlArg:urlArg});}
		
function TMSGetTileUrl(tile,zoom)
{return this.baseUrl+zoom+'/'+tile.x+'/'+tile.y+'.png';}


function ArcGISCreateMap(name,copyright,baseUrl,opacity,minResolution,maxResolution,extraTileLayers,urlArg) {
	var tileLayer=new GTileLayer(new GCopyrightCollection(copyright),minResolution,maxResolution);
	tileLayer.baseUrl=baseUrl;
	tileLayer.getTileUrl=ArcGISGetTileUrl;
	tileLayer.getOpacity=function(){return opacity;};
	tileLayer.getCopyright=function(){return{prefix:'',copyrightTexts:[copyright]};};
	var tileLayers=[];
	for(var i in extraTileLayers) tileLayers.push(extraTileLayers[i]);
	tileLayers.push(tileLayer);
	return new GMapType(tileLayers,G_SATELLITE_MAP.getProjection(),name,{urlArg:urlArg});}

function ArcGISGetTileUrl(tile,zoom)
{return this.baseUrl+zoom+'/'+tile.y+'/'+tile.x;}


function WMSCreateMap(name,copyright,errorMessage,minResolution,maxResolution,tileSize,baseUrl) {
   var tileLayer = new GTileLayer(new GCopyrightCollection(copyright),minResolution,maxResolution);
   tileLayer.baseUrl = baseUrl;
   tileLayer.tileSize = tileSize;
   tileLayer.getTileUrl = WMSGetTileUrl;
   tileLayer.getCopyright = function() { return { prefix:'',copyrightTexts:[copyright]}; };
   var tileLayers = [tileLayer];
   return new GMapType(tileLayers,G_SATELLITE_MAP.getProjection(),name,{errorMessage:errorMessage,tileSize:tileSize});
}
function WMSGetTileUrl(tile,zoom) {
   var southWestPixel = new GPoint(tile.x*this.tileSize,(tile.y+1)*this.tileSize);
   var northEastPixel = new GPoint((tile.x+1)*this.tileSize,tile.y*this.tileSize);
   var southWestCoords = G_SATELLITE_MAP.getProjection().fromPixelToLatLng(southWestPixel,zoom);
   var northEastCoords = G_SATELLITE_MAP.getProjection().fromPixelToLatLng(northEastPixel,zoom);
   var bbox = southWestCoords.lng()+','+southWestCoords.lat()+','+northEastCoords.lng()+','+northEastCoords.lat();
   return this.baseUrl+'&bbox='+bbox+'&width='+this.tileSize+'&height='+this.tileSize;
}

/**************************************************
 * Custom map-type control:
 * more or less from Google's own documentation
 **************************************************/
maptypecontrol_style = (self.maptypecontrol_style) ? maptypecontrol_style : 'menu';
filter_map_types = (self.filter_map_types!=null) ? filter_map_types : true;

function MapTypeControl() {}
   MapTypeControl.prototype = new GControl();
   MapTypeControl.prototype.initialize = function(map) {
      Add_Custom_Layers(map);
      var map_types = [
         { label:'Google Maps - Map',type:'G_NORMAL_MAP',title:'Google street map',bounds:[-180,-90,180,90],excluded:[] }
         ,{ label:'Google Maps - Satellite',type:'G_SATELLITE_MAP',title:'Google satellite map',bounds:[-180,-90,180,90],excluded:[] }
         ,{ label:'Google Maps - Hybrid',type:'G_HYBRID_MAP',title:'Google "hybrid" map',bounds:[-180,-90,180,90],excluded:[] }
         ,{ label:'Esri - World Topo',type:'ESRI_TOPO_TILES',title:'Esri topographic map',bounds:[-180,-90,180,90],excluded:[] }
         ,{ label:'Esri - USA Topo',type:'USATOPO_MAP_TILES',title:'USA Esri topographic map',bounds:[-169,18,-66,72],excluded:[] }
         ,{ label:'OSM',type:'MAPNIK_MAP',title:'OSM map',bounds:[-180,-90,180,90],excluded:[] }
         ,{ label:'Canada - Topographic',type:'NRCAN_TOPO_TILES',title:'NRCan/Toporama maps with contour lines',bounds:[-141,41.7,-52,85],excluded:[-141,41.7,-86,48] }
//         ,{ label:'Blue Marble',type:'BLUEMARBLE_TILES',title:'NASA "Visible Earth" image',bounds:[-180,-90,180,90],excluded:[] }
//         ,{ label:'Daily "Terra"',type:'DAILY_TERRA_TILES',title:'Daily imagery from "Terra" satellite',bounds:[-180,-90,180,90],excluded:[] }
//         ,{ label:'Daily "Aqua"',type:'DAILY_AQUA_TILES',title:'Daily imagery from "Aqua" satellite',bounds:[-180,-90,180,90],excluded:[] }
      ];
      var center_lat = map.getCenter().lat();
      var center_lng = map.getCenter().lng();

      if (maptypecontrol_style == 'menu') {
         var map_selector = document.createElement("select");
         map_selector.id = 'map_selector';
         map_selector.style.font = '12px Verdana';
         map_selector.style.backgroundColor = '#FFFFFF';
         for (j=0; j<map_types.length; j++) {
            if (!filter_map_types || filter_map_types < 0 || ( (center_lng >= map_types[j]['bounds'][0] && center_lat >= map_types[j]['bounds'][1] && center_lng <= map_types[j]['bounds'][2] && center_lat <= map_types[j]['bounds'][3]) && !(center_lng >= map_types[j]['excluded'][0] && center_lat >= map_types[j]['excluded'][1] && center_lng <= map_types[j]['excluded'][2] && center_lat <= map_types[j]['excluded'][3]) ) ) {
               var opt = document.createElement("option");
               opt.value = map_types[j]['type'];
               opt.appendChild(document.createTextNode(map_types[j]['label']));
               map_selector.appendChild(opt);
               if (map.getCurrentMapType() == eval(opt.value)) { map_selector.selectedIndex = map_selector.length - 1; }
            }
         }
         GEvent.addDomListener(map_selector, "change", function(){map.setMapType(eval(this.value));} );
         map.getContainer().appendChild(map_selector);
         return map_selector;
      } else {
         var map_type_container = document.createElement("div");
         for (j=0; j<map_types.length; j++) {
            if (!filter_map_types || filter_map_types < 0 || ( (center_lng >= map_types[j]['bounds'][0] && center_lat >= map_types[j]['bounds'][1] && center_lng <= map_types[j]['bounds'][2] && center_lat <= map_types[j]['bounds'][3]) && !(center_lng >= map_types[j]['excluded'][0] && center_lat >= map_types[j]['excluded'][1] && center_lng <= map_types[j]['excluded'][2] && center_lat <= map_types[j]['excluded'][3]) ) ) {
               var maplink = document.createElement("div");
               maplink.className = 'maptypelink';
               if (self.maptypecontrol && map.getCurrentMapType() == eval(map_types[j]['type'])) {
                  maplink.className = 'maptypelink maptypelink_selected';
               }
               maplink.title = map_types[j]['title'];
               maplink.type = map_types[j]['type'];
               map_type_container.appendChild(maplink);
               maplink.appendChild(document.createTextNode(map_types[j]['label']));
               GEvent.addDomListener(maplink, "click", function(){
                  map.setMapType(eval(this.type));
                  if (self.maptypecontrol) {
                     map.removeControl(maptypecontrol);
                     map.addControl(maptypecontrol);
                  }
               } );
            }
         }
         map.getContainer().appendChild(map_type_container);
         return map_type_container;
      }
   }
   MapTypeControl.prototype.getDefaultPosition = function() {
      return new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(115,7));
}

var api_version = 2;
function GPSV_MapTypeControl() {}
//if (api_version >= 2) { GPSV_MapTypeControl.prototype = MapTypeControl.prototype; }
GPSV_MapTypeControl.prototype = MapTypeControl.prototype;
//
//////////////////////