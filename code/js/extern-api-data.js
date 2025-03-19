export async function getPageData() {
    try {
        const response = await fetch('app-information.json');
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON: ${response.status}`);
        }
        const data = await response.json();
        return data.app.pageContent;
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
        return null;
    }
}

export async function getApiDate() {
    const EVENT_LOCATION = {
        "lat": -33.0094,
        "lng": -58.5172
    };

    try {
        const response = await fetch(`https://www.timeapi.io/api/Time/current/coordinate?latitude=${EVENT_LOCATION.lat}&longitude=${EVENT_LOCATION.lng}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const apiTime = new Date(data.dateTime);
        const localTime = new Date();
        return apiTime.getTime() - localTime.getTime();
    } catch (error) {
        console.error('Error al obtener la hora de la API:', error);
        return 0;
    }
}


