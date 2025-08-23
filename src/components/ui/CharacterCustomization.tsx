"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface CharacterPart {
  id: string;
  name: string;
  baseAsset: string;
  colorVariants?: string[];
}

interface StyleOptions {
  [partId: string]: {
    selectedVariant: string;
  };
}

const CHARACTER_PARTS: CharacterPart[] = [
  {
    id: 'hair-front',
    name: 'Front Hair',
    baseAsset: 'hair-front-tomboy',
    colorVariants: ['brown', 'blonde', 'black']
  },
  {
    id: 'body',
    name: 'Body',
    baseAsset: 'body-base',
    colorVariants: ['light', 'medium', 'dark']
  }
];

const CharacterCustomization: React.FC = () => {
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({});
  const [availableAssets, setAvailableAssets] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Function to check if an asset exists
  const checkAssetExists = async (assetPath: string): Promise<boolean> => {
    try {
      // Try SVG first, then PNG
      const svgResponse = await fetch(`/images/character/${assetPath}.svg`, { method: 'HEAD' });
      if (svgResponse.ok) return true;
      
      const pngResponse = await fetch(`/images/character/${assetPath}.png`, { method: 'HEAD' });
      return pngResponse.ok;
    } catch {
      return false;
    }
  };

  // Initialize and check asset availability
  useEffect(() => {
    const initializeAssets = async () => {
      setIsLoading(true);
      
      const assetChecks: Promise<[string, boolean]>[] = [];
      const initialStyleOptions: StyleOptions = {};

      for (const part of CHARACTER_PARTS) {
        // Check base asset
        assetChecks.push(
          checkAssetExists(part.baseAsset).then(exists => [`${part.baseAsset}`, exists]).catch(() => [`${part.baseAsset}`, false])
        );

        // Check color variants
        if (part.colorVariants) {
          for (const variant of part.colorVariants) {
            const variantAsset = `${part.baseAsset}-${variant}`;
            assetChecks.push(
              checkAssetExists(variantAsset).then(exists => [variantAsset, exists]).catch(() => [variantAsset, false])
            );
          }
        }

        // Initialize with base asset
        initialStyleOptions[part.id] = {
          selectedVariant: 'default'
        };
      }

      try {
        const results = await Promise.all(assetChecks);
        const availableAssetsSet = new Set<string>();
        
        results.forEach(([asset, exists]) => {
          if (exists) {
            availableAssetsSet.add(asset);
          }
        });
        
        setAvailableAssets(availableAssetsSet);
        setStyleOptions(initialStyleOptions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error during asset initialization:', error);
        setIsLoading(false);
      }
    };

    initializeAssets();
  }, []);

  // Handle style option change
  const handleStyleChange = (partId: string, variant: string) => {
    setStyleOptions(prev => ({
      ...prev,
      [partId]: {
        selectedVariant: variant
      }
    }));
  };

  // Get the current asset path for a part
  const getCurrentAssetPath = (part: CharacterPart): string => {
    const selectedVariant = styleOptions[part.id]?.selectedVariant;
    
    if (selectedVariant === 'default') {
      // Try SVG first, then PNG
      return `/images/character/${part.baseAsset}.svg`;
    }
    
    return `/images/character/${part.baseAsset}-${selectedVariant}.svg`;
  };

  // Get available variants for a part (only those with existing assets)
  const getAvailableVariants = (part: CharacterPart): Array<{value: string, label: string}> => {
    const variants = [{ value: 'default', label: 'Default' }];
    
    if (part.colorVariants) {
      for (const variant of part.colorVariants) {
        const variantAsset = `${part.baseAsset}-${variant}`;
        if (availableAssets.has(variantAsset)) {
          variants.push({
            value: variant,
            label: variant.charAt(0).toUpperCase() + variant.slice(1)
          });
        }
      }
    }
    
    return variants;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading character assets...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Character Customization</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Character Preview */}
        <div className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
          <div className="relative w-64 h-64 mx-auto bg-gray-700/50 rounded-lg overflow-hidden">
            {CHARACTER_PARTS.map((part) => {
              const assetPath = getCurrentAssetPath(part);
              const selectedVariant = styleOptions[part.id]?.selectedVariant;
              const isDefaultVariant = selectedVariant === 'default';
              const assetKey = isDefaultVariant ? part.baseAsset : `${part.baseAsset}-${selectedVariant}`;
              
              // Only render if the asset exists
              if (!availableAssets.has(assetKey)) {
                return null;
              }

              return (
                <div key={part.id} className="absolute inset-0">
                  <Image
                    src={assetPath}
                    alt={`${part.name} - ${selectedVariant}`}
                    fill
                    className="object-contain"
                    onError={() => {
                      console.warn(`Failed to load asset: ${assetPath}`);
                    }}
                  />
                </div>
              );
            })}
            
            {/* Placeholder if no assets are available */}
            {availableAssets.size === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm">No character assets available</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Style Options */}
        <div className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Style Options</h3>
          
          <div className="space-y-6">
            {CHARACTER_PARTS.map((part) => {
              const availableVariants = getAvailableVariants(part);
              
              // Only show the part if there are available variants
              if (availableVariants.length <= 1 && !availableAssets.has(part.baseAsset)) {
                return null;
              }

              return (
                <div key={part.id} className="space-y-3">
                  <label className="block text-sm font-medium text-gray-200">
                    {part.name}
                  </label>
                  
                  {/* Color Variants */}
                  {availableVariants.length > 1 && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400">Color Variants:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {availableVariants.map((variant) => (
                          <button
                            key={variant.value}
                            onClick={() => handleStyleChange(part.id, variant.value)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              styleOptions[part.id]?.selectedVariant === variant.value
                                ? 'bg-white text-black shadow-lg'
                                : 'bg-gray-700/50 text-gray-200 hover:bg-gray-600/50 border border-gray-600'
                            }`}
                          >
                            {variant.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Show warning if no color variants are available */}
                  {availableVariants.length === 1 && part.colorVariants && part.colorVariants.length > 0 && (
                    <div className="text-xs text-yellow-400 bg-yellow-900/20 p-2 rounded border border-yellow-600/30">
                      <p>⚠️ Color variants for {part.name} are not available.</p>
                      <p className="text-gray-400">Expected assets: {part.colorVariants.map(v => `${part.baseAsset}-${v}.svg/.png`).join(', ')}</p>
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Show message if no parts are available */}
            {CHARACTER_PARTS.every(part => {
              const availableVariants = getAvailableVariants(part);
              return availableVariants.length <= 1 && !availableAssets.has(part.baseAsset);
            }) && (
              <div className="text-center py-8">
                <div className="text-gray-400">
                  <p className="mb-2">No character parts available for customization.</p>
                  <p className="text-sm">Please add character assets to the /public/images/character/ directory.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Asset Status Debug Info */}
      <div className="mt-8 bg-gray-900/50 rounded-xl p-4 border border-gray-700">
        <h4 className="text-sm font-semibold text-gray-300 mb-2">Asset Status (Debug Info)</h4>
        <div className="text-xs text-gray-400 space-y-1">
          <p>Available assets: {availableAssets.size}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {CHARACTER_PARTS.map(part => (
              <div key={part.id} className="space-y-1">
                <p className="font-medium text-gray-300">{part.name}:</p>
                <div className="pl-2 space-y-1">
                  <p className={availableAssets.has(part.baseAsset) ? 'text-green-400' : 'text-red-400'}>
                    ✓ Base: {part.baseAsset}.svg/.png {availableAssets.has(part.baseAsset) ? '(available)' : '(missing)'}
                  </p>
                  {part.colorVariants?.map(variant => {
                    const variantAsset = `${part.baseAsset}-${variant}`;
                    return (
                      <p key={variant} className={availableAssets.has(variantAsset) ? 'text-green-400' : 'text-red-400'}>
                        ✓ {variant}: {variantAsset}.svg/.png {availableAssets.has(variantAsset) ? '(available)' : '(missing)'}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCustomization;