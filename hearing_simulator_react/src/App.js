import AudioPage from './components/audioPage';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
    return( 
        <div>
            <Provider store={store}>
                <BrowserRouter>
                    <AudioPage/>
                </BrowserRouter>
            </Provider>
        </div>
     )
}

export default App
