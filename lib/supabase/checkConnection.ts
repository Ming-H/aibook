import { supabase } from './client';

export async function checkSupabaseConnection() {
    try {
        console.log('Checking Supabase connection...');
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log('Anon Key set:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

        // 尝试一个简单的查询
        const { data, error } = await supabase.from('profiles').select('count');

        if (error) {
            console.error('Connection test failed:', error);
            return { success: false, error: error.message };
        }

        console.log('Connection test successful:', data);
        return { success: true, data };
    } catch (err: any) {
        console.error('Connection error:', err);
        return { success: false, error: err.message };
    }
} 