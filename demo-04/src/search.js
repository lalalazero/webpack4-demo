import React from 'react'
import ReactDOM from 'react-dom'
import './search.css'
import './search.less'

class Search extends React.Component {

    render() {
        return <div className="search-text-wrapper">
            <span className="search-text">Search Text</span>
        </div>
    }
}

ReactDOM.render(<Search />, document.getElementById('root'))