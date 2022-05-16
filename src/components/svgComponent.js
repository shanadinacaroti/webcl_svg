import {useEffect, useState} from 'react';

export function SvgComponent() {
    const [opac, setOpac] = useState(0);
    const [globalCoords, setGlobalCoords] = useState({x: 0, y: 0});

    function openEyes() {
        setOpac(0);
    }

    function closeEyes() {
        setOpac(1);
    }

    function eyeMovement() {
        opac === 0 ? closeEyes() : openEyes();

    }

    useEffect(() => {
        const handleWindowMouseMove = event => {
            console.log("x", event.screenX);
            console.log("y", event.screenY);
            setGlobalCoords({
                x: event.screenX - 450,
                y: event.screenY - 350,
            });

        };
        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
        };
    }, []);

    return (
        <svg id="{id}" viewBox="0 0 120 120" onClick={eyeMovement}>

            <filter id="shadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset       dx="0" dy="8" />
                <feColorMatrix  type="matrix"
                                values="0 0 0 0  0
                                0 0 0 0  0
                                0 0 0 0  0
                                0 0 0 .5 0"/>
                <feBlend        in="SourceGraphic" mode="normal"/>
            </filter>

            <radialGradient id="gradient1" gradientUnits="objectBoundingBox" cx="50%" cy="50%" r="50%">
                <stop offset= "38%" stopColor="#000000" stopOpacity="1" />
                <stop offset= "46%" stopColor="#073F80" stopOpacity="1" />
                <stop offset= "90%" stopColor="#8EC0DD" stopOpacity="1" />
                <stop offset="100%" stopColor="#2F3A46" stopOpacity="1" />
            </radialGradient>
            <g id="{id}_iris">
                <ellipse cx={globalCoords.x} cy={globalCoords.y} rx="30" ry="30" opacity="1" fill="url(#gradient1)" />
                <ellipse cx="50" cy="50" rx="7"  ry="7"  opacity="1" fill="#FFFFFF" fillOpacity="0.8"/>
            </g>
            <g id="{id}_openLids">
                <path d="M0 60 A60,60 0 0,1 120,60 A60,30 0 0,0 0,60 Z" opacity="1" fill="#FDDC99" fillOpacity="1" filter="url(#shadow)" />
                <path d="M0 60 A60,60 0 0,0 120,60 A60,40 0 0,1 0,60 Z" opacity="1" fill="#F4CB76" fillOpacity="1" />
            </g>
            <g id="{id}_closeLid">
                <path d="M0 60 A60,60 0 0,1 120,60 A60,40 0 0,1 0,60 Z" opacity="1" fill="#FDDC99" fillOpacity={opac}/>
            </g>
        </svg>
    );
}
