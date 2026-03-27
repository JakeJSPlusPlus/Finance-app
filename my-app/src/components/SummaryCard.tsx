



type SummaryCardProps = {
    label: string;
    value: number | string;
    highlight?: boolean;
    sign?: boolean;
}

export function SummaryCard({
        label, value, highlight = false, sign = false
    }: SummaryCardProps) {
    return (
        <div className={`rounded-xl p-4 border ${highlight ? "border-yellow-400 bg-yellow-50" : "border-gray-200"}`}>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
            <p className={`text-2xl font-bold ${highlight ? "text-red-600" : ""} ${highlight ? "text-green-600" : ""}`}>
                {value}
            </p>
        </div>
    );
}