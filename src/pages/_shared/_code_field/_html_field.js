import { Component } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale'

import {UnControlled as CodeMirror} from 'react-codemirror2'
import {CodeMirrorMode} from 'codemirror/mode/htmlmixed/htmlmixed'
import stylesCodemirror from 'codemirror/lib/codemirror.css'
import stylesMaterial from 'codemirror/theme/material.css'
import styles from './styles.scss'



class Model extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    let self = this
    return(
      <>
        <CodeMirror
          value={self.props.val}
          className={styles['react-codemirror2']}
          options={{
            mode: 'htmlmixed',
            theme: 'material',
            lineNumbers: true
          }}
          onChange={self.props.onChange}
        />
      </>
    )
  }
  
}


export default Model