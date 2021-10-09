import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    z-index: 1;
    top: ${({ theme }) => theme.spacing(2)};
    left: 50%;
    transform: translateX(-50%);
`;

export { Container };
