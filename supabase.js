// supabase.js
// Vyplň si vlastní URL a ANON KEY z Supabase projektu

const SUPABASE_URL = "https://ncstippolhiaojmnzcgd.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_k_adk4_lKGUkAv37cQXyfg_KDCL6AOE";

window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Tabulka: planner_months
// columns: id uuid, year int, month int, data jsonb, created_at timestamptz, unique(year, month)

async function saveMonthToSupabase(year, month, dataObj){
    const { data, error } = await window.supabaseClient
        .from('planner_months')
        .upsert(
            { year, month, data: dataObj },
            { onConflict: 'year,month' }
        );
    return { data, error };
}

async function loadMonthFromSupabase(year, month){
    const { data, error } = await window.supabaseClient
        .from('planner_months')
        .select('data')
        .eq('year', year)
        .eq('month', month)
        .maybeSingle();
    return { data, error };
}
