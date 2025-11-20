
const fetchData = async () => {

  try {
    const events = await fetch('https://fraasi--a47de3e6be1711f08f5342dde27851f2.web.val.run')
      .then(d => d)
      .catch(console.error)
    return events
  } catch (error) {
    if (error) console.log('error:', error)
  }

}
export default fetchData
