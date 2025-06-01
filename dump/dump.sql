--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _TemplatesToScreens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_TemplatesToScreens" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_TemplatesToScreens" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: builds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.builds (
    id text NOT NULL,
    name text NOT NULL,
    code text NOT NULL,
    os text DEFAULT 'all'::text NOT NULL,
    is_root boolean NOT NULL
);


ALTER TABLE public.builds OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: codebases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.codebases (
    id text NOT NULL,
    jsx text NOT NULL,
    scss text,
    props jsonb
);


ALTER TABLE public.codebases OWNER TO postgres;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id text NOT NULL,
    name text NOT NULL,
    owner_id text NOT NULL
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: screens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.screens (
    id text NOT NULL,
    name text NOT NULL,
    is_start_screen boolean NOT NULL,
    project_id text NOT NULL
);


ALTER TABLE public.screens OWNER TO postgres;

--
-- Name: templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.templates (
    id text NOT NULL,
    name text NOT NULL,
    category_id text NOT NULL,
    develop_id text NOT NULL,
    running_id text NOT NULL,
    position_behaviour text
);


ALTER TABLE public.templates OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: _TemplatesToScreens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_TemplatesToScreens" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
bd4591dd-149a-401f-b753-6784be3487c9	dfdd2a5c0dc7dd42951ca07027279d45763c20a43cde2970e60b9e1083a0a268	2025-05-20 02:17:06.550774+00	20250520021706_init	\N	\N	2025-05-20 02:17:06.538618+00	1
\.


