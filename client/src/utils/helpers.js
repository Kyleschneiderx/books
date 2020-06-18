import React from 'react';
import {Link} from 'react-router-dom';



export const RowGenerator = (list, cols)=>{
    const rows = [...Array(Math.ceil(list.length/cols))]
    const articlesRows = rows.map(
        (row, i) => list.slice(i * cols, i * cols + cols)
    )
    return articlesRows;
}


export const GenreateRowsWithBlocks = (rows, type)=>(
    rows.map((row, i)=>(
        <div className="row" key={i}>
            {
                row.map(article => (
                    <div key={article._id} className={`${type} columns article_block`}>
                        <Link to={`/article/${article._id}`}>
                            <div className="top">
                                <h3>{article.name}</h3>

                            </div>
                            <div className="content">
                                <div><span>Author:{article.author}</span></div>
                                <div><span>Our Rating:{article.rating}</span></div>
                                <div><span>Price:{article.price}</span></div>

                            </div>
                        </Link>
                    </div>    
                ))
            }
        </div>
    ))

)