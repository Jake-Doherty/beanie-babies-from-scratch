const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// export async functions that fetch data
export async function getBeanies(name, astroSign, theme, animal) {
    let query = client
        .from('beanie_babies')
        .select('*', { count: 'exact' })
        .order('title')
        .limit(100);

    if (name) {
        query = query.ilike('title', `%${name}%`);
    }

    if (astroSign) {
        query = query.eq('astroSign', astroSign);
    }

    if (theme) {
        query = query.eq('theme', theme);
    }

    if (animal) {
        query = query.eq('animal', animal);
    }

    const response = await query;

    return response;
}

export async function getAstroSigns() {
    const response = await client.from('beanie_baby_astro_signs').select('*');

    return response;
}

export async function getThemes() {
    const response = await client.from('beanie_baby_themes').select('*');

    return response;
}

export async function getAnimals() {
    const response = await client.from('beanie_baby_animals').select('*');

    return response;
}
