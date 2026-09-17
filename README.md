# 🎉 Valeria wird 23 — Geburtstagsseite

Statische Einladungsseite mit RSVP-Formular. Kein Server nötig — RSVPs landen direkt in einer Supabase-Datenbank.

## Struktur

```
index.html        Die Seite (Hero, Bild von dir, Kostüm-Motto, RSVP-Formular)
css/style.css      Design
js/app.js          RSVP-Formular-Logik + Supabase-Anbindung
images/            Hier deine eigenen Bilder reinlegen (siehe unten)
```

## 1. Eigene Bilder einfügen

Leg diese Dateien in den `images/`-Ordner (gleicher Name, dann erscheinen sie automatisch — solange die Datei fehlt, zeigt die Seite einen Platzhalter):

- `images/me1.jpg` — ein Foto von dir
- `images/inspo1.jpg` … `inspo4.jpg` — Kostüm-Inspirationsbilder (Filme/Serien)

## 2. Adresse & Details anpassen

In [index.html](index.html) suchst du `Musterstrasse 1, 9000 St. Gallen` und ersetzt es mit deiner echten Adresse. Datum/Uhrzeit stehen direkt darüber im gleichen Block.

## 3. Supabase einrichten (RSVP-Datenbank)

Supabase ist kostenlos und speichert die Namen deiner Gäste.

1. Gehe auf [supabase.com](https://supabase.com) und erstelle (mit deinem eigenen Account) ein neues Projekt.
2. Öffne im Dashboard **SQL Editor** und führe dieses SQL aus, um die Tabelle zu erstellen:

   ```sql
   create table rsvps (
     id uuid primary key default gen_random_uuid(),
     first_name text not null,
     last_name text not null,
     created_at timestamptz not null default now()
   );

   alter table rsvps enable row level security;

   -- Erlaubt allen (auch anonymen Besuchern deiner Seite) NUR das Einfügen,
   -- niemand kann fremde Namen auslesen oder löschen.
   create policy "Allow public insert" on rsvps
     for insert to anon
     with check (true);
   ```

3. Gehe zu **Project Settings → API**. Dort findest du:
   - **Project URL** → kopiere sie in `js/app.js` als `SUPABASE_URL`
   - **anon public key** → kopiere ihn in `js/app.js` als `SUPABASE_ANON_KEY`

4. Die Gästeliste siehst du jederzeit im Supabase Dashboard unter **Table Editor → rsvps**.

## 4. Hosten auf GitHub Pages

1. Erstelle auf GitHub ein neues (am besten privates oder unlisted — ist aber egal, es sind ja keine sensiblen Daten drin ausser deiner Adresse) Repository, z.B. `valeria-23`.
2. Im Terminal, in diesem Ordner:

   ```bash
   git init
   git add .
   git commit -m "Birthday invite site"
   git branch -M main
   git remote add origin https://github.com/<dein-username>/valeria-23.git
   git push -u origin main
   ```

3. Auf GitHub: **Settings → Pages → Source: "Deploy from a branch"**, Branch `main` / Ordner `/ (root)` auswählen, speichern.
4. Nach ~1 Minute ist die Seite live unter `https://<dein-username>.github.io/valeria-23/`.
5. Diesen Link schickst du an deine Freunde!

## Lokal testen, bevor du pushst

Einfach `index.html` im Ordner doppelklicken/im Browser öffnen, oder mit einem lokalen Server:

```bash
python3 -m http.server 8000
```

und dann `http://localhost:8000` öffnen.
