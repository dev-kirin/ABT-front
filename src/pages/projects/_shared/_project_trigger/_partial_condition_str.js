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
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleChange({event, key, project, trigger, condition}) {
    let val = event.target.value

    if(key == 'match_detail.conditions.rule'){
      condition.rule = val
    }
    else if(key == 'match_detail.conditions.str'){
      condition.str = val
    }

    this.props.dispatch({
      type: 'project/update_change_project',
      project
    })
  }

  handleDelete({event, project, trigger, condition}){
    let foundIndex = trigger.match_detail.conditions.findIndex((i)=>{return i==condition})
    trigger.match_detail.conditions.splice(foundIndex, 1)

    this.props.dispatch({
      type: 'project/update_change_project',
      project
    })
  }

  conditionSingleHtml({self, project, trigger, condition, items_list}){
    let list = []
    for(let i=0; i<items_list.length; i++){
      let item = items_list[i]
      let itemHtml = (<MenuItem value={item.val} key={i}>{item.name}</MenuItem>)
      list.push(itemHtml)
    }
    return (
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs={10} md={10}>
          <FormControl fullWidth>
            <Select
              value={condition.str}
              onChange={(event)=>{self.handleChange({event, key:'match_detail.conditions.str', trigger, project, condition})}}
            >
              {list}
            </Select>
          </FormControl>      
        </Grid>
        <Grid item xs={2} md={2}>
          <Button variant="text" size="small"
            onClick={(event)=>{self.handleDelete({event, project, trigger, condition})}}>
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    )
  }

  render(){
    let self = this
    let { project, project_trigger, condition, items_list } = self.props

    return(
      <self.conditionSingleHtml self={self} project={project} trigger={project_trigger} condition={condition} items_list={items_list} />
    )
  }
  
}


export default Page