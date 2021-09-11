import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};
`;

export const CommentaryWrapper = styled.form`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    textarea {
        margin: 0px ${({theme}) => theme.spacing(2)} 0px 0px;
    }
`;
