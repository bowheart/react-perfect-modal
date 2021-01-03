# React Flair

A hyper-responsive modal component for React

## Another modal?

I've always dreamed of a modal that meets the following criteria:

- *Vertically centered by default.* If the content doesn't fill the screen, the modal sits neatly centered.

- *Expands off the bottom of the screen.* When the modal's content is big enough to fill the screen, the modal's top edge stops growing and the bottom edge continues off the screen.

- *External scrollbar.* When the modal overflows the screen, scrolling moves the whole modal. The scroll bar does not live inside the modal itself.

- *Conditionally prevents body scrolling.*
  - Small modal: Allow body scrolling. The user can see content under the overlay. So let them see it.
  - Big modal (the modal's content overflows the screen): Disable body scrolling. Make all scrolling scroll the modal.

- *Stateless.* Just a component with stuff inside it. Nothing more.

- *Rendered through a portal.* For z-index zen.

- *Composable.* Rendering a modal inside a modal shows only the innermost modal.

- *Animatable.* Entry and exit transitions should be customizable.

- *Customizable.* In fact, every (practical) thing should be customizable. Style overrides should be compatible with all CSS-in-JS solutions.

Sound like a dream? Well it is. But it's also `react-flair`.

## Examples

- [Dynamic content](https://codesandbox.io/s/4n3vrop57)
- [Nested modals](https://codesandbox.io/s/4n3vrop57)
- [Animation playground](https://codesandbox.io/s/4n3vrop57)
- [Use with styled-components](https://codesandbox.io/s/4n3vrop57)

## Some code

The gist:

```js
import React from 'react'
import { FlairContainer, Modal } from 'react-flair'

const App = () => (
  <FlairContainer>
    <Hello />
  </FlairContainer>
)

const Hello = () => (
  <Modal isOpen={true}>
    Hello from inside this awesome modal thing!
  </Modal>
)
```
