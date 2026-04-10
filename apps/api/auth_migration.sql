-- Limpiar datos existentes que romperían las constraints
DELETE FROM public.reviews;
DELETE FROM public.order_items;
DELETE FROM public.order_shippings;
DELETE FROM public.payments;
DELETE FROM public.orders;
DELETE FROM public.addresses;
DELETE FROM public.users;

-- Eliminar password
ALTER TABLE public.users DROP COLUMN password;

-- Eliminar constraint PKEY en cascada (para que tire las FKs de addresses, orders, reviews locales)
ALTER TABLE public.users DROP CONSTRAINT users_pkey CASCADE;
ALTER TABLE public.users DROP COLUMN id CASCADE;

-- Recrear id ligado a auth.users
ALTER TABLE public.users ADD COLUMN id uuid NOT NULL;
ALTER TABLE public.users ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE public.users ADD CONSTRAINT users_id_fkey
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Restaurar foreign keys de las tablas dependientes
ALTER TABLE public.orders ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
ALTER TABLE public.reviews ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
ALTER TABLE public.addresses ADD CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

-- Trigger para crear perfil en public.users automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
