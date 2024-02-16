import {LayerManager} from 'oltb/src/oltb/js/managers/LayerManager';

async function RemoveMapLayers(MapsLayers){
  for(let i = 0; i < MapsLayers.length; i ++){
    if(MapsLayers[i].layer.ol_uid === '6' || MapsLayers[i].layer.ol_uid === '4'){
    }else{
      LayerManager.removeMapLayer(MapsLayers[i])
    }
  }
}

export default RemoveMapLayers;
