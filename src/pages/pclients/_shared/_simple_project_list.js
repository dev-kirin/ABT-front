import { Component } from 'react'
import { connect } from 'dva'

import { makeStyles } from '@material-ui/core/styles'
import SimpleProjectItem from './_simple_project_item'
import List from '@material-ui/core/List'

@connect(({ loading }) => ({ loading }))
class Page extends Component {
  constructor(props) {
    super(props)    
  }

  listHtml({self}){
    const pclient = self.props.pclient
    const projects = self.props.projects
    const useStyles = makeStyles(theme => ({
      root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
    }))
    const classes = useStyles()

    let listHtml = []
    for(let i = 0; i<projects.length; i++){
      let item = projects[i]
      let itemHtml = (
        <SimpleProjectItem pclient={pclient} project={item} key={item.id} />
      )
      listHtml.push(itemHtml)
    }

    return(
      <div className={classes.root}>
        <List component="nav" aria-label="">
          {listHtml}
        </List>
      </div>
    )
  }

  render(){
    const self = this
    return(
      <self.listHtml self={self} />
    )
  }
}


export default Page