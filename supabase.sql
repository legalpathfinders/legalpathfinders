-- =============================================================================
-- Legal Pathfinders – Supabase Schema
-- File: supabase/schema.sql
--
-- RULES FOR AI AGENTS & DEVELOPERS:
--   1. This file is the SINGLE SOURCE OF TRUTH for the database schema.
--   2. Always READ this file before writing any query, hook, or server action.
--   3. Always UPDATE this file FIRST when adding, changing, or removing tables.
--   4. This script is IDEMPOTENT — it can be run multiple times safely.
--      The cleanup section at the top drops everything before recreating it.
--   5. After any schema change, also update:
--        - requirements.md  → Section 9 (Data Models) and Section 21 (DB Schema)
--        - /models/         → The corresponding TypeScript interface
--   6. Never write raw schema SQL inline in application code.
--
-- CHANGELOG:
--   v1.0.0  – Initial schema covering all core tables.
-- =============================================================================


-- =============================================================================
-- SECTION 1: CLEANUP (Drop everything in reverse dependency order)
-- This ensures the script can be re-run cleanly at any time.
-- =============================================================================

DROP TABLE IF EXISTS newsletter_subscribers  CASCADE;
DROP TABLE IF EXISTS organizations           CASCADE;
DROP TABLE IF EXISTS news_items              CASCADE;
DROP TABLE IF EXISTS events                  CASCADE;
DROP TABLE IF EXISTS services                CASCADE;
DROP TABLE IF EXISTS legal_series            CASCADE;
DROP TABLE IF EXISTS resources               CASCADE;
DROP TABLE IF EXISTS opportunities           CASCADE;
DROP TABLE IF EXISTS profiles                CASCADE;

-- Drop custom enum types (if they exist)
DROP TYPE IF EXISTS opportunity_type         CASCADE;
DROP TYPE IF EXISTS resource_category        CASCADE;
DROP TYPE IF EXISTS legal_series_category    CASCADE;
DROP TYPE IF EXISTS event_type               CASCADE;
DROP TYPE IF EXISTS user_role                CASCADE;


-- =============================================================================
-- SECTION 2: ENUM TYPES
-- =============================================================================

CREATE TYPE opportunity_type AS ENUM (
  'internship',
  'job',
  'scholarship',
  'fellowship',
  'call_for_papers',
  'moot_court',
  'adr_competition',
  'other'
);

CREATE TYPE resource_category AS ENUM (
  'article',
  'research',
  'adr_series',
  'legal_notes',
  'template',
  'study_tools',
  'video_materials'
);

CREATE TYPE legal_series_category AS ENUM (
  'law_aspirants',
  'law_career_guide',
  'study_guide',
  'internship_guide',
  'moot_guide',
  'law_school_guide',
  'podcast',
  'ai_tools'
);

CREATE TYPE event_type AS ENUM (
  'conference',
  'webinar',
  'workshop',
  'competition',
  'other'
);

CREATE TYPE user_role AS ENUM (
  'user',
  'admin'
);


-- =============================================================================
-- SECTION 3: TABLES
-- =============================================================================

-- -----------------------------------------------------------------------------
-- profiles
-- Stores user profiles linked to Supabase auth.users
-- -----------------------------------------------------------------------------
CREATE TABLE profiles (
  id            UUID          PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT          NOT NULL,
  full_name     TEXT,
  avatar_url    TEXT,
  role          user_role     NOT NULL DEFAULT 'user',
  created_at    TIMESTAMPTZ   DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   DEFAULT NOW()
);

COMMENT ON TABLE profiles IS
  'User profiles linked to Supabase auth. Role determines admin access.';


-- -----------------------------------------------------------------------------
-- opportunities
-- Stores all opportunity listings (internships, jobs, scholarships, etc.)
-- -----------------------------------------------------------------------------
CREATE TABLE opportunities (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT          NOT NULL,
  type          opportunity_type NOT NULL,
  organization  TEXT          NOT NULL,
  description   TEXT,
  deadline      DATE,
  link          TEXT,
  tags          TEXT[]        DEFAULT '{}',
  is_active     BOOLEAN       DEFAULT TRUE,
  created_at    TIMESTAMPTZ   DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   DEFAULT NOW()
);

