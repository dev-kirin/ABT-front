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

import CodeHtmlField from '@/pages/_shared/_code_field/_html_field'

import PartialRelation from './_partial_relation'
import PartialConditionList from './_partial_condition_rule_str_list'

@connect(({ loading }) => ({ loading }))


class Page extends Component {
  constructor(props) {
    super(props)
  }

  triggerHtml({self, project, trigger}){
    let html = (
      <>
        <Grid item xs={12} md={12}>
          <PartialRelation project={project} project_trigger={trigger} />
        </Grid>
        <PartialConditionList self={self} project={project} project_trigger={trigger} />
     </>
    )
    
    return html
  }


  render(){
    let self = this
    let project = self.props.project
    let trigger = self.props.project_trigger

    return(
      <>
        <self.triggerHtml self={self} project={project} trigger={trigger} />
      </>
    )
  }
  
}


export default Page