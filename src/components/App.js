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
            enableAutoRefresh:false,
        };
    }
    //https://www.reddit.com/r/reactjs.json?limit=100
    componentDidMount() {
        this.getItems();
    }

    getItems=()=>{
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
    };

    updateAutoRefresh = () => {
        // if(this.state.enableAutoRefresh){
        //     this.setState({
        //             enableAutoRefresh:false,
        //         });
        //     clearInterval(this.autoRefresh);
        // }else{
        //     this.setState({
        //         enableAutoRefresh:true,
        //     })
        //     this.autoRefresh=setInterval(this.getItems,3000);
        // }

        // Второй вариант , легче читаемая логика

        this.setState(
            state => ({
                enableAutoRefresh: !state.enableAutoRefresh
            }),
            () => {
                if (this.state.enableAutoRefresh) {
                    this.autoRefresh = setInterval(this.getItems, 3000);
                } else {
                    clearInterval(this.autoRefresh);
                }
            }
        );
    }

    render() {
        const { items, isLoading,enableAutoRefresh} = this.state;
        const itemsSortByComments=items.sort(
            (a,b)=>b.data.num_comments-a.data.num_comments
        );

        return (
            <div className='container'>
                <h1 className='header'>Top comment</h1>
                <button type="button" onClick={this.updateAutoRefresh}>
                    {enableAutoRefresh? "Stop":"Start"} auto-refresh</button>

                {isLoading ? <div><img src={preloader} alt="preloader"/>LOADING...</div>
                           : itemsSortByComments.map(item => <Item key={item.data.id}
                                         data={item.data}
                    />)
                }
            </div>
        );
    }
}
