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
-- Name: builds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.builds (
    id text NOT NULL,
    jsx text NOT NULL,
    props jsonb,
    scss text
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
-- Name: configs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.configs (
    id text NOT NULL,
    name text NOT NULL,
    code text NOT NULL,
    is_root boolean NOT NULL,
    os text DEFAULT 'all'::text NOT NULL
);


ALTER TABLE public.configs OWNER TO postgres;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: screens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.screens (
    id text NOT NULL,
    name text NOT NULL,
    project_id text NOT NULL,
    is_start_screen boolean NOT NULL
);


ALTER TABLE public.screens OWNER TO postgres;

--
-- Name: templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.templates (
    id text NOT NULL,
    name text NOT NULL,
    category_id text NOT NULL,
    demo_id text NOT NULL,
    prototype_id text NOT NULL,
    position_behaviour text
);


ALTER TABLE public.templates OWNER TO postgres;

--
-- Data for Name: _TemplatesToScreens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_TemplatesToScreens" ("A", "B") FROM stdin;
\.


--
-- Data for Name: builds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.builds (id, jsx, props, scss) FROM stdin;
cbfbd984-5450-4c0e-a3e2-764aa83b7d2d	(props) => {\n    return (\n        <div className="_search-container_k3docz_m8klmnvm">\n            <div className="_search-icon_k3docz_m8klmnvm">\n                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <circle cx="11" cy="11" r="7" stroke="#9E9E9E" strokeWidth="2"></circle>\n                    <line x1="16" y1="16" x2="21" y2="21" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                </svg>\n            </div>\n            <span type="text" className="_search-input_k3docz_m8klmnvm">Search</span>\n            <button className="_clear-button_k3docz_m8klmnvm">\n                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <line x1="6" y1="6" x2="18" y2="18" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                    <line x1="6" y1="18" x2="18" y2="6" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                </svg>\n            </button>\n        </div>\n    );\n}	"null"	._search-container_k3docz_m8klmnvm {\n    display: flex;\n    align-items: center;\n    background: #fff;\n    border: 4px solid #d9d9d9;\n    border-radius: 12px;\n    padding: 0 12px;\n    height: 40px;\n    box-sizing: border-box;\n}\n\n._search-icon_k3docz_m8klmnvm {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-right: 8px;\n}\n\n._search-input_k3docz_m8klmnvm {\n    flex: 1;\n    border: none;\n    outline: none;\n    font-size: 14px;\n    color: #616161;\n    background: transparent;\n}\n\n._search-input_k3docz_m8klmnvm::placeholder {\n    color: #9e9e9e;\n}\n\n._clear-button_k3docz_m8klmnvm {\n    background: none;\n    border: none;\n    padding: 0;\n    margin-left: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n}\n\n._clear-button_k3docz_m8klmnvm svg {\n    pointer-events: none;\n}\n\n._clear-button_k3docz_m8klmnvm:hover svg {\n    stroke: #616161;\n}
526ef716-7c6a-4c26-890c-bd2e4fa1c728	(props) => {\n    return (\n        <div className="_container_deu1w2_m8kouth7">\n            <div className="_card_deu1w2_m8kouth7"></div>\n            <div className="_card_deu1w2_m8kouth7"></div>\n        </div>\n    );\n}	null	._container_deu1w2_m8kouth7 {\n    position: absolute;    inset: 0;\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    padding: 4px;\n    gap: 10px;\n    border-radius: 10px;\n    background-color: #fff;\n    border: 4px solid #D9D9D9;\n    box-sizing: border-box;\n}\n\n._card_deu1w2_m8kouth7 {\n    width: 100%;\n    height: 100%;\n    background-color: #D9D9D9;\n    border-radius: 6px;\n}
003346e2-f64f-47c5-9f6e-f112d434a7ce	(props) => {\n    return (\n        <div className="_container_45jq6v_m8kp781f">\n            <div className="_card_45jq6v_m8kp781f"></div>\n            <div className="_card_45jq6v_m8kp781f"></div>\n            <div className="_card_45jq6v_m8kp781f"></div>\n            <div className="_card_45jq6v_m8kp781f"></div>\n            <div className="_card_45jq6v_m8kp781f"></div>\n            <div className="_card_45jq6v_m8kp781f"></div>\n            <div className="_card_45jq6v_m8kp781f"></div>\n            <div className="_card_45jq6v_m8kp781f"></div>\n            <div className="_card_45jq6v_m8kp781f"></div>\n            <div className="_card_45jq6v_m8kp781f"></div>\n            <div className="_card_45jq6v_m8kp781f"></div>\n            <div className="_card_45jq6v_m8kp781f"></div>\n        </div>\n    );\n}	null	._container_45jq6v_m8kp781f {\n    display: grid;\n    height: 100%;\n    grid-template-columns: repeat(2, 1fr);\n    padding: 4px;\n    gap: 10px;\n    scrollbar-width: none;\n    overflow-x: auto;\n    overflow-y: scroll;\n}\n\n._card_45jq6v_m8kp781f {\n    width: 100%;\n    height: 126px;\n    background-color: #D9D9D9;\n    border-radius: 6px;\n}
a71ed605-3130-4ab0-8a85-57c01a730bfd	(props) => {\n    return (\n        <div className="_search-container_j60qak_m8kncpxj">\n            <div className="_search-icon_j60qak_m8kncpxj">\n                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <circle cx="11" cy="11" r="7" stroke="#9E9E9E" strokeWidth="2"></circle>\n                    <line x1="16" y1="16" x2="21" y2="21" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                </svg>\n            </div>\n            <input type="text" className="_search-input_j60qak_m8kncpxj" placeholder="Search"/>\n            <button className="_clear-button_j60qak_m8kncpxj">\n                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <line x1="6" y1="6" x2="18" y2="18" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                    <line x1="6" y1="18" x2="18" y2="6" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                </svg>\n            </button>\n        </div>\n    );\n}	null	._search-container_j60qak_m8kncpxj {\n    display: flex;\n    align-items: center;\n    background: #fff;\n    border: 4px solid #d9d9d9;\n    border-radius: 12px;\n    padding: 0 12px;\n    margin: 4px;\n    height: 40px;\n}\n\n._search-icon_j60qak_m8kncpxj {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-right: 8px;\n}\n\n._search-input_j60qak_m8kncpxj {\n    flex: 1;\n    border: none;\n    outline: none;\n    font-size: 14px;\n    color: #616161;\n    background: transparent;\n    width: 100%;\n}\n\n._search-input_j60qak_m8kncpxj::placeholder {\n    color: #9e9e9e;\n}\n\n._clear-button_j60qak_m8kncpxj {\n    background: none;\n    border: none;\n    padding: 0;\n    margin-left: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n}\n\n._clear-button_j60qak_m8kncpxj svg {\n    pointer-events: none;\n}\n\n._clear-button_j60qak_m8kncpxj:hover svg {\n    stroke: #616161;\n}
f4805eb1-4816-4b9c-af58-a3c6c97b43ea	(props) => {\n    return (\n        <div class="_container_es8w5w_m93g67nb">\n            <div class="_row_es8w5w_m93g67nb"></div>\n            <div class="_row_es8w5w_m93g67nb"></div>\n        </div>\n    );\n}	"null"	._container_es8w5w_m93g67nb {\n    position: absolute;\n    inset: 0;\n    display: flex;\n    flex-direction: column;\n    padding: 4px;\n    gap: 10px;\n    border-radius: 10px;\n    background-color: #fff;\n    border: 4px solid #D9D9D9;\n}\n\n._row_es8w5w_m93g67nb {\n    width: 100%;\n    height: 100%;\n    background-color: #D9D9D9;\n    border-radius: 6px;\n}
e053609a-f59b-41d7-b019-0b5a9e07fb52	(props) => {\n    return (\n        <div class="_container_uiu2wp_m93g67o4">\n            <div class="_row_uiu2wp_m93g67o4"></div>\n            <div class="_row_uiu2wp_m93g67o4"></div>\n            <div class="_row_uiu2wp_m93g67o4"></div>\n            <div class="_row_uiu2wp_m93g67o4"></div>\n            <div class="_row_uiu2wp_m93g67o4"></div>\n            <div class="_row_uiu2wp_m93g67o4"></div>\n            <div class="_row_uiu2wp_m93g67o4"></div>\n            <div class="_row_uiu2wp_m93g67o4"></div>\n            <div class="_row_uiu2wp_m93g67o4"></div>\n            <div class="_row_uiu2wp_m93g67o4"></div>\n            <div class="_row_uiu2wp_m93g67o4"></div>\n            <div class="_row_uiu2wp_m93g67o4"></div>\n        </div>\n    );\n}	"null"	._container_uiu2wp_m93g67o4 {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n    padding: 4px;\n    gap: 10px;\n    scrollbar-width: none;\n    overflow-x: auto;\n    overflow-y: scroll;\n}\n\n._row_uiu2wp_m93g67o4 {\n    width: 100%;\n    height: 42px;\n    background-color: #D9D9D9;\n    border-radius: 6px;\n}
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name) FROM stdin;
bd559edb-bd8b-4ddd-a951-67bdf07279ca	Search
d9601a19-732a-4f2e-8b05-778e4f514735	Navigation
9fe63268-fe75-4a4f-87a2-07c2fc20c3e6	Content
\.


--
-- Data for Name: configs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.configs (id, name, code, is_root, os) FROM stdin;
af7813ad-da95-4723-a395-971a770f2db1	index.html	<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>{projectName}</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>	f	all
54bb87ba-9d33-4da0-a339-ea93aa14b44d	package.json	{\n  "name": "{projectName}",\n  "private": true,\n  "version": "1.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "lint": "eslint .",\n    "lint:fix": "eslint . --fix",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "react": "^19.0.0",\n    "react-dom": "^19.0.0",\n    "react-router-dom": "^6.26.2"\n  },\n  "devDependencies": {\n    "@eslint/js": "^9.22.0",\n    "@types/react": "^19.0.10",\n    "@types/react-dom": "^19.0.4",\n    "@vitejs/plugin-react-swc": "^3.8.0",\n    "eslint": "^9.22.0",\n    "eslint-plugin-prettier": "^5.4.0",\n    "eslint-plugin-react-hooks": "^5.2.0",\n    "eslint-plugin-react-refresh": "^0.4.19",\n    "globals": "^16.0.0",\n    "vite": "^6.3.1"\n  }\n}	f	all
77b5f949-b2e1-4029-aa6f-d01b6ed29e61	main.jsx	import { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './app';\n\ncreateRoot(document.getElementById('root')).render(\n  <StrictMode>\n    <App />\n  </StrictMode>,\n);	t	all
700ba43c-be1e-4787-aee7-df4294b88f82	vite.config.js	import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react-swc';\n\n// https://vite.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    port: 8080\n  }\n});	f	all
af3ac264-ddd4-46f9-a602-00c7f6ee0de9	eslint.config.js	import js from '@eslint/js';\nimport globals from 'globals';\nimport reactHooks from 'eslint-plugin-react-hooks';\nimport reactRefresh from 'eslint-plugin-react-refresh';\nimport prettier from 'eslint-plugin-prettier';\n\nexport default [\n  { ignores: ['dist', 'node_modules'] },\n  {\n    files: ['**/*.{js,jsx}'],\n    languageOptions: {\n      ecmaVersion: 2020,\n      globals: globals.browser,\n      parserOptions: {\n        ecmaVersion: 'latest',\n        ecmaFeatures: { jsx: true },\n        sourceType: 'module'\n      }\n    },\n    plugins: {\n      'react-hooks': reactHooks,\n      'react-refresh': reactRefresh,\n      'prettier': prettier\n    },\n    rules: {\n      ...js.configs.recommended.rules,\n      ...reactHooks.configs.recommended.rules,\n      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],\n      'react-refresh/only-export-components': [\n        'warn',\n        { allowConstantExport: true }\n      ],\n      'prettier/prettier': [\n        'error',\n        {\n          printWidth: 80,\n          semi: true,\n          tabWidth: 2,\n          useTabs: false,\n          endOfLine: 'auto',\n          singleQuote: true,\n          arrowParens: 'always',\n          plugins: []\n        }\n      ]\n    }\n  }\n];	f	all
26049649-2279-441b-b6ed-c44f054be33a	start.sh	#!/bin/bash\nset -e\n\necho "▶ Проверка наличия Node.js..."\nif ! command -v node &> /dev/null; then\n  echo "❌ Node.js не установлен. Устанавливаем..."\n\n  if ! command -v brew &> /dev/null; then\n    echo "🧰 Устанавливаем Homebrew..."\n    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n  fi\n\n  echo "📦 Устанавливаем Node.js через Homebrew..."\n  brew install node\nelse\n  echo "✅ Node.js уже установлен. Версия: $(node -v)"\nfi\n\necho "▶ Проверка наличия npm..."\nif ! command -v npm &> /dev/null; then\n  echo "❌ npm не найден. Проверьте установку Node.js."\n  exit 1\nfi\n\necho "📦 Установка зависимостей через npm..."\nnpm install\n\necho "🚀 Запуск dev-сервера..."\nnpm run dev	f	macos
bd694f78-289f-44d3-99c3-6f97b9e612eb	start.bat	@echo off\nsetlocal enabledelayedexpansion\n\necho ▶ Проверка наличия Node.js...\nwhere node >nul 2>nul\nif errorlevel 1 (\n  echo ❌ Node.js не установлен. Пожалуйста, установите Node.js вручную: https://nodejs.org/\n  pause\n  exit /b 1\n) else (\n  for /f %%v in ('node -v') do (\n    set NODE_VER=%%v\n    echo ✅ Node.js уже установлен. Версия: !NODE_VER!\n  )\n)\n\necho ▶ Проверка наличия npm...\nwhere npm >nul 2>nul\nif errorlevel 1 (\n  echo ❌ npm не найден. Убедитесь, что Node.js установлен корректно.\n  pause\n  exit /b 1\n)\n\necho 📦 Установка зависимостей через npm...\ncall npm install\nif errorlevel 1 (\n  echo ❌ Ошибка при установке зависимостей.\n  pause\n  exit /b 1\n)\n\necho 🚀 Запуск dev-сервера...\ncall npm run dev	f	windows
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, name) FROM stdin;
\.


--
-- Data for Name: screens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.screens (id, name, project_id, is_start_screen) FROM stdin;
\.


--
-- Data for Name: templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.templates (id, name, category_id, demo_id, prototype_id, position_behaviour) FROM stdin;
fdab2674-ac3f-4c75-a8c5-10d2b4e1510b	Cards Grid	9fe63268-fe75-4a4f-87a2-07c2fc20c3e6	526ef716-7c6a-4c26-890c-bd2e4fa1c728	003346e2-f64f-47c5-9f6e-f112d434a7ce	isFill
1d3366bc-0b36-4690-9913-aa201334109a	Search Field	bd559edb-bd8b-4ddd-a951-67bdf07279ca	cbfbd984-5450-4c0e-a3e2-764aa83b7d2d	a71ed605-3130-4ab0-8a85-57c01a730bfd	isTop
ab12d164-6003-4aa9-8466-b0a4e21c3b81	Rows List	9fe63268-fe75-4a4f-87a2-07c2fc20c3e6	f4805eb1-4816-4b9c-af58-a3c6c97b43ea	e053609a-f59b-41d7-b019-0b5a9e07fb52	isFill
\.


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
-- Name: configs configs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configs
    ADD CONSTRAINT configs_pkey PRIMARY KEY (id);


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
-- Name: _TemplatesToScreens_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_TemplatesToScreens_AB_unique" ON public."_TemplatesToScreens" USING btree ("A", "B");


--
-- Name: _TemplatesToScreens_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_TemplatesToScreens_B_index" ON public."_TemplatesToScreens" USING btree ("B");


--
-- Name: configs_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX configs_name_key ON public.configs USING btree (name);


--
-- Name: templates_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX templates_name_key ON public.templates USING btree (name);


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
-- Name: templates templates_demo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_demo_id_fkey FOREIGN KEY (demo_id) REFERENCES public.builds(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: templates templates_prototype_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_prototype_id_fkey FOREIGN KEY (prototype_id) REFERENCES public.builds(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

