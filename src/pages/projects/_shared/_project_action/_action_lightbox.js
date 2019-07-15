import { Component } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'

import CodeHtmlField from '@/pages/_shared/_code_field/_html_field'


@connect(({ project, loading }) => ({ project, loading }))


class Page extends Component {
  constructor(props) {
    super(props)

    this.handleCodeChange = this.handleCodeChange.bind(this)
  }

  handleCodeChange(editor, data, val, key) {
    let payload = {update_attr: {project_action: {}}}

    if(key == 'action_detail.html'){
      payload.update_attr.project_action.action_detail = {
        html: val
      }
    }

    this.props.dispatch({
      type: 'project/update',
      payload: payload
    })
  }

  getActionHtml(){
    let self = this
    let action = self.props.project_action
    let html = (
      <>
        <Box m={5} />

        <Grid item xs={12} md={12}>
          <InputLabel shrink={true}>{formatMessage({ id: 'label.html' })}</InputLabel>
          <CodeHtmlField 
            val={action.action_detail.html} 
            onChange={(editor, data, val)=>{self.handleCodeChange(editor, data, val, 'action_detail.html')}} 
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