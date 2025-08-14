import { useState } from "react";
import { useRouter } from "next/router";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { token } = router.query; // comes from the reset link: /set-password?token=abc

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      return setMessage("Passwords do not match.");
    }

    try {
      const res = await fetch("/api/users/passwordgeneration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Set Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type="submit">Create Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
