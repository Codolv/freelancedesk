import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signIn(e) {
    e.preventDefault();
      await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      navigate("/projects");
    }

  return(
    <form onSubmit={signIn} className="space-y-4 bg-gray-50 p-4 rounded-lg shadow">
      <h2 className="font-bold text-lg">Login</h2>

      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Login
      </button>
    </form>
  );
}
