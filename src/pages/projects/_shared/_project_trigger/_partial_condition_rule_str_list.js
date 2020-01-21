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
import AddIcon from '@material-ui/icons/AddCircle'

import CodeHtmlField from '@/pages/_shared/_code_field/_html_field'
import PartialConditionRuleStr from './_partial_condition_rule_str'


@connect(({ loading }) => ({ loading }))


class Page extends Component {
  constructor(props) {
    super(props)

    this.handleAddCondition = this.handleAddCondition.bind(this)
  }

  handleAddCondition({event, project, trigger}){
    let condition = {rule: '', str: ''}
    trigger.match_detail.conditions.push(condition)
    this.props.dispatch({
      type: 'project/update_change_project',
      project
    })
  }

  conditionAddHtml({self, project, trigger}){
    return(
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs={10} md={10}>
        </Grid>
        <Grid item xs={2} md={2}>
          <Button variant="contained" size="small"
            onClick={(event)=>{self.handleAddCondition({event, project, trigger})}}>
            <AddIcon /> {formatMessage({ id: 'label.rule' })}
          </Button>
        </Grid>
      </Grid>
    )
  }

  conditionListHtml({self, project, trigger}){
    let conditions = trigger.match_detail.conditions
    let list = []
    for(let i=0; i<conditions.length; i++){
      let condition = conditions[i]
      let html = (<PartialConditionRuleStr project={project} project_trigger={trigger} condition={condition} key={i} />)
      list.push(html)
    }
    return (<>{list}</>)
  }

  render(){
    let self = this
    let { project, project_trigger } = self.props
    return(
      <>
        <self.conditionListHtml self={self} project={project} trigger={project_trigger} />
        <Grid container spacing={1} alignItems="flex-end"><Box mt={1} mb={1}> </Box></Grid>
        <self.conditionAddHtml self={self} project={project} trigger={project_trigger} />
      </>
    )
  }
  
}


export default Page