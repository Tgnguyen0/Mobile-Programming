export type Bike = {
  id: string;
  name: string;
  price: number;
  category: 'Roadbike' | 'Mountain';
  image: string;
};

const img = (t: string, c: string) =>
  `https://placehold.co/400x400/${c}/ffffff/png?text=${encodeURIComponent(t)}`;

export const BIKES: Bike[] = [
  { id: '1', name: 'Pinarello', price: 1800, category: 'Mountain', image: img('Bike 1', '1d6fd1') },
  { id: '2', name: 'Pina Mountai', price: 1700, category: 'Mountain', image: img('Bike 2', 'd62828') },
  { id: '3', name: 'Pina Bike', price: 1500, category: 'Roadbike', image: img('Bike 3', '9b7fc9') },
  { id: '4', name: 'Pinarello', price: 1900, category: 'Roadbike', image: img('Bike 4', 'b22222') },
  { id: '5', name: 'Pinarello', price: 1600, category: 'Roadbike', image: img('Bike 5', '9b7fc9') },
  { id: '6', name: 'Pinarello', price: 2000, category: 'Mountain', image: img('Bike 6', 'd62828') },
];

export const HERO_IMAGE = img('Power Bike', '1d6fd1');