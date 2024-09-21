import { GetUserCurrent, userCurrent } from "package/api/user/current";
import { useEffect, useState } from "react";

export function UseGetUserCurrent(accessToken: string, refresh: number) {
    const [user, setUser] = useState<userCurrent>({
        id: 0,
        avatar: "",
        email: "",
        fullName: '',
        firstName: '',
        lastName: '',
        phone: "",
        address: "",
        roleId: 0,
    });
    const [loading, setLoading] = useState<boolean>(false);

    async function fetchUserCurrent() {
        if (!accessToken) {
            return;
        }
        try {
            setLoading(true);
            const response = await GetUserCurrent(accessToken);
            if (response.status !== "success") {
                console.error(`Error fetching user: ${response.responseText}`);
                return;
            }
            setUser(response.data);
        } catch (error: any) {
            console.error(`Failed to fetch user: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserCurrent();
    }, [accessToken, refresh]);

    return {
        user,
        loading,
    };
}
