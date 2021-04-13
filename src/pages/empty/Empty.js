import React from 'react';
import { Empty } from 'antd';

import EmptyWrapper from './styled.empty';

function EmptyPage() {
    return (
        <EmptyWrapper>
            <Empty />
        </EmptyWrapper>
    );
}

export default EmptyPage;