COMMENT ON TABLE opportunities IS
  'All opportunity listings shown on the Opportunities page (/opportunities).';


-- -----------------------------------------------------------------------------
-- resources
-- Stores downloadable and viewable resource materials
-- -----------------------------------------------------------------------------
CREATE TABLE resources (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT          NOT NULL,
  category      resource_category NOT NULL,
  description   TEXT,
  file_url      TEXT,
  external_url  TEXT,
  is_active     BOOLEAN       DEFAULT TRUE,
  uploaded_at   TIMESTAMPTZ   DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   DEFAULT NOW()
);

COMMENT ON TABLE resources IS
  'Downloadable/viewable resource materials shown on the Resources page (/resources).';


-- -----------------------------------------------------------------------------
-- legal_series
-- Stores articles and content for the Legal Series page
-- -----------------------------------------------------------------------------
CREATE TABLE legal_series (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT          NOT NULL,
  category      legal_series_category NOT NULL,
  content       TEXT,
  external_url  TEXT,
  is_published  BOOLEAN       DEFAULT FALSE,
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ   DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   DEFAULT NOW()
);

COMMENT ON TABLE legal_series IS
  'Content items for the Legal Series page (/legal-series) grouped by category.';


-- -----------------------------------------------------------------------------
-- services
-- Stores the service offerings listed on the Services page
-- -----------------------------------------------------------------------------
CREATE TABLE services (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT          NOT NULL,
  description   TEXT,
  cta_label     TEXT,
  cta_link      TEXT,
  sort_order    INT           DEFAULT 0,
  is_active     BOOLEAN       DEFAULT TRUE,
  created_at    TIMESTAMPTZ   DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   DEFAULT NOW()
);

COMMENT ON TABLE services IS
  'Service offerings displayed on the Services page (/services).';


-- -----------------------------------------------------------------------------
-- events
-- Stores legal conferences, events, and news items
-- -----------------------------------------------------------------------------
CREATE TABLE events (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT          NOT NULL,
  type          event_type    NOT NULL DEFAULT 'other',
  description   TEXT,
  event_date    TIMESTAMPTZ,
  location      TEXT,
  link          TEXT,
  is_active     BOOLEAN       DEFAULT TRUE,
  created_at    TIMESTAMPTZ   DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   DEFAULT NOW()
);

COMMENT ON TABLE events IS
  'Legal conferences and events shown on the Events & Updates page (/events).';


-- -----------------------------------------------------------------------------
-- news_items
-- Stores legal news headlines and articles
-- -----------------------------------------------------------------------------
CREATE TABLE news_items (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  headline      TEXT          NOT NULL,
  source        TEXT,
  published_at  TIMESTAMPTZ,
  link          TEXT,
  is_active     BOOLEAN       DEFAULT TRUE,
  created_at    TIMESTAMPTZ   DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   DEFAULT NOW()
);

COMMENT ON TABLE news_items IS
  'Legal news items shown in the Legal News subsection of /events.';


-- -----------------------------------------------------------------------------
-- organizations
-- Stores legal organizations for the Legal Organizations page
-- -----------------------------------------------------------------------------
CREATE TABLE organizations (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT          NOT NULL,
  description   TEXT,
  website       TEXT,
  logo_url      TEXT,
  is_active     BOOLEAN       DEFAULT TRUE,
  created_at    TIMESTAMPTZ   DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   DEFAULT NOW()
);

COMMENT ON TABLE organizations IS
  'Legal organisations listed on the Legal Organizations page (/legal-organizations).';


-- -----------------------------------------------------------------------------
-- newsletter_subscribers
-- Stores email addresses from the newsletter subscription form in the footer
-- -----------------------------------------------------------------------------
CREATE TABLE newsletter_subscribers (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT          UNIQUE NOT NULL,
  is_confirmed  BOOLEAN       DEFAULT FALSE,
  subscribed_at TIMESTAMPTZ   DEFAULT NOW()
);

