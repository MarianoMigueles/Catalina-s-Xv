
let timeOffset = new Date();

export function initClockStructure(eventDate, actualDate) {
    const CELEBRATION_DATE = new Date(eventDate);
    timeOffset = actualDate;
    createClockStructure(CELEBRATION_DATE);
}

async function createClockStructure(celebrationDate) {
    const DATE_CONTAINER = document.querySelector('.time-indicator-container');
    const TIME_INDICATORS_LABELS = ['Dias', 'Horas', 'Minutos', 'Segundos'];

    for (let index = 0; index < TIME_INDICATORS_LABELS.length; index++) {
        const label = TIME_INDICATORS_LABELS[index];
        const INDICATOR = document.createElement('div');
        INDICATOR.classList.add('time-indicator', 'center-content');
        INDICATOR.innerHTML = `<strong></strong><span>${label}</span>`;
        DATE_CONTAINER.appendChild(INDICATOR);
        if (index !== 3) {
            const DIVIDER = document.createElement('span');
            DIVIDER.innerHTML = ':';
            DATE_CONTAINER.appendChild(DIVIDER);
        }
    }

    const INDICATORS = DATE_CONTAINER.querySelectorAll('.time-indicator>strong');

    async function calculateClockTime(index) {
        const DATE_DIFFERENCE = celebrationDate - new Date()//getSynchronizedTime();

        switch (index) {
            case 0: /*Days*/
                return Math.floor(DATE_DIFFERENCE / (1000 * 60 * 60 * 24));
            case 1: /*Hours*/
                return Math.floor((DATE_DIFFERENCE / (1000 * 60 * 60)) % 24);
            case 2: /*Minutes*/
                return Math.floor((DATE_DIFFERENCE / (1000 * 60)) % 60);
            case 3: /*Seconds*/ 
                return Math.floor((DATE_DIFFERENCE / 1000) % 60);
            default:
                return "ERR";
        }
    }

    async function updateClockStructure(INDICATORS) {           
        INDICATORS.forEach( async (indicator, index) => {   
            if(getSynchronizedTime() >= celebrationDate) {
                clearInterval(INTERVAL);
                indicator.innerHTML = "0";
                return;
            }

            const calculatedTime = await calculateClockTime(index);
            if (parseInt(indicator.innerHTML) !== calculatedTime) {
                indicator.innerHTML = calculatedTime;
            }
        });
    }

    await updateClockStructure(INDICATORS);

    const INTERVAL = setInterval(async () => {
        await updateClockStructure(INDICATORS);
    }, 1000);
}

function getSynchronizedTime() {
    return new Date(new Date().getTime() + timeOffset);
}