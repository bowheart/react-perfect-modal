import React, { Component, createRef } from 'react'
import { Transition } from 'react-transition-group'

import ModalUi from './ModalUi'

export default class ModalTransition extends Component {
  static defaultProps = {
    animation: {
      duration: 300,
      from: {
        marginTop: 100
      },
      to: {
        marginTop: 0
      },
      wrapperFrom: {
        opacity: 0
      },
      wrapperTo: {
        opacity: 1
      }
    },
    onClose: () => {}
  }

  scrollWrapper = createRef()

  componentDidMount() {
    if (typeof window === 'undefined') return

    this.originalOverflow = document.body.style.overflow
    this.setOverflow()

    window.addEventListener('resize', this.setOverflow)
    window.addEventListener('keydown', this.handleEscape)
  }

  componentDidUpdate() {
    this.setOverflow()
  }

  componentWillUnmount() {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.setOverflow)
    window.removeEventListener('keydown', this.handleEscape)

    this.restoreOverflow()
  }

  close = ({ currentTarget, target }) => {
    if (target !== currentTarget) {
      return // Not a click on the overlay
    }

    this.props.onClose()
  }

  handleEscape = ({ which }) => {
    if (!this.props.close.esc) return

    if (which === 27) this.props.onClose()
  }

  restoreOverflow = () => {
    document.body.style.overflow = this.originalOverflow
    document.body.style.paddingRight = 0
  }

  setOverflow = () => {
    const scrollWrapper = this.scrollWrapper.current

    if (!scrollWrapper || typeof window === 'undefined') return

    const modalHeight = scrollWrapper.scrollHeight
    const windowHeight = window.innerHeight
    const hideBodyOverflow = modalHeight > windowHeight

    if (!hideBodyOverflow) return this.restoreOverflow()

    const bodyHeight = document.body.scrollHeight
    const bodyHasOverflow = bodyHeight > windowHeight

    document.body.style.overflowY = 'hidden'
    document.body.style.paddingRight = bodyHasOverflow
      ? window.innerWidth - document.body.clientWidth - 1 + 'px'
      : 0
  }

  render() {
    const { animation, isOpen } = this.props

    return (
      <Transition
        appear
        in={isOpen}
        mountOnEnter
        onEnter={this.setOverflow}
        onExited={this.restoreOverflow}
        timeout={animation.duration}
      >
        {status => (
          <ModalUi
            {...this.props}
            onClose={this.close}
            scrollWrapper={this.scrollWrapper}
            status={status}
          />
        )}
      </Transition>
    )
  }
}
