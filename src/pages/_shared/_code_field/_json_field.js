import { Component } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale'

import {UnControlled as CodeMirror} from 'react-codemirror2'
import {CodeMirrorMode} from 'codemirror/mode/javascript/javascript'
import stylesCodemirror from 'codemirror/lib/codemirror.css'
import stylesMaterial from 'codemirror/theme/material.css'
import styles from './styles.scss'



class Model extends Component {
  constructor(props) {
    super(props)
  }

  formatSelection(code) {
    let beautify = require("js-beautify").js
    return beautify(code, {indent_size: 2})
  }

  render(){
    const self = this
    let val = self.props.val
    try{
      if (typeof(val) == 'object'){
        val = JSON.stringify(val)
      }
    } catch(err){}

    val = self.formatSelection(val)

    return(
      <>
        <CodeMirror
          value={val}
          className={styles['react-codemirror2']}
          options={{
            mode: 'json',
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