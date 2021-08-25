import * as React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import RootContainer from './root-container'
import { store, persistor } from '../reducers'
import { Popup } from '../components/shared/popup'
import { PopupService } from '../services/popup'

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootContainer />
          <Popup ref={PopupService.setRef} />
        </PersistGate>
      </Provider>
    )
  }
}

export default App
