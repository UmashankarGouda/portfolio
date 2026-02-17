import React from 'react';
import { CardBody, CardContainer, CardItem } from './ThreeDCard';
import { useTheme } from '../../context/ThemeContext';
import { MapPin, Landmark } from 'lucide-react';

export default function Achievement3DCard({
    image,
    title,
    description,
    location,
    icon: Icon = Landmark
}) {
    const { theme } = useTheme();

    return (
        <CardContainer className="inter-var">
            <CardBody className={`relative group/card w-auto sm:w-[32rem] h-auto rounded-xl border
                ${theme === 'dark'
                    ? 'bg-black/90 border-white/[0.1] hover:border-white/[0.2] hover:shadow-emerald-500/[0.1]'
                    : 'bg-white border-black/[0.1] hover:border-black/[0.2] hover:shadow-xl'
                }
            `}>
                {/* Image Section - Edge to Edge */}
                <CardItem translateZ="100" className="w-full relative">
                    <img
                        src={image}
                        height="1000"
                        width="1000"
                        className="h-64 w-full object-cover rounded-t-xl group-hover/card:shadow-xl"
                        alt={title}
                    />
                </CardItem>

                {/* Content Section - Grid with Layout Matching ProjectCard */}
                <div
                    className="grid gap-4"
                    style={{
                        padding: '2rem',
                        gridTemplateColumns: '1fr',
                        gridTemplateRows: 'auto auto 1fr'
                    }}
                >
                    {/* Location / Institution */}
                    <CardItem
                        translateZ="50"
                        className={`flex items-center gap-2 text-sm font-bold tracking-widest uppercase
                            ${theme === 'dark' ? 'text-yellow-500' : 'text-yellow-600'}
                        `}
                    >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span>{location}</span>
                    </CardItem>

                    {/* Title with Gradient Shine Effect on Hover */}
                    <CardItem
                        translateZ="60"
                        className="text-2xl font-black uppercase leading-tight"
                    >
                        <span className={`bg-clip-text text-transparent bg-gradient-to-r 
                            ${theme === 'dark'
                                ? 'from-white via-white to-white group-hover/card:from-white group-hover/card:via-yellow-200 group-hover/card:to-white'
                                : 'from-neutral-900 via-neutral-900 to-neutral-900 group-hover/card:from-neutral-900 group-hover/card:via-yellow-500 group-hover/card:to-neutral-900'
                            }
                            bg-[length:200%_auto] transition-all duration-500 group-hover/card:bg-right
                        `}>
                            {title}
                        </span>
                    </CardItem>

                    {/* Description */}
                    <CardItem
                        as="p"
                        translateZ="40"
                        className={`text-sm leading-relaxed mt-2
                            ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                        `}
                    >
                        {description}
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}
