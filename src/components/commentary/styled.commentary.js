import styled from 'styled-components';

const CommentaryWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;

    textarea {
        margin: 0px ${({theme}) => theme.spacing(2)};
    }
`;

export default CommentaryWrapper;