<template>
  <div>ddd</div>
</template>

<script setup lang="ts">


import {Tile} from 'ol/layer';
import {LayerManager} from 'oltb-mira/src/oltb/js/managers/LayerManager';
import { TileWMS } from 'ol/source';
import axios from 'axios';

axios.get('https://geonode.appsmty.gob.mx/api/v2/datasets/')
  .then(response => {
    console.log(response.data)
    const respuesta = response.data

    console.log(respuesta.datasets)
      for(let i = 0; i < respuesta.datasets.length; i ++){

        const links = respuesta.datasets[i].links
        let url_img = ''

        for(let j = 0; j < links.length; j ++){
          if(links[j].extension === 'jpg' || links[j].extension === 'png'){
            console.log("entro al ifd")
            url_img = links[j].url
            console.log(url_img)
            break;
          }
        }
        if(url_img !== ''){
          console.log("Entro")
          LayerManager.addMapLayers([
          {
              name:respuesta.datasets[i].name,
              layer: new Tile({
                source: new TileWMS({
                  params:{
                    crossOrigin: 'anonymous',
                    attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                    url: url_img,

                  }
                }),
                visible: false
              })
          }
          ], {
              silent: true
          });
        }

      }
  })
  .catch(error => {
    console.log(error)
  })

</script>
