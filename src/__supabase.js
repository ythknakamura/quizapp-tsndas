import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://ogsowuyznyesjiyawzxt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nc293dXl6bnllc2ppeWF3enh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1OTk4MTIsImV4cCI6MjAzOTE3NTgxMn0.ahZqpGR_b5GlNOu2cbYRjCAa2M965VOzciO-f8SY46I';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchKanjiYomiAsync(ids){
    const { data, error } = await supabase
        .from('SakanaKanji')
        .select()
        .in('id', ids);
    if (error) {
        console.error(error);
    }
    return data;
}

export async function fetchMondaisuAsync(){
    /* マニュアル通りだとこうだと思うが、動作しない・・・。
    const { data, error} = await supabase
        .from('SakanaKanji')
        .select('*', { count: 'exact', head: true });
    if (error) {
        console.error(error);
    }
    return data.count;
    */
    
    const { error, count } = await supabase
        .from('SakanaKanji')
        .select('*', { count: 'exact', head: true });
    if (error) {
        console.error(error);
    }
    return count;
}

export async function insertScoreAsync(name, score){
    const { error } = await supabase
        .from('Ranking')
        .insert({ name, score });
    if (error) {
        console.error(error);
    }
}

export async function fetchRankingAsync(){
    const { data, error } = await supabase
        .from('Ranking')
        .select("score,name")
        .neq('name', '')
        .order('score', {ascending: false})
        .limit(10);
    if (error) {
        console.error(error);
    }
    return data;
}