--
-- Data for Name: builds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.builds (id, name, code, os, is_root) FROM stdin;
80a2d722-3504-4217-9137-784ee2cb8b45	index.html	<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>{projectName}</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>	all	f
623852b4-cfb8-4651-b126-837fc4d913de	package.json	{\n  "name": "{projectName}",\n  "private": true,\n  "version": "1.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "lint": "eslint .",\n    "lint:fix": "eslint . --fix",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "react": "^19.0.0",\n    "react-dom": "^19.0.0",\n    "react-router-dom": "^6.26.2"\n  },\n  "devDependencies": {\n    "@eslint/js": "^9.22.0",\n    "@types/react": "^19.0.10",\n    "@types/react-dom": "^19.0.4",\n    "@vitejs/plugin-react-swc": "^3.8.0",\n    "eslint": "^9.22.0",\n    "eslint-plugin-prettier": "^5.4.0",\n    "eslint-plugin-react-hooks": "^5.2.0",\n    "eslint-plugin-react-refresh": "^0.4.19",\n    "globals": "^16.0.0",\n    "vite": "^6.3.1"\n  }\n}	all	f
2e86ba13-72a6-4edb-9092-fb89960c1e1c	main.jsx	import { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './app';\n\ncreateRoot(document.getElementById('root')).render(\n  <StrictMode>\n    <App />\n  </StrictMode>,\n);	all	t
e6429f54-b14b-4033-8346-f138ee5b0014	vite.config.js	import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react-swc';\n\n// https://vite.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    port: 8080\n  }\n});	all	f
0570077c-d4ab-4a4f-9ff6-46ca9915714f	eslint.config.js	import js from '@eslint/js';\nimport globals from 'globals';\nimport reactHooks from 'eslint-plugin-react-hooks';\nimport reactRefresh from 'eslint-plugin-react-refresh';\nimport prettier from 'eslint-plugin-prettier';\n\nexport default [\n  { ignores: ['dist', 'node_modules'] },\n  {\n    files: ['**/*.{js,jsx}'],\n    languageOptions: {\n      ecmaVersion: 2020,\n      globals: globals.browser,\n      parserOptions: {\n        ecmaVersion: 'latest',\n        ecmaFeatures: { jsx: true },\n        sourceType: 'module'\n      }\n    },\n    plugins: {\n      'react-hooks': reactHooks,\n      'react-refresh': reactRefresh,\n      'prettier': prettier\n    },\n    rules: {\n      ...js.configs.recommended.rules,\n      ...reactHooks.configs.recommended.rules,\n      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],\n      'react-refresh/only-export-components': [\n        'warn',\n        { allowConstantExport: true }\n      ],\n      'prettier/prettier': [\n        'error',\n        {\n          printWidth: 80,\n          semi: true,\n          tabWidth: 2,\n          useTabs: false,\n          endOfLine: 'auto',\n          singleQuote: true,\n          arrowParens: 'always',\n          plugins: []\n        }\n      ]\n    }\n  }\n];	all	f
2c88d4d9-83e7-4245-a8ea-2de126dbeef3	start.sh	#!/bin/bash\nset -e\n\necho "▶ Проверка наличия Node.js..."\nif ! command -v node &> /dev/null; then\n  echo "❌ Node.js не установлен. Устанавливаем..."\n\n  if ! command -v brew &> /dev/null; then\n    echo "🧰 Устанавливаем Homebrew..."\n    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n  fi\n\n  echo "📦 Устанавливаем Node.js через Homebrew..."\n  brew install node\nelse\n  echo "✅ Node.js уже установлен. Версия: $(node -v)"\nfi\n\necho "▶ Проверка наличия npm..."\nif ! command -v npm &> /dev/null; then\n  echo "❌ npm не найден. Проверьте установку Node.js."\n  exit 1\nfi\n\necho "📦 Установка зависимостей через npm..."\nnpm install\n\necho "🚀 Запуск dev-сервера..."\nnpm run dev	macos	f
bd694f78-289f-44d3-99c3-6f97b9e612eb	start.bat	@echo off\nsetlocal enabledelayedexpansion\n\necho ▶ Проверка наличия Node.js...\nwhere node >nul 2>nul\nif errorlevel 1 (\n  echo ❌ Node.js не установлен. Пожалуйста, установите Node.js вручную: https://nodejs.org/\n  pause\n  exit /b 1\n) else (\n  for /f %%v in ('node -v') do (\n    set NODE_VER=%%v\n    echo ✅ Node.js уже установлен. Версия: !NODE_VER!\n  )\n)\n\necho ▶ Проверка наличия npm...\nwhere npm >nul 2>nul\nif errorlevel 1 (\n  echo ❌ npm не найден. Убедитесь, что Node.js установлен корректно.\n  pause\n  exit /b 1\n)\n\necho 📦 Установка зависимостей через npm...\ncall npm install\nif errorlevel 1 (\n  echo ❌ Ошибка при установке зависимостей.\n  pause\n  exit /b 1\n)\n\necho 🚀 Запуск dev-сервера...\ncall npm run dev	windows	f
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name) FROM stdin;
dba75621-5303-49e7-8df4-6017cc8c0ff1	Search
6adc4b03-830d-43ab-b361-79fd58b9fe29	Navigation
44c02090-6718-4f60-a176-c32dc1b7c384	Content
\.


--
-- Data for Name: codebases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.codebases (id, jsx, scss, props) FROM stdin;
f2aa2180-dac4-4c3d-b392-ebf9c5be827d	(props) => {\n    return (\n        <div className="_container_k4cgdh_maw2brm3">\n            <div className="_card_k4cgdh_maw2brm3"></div>\n            <div className="_card_k4cgdh_maw2brm3"></div>\n        </div>\n    );\n}	._container_k4cgdh_maw2brm3 {\n    position: absolute;    inset: 0;\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    padding: 4px;\n    gap: 10px;\n    border-radius: 10px;\n    background-color: #fff;\n    border: 4px solid #D9D9D9;\n    box-sizing: border-box;\n}\n\n._card_k4cgdh_maw2brm3 {\n    width: 100%;\n    height: 100%;\n    background-color: #D9D9D9;\n    border-radius: 6px;\n}	"null"
1b3d282c-40aa-4a4e-a15b-d3fc96326323	(props) => {\n    return (\n        <div className="_container_6qik4w_maw2brmc">\n            <div className="_card_6qik4w_maw2brmc"></div>\n            <div className="_card_6qik4w_maw2brmc"></div>\n            <div className="_card_6qik4w_maw2brmc"></div>\n            <div className="_card_6qik4w_maw2brmc"></div>\n            <div className="_card_6qik4w_maw2brmc"></div>\n            <div className="_card_6qik4w_maw2brmc"></div>\n            <div className="_card_6qik4w_maw2brmc"></div>\n            <div className="_card_6qik4w_maw2brmc"></div>\n            <div className="_card_6qik4w_maw2brmc"></div>\n            <div className="_card_6qik4w_maw2brmc"></div>\n            <div className="_card_6qik4w_maw2brmc"></div>\n            <div className="_card_6qik4w_maw2brmc"></div>\n        </div>\n    );\n}	._container_6qik4w_maw2brmc {\n    display: grid;\n    height: 100%;\n    grid-template-columns: repeat(2, 1fr);\n    padding: 4px;\n    gap: 10px;\n    scrollbar-width: none;\n    overflow-x: auto;\n    overflow-y: scroll;\n}\n\n._card_6qik4w_maw2brmc {\n    width: 100%;\n    height: 126px;\n    background-color: #D9D9D9;\n    border-radius: 6px;\n}	"null"
a2b8863b-befa-47c9-9e6b-2af9837b147a	(props) => {\n    return (\n        <div className="_search-container_mzuh37_maw2cgaf">\n            <div className="_search-icon_mzuh37_maw2cgaf">\n                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <circle cx="11" cy="11" r="7" stroke="#9E9E9E" strokeWidth="2"></circle>\n                    <line x1="16" y1="16" x2="21" y2="21" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                </svg>\n            </div>\n            <span type="text" className="_search-input_mzuh37_maw2cgaf">Search</span>\n            <button className="_clear-button_mzuh37_maw2cgaf">\n                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <line x1="6" y1="6" x2="18" y2="18" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                    <line x1="6" y1="18" x2="18" y2="6" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                </svg>\n            </button>\n        </div>\n    );\n}	._search-container_mzuh37_maw2cgaf {\n    display: flex;\n    align-items: center;\n    background: #fff;\n    border: 4px solid #d9d9d9;\n    border-radius: 12px;\n    padding: 0 12px;\n    height: 40px;\n    box-sizing: border-box;\n}\n\n._search-icon_mzuh37_maw2cgaf {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-right: 8px;\n}\n\n._search-input_mzuh37_maw2cgaf {\n    flex: 1;\n    border: none;\n    outline: none;\n    font-size: 14px;\n    color: #616161;\n    background: transparent;\n}\n\n._search-input_mzuh37_maw2cgaf::placeholder {\n    color: #9e9e9e;\n}\n\n._clear-button_mzuh37_maw2cgaf {\n    background: none;\n    border: none;\n    padding: 0;\n    margin-left: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n}\n\n._clear-button_mzuh37_maw2cgaf svg {\n    pointer-events: none;\n}\n\n._clear-button_mzuh37_maw2cgaf:hover svg {\n    stroke: #616161;\n}	"null"
279ed3ce-59e0-4f97-a649-ced215e130e1	(props) => {\n    return (\n        <div className="_search-container_vdyccm_maw2cgan">\n            <div className="_search-icon_vdyccm_maw2cgan">\n                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <circle cx="11" cy="11" r="7" stroke="#9E9E9E" strokeWidth="2"></circle>\n                    <line x1="16" y1="16" x2="21" y2="21" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                </svg>\n            </div>\n            <input type="text" className="_search-input_vdyccm_maw2cgan" placeholder="Search"/>\n            <button className="_clear-button_vdyccm_maw2cgan">\n                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <line x1="6" y1="6" x2="18" y2="18" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                    <line x1="6" y1="18" x2="18" y2="6" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                </svg>\n            </button>\n        </div>\n    );\n}	._search-container_vdyccm_maw2cgan {\n    display: flex;\n    align-items: center;\n    background: #fff;\n    border: 4px solid #d9d9d9;\n    border-radius: 12px;\n    padding: 0 12px;\n    margin: 4px;\n    height: 40px;\n}\n\n._search-icon_vdyccm_maw2cgan {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-right: 8px;\n}\n\n._search-input_vdyccm_maw2cgan {\n    flex: 1;\n    border: none;\n    outline: none;\n    font-size: 14px;\n    color: #616161;\n    background: transparent;\n    width: 100%;\n}\n\n._search-input_vdyccm_maw2cgan::placeholder {\n    color: #9e9e9e;\n}\n\n._clear-button_vdyccm_maw2cgan {\n    background: none;\n    border: none;\n    padding: 0;\n    margin-left: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n}\n\n._clear-button_vdyccm_maw2cgan svg {\n    pointer-events: none;\n}\n\n._clear-button_vdyccm_maw2cgan:hover svg {\n    stroke: #616161;\n}	"null"
babf3b26-2fc4-49fe-b5b9-3f0707ba9438	(props) => {\n    return (\n        <div class="_container_ccpzhv_maw2d7fp">\n            <div class="_row_ccpzhv_maw2d7fp"></div>\n            <div class="_row_ccpzhv_maw2d7fp"></div>\n        </div>\n    );\n}	._container_ccpzhv_maw2d7fp {\n    position: absolute;\n    inset: 0;\n    display: flex;\n    flex-direction: column;\n    padding: 4px;\n    gap: 10px;\n    border-radius: 10px;\n    background-color: #fff;\n    border: 4px solid #D9D9D9;\n}\n\n._row_ccpzhv_maw2d7fp {\n    width: 100%;\n    height: 100%;\n    background-color: #D9D9D9;\n    border-radius: 6px;\n}	"null"
177f0597-4673-402f-a564-2a8ce3cb7fe7	(props) => {\n    return (\n        <div class="_container_irfjia_maw2d7fz">\n            <div class="_row_irfjia_maw2d7fz"></div>\n            <div class="_row_irfjia_maw2d7fz"></div>\n            <div class="_row_irfjia_maw2d7fz"></div>\n            <div class="_row_irfjia_maw2d7fz"></div>\n            <div class="_row_irfjia_maw2d7fz"></div>\n            <div class="_row_irfjia_maw2d7fz"></div>\n            <div class="_row_irfjia_maw2d7fz"></div>\n            <div class="_row_irfjia_maw2d7fz"></div>\n            <div class="_row_irfjia_maw2d7fz"></div>\n            <div class="_row_irfjia_maw2d7fz"></div>\n            <div class="_row_irfjia_maw2d7fz"></div>\n            <div class="_row_irfjia_maw2d7fz"></div>\n        </div>\n    );\n}	._container_irfjia_maw2d7fz {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n    padding: 4px;\n    gap: 10px;\n    scrollbar-width: none;\n    overflow-x: auto;\n    overflow-y: scroll;\n}\n\n._row_irfjia_maw2d7fz {\n    width: 100%;\n    height: 42px;\n    background-color: #D9D9D9;\n    border-radius: 6px;\n}	"null"
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, name, owner_id) FROM stdin;
\.


--
-- Data for Name: screens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.screens (id, name, is_start_screen, project_id) FROM stdin;
\.


--
-- Data for Name: templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.templates (id, name, category_id, develop_id, running_id, position_behaviour) FROM stdin;
532c2333-b062-4046-bd2a-bc7638c3cc83	Cards Grid	44c02090-6718-4f60-a176-c32dc1b7c384	f2aa2180-dac4-4c3d-b392-ebf9c5be827d	1b3d282c-40aa-4a4e-a15b-d3fc96326323	isFill
1c5070eb-ef23-44e9-b79e-deaf5214eb33	Search Field	dba75621-5303-49e7-8df4-6017cc8c0ff1	a2b8863b-befa-47c9-9e6b-2af9837b147a	279ed3ce-59e0-4f97-a649-ced215e130e1	isTop
29822aa6-0c07-433f-ab4c-fa047b34843f	Rows List	44c02090-6718-4f60-a176-c32dc1b7c384	babf3b26-2fc4-49fe-b5b9-3f0707ba9438	177f0597-4673-402f-a564-2a8ce3cb7fe7	isFill
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password) FROM stdin;
2912b26b-e8b7-4c8c-85b3-ce3e5691cee4	admin@admin.com	$argon2id$v=19$m=65536,t=3,p=4$pExQZ4fuFcb4d8rPwUHB8g$WnVfC8mDfm2DGjIF9P5skQWpgMRCYcUsd5q8IVJWU70
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: builds builds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.builds
    ADD CONSTRAINT builds_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: codebases codebases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.codebases
    ADD CONSTRAINT codebases_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: screens screens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.screens
    ADD CONSTRAINT screens_pkey PRIMARY KEY (id);


--
-- Name: templates templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: _TemplatesToScreens_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_TemplatesToScreens_AB_unique" ON public."_TemplatesToScreens" USING btree ("A", "B");


--
-- Name: _TemplatesToScreens_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_TemplatesToScreens_B_index" ON public."_TemplatesToScreens" USING btree ("B");


--
-- Name: builds_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX builds_name_key ON public.builds USING btree (name);


--
-- Name: templates_category_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX templates_category_id_idx ON public.templates USING btree (category_id);


--
-- Name: templates_develop_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX templates_develop_id_idx ON public.templates USING btree (develop_id);


--
-- Name: templates_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX templates_name_key ON public.templates USING btree (name);


--
-- Name: templates_running_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX templates_running_id_idx ON public.templates USING btree (running_id);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: _TemplatesToScreens _TemplatesToScreens_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_TemplatesToScreens"
    ADD CONSTRAINT "_TemplatesToScreens_A_fkey" FOREIGN KEY ("A") REFERENCES public.screens(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _TemplatesToScreens _TemplatesToScreens_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_TemplatesToScreens"
    ADD CONSTRAINT "_TemplatesToScreens_B_fkey" FOREIGN KEY ("B") REFERENCES public.templates(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: projects projects_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: screens screens_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.screens
    ADD CONSTRAINT screens_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: templates templates_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: templates templates_develop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_develop_id_fkey FOREIGN KEY (develop_id) REFERENCES public.codebases(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: templates templates_running_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_running_id_fkey FOREIGN KEY (running_id) REFERENCES public.codebases(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

