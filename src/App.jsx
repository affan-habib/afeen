import React from 'react'
import { ObjectSelectionProvider } from './context/ObjectSelectionContext'
import CanvasEditor from './CanvasEditor'

const App = () => {
  return (
    <ObjectSelectionProvider>
      <CanvasEditor />
    </ObjectSelectionProvider>
  )
}

export default App
