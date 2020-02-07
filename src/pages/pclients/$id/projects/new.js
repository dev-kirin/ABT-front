import { Component } from 'react'
import { connect } from 'dva'

import ProjectForm from '@/pages/projects/_shared/_form'

@connect(({ project, loading }) => ({ projectModel:project, loading }))
class Page extends Component {
  constructor(props) {
    super(props)

    this.initProject()
  }

  initProject(){
    let pclientID = this.props.match.params.id
    let project = {
      pclient_id: pclientID
    }

    this.props.dispatch({
      type: 'project/init',
      project
    })
  }

  render(){
    return(
      <div style={{ padding: 8 }}>
        <ProjectForm />
      </div>
    )
  }
}


export default Page