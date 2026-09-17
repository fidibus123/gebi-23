import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// TODO: replace with your own project values (see README.md "Supabase einrichten").
// The anon/public key is safe to expose here — Row Level Security in Supabase
// controls what it's allowed to do (insert-only, no reading other guests' rows).
const SUPABASE_URL = 'https://pgzkbnjxdlxovssizqdp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnemtibmp4ZGx4b3Zzc2l6cWRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NzIyOTUsImV4cCI6MjEwNTI0ODI5NX0.8CawXABS0iO-1yOP6Ptxv0Y0Cf6l5VSc1XQ7Mmn_T8I';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById('rsvp-form');
const submitBtn = document.getElementById('rsvp-submit');
const successBox = document.getElementById('rsvp-success');
const successName = document.getElementById('rsvp-success-name');
const errorBox = document.getElementById('rsvp-error');

const STORAGE_KEY = 'birthday-rsvp-done';

const alreadyDone = localStorage.getItem(STORAGE_KEY);
if (alreadyDone) {
  showSuccess(alreadyDone);
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  errorBox.hidden = true;

  const firstName = form.first_name.value.trim();
  const lastName = form.last_name.value.trim();
  if (!firstName || !lastName) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Einen Moment …';

  const { error } = await supabase
    .from('rsvps')
    .insert({ first_name: firstName, last_name: lastName });

  if (error) {
    console.error(error);
    errorBox.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Ich komme! 🎉';
    return;
  }

  localStorage.setItem(STORAGE_KEY, firstName);
  showSuccess(firstName);
});

function showSuccess(name) {
  form.hidden = true;
  successName.textContent = name;
  successBox.hidden = false;
}
