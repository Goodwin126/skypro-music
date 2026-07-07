import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SideBarPersonal from './index';

vi.mock('./styles', () => ({
  StyledSidebarPersonalt: 'div',
  StyledSidebarPersonalName: 'div',
  StyledSidebarIcon: 'div',
}));

let mockAuthData = { user: { username: 'Sergey.Ivanov' }, logout: vi.fn() };

vi.mock('../../context/AuthContext', async () => {
  const actual = await vi.importActual('../../context/AuthContext');
  return {
    ...actual,
    useAuth: () => mockAuthData,
  };
});

const mockSprite = '/sprite.svg';

describe('SideBarPersonal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuthData.logout = vi.fn();
  });

  const setAuthContext = (userValue) => {
    mockAuthData = {
      user: userValue,
      logout: mockAuthData.logout,
    };
  };

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <SideBarPersonal sprite={mockSprite} />
      </MemoryRouter>
    );
  };

  it('рендерит компонент без ошибок при авторизованном пользователе', () => {
    setAuthContext({ username: 'Sergey.Ivanov' });
    expect(() => renderComponent()).not.toThrow();
  });

  it('отображает имя пользователя', () => {
    setAuthContext({ username: 'Sergey.Ivanov' });
    renderComponent();
    const userName = screen.getByText('Sergey.Ivanov');
    expect(userName).toBeInTheDocument();
  });

  it('отображает иконку выхода (svg с aria-label)', () => {
    setAuthContext({ username: 'Sergey.Ivanov' });
    renderComponent();

    const logoutIcon = screen.getByLabelText('logout');
    expect(logoutIcon).toBeInTheDocument();

    const useTag = logoutIcon.querySelector('use');
    expect(useTag).toBeInTheDocument();
    expect(useTag.getAttribute('href')).toBe(`${mockSprite}#logout`);
  });

  it('вызывает функцию logout при клике на блок (если пользователь залогинен)', () => {
    setAuthContext({ username: 'Sergey.Ivanov' });
    renderComponent();

    const clickableElement = screen.getByText('Sergey.Ivanov').parentElement;
    fireEvent.click(clickableElement);
    expect(mockAuthData.logout).toHaveBeenCalledTimes(1);
  });

  it('рендерит ссылку на /login, если пользователь НЕ авторизован', () => {
    setAuthContext(null);
    renderComponent();

    const link = screen.getByRole('link', { name: /login/i });
    expect(link).toBeInTheDocument();

    expect(link.textContent.toLowerCase()).toContain('login');

    fireEvent.click(link);
    expect(mockAuthData.logout).not.toHaveBeenCalled();
  });
});
