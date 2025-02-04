import './style.scss'
import { createRoot } from 'react-dom/client'

import("./root.tsx").then(({Root})=>
  createRoot(document.getElementById('root')!).render(Root))
