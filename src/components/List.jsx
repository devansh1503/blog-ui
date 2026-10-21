import { Link } from 'react-router-dom'
import { useState } from 'react'

function List({objects, title = 'Explore More'}) {
  return (
    <div className='list-outer'>
        <div className='list-heading'>
            <h1>{title}</h1>
        </div>
        <div className='list'>

            {
                objects.map((item, index) => {
                    return <Card key={item.id ?? index} details={item}></Card>
                })
            }
        </div>
    </div>
  )
}

function Card({details}){
    const [dimensions] = useState(() => ({
        '--card-width': `${300 + Math.floor(Math.random() * 100)}px`,
        '--card-height': `${300 + Math.floor(Math.random() * 100)}px`,
    }))

    return (
        <Link className='card' to={`/books/${encodeURIComponent(details.id)}`} style={dimensions}>
            <div className='card-img'>
                {details.imageUrl?.trim() && <img src={details.imageUrl} alt={details.title} />}
            </div>
            <div className='card-details'>
                <h3>{details.title}</h3>
                <p>{details.description}</p>
            </div>
        </Link>
    )
}

export default List
