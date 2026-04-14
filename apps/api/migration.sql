-- Crear tabla de roles
CREATE TABLE public.roles (
  id      integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  name    text NOT NULL UNIQUE,
  CONSTRAINT roles_pkey PRIMARY KEY (id)
);

-- Insertar roles base
INSERT INTO public.roles (name) VALUES
  ('customer'),
  ('admin');

-- Crear tabla pivote user_roles
CREATE TABLE public.user_roles (
  user_id uuid NOT NULL,
  role_id integer NOT NULL,
  assigned_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id),
  CONSTRAINT user_roles_user_fkey
    FOREIGN KEY (user_id)
    REFERENCES public.users(id)
    ON DELETE CASCADE,
  CONSTRAINT user_roles_role_fkey
    FOREIGN KEY (role_id)
    REFERENCES public.roles(id)
    ON DELETE CASCADE
);

-- Asignar rol customer a todos los usuarios existentes
INSERT INTO public.user_roles (user_id, role_id)
SELECT u.id, r.id
FROM public.users u
CROSS JOIN public.roles r
WHERE r.name = 'customer';

-- Asignar rol admin a ivanromeromaurin11@gmail.com
INSERT INTO public.user_roles (user_id, role_id)
SELECT u.id, r.id
FROM public.users u
CROSS JOIN public.roles r
WHERE u.email = 'ivanromeromaurin11@gmail.com'
  AND r.name = 'admin'
ON CONFLICT DO NOTHING;

-- Trigger para asignar rol customer automáticamente
-- a nuevos usuarios al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role_id)
  SELECT NEW.id, r.id
  FROM public.roles r
  WHERE r.name = 'customer';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_user_created_assign_role ON public.users;
CREATE TRIGGER on_user_created_assign_role
  AFTER INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();
