// Simple credential check for demo
export function authenticateUser(username, password) {
  if (username === 'student01' && password === 'student01') {
    return { role: 'student' };
  }
  if (username === 'admin' && password === 'admin01') {
    return { role: 'admin' };
  }
  return null;
}
