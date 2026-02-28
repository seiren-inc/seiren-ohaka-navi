interface BasicInfoTableProps {
    data: { label: string; value: string }[];
}

export function BasicInfoTable({ data }: BasicInfoTableProps) {
    return (
        <div className="border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
                {data.map((item, idx) => (
                    <div key={idx} className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                        <dt className="text-sm font-bold text-gray-700 bg-gray-50 sm:bg-transparent py-1 px-2 sm:p-0 rounded sm:rounded-none inline-block sm:block w-fit sm:w-auto">
                            {item.label}
                        </dt>
                        <dd className="text-sm text-gray-600 sm:col-span-2 px-2 sm:p-0">
                            {item.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
