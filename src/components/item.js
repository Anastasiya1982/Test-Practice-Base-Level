import React,{Component} from 'react';


export class Item extends Component{
    render(){
        const { data }=this.props;
        return (
            <div className="wrapper">
                <div className='blank'>
                    {data.thumbnail !== "self" &&
                    <img className='item-photo' src={data.thumbnail} alt=""/>}

                    <p>{data.title}</p>
                    <p>Number of comments : {data.num_comments}</p>
                    <a href={`https://www.reddit.com/${data.permalink}`} target="_blank"
                       rel="noopener noreferrer">Link</a>
                </div>
            </div>
        )
    }
}
