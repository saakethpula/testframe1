import React, { useEffect, useRef } from 'react';

const RTC: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const getMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error('Error accessing webcam: ', err);
            }
        };

        getMedia();
    }, []);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline />
        </div>
    );
};

export default RTC;