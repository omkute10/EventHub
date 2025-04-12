export const authHandler = async (
  email: string,
  password: string,
  action: 'signup' | 'login'
) => {
  const response = await fetch('http://localhost:3000/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, action })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Auth failed");
  }

  return await response.json();
}; 