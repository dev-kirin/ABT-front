import { Component } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Frame from 'react-frame-component'

@connect(({ project, loading }) => ({ project, loading }))


class Page extends Component {
  constructor(props) {
    super(props)
  }

 
  getHtml(){
    let self = this
    let action = self.props.project_action
    let contentRaw = action.action_detail.html
    let contentHtml = {__html: contentRaw }

    let html = (
      <Frame style={action.action_detail.css}>
        <div dangerouslySetInnerHTML={contentHtml} />
      </Frame>
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