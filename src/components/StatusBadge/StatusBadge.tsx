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
};

const Badge = styled.span<{ colour: string }>`
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
        colour: '#B0B0B0'
    };

    return <Badge colour={colour}>{statusText}</Badge>
};

export default StatusBadge;