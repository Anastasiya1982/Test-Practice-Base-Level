import React,{memo} from 'react';


export const Item =memo(({ data })=>{
    console.log('render')
           return (
               <div className='blank'>
                   {data.thumbnail !== "self" &&
                   <img className='item-photo'
                        src={data.thumbnail} alt=""/>}

                   <p className="blank-title">{data.title}</p>
                   <p>Number of comments : {data.num_comments}</p>
                   <a href={`https://www.reddit.com/${data.permalink}`}
                      target="_blank"
                      rel="noopener noreferrer">Link</a>
               </div>
        );
}
);
