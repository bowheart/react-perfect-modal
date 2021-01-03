import React, { Component } from 'react'
import {
  any,
  bool,
  func,
  node,
  number,
  objectOf,
  shape,
  string
} from 'prop-types'

const getTransitionProperties = obj => {
  Object.keys(obj)
    .map(key => key.replace(/([A-Z])/g, '-$1'))
    .toString()
}

export default class ModalUi extends Component {
  static propTypes = {
    animation: shape({
      duration: number
    }),
    children: node,
    className: string,
    close: shape({}),
    isOpen: bool.isRequired,
    onClose: func,
    overlayClassName: string,
    overlayStyle: objectOf(number, string),
    scrollWrapper: shape({
      current: any
    }).isRequired,
    status: string.isRequired,
    style: objectOf(number, string)
  }

  render() {
    const {
      animation,
      children,
      className,
      close,
      isOpen,
      onClose,
      overlayClassName,
      overlayStyle,
      scrollWrapper,
      status,
      style
    } = this.props

    return (
      <div
        style={wrapperStyle(
          animation,
          ['entering', 'entered'].includes(status)
        )}
      >
        <div
          className={overlayClassName}
          onClick={close.overlay && onClose}
          style={{
            ...defaultOverlayStyle,
            ...overlayStyle
          }}
        />
        <div onClick={onClose} ref={scrollWrapper} style={scrollWrapperStyle}>
          <div
            className={className}
            style={{
              ...modalStyle(
                animation,
                ['entering', 'entered'].includes(status)
              ),
              ...style
            }}
          >
            {children}
          </div>
          <div style={padBottomStyle()}>&nbsp;</div>
        </div>
      </div>
    )
  }
}

const defaultOverlayStyle = {
  background: 'rgba(0, 0, 0, 0.3)',
  content: '',
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%'
}

const modalStyle = ({ duration, from, to }, isOpen) => ({
  background: '#fff',
  cursor: 'auto',
  padding: '20px',
  transitionDuration: `${duration}ms`,
  transitionProperty: getTransitionProperties(from),
  zIndex: 1,
  ...(isOpen ? to : from)
})

const scrollWrapperStyle = {
  alignItems: 'center',
  boxSizing: 'border-box',
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'flex-start',
  maxHeight: '100%',
  overflowY: 'auto',
  padding: '30px 15px 0',
  position: 'relative',
  width: '100%',
  zIndex: 1
}

const padBottomStyle = (height = '30px') => ({
  flexShrink: 0,
  height
})

const wrapperStyle = ({ duration, wrapperFrom, wrapperTo }, isOpen) => ({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  transitionDuration: `${duration}ms`,
  transitionProperty: getTransitionProperties(wrapperFrom),
  width: '100%',
  ...(isOpen ? wrapperTo : wrapperFrom)
})
