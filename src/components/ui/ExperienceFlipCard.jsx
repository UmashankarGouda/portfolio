import './ExperienceFlipCard.css';
import { useTheme } from '../../context/ThemeContext';

export default function ExperienceFlipCard({
    companyName,
    logo,
    role,
    dateRange,
    workLink
}) {
    const { theme } = useTheme();

    return (
        <div className="experience-flip-card">
            <div className="experience-flip-card-inner">
                {/* Front of card */}
                <div className={`experience-flip-card-front ${theme}`}>
                    {/* Logo on left */}
                    <div className={`experience-logo ${theme}`}>
                        <img src={logo} alt={`${companyName} logo`} />
                    </div>

                    {/* Text content */}
                    <div className="flex-1 ml-6">
                        <h3
                            className={`text-xl md:text-2xl font-bold
                                ${theme === 'dark' ? 'text-white' : 'text-light-accent'}
                            `}
                        >
                            {role}
                        </h3>
                        <p
                            className={`text-sm md:text-base mt-1
                                ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                            `}
                        >
                            {companyName} | {dateRange}
                        </p>
                    </div>

                    {/* Hover hint at bottom center */}
                    <span
                        className={`absolute bottom-3 left-1/2 -translate-x-1/2 text-xs italic font-semibold
                            ${theme === 'dark' ? 'text-gray-500' : 'text-gray-700'}
                        `}
                    >
                        (hover to know more)
                    </span>
                </div>

                {/* Back of card */}
                <div className={`experience-flip-card-back ${theme}`}>
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <h4
                            className={`text-lg font-semibold mb-4 text-center
                                ${theme === 'dark' ? 'text-dark-bg' : 'text-white'}
                            `}
                        >
                            Want to see my work?
                        </h4>
                        <a
                            href={workLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`work-button ${theme}`}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
                            </svg>
                            My Work There
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
