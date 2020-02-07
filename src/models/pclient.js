import projectService from '@/services/project'

export default {
  namespace: 'pclient',

  state: {
    pclient: {
      id: '',
      name: '',
      projects: []
    }
  },

  effects: {
    *fetch({ pclientID }, { call, put }) {
      const response = yield call(projectService.queryFindByClientID,{ pclientID: pclientID });
      let respondedPclient = response.data
      yield put({
        type: 'show',
        payload: respondedPclient
      });
    },
  },

  reducers: {
    show(state, action) {
      let d = {
        ...state,
        pclient: action.payload,
      };
      return d
    },
  },
};
