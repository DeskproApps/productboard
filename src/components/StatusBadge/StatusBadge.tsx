import styled from 'styled-components';

const statuses = {
    newIdea: {
        text: 'New idea',
        colour: '#18E2CC'
    },
    candidate: {
        text: 'Candidate',
        colour: '#9C46F1'
    },
    planned: {
        text: 'Planned',
        colour: '#2693FF'
    },
    inProgress: {
        text: 'In progress',
        colour: '#FFC600'
    },
    released: {
        text: 'Released',
        colour: '#79CE17'
    }
} as const;

const defaultColour = '#B0B0B0';

interface Badge {
    colour: typeof statuses[keyof typeof statuses]['colour'] | typeof defaultColour;
};

const Badge = styled.span<Badge>`
    display: inline-block;
    padding: 2px 8px;
    font-size: 9px;
    border-radius: 12px;
    background-color: ${({ colour }) => colour};
    color: white;
`;

interface StatusBadge {
    text: string;
};

function StatusBadge({ text }: StatusBadge) {
    const matchingStatus = Object.values(statuses).find(status => status.text === text);
    const { text: statusText, colour } = matchingStatus || {
        text,
        colour: defaultColour
    };

    return <Badge colour={colour}>{statusText}</Badge>
};

export default StatusBadge;