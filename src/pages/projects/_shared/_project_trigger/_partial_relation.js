import { Component } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/RemoveCircle'

import CodeHtmlField from '@/pages/_shared/_code_field/_html_field'


@connect(({ loading }) => ({ loading }))


class Page extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange({event, key, project, trigger}) {
    let val = event.target.value

    if(key == 'match_detail.relation'){
      trigger.match_detail.relation = val
    }
    this.props.dispatch({
      type: 'project/update_change_project',
      project
    })
  }

  selectRelationHtml({self, trigger, project}) {
    return (
      <FormControl fullWidth>
        <InputLabel htmlFor="relation">{formatMessage({ id: 'label.relation' })}</InputLabel>
        <Select
          value={trigger.match_detail.relation}
          onChange={(event)=>{self.handleChange({event, key:'match_detail.relation', trigger, project})}}
        >
          <MenuItem value=''></MenuItem>
          <MenuItem value='and'>And</MenuItem>
          <MenuItem value='or'>Or</MenuItem>
        </Select>
      </FormControl>
    )
  }

  render(){
    let self = this
    let project = self.props.project
    let trigger = self.props.project_trigger

    return(
      <self.selectRelationHtml self={self} project={project} trigger={trigger} />
    )
  }
  
}


export default Page