import {apiMapaPk} from 'boot/axios';

function BuscarMapaPk(pk){
  console.log(pk)
  apiMapaPk.get( + `/${pk}`).then(response => {
    const respuesta = response.data
    console.log(respuesta)
  })

}

export {BuscarMapaPk};
