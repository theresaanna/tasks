import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createSupabaseClient = async () => {
    const cookieStore = await cookies();
    return createServerComponentClient({
        cookies: () => cookieStore,
    });
};

export default createSupabaseClient();