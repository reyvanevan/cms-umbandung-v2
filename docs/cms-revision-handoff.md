# CMS Revision Handoff

Last updated: 2026-06-16

## Execution Status After Handoff

Status after the 2026-06-16 implementation pass:

- [x] Home guided editors retained and not regressed.
- [x] Non-Home `site_content` sections now use guided CMS editors where appropriate.
- [x] Visi & Misi has a guided editor with repeatable list controls for missions, goals, and strategies, still saved as newline-delimited `site_content`.
- [x] Struktur Organisasi / Tata Kelola has a guided editor for Sekretaris and UPM, including name, role/title, email, photo, and dosen-linked photo compatibility.
- [x] Kurikulum has a page-level CMS editor for heading, description, intro, guideline, and MBKM/internship copy.
- [x] Tugas Akhir has CMS-managed heading, description, prerequisites, document/template list, sample topics, and step list remains editable through `tugas_akhir_steps`.
- [x] Praktik Kerja & KKN has grouped CMS controls for page copy plus mitra, panduan, and pendaftaran links.
- [x] Kerjasama has CMS-managed page copy and cooperation flow steps.
- [x] Statistik has CMS-managed page heading, description, statistic card copy, values, labels, and chart title.
- [x] Alumni has CMS-managed page copy, tracer/career/community links, directory CRUD, and a new CMS editor for `alumni_sectors`.
- [x] Kegiatan Dosen and Kegiatan Mahasiswa have CMS-managed page heading and description fields.
- [x] Publikasi / Tulisan Dosen has CMS-managed page heading and description fields.
- [x] Dosen list page has CMS-managed page heading and description fields.
- [x] Public Astro layouts consume the newly added CMS keys where applicable.
- [x] `cms-prodi` build passed with `npm run build`.
- [x] `prodi-umbandung` build passed with `npm run build`; Supabase DNS warnings were expected in the restricted environment and final exit code was `0`.

Remaining / intentionally deferred:

- [ ] Home list-based tabs (`Laboratorium`, `Statistik Ribbon`, `Berita Terkini`, `Event Terkini`, `Galeri Prestasi`, `Mitra & Kolaborasi`, `Testimoni Alumni`) are still mostly CRUD/table UI. They are editable, but not fully redesigned into richer landing-section editors.
- [ ] Dosen detail profile expansion is deferred. Do not add education, research interests, selected publications, email, or bio fields until the public detail page is audited and confirmed to render them.
- [ ] Tugas Akhir document/templates currently use `site_content` line-list fields. A dedicated repeatable documents table can still be added later if document metadata grows beyond simple name/link rows.

This document is a handoff note for the next AI/engineer working on the CMS and public site integration. The current work has focused on the Home/Landing page only. Most non-Home pages still need the same level of CMS/UX cleanup.

## Repositories

- `cms-prodi`: React/Vite CMS. Main files are under `src/`.
- `prodi-umbandung`: Astro public site. Main files are under `src/`.
- Both repos are separate Git repositories and are pushed independently.

## Current Direction

The CMS should be organized around what admins see on the public website. Avoid exposing raw database keys as the primary editing experience when a section can be represented as a guided form.

Keep using existing Supabase tables where possible. For simple static page copy, continue using `site_content`. Add new tables only when content is genuinely repeatable/dynamic, such as slides, steps, documents, organization roles, or alumni sectors.

## Completed: Home CMS Cleanup

The Home/Landing page CMS has been substantially reorganized.

### Home Navigation Order

The CMS sidebar Home group now follows the actual public landing page order:

1. Ringkasan Landing Page
2. Spanduk & Jumbotron
3. Sambutan Kaprodi
4. Informasi Singkat Beranda
5. Laboratorium
6. Video Profil
7. Statistik Ribbon
8. Berita Terkini
9. Event Terkini
10. Galeri Prestasi
11. Quote / Editorial Slider
12. Mitra & Kolaborasi
13. Testimoni Alumni

### Guided Home Editors

These Home sections now have guided editors in `src/components/Tabs/SiteContentTab.tsx` instead of raw key-value cards:

- `Ringkasan Landing Page`: overview/checklist of Home sections and field completion state.
- `Spanduk & Jumbotron`: hero title, subtitle, background media, overlay, preview.
- `Sambutan Kaprodi`: title, two welcome paragraphs, Kaprodi name/title/photo, dosen linking, preview.
- `Informasi Singkat Beranda`: three cards for degree, SKS, and study duration, with previews.
- `Video Profil`: title, description, YouTube URL, iframe preview.
- `Quote / Editorial Slider`: four quote/editorial slides, each with title, subtitle/person, description, accent color, image, preview.

