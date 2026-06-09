import { getSupabaseClient } from './supabase';
import { mockDb, type DbNews, type DbEvent, type DbTestimonial, type DbPartner, type DbSiteContent, type DbLandingStat, type DbLandingPartner, type DbLandingPortfolioItem } from './mockData';

export type ConnectionMode = 'supabase' | 'mock';

export function getConnectionMode(): ConnectionMode {
  const client = getSupabaseClient();
  return client ? 'supabase' : 'mock';
}

export const dataService = {
  // --- NEWS ---
  getNews: async (): Promise<DbNews[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.getAll<DbNews>('news').sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.warn('Supabase getNews failed, falling back to mock data:', error.message);
      return mockDb.getAll<DbNews>('news').sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return data || [];
  },

  createNews: async (news: Omit<DbNews, 'id' | 'created_at'>): Promise<DbNews> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.insert<DbNews>('news', news);
    }

    const { data, error } = await supabase
      .from('news')
      .insert([news])
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  updateNews: async (id: string, updates: Partial<DbNews>): Promise<DbNews> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const updated = mockDb.update<DbNews>('news', id, updates);
      if (!updated) throw new Error('Item not found in mock database');
      return updated;
    }

    const { data, error } = await supabase
      .from('news')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  deleteNews: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      mockDb.delete('news', id);
      return;
    }

    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
  },

  // --- EVENTS ---
  getEvents: async (): Promise<DbEvent[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.getAll<DbEvent>('events').sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.warn('Supabase getEvents failed, falling back to mock:', error.message);
      return mockDb.getAll<DbEvent>('events').sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }
    return data || [];
  },

  createEvent: async (event: Omit<DbEvent, 'id' | 'created_at'>): Promise<DbEvent> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.insert<DbEvent>('events', event);
    }

    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  updateEvent: async (id: string, updates: Partial<DbEvent>): Promise<DbEvent> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const updated = mockDb.update<DbEvent>('events', id, updates);
      if (!updated) throw new Error('Item not found in mock database');
      return updated;
    }

    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  deleteEvent: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      mockDb.delete('events', id);
      return;
    }

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
  },

  // --- TESTIMONIALS ---
  getTestimonials: async (): Promise<DbTestimonial[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.getAll<DbTestimonial>('testimonials');
    }

    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.warn('Supabase getTestimonials failed, falling back to mock:', error.message);
      return mockDb.getAll<DbTestimonial>('testimonials');
    }
    return data || [];
  },

  createTestimonial: async (testimonial: Omit<DbTestimonial, 'id' | 'created_at'>): Promise<DbTestimonial> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.insert<DbTestimonial>('testimonials', testimonial);
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert([testimonial])
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  updateTestimonial: async (id: string, updates: Partial<DbTestimonial>): Promise<DbTestimonial> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const updated = mockDb.update<DbTestimonial>('testimonials', id, updates);
      if (!updated) throw new Error('Item not found in mock database');
      return updated;
    }

    const { data, error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  deleteTestimonial: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      mockDb.delete('testimonials', id);
      return;
    }

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
  },

  // --- PARTNERS ---
  getPartners: async (): Promise<DbPartner[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.getAll<DbPartner>('partners');
    }

    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.warn('Supabase getPartners failed, falling back to mock:', error.message);
      return mockDb.getAll<DbPartner>('partners');
    }
    return data || [];
  },

  createPartner: async (partner: Omit<DbPartner, 'id' | 'created_at'>): Promise<DbPartner> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.insert<DbPartner>('partners', partner);
    }

    const { data, error } = await supabase
      .from('partners')
      .insert([partner])
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  updatePartner: async (id: string, updates: Partial<DbPartner>): Promise<DbPartner> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const updated = mockDb.update<DbPartner>('partners', id, updates);
      if (!updated) throw new Error('Item not found in mock database');
      return updated;
    }

    const { data, error } = await supabase
      .from('partners')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  deletePartner: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      mockDb.delete('partners', id);
      return;
    }

    const { error } = await supabase
      .from('partners')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
  },

  // --- SITE CONTENT ---
  getSiteContent: async (): Promise<DbSiteContent[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.getAll<DbSiteContent>('site_content');
    }

    const { data, error } = await supabase
      .from('site_content')
      .select('*');

    if (error) {
      console.warn('Supabase getSiteContent failed, falling back to mock:', error.message);
      return mockDb.getAll<DbSiteContent>('site_content');
    }
    return data || [];
  },

  updateSiteContent: async (key: string, value: string, valueEn: string | null): Promise<DbSiteContent> => {
    const supabase = getSupabaseClient();
    const updates = { value, value_en: valueEn, updated_at: new Date().toISOString() };
    
    if (!supabase) {
      const updated = mockDb.update<DbSiteContent>('site_content', key, updates, 'key');
      if (!updated) throw new Error('Key not found in mock database');
      return updated;
    }

    const { data, error } = await supabase
      .from('site_content')
      .update(updates)
      .eq('key', key)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  // --- LANDING STATS ---
  getLandingStats: async (): Promise<DbLandingStat[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.getAll<DbLandingStat>('landing_stats').sort((a, b) => a.sort_order - b.sort_order);
    }

    const { data, error } = await supabase
      .from('landing_stats')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Supabase getLandingStats failed, falling back to mock:', error.message);
      return mockDb.getAll<DbLandingStat>('landing_stats').sort((a, b) => a.sort_order - b.sort_order);
    }
    return data || [];
  },

  createLandingStat: async (stat: Omit<DbLandingStat, 'id'>): Promise<DbLandingStat> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.insert<DbLandingStat>('landing_stats', stat);
    }

    const { data, error } = await supabase
      .from('landing_stats')
      .insert([stat])
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  updateLandingStat: async (id: string, updates: Partial<DbLandingStat>): Promise<DbLandingStat> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const updated = mockDb.update<DbLandingStat>('landing_stats', id, updates);
      if (!updated) throw new Error('Item not found in mock database');
      return updated;
    }

    const { data, error } = await supabase
      .from('landing_stats')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  deleteLandingStat: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      mockDb.delete('landing_stats', id);
      return;
    }

    const { error } = await supabase
      .from('landing_stats')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
  },

  // --- LANDING PARTNERS ---
  getLandingPartners: async (): Promise<DbLandingPartner[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.getAll<DbLandingPartner>('landing_partners').sort((a, b) => a.sort_order - b.sort_order);
    }

    const { data, error } = await supabase
      .from('landing_partners')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Supabase getLandingPartners failed, falling back to mock:', error.message);
      return mockDb.getAll<DbLandingPartner>('landing_partners').sort((a, b) => a.sort_order - b.sort_order);
    }
    return data || [];
  },

  createLandingPartner: async (partner: Omit<DbLandingPartner, 'id'>): Promise<DbLandingPartner> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.insert<DbLandingPartner>('landing_partners', partner);
    }

    const { data, error } = await supabase
      .from('landing_partners')
      .insert([partner])
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  updateLandingPartner: async (id: string, updates: Partial<DbLandingPartner>): Promise<DbLandingPartner> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const updated = mockDb.update<DbLandingPartner>('landing_partners', id, updates);
      if (!updated) throw new Error('Item not found in mock database');
      return updated;
    }

    const { data, error } = await supabase
      .from('landing_partners')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  deleteLandingPartner: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      mockDb.delete('landing_partners', id);
      return;
    }

    const { error } = await supabase
      .from('landing_partners')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
  },

  // --- LANDING PORTFOLIO ITEMS ---
  getLandingPortfolioItems: async (): Promise<DbLandingPortfolioItem[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.getAll<DbLandingPortfolioItem>('landing_portfolio_items').sort((a, b) => a.sort_order - b.sort_order);
    }

    const { data, error } = await supabase
      .from('landing_portfolio_items')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Supabase getLandingPortfolioItems failed, falling back to mock:', error.message);
      return mockDb.getAll<DbLandingPortfolioItem>('landing_portfolio_items').sort((a, b) => a.sort_order - b.sort_order);
    }
    return data || [];
  },

  createLandingPortfolioItem: async (item: Omit<DbLandingPortfolioItem, 'id'>): Promise<DbLandingPortfolioItem> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.insert<DbLandingPortfolioItem>('landing_portfolio_items', item);
    }

    const { data, error } = await supabase
      .from('landing_portfolio_items')
      .insert([item])
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  updateLandingPortfolioItem: async (id: string, updates: Partial<DbLandingPortfolioItem>): Promise<DbLandingPortfolioItem> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const updated = mockDb.update<DbLandingPortfolioItem>('landing_portfolio_items', id, updates);
      if (!updated) throw new Error('Item not found in mock database');
      return updated;
    }

    const { data, error } = await supabase
      .from('landing_portfolio_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  deleteLandingPortfolioItem: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      mockDb.delete('landing_portfolio_items', id);
      return;
    }

    const { error } = await supabase
      .from('landing_portfolio_items')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
  }
};
