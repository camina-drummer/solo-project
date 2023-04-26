-- Set default options
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Reset all tables
DROP TABLE public.users
DROP TABLE public.stories
DROP TABLE public.images
-- DROP TABLE public.story_traits

-- Create tables, turning off OIDS which are auto-generated IDs that are non-standard and rarely used
CREATE TABLE public.users (
	"_id" serial NOT NULL,
	"username" varchar NOT NULL,
    "password" varchar NOT NULL,
	"ssid" varchar NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.stories (
	"_id" serial NOT NULL,
	"user_id" bigint NOT NULL,
	"story" varchar NOT NULL,
	CONSTRAINT "stories_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

-- Optional table that combines images and optionally stored traits
-- CREATE TABLE public.story_traits (
-- 	"_id" serial NOT NULL,
-- 	"story_id" bigint NOT NULL,
-- 	"image" varchar NOT NULL,
-- 	"gender" varchar,
-- 	"alignment" varchar,
-- 	"race" varchar,
-- 	"role" varchar,
-- 	"home" varchar,
-- 	CONSTRAINT "story_traits_pk" PRIMARY KEY ("_id")
-- ) WITH (
--   OIDS=FALSE
-- );

CREATE TABLE public.images (
	"_id" serial NOT NULL,
	"story_id" bigint NOT NULL,
	"image" varchar NOT NULL,
	CONSTRAINT "images_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);


-- Add foreign key constraints for stories and images tables
ALTER TABLE public.stories ADD CONSTRAINT "user_fk0" FOREIGN KEY ("user_id") REFERENCES  public.users("_id");
ALTER TABLE public.images ADD CONSTRAINT "story_fk0" FOREIGN KEY ("story_id") REFERENCES public.stories("_id");
-- ALTER TABLE public.images ADD CONSTRAINT "story_fk0" FOREIGN KEY ("story_id") REFERENCES public.stories("_id");

-- Seed tables with starting data
INSERT INTO public.users (username, password, ssid) VALUES ('caminadrummer', 'password1', 'testssid123');
INSERT INTO public.users (username, password, ssid) VALUES ('richard', 'password2', 'testssid456');

INSERT INTO public.stories (user_id, story) VALUES (1, 'Caminas story 1');
INSERT INTO public.stories (user_id, story) VALUES (1, 'Caminas story 2');
INSERT INTO public.stories (user_id, story) VALUES (2, 'Richards story 1');
INSERT INTO public.stories (user_id, story) VALUES (2, 'Richards story 2');

INSERT INTO public.images (story_id, image) VALUES (1, 'Caminas story 1 imageurl 1');
INSERT INTO public.images (story_id, image) VALUES (1, 'Caminas story 1 imageurl 2');
INSERT INTO public.images (story_id, image) VALUES (2, 'Caminas story 2 imageurl 1');
INSERT INTO public.images (story_id, image) VALUES (2, 'Caminas story 2 imageurl 2');
INSERT INTO public.images (story_id, image) VALUES (3, 'Richards story 1 imageurl 1');
INSERT INTO public.images (story_id, image) VALUES (3, 'Richards story 1 imageurl 2');
INSERT INTO public.images (story_id, image) VALUES (4, 'Richards story 2 imageurl 1');
INSERT INTO public.images (story_id, image) VALUES (4, 'Richards story 2 imageurl 2');