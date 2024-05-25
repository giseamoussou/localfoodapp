import { createClient } from '@supabase/supabase-js'
import Config from 'react-native-config';

<<<<<<< HEAD
const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY)

export default supabase;
=======
export const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY)
>>>>>>> 9d4ce6b4d74709fa02744b5a4d77fee85762b52c
