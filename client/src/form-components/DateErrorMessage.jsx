export const DateErrorMessage = ({departureDate, returnDate }) => {
    if (departureDate && returnDate && departureDate > returnDate) {
        return <p className="error-message">Return date must be after departure date.</p>;
    }
    return null;
}