### Home Content Keys

The current Home guided editors still write to `site_content`. Important keys include:

- Hero: `hero_title`, `hero_subtitle`, `hero_bg_url`, `hero_overlay_opacity`
- Kaprodi: `sambutan_title`, `kaprodi_welcome`, `kaprodi_welcome_p2`, `kaprodi_name`, `kaprodi_title`, `kaprodi_photo_url`
- Info cards: `info_singkat_degree_title`, `info_singkat_degree_name`, `info_singkat_sks_title`, `info_singkat_sks_desc`, `info_singkat_duration_title`, `info_singkat_duration_desc`
- Video: `video_profile_title`, `video_profile_desc`, `hero_video_url`
- Editorial/quote slides: `editorial_slide_1_*` through `editorial_slide_4_*`, with suffixes `title`, `subtitle`, `description`, `accent`, `image_url`

### Removed/Hidden From Home

- `Filosofi Pembelajaran` is not an actual Home section anymore.
- Old `philosophy_*` keys are hidden from Home CMS filtering. Do not bring this back as a Home section unless the public landing page adds a real section for it.
- The current conceptual replacement is `Quote / Editorial Slider`.

### Event Rename and Landing Style

- User-facing CMS labels changed from `Agenda Kegiatan` to `Event Terkini`.
- Public landing section label changed to `Event Terkini` with `EVENT // JADWAL` / `EVENT // TIMETABLE` eyebrow.
- `EventStackCard` on the public site no longer uses image stacks or Unsplash fallback images. It is now a typography/date/location card.
- The public section still uses `id="agenda"` for backward-compatible anchors. Change only if navigation anchors are audited.

## Current Home Status

Home text/media editing is now reasonably admin-friendly. The remaining Home work is mostly on list-based tabs that are shared with other pages:

- `Laboratorium`
- `Statistik Ribbon`
- `Berita Terkini`
- `Event Terkini`
- `Galeri Prestasi`
- `Mitra & Kolaborasi`
- `Testimoni Alumni`

These are already editable, but their CMS UX is still mostly generic CRUD/table UI. Improve labels, empty states, previews, and form ergonomics so they feel like landing-page sections.

## Known Technical Notes

- `dataService.getSiteContent()` auto-inserts missing `initialSiteContent` keys into Supabase when CMS loads. This is why adding new `site_content` keys in `mockData.ts` currently works without a schema migration.
- CMS labels live in `src/lib/cmsLabels.ts`.
- CMS default/mock content lives in `src/lib/mockData.ts`.
- Public site content hooks live in `prodi-umbandung/src/hooks/useSupabaseData.ts`.
- Public Home composition is in `prodi-umbandung/src/pages/index.astro` and `src/pages/en/index.astro`.
- Supabase DNS errors during local public-site builds are expected in the current sandbox when network/DNS is restricted. The build can still succeed via fallback data.

## Important Caveat About Existing Docs

Some older docs in `docs/` may be stale and mention older program identities or completed priorities that no longer match the current product state. Treat this file as the latest handoff for CMS revision work.

## Next Work: Non-Home Pages

The user explicitly noted that Home is only the first page. Continue with the following page groups.

### 1. Visi & Misi

Current state:
- Uses `site_content` keys such as `visi_misi_vision`, `visi_misi_missions`, `visi_misi_goals`, and likely `visi_misi_strategies`.
- CMS input is still textarea-heavy and list formatting depends on newlines.

Recommended work:
- Build a guided form for Visi & Misi.
- Convert missions/goals/strategies UI into repeatable list editors, even if saved as newline-delimited text for now.
- Add preview cards that match the public page structure.
- Verify all public page headings/descriptions are CMS-driven or clearly static by design.

### 2. Struktur Organisasi / Tata Kelola

Current state:
- Uses `kaprodi_*`, `gov_sec_*`, and `gov_upm_*` style keys.
- Some person-photo linking to `dosen` exists.

Recommended work:
- Build a guided organization editor.
- Consider a real repeatable organization roles table if roles can change beyond Kaprodi/Sekretaris/UPM.
- Keep dosen linking for photos and profile consistency.
- Audit public `StrukturOrganisasiPageLayout.astro` for hardcoded heading/description.

### 3. Kurikulum

Current state:
- Split across `site_content`, `kurikulum_courses`, `kurikulum_plos`, and `kurikulum_profiles`.
- Existing CRUD works, but UX is fragmented.

