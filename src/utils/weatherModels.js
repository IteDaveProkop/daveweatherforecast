export const WEATHER_MODELS = [
  {
    id: 'icon_seamless',
    name: 'DWD ICON',
    nameCz: 'DWD ICON',
    description: 'Německá meteorologická služba (doporučeno pro Evropu)',
    param: 'icon_seamless',
  },
  {
    id: 'ecmwf_ifs025',
    name: 'ECMWF IFS',
    nameCz: 'ECMWF IFS',
    description: 'Evropské centrum (vysoká přesnost)',
    param: 'ecmwf_ifs025',
  },
  {
    id: 'gfs_seamless',
    name: 'GFS NOAA',
    nameCz: 'GFS NOAA',
    description: 'Americký globální model',
    param: 'gfs_seamless',
  },
  {
    id: 'meteofrance_seamless',
    name: 'Météo-France',
    nameCz: 'Météo-France',
    description: 'Francouzský model (dobrý pro západní Evropu)',
    param: 'meteofrance_seamless',
  },
  {
    id: 'jma_seamless',
    name: 'JMA',
    nameCz: 'JMA',
    description: 'Japonská meteorologická agentura',
    param: 'jma_seamless',
  },
  {
    id: 'gem_seamless',
    name: 'GEM',
    nameCz: 'GEM',
    description: 'Kanadský model',
    param: 'gem_seamless',
  },
  {
    id: 'best_match',
    name: 'Best Match',
    nameCz: 'Automatický výběr',
    description: 'API vybere nejlepší model pro lokalitu',
    param: 'best_match',
  },
];

export const getModelName = (modelId) => {
  const model = WEATHER_MODELS.find(m => m.id === modelId);
  return model ? model.nameCz : modelId;
};
