import React, { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@src/shared/constants/routes';
import { useAuth } from '@src/entities/user/model/useAuth';

export const withPublicRoute = (WrappedComponent: ComponentType) => () => {
  const isAuth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate(`/${RoutePath.CATALOG}`);
      return;
    }
  }, [isAuth, navigate]);

  return <WrappedComponent />;
};
