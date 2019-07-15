import { Component } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

import ProjectAction from '@/pages/projects/_shared/_project_action/_index'
import ProjectPreview from '@/pages/projects/_shared/_preview/_index'

import styles from '@/pages/projects/styles.scss'

@connect(({ project, loading }) => ({ project, loading }))


class Page extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleClickSave = this.handleClickSave.bind(this)
  }

  handleChange(event, key) {
    
  }

  handleClickSave(){
    let self = this
    let model = this.props.project
    let project = model.project

    self.props.dispatch({
      type: 'project/save',
      payload: {project: project}
    })
  }

  getEditorHtml(){
    let self = this
    let model = this.props.project
    let project = model.project

    return(
      <>
        <Grid item xs={12} md={12}>
          <TextField
            label={formatMessage({ id: 'label.title' })}
            value={project.title}
            onChange={(event)=>{this.handleChange(event, 'title')}}
            type="text"
            fullWidth
          />
        </Grid>

        <ProjectAction project={project} project_action={project.project_action} />

        <Box m={3} />

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
    let model = this.props.project
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} className={styles.project_editor_box}>
           {editorHtml}
        </Grid>
        <Grid item xs={12} md={6} className={styles.project_preview_box}>
           {previewerHtml}
        </Grid>
      </Grid>
    )
  }
  
}


export default Page