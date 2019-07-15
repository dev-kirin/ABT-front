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

@connect(({ project, loading }) => ({ project, loading }))


class Page extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, key){
    let val = event.target.value
    let payload = {update_attr: {project_action: {}}}
    payload.update_attr.project_action[key] = val

    this.props.dispatch({
      type: 'project/update',
      payload: payload
    })
  }

  getHtml(){
    let self = this
    let action = self.props.project_action

    let basicForm = (
      <Grid item xs={12} md={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="action_type">{formatMessage({ id: 'label.action_type' })}</InputLabel>
          <Select
            value={action.action_type}
            onChange={(e)=>{self.handleChange(e, 'action_type')}}
          >
            <MenuItem value=''></MenuItem>
            <MenuItem value='lightbox'>Lightbox</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    )

    let form = ""

    if(action.action_type == 'lightbox'){
      form = (<Lightbox project_action={action} />)
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