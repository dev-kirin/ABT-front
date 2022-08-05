import projectService from '@/services/project'
import deepmerge from 'deepmerge'
import UUID from 'uuid/v4'

export default {
  namespace: 'project',

  state: {
    project: {
      pclient_id: '',
      id: '',
      title: '',
      status: '',
      project_triggers: [],
      project_action: {
        action_type: '',
        action_detail: {
          html: '',
          css: {}
        },
        callback_js: {},
        exit_condition: 'closed',
      },
    },
  },

  effects: {
    *init({project}, {call, put}){
      const initProject = {
        pclient_id: '',
        id: '',
        title: '',
        status: '',
        project_triggers: [],
        project_action: {
          action_type: '',
          action_detail: {
            html: '',
            css: {}
          },
          callback_js: {},
          exit_condition: 'closed',
        },
      }

      initProject.pclient_id = project.pclient_id

      yield put({
        type: 'show',
        project: initProject
      })
    },

    *fetch({ projectID }, { call, put }) {
      const response = yield call(projectService.queryFindByID,{ projectID })
      let respondedProject = response.data
      yield put({
        type: 'show',
        project: respondedProject
      })
    },

    *save({ project }, { call, put }) {
      delete project["errors"]
      const response = yield call(projectService.mutateSave,{ project })
      let respondedProject = response.data
      yield put({
        type: 'show',
        project: respondedProject
      })
    },


    *update_change_project({ project }, { call, put }) {
      if(project.project_action.action_type == 'lightbox'){
        if(!project.project_action.max_enters_per_session){
          project.project_action.max_enters_per_session = 1
        }

        const exit_condition = project.project_action.exit_condition
        if(!exit_condition || exit_condition==''){
          project.project_action.exit_condition = 'closed'
        }
        const css = project.project_action.action_detail.css
        if(!css || Object.keys(css).length === 0){
          project.project_action.action_detail.css = {
            background: "white",
            border: "1px solid black",
            height: "450px",
            width: "500px",
          }
        }
        else{
          if (typeof(css) == 'string'){
            try{
              const _css = JSON.parse(css)
              project.project_action.action_detail.css = _css
            }catch(err){}
          }
        }
      }
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
