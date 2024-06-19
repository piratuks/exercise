PGDMP      '                |           learning_platform    16.3    16.3 %               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16564    learning_platform    DATABASE     �   CREATE DATABASE learning_platform WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Lithuanian_Lithuania.1257';
 !   DROP DATABASE learning_platform;
                postgres    false            �            1259    16601    review_schedules    TABLE     �   CREATE TABLE public.review_schedules (
    id integer NOT NULL,
    start timestamp with time zone NOT NULL,
    "end" timestamp with time zone,
    mentor_id integer,
    student_id integer
);
 $   DROP TABLE public.review_schedules;
       public         heap    postgres    false            �            1259    16600    review_schedule_id_seq    SEQUENCE     �   ALTER TABLE public.review_schedules ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.review_schedule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    16576    review_statuses    TABLE     h   CREATE TABLE public.review_statuses (
    id integer NOT NULL,
    status character varying NOT NULL
);
 #   DROP TABLE public.review_statuses;
       public         heap    postgres    false            �            1259    16575    review_statuses_id_seq    SEQUENCE     �   ALTER TABLE public.review_statuses ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.review_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    16617    reviews    TABLE     �   CREATE TABLE public.reviews (
    id integer NOT NULL,
    grade integer,
    comment character varying,
    review_status_id integer NOT NULL,
    schedule_id integer NOT NULL
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            �            1259    16616    reviews_id_seq    SEQUENCE     �   ALTER TABLE public.reviews ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �            1259    16565 
   user_types    TABLE     a   CREATE TABLE public.user_types (
    id integer NOT NULL,
    type character varying NOT NULL
);
    DROP TABLE public.user_types;
       public         heap    postgres    false            �            1259    16574    user_types_id_seq    SEQUENCE     �   ALTER TABLE public.user_types ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    16586    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    password text NOT NULL,
    user_type_id integer NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16585    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            
          0    16601    review_schedules 
   TABLE DATA           S   COPY public.review_schedules (id, start, "end", mentor_id, student_id) FROM stdin;
    public          postgres    false    222   n*                 0    16576    review_statuses 
   TABLE DATA           5   COPY public.review_statuses (id, status) FROM stdin;
    public          postgres    false    218   �*                 0    16617    reviews 
   TABLE DATA           T   COPY public.reviews (id, grade, comment, review_status_id, schedule_id) FROM stdin;
    public          postgres    false    224   �*                 0    16565 
   user_types 
   TABLE DATA           .   COPY public.user_types (id, type) FROM stdin;
    public          postgres    false    215   �*                 0    16586    users 
   TABLE DATA           Y   COPY public.users (id, first_name, last_name, email, password, user_type_id) FROM stdin;
    public          postgres    false    220   .+                  0    0    review_schedule_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.review_schedule_id_seq', 1, false);
          public          postgres    false    221                       0    0    review_statuses_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.review_statuses_id_seq', 4, true);
          public          postgres    false    217                       0    0    reviews_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);
          public          postgres    false    223                       0    0    user_types_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_types_id_seq', 4, true);
          public          postgres    false    216                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    219            l           2606    16605 &   review_schedules review_schedules_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.review_schedules
    ADD CONSTRAINT review_schedules_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.review_schedules DROP CONSTRAINT review_schedules_pkey;
       public            postgres    false    222            d           2606    16582 $   review_statuses review_statuses_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.review_statuses
    ADD CONSTRAINT review_statuses_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.review_statuses DROP CONSTRAINT review_statuses_pkey;
       public            postgres    false    218            n           2606    16623    reviews reviews_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    224            h           2606    16599    users unique_email 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT unique_email;
       public            postgres    false    220            f           2606    16584    review_statuses unique_status 
   CONSTRAINT     Z   ALTER TABLE ONLY public.review_statuses
    ADD CONSTRAINT unique_status UNIQUE (status);
 G   ALTER TABLE ONLY public.review_statuses DROP CONSTRAINT unique_status;
       public            postgres    false    218            `           2606    16573    user_types unique_type 
   CONSTRAINT     Q   ALTER TABLE ONLY public.user_types
    ADD CONSTRAINT unique_type UNIQUE (type);
 @   ALTER TABLE ONLY public.user_types DROP CONSTRAINT unique_type;
       public            postgres    false    215            b           2606    16571    user_types user_types_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_types
    ADD CONSTRAINT user_types_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.user_types DROP CONSTRAINT user_types_pkey;
       public            postgres    false    215            j           2606    16592    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    220            p           2606    16606    review_schedules fk_mentor_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.review_schedules
    ADD CONSTRAINT fk_mentor_user FOREIGN KEY (mentor_id) REFERENCES public.users(id);
 I   ALTER TABLE ONLY public.review_schedules DROP CONSTRAINT fk_mentor_user;
       public          postgres    false    4714    222    220            r           2606    16629    reviews fk_review_schedule    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_review_schedule FOREIGN KEY (schedule_id) REFERENCES public.review_schedules(id);
 D   ALTER TABLE ONLY public.reviews DROP CONSTRAINT fk_review_schedule;
       public          postgres    false    222    224    4716            s           2606    16624    reviews fk_review_status    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_review_status FOREIGN KEY (review_status_id) REFERENCES public.review_statuses(id);
 B   ALTER TABLE ONLY public.reviews DROP CONSTRAINT fk_review_status;
       public          postgres    false    218    4708    224            q           2606    16611     review_schedules fk_student_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.review_schedules
    ADD CONSTRAINT fk_student_user FOREIGN KEY (student_id) REFERENCES public.users(id);
 J   ALTER TABLE ONLY public.review_schedules DROP CONSTRAINT fk_student_user;
       public          postgres    false    220    4714    222            o           2606    16593    users fk_user_type    FK CONSTRAINT     {   ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_user_type FOREIGN KEY (user_type_id) REFERENCES public.user_types(id);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT fk_user_type;
       public          postgres    false    4706    220    215            
      x������ � �         :   x�3�,H�K��K�2��̋/(�O/J-.�2�L��-�I-IM�2�LN�KN�2c���� �K;            x������ � �         ,   x�3�,.)MI�+�2��R�E\&��)��y��%E� ~� ��         �  x����r�0�����ŀC���
		M���"�;#Y�H��>+�L_@��烿Y��Vx��-}���4ae[M�Q>���29�������)��ۆ�]��S3;]�����i�~�>ϖ����lka���%4ч�N1ͦ�U��c%�h�f���|m������<P�X��RR��װ�W��5�7L����pB��ٳ2�!����Ֆ�z8(��"�9R:Q�}��89?�E[: �Rj��x���&*�#��qJY>�5y�*.K�Vxh�>bRW��ڒ�Gr&s�eF��Im�!�Z��!crR�^�=p�n��>%u͂C	~��/Q lJj*����ܫTCFMi�����.�#ǳ`B�.䤖9���m�s���W��g�K��|.����	t�x9�e�3�����(W�CeĔ��V|����Jr�ʁ��Ԗ�N�4�k��q�*Ĕ�?�e�;�&��     