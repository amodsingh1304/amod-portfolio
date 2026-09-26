// Simple password-based authentication
// In production, use proper session management and secure password hashing

export function setAdminSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_auth', 'true');
    localStorage.setItem('admin_timestamp', Date.now().toString());
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const auth = localStorage.getItem('admin_auth');
  const timestamp = localStorage.getItem('admin_timestamp');
  
  if (!auth || !timestamp) return false;
  
  // Session expires after 24 hours
  const sessionAge = Date.now() - parseInt(timestamp);
  if (sessionAge > 24 * 60 * 60 * 1000) {
    logoutAdmin();
    return false;
  }
  
  return auth === 'true';
}

export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('admin_timestamp');
  }
}
