import { createClient } from '@supabase/supabase-js'
import Config from 'react-native-config';

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY)

export default supabase;