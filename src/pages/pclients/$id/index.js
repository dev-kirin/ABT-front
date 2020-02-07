import { Component } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale'
import { Link } from "react-router-dom"

import Button from '@material-ui/core/Button'
import SimpleProjectList from '../_shared/_simple_project_list'

@connect(({ pclient, loading }) => ({ pclientModel:pclient, loading }))
class Page extends Component {
  constructor(props) {
    super(props)
    this.fetchPclient()
  }

  fetchPclient(){
    let pclientID = this.props.match.params.id
    this.props.dispatch({
      type: 'pclient/fetch',
      pclientID,
    })
  }

  render(){
    const self = this
    const pclient = self.props.pclientModel.pclient
    const projects = pclient.projects
    const linkTo = `/pclients/${pclient.id}/projects/new`

    return(
      <div>
        <div style={{ padding: 8 }}>
          <Button variant="contained" color="primary" component={Link} to={linkTo}>
            {formatMessage({ id: 'title.create_project' })}
          </Button>
        </div>
        <div style={{ padding: 8 }}>
          <SimpleProjectList pclient={pclient} projects={projects} />
        </div>
      </div>
    )
  }
}

export default Page