COMMENT ON TABLE newsletter_subscribers IS
  'Email addresses collected via the newsletter subscription form in the footer.';


-- =============================================================================
-- SECTION 4: INDEXES
-- Add indexes for common filter and sort operations.
-- =============================================================================

CREATE INDEX idx_opportunities_type       ON opportunities (type);
CREATE INDEX idx_opportunities_deadline   ON opportunities (deadline);
CREATE INDEX idx_opportunities_is_active  ON opportunities (is_active);

CREATE INDEX idx_resources_category       ON resources (category);
CREATE INDEX idx_resources_is_active      ON resources (is_active);

CREATE INDEX idx_legal_series_category    ON legal_series (category);
CREATE INDEX idx_legal_series_published   ON legal_series (is_published);

CREATE INDEX idx_events_event_date        ON events (event_date);
CREATE INDEX idx_events_is_active         ON events (is_active);

CREATE INDEX idx_news_items_published_at  ON news_items (published_at);


-- =============================================================================
-- SECTION 5: ROW LEVEL SECURITY (RLS)
-- Enable RLS on all tables. Public read access where appropriate.
-- Restrict inserts/updates/deletes to authenticated/admin roles.
-- =============================================================================

ALTER TABLE profiles                ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities           ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources               ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_series            ENABLE ROW LEVEL SECURITY;
ALTER TABLE services                ENABLE ROW LEVEL SECURITY;
ALTER TABLE events                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_items              ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations           ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers  ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all profiles, users can update own profile, admins can do everything
CREATE POLICY "Public can read all profiles" ON profiles FOR SELECT USING (TRUE);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can insert profiles" ON profiles FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update profiles" ON profiles FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete profiles" ON profiles FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Admin policies: admins can do everything (using EXISTS to avoid recursion)
CREATE POLICY "Admins full access opportunities" ON opportunities FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins full access resources" ON resources FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins full access legal_series" ON legal_series FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins full access services" ON services FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins full access events" ON events FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins full access news_items" ON news_items FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins full access organizations" ON organizations FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can read newsletter_subscribers" ON newsletter_subscribers FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Public read access for all content tables
CREATE POLICY "Public can read all opportunities"     ON opportunities    FOR SELECT USING (TRUE);
CREATE POLICY "Public can read all resources"         ON resources        FOR SELECT USING (TRUE);
CREATE POLICY "Public can read all legal_series"      ON legal_series     FOR SELECT USING (TRUE);
CREATE POLICY "Public can read all services"          ON services         FOR SELECT USING (TRUE);
CREATE POLICY "Public can read all events"            ON events           FOR SELECT USING (TRUE);
CREATE POLICY "Public can read all news_items"        ON news_items       FOR SELECT USING (TRUE);
CREATE POLICY "Public can read all organizations"     ON organizations    FOR SELECT USING (TRUE);

-- Allow anyone to subscribe to newsletter (insert only)
CREATE POLICY "Public can subscribe to newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admins full access newsletter_subscribers" ON newsletter_subscribers FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);


-- =============================================================================
-- SECTION 6: UPDATED_AT TRIGGER
-- Automatically update the updated_at column on any row change.
-- =============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_opportunities_updated_at
  BEFORE UPDATE ON opportunities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_resources_updated_at
  BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_legal_series_updated_at
  BEFORE UPDATE ON legal_series
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_news_items_updated_at
  BEFORE UPDATE ON news_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- =============================================================================
-- SECTION 7: AUTO-CREATE PROFILE ON USER SIGNUP
-- =============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- =============================================================================
-- SECTION 8: SAMPLE DATA
-- Prepopulate tables with sample data for testing and demonstration
-- =============================================================================

-- OPPORTUNITIES
INSERT INTO opportunities (title, type, organization, description, deadline, link, is_active) VALUES
('Legal Internship at ABC Law Firm', 'internship', 'ABC Law Firm', 'Gain hands-on experience in corporate law with our summer internship program.', CURRENT_DATE + INTERVAL '60 days', 'https://example.com/internship', true),
('Junior Associate Position', 'job', 'Global Legal Partners', 'We are seeking a motivated junior associate to join our litigation team.', CURRENT_DATE + INTERVAL '30 days', 'https://example.com/job', true),
('Law School Scholarship', 'scholarship', 'Legal Education Foundation', 'Full tuition scholarship for outstanding law students.', CURRENT_DATE + INTERVAL '90 days', 'https://example.com/scholarship', true);

-- RESOURCES
INSERT INTO resources (title, category, description, external_url, is_active) VALUES
('Introduction to Contract Law', 'article', 'A comprehensive guide to understanding contract law basics.', 'https://example.com/contract-law', true),
('Legal Research Methods', 'research', 'Essential research techniques for law students and practitioners.', 'https://example.com/research', true),
('CV Template for Lawyers', 'template', 'Professional CV template tailored for legal professionals.', 'https://example.com/cv-template', true);

-- LEGAL_SERIES
INSERT INTO legal_series (title, category, content, is_published, published_at) VALUES
('Choosing Between Law School and Masters', 'law_career_guide', 'A detailed guide on making the right choice for your legal career path.', true, NOW()),
('How to Ace Your Law School Exams', 'study_guide', 'Proven strategies and tips for excelling in law school examinations.', true, NOW()),
('Legal Career Podcast: Episode 1', 'podcast', 'Interview with successful lawyers sharing their career journey.', true, NOW());

-- SERVICES
INSERT INTO services (title, description, cta_label, cta_link, sort_order, is_active) VALUES
('Legal Mentorship Program', 'Connect with experienced lawyers who can guide your career.', 'Apply Now', 'https://example.com/mentorship', 1, true),
('CV Review Service', 'Get your legal CV reviewed by professionals.', 'Submit CV', 'https://example.com/cv-review', 2, true),
('Mock Interview Sessions', 'Practice your interview skills with real lawyers.', 'Book Session', 'https://example.com/mock-interview', 3, true);

-- EVENTS
INSERT INTO events (title, type, description, event_date, location, link, is_active) VALUES
('Annual Legal Conference 2025', 'conference', 'Join us for the biggest legal conference of the year.', NOW() + INTERVAL '120 days', 'Paris, France', 'https://example.com/conference', true),
('Legal Tech Webinar', 'webinar', 'Learn about the latest technology trends in the legal industry.', NOW() + INTERVAL '15 days', 'Online', 'https://example.com/webinar', true),
('Moot Court Competition', 'competition', 'Test your advocacy skills in our annual moot court competition.', NOW() + INTERVAL '45 days', 'Harvard Law School', 'https://example.com/moot-court', true);

-- NEWS_ITEMS
INSERT INTO news_items (headline, source, published_at, link, is_active) VALUES
('Supreme Court Rules on Landmark Case', 'Legal Times', NOW() - INTERVAL '2 days', 'https://example.com/news1', true),
('New Legal Tech Startup Raises $10M', 'Tech Law Journal', NOW() - INTERVAL '5 days', 'https://example.com/news2', true),
('Bar Association Announces New Guidelines', 'Bar News', NOW() - INTERVAL '1 day', 'https://example.com/news3', true);

-- ORGANIZATIONS
INSERT INTO organizations (name, description, website, is_active) VALUES
('International Bar Association', 'The global voice of the legal profession.', 'https://www.ibanet.org', true),
('American Bar Association', 'The largest voluntary association of lawyers in the world.', 'https://www.americanbar.org', true),
('Law Society of England and Wales', 'Representing solicitors in England and Wales.', 'https://www.lawsociety.org.uk', true);


-- =============================================================================
-- END OF SCHEMA
-- To apply changes: update this file, then re-run the full script in Supabase
-- SQL Editor. The cleanup section at the top ensures a clean slate every time.
-- =============================================================================
