import urlContinentsGeoJson from '../geojson/continents.geojson'
import {Config} from 'ol/source/TileJSON';
import {GeoJSON} from 'ol/format';
import {LayerManager} from 'oltb/src/oltb/js/managers/LayerManager';
import {Vector as VectorLayer} from 'ol/layer'
import {Vector as VectorSource} from 'ol/source'

LayerManager.addMapLayers([
    {
        name: 'Continents overlay',
        layer: new VectorLayer({
            source: new VectorSource({
                url: urlContinentsGeoJson,
                format: new GeoJSON({
                    featureProjection: Config.projection.default
                })
            }),
            visible: false
        })
    }
], {
    silent: true
});
