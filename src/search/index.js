import React from 'react'
import ReactDOM from 'react-dom'
import './search.css'
import './search.less'
import '../../common';
import logo from '../images/logo.png'
import { a } from '../tree-shaking'

class Search extends React.Component {
    
    render() {
        const f = false
        if (f) {
            console.log('永远不会执行')
        }
        return <div className="search-text-wrapper">
            { a() }
            <span>Search ～～</span>
            <span className="search-text">Search Text 测试热更新信息修测试打包</span>
            <img src={logo}></img>
        </div>
    }
}

ReactDOM.render(<Search />, document.getElementById('root'))