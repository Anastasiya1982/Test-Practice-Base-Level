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
            minComments:0,
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
    updateMinComments=(event)=>{
        this.setState({
            minComments:Number(event.target.value)
        })
    }

 getItemsByComments=( items, minComments)=>{
        return items
            .filter(item=>item.data.num_comments >= minComments)
            .sort(
                (a,b)=>b.data.num_comments-a.data.num_comments);
 }

    render() {
        const { items, isLoading,enableAutoRefresh,minComments } = this.state;
        //сортировка и фильтрация  по минимальному количеству комментариев
        const itemsSortByComments=this.getItemsByComments(items, minComments);

        return (
            <div className='container'>
                <h1 className='header'>Top commented</h1>
                <div>
                    <p>Current filter: {minComments}</p>
                    <button type="button" onClick={this.updateAutoRefresh}>
                        {enableAutoRefresh ? "Stop" : "Start"} auto-refresh
                    </button>
                </div>
                <input type="range"
                       className="input-counts-comments"
                       min={0}
                       max={500}
                       value={minComments}
                       onChange={this.updateMinComments}
                />
                <div className="wrapper">
                    {isLoading ? <div><img src={preloader} alt="preloader"/>LOADING...</div>
                        : itemsSortByComments.length>0 ? (
                            itemsSortByComments.map(item => <Item key={item.data.id}
                                                                data={item.data}
                        />)):(
                            <p> No results found matching your criteria</p>
                        )
                    }
                </div>
            </div>
        );
    }
}
