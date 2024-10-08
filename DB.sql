PGDMP      $                |            book    16.4    16.4 :    9           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            :           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ;           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            <           1262    16403    book    DATABASE        CREATE DATABASE book WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE book;
                postgres    false            �            1259    16922    carts    TABLE     6  CREATE TABLE public.carts (
    id integer NOT NULL,
    docgia integer NOT NULL,
    sach_id integer NOT NULL,
    soluong integer NOT NULL,
    gia integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.carts;
       public         heap    postgres    false            �            1259    16921    carts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.carts_id_seq;
       public          postgres    false    224            =           0    0    carts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;
          public          postgres    false    223            �            1259    16977    chitietphieutheodoi    TABLE     $  CREATE TABLE public.chitietphieutheodoi (
    id integer NOT NULL,
    docgia integer NOT NULL,
    sach_id integer NOT NULL,
    soluong integer NOT NULL,
    gia integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    phieutheodoi_id integer
);
 '   DROP TABLE public.chitietphieutheodoi;
       public         heap    postgres    false            �            1259    16976    chitietphieutheodoi_id_seq    SEQUENCE     �   CREATE SEQUENCE public.chitietphieutheodoi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.chitietphieutheodoi_id_seq;
       public          postgres    false    228            >           0    0    chitietphieutheodoi_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.chitietphieutheodoi_id_seq OWNED BY public.chitietphieutheodoi.id;
          public          postgres    false    227            �            1259    16868    docgia    TABLE       CREATE TABLE public.docgia (
    id integer NOT NULL,
    ho character varying(255) NOT NULL,
    ten character varying(255) NOT NULL,
    diachi text,
    gioitinh character varying(50),
    ngaysinh date,
    sodienthoai character varying(20),
    password text NOT NULL,
    ngaytao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    ngaychinhsua timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted boolean DEFAULT false,
    role character varying(50) DEFAULT 'user'::character varying
);
    DROP TABLE public.docgia;
       public         heap    postgres    false            �            1259    16867    docgia_id_seq    SEQUENCE     �   CREATE SEQUENCE public.docgia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.docgia_id_seq;
       public          postgres    false    216            ?           0    0    docgia_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.docgia_id_seq OWNED BY public.docgia.id;
          public          postgres    false    215            �            1259    16881    nhanvien    TABLE     �  CREATE TABLE public.nhanvien (
    id integer NOT NULL,
    hoten character varying(255) NOT NULL,
    chucvu character varying(255),
    diachi text,
    sodienthoai character varying(20),
    password text NOT NULL,
    ngaytao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    ngaychinhsua timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted boolean DEFAULT false,
    role character varying(50) DEFAULT 'admin'::character varying
);
    DROP TABLE public.nhanvien;
       public         heap    postgres    false            �            1259    16880    nhanvien_id_seq    SEQUENCE     �   CREATE SEQUENCE public.nhanvien_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.nhanvien_id_seq;
       public          postgres    false    218            @           0    0    nhanvien_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.nhanvien_id_seq OWNED BY public.nhanvien.id;
          public          postgres    false    217            �            1259    16894 
   nhaxuatban    TABLE     �   CREATE TABLE public.nhaxuatban (
    id integer NOT NULL,
    ten character varying(255) NOT NULL,
    diachi text,
    deleted boolean DEFAULT false
);
    DROP TABLE public.nhaxuatban;
       public         heap    postgres    false            �            1259    16893    nhaxuatban_id_seq    SEQUENCE     �   CREATE SEQUENCE public.nhaxuatban_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.nhaxuatban_id_seq;
       public          postgres    false    220            A           0    0    nhaxuatban_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.nhaxuatban_id_seq OWNED BY public.nhaxuatban.id;
          public          postgres    false    219            �            1259    16941    phieutheodoi    TABLE     �  CREATE TABLE public.phieutheodoi (
    id integer NOT NULL,
    docgia_id integer NOT NULL,
    tongtien integer NOT NULL,
    ngaymuon date NOT NULL,
    ngaytra date,
    trangthai character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    ghichu character varying(200),
    phuongthucthanhtoan character varying(50)
);
     DROP TABLE public.phieutheodoi;
       public         heap    postgres    false            �            1259    16940    phieutheodoi_id_seq    SEQUENCE     �   CREATE SEQUENCE public.phieutheodoi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.phieutheodoi_id_seq;
       public          postgres    false    226            B           0    0    phieutheodoi_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.phieutheodoi_id_seq OWNED BY public.phieutheodoi.id;
          public          postgres    false    225            �            1259    16904    sach    TABLE     �  CREATE TABLE public.sach (
    id integer NOT NULL,
    ten character varying(255) NOT NULL,
    hinhanh text,
    dongia integer,
    tacgia character varying(255),
    soluong integer,
    namxuatban integer,
    mota text,
    soluong_muon integer DEFAULT 0,
    nhaxuatban character varying(200),
    ngaytao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    ngaychinhsua timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted boolean DEFAULT false
);
    DROP TABLE public.sach;
       public         heap    postgres    false            �            1259    16903    sach_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sach_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.sach_id_seq;
       public          postgres    false    222            C           0    0    sach_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.sach_id_seq OWNED BY public.sach.id;
          public          postgres    false    221                       2604    16925    carts id    DEFAULT     d   ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);
 7   ALTER TABLE public.carts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    16980    chitietphieutheodoi id    DEFAULT     �   ALTER TABLE ONLY public.chitietphieutheodoi ALTER COLUMN id SET DEFAULT nextval('public.chitietphieutheodoi_id_seq'::regclass);
 E   ALTER TABLE public.chitietphieutheodoi ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    228    228            n           2604    16871 	   docgia id    DEFAULT     f   ALTER TABLE ONLY public.docgia ALTER COLUMN id SET DEFAULT nextval('public.docgia_id_seq'::regclass);
 8   ALTER TABLE public.docgia ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            s           2604    16884    nhanvien id    DEFAULT     j   ALTER TABLE ONLY public.nhanvien ALTER COLUMN id SET DEFAULT nextval('public.nhanvien_id_seq'::regclass);
 :   ALTER TABLE public.nhanvien ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            x           2604    16897    nhaxuatban id    DEFAULT     n   ALTER TABLE ONLY public.nhaxuatban ALTER COLUMN id SET DEFAULT nextval('public.nhaxuatban_id_seq'::regclass);
 <   ALTER TABLE public.nhaxuatban ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    16944    phieutheodoi id    DEFAULT     r   ALTER TABLE ONLY public.phieutheodoi ALTER COLUMN id SET DEFAULT nextval('public.phieutheodoi_id_seq'::regclass);
 >   ALTER TABLE public.phieutheodoi ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            z           2604    16907    sach id    DEFAULT     b   ALTER TABLE ONLY public.sach ALTER COLUMN id SET DEFAULT nextval('public.sach_id_seq'::regclass);
 6   ALTER TABLE public.sach ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            2          0    16922    carts 
   TABLE DATA           Z   COPY public.carts (id, docgia, sach_id, soluong, gia, created_at, updated_at) FROM stdin;
    public          postgres    false    224   �F       6          0    16977    chitietphieutheodoi 
   TABLE DATA           m   COPY public.chitietphieutheodoi (id, docgia, sach_id, soluong, gia, created_at, phieutheodoi_id) FROM stdin;
    public          postgres    false    228   �F       *          0    16868    docgia 
   TABLE DATA           �   COPY public.docgia (id, ho, ten, diachi, gioitinh, ngaysinh, sodienthoai, password, ngaytao, ngaychinhsua, deleted, role) FROM stdin;
    public          postgres    false    216   aG       ,          0    16881    nhanvien 
   TABLE DATA           z   COPY public.nhanvien (id, hoten, chucvu, diachi, sodienthoai, password, ngaytao, ngaychinhsua, deleted, role) FROM stdin;
    public          postgres    false    218   H       .          0    16894 
   nhaxuatban 
   TABLE DATA           >   COPY public.nhaxuatban (id, ten, diachi, deleted) FROM stdin;
    public          postgres    false    220   �H       4          0    16941    phieutheodoi 
   TABLE DATA           �   COPY public.phieutheodoi (id, docgia_id, tongtien, ngaymuon, ngaytra, trangthai, created_at, updated_at, ghichu, phuongthucthanhtoan) FROM stdin;
    public          postgres    false    226   �H       0          0    16904    sach 
   TABLE DATA           �   COPY public.sach (id, ten, hinhanh, dongia, tacgia, soluong, namxuatban, mota, soluong_muon, nhaxuatban, ngaytao, ngaychinhsua, deleted) FROM stdin;
    public          postgres    false    222   |I       D           0    0    carts_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.carts_id_seq', 8, true);
          public          postgres    false    223            E           0    0    chitietphieutheodoi_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.chitietphieutheodoi_id_seq', 3, true);
          public          postgres    false    227            F           0    0    docgia_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.docgia_id_seq', 2, true);
          public          postgres    false    215            G           0    0    nhanvien_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.nhanvien_id_seq', 1, true);
          public          postgres    false    217            H           0    0    nhaxuatban_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.nhaxuatban_id_seq', 2, true);
          public          postgres    false    219            I           0    0    phieutheodoi_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.phieutheodoi_id_seq', 13, true);
          public          postgres    false    225            J           0    0    sach_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.sach_id_seq', 2, true);
          public          postgres    false    221            �           2606    16929    carts carts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
       public            postgres    false    224            �           2606    16983 ,   chitietphieutheodoi chitietphieutheodoi_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.chitietphieutheodoi
    ADD CONSTRAINT chitietphieutheodoi_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.chitietphieutheodoi DROP CONSTRAINT chitietphieutheodoi_pkey;
       public            postgres    false    228            �           2606    16879    docgia docgia_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.docgia
    ADD CONSTRAINT docgia_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.docgia DROP CONSTRAINT docgia_pkey;
       public            postgres    false    216            �           2606    16892    nhanvien nhanvien_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.nhanvien
    ADD CONSTRAINT nhanvien_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.nhanvien DROP CONSTRAINT nhanvien_pkey;
       public            postgres    false    218            �           2606    16902    nhaxuatban nhaxuatban_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.nhaxuatban
    ADD CONSTRAINT nhaxuatban_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.nhaxuatban DROP CONSTRAINT nhaxuatban_pkey;
       public            postgres    false    220            �           2606    16948    phieutheodoi phieutheodoi_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.phieutheodoi
    ADD CONSTRAINT phieutheodoi_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.phieutheodoi DROP CONSTRAINT phieutheodoi_pkey;
       public            postgres    false    226            �           2606    16915    sach sach_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.sach
    ADD CONSTRAINT sach_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.sach DROP CONSTRAINT sach_pkey;
       public            postgres    false    222            �           2606    16984 3   chitietphieutheodoi chitietphieutheodoi_docgia_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chitietphieutheodoi
    ADD CONSTRAINT chitietphieutheodoi_docgia_fkey FOREIGN KEY (docgia) REFERENCES public.docgia(id);
 ]   ALTER TABLE ONLY public.chitietphieutheodoi DROP CONSTRAINT chitietphieutheodoi_docgia_fkey;
       public          postgres    false    4744    216    228            �           2606    16989 4   chitietphieutheodoi chitietphieutheodoi_sach_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chitietphieutheodoi
    ADD CONSTRAINT chitietphieutheodoi_sach_id_fkey FOREIGN KEY (sach_id) REFERENCES public.sach(id);
 ^   ALTER TABLE ONLY public.chitietphieutheodoi DROP CONSTRAINT chitietphieutheodoi_sach_id_fkey;
       public          postgres    false    4750    222    228            �           2606    16930    carts fk_docgia    FK CONSTRAINT     �   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT fk_docgia FOREIGN KEY (docgia) REFERENCES public.docgia(id) ON DELETE CASCADE;
 9   ALTER TABLE ONLY public.carts DROP CONSTRAINT fk_docgia;
       public          postgres    false    224    4744    216            �           2606    16949    phieutheodoi fk_docgia    FK CONSTRAINT     �   ALTER TABLE ONLY public.phieutheodoi
    ADD CONSTRAINT fk_docgia FOREIGN KEY (docgia_id) REFERENCES public.docgia(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.phieutheodoi DROP CONSTRAINT fk_docgia;
       public          postgres    false    226    216    4744            �           2606    16935    carts fk_sach    FK CONSTRAINT     }   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT fk_sach FOREIGN KEY (sach_id) REFERENCES public.sach(id) ON DELETE CASCADE;
 7   ALTER TABLE ONLY public.carts DROP CONSTRAINT fk_sach;
       public          postgres    false    222    4750    224            2      x������ � �      6   X   x�U̱�0Cњ�BH�f$q�?�WI����3*���cu�U��i�}��/�R�ا{�����ĆOŮ�P~w Ap      *   �   x�3�<2����
 j��N燻��)�d[�闘�id``�k`D��FfƦf�����F�&�f@I#]]CKC+C+cs=3s#cs#|Ri��ũE\F�~饕w��)�i��tD����� ��v���ZZ�����X�������TgbJnfW� QuA�      ,   a   x�3��K/�|��5O!�Hs����]��B2�-�4044422266�442615�4202�5��5�T04�25�25�3��040�'�ƙ��������� sX�      .   [   x�3��x�{f�B^��
eG��9�Lu��K+�n�Sp)�Q(,}�km��Gb��PYHѱy�:
@�H7g�!�9Fd�S����� �;�      4   |   x�3�4�4�4500�4202�5��5�@f�px�BJi����%pq#CC+s+c=SCCK|R1~@�eh���&#Cd&ئ#�4�+dދ$�`hlej`eb�gbllnf�O�39?�+F��� ݰ2W      0   �  x���Ak1���O���t[��AAXD����t\')lf�M��[��'�=x�Z�XDP���tr���~_R�P�a�������'��3��ձ�t���h��WK�e%�,[jl�����R״V%�*�Uc��Ok���#Ϛ�F�m�{���o�B^_�B�V��?C���N�n�4�����]j �lJ�z&�*�U
������(�2�	H�]�\i	�u�a�	7�c̛�SX�п?�C�d�����g{X��qp�m|�:�0��3�G-3�Ƚ4�Cʶ) |3�<���w\p`,Oy=d7:Of�pf�����Y�� ��V�.m��s�诎�mb��)Z�bg�B��;��Ip'	�@���w#첆BF���� ]8��.ΰ:�?5��������ʲ�pB�Cx�3|8�q�W�"��� ��d���F���L^f���,[ v     