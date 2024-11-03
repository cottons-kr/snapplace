export function calculateImageFilter({
  brightnessContrast = 50,
  contrast = 50,
  brightness = 50,
  saturation = 50,
  temperature = 50
} = {}) {
  const calculateValue = (value: number, min: number, max: number) => {
    const normalized = (value - 50) / 50
    
    const exponential = normalized >= 0 
      ? normalized * normalized 
      : -normalized * normalized
    
    return 1.0 + exponential * (normalized >= 0 ? (max - 1.0) : (1.0 - min))
  }

  const combinedBrightness = (brightnessContrast + brightness) / 2
  const brightnessValue = calculateValue(combinedBrightness, 0.5, 2.0)
  const contrastValue = calculateValue(contrast, 0.5, 2.0)
  const saturationValue = calculateValue(saturation, 0.5, 2.0)
  
  const sepiaValue = 0.3
  const hueRotateValue = calculateValue(temperature, 50, -50)

  const filter = [
    `brightness(${brightnessValue * 100}%)`,
    `contrast(${contrastValue * 100}%)`,
    `saturate(${saturationValue * 100}%)`,
    `sepia(${sepiaValue * 100}%)`,
    `hue-rotate(${hueRotateValue}deg)`
  ].join(' ')

  return filter
}