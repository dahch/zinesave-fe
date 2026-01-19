"use client";
import Logo from "@/components/Logo";
import api from "@/lib/api";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function OnboardingPage() {
    const router = useRouter();
    const [isCompany, setIsCompany] = useState(false);
    const [country, setCountry] = useState("");
    const [vatNumber, setVatNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.put("/me", {
                is_company: isCompany,
                country: country,
                vat_number: isCompany ? vatNumber : null,
            });
            toast.success("¡Perfil actualizado correctamente!");
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar el perfil.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-light p-4">
            <div className="mb-8">
                <Logo scale="lg" linkToHome={false} />
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-brand-orange">
                <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
                    ¡Casi terminamos!
                </h2>
                <p className="text-gray-500 text-center mb-6 text-sm">
                    Necesitamos algunos datos adicionales para configurar tu cuenta.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <input
                            type="checkbox"
                            id="isCompany"
                            className="w-4 h-4 text-brand-orange border-gray-300 rounded focus:ring-brand-orange"
                            checked={isCompany}
                            onChange={(e) => setIsCompany(e.target.checked)}
                        />
                        <label htmlFor="isCompany" className="text-sm text-gray-700 font-medium cursor-pointer">
                            ¿Eres una empresa?
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            País <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                required
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition bg-white appearance-none cursor-pointer"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Selecciona tu país</option>
                                <option value="ES">España</option>
                                <option value="MX">México</option>
                                <option value="US">Estados Unidos</option>
                                <option value="AR">Argentina</option>
                                <option value="CO">Colombia</option>
                                <option value="CL">Chile</option>
                                <option value="Other">Otro</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                <ChevronDown size={20} />
                            </div>
                        </div>
                    </div>

                    {isCompany && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Número de IVA / TAX ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition"
                                value={vatNumber}
                                onChange={(e) => setVatNumber(e.target.value)}
                                placeholder="Ej: ES12345678Z"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-brand-orange text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition disabled:opacity-50 mt-4"
                    >
                        {isLoading ? "Guardando..." : "Completar Registro"}
                    </button>
                </form>
            </div>
        </div>
    );
}
