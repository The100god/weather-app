
const convertKelvinToFarenhite = (tempInKelvin) => {
    const tempInFarenhite = (tempInKelvin - 273.15) * 1.8 + 32
  return Math.floor(tempInFarenhite)
}

export default convertKelvinToFarenhite
