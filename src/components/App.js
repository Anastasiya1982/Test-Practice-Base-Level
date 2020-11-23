import React from "react";
import './App.css';
import preloader from '../img/loading.gif';
import {Item} from "./item";

export class App extends React.Component {
    constructor() {
        super();

        this.state={
            items:[],
            isLoader:false,
        };
    }
    //https://www.reddit.com/r/reactjs.json?limit=100
    componentDidMount() {
        this.setState({
            isLoading:true,
        })
        fetch('https://www.reddit.com/r/reactjs.json?limit=100')
            .then(response =>{
               return  response.json();
            })
            .then(({ data })=>{
                this.setState({
                    items:data.children,
                    isLoading:false,
                })
            });
    }

    render() {
        const {items, isLoading} = this.state;
        return (
            <div className='container'>
                <h1 className='header'>Top comment</h1>
                {isLoading ? <div><img src={preloader} alt="preloader"/>LOADING...</div>
                           : items.map(item => <Item key={item.data.id}
                                         data={item.data}
                    />)
                }
            </div>
        );
    }
}
