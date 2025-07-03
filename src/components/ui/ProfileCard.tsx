"use client";

import React from 'react';
import Link from 'next/link';
import ResponsivePicture from './ResponsivePicture';

const ProfileCard: React.FC = () => {
  return (
    <div 
      data-layer="Frame 49" 
      className="Frame49 relative" 
      style={{ 
        width: '200px', 
        height: '372px', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'relative',
        paddingBottom: '16px'
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <ResponsivePicture
          basePath="/images"
          filename="Card"
          alt="Card Background"
          width={200}
          height={372}
          className="w-full h-full"
          imgClassName="object-cover"
          useCdn={true}
          cdnType="jsdelivr"
        />
      </div>
      
      <div 
        data-layer="Frame 48" 
        className="Frame48 relative" 
        style={{
          width: '131.41px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '26px'
        }}
      >
        <div 
          data-layer="Frame 47" 
          className="Frame47" 
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '26px'
          }}
        >
          <div 
            data-layer="Frame 11" 
            className="Frame11" 
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '30px'
            }}
          >
            <div 
              data-layer="Frame 23" 
              className="Frame23" 
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div 
                data-layer="Frame 22" 
                className="Frame22" 
                style={{
                  width: '100%',
                  maxWidth: '113px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '3px',
                  margin: '0 auto'
                }}
              >
                <div 
                  data-layer="Quote" 
                  className="Quote" 
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontFamily: 'SF Pro Text',
                    fontWeight: 600,
                    lineHeight: '14.70px',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <span>Dương Ngọc Tiên</span>
                </div>
                <div 
                  data-layer="Quote" 
                  className="Quote" 
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    color: '#ACACAC',
                    fontSize: '8.95px',
                    fontFamily: 'Rethink Sans',
                    fontWeight: 400,
                    lineHeight: '9.39px',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <span>Planning | Marketing Intern</span>
                </div>
              </div>
              <div 
                data-layer="Frame 3" 
                className="Frame3" 
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '7px'
                }}
              >
                <Link 
                  href="https://www.linkedin.com/in/tienduongngoc/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    cursor: 'pointer'
                  }}
                >
                  <div data-svg-wrapper data-layer="Social Icons" data-color="Negative" data-platform="LinkedIn" className="SocialIcons relative">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_42_79)">
                    <path d="M13.6616 0.422058H1.71757C1.14542 0.422058 0.68277 0.873758 0.68277 1.43222V13.4255C0.68277 13.984 1.14542 14.4385 1.71757 14.4385H13.6616C14.2338 14.4385 14.6992 13.984 14.6992 13.4283V1.43222C14.6992 0.873758 14.2338 0.422058 13.6616 0.422058ZM4.84115 12.3661H2.76059V5.67547H4.84115V12.3661ZM3.80087 4.76385C3.1329 4.76385 2.5936 4.22455 2.5936 3.55932C2.5936 2.89409 3.1329 2.35479 3.80087 2.35479C4.4661 2.35479 5.0054 2.89409 5.0054 3.55932C5.0054 4.22181 4.4661 4.76385 3.80087 4.76385ZM12.6268 12.3661H10.549V9.11386C10.549 8.33913 10.5353 7.33991 9.46765 7.33991C8.38631 7.33991 8.22206 8.18583 8.22206 9.05911V12.3661H6.14697V5.67547H8.13993V6.58982H8.1673C8.4438 6.0642 9.12272 5.50848 10.1329 5.50848C12.2381 5.50848 12.6268 6.89369 12.6268 8.69502V12.3661Z" fill="#878787"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_42_79">
                    <rect width="14.0164" height="14.0164" fill="white" transform="translate(0.68277 0.422058)"/>
                    </clipPath>
                    </defs>
                    </svg>
                  </div>
                </Link>
                <Link 
                  href="mailto:tiendn.fw@gmail.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    cursor: 'pointer'
                  }}
                >
                  <div data-svg-wrapper data-layer="Social" data-social="Gmail" data-style="Black" className="Social relative">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_42_80)">
                    <path d="M3.88471 12.689H1.65483C1.12762 12.689 0.699165 12.2622 0.699165 11.7334V3.61031C0.699165 2.42847 2.04665 1.75473 2.99276 2.46351L7.70737 5.99939L12.422 2.46351C13.3665 1.75473 14.7156 2.42847 14.7156 3.61031V11.7334C14.7156 12.2606 14.2887 12.689 13.7599 12.689H11.53V7.2736L7.70737 10.1406L3.88472 7.2736L3.88471 12.689Z" fill="#878787"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_42_80">
                    <rect width="14.0164" height="14.0164" fill="white" transform="translate(0.699165 0.422058)"/>
                    </clipPath>
                    </defs>
                    </svg>
                  </div>
                </Link>
                <Link 
                  href="https://www.facebook.com/tienduong.0822/?locale=vi_VN" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    cursor: 'pointer'
                  }}
                >
                  <div data-svg-wrapper data-layer="Social Icons" data-color="Negative" data-platform="Facebook" className="SocialIcons relative">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_42_81)">
                    <path d="M7.72376 0.422058C3.85327 0.422058 0.715561 3.55977 0.715561 7.43025C0.715561 10.7168 2.97837 13.4747 6.03086 14.2321V9.57196H4.58577V7.43025H6.03086V6.50742C6.03086 4.12211 7.1104 3.01649 9.45226 3.01649C9.8963 3.01649 10.6624 3.10367 10.9758 3.19058V5.13185C10.8104 5.11447 10.5231 5.10578 10.1663 5.10578C9.01719 5.10578 8.57315 5.54113 8.57315 6.67281V7.43025H10.8623L10.469 9.57196H8.57315V14.3872C12.0433 13.9681 14.7322 11.0134 14.7322 7.43025C14.732 3.55977 11.5942 0.422058 7.72376 0.422058Z" fill="#878787"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_42_81">
                    <rect width="14.0164" height="14.0164" fill="white" transform="translate(0.715561 0.422058)"/>
                    </clipPath>
                    </defs>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
            <div 
              data-layer="Frame 21" 
              className="Frame21" 
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div 
                data-layer="Frame 17" 
                className="Frame17" 
                style={{
                  width: '62px',
                  height: '16px',
                  position: 'relative',
                  background: 'white',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div 
                  data-layer="IMC plan" 
                  className="ImcPlan" 
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: '8px',
                    fontFamily: 'Rethink Sans',
                    fontWeight: 400,
                    lineHeight: '8.40px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  IMC plan
                </div>
              </div>
              <div 
                data-layer="Frame 18" 
                className="Frame18" 
                style={{
                  width: '84px',
                  height: '16px',
                  position: 'relative',
                  background: 'white',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div 
                  data-layer="Social media plan" 
                  className="SocialMediaPlan" 
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: '8px',
                    fontFamily: 'Rethink Sans',
                    fontWeight: 400,
                    lineHeight: '8.40px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Social media plan
                </div>
              </div>
              <div 
                data-layer="Frame 19" 
                className="Frame19" 
                style={{
                  width: '104px',
                  height: '16px',
                  position: 'relative',
                  background: 'white',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div 
                  data-layer="Market & Trend Research" 
                  className="MarketTrendResearch" 
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: '8px',
                    fontFamily: 'Rethink Sans',
                    fontWeight: 400,
                    lineHeight: '8.40px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Market & Trend Research
                </div>
              </div>
              <div 
                data-layer="Frame 20" 
                className="Frame20" 
                style={{
                  width: '90px',
                  height: '16px',
                  position: 'relative',
                  background: 'white',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div 
                  data-layer="Design & Visualizing" 
                  className="DesignVisualizing" 
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: '8px',
                    fontFamily: 'Rethink Sans',
                    fontWeight: 400,
                    lineHeight: '8.40px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Design & Visualizing
                </div>
              </div>
            </div>
            <div 
              data-layer="Frame 7" 
              className="Frame7" 
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <div 
                className="status-dot-container"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '6px',
                  height: '6px',
                  marginRight: '2px'
                }}
              >
                <div 
                  className="green-dot"
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#4BDD74',
                    boxShadow: '0px 0px 4px rgba(75, 221, 116, 0.6)'
                  }}
                ></div>
              </div>
              <div 
                data-layer="Open to new opportunities" 
                className="OpenToNewOpportunities" 
                style={{
                  color: '#9F9F9F',
                  fontSize: '10.16px',
                  fontFamily: 'Rethink Sans',
                  fontWeight: 400,
                  lineHeight: '10.66px',
                  whiteSpace: 'nowrap',
                  textAlign: 'center'
                }}
              >
                Open to new opportunities
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard; 