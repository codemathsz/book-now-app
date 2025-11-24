export const formatDateForDisplay = (date: Date | string): string => {
    if(!date) return '-';
    let parsedDate: Date;
    
    if (typeof date === 'string') {
        parsedDate = parseDateString(date);
    } else {
        parsedDate = date;
    }

    return parsedDate.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export const parseDateString = (dateString: string): Date => {
    // Parse YYYY-MM-DD para data local (evita problema de timezone)
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

//DD-MM-YYYY
export const parseDateToPattern = (date: string | Date): string => {
    const dateConvert = new Date(date);
    const day = String(dateConvert.getDate()).padStart(2, '0');
    const month = String(dateConvert.getMonth() + 1).padStart(2, '0');
    const year = dateConvert.getFullYear();
    return `${day}-${month}-${year}`;
}