import React from 'react'
import ReactDOM from 'react-dom'
import './search.css'
import './search.less'
import logo from './images/logo.png'

class Search extends React.Component {

    render() {
        return <div className="search-text-wrapper">
            <span className="search-text">Search Text 测试热更新</span>
            <img src={logo}></img>
        </div>
    }
}

ReactDOM.render(<Search />, document.getElementById('root'))