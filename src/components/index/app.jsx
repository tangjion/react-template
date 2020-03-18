import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { indexStore } from '../../stores/actionCreators'

import './app.scss'

const Index = (props) => {
  const { indexData } = props;
  return (
    <Fragment>
      <div>index{indexData}</div>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    indexData: state.indexData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeIndexData() {
      dispatch(indexStore('首页数据'))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Index);