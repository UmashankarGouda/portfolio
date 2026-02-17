import { Suspense, lazy } from 'react';
import { useTheme } from '../../context/ThemeContext';

// Lazy load Spline to improve initial load time
const Spline = lazy(() => import('@splinetool/react-spline'));

export default function HeroDark() {
    const { theme } = useTheme();

    if (theme === 'light') return null;

    return (
        <div className="relative w-full h-screen overflow-hidden bg-dark-bg">
            {/* Spline 3D Animation */}
            <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-dark-primary border-t-transparent rounded-full animate-spin" />
                </div>
            }>
                <Spline
                    scene="https://prod.spline.design/7QSd5w3bJR9dWT6b/scene.splinecode"
                    className="absolute inset-0 w-full h-full"
                />
            </Suspense>

            {/* Gradient overlay for smooth transitions */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-bg/90 pointer-events-none" />
        </div>
    );
}
