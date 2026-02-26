import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Mail, Github, Linkedin, Gamepad2, Send, Phone } from 'lucide-react';

const contactInfo = [
    {
        icon: Mail,
        label: "EMAIL",
        value: "umashankars.work@gmail.com",
        link: "mailto:umashankars.work@gmail.com",
        color: "text-red-500"
    },
    {
        icon: Linkedin,
        label: "LINKEDIN",
        // Using the name from screenshot/user data if available, or just linkedin handle
        displayValue: "umashankargouda",
        link: "https://www.linkedin.com/in/umashankargouda/",
        color: "text-blue-500"
    },
    {
        icon: Github,
        label: "GITHUB",

        displayValue: "UmashankarGouda",
        link: "https://github.com/UmashankarGouda",
        color: "text-gray-800"
    },
    {
        icon: Gamepad2,
        label: "STEAM",
        value: "theungovernable",
        displayValue: "theungovernable",
        link: "https://steamcommunity.com/id/iungovernbale/",
        color: "text-blue-700"
    }
];

export default function Contact() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailSubject = `[Portfolio] ${formData.subject}: ${formData.name}`;
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
        window.location.href = `mailto:umashankars.work@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${body}`;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const cardPadding = isMobile ? '1.5rem' : '3rem';

    return (
        <section
            id="contact"
            style={{ padding: isMobile ? '3rem 4vw' : '6rem 5vw' }}
            className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden
                ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'}
            `}
        >
            <div className="max-w-6xl mx-auto w-full relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                    style={{ marginBottom: isMobile ? '2rem' : '4rem' }}
                >
                    <h2
                        className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-white uppercase tracking-wider"
                        style={{
                            background: theme === 'dark'
                                ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                                : 'linear-gradient(135deg, #0f172a 0%, #182E6F 100%)',
                            padding: '0.5rem 2rem',
                            borderRadius: '1rem',
                            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                        }}
                    >
                        Contact
                    </h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                    {/* Left Side: Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        style={{ flex: '1 1 0', minWidth: 0, padding: cardPadding }}
                        className={`rounded-3xl border
                            ${theme === 'dark'
                                ? 'bg-[#101010] border-white/10'
                                : 'bg-white border-black/5 shadow-xl'
                            }
                        `}
                    >
                        <h3 style={{ marginBottom: '1rem' }} className={`text-xl md:text-3xl font-black uppercase text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Contact Information
                        </h3>
                        <p style={{ marginBottom: '1rem' }} className={`text-sm md:text-base leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Connect with me through these platforms. I'm always open to discussing new projects, creative ideas or opportunities.
                        </p>

                        <div className="flex flex-col gap-6 md:gap-8">
                            {contactInfo.map((info, index) => (
                                <a
                                    key={index}
                                    href={info.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 md:gap-6 group"
                                >
                                    {/* Icon Container */}
                                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0
                                        ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}
                                    `}>
                                        <info.icon className={`w-5 h-5 md:w-6 md:h-6 ${info.color}`} />
                                    </div>

                                    {/* Text */}
                                    <div className="min-w-0">
                                        <p className={`text-xs font-bold uppercase tracking-widest mb-1
                                            ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}
                                        `}>
                                            {info.label}
                                        </p>
                                        <p className={`text-base md:text-lg font-bold transition-colors truncate
                                            ${theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}
                                        `}>
                                            {info.displayValue || info.value}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Message Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        style={{ flex: '1 1 0', minWidth: 0, padding: cardPadding }}
                        className={`rounded-3xl border
                            ${theme === 'dark'
                                ? 'bg-[#101010] border-white/10'
                                : 'bg-white border-black/5 shadow-xl'
                            }
                        `}
                    >
                        <h3 style={{ marginBottom: isMobile ? '1.25rem' : '2rem' }} className={`text-xl md:text-3xl font-black uppercase text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Send me a Message
                        </h3>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '1.5rem' }}>
                            {/* Name */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className={`w-full p-3 md:p-4 rounded-xl outline-none transition-all text-sm md:text-base
                                        ${theme === 'dark'
                                            ? 'bg-[#1a1a1a] border border-white/5 text-white placeholder-gray-600 focus:border-blue-500'
                                            : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-blue-500'
                                        }
                                    `}
                                    style={{ paddingLeft: '1rem' }}
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className={`w-full p-3 md:p-4 rounded-xl outline-none transition-all text-sm md:text-base
                                        ${theme === 'dark'
                                            ? 'bg-[#1a1a1a] border border-white/5 text-white placeholder-gray-600 focus:border-blue-500'
                                            : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-blue-500'
                                        }
                                    `}
                                    style={{ paddingLeft: '1rem' }}
                                    required
                                />
                            </div>

                            {/* Subject */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Discussion topic"
                                    className={`w-full p-3 md:p-4 rounded-xl outline-none transition-all text-sm md:text-base
                                        ${theme === 'dark'
                                            ? 'bg-[#1a1a1a] border border-white/5 text-white placeholder-gray-600 focus:border-blue-500'
                                            : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-blue-500'
                                        }
                                    `}
                                    style={{ paddingLeft: '1rem' }}
                                    required
                                />
                            </div>

                            {/* Message */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                                    Your Message
                                </label>
                                <textarea
                                    name="message"
                                    rows={isMobile ? 3 : 4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can I help you?"
                                    className={`w-full p-3 md:p-4 rounded-xl outline-none transition-all resize-none text-sm md:text-base
                                        ${theme === 'dark'
                                            ? 'bg-[#1a1a1a] border border-white/5 text-white placeholder-gray-600 focus:border-blue-500'
                                            : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-blue-500'
                                        }
                                    `}
                                    style={{ paddingLeft: '1rem' }}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                style={{
                                    marginTop: '0.5rem',
                                    height: '2.5rem',
                                    background: theme === 'dark'
                                        ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                                        : 'linear-gradient(135deg, #0f172a 0%, #182E6F 100%)'
                                }}
                                className="w-full p-3 md:p-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 text-white text-sm md:text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                            >
                                Send Message
                                <Send className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
