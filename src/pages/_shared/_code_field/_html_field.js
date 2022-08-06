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

  // formatSelection(code) {
  //   let beautify = require("js-beautify").html
  //   return beautify(code, {indent_size: 2})
  // }

  render(){
    let self = this
    // let val = self.formatSelection(self.props.val)
    let val = self.props.val
    return(
      <>
        <CodeMirror
          value={val}
          className={styles['react-codemirror2']}
          options={{
            mode: 'htmlmixed',
            theme: 'material',
            lineNumbers: true
          }}
          onChange={self.props.onChange}
          onBlur={self.props.onBlur}
        />
      </>
    )
  }
  
}


export default Model