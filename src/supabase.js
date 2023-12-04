import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://udpurkvmekwzcpfcukar.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcHVya3ZtZWt3emNwZmN1a2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5NDU2NTUsImV4cCI6MjAwNjUyMTY1NX0.bi_bA59w5Fa1B7Ag_nWpLw2o5knV2sDc9YlGoXNt6gY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;