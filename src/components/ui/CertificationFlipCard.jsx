import './CertificationFlipCard.css';
import { useTheme } from '../../context/ThemeContext';

export default function CertificationFlipCard({
    certificationName,
    image,
    verifyLink,
    issuedDate,
    expiresDate,
    credentialId
}) {
    const { theme } = useTheme();

    return (
        <div className="certification-flip-card">
            <div className="certification-flip-card-inner">
                {/* Front of card */}
                <div className={`certification-flip-card-front ${theme}`}>
                    {/* Top section - Image and Title */}
                    <div className="w-full flex flex-col items-center">
                        <div className="certification-image">
                            <img src={image} alt={certificationName} />
                        </div>
                        <h3
                            className={`text-sm md:text-base font-bold text-center mt-2
                                ${theme === 'dark' ? 'text-white' : 'text-light-accent'}
                            `}
                        >
                            {certificationName}
                        </h3>
                    </div>

                    {/* Middle section - Info (grows to fill space) */}
                    <div className="flex flex-col items-center justify-center flex-1 w-full">
                        {/* Issue date and expiry */}
                        <p
                            className={`text-sm text-center font-medium
                                ${theme === 'dark' ? 'text-white' : 'text-black'}
                            `}
                        >
                            Issued {issuedDate} · Expires {expiresDate}
                        </p>

                        {/* Credential ID */}
                        <p
                            className={`text-sm text-center font-medium mt-1
                                ${theme === 'dark' ? 'text-white' : 'text-black'}
                            `}
                        >
                            Credential ID: {credentialId}
                        </p>
                    </div>

                    {/* Bottom section - Hover hint */}
                    <span
                        className={`absolute bottom-3 left-1/2 -translate-x-1/2 text-xs italic font-semibold
                            ${theme === 'dark' ? 'text-gray-500' : 'text-gray-700'}
                        `}
                    >
                        (hover to verify)
                    </span>
                </div>

                {/* Back of card */}
                <div className={`certification-flip-card-back ${theme}`}>
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <a
                            href={verifyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`verify-button ${theme}`}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                            </svg>
                            Verify Credential
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
