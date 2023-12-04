import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://udpurkvmekwzcpfcukar.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcHVya3ZtZWt3emNwZmN1a2FyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MDk0NTY1NSwiZXhwIjoyMDA2NTIxNjU1fQ.5jHCo2Ogd_SV6w9WMpVDxMVqAeN8IRGbczVCSnaTJHU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;