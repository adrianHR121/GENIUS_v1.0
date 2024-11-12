import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import '../css/styleAdmin.css';
import Modal from './Modal.jsx';
import { fetchNotifications } from '../../../../../fetch/Admin/notificationService.js'; 

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const data = await fetchNotifications();
                const filteredNotifications = data.filter((request) => {
                    // Filtrar por solicitudes hasta 2 meses atrás
                    const requestDate = new Date(request.creationDate);
                    const twoMonthsAgo = new Date();
                    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
                    return requestDate >= twoMonthsAgo;
                }).slice(0, 3); // Mostrar solo las últimas 3 solicitudes

                setNotifications(filteredNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        loadNotifications();
    }, []);

    return (
        <>
            <div className="relative Bell cursor-pointer" onClick={toggleModal}>
                <FaBell size={24} className="IconBell" />
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-700 rounded-full text-white text-xs flex items-center justify-center">
                        {notifications.length}
                    </span>
                )}
            </div>
            <div>
                {isOpen && <Modal notifications={notifications} toggleModal={toggleModal} />}
            </div>
        </>
    );
};

export default NotificationBell;
