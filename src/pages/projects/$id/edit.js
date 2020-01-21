import { Component } from 'react'
import { connect } from 'dva'

import ProjectForm from '../_shared/_form'

@connect(({ loading }) => ({ loading }))

class Page extends Component {
  constructor(props) {
    super(props)

    this.fetchProject()
  }


  fetchProject(){
    let projectID = this.props.match.params.id
    this.props.dispatch({
      type: 'project/fetch',
      projectID,
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