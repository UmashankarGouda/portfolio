import React from 'react';
import { CardContainer, CardBody, CardItem } from './ThreeDCard';
import { useTheme } from '../../context/ThemeContext';

export default function ProjectCard({
    title,
    description,
    image,
    blogLink,
    githubLink,
    liveLink,
    category,
    technologies = [],
    badge = null
}) {
    const { theme } = useTheme();

    return (
        <CardContainer className="inter-var">
            <CardBody
                className={`relative group/card w-full max-w-[24rem] h-auto rounded-xl border
                    ${theme === 'dark'
                        ? 'bg-[#1e293b] hover:shadow-2xl hover:shadow-purple-500/[0.1] border-white/[0.2]'
                        : 'bg-gray-50 border-black/[0.1] shadow-lg hover:shadow-xl'}
                `}
            >
                {/* Badge Banner + Image wrapped together for unified elevation */}
                <CardItem translateZ="100" className="w-full">
                    {/* Gradient Banner */}
                    {badge && (
                        <div
                            className={`text-sm font-semibold text-center text-white rounded-t-xl
                                ${theme === 'dark'
                                    ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                                    : 'bg-gradient-to-r from-[#0f172a] to-[#182E6F]'}
                            `}
                            style={{ padding: '0.1rem 0.5rem' }}
                        >
                            {badge}
                        </div>
                    )}
                    {/* Project Image */}
                    <img
                        src={image}
                        className={`h-60 w-full object-cover group-hover/card:shadow-xl
                            ${badge ? '' : 'rounded-t-xl'}
                        `}
                        alt={title}
                    />
                </CardItem>

                {/* Content Grid - with gap for spacing */}
                <div
                    className="grid gap-3"
                    style={{
                        padding: '1.5rem',
                        gridTemplateColumns: '1fr',
                        gridTemplateRows: 'auto auto 1fr'
                    }}
                >
                    {/* Project Title */}
                    <CardItem
                        translateZ="50"
                        className={`text-xl font-bold
                            ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}
                        `}
                    >
                        {title}
                    </CardItem>

                    {/* Project Description */}
                    <CardItem
                        as="p"
                        translateZ="60"
                        className={`text-sm leading-relaxed
                            ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}
                        `}
                    >
                        {description}
                    </CardItem>

                    {/* Tech Tags */}
                    {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className={`text-xs font-medium rounded-full border
                                        ${theme === 'dark'
                                            ? 'bg-gray-700/50 border-gray-500 text-gray-200'
                                            : 'bg-gray-200/70 border-gray-400 text-gray-800'}
                                    `}
                                    style={{ padding: '0.2rem 0.5rem' }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Buttons Row */}
                    <div className="flex justify-between items-center" style={{ marginTop: '1.5rem' }}>
                        {/* GitHub Button (Software) or LIVE Button (Graphic Design) */}
                        {category === 'Software' && githubLink && (
                            <button
                                type="button"
                                onClick={() => window.open(githubLink, '_blank')}
                                className={`cursor-target flex items-center gap-2 text-sm font-normal cursor-pointer transition-colors
                                    ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-neutral-600 hover:text-neutral-900'}
                                `}
                            >
                                <svg className="w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                <span className="pointer-events-none">Code</span>
                            </button>
                        )}
                        {category === 'Graphic Design' && liveLink && (
                            <button
                                type="button"
                                onClick={() => window.open(liveLink, '_blank')}
                                className={`cursor-target flex items-center gap-2 text-sm font-semibold cursor-pointer transition-colors
                                    ${theme === 'dark' ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'}
                                `}
                            >
                                {liveLink.includes('instagram.com') ? (
                                    <svg className="w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                ) : liveLink.includes('youtube.com') ? (
                                    <svg className="w-5 h-5 pointer-events-none text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                                    </svg>
                                )}
                                <span className="pointer-events-none">LIVE</span>
                            </button>
                        )}

                        {/* Blog / More Designs Button - Right */}
                        <a
                            href={blogLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`cursor-target rounded-xl text-sm font-bold text-white
                                ${theme === 'dark'
                                    ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                                    : 'bg-gradient-to-r from-[#0f172a] to-[#182E6F]'}
                            `}
                            style={{ padding: '0.5rem 1rem' }}
                        >
                            {category === 'Graphic Design' ? 'More Designs' : 'Read Blog Post'}
                        </a>
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    );
}
