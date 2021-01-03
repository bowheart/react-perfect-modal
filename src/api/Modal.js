import React, { Component, createRef } from 'react'
import { createPortal } from 'react-dom'
import { Transition } from 'react-transition-group'
import { bool, func } from 'prop-types'

import ModalTransition from '../utils/ModalTransition'
import { withFlairContext } from '../utils/FlairContext'

export const Modal = withFlairContext(
  class Modal extends Component {
    componentDidMount() {
      this.props.context.addModal(this)
    }

    componentWillUnmount() {
      this.props.context.removeModal(this)
    }

    render() {
      const { context, ...props } = this.props

      // Allow per-modal props to override the global context.
      const config = { ...context, ...props }
      const { root } = config

      if (!root) return null // wait for the portal element to be rendered

      const isOpen = context.isVisibleModal(this) && config.isOpen

      return createPortal(<ModalTransition {...config} isOpen={isOpen} />, root)
    }
  }
)
