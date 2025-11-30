-- 01_initial.sql
CREATE TABLE IF NOT EXISTS subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  normalized_email TEXT NOT NULL UNIQUE,
  referral_code TEXT,
  referred_by_email TEXT,
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  confirmed BOOLEAN DEFAULT false,
  verification_token TEXT,
  verified_at TIMESTAMP WITH TIME ZONE,
  ip_address TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_subscribers_normalized_email ON subscribers(normalized_email);
CREATE INDEX IF NOT EXISTS idx_subscribers_position ON subscribers(position);

CREATE TABLE IF NOT EXISTS referrals (
  id SERIAL PRIMARY KEY,
  referrer_email TEXT NOT NULL,
  referee_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
