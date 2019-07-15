import { Component } from 'react'
import { connect } from 'dva'

import ProjectForm from '../_shared/_form'

@connect(({ project, loading }) => ({ 
  project,
  loading,
}))


class Page extends Component {
  constructor(props) {
    super(props)

    this.fetchProject()
  }


  fetchProject(){
    let projectID = this.props.match.params.id
    this.props.dispatch({
      type: 'project/fetch',
      payload: {
        id: projectID
      }
    })
  }

  render(){
    return(
      <div style={{ padding: 10 }}>
        <ProjectForm />
      </div>
    )
  }
}


export default Page