Recommended work:
- Create a page-level CMS experience for Kurikulum.
- Keep separate list editors for Mata Kuliah, CPL/PLO, and Profil Lulusan, but add a page overview and clearer section descriptions.
- Add guided forms for MBKM/internship text and curriculum intro.
- Audit public `KurikulumPageLayout.astro` for hardcoded headings, fallback-only content, and unmanaged section copy.

### 4. Tugas Akhir

Current state:
- `tugas_akhir_steps` exists.
- Some intro/prerequisite content comes from `site_content`.
- Templates and sample topics appear hardcoded in public layout.

Recommended work:
- Add CMS control for document templates and sample topics.
- Consider a `tugas_akhir_documents` or generic `page_documents` table if documents repeat.
- Build a guided page editor for intro, prerequisites, and steps.

### 5. Praktik Kerja & KKN

Current state:
- Text content and KKN documents are editable.
- UX still separates text and documents, but it is acceptable.

Recommended work:
- Improve the KKN content editor with grouped link fields: mitra, panduan, pendaftaran.
- Add preview/status for missing documents.
- Ensure public labels and CMS labels say `Praktik Kerja & KKN` consistently.

### 6. Kerjasama

Current state:
- Intro/heading text is editable through `site_content`.
- Partner logos/list are editable through partners table.
- Cooperation flow steps are likely hardcoded.

Recommended work:
- Add CMS editor for cooperation flow/steps.
- Decide whether flow steps should be `site_content` numbered keys or a repeatable table.
- Update sidebar labels consistently: Home uses `Mitra & Kolaborasi`; page menu may use `Kerjasama & Kemitraan`.

### 7. Statistik

Current state:
- New student statistics (`statistik_maba`) are editable.
- Other narrative/statistic sections may still be hardcoded.

Recommended work:
- Add page-level intro/title/description editor.
- Add support for other statistics shown on public page, such as study duration ratio if present.
- Improve chart data editor UX.

### 8. Alumni

Current state:
- Alumni directory is editable.
- Alumni sectors and tracer study CTA appear to be hardcoded/fallback-driven.

Recommended work:
- Add CMS support for alumni career sectors.
- Add guided editor for tracer study title/subtitle/link.
- Improve alumni card preview in CMS.

### 9. Kegiatan Dosen and Kegiatan Mahasiswa

Current state:
- Activity lists are editable.
- Page heading/descriptions are likely hardcoded.

Recommended work:
- Add page intro/heading CMS fields.
- Improve CRUD labels/previews for activity images and descriptions.
- Use consistent terminology between public pages and CMS sidebar.

### 10. Publikasi / Tulisan Dosen

Current state:
- Publication list is editable.
- Page heading/description likely hardcoded.

Recommended work:
- Add page intro/heading CMS fields.
- Improve publication form layout and validation for links.

### 11. Dosen and Dosen Detail

Current state:
- Dosen list is editable.
- Detail page fields may be too limited for academic profile needs.

Recommended work:
- Audit what public detail page displays.
- Add missing fields if needed: education, research interests, selected publications, email, profile bio.
- Do not over-expand unless public page actually renders the fields.

## Suggested Implementation Order

1. Finish Home list-based tab UX polish: Laboratorium, Berita, Event Terkini, Prestasi, Mitra, Testimoni.
2. Visi & Misi guided editor.
3. Struktur Organisasi guided editor.
4. Kerjasama flow editor.
5. Tugas Akhir documents/templates/sample topics.
6. Alumni sectors and tracer study.
7. Kegiatan and Publikasi page-intro fields.
8. Kurikulum page-level overview after the above, because it is wider and touches multiple tables.

## Verification Checklist For Future Changes

Run these after meaningful CMS/public changes:

```bash
cd cms-prodi
npm run build
```

```bash
cd prodi-umbandung
npm run build
```

Expected note: public-site build may log Supabase `getaddrinfo ENOTFOUND` in restricted environments. If the final exit code is `0` and pages are generated, this is acceptable for local verification.

## Git Notes

Recent relevant commits before this handoff:

- `df5ea0b` CMS: separated global footer content from Home.
- `de62abf` CMS: added Home video and editorial CMS fields.
- `b6640df` public site: read Home editorial content from CMS.
- `801fd22` CMS: added guided Hero and Editorial editors.
- `9c09d8f` CMS: aligned Home CMS navigation with landing page order.
- `6510a3b` CMS: added Home section overview, Sambutan, Info Singkat, Video Profil guided editors.
- `2b4b925` CMS: renamed Agenda labels to Event Terkini.
- `8690888` public site: restyled Event Terkini cards without images.
