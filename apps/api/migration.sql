CREATE TABLE public.order_statuses (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE
);

INSERT INTO public.order_statuses (name) VALUES 
('PENDING'), 
('CONFIRMED'), 
('SHIPPED'), 
('DELIVERED'), 
('CANCELLED');

DELETE FROM public.order_items;
DELETE FROM public.order_shippings;
DELETE FROM public.payments;
DELETE FROM public.orders;

ALTER TABLE public.orders DROP COLUMN status;
ALTER TABLE public.orders ADD COLUMN status_id integer NOT NULL DEFAULT 1;
ALTER TABLE public.orders ADD CONSTRAINT orders_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.order_statuses(id);
