import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const baseURL = 'https://geonode.appsmty.gob.mx/api/v2';

const MapaPk = 'https://geonode.appsmty.gob.mx/api/v2/maps';

const MapaDatasets = 'https://geonode.appsmty.gob.mx/api/v2/datasets'

const apiGeonode = axios.create({baseURL: baseURL})
const apiMapaPk = axios.create({baseURL:MapaPk})
const apiMapDatasets = axios.create({baseURL: MapaDatasets})

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file
  app.config.globalProperties.$apiGeonode = apiGeonode;

  app.config.globalProperties.$apiMapaPk = apiMapaPk;

  app.config.globalProperties.$apiMapaDatasets = apiMapDatasets
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { apiGeonode, apiMapaPk, apiMapDatasets };
