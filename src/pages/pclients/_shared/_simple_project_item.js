import { Component } from 'react'
import { connect } from 'dva'

// import Link from 'umi/link'
import { Link } from "react-router-dom"
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined'

@connect(({ loading }) => ({ loading }))
class Page extends Component {
  constructor(props) {
    super(props)
  }

  itemHtml({self}){
    const pclient = self.props.pclient
    const project = self.props.project
    const linkTo = `/projects/${project.id}/edit`

    let icon = null
    if(project.status == 'active'){
      icon = <CheckCircleOutlineOutlinedIcon color="primary" />
    }
    else{
      icon = <RadioButtonUncheckedOutlinedIcon />
    }

    return(
      <ListItem button component={Link} to={linkTo}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={project.title}  />
      </ListItem>
    )
  }

  render(){
    const self = this
    return(
      <self.itemHtml self={self} />
    )
  }
}

export default Page