import styled from 'styled-components';
import JoinChatSVG from '../../assets/icons/JoinChatSVG';

const EmptyWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: ${({ theme }) => theme.spacing(6)};
    height: 100%;
    width: 100%;
`;

const SVGImage = styled(JoinChatSVG)`
    aspect-ratio: 1;
    width: 100%;
    max-width: 513px;
`;

export { EmptyWrapper, SVGImage };
