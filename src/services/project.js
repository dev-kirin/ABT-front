import request from '@/services/request'

export default {

  queryFindByClientID: ({ pclientID }) => {
    return request.get({path: `/customer-api/v1/pclients/${pclientID}/projects`})
  },

  queryFindByID: ({ projectID }) => {
    return request.get({path: `/customer-api/v1/projects/${projectID}`})
  },

  mutateSave: ({ project }) => {
    return request.post({path: `/customer-api/v1/projects`, data: {project} })
  },
  

}
