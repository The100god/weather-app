
const convertKelvinToCelsius = (tempInKelvin) => {
    const tempInCelsius = tempInKelvin - 273.15
    // console.log(tempInCelsius)
  return Math.floor(tempInCelsius)
}

export default convertKelvinToCelsius
