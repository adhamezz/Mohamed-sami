/**
 * AdminFullSettingsPage.jsx
 * --------------------------
 * Redirects to the main site settings page.
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminFullSettingsPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/admin/site-settings', { replace: true });
  }, [navigate]);
  return null;
}