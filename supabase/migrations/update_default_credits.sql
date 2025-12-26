-- Update default credits to 0 for new users
ALTER TABLE profiles ALTER COLUMN credits SET DEFAULT 0;

-- Optional: Reset existing free users to 0 (Uncomment if you want to be strict)
-- UPDATE profiles SET credits = 0 WHERE plan = 'free';
