import React from 'react';
import ReactDOM from 'react-dom';
import './search.css';
import './search.less';
import logo from '../images/logo.png';

class Search extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            Text: null,
        };
    }

    loadComponent() {
        import('../text.js').then((Text) => {
            console.log('...then');
            console.log(Text);
            this.setState({
                Text: Text.default,
            });
        });
    }

    render() {
        const { Text } = this.state;
        console.log('render...');
        console.log(Text);
        return (
          <div className="search-text-wrapper">
                <span>Search ～～</span>
                {
                    Text ? <Text /> : null
                }
                <span className="search-text">Search Text 测试热更新信息修测试打包</span>
                <img src={logo} onClick={this.loadComponent.bind(this)} />
            </div>
        );
    }
}

ReactDOM.render(<Search />, document.getElementById('root'));
