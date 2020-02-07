import { Component } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale'
import router from 'umi/router'
import Link from 'umi/link'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import IOSSwitch from '@/pages/_shared/_field/_switch'
import ProjectTriggers from '@/pages/projects/_shared/_project_trigger/_index'
import ProjectAction from '@/pages/projects/_shared/_project_action/_index'
import ProjectPreview from '@/pages/projects/_shared/_preview/_index'

import styles from '@/pages/projects/styles.scss'

@connect(({ project, loading }) => ({ projectModel:project, loading }))
class Page extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleClickSave = this.handleClickSave.bind(this)
  }

  handleChange({event, key, project}) {
    const val = event.target.value
    if(key == 'status'){
      const checked = event.target.checked
      if(checked){
        project[key] = "active"
      }
      else{
        project[key] = "inactive"
      }
    }
    else{
      project[key] = val
    }
    this.props.dispatch({
      type: 'project/update_change_project',
      project
    })
  }

  handleClickSave(){
    const self = this
    const model = self.props.projectModel
    const project = model.project

    self.props.dispatch({
      type: 'project/save',
      project,
    }).then(()=>{
      const url = self.backUrl()
      router.push(url)
    })
  }

  backUrl(){
    const self = this
    const project = self.props.projectModel.project
    const url = `/pclients/${project.pclient_id}`
    return url
  }

  getEditorHtml(){
    let self = this
    let model = this.props.projectModel
    let project = model.project

    return(
      <div style={{"height": "600px", "overflow": "scroll"}}>
        <Grid item xs={12} md={12}>
          <FormControlLabel
            control={
              <IOSSwitch
                checked={project.status=='active'}
                onChange={(event)=>{self.handleChange({event, key:'status', project})}}
                value="active"
              />
            }
            label={formatMessage({ id: 'title.active' })}
          />
        </Grid>
        <Box mt={2} mb={2}> <Divider /> </Box>
        
        <h4>{formatMessage({ id: 'title.basic_info' })}</h4>
        <Grid item xs={12} md={12}>
          <TextField
            label={formatMessage({ id: 'label.title' })}
            value={project.title}
            onChange={(event)=>{self.handleChange({event, key:'title', project})}}
            type="text"
            fullWidth
          />
        </Grid>
        <Box mt={2} mb={2}> <Divider /> </Box>

        

        <h4>{formatMessage({ id: 'title.triggers' })}</h4>
        <ProjectTriggers project={project} project_triggers={project.project_triggers} />
        <Box mt={2} mb={2}> <Divider /> </Box>

        <h4>{formatMessage({ id: 'title.action' })}</h4>
        <ProjectAction project={project} project_action={project.project_action} />
        <Box mt={2} mb={2}> <Divider /> </Box>
      </div>
    )
  }

  getPreviewHtml(){
    let self = this
    let model = this.props.projectModel
    let project = model.project
    return (
      <>
        <ProjectPreview project={project} project_action={project.project_action} />
      </>
    )
  }

  render(){
    let self = this
    let editorHtml = self.getEditorHtml()
    let previewerHtml = self.getPreviewHtml()

    return(
      <Grid container spacing={2} styles={{flexGrow: 1}}>
        <Grid item xs={12} md={6} className={styles.project_editor_box}>
          <Grid container spacing={0} alignItems="center" styles={{flexGrow: 1}}>
            <Grid item xs={3} md={3}>
              <Link to={self.backUrl()}>{formatMessage({ id: 'label.back' })}</Link>
            </Grid>
            <Grid item xs={5} md={5}>
              <h2>{formatMessage({ id: 'title.edit_project' })}</h2>
            </Grid>
            <Grid item xs={4} md={4}>
              <Button variant="contained" size="small" color="primary" 
                fullWidth onClick={self.handleClickSave}>
                <SaveIcon /> {formatMessage({ id: 'label.save' })}
              </Button>
            </Grid>
          </Grid>

          <Box mt={2} mb={2}> <Divider /> </Box>
          {editorHtml}
        </Grid>

        <Grid item xs={12} md={6} className={styles.project_preview_box}>
          <h2>{formatMessage({ id: 'title.preview' })}</h2>
          <Box mt={2} mb={2}> <Divider /> </Box>
          {previewerHtml}
        </Grid>
      </Grid>
    )
  }
  
}


export default Page