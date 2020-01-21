import request from '@/services/request'

export default {

  queryFindByID: ({ id }) => {
    return request.get(`/customer-api/v1/clients/${id}`)
  },
  
}
