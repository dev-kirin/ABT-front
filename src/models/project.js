import projectService from '@/services/project'
import deepmerge from 'deepmerge'
import UUID from 'uuid/v4'

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
    *fetch({ projectID }, { call, put }) {
      const response = yield call(projectService.queryFindByID,{ projectID })
      let respondedProject = response.data
      yield put({
        type: 'show',
        project: respondedProject
      })
    },

    *save({ project }, { call, put }) {
      const response = yield call(projectService.mutateSave,{ project })
      let respondedProject = response.data
      yield put({
        type: 'show',
        project: respondedProject
      })
    },


    *update_change_project({ project }, { call, put }) {
      yield put({
        type: 'show',
        project,
      })
    },

    *update_add_project_trigger({ project }, { call, put }) {
      let newId = `temp-${UUID()}`
      
      let trigger = {
        id: newId,
        match_type: '',
        match_detail: {
          relation: '',
          conditions: []
        }
      }
      project.project_triggers.push(trigger)

      yield put({
        type: 'show',
        project,
      })
    },

    *update_delete_project_trigger({ project, trigger }, { call, put }) {
      let foundIndex = project.project_triggers.findIndex((i)=>{return i.id==trigger.id})
      project.project_triggers.splice(foundIndex, 1)
      yield put({
        type: 'show',
        project,
      })
    },

  },

  reducers: {
    show(state, {project}) {
      let d = {
        ...state,
        project
      }
      return d
    },

  },
}
