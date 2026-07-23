import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchByMenu from './index';

// Мок стилей
vi.mock('./styles', () => ({
  StyledCenterblockFilter: 'div',
  StyledFilterTitle: 'h2',
  StyledSearchByCategory: 'div',
  StyledSearchByItemsList: 'ul',
  StyledSearchByItem: 'li',
  StyledFilterButton: 'button',
  StyledGenreCounter: 'span',
}));

describe('SearchByMenu', () => {
  const mockAuthors = ['Queen', 'The Beatles', 'AC/DC'];
  const mockSelectedGenre = [{ name: 'Рок', value: 'Рок музыка' }];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('отрисовывает компонент без ошибок при передаче всех пропсов', () => {
    expect(() => {
      render(
        <SearchByMenu
          AuthorsTracks={mockAuthors}
          selectedGenre={mockSelectedGenre}
          searchedByNames={[]}
          directionTime={1}
          setSelectedGenre={vi.fn()}
          setDirectionTime={vi.fn()}
          setsearchedByNames={vi.fn()}
        />
      );
    }).not.toThrow();
  });

  it('отображает заголовок "Искать по:"', () => {
    render(
      <SearchByMenu
        AuthorsTracks={mockAuthors}
        setSelectedGenre={vi.fn()}
        setDirectionTime={vi.fn()}
        setsearchedByNames={vi.fn()}
        searchedByNames={[]}
      />
    );
    expect(screen.getByText('Искать по:')).toBeInTheDocument();
  });

  it('отображает три кнопки фильтров', () => {
    render(
      <SearchByMenu
        AuthorsTracks={mockAuthors}
        setSelectedGenre={vi.fn()}
        setDirectionTime={vi.fn()}
        setsearchedByNames={vi.fn()}
        searchedByNames={[]}
      />
    );

    expect(screen.getByText('исполнителю')).toBeInTheDocument();
    expect(screen.getByText('году выпуска')).toBeInTheDocument();
    expect(screen.getByText('жанру')).toBeInTheDocument();
  });

  it('не отображает списки элементов при initial render (activeFilter = null)', () => {
    render(
      <SearchByMenu
        AuthorsTracks={mockAuthors}
        setSelectedGenre={vi.fn()}
        setDirectionTime={vi.fn()}
        setsearchedByNames={vi.fn()}
        searchedByNames={[]}
      />
    );

    expect(screen.queryByTestId('singers-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('years-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('genre-list')).not.toBeInTheDocument();
  });

  it('показывает список исполнителей при клике на кнопку "исполнителю"', async () => {
    render(
      <SearchByMenu
        AuthorsTracks={mockAuthors}
        setSelectedGenre={vi.fn()}
        setDirectionTime={vi.fn()}
        setsearchedByNames={vi.fn()}
        searchedByNames={[]}
      />
    );

    fireEvent.click(screen.getByText('исполнителю'));

    await waitFor(() => {
      expect(screen.getByTestId('singers-list')).toBeInTheDocument();
      expect(screen.getByText('Queen')).toBeInTheDocument();
      expect(screen.getByText('The Beatles')).toBeInTheDocument();
      expect(screen.getByText('AC/DC')).toBeInTheDocument();
    });
  });

  it('скрывает список исполнителей при повторном клике на кнопку "исполнителю"', async () => {
    render(
      <SearchByMenu
        AuthorsTracks={mockAuthors}
        setSelectedGenre={vi.fn()}
        setDirectionTime={vi.fn()}
        setsearchedByNames={vi.fn()}
        searchedByNames={[]}
      />
    );

    // Первый клик — показываем
    fireEvent.click(screen.getByText('исполнителю'));
    await waitFor(() =>
      expect(screen.getByTestId('singers-list')).toBeInTheDocument()
    );

    // Второй клик — скрываем
    fireEvent.click(screen.getByText('исполнителю'));
    await waitFor(() =>
      expect(screen.queryByTestId('singers-list')).not.toBeInTheDocument()
    );
  });

  it('корректно переключает активные фильтры (только один открыт за раз)', async () => {
    render(
      <SearchByMenu
        AuthorsTracks={mockAuthors}
        selectedGenre={[]}
        searchedByNames={[]}
        directionTime={1}
        setSelectedGenre={vi.fn()}
        setDirectionTime={vi.fn()}
        setsearchedByNames={vi.fn()}
      />
    );

    // 1. Открываем исполнителей
    fireEvent.click(screen.getByText('исполнителю'));
    await waitFor(() =>
      expect(screen.getByTestId('singers-list')).toBeInTheDocument()
    );

    // 2. Пытаемся открыть жанры (должен закрыться список исполнителей)
    fireEvent.click(screen.getByText('жанру'));
    await waitFor(() => {
      expect(screen.queryByTestId('singers-list')).not.toBeInTheDocument();
      expect(screen.getByTestId('genre-list')).toBeInTheDocument();
    });

    // 3. Пытаемся открыть сортировку
    fireEvent.click(screen.getByText('году выпуска'));
    await waitFor(() => {
      expect(screen.queryByTestId('genre-list')).not.toBeInTheDocument();
      expect(screen.getByTestId('years-list')).toBeInTheDocument();
    });
  });

  it("проверяет работу счетчика у кнопки 'жанру'", () => {
    const setSelectedGenreMock = vi.fn();

    render(
      <SearchByMenu
        AuthorsTracks={mockAuthors}
        selectedGenre={mockSelectedGenre}
        searchedByNames={[]}
        directionTime={1}
        setSelectedGenre={setSelectedGenreMock}
        setDirectionTime={vi.fn()}
        setsearchedByNames={vi.fn()}
      />
    );

    const genreButton = screen.getByText('жанру');
    const counterSpan = genreButton.querySelector('span');

    expect(genreButton).toBeInTheDocument();
    expect(counterSpan).toBeInTheDocument();
    expect(counterSpan.textContent).toBe('1');
  });

  it('проверяет выбор жанра из списка', async () => {
    const setSelectedGenreMock = vi.fn();

    render(
      <SearchByMenu
        AuthorsTracks={mockAuthors}
        selectedGenre={[]}
        searchedByNames={[]}
        directionTime={1}
        setSelectedGenre={setSelectedGenreMock}
        setDirectionTime={vi.fn()}
        setsearchedByNames={vi.fn()}
      />
    );

    // Открываем список жанров
    fireEvent.click(screen.getByText('жанру'));

    await waitFor(() => {
      const rockItem = screen.getByText('Рок');
      fireEvent.click(rockItem);
      expect(setSelectedGenreMock).toHaveBeenCalledTimes(1);
    });
  });
});
