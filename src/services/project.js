import request from '@/services/request'

export default {

  queryFindByClientID: ({ clientID }) => {
    return request.get({path: `/customer-api/v1/clients/${clientID}/projects`})
  },

  queryFindByID: ({ id }) => {
    return request.get({path: `/customer-api/v1/projects/${id}`})
  },

  mutateSave: ({ project }) => {
    return request.post({path: `/customer-api/v1/projects`, data: {project} })
  },
  

}
