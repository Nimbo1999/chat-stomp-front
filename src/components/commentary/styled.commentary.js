import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
`;

const CommentaryWrapper = styled.form`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    textarea {
        margin: 0px ${({ theme }) => theme.spacing(2)} 0px 0px;
        max-height: 140px !important;
    }
`;

export { Container, CommentaryWrapper };
