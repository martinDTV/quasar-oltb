import { Tile } from 'ol/layer';
import {LayerManager} from 'oltb/src/oltb/js/managers/LayerManager';
import { TileWMS } from 'ol/source';
import axios from 'axios';
import RemoveMapLayers from 'src/utils/Herramientas/RemoveMapLayers';

async function GetLayers(apiUrl, MapLayers) {
  await axios.get(apiUrl)
  .then(response => {

    const respuesta = response.data
    console.log(respuesta)
      for(let i = 0; i < respuesta.datasets.length; i ++){
        const links = respuesta.datasets[i].links
        let url_img = ''
        const coordenadas = respuesta.datasets[i].bbox_polygon.coordinates[0][0]
        for(let j = 0; j < links.length; j ++){
          if(links[j].extension === 'jpg'){
            url_img = links[j].url
            break;
          }
        }
        if(coordenadas[0] !== 0 && coordenadas[1] !== 0){
          if(url_img !== ''){

            LayerManager.addMapLayers([
            {
                name:respuesta.datasets[i].name,
                layer: new Tile({
                  source: new TileWMS({
                    crossOrigin: 'anonymous',
                    attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                    url: url_img,
                    projection: respuesta.srid
                  }),
                  visible: false
                })
            }
            ], {
                silent: true
            });
          }
        }

        RemoveMapLayers(MapLayers)

      }
  })
  .catch(error => {
    console.log(error)
  })
}

export default GetLayers
