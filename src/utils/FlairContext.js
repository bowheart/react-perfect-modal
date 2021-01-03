import React from 'react'
import { createContext } from 'react'

export const FlairContext = createContext({})

export const withFlairContext = WrappedComponent =>
  function WithFlairContext(props) {
    return (
      <FlairContext.Consumer>
        {context => <WrappedComponent {...props} context={context} />}
      </FlairContext.Consumer>
    )
  }
