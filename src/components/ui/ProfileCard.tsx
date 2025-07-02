'use client';

import React from "react";
import styled from "styled-components";
import Image from "next/image";

const CardContainer = styled.div`
  width: 200px;
  height: 372px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 34px 16px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  z-index: 1;
`;

const ProfileCard = () => {
  return (
    <CardContainer>
      <BackgroundImage>
        <Image
          src="/images/Card.png"
          alt="Card Background"
          width={200}
          height={372}
          priority={true}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </BackgroundImage>
      <ContentContainer>
        {/* Content goes here */}
      </ContentContainer>
    </CardContainer>
  );
};

export default ProfileCard; 