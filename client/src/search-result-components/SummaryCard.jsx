import '../styles/SummaryCard.css';

export const SummaryCard = ({title, value}) =>{
    return(
        <div className="SummaryCard">
            <h3>{title}</h3>
            <h2>{value}</h2>
        </div>
    );
}