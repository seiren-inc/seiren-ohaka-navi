export interface AddressData {
    prefecture: string;
    city: string;
    town: string;
}

export async function fetchAddressFromZip(zip: string): Promise<AddressData | null> {
    // Remove hyphens
    const cleanZip = zip.replace(/-/g, '');

    if (!/^\d{7}$/.test(cleanZip)) {
        return null;
    }

    try {
        // Using zipcloud API (CORS enabled, suitable for client-side usage)
        const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleanZip}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const result = data.results[0];
            return {
                prefecture: result.address1,
                city: result.address2,
                town: result.address3
            };
        }

        return null;
    } catch (error) {
        console.error("Failed to fetch address:", error);
        return null;
    }
}
