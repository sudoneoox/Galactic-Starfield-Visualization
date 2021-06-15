import React from 'react';
import { Environment } from '@react-three/drei';

import PX from '../../../static/cubeMap/px';
import NX from '../../../static/cubeMap/nx';
import PY from '../../../static/cubeMap/py';
import NY from '../../../static/cubeMap/ny';
import PZ from '../../../static/cubeMap/pz';
import NZ from '../../../static/cubeMap/nz';

export default function Cubemap() {

    return (
        <>
            <Environment
                background={true}
                files={[PX, NX, PY, NY, PZ, NZ]}
            />
        </>
    );
}