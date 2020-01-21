import request from '@/services/request'

export default {

  queryFindByClientID: ({ clientID }) => {
    return request.get({path: `/customer-api/v1/clients/${clientID}/projects`})
  },

  queryFindByID: ({ projectID }) => {
    return request.get({path: `/customer-api/v1/projects/${projectID}`})
  },

  mutateSave: ({ project }) => {
    return request.post({path: `/customer-api/v1/projects`, data: {project} })
  },
  

}
