import { getPasswordStrength } from "@/shared/lib/validation";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PasswordRequirementsProps {
    password: string;
}

export default function PasswordRequirements({ password }: PasswordRequirementsProps) {
    const { t } = useTranslation();

    // If password is empty, don't show anything (or show all red if preferred, but user requested "below field... as typed")
    // User request: "Si se borran caracteres... debera mostrarse nuevamente".
    // "cuando todas esten cubiertas, ya no se debe mostrar la lista"

    if (!password) return null;

    const strength = getPasswordStrength(password);
    const allMet = Object.values(strength).every(Boolean);

    if (allMet) return null;

    const requirements = [
        { key: 'minLength', label: t('auth.password_min_length'), met: strength.minLength },
        { key: 'hasLowerCase', label: t('auth.password_contain_lowercase'), met: strength.hasLowerCase },
        { key: 'hasUpperCase', label: t('auth.password_contain_uppercase'), met: strength.hasUpperCase },
        { key: 'hasNumber', label: t('auth.password_contain_number'), met: strength.hasNumber },
        { key: 'hasSymbol', label: t('auth.password_contain_symbol'), met: strength.hasSymbol },
    ];

    return (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-2 text-sm">
            {requirements.map((req) => (
                <div
                    key={req.key}
                    className={`flex items-center gap-2 ${req.met ? 'text-green-600' : 'text-red-500'}`}
                >
                    {req.met ? <Check size={14} /> : <X size={14} />}
                    <span>{req.label}</span>
                </div>
            ))}
        </div>
    );
}
