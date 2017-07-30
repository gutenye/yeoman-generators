import { step, faker } from 'gudatagen'

export function productName() {
  return function() {
    const names = ['金百娇 201', '金百娇 203', '樱基森 1036', '樱基森 1022']
    return step(names, () => faker.commerce.productName()).call(this)
  }
}

// helpers //{{{1

const SIZES = ['L', 'XL']
const COLORS = ['大红']

function genOptions() {
  const sizes = [...SIZES]
  const colors = [...COLORS]
  const options = [
    { name: '尺码', values: sizes },
    { name: '颜色', values: colors },
  ]
  const variants = []
  sizes.forEach(size => {
    colors.forEach(color => {
      const variant = {
        id: `${size}-${color}`,
        option1: size,
        option2: color,
        price: 1,
        onHand: 1,
      }
      variants.push(variant)
    })
  })

  return { options, variants }
}
//}}}1
