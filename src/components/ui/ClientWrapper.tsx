'use client';

import React from 'react';
import CustomCursor from './CustomCursor';

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
};

export default ClientWrapper; 