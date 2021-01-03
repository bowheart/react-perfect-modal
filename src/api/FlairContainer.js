import React, { Component } from 'react'
import { bool, instanceOf, shape } from 'prop-types'

import { FlairContext } from '../utils/FlairContext'

export class FlairContainer extends Component {
  static defaultProps = {
    close: {
      esc: true,
      icon: false,
      overlay: true
    }
  }

  static propTypes = {
    close: shape({
      esc: bool,
      icon: bool,
      overlay: bool
    }),
    root: instanceOf(Node)
  }

  state = {
    modalStack: [],
    root: null
  }

  addModal = modal => {
    this.setState(state => ({
      modalStack: [...state.modalStack, modal]
    }))
  }

  isVisibleModal = modal => {
    const { modalStack } = this.state

    console.log(
      'isVisibleModal?',
      modal === modalStack[modalStack.length - 1],
      modalStack.length
    )

    return modal === modalStack[modalStack.length - 1]
  }

  removeModal = modal => {
    this.setState(state => ({
      modalStack: state.modalStack.filter(nextModal => nextModal !== modal)
    }))
  }

  setRoot = root => {
    this.setState({ root })
  }

  render() {
    const { addModal, isVisibleModal, props, removeModal, state } = this
    const { children, close, root } = props
    const { modalStack } = state

    return (
      <FlairContext.Provider
        value={{
          addModal,
          close,
          isVisibleModal,
          modalStack,
          removeModal,
          root: root || state.root
        }}
      >
        {!root && <div ref={this.setRoot} />}
        {this.props.children}
      </FlairContext.Provider>
    )
  }
}
