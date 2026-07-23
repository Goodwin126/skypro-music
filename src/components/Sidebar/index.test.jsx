import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // 1. Импортируем роутер
import Sidebar from './index';

// --- МОКИ (Частичные, чтобы не ломать внутренние импорты) ---

vi.mock('./styles', async () => {
  const actual = await vi.importActual('./styles');
  return {
    ...actual,
    StyledMainSidebar: (props) => <nav {...props} />,
    StyledSidebarBlock: (props) => <section {...props} />,
    StyledSidebarList: (props) => <ul {...props} />,
  };
});

vi.mock('../SidebarItem/styles', async () => {
  const actual = await vi.importActual('../SidebarItem/styles');
  return {
    ...actual, // Сохраняем ВСЕ реальные экспорты (включая StyledSidebarLink!)
    StyledSidebarItem: (props) => <li {...props} data-testid="sidebar-item" />,
    StyledSidebarImg: (props) => (
      <img {...props} data-testid="item-img" alt="playlist" />
    ),
  };
});

vi.mock('../SkelitonSidebar', () => ({
  default: () => (
    <div data-testid="skeleton-wrapper">
      <div data-testid="skeleton-img" />
      <div data-testid="skeleton-img" />
      <div data-testid="skeleton-img" />
    </div>
  ),
}));

// --- МОК КОНТЕКСТА АВТОРИЗАЦИИ ---
const mockUser = { username: 'Sergey.Ivanov' };
const mockLogout = vi.fn();

const AuthContext = React.createContext(null);

const AuthContextMock = ({ children }) => (
  <AuthContext.Provider value={{ user: mockUser, logout: mockLogout }}>
    {children}
  </AuthContext.Provider>
);

// Подменяем хук useAuth
vi.mock('../../context/AuthContext', async () => {
  const actual = await vi.importActual('../../context/AuthContext');
  return {
    ...actual,
    useAuth: () => ({ user: mockUser, logout: mockLogout }),
  };
});

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 2. ИСПРАВЛЕНИЕ ЗДЕСЬ: Добавляем MemoryRouter внутрь обертки
  const renderWithAuth = (props) => {
    return render(
      <MemoryRouter>
        <AuthContextMock>
          <Sidebar {...props} />
        </AuthContextMock>
      </MemoryRouter>
    );
  };

  it('корректно рендерит структуру при isLoading=false', () => {
    renderWithAuth({ isLoading: false });

    expect(screen.getAllByTestId('sidebar-item')).toHaveLength(3);
    expect(screen.queryByTestId('skeleton-wrapper')).not.toBeInTheDocument();
  });

  it('показывает скелетон при isLoading=true', () => {
    renderWithAuth({ isLoading: true });

    expect(screen.getAllByTestId('skeleton-wrapper')).toHaveLength(1);
    expect(screen.queryAllByTestId('sidebar-item').length).toBe(0);
  });
});
