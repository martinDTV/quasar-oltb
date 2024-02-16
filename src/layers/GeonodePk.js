import {apiMapaPk} from 'boot/axios';

async function BuscarMapaPk(pk){
  console.log(pk)
  await apiMapaPk.get( + `/${pk}`).then(response => {
    const respuesta = response.data
    console.log(respuesta)
  })

}

export {BuscarMapaPk};
