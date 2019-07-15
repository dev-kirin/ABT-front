export const CONFIG = {
  app_host: 'http://localhost:3001',
}

export default {
  get: ({key}) => {
    if(key){
      return CONFIG[key]
    }
    else{
      return CONFIG
    }
  },

}
