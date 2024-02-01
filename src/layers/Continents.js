
import {ConfigManager} from 'oltb/src/oltb/js/managers/ConfigManager';
import {GeoJSON} from 'ol/format';
import {LayerManager} from 'oltb/src/oltb/js/managers/LayerManager';
import {Vector as VectorLayer} from 'ol/layer'
import {Vector as VectorSource} from 'ol/source'

// Url imports

LayerManager.addMapLayers([
    {
        id: '7f6200e1-8a41-48a2-a39c-b8ff1ed4f7ec',
        name: 'Continents Overlay',
        layer: new VectorLayer({
            source: new VectorSource({
                url: '../geojson/continents.geojson',
                format: new GeoJSON({
                    featureProjection: ConfigManager.getConfig().projection.default
                })
            }),
            visible: true
        })
    }
], {
    isSilent: true
});
