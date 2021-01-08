import './no-data-card.style.css'
const NoDataCard = ({data}) => {
    return(
        <div className='no-data-card'>
            <p>No {data} Available :)</p>
        </div>
    )
}

export default NoDataCard