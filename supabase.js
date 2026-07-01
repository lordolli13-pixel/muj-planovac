// supabase.js
// Vyplň si vlastní URL a ANON KEY z Supabase projektu

const SUPABASE_URL = "https://TVEJE-PROJEKT-URL.supabase.co";
const SUPABASE_ANON_KEY = "TVUJ_ANON_KEY";

window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Tabulka: planner_months
// columns: id (uuid), year int, month int, data jsonb, created_at timestamptz

async function saveMonthToSupabase(year, month, dataObj){
    const { data, error } = await window.supabaseClient
        .from('planner_months')
        .upsert({ year, month, data: dataObj }, { onConflict: 'year,month' });
    return { data, error };
}

async function loadMonthFromSupabase(year, month){
    const { data, error } = await window.supabaseClient
        .from('planner_months')
        .select('*')
        .eq('year', year)
        .eq('month', month)
        .single();
    return { data, error };
}
