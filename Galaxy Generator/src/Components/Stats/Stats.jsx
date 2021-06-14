import StatsImpl from "stats.js";
import { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Stats() {
    const [stats] = useState(() => new StatsImpl());
    useEffect(() => {
        stats.showPanel(0);
        document.body.appendChild(stats.dom);
        return () => document.body.removeChild(stats.dom);
    }, []);
    return useFrame(state => {
        stats.begin();
        state.gl.render(state.scene, state.camera);
        stats.end();
    }, 1);
}
