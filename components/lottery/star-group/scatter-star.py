import random

css = """\
span.star:nth-of-type({n}) {{
  top: {y}vh;
  left: {x}vw;
}}
"""

react = """\
"use client"

import Star from "./star";
import './star-group.css'

export default function StarGroup() {{
  return (
    <>
      <div className='star-group'>
{}
      </div>
    </>
  )
}}
"""

star_count = 90
stars = []

for i in range(star_count):
  stars.append(css.format(n = i, x = random.randint(1, 98), y = random.randint(1, 80)))

with open('./components/lottery/star-group/star-group.css', 'w') as f:
  f.write('\n'.join(stars))

with open('./components/lottery/star-group/index.tsx', 'w') as f:
  f.write(react.format('\t\t\t\t<Star />\n' * star_count))
