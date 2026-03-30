/**
 * CMSContext.jsx
 * ---------------
 * Provides dynamic CMS content (site settings, services, team,
 * gallery, testimonials, articles) to all public-facing pages.
 * Data is stored in localStorage and updated reactively via a
 * custom 'cms-updated' window event dispatched by adminService.
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  siteSettingsService,
  cmsServicesService,
  cmsTeamService,
  cmsGalleryService,
  cmsTestimonialsService,
  articlesService,
  cmsMessagesService,
} from '../services/adminService';

const CMSContext = createContext(null);

export function CMSProvider({ children }) {
  const [siteSettings, setSiteSettings] = useState(() => siteSettingsService.get());
  const [services, setServices] = useState(() => cmsServicesService.getAll());
  const [team, setTeam] = useState(() => cmsTeamService.getAll());
  const [gallery, setGallery] = useState(() => cmsGalleryService.getAll());
  const [testimonials, setTestimonials] = useState(() => cmsTestimonialsService.getAll());
  const [articles, setArticles] = useState(() => articlesService.getAll());
  const [messages, setMessages] = useState(() => cmsMessagesService.getAll());

  const refresh = useCallback(() => {
    setSiteSettings(siteSettingsService.get());
    setServices(cmsServicesService.getAll());
    setTeam(cmsTeamService.getAll());
    setGallery(cmsGalleryService.getAll());
    setTestimonials(cmsTestimonialsService.getAll());
    setArticles(articlesService.getAll());
    setMessages(cmsMessagesService.getAll());
  }, []);

  useEffect(() => {
    window.addEventListener('cms-updated', refresh);
    // Also refresh when tab regains focus (e.g. opened admin in another tab)
    window.addEventListener('focus', refresh);
    return () => {
      window.removeEventListener('cms-updated', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, [refresh]);

  return (
    <CMSContext.Provider value={{ siteSettings, services, team, gallery, testimonials, articles, messages, refresh }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used within a CMSProvider');
  return ctx;
}
