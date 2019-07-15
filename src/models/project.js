import projectService from '@/services/project'
import deepmerge from 'deepmerge'

export default {
  namespace: 'project',

  state: {
    project: {
      id: '',
      title: '',
      status: '',
      project_triggers: [],
      project_action: {
        action_type: '',
        action_detail: {},
      },
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(projectService.queryFindByID,{ id: payload.id })
      yield put({
        type: 'show',
        payload: response
      })
    },

    *update({ payload }, { call, put }) {
      yield put({
        type: 'after_upadte',
        payload: payload
      })
    },

    *save({ payload }, { call, put }) {
      let project = payload.project
      const response = yield call(projectService.mutateSave,{ project })
      yield put({
        type: 'show',
        payload: response
      })
    },
  },

  reducers: {
    show(state, action) {
      let project = action.payload.data
      let d = {
        ...state,
        project: project,
      }
      return d
    },

    after_upadte(state, action) {
      let project = state.project
      let update_attr = action.payload.update_attr
      let result = deepmerge(project, update_attr)
     
      let d = {
        ...state,
        project: result
      }
      return d
    },
  },
}
