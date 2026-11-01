import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieCard, { Movie } from '../components/MovieCard';

const movie: Movie = {
  id: '1',
  title: 'Inception',
  genre: 'Sci-Fi',
  year: 2010,
  rating: 8,
  poster: 'https://picsum.photos/300/450',
  isShowing: true,
};

describe('MovieCard', () => {
  it('hiển thị đúng tên phim và rating định dạng 1 chữ số thập phân', () => {
    const { getByText } = render(<MovieCard movie={movie} onSelect={jest.fn()} />);
    expect(getByText('Inception')).toBeTruthy();
    expect(getByText('⭐ 8.0')).toBeTruthy();
  });

  it('layout="row" hiển thị thể loại', () => {
    const { getByText } = render(
      <MovieCard movie={movie} layout="row" onSelect={jest.fn()} />
    );
    expect(getByText('Sci-Fi')).toBeTruthy();
  });

  it('layout="tile" không hiển thị thể loại', () => {
    const { queryByText } = render(
      <MovieCard movie={movie} layout="tile" onSelect={jest.fn()} />
    );
    expect(queryByText('Sci-Fi')).toBeNull();
  });

  it('isShowing: true hiển thị ✅', () => {
    const { getByText, queryByText } = render(
      <MovieCard movie={{ ...movie, isShowing: true }} onSelect={jest.fn()} />
    );
    expect(getByText('✅')).toBeTruthy();
    expect(queryByText('❌')).toBeNull();
  });

  it('isShowing: false hiển thị ❌', () => {
    const { getByText, queryByText } = render(
      <MovieCard movie={{ ...movie, isShowing: false }} onSelect={jest.fn()} />
    );
    expect(getByText('❌')).toBeTruthy();
    expect(queryByText('✅')).toBeNull();
  });

  it('nhấn vào thẻ gọi onSelect đúng 1 lần với movie.id', () => {
    const onSelect = jest.fn();
    const { getByText } = render(<MovieCard movie={movie} onSelect={onSelect} />);
    fireEvent.press(getByText('Inception'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});