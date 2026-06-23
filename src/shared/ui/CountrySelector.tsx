import { COUNTRIES } from "@/shared/lib/countries";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface CountrySelectorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
}

export default function CountrySelector({ value, onChange, label, placeholder }: CountrySelectorProps) {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Determine which property to use based on language (default to English if not 'es')
    const lang: "name_es" | "name_en" = i18n.language.startsWith('es') ? 'name_es' : 'name_en';

    const selectedCountry = COUNTRIES.find((c) => c.code === value);

    // Filter countries based on search term in the current language
    const filteredCountries = COUNTRIES.filter((country) => {
        const name = country[lang];
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getCountryName = (country: typeof COUNTRIES[0] | undefined) => {
        if (!country) return "";
        return country[lang];
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            <div
                className="w-full p-3 border border-gray-200 rounded-lg bg-white flex items-center justify-between cursor-pointer focus-within:ring-2 focus-within:ring-brand-orange focus-within:border-transparent transition"
                onClick={() => {
                    if (isOpen) {
                        setSearchTerm("");
                    }
                    setIsOpen(!isOpen);
                }}
            >
                <span className={`${!selectedCountry ? 'text-gray-500' : 'text-gray-900'}`}>
                    {selectedCountry ? getCountryName(selectedCountry) : (placeholder || t('auth.register.select_country'))}
                </span>
                <ChevronDown size={20} className="text-gray-500" />
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden flex flex-col">
                    <div className="p-2 border-b border-gray-100 flex items-center gap-2 sticky top-0 bg-white">
                        <Search size={16} className="text-gray-400" />
                        <input
                            type="text"
                            className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
                            placeholder={t('common.search', 'Search...')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking input
                            autoFocus
                        />
                    </div>

                    <div className="overflow-y-auto max-h-52">
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                                <div
                                    key={country.code}
                                    className={`px-4 py-2 hover:bg-brand-light cursor-pointer text-sm ${value === country.code ? 'bg-orange-50 text-brand-orange font-medium' : 'text-gray-700'}`}
                                    onClick={() => {
                                        onChange(country.code);
                                        setIsOpen(false);
                                        setSearchTerm("");
                                    }}
                                >
                                    {getCountryName(country)}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                {t('common.no_results', 'No countries found')}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
