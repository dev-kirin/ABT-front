import { Component } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/AddCircle'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import TriggerUrl from './_trigger_url'
import TriggerExitIntent from './_trigger_exit_intent'
import TriggerDeviceType from './_trigger_device_type'

@connect(({ loading }) => ({ loading }))


class Page extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDeleteProjectTrigger = this.handleDeleteProjectTrigger.bind(this)
    this.handleAddProjectTrigger = this.handleAddProjectTrigger.bind(this)
  }

  handleChange({event, key, trigger, project}){
    let val = event.target.value

    if(key == 'match_type'){
      trigger.match_type = val
      if(val == 'exit_intent'){
        trigger.match_detail.relation = 'or'
        trigger.match_detail.conditions = [{'str': 'top'}]
      }
      else if(val == 'device_type'){
        trigger.match_detail.relation = 'or'
        trigger.match_detail.conditions = [{'str': 'desktop'}]
      }
      else if(val == 'url'){
        trigger.match_detail.relation = 'or'
        trigger.match_detail.conditions = [{'rule': 'contains', 'str': ''}]
      }
    }

    this.props.dispatch({
      type: 'project/update_change_project',
      project
    })
  }

  handleDeleteProjectTrigger({event, project, trigger}){
    this.props.dispatch({
      type: 'project/update_delete_project_trigger',
      project,
      trigger
    })
  }

  handleAddProjectTrigger({event, project}){
    this.props.dispatch({
      type: 'project/update_add_project_trigger',
      project,
    })
  }


  projectTriggerHtml({self, project, trigger}) {
    let basicForm = (
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs={10} md={10}>
          <FormControl fullWidth>
            <InputLabel htmlFor="match_type">{formatMessage({ id: 'label.match_type' })}</InputLabel>
            <Select
              value={trigger.match_type}
              onChange={(event)=>{self.handleChange({event, key:'match_type', trigger, project})}}
            >
              <MenuItem value=''></MenuItem>
              <MenuItem value='url'>URL</MenuItem>
              <MenuItem value='device_type'>Device Type</MenuItem>
              <MenuItem value='exit_intent'>Exit Intent</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} md={2}>
          <Button variant="text" size="small" 
            className="" 
            onClick={(event)=>{self.handleDeleteProjectTrigger({event, project, trigger})}}>
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    )

    let detailForm = ""
    if(trigger.match_type == 'url'){
      detailForm = (<TriggerUrl project={project} project_trigger={trigger} />)
    }
    else if(trigger.match_type == 'device_type'){
      detailForm = (<TriggerDeviceType project={project} project_trigger={trigger} />)
    }
    else if(trigger.match_type == 'exit_intent'){
      detailForm = (<TriggerExitIntent project={project} project_trigger={trigger} />)
    }

    let divider = (<Box mt={2} mb={2}> <Divider /> </Box>)
    let grouped = (<>{basicForm} {detailForm}</>)


    return(
      <Card className="card">
        <CardActions>
          
        </CardActions>
        <CardContent>
          <Grid container spacing={1}>
            {grouped}
          </Grid>
        </CardContent>
      </Card>
    )
  }
  
  projectTriggersListHtml({self, project, triggers}){
    let allTriggersHtml = []
    for(let trigger of triggers){
      let r = (<self.projectTriggerHtml self={self} project={project} trigger={trigger} key={trigger.id} />)
      allTriggersHtml.push(r)
    }

    return (
      <>{allTriggersHtml}</>
    )
  }

  projectTriggerAddHtml({self, project}){
    return(
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={12}>
          <Button variant="contained" size="small"
            fullWidth
            onClick={(event)=>{self.handleAddProjectTrigger({event, project})}}>
            <AddIcon /> {formatMessage({ id: 'label.trigger' })}
          </Button>
        </Grid>
      </Grid>
    )
  }

  render(){
    let self = this
    let project = self.props.project
    let triggers = self.props.project_triggers

    return(
      <>
        <self.projectTriggersListHtml self={self} project={project} triggers={triggers} />
        <self.projectTriggerAddHtml self={self} project={project} />
      </>
    )
  }
  
}


export default Page