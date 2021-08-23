import React, { PureComponent } from 'react'

import platform from '@obsidians/platform'
import { connect } from '@obsidians/redux'
import Project from '@obsidians/project'

class ProjectWithProps extends PureComponent {
  async componentDidMount () {
    this.props.cacheLifecycles.didRecover(() => {
      window.dispatchEvent(new Event('resize'))
    })
  }

  render () {
    const { projects, uiState, match } = this.props
    const { username, project } = match.params
    const selected = projects.get('selected')?.toJS() || {}

    let type, projectRoot
    if (username === 'local') {
      type = 'Local'
      projectRoot = selected.path
    } else {
      type = 'Remote'
      projectRoot = selected.id ? `${username}/${project}` : undefined
    }

    if (type === 'Local' && platform.isWeb) {
      return null
    }

    return (
      <Project
        theme='obsidians'
        projectRoot={projectRoot}
        type={type}
        signer={uiState.get('signer')}
      />
    )
  }
}

export default connect(['uiState', 'projects'])(ProjectWithProps)
