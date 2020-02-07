import { Component } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'

import CodeHtmlField from '@/pages/_shared/_code_field/_html_field'
import CodeJSField from '@/pages/_shared/_code_field/_js_field'


@connect(({ loading }) => ({ loading }))


class Page extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleCodeChange = this.handleCodeChange.bind(this)
  }

  handleCodeChange({editor, key, project, action}) {
    let val = editor.getValue()

    if(key == 'action_detail.html'){
      action.action_detail.html = val
    }
    else if(key == 'callback_js.before_enter'){
      action.callback_js.before_enter = val
    }
    else if(key == 'callback_js.after_enter'){
      action.callback_js.after_enter = val
    }
    else if(key == 'callback_js.before_close'){
      action.callback_js.before_close = val
    }
    else if(key == 'callback_js.after_close'){
      action.callback_js.after_close = val
    }
    else{

    }

    this.props.dispatch({
      type: 'project/update_change_project',
      project
    })
  }

  handleChange({event, key, project, action}) {
    const val = event.target.value
    action[key] = val
    this.props.dispatch({
      type: 'project/update_change_project',
      project
    })
  }

  getActionHtml(){
    let self = this
    let project = self.props.project
    let action = self.props.project.project_action
    let html = (
      <>
        <Box m={5} />

        <Grid item xs={12} md={12}>
          <Grid item xs={12} md={12}>
            <TextField
              label={formatMessage({ id: 'label.max_enters_per_session' })}
              value={action.max_enters_per_session}
              onChange={(event)=>{self.handleChange({event, key:'max_enters_per_session', project, action})}}
              type="text"
              fullWidth
            />
          </Grid>
          <Box mt={2} mb={4}></Box>

          <InputLabel shrink={true}>{formatMessage({ id: 'label.html' })}</InputLabel>
          <CodeHtmlField 
            val={action.action_detail.html} 
            onBlur={(editor, data, val)=>{self.handleCodeChange({editor, key:'action_detail.html', project, action})}} 
          />

          <InputLabel shrink={true}>{formatMessage({ id: 'label.before_enter_js' })}</InputLabel>
          <CodeJSField 
            val={action.callback_js.before_enter} 
            onBlur={(editor, data, val)=>{self.handleCodeChange({editor, key:'callback_js.before_enter', project, action})}} 
          />

          <InputLabel shrink={true}>{formatMessage({ id: 'label.after_enter_js' })}</InputLabel>
          <CodeJSField 
            val={action.callback_js.after_enter} 
            onBlur={(editor, data, val)=>{self.handleCodeChange({editor, key:'callback_js.after_enter', project, action})}} 
          />

          <InputLabel shrink={true}>{formatMessage({ id: 'label.before_close_js' })}</InputLabel>
          <CodeJSField 
            val={action.callback_js.before_close} 
            onBlur={(editor, data, val)=>{self.handleCodeChange({editor, key:'callback_js.before_close', project, action})}} 
          />

          <InputLabel shrink={true}>{formatMessage({ id: 'label.after_close_js' })}</InputLabel>
          <CodeJSField 
            val={action.callback_js.after_close} 
            onBlur={(editor, data, val)=>{self.handleCodeChange({editor, key:'callback_js.after_close', project, action})}} 
          />
        </Grid>
     </>
    )

    
    return html
  }


  render(){
    let self = this
    let html = self.getActionHtml()

    return(
      <>
        {html}
      </>
    )
  }
  
}


export default Page