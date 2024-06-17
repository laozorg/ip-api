export default {
 
  fetch(request) {
    const EMOJI_FLAG_UNICODE_STARTING_POSITION = 127397
    const ip = request.headers.get('x-real-ip')
    const { pathname } = new URL(request.url)
    const CORS_HEADERS = {
      'Access-Control-Allow-Origin': '*'
    }
    console.log(ip, pathname)

    function getFlag(countryCode) {
      const regex = new RegExp('^[A-Z]{2}$').test(countryCode)
      if (!countryCode || !regex) return void 0
      return String.fromCodePoint(
        ...countryCode
          .split('')
          .map((char) => EMOJI_FLAG_UNICODE_STARTING_POSITION + char.charCodeAt(0))
      )
    }

    if (pathname === '/geo') {
      const geo = {
        city: request.cf.city,
        country: request.cf.country,
        flag: getFlag(request.cf.country),
        countryRegion: request.cf.region,
        region: request.cf.colo,
        latitude: request.cf.latitude,
        longitude: request.cf.longitude,
        asOrganization: request.cf.asOrganization
      }
      console.log(geo)
      return Response.json({
        ip,
        ...geo
      }, {
        headers: {
          ...CORS_HEADERS,
          'x-client-ip': ip
        }
      })
    }
    return new Response(ip, {
      headers: {
        ...CORS_HEADERS,
        'x-client-ip': ip
      }
    })
  }
}
