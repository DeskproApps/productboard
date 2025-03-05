import { TimeframeObject } from '@/types';

export function getTimeframe(timeframeObject: TimeframeObject) {
    let timeframe;

    if (isNaN(Date.parse(timeframeObject.startDate))) {
        timeframe = '—';
    } else {
        const startDate =  new Date(timeframeObject.startDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        const endDate =  new Date(timeframeObject.endDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        timeframe = `${startDate} — ${endDate}`;
    };

    return timeframe;
};