import {
    Code,
    Layout,
    Megaphone,
    Laptop,
    Camera,
    Briefcase,
    Globe,
    UserCheck,
    Monitor,
    Heart,
    Music
} from 'lucide-react';

// Mapeo de categorías a iconos y alineaciones
const categoryIcons = {
    "Programacion": {
        icon: <Code size={20} className="mr-2" />,
        align: 'left' // Alineación a la izquierda
    },
    "Diseño grafico": {
        icon: <Layout size={20} className="mr-2" />,
        align: 'left' // Alineación a la izquierda
    },
    "Marketing Digital": {
        icon: <Megaphone size={20} className="mr-2" />,
        align: 'left' // Alineación a la izquierda
    },
    "Desarrollo web": {
        icon: <Laptop size={20} className="mr-2" />,
        align: 'left' // Alineación a la izquierda
    },
    "Fotografia y videografia": {
        icon: <Camera size={20} className="mr-2" />,
        align: 'left' // Alineación a la izquierda
    },
    "Negocios y emprendimiento": {
        icon: <Briefcase size={20} className="mr-2" />,
        align: 'left' // Alineación a la izquierda
    },
    "Idiomas": {
        icon: <Globe size={20} className="mr-2" />,
        align: 'left' // Alineación a la izquierda
    },
    "Desarrollo personal": {
        icon: <UserCheck size={20} className="mr-2" />,
        align: 'left' // Alineación a la izquierda
    },
    "Ciencia y tecnologia": {
        icon: <Monitor size={20} className="mr-2" />,
        align: 'left' // Alineación a la izquierda
    },
    "Salud y bienestar": {
        icon: <Heart size={20} className="mr-2" />,
        align: 'left' // Alineación a la izquierda
    },
    "Musica": {
        icon: <Music size={20} className="mr-2" />,
        align: 'left' // Alineación a la izquierda
    }
};

export default categoryIcons;
