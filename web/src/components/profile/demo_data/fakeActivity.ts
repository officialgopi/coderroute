export const fakeActivity = Array.from({ length: 365 }, (_, i) => ({
  date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10),
  count: Math.random() < 0.6 ? 0 : Math.floor(Math.random() * 6),
}));
