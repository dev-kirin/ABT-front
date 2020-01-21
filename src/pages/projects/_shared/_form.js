import { Component } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

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
    let val = event.target.value
    project[key] = val
    this.props.dispatch({
      type: 'project/update_change_project',
      project
    })
  }

  handleClickSave(){
    let model = this.props.projectModel
    let project = model.project

    this.props.dispatch({
      type: 'project/save',
      project,
    })
  }

  getEditorHtml(){
    let self = this
    let model = this.props.projectModel
    let project = model.project

    return(
      <>
        <h4>{formatMessage({ id: 'title.basic_info' })}</h4>
        <Grid item xs={12} md={12}>
          <TextField
            label={formatMessage({ id: 'label.title' })}
            value={project.title}
            onChange={(event)=>{this.handleChange({event, key:'title', project})}}
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

        <Grid item xs={12} md={12}>
          <Button variant="contained" size="small" color="primary" 
            fullWidth onClick={self.handleClickSave}
          >
            <SaveIcon /> Save
          </Button>
        </Grid>
      </>
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
      <Grid container spacing={3} styles={{flexGrow: 1}}>
        <Grid item xs={12} md={6} className={styles.project_editor_box}>
          <h2>{formatMessage({ id: 'title.edit_project' })}</h2>
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