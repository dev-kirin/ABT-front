import { Component } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import Lightbox from './_action_lightbox'

@connect(({ loading }) => ({ loading }))


class Page extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange({event, key, project}){
    let val = event.target.value
    project.project_action[key] = val
    this.props.dispatch({
      type: 'project/update_change_project',
      project
    })
  }

  getHtml(){
    let self = this
    let project = self.props.project
    let action = self.props.project.project_action
    

    let basicForm = (
      <Grid item xs={12} md={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="action_type">{formatMessage({ id: 'label.action_type' })}</InputLabel>
          <Select
            value={action.action_type}
            onChange={(event)=>{self.handleChange({event, key:'action_type', project})}}
          >
            <MenuItem value=''></MenuItem>
            <MenuItem value='lightbox'>Lightbox</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    )

    let form = ""

    if(action.action_type == 'lightbox'){
      form = (<Lightbox project={project} project_action={action} />)
    }

    let html = (
      <>
        {basicForm}
        {form}
      </>
    )

    return html
  }

  render(){
    let self = this
    // let model = this.props.model
    // let project = model.project

    let html = self.getHtml()

    return(
      <>
        {html}
      </>
    )
  }
  
}


export default Page