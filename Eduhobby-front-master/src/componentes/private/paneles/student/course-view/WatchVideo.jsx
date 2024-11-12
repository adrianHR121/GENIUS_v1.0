import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../../protected/AuthProvider';
import getVideos from '../../../../../services/videos/getVideos';
import SidebarVideos from './SidebarVideos';

const WatchVideo = () => {
    const { state } = useLocation();
    const [sasUrl, setSasUrl] = useState('');
    const auth = useAuth();

    const getIt = async () => {
        const videoMetadataResponse = await getVideos(
            auth.handleTokenRefresh,
            { videoId: state.state.video } // Asegúrate de usar el ID del video correcto
        );
        setSasUrl(videoMetadataResponse.sasUrl);
    };

    useEffect(() => {
        console.log(state.course.content);
        
        getIt();
    }, []);

    return (
        sasUrl ? (
            <div className="flex flex-row justify-between mt-20 p-10 pb-40 h-screen">
                <div className="flex-grow">
                    <div className="video-container h-full">
                        <video controls className="w-full h-full object-contain bg-[var(--fondo-color)] rounded-tl-lg rounded-bl-lg">
                            <source src={sasUrl} type="video/mp4" />
                        </video>
                    </div>
                    <h1 className="text-black text-2xl mt-4">{state.state.title}</h1>
                </div>

                <SidebarVideos courses={state.course.content} /> 
            </div>
        ) : (
            <div>Loading...</div>
        )
    );
};

export default WatchVideo;
