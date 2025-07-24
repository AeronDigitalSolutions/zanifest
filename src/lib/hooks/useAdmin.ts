import { useState, useEffect } from "react";

type DecodedToken = {
  userName: string;
  email: string;
  role: string;
};

export function useAdmin() {
  const [admin, setAdmin] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      console.log("Fetching admin info...decoding token");
      try {
        const res = await fetch("/api/admin/getAdminName");
        console.log("Response status for admin:", res.status);
        if (res.ok) {
          const data = await res.json();
          console.log("Admin data fetched:", data);
          setAdmin({
            userName: data.user.name, // 👈 Correctly mapped
            email: data.user.email,
            role: data.user.role,
          });
        } else {
          console.error("Failed to fetch admin data:", res.status);
          setAdmin(null);
        }
      } catch (error) {
        console.error("Error fetching admin info:", error);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  return { admin, loading };
}
