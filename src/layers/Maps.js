import {Tile} from 'ol/layer';
import {LayerManager} from 'oltb-mira/src/oltb/js/managers/LayerManager';
import {OSM, XYZ} from 'ol/source';


LayerManager.addMapLayers([
    {
        name: 'Open Street Map',
        layer: new Tile({
            source: new OSM({
                crossOrigin: 'anonymous'
            }),
            visible: true
        })
    }, {
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
    },
    /*{
        name: 'Google Satelite',
        layer: new Tile({
            source: new XYZ({
                crossOrigin: 'anonymous',
                attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url:'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
            }),
            visible: false
        })
    }, {
        name: 'Google Hybrid',
        layer: new Tile({
            source: new XYZ({
                crossOrigin: 'anonymous',
                attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url:'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
            }),
            visible: false
        })
    }, {
        name: 'Google Terrain',
        layer: new Tile({
            source: new XYZ({
                crossOrigin: 'anonymous',
                attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url:'https://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}'
            }),
            visible: false
        })
    }, {
        name: 'Google Traffic',
        layer: new Tile({
            source: new XYZ({
                crossOrigin: 'anonymous',
                attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url:' https://mt1.google.com/vt?lyrs=h@159000000,traffic|seconds_into_week:-1&style=3&x={x}&y={y}&z={z}'
            }),
            visible: false
        })
    }, {
        name: 'Google Roads',
        layer: new Tile({
            source: new XYZ({
                crossOrigin: 'anonymous',
                attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url:'https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}'
            }),
            visible: false
        })
    }*/
], {
    silent: true
});
