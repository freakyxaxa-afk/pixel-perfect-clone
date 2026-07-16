
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

CREATE TABLE public.category_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_slug text NOT NULL,
  storage_path text NOT NULL,
  public_url text NOT NULL,
  is_cover boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX category_images_slug_idx ON public.category_images(category_slug);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.category_images TO authenticated;
GRANT SELECT ON public.category_images TO anon;
GRANT ALL ON public.category_images TO service_role;
ALTER TABLE public.category_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read images" ON public.category_images FOR SELECT USING (true);
CREATE POLICY "admin insert images" ON public.category_images FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update images" ON public.category_images FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete images" ON public.category_images FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  stars int NOT NULL DEFAULT 5,
  text text NOT NULL,
  review_date date,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT SELECT ON public.reviews TO anon;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "admin insert reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update reviews" ON public.reviews FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete reviews" ON public.reviews FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

INSERT INTO public.reviews (name, stars, text, sort_order) VALUES
 ('Muhammad Ali', 5, 'Excellent experience with Wood Lab Islamabad. Professional staff, premium workmanship, and beautiful finishing.', 1),
 ('Shabnam', 5, 'Our home renovation turned out exactly how we imagined. Highly professional team and excellent communication.', 2),
 ('Muhammad Azaan', 5, 'Outstanding craftsmanship and attention to detail. The kitchen and media wall look absolutely stunning.', 3),
 ('Jiya Kayani', 5, 'They transformed our interior beautifully with modern designs and premium quality materials.', 4),
 ('Yasin Khan', 5, 'Excellent quality work, timely delivery, and very cooperative team.', 5),
 ('Rubah Rahman', 5, 'Their designers understood exactly what we wanted. The final result exceeded our expectations.', 6),
 ('Hell Gaming', 5, 'Very professional from consultation to installation. Highly recommended for premium interiors.', 7);

CREATE POLICY "public read site-images" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
CREATE POLICY "admin insert site-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin update site-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin delete site-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
