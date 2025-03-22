--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

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
-- Name: builds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.builds (
    id text NOT NULL,
    jsx text,
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
-- Data for Name: builds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.builds (id, jsx, props, scss) FROM stdin;
003346e2-f64f-47c5-9f6e-f112d434a7ce	\N	\N	\N
526ef716-7c6a-4c26-890c-bd2e4fa1c728	\N	\N	\N
a71ed605-3130-4ab0-8a85-57c01a730bfd	\N	\N	\N
cbfbd984-5450-4c0e-a3e2-764aa83b7d2d	(props) => {\n    return (\n        <div className="search-container">\n            <div className="search-icon">\n                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <circle cx="11" cy="11" r="7" stroke="#9E9E9E" strokeWidth="2"></circle>\n                    <line x1="16" y1="16" x2="21" y2="21" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                </svg>\n            </div>\n            <span type="text" className="search-input">Search</span>\n            <button className="clear-button">\n                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <line x1="6" y1="6" x2="18" y2="18" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                    <line x1="6" y1="18" x2="18" y2="6" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"></line>\n                </svg>\n            </button>\n        </div>\n    );\n}	null	.search-container {\n    display: flex;\n    align-items: center;\n    background: #fff;\n    border: 4px solid #d9d9d9;\n    border-radius: 12px;\n    padding: 0 12px;\n    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);\n    width: 300px;\n    height: 40px;\n}\n\n.search-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-right: 8px;\n}\n\n.search-input {\n    flex: 1;\n    border: none;\n    outline: none;\n    font-size: 14px;\n    color: #616161;\n    background: transparent;\n}\n\n.search-input::placeholder {\n    color: #9e9e9e;\n}\n\n.clear-button {\n    background: none;\n    border: none;\n    padding: 0;\n    margin-left: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n}\n\n.clear-button svg {\n    pointer-events: none;\n}\n\n.clear-button:hover svg {\n    stroke: #616161;\n}
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
-- Data for Name: templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.templates (id, name, category_id, demo_id, prototype_id, position_behaviour) FROM stdin;
fdab2674-ac3f-4c75-a8c5-10d2b4e1510b	Cards Grid	9fe63268-fe75-4a4f-87a2-07c2fc20c3e6	526ef716-7c6a-4c26-890c-bd2e4fa1c728	003346e2-f64f-47c5-9f6e-f112d434a7ce	isFill
1d3366bc-0b36-4690-9913-aa201334109a	Search Field	bd559edb-bd8b-4ddd-a951-67bdf07279ca	cbfbd984-5450-4c0e-a3e2-764aa83b7d2d	a71ed605-3130-4ab0-8a85-57c01a730bfd	isTop
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
-- Name: templates templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_pkey PRIMARY KEY (id);


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

