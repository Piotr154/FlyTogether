import '../styles/SummaryCard.css';

export const SummaryCard = ({title, value}) =>{
    return(
        <div className="SummaryCard">
                {title}
            <h2>{value}</h2>
        </div>
    );
}