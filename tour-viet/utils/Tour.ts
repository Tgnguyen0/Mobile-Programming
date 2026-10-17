export type Tour = {
  id: string;
  name: string;
  city: string;
  days: number;
  price: number;
  seats: number;
  departure: string;
  image: string;
  isFavorite: boolean;
};

export type TourSection = { title: string; data: Tour[] };

// Nhóm theo thành phố (A → Z), trong nhóm sắp xếp departure tăng dần
export function groupByCity(tours: Tour[]): TourSection[] {
  const map = new Map<string, Tour[]>();
  tours.forEach((t) => {
    const list = map.get(t.city);
    if (list) list.push(t);
    else map.set(t.city, [t]);
  });

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b, 'vi'))
    .map(([title, data]) => ({
      title,
      data: [...data].sort((x, y) => x.departure.localeCompare(y.departure)),
    }));
}

// "2026-11-05" → "05/11/2026"
export function formatDate(date: string): string {
  const [y, m, d] = date.split('-');
  return `${d}/${m}/${y}`;
}

// 3590000 → "3.590.000 ₫"
export function formatPrice(price: number): string {
  return `${String(price).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ₫`;
}

export function getSeatLabel(seats: number): string {
  if (seats === 0) return 'Hết chỗ';
  if (seats <= 3) return `Chỉ còn ${seats} chỗ`;
  return `Còn ${seats} chỗ`;
}