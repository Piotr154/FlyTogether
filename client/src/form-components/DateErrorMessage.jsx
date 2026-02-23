export const DateErrorMessage = ({datetype, departureDate, returnDate, today }) => {
    if (datetype === "return-date" && departureDate && returnDate && departureDate > returnDate) {
        return <p className="error-message">Return date must be after departure date.</p>;
    }
    if (datetype === "departure-date" && departureDate && today > departureDate){
        return <p className="error-message">Departure date cannot be in the past.</p>;
    }
    return null;
}
