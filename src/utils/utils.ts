export const formatDateForDisplay = (date: Date | string) => {
    let parsedDate = new Date(date);

    return parsedDate.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}