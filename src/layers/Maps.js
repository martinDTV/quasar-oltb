import {Tile} from 'ol/layer';
import {LayerManager} from 'oltb-mira/src/oltb/js/managers/LayerManager';
import {OSM, XYZ} from 'ol/source';
import {TileWMS} from 'ol/source';

const geonode = 'https://geonode.appsmty.gob.mx/api/v2/datasets/397/'

LayerManager.addMapLayers([
  {
        name: 'Open Street Map',
        layer: new Tile({
            source: new OSM({
                crossOrigin: 'anonymous'
            }),
            visible: true
        })
    },{
  name: 'Google Maps',
        layer: new Tile({
            source: new XYZ({
                crossOrigin: 'anonymous',
                url:'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'
            }),
            visible: false
        })
  },{
  name: 'Carto Positron',
        layer: new Tile({
            source: new XYZ({
                crossOrigin: 'anonymous',
                url:'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
            }),
            visible: false
        })
  },{
  name: 'ESRI Imagery/Satellite',
        layer: new Tile({
            source: new XYZ({
                crossOrigin: 'anonymous',
                url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            }),
            visible: false
        })
  },

  /*{
        name:'prueba',
        layer: new Tile({
          source: new TileWMS({
            crossOrigin: 'anonymous',
            attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
            url:'https://jsc.geonode.appsmty.gob.mx/geoserver/ows?service=WMS&request=GetMap&layers=geonode%3Auso_suelo&format=image%2Fjpeg&height=550&width=550&srs=EPSG%3A4326&bbox=-100.4419327%2C25.4796810%2C-100.1832352%2C25.7974625'
          }),
          visible: false
        })
    },{
        name: 'MONTERREY 2022',
        layer: new Tile({
            source: new XYZ({
                crossOrigin: 'anonymous',
                attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url:'https://engine.ec.appsmty.gob.mx/stiles/5ba54d62469b11eebe7f00155d649203/{z}/{x}/{-y}.jpg'
            }),
            visible: false
        })
    },
    {
        name: 'MONTERREY 2016',
        layer: new Tile({
            source: new XYZ({
                crossOrigin: 'anonymous',
                attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url:'https://engine.ec.appsmty.gob.mx/stiles/b5e513ba96b611edb62500155d649203/{z}/{x}/{-y}.jpg'
            }),
            visible: false
        })
    },{
        name: 'MONTERREY 2009',
        layer: new Tile({
            source: new XYZ({
                crossOrigin: 'anonymous',
                attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url:'https://engine.ec.appsmty.gob.mx/stiles/156eede6982a11edb87900155d649203/{z}/{x}/{-y}.jpg'
            }),
            visible: false
        })
    }, {
        name: 'Google Maps',
        layer: new Tile({
            source: new XYZ({
                crossOrigin: 'anonymous',
                attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url:'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'
            }),
            visible: false
        })
    },{
        name: 'VUELO FOTOGRAMETRICO 2022',
        layer: new Tile({
            source: new XYZ({
                crossOrigin: 'anonymous',
                attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url:'https://tiles3.ec.appsmty.gob.mx/stiles/ad80dede95f311edb62500155d649203/{z}/{x}/{-y}.jpg'
            }),
            visible: false
        })
    },*/
], {
    silent: true
});
