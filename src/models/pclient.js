import pclientService from '@/services/pclient'

export default {
  namespace: 'pclient',

  state: {
    pclient: {
      id: '',
      name: '',
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(pclientService.queryFindByID,{ id: payload.id });
      yield put({
        type: 'show',
        payload: response
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
