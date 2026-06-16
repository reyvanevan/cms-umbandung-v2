import { getSupabaseClient } from './supabase';
import { mockDb, initialSiteContent, type DbNews, type DbEvent, type DbTestimonial, type DbPartner, type DbSiteContent, type DbLandingStat, type DbLandingPartner, type DbLandingPortfolioItem, type DbDosen, type DbKurikulumCourse, type DbKurikulumPlo, type DbKurikulumProfile, type DbTaStep, type DbPrestasi, type DbPublikasiDosen, type DbKegiatanDosen, type DbKegiatanMahasiswa, type DbAlumni, type DbAlumniSector, type DbStatistikMaba, type DbLaboratorium, type DbKknDocument } from './mockData';



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
      let localItems = mockDb.getAll<DbSiteContent>('site_content');
      let updated = false;
      for (const defaultItem of initialSiteContent) {
        if (!localItems.some(item => item.key === defaultItem.key)) {
          mockDb.insert<DbSiteContent>('site_content', defaultItem);
          updated = true;
        }
      }
      if (updated) {
        localItems = mockDb.getAll<DbSiteContent>('site_content');
      }
      return localItems;
    }

    const { data, error } = await supabase
      .from('site_content')
      .select('*');

    if (error) {
      console.warn('Supabase getSiteContent failed, falling back to mock:', error.message);
      let localItems = mockDb.getAll<DbSiteContent>('site_content');
      let updated = false;
      for (const defaultItem of initialSiteContent) {
        if (!localItems.some(item => item.key === defaultItem.key)) {
          mockDb.insert<DbSiteContent>('site_content', defaultItem);
          updated = true;
        }
      }
      if (updated) {
        localItems = mockDb.getAll<DbSiteContent>('site_content');
      }
      return localItems;
    }

    const fetchedData = data || [];
    const missingItems = initialSiteContent.filter(
      defaultItem => !fetchedData.some(item => item.key === defaultItem.key)
    );

    if (missingItems.length > 0) {
      console.log('Inserting missing site content keys to Supabase:', missingItems.map(i => i.key));
      const { data: insertedData, error: insertError } = await supabase
        .from('site_content')
        .insert(missingItems)
        .select();
      
      if (!insertError && insertedData) {
        return [...fetchedData, ...insertedData];
      }
    }

    return fetchedData;
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
  },

  // --- DOSEN ---
  getDosen: async (): Promise<DbDosen[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.getAll<DbDosen>('dosen').sort((a, b) => a.sort_order - b.sort_order);
    }

    const { data, error } = await supabase
      .from('dosen')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Supabase getDosen failed, falling back to mock:', error.message);
      return mockDb.getAll<DbDosen>('dosen').sort((a, b) => a.sort_order - b.sort_order);
    }
    return data || [];
  },

  createDosen: async (dosen: Omit<DbDosen, 'id' | 'created_at'>): Promise<DbDosen> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.insert<DbDosen>('dosen', dosen);
    }

    const { data, error } = await supabase
      .from('dosen')
      .insert([dosen])
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  updateDosen: async (id: string, updates: Partial<DbDosen>): Promise<DbDosen> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const updated = mockDb.update<DbDosen>('dosen', id, updates);
      if (!updated) throw new Error('Item not found in mock database');
      return updated;
    }

    const { data, error } = await supabase
      .from('dosen')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  deleteDosen: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      mockDb.delete('dosen', id);
      return;
    }

    const { error } = await supabase
      .from('dosen')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
  },

  // --- KURIKULUM COURSES ---
  getKurikulumCourses: async (): Promise<DbKurikulumCourse[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.getAll<DbKurikulumCourse>('kurikulum_courses').sort((a, b) => a.sort_order - b.sort_order);
    }

    const { data, error } = await supabase
      .from('kurikulum_courses')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Supabase getKurikulumCourses failed, falling back to mock:', error.message);
      return mockDb.getAll<DbKurikulumCourse>('kurikulum_courses').sort((a, b) => a.sort_order - b.sort_order);
    }
    return data || [];
  },

  createKurikulumCourse: async (course: Omit<DbKurikulumCourse, 'id' | 'created_at'>): Promise<DbKurikulumCourse> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.insert<DbKurikulumCourse>('kurikulum_courses', course);
    }

    const { data, error } = await supabase
      .from('kurikulum_courses')
      .insert([course])
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  updateKurikulumCourse: async (id: string, updates: Partial<DbKurikulumCourse>): Promise<DbKurikulumCourse> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const updated = mockDb.update<DbKurikulumCourse>('kurikulum_courses', id, updates);
      if (!updated) throw new Error('Item not found in mock database');
      return updated;
    }

    const { data, error } = await supabase
      .from('kurikulum_courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  deleteKurikulumCourse: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      mockDb.delete('kurikulum_courses', id);
      return;
    }

    const { error } = await supabase
      .from('kurikulum_courses')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
  },

  // --- KURIKULUM PLOS ---
  getKurikulumPlos: async (): Promise<DbKurikulumPlo[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.getAll<DbKurikulumPlo>('kurikulum_plos').sort((a, b) => a.sort_order - b.sort_order);
    }

    const { data, error } = await supabase
      .from('kurikulum_plos')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Supabase getKurikulumPlos failed, falling back to mock:', error.message);
      return mockDb.getAll<DbKurikulumPlo>('kurikulum_plos').sort((a, b) => a.sort_order - b.sort_order);
    }
    return data || [];
  },

  createKurikulumPlo: async (plo: Omit<DbKurikulumPlo, 'id' | 'created_at'>): Promise<DbKurikulumPlo> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.insert<DbKurikulumPlo>('kurikulum_plos', plo);
    }

    const { data, error } = await supabase
      .from('kurikulum_plos')
      .insert([plo])
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  updateKurikulumPlo: async (id: string, updates: Partial<DbKurikulumPlo>): Promise<DbKurikulumPlo> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const updated = mockDb.update<DbKurikulumPlo>('kurikulum_plos', id, updates);
      if (!updated) throw new Error('Item not found in mock database');
      return updated;
    }

    const { data, error } = await supabase
      .from('kurikulum_plos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  deleteKurikulumPlo: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      mockDb.delete('kurikulum_plos', id);
      return;
    }

    const { error } = await supabase
      .from('kurikulum_plos')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
  },

  // --- KURIKULUM PROFILES ---
  getKurikulumProfiles: async (): Promise<DbKurikulumProfile[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.getAll<DbKurikulumProfile>('kurikulum_profiles').sort((a, b) => a.sort_order - b.sort_order);
    }

    const { data, error } = await supabase
      .from('kurikulum_profiles')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Supabase getKurikulumProfiles failed, falling back to mock:', error.message);
      return mockDb.getAll<DbKurikulumProfile>('kurikulum_profiles').sort((a, b) => a.sort_order - b.sort_order);
    }
    return data || [];
  },

  createKurikulumProfile: async (profile: Omit<DbKurikulumProfile, 'id' | 'created_at'>): Promise<DbKurikulumProfile> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.insert<DbKurikulumProfile>('kurikulum_profiles', profile);
    }

    const { data, error } = await supabase
      .from('kurikulum_profiles')
      .insert([profile])
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  updateKurikulumProfile: async (id: string, updates: Partial<DbKurikulumProfile>): Promise<DbKurikulumProfile> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const updated = mockDb.update<DbKurikulumProfile>('kurikulum_profiles', id, updates);
      if (!updated) throw new Error('Item not found in mock database');
      return updated;
    }

    const { data, error } = await supabase
      .from('kurikulum_profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  deleteKurikulumProfile: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      mockDb.delete('kurikulum_profiles', id);
      return;
    }

    const { error } = await supabase
      .from('kurikulum_profiles')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
  },

  // --- TUGAS AKHIR STEPS ---
  getTaSteps: async (): Promise<DbTaStep[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.getAll<DbTaStep>('tugas_akhir_steps').sort((a, b) => a.sort_order - b.sort_order);
    }

    const { data, error } = await supabase
      .from('tugas_akhir_steps')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Supabase getTaSteps failed, falling back to mock:', error.message);
      return mockDb.getAll<DbTaStep>('tugas_akhir_steps').sort((a, b) => a.sort_order - b.sort_order);
    }
    return data || [];
  },

  createTaStep: async (step: Omit<DbTaStep, 'id' | 'created_at'>): Promise<DbTaStep> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return mockDb.insert<DbTaStep>('tugas_akhir_steps', step);
    }

    const { data, error } = await supabase
      .from('tugas_akhir_steps')
      .insert([step])
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  updateTaStep: async (id: string, updates: Partial<DbTaStep>): Promise<DbTaStep> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const updated = mockDb.update<DbTaStep>('tugas_akhir_steps', id, updates);
      if (!updated) throw new Error('Item not found in mock database');
      return updated;
    }

    const { data, error } = await supabase
      .from('tugas_akhir_steps')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return data;
  },

  deleteTaStep: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      mockDb.delete('tugas_akhir_steps', id);
      return;
    }

    const { error } = await supabase
      .from('tugas_akhir_steps')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
  },

  // --- PRESTASI ---
  getPrestasi: async (): Promise<DbPrestasi[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.getAll<DbPrestasi>('prestasi').sort((a, b) => a.sort_order - b.sort_order);
    const { data, error } = await supabase.from('prestasi').select('*').order('sort_order');
    if (error) { console.warn('getPrestasi fallback:', error.message); return mockDb.getAll<DbPrestasi>('prestasi').sort((a, b) => a.sort_order - b.sort_order); }
    return data || [];
  },
  createPrestasi: async (row: Omit<DbPrestasi, 'id' | 'created_at'>): Promise<DbPrestasi> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.insert<DbPrestasi>('prestasi', row);
    const { data, error } = await supabase.from('prestasi').insert([row]).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  updatePrestasi: async (id: string, updates: Partial<DbPrestasi>): Promise<DbPrestasi> => {
    const supabase = getSupabaseClient();
    if (!supabase) { const u = mockDb.update<DbPrestasi>('prestasi', id, updates); if (!u) throw new Error('Not found'); return u; }
    const { data, error } = await supabase.from('prestasi').update(updates).eq('id', id).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  deletePrestasi: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) { mockDb.delete('prestasi', id); return; }
    const { error } = await supabase.from('prestasi').delete().eq('id', id);
    if (error) throw new Error(`Supabase error: ${error.message}`);
  },

  // --- LABORATORIUM ---
  getLaboratorium: async (): Promise<DbLaboratorium[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.getAll<DbLaboratorium>('laboratorium').sort((a, b) => a.sort_order - b.sort_order);
    const { data, error } = await supabase.from('laboratorium').select('*').order('sort_order');
    if (error) { console.warn('getLaboratorium fallback:', error.message); return mockDb.getAll<DbLaboratorium>('laboratorium').sort((a, b) => a.sort_order - b.sort_order); }
    return data || [];
  },
  createLaboratorium: async (row: Omit<DbLaboratorium, 'id' | 'created_at'>): Promise<DbLaboratorium> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.insert<DbLaboratorium>('laboratorium', row);
    const { data, error } = await supabase.from('laboratorium').insert([row]).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  updateLaboratorium: async (id: string, updates: Partial<DbLaboratorium>): Promise<DbLaboratorium> => {
    const supabase = getSupabaseClient();
    if (!supabase) { const u = mockDb.update<DbLaboratorium>('laboratorium', id, updates); if (!u) throw new Error('Not found'); return u; }
    const { data, error } = await supabase.from('laboratorium').update(updates).eq('id', id).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  deleteLaboratorium: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) { mockDb.delete('laboratorium', id); return; }
    const { error } = await supabase.from('laboratorium').delete().eq('id', id);
    if (error) throw new Error(`Supabase error: ${error.message}`);
  },

  // --- PUBLIKASI DOSEN ---
  getPublikasiDosen: async (): Promise<DbPublikasiDosen[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.getAll<DbPublikasiDosen>('publikasi_dosen').sort((a, b) => a.sort_order - b.sort_order);
    const { data, error } = await supabase.from('publikasi_dosen').select('*').order('sort_order');
    if (error) { console.warn('getPublikasiDosen fallback:', error.message); return mockDb.getAll<DbPublikasiDosen>('publikasi_dosen').sort((a, b) => a.sort_order - b.sort_order); }
    return data || [];
  },
  createPublikasiDosen: async (row: Omit<DbPublikasiDosen, 'id' | 'created_at'>): Promise<DbPublikasiDosen> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.insert<DbPublikasiDosen>('publikasi_dosen', row);
    const { data, error } = await supabase.from('publikasi_dosen').insert([row]).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  updatePublikasiDosen: async (id: string, updates: Partial<DbPublikasiDosen>): Promise<DbPublikasiDosen> => {
    const supabase = getSupabaseClient();
    if (!supabase) { const u = mockDb.update<DbPublikasiDosen>('publikasi_dosen', id, updates); if (!u) throw new Error('Not found'); return u; }
    const { data, error } = await supabase.from('publikasi_dosen').update(updates).eq('id', id).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  deletePublikasiDosen: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) { mockDb.delete('publikasi_dosen', id); return; }
    const { error } = await supabase.from('publikasi_dosen').delete().eq('id', id);
    if (error) throw new Error(`Supabase error: ${error.message}`);
  },

  // --- KEGIATAN DOSEN ---
  getKegiatanDosen: async (): Promise<DbKegiatanDosen[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.getAll<DbKegiatanDosen>('kegiatan_dosen').sort((a, b) => a.sort_order - b.sort_order);
    const { data, error } = await supabase.from('kegiatan_dosen').select('*').order('sort_order');
    if (error) { console.warn('getKegiatanDosen fallback:', error.message); return mockDb.getAll<DbKegiatanDosen>('kegiatan_dosen').sort((a, b) => a.sort_order - b.sort_order); }
    return data || [];
  },
  createKegiatanDosen: async (row: Omit<DbKegiatanDosen, 'id' | 'created_at'>): Promise<DbKegiatanDosen> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.insert<DbKegiatanDosen>('kegiatan_dosen', row);
    const { data, error } = await supabase.from('kegiatan_dosen').insert([row]).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  updateKegiatanDosen: async (id: string, updates: Partial<DbKegiatanDosen>): Promise<DbKegiatanDosen> => {
    const supabase = getSupabaseClient();
    if (!supabase) { const u = mockDb.update<DbKegiatanDosen>('kegiatan_dosen', id, updates); if (!u) throw new Error('Not found'); return u; }
    const { data, error } = await supabase.from('kegiatan_dosen').update(updates).eq('id', id).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  deleteKegiatanDosen: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) { mockDb.delete('kegiatan_dosen', id); return; }
    const { error } = await supabase.from('kegiatan_dosen').delete().eq('id', id);
    if (error) throw new Error(`Supabase error: ${error.message}`);
  },

  // --- KEGIATAN MAHASISWA ---
  getKegiatanMahasiswa: async (): Promise<DbKegiatanMahasiswa[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.getAll<DbKegiatanMahasiswa>('kegiatan_mahasiswa').sort((a, b) => a.sort_order - b.sort_order);
    const { data, error } = await supabase.from('kegiatan_mahasiswa').select('*').order('sort_order');
    if (error) { console.warn('getKegiatanMahasiswa fallback:', error.message); return mockDb.getAll<DbKegiatanMahasiswa>('kegiatan_mahasiswa').sort((a, b) => a.sort_order - b.sort_order); }
    return data || [];
  },
  createKegiatanMahasiswa: async (row: Omit<DbKegiatanMahasiswa, 'id' | 'created_at'>): Promise<DbKegiatanMahasiswa> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.insert<DbKegiatanMahasiswa>('kegiatan_mahasiswa', row);
    const { data, error } = await supabase.from('kegiatan_mahasiswa').insert([row]).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  updateKegiatanMahasiswa: async (id: string, updates: Partial<DbKegiatanMahasiswa>): Promise<DbKegiatanMahasiswa> => {
    const supabase = getSupabaseClient();
    if (!supabase) { const u = mockDb.update<DbKegiatanMahasiswa>('kegiatan_mahasiswa', id, updates); if (!u) throw new Error('Not found'); return u; }
    const { data, error } = await supabase.from('kegiatan_mahasiswa').update(updates).eq('id', id).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  deleteKegiatanMahasiswa: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) { mockDb.delete('kegiatan_mahasiswa', id); return; }
    const { error } = await supabase.from('kegiatan_mahasiswa').delete().eq('id', id);
    if (error) throw new Error(`Supabase error: ${error.message}`);
  },

  // --- ALUMNI ---
  getAlumni: async (): Promise<DbAlumni[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.getAll<DbAlumni>('alumni').sort((a, b) => a.sort_order - b.sort_order);
    const { data, error } = await supabase.from('alumni').select('*').order('sort_order');
    if (error) { console.warn('getAlumni fallback:', error.message); return mockDb.getAll<DbAlumni>('alumni').sort((a, b) => a.sort_order - b.sort_order); }
    return data || [];
  },
  createAlumni: async (row: Omit<DbAlumni, 'id' | 'created_at'>): Promise<DbAlumni> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.insert<DbAlumni>('alumni', row);
    const { data, error } = await supabase.from('alumni').insert([row]).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  updateAlumni: async (id: string, updates: Partial<DbAlumni>): Promise<DbAlumni> => {
    const supabase = getSupabaseClient();
    if (!supabase) { const u = mockDb.update<DbAlumni>('alumni', id, updates); if (!u) throw new Error('Not found'); return u; }
    const { data, error } = await supabase.from('alumni').update(updates).eq('id', id).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  deleteAlumni: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) { mockDb.delete('alumni', id); return; }
    const { error } = await supabase.from('alumni').delete().eq('id', id);
    if (error) throw new Error(`Supabase error: ${error.message}`);
  },

  getAlumniSectors: async (): Promise<DbAlumniSector[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.getAll<DbAlumniSector>('alumni_sectors').sort((a, b) => a.sort_order - b.sort_order);
    const { data, error } = await supabase.from('alumni_sectors').select('*').order('sort_order');
    if (error) { console.warn('getAlumniSectors fallback:', error.message); return mockDb.getAll<DbAlumniSector>('alumni_sectors').sort((a, b) => a.sort_order - b.sort_order); }
    return data || [];
  },
  createAlumniSector: async (row: Omit<DbAlumniSector, 'id' | 'created_at'>): Promise<DbAlumniSector> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.insert<DbAlumniSector>('alumni_sectors', row);
    const { data, error } = await supabase.from('alumni_sectors').insert([row]).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  updateAlumniSector: async (id: string, updates: Partial<DbAlumniSector>): Promise<DbAlumniSector> => {
    const supabase = getSupabaseClient();
    if (!supabase) { const u = mockDb.update<DbAlumniSector>('alumni_sectors', id, updates); if (!u) throw new Error('Not found'); return u; }
    const { data, error } = await supabase.from('alumni_sectors').update(updates).eq('id', id).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  deleteAlumniSector: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) { mockDb.delete('alumni_sectors', id); return; }
    const { error } = await supabase.from('alumni_sectors').delete().eq('id', id);
    if (error) throw new Error(`Supabase error: ${error.message}`);
  },

  // --- STATISTIK MABA ---
  getStatistikMaba: async (): Promise<DbStatistikMaba[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.getAll<DbStatistikMaba>('statistik_maba').sort((a, b) => a.sort_order - b.sort_order);
    const { data, error } = await supabase.from('statistik_maba').select('*').order('sort_order');
    if (error) { console.warn('getStatistikMaba fallback:', error.message); return mockDb.getAll<DbStatistikMaba>('statistik_maba').sort((a, b) => a.sort_order - b.sort_order); }
    return data || [];
  },
  createStatistikMaba: async (row: Omit<DbStatistikMaba, 'id' | 'created_at'>): Promise<DbStatistikMaba> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.insert<DbStatistikMaba>('statistik_maba', row);
    const { data, error } = await supabase.from('statistik_maba').insert([row]).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  updateStatistikMaba: async (id: string, updates: Partial<DbStatistikMaba>): Promise<DbStatistikMaba> => {
    const supabase = getSupabaseClient();
    if (!supabase) { const u = mockDb.update<DbStatistikMaba>('statistik_maba', id, updates); if (!u) throw new Error('Not found'); return u; }
    const { data, error } = await supabase.from('statistik_maba').update(updates).eq('id', id).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  deleteStatistikMaba: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) { mockDb.delete('statistik_maba', id); return; }
    const { error } = await supabase.from('statistik_maba').delete().eq('id', id);
    if (error) throw new Error(`Supabase error: ${error.message}`);
  },

  // --- KKN DOCUMENTS ---
  getKknDocuments: async (): Promise<DbKknDocument[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.getAll<DbKknDocument>('kkn_documents').sort((a, b) => a.sort_order - b.sort_order);
    const { data, error } = await supabase.from('praktik_kerja_docs').select('*').order('sort_order');
    if (error) { console.warn('getKknDocuments fallback:', error.message); return mockDb.getAll<DbKknDocument>('kkn_documents').sort((a, b) => a.sort_order - b.sort_order); }
    return data || [];
  },
  createKknDocument: async (row: Omit<DbKknDocument, 'id' | 'created_at'>): Promise<DbKknDocument> => {
    const supabase = getSupabaseClient();
    if (!supabase) return mockDb.insert<DbKknDocument>('kkn_documents', row);
    const { data, error } = await supabase.from('praktik_kerja_docs').insert([row]).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  updateKknDocument: async (id: string, updates: Partial<DbKknDocument>): Promise<DbKknDocument> => {
    const supabase = getSupabaseClient();
    if (!supabase) { const u = mockDb.update<DbKknDocument>('kkn_documents', id, updates); if (!u) throw new Error('Not found'); return u; }
    const { data, error } = await supabase.from('praktik_kerja_docs').update(updates).eq('id', id).select().single();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data;
  },
  deleteKknDocument: async (id: string): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) { mockDb.delete('kkn_documents', id); return; }
    const { error } = await supabase.from('praktik_kerja_docs').delete().eq('id', id);
    if (error) throw new Error(`Supabase error: ${error.message}`);
  }
};
