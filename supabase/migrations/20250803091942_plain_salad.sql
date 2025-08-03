/*
  # Create analysis history table

  1. New Tables
    - `analysis_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `content` (text, the original content analyzed)
      - `content_type` (text, either 'text' or 'code')
      - `error_found` (text, the error description)
      - `explanation` (text, the detailed explanation)
      - `fixed_version` (text, the corrected content)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `analysis_history` table
    - Add policy for authenticated users to read their own data
    - Add policy for authenticated users to insert their own data
*/

CREATE TABLE IF NOT EXISTS analysis_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  content text NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('text', 'code')),
  error_found text NOT NULL,
  explanation text NOT NULL,
  fixed_version text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own analysis history"
  ON analysis_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analysis history"
  ON analysis_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);