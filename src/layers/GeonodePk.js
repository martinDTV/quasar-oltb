import {apiMapaPk} from 'boot/axios';
import {useRouter} from 'vue-router';
import { ref } from 'vue'
import {useQuasar} from 'quasar';

function BuscarMapaPk(pk){

  const router = useRouter()

  const $q = useQuasar()

  console.log('aqui anda')

  $q.loading.show({
    delay:0
  })

  apiMapaPk.get( + `/${pk}`).then(response => {


    const respuesta = response.data
    const maps = respuesta.maps

    var mapa = ''

    for(let i = 0; i < maps.length; i++){
      if(maps[i].pk === pk){
        console.log('Esta en el if correcto')
        mapa = maps[i];
        break
      }
    }
    if(mapa === ''){
      $q.loading.hide()
      router.push('/error404');
      return false
    }else{
      $q.loading.hide()
      return true
    }

  })

}

export {BuscarMapaPk